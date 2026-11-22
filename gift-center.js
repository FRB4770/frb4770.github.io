const GIFT_REPORT_URL = "https://github.com/DYN4770/server4770/issues/new";
const GIFT_DISMISSED_KEY = "frbDismissedGiftCodes";
let giftLang = "en";
let giftCatalog = [];
let dismissedGiftCodes = loadDismissedGiftCodes();
const GIFT_TEXT = {
  en: { intro: "Current codes, simple copy, and a link to the official WOS portal.", activeCodes: "Current codes", copyHint: "Copy a code here, then paste it into the official portal.", copy: "Copy", officialPortal: "Open official WOS gift-code portal ↗", submitTitle: "Report a code", submitHint: "Reports open a public GitHub review form. You can leave the expiry date blank if it is unknown.", codeLabel: "Gift code", expiryLabel: "Valid until (optional)", reportSubmit: "Prepare code report", empty: "No current codes are listed.", copied: "Code copied. Paste it into the official portal and complete redemption there.", copyFailed: "Could not copy automatically. Select the code and copy it manually.", enterCode: "Enter a gift code first.", reportReady: "Review the report in the new GitHub tab and submit it there. A GitHub account is required; reports are public.", loadError: "Could not load the current code list.", removed: "Code removed from this browser’s gift-code list." },
  pl: { intro: "Aktualne kody, kopiowanie i link do oficjalnego portalu WOS.", activeCodes: "Aktualne kody", copyHint: "Skopiuj tu kod, a następnie wklej go w oficjalnym portalu.", copy: "Kopiuj", officialPortal: "Otwórz oficjalny portal kodów WOS ↗", submitTitle: "Zgłoś kod", submitHint: "Zgłoszenie otworzy publiczny formularz GitHuba. Datę ważności zostaw pustą, jeśli jest nieznana.", codeLabel: "Kod prezentowy", expiryLabel: "Ważny do (opcjonalnie)", reportSubmit: "Przygotuj zgłoszenie kodu", empty: "Brak aktualnych kodów na liście.", copied: "Kod skopiowany. Wklej go w oficjalnym portalu i dokończ odbiór tam.", copyFailed: "Nie udało się skopiować automatycznie. Zaznacz kod i skopiuj go ręcznie.", enterCode: "Najpierw wpisz kod.", reportReady: "Sprawdź zgłoszenie w nowej karcie GitHuba i wyślij je tam. Wymagane jest konto GitHub; zgłoszenia są publiczne.", loadError: "Nie udało się wczytać aktualnej listy kodów.", removed: "Kod usunięty z listy kodów w tej przeglądarce." }
};

function gt(key) { return GIFT_TEXT[giftLang][key] || GIFT_TEXT.en[key] || key; }
function esc(value) { return String(value ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
function isCurrent(item) {
  if (!item || typeof item.code !== "string") return false;
  const status = String(item.status || "").toLowerCase();
  if (status && !status.includes("active")) return false;
  const expiry = String(item.expires || "").slice(0, 10);
  if (/^\d{4}-\d{2}-\d{2}$/.test(expiry) && expiry < new Date().toISOString().slice(0, 10)) return false;
  return true;
}
function loadDismissedGiftCodes() { try { const value = JSON.parse(localStorage.getItem(GIFT_DISMISSED_KEY) || "[]"); return new Set(Array.isArray(value) ? value.map(code => String(code).trim().toUpperCase()) : []); } catch { return new Set(); } }
function dismissGiftCode(code) { const normalized = String(code || "").trim().toUpperCase(); if (!normalized) return; dismissedGiftCodes.add(normalized); try { localStorage.setItem(GIFT_DISMISSED_KEY, JSON.stringify([...dismissedGiftCodes])); } catch {} renderGiftCenter(); const message = document.querySelector("#gift-copy-message"); if (message) message.textContent = gt("removed"); }
function renderGiftCenter() {
  const list = document.querySelector("#gift-active-list");
  if (!list) return;
  const current = giftCatalog.filter(item => isCurrent(item) && !dismissedGiftCodes.has(String(item.code).trim().toUpperCase()));
  list.innerHTML = current.length ? current.map(item => `<article class="gift-simple-card"><button class="gift-code-remove" type="button" data-dismiss-code="${esc(item.code)}" aria-label="Remove ${esc(item.code)} from this browser’s list" title="Remove this code">×</button><code>${esc(item.code)}</code><button class="action" type="button" data-copy-code="${esc(item.code)}">${gt("copy")}</button></article>`).join("") : `<div class="empty">${gt("empty")}</div>`;
  document.querySelectorAll("[data-gift]").forEach(el => { el.textContent = gt(el.dataset.gift); });
  const updated = document.querySelector("#gift-last-update");
  if (updated && window.giftCatalogUpdatedAt) updated.textContent = (giftLang === "pl" ? "Lista zaktualizowana: " : "List updated: ") + window.giftCatalogUpdatedAt;
}
async function copyText(value) {
  try { if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(value); return true; } } catch {}
  const field = document.createElement("textarea"); field.value = value; field.setAttribute("readonly", ""); field.style.position = "fixed"; field.style.opacity = "0"; document.body.appendChild(field); field.select();
  let copied = false; try { copied = document.execCommand("copy"); } catch {} field.remove(); return copied;
}
function setGiftLang(language) { giftLang = language === "pl" ? "pl" : "en"; renderGiftCenter(); document.querySelector("#gift-copy-message").textContent = ""; document.querySelector("#gift-report-message").textContent = ""; }
async function syncPublishedGiftCatalog() {
  try {
    const response = await fetch(`gift-codes.json?refresh=${Date.now()}`, { cache: "no-store" }); if (!response.ok) throw Error();
    const data = await response.json(); if (!Array.isArray(data.codes)) throw Error(); giftCatalog = data.codes; window.giftCatalogUpdatedAt = data.updatedAt || ""; renderGiftCenter();
  } catch { document.querySelector("#gift-active-list").innerHTML = `<div class="empty">${gt("loadError")}</div>`; }
}
document.querySelector("#gift-active-list")?.addEventListener("click", async event => {
  const removeButton = event.target.closest("[data-dismiss-code]"); if (removeButton) { dismissGiftCode(removeButton.dataset.dismissCode); return; }
  const button = event.target.closest("[data-copy-code]"); if (!button) return;
  const copied = await copyText(button.dataset.copyCode); document.querySelector("#gift-copy-message").textContent = copied ? gt("copied") : gt("copyFailed");
});
document.querySelector("#gift-report-submit")?.addEventListener("click", () => {
  const code = document.querySelector("#gift-report-code").value.trim(); const expires = document.querySelector("#gift-report-expiry").value;
  if (!/^[A-Z0-9_-]{1,80}$/i.test(code)) { document.querySelector("#gift-report-message").textContent = gt("enterCode"); return; }
  const title = (giftLang === "pl" ? "Zgłoszenie kodu: " : "Gift code report: ") + code;
  const body = giftLang === "pl" ? `Kod: ${code}\nWażny do: ${expires || "nieznana"}\n\nProszę sprawdzić zgłoszenie przed dodaniem kodu do listy.` : `Code: ${code}\nValid until: ${expires || "unknown"}\n\nPlease review this report before adding the code to the catalog.`;
  window.open(GIFT_REPORT_URL + `?title=${encodeURIComponent(title)}&body=${encodeURIComponent(body)}`, "_blank", "noopener,noreferrer");
  document.querySelector("#gift-report-message").textContent = gt("reportReady");
});
syncPublishedGiftCatalog();
