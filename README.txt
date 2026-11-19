Version 1.91 removes the failed SvS schedule table and copy block.

Version 1.69 reduces the Gift Code Center to active codes and the two newest expired entries by default. Expired cards are display-only; local maintenance controls are tucked away.

Version 1.68 keeps the first catalog load quiet and uses a compact banner only for later code additions.

Version 1.67 imports the 3 live-list entries and all 363 archived entries from WOS Rewards as a dated snapshot. Code case is preserved because Whiteout Survival codes may be case-sensitive. This does not create an automatic live connection.

DYN ALLIANCE COMMAND CENTER v1.71
Restores the full Alliance Championship guide, including weekly schedule, registration, matchmaking, five 11-hour preparation windows, the 2–1 lane plan, battle limits, KO1/KO2 rewards, tier benefits, statue bonuses, Knight cosmetics and shop assortment.

The event details are cross-checked against the linked community references inside the guide. In-game rules take precedence if a future update changes mechanics.

Version 1.67 carries the v1.66 Gift Code Center forward and loads a dated snapshot from the public WOS Rewards catalog: 3 codes listed live and 363 archived codes, checked 19 Nov 2026. Each entry keeps its original letter case, source URL, listing date and import audit note. The page loads the bundled gift-codes.json from the same static site. The catalog is a snapshot and does not refresh itself; compare the linked WOS Rewards and Digital Revenue Studio trackers before publishing future updates. External status labels are reports, not confirmation from the game.

GIFT CODE CENTER WORKFLOW
- Current codes load from gift-codes.json beside index.html. Update that file and publish it to refresh the public list.
- Copy buttons copy one code to this browser's clipboard. Paste it manually in the official WOS portal; the page cannot send a Player ID or redeem codes for you.
- Code reports open a prefilled public GitHub Issue. The person reporting must review and submit it and needs a GitHub account. Review reports before adding codes to gift-codes.json.
- This is a static website and does not have a private submission server or an authorized WOS redemption API.

GTranslate requires internet access and remains subject to the provider's terms.

Version 1.20 updates the Bear Trap, Foundry Battle and Crazy Joe guide colors to the site's purple and gold palette.

Version 1.21 restores the earlier plum gradient with a gold border for highlighted objective and rule callouts in Bear Trap, Foundry Battle and Crazy Joe.

Version 1.22 adds an Alliance Mobilization guide, updated to current event mechanics and linked to the relevant community references.

Version 1.23 adds responsive vector illustrations for mission flow and league progression to the Alliance Mobilization guide.

Version 1.24 adds the Brothers in Arms guide with tier points, troop-loss risks, rewards and the supplied DYN/state NAP rules clearly distinguished from game-wide mechanics.

Version 1.25 clarifies the four-week KE cadence, friendly tile battles, local state-rule variations, and shield cancellation from scouting or attacking.

Version 1.26 adds a combined Facilities & Strongholds guide with supplied map and bonus images, distinguishing territory-connected facilities from scheduled Fortress Battles.

Version 1.27 embeds the Facilities and Strongholds reference images directly in index.html so they display without separate asset uploads.

Version 1.28 limits Home to the three newest guides and separates development references in Knowledge from event guides in Events.

Version 1.28 limits Home to the three newest guides, moves development references to Knowledge, and keeps event walkthroughs in Events.

Version 1.29 also lists Facilities & Strongholds in Events while keeping it in Knowledge as an alliance development reference.

Version 1.30 adds the Mercenary Prestige guide with updated 25-target and four-tier mechanics, plus inline personal and alliance challenge illustrations.

Version 1.31 adds the Pets development guide, verifies the current 14-pet / 7-generation roster and unlock sequence against current community databases, and embeds the six supplied reference screenshots in the guide.


Version 1.32 redesigns the Pets guide with a compact end-of-guide screenshot gallery and a full 14-pet table of unlock milestones, maximum skills, troop bonuses and refinement caps.


Version 1.33 replaces full-page pet screenshots with 14 individual pet profiles, including supplied portraits, unlock requirements, skill summaries and maximum stats.


Version 1.34 adds the Fire Crystals development guide with corrected progression context, readable FC1–FC10 cost tables transcribed from supplied references, Crystal Laboratory/RFC details, War Academy guidance and linked WOS Forge sources.

Version 1.35 expands the War Academy section with FC5 gates, exact Fire Crystal Shard exchange caps, T11/T12 clarification and balanced F2P progression options.

Version 1.36 adds the Canyon Clash event guide, corrected eligibility and phase timings, fuel and Guardian strategy, effective-buff rules, reward notes and the four supplied map images.

Version 1.37 adds Alliance Showdown, includes the six stage themes and corrected 13-point VP distribution, explains linked Tundra Trade Route and reward eligibility, and embeds the supplied winning/losing reward screenshots.

Version 1.38 places Canyon Clash and Alliance Showdown cards in the Events guide catalogue as well as the newest-materials feature.

Version 1.39 adds King of Icefield to Events and Home featured guides, updates stage themes and scoring references, and explains milestone/medal/state/cross-state rewards.

Version 1.40 adds bundled custom SVG illustrations for the King of Icefield medal, reward tracks and seven-stage schedule so the guide visuals work offline.

Version 1.41 embeds all four Canyon Clash map references directly in the page so they load even when the separate assets folder was not uploaded correctly.


Version 1.42 embeds the King of Icefield reward illustrations in the HTML so they display even if the hosting upload omits the separate SVG assets.


Version 1.43 embeds the Alliance Showdown winning and losing reward examples in the HTML to prevent broken image paths on the published site.


Version 1.44 embeds every image referenced by the page directly in index.html. The page can be published as a single file; a separate assets folder is no longer required for these images.


Version 1.45 adds the SVS event guide: updated five-day preparation and scoring references, matchmaking, Sunfire Castle battle, rewards, Field Triage, the shared spreadsheet calculator and supplied prep matrix embedded in the page.


SVS first-event update: added a young-state preparation checklist with conditional unlocks and updated sources. See the in-guide First SvS section.

SvS update: first-event checklist is a two-column, no-horizontal-scroll table; clarified complete Castle Battle schedule, Alert Zone storm and teleport/shield rules, turret mechanics, 2.5-hour hold victory condition, and President appointment.

SVS priority update: moved SvS to the first Event Center card, added gold-violet emphasis and priority labels on Featured guides, and added a priority banner to the guide. English and Polish labels included.

SVS featured card background now matches the Sunfire Castle timer card: plum gradient, amber glow, and gold border treatment.

Featured guides: SvS stays pinned as the first card; the next two cards are selected from the two most recently added guides.

Guide reading: the modal close button now stays sticky at the top of the scrolling guide, so it remains available while reading.

Homepage search now renders matching guide cards directly below the search field, including an empty-state message when no guide matches.

Added Arena guide covering the weekly alternating Exploration and Expedition formats, daily attempts/points/ranks, formations, mode-specific stats, shop planning, and current sources.

Added The Labyrinth guide with current zone names plus legacy aliases, unlocks/stat sources, weekly schedule, DYN-supplied starter troop ratios clearly labeled as suggestions, attempts/resets/raid, and checked references.

Version 1.55 adds the seven-day Hall of Chiefs event guide with reviewed scoring tables and self-contained reference images. The Labyrinth guide label now reads Ratio.

Version 1.56 adds Snowbusters, Dreamscape Memory, Deadshot Tundra, Defeat Nearby Beasts, Journey of Light and Mia Fortune event guides. Event rules are source-linked; the supplied Gen 7 beast reward image is embedded in the page.

Version 1.57 fixes the Event Center click handlers for six newly added guides.

Version 1.58 improves the opening visuals and table styling for Mia Fortune, Journey of Light, Dreamscape Memory and Defeat Nearby Beasts.


Version 1.59 adds source-credited image galleries to Mia’s Fortune, Journey of Light, Defeat Nearby Beasts, Deadshot Tundra, Dreamscape Memory and Snowbusters. Images use HTTPS links to the credited guide sources. It also prevents a missing illustration from rendering the word undefined in a guide.

Version 1.60 fixes a JavaScript quoting error in the missing-image fallback that prevented all page scripts from running.

Version 1.61 replaces the broken Snowbusters gameplay GIF with a static multi-screen gameplay illustration from the 4Gamers Snowbusters guide.

Version 1.62 replaces the wide Snowbusters collage with a second portrait gameplay screenshot to make the two-image gallery visually balanced.

Version 1.63 adds Fishing Tournament and Frostfire Mine guides. Fishing upgrade priorities and event mechanics were cross-checked against Whiteout Survival Wiki, WOS Forge, and current community guides; Frostfire Mine uses the current WSCO slot schedule with an in-game schedule note. Both guides include credited reference images.

Version 1.64 adds Fishing Tournament and Frostfire Mine to the main guide catalog so they appear in homepage Featured guides, homepage search results and the Events section.

Version 1.65 introduces the custom DYN Frost Star brand mark: an icy crystal star in a luminous multicolor frame, with a restrained shimmer and reduced-motion support.

Version 1.66 builds a self-contained Gift Code Center on the v1.65 site and includes the published static catalog file gift-codes.json.











Wersja v1.74: uproszczony Gift Code Center pokazuje aktualne kody, pozwala je kopiować i prowadzi do oficjalnego portalu WOS. Zgłoszenie kodu otwiera publiczny formularz GitHub Issues z opcjonalną datą ważności.

Wersja v1.75: poprawiona kolejność menu, nazwa WikiWOS, złoto-fioletowy selektor języka oraz złote obramowania i poświata kliknięcia dla przycisków sekcji.

Wersja v1.76: zmiana kolorów rozwijanej listy języków na śliwkowe tło ze złotym zaznaczeniem; lista języków bez zmian.

Wersja v1.77: selektor języka ma złote tło i fioletową ramkę oraz fioletowe zaznaczenie opcji.

Wersja v1.78: usunięto dodatkowe przyciski języka z Gift Codes; sekcja korzysta z głównego selektora języka strony.

Wersja v1.79: hasło w nagłówku zmieniono na „United We Rise.” i dodano delikatny cień.

Wersja v1.80: hasło w nagłówku zmieniono na „Built to Win.”, zachowując liliowo-srebrny gradient i delikatne mienienie.

Wersja v1.81: „United We Rise.” wraca obok logo, a tytuł główny strony zmienia się na „Built to Win.” w liliowo-srebrnym, delikatnie mieniącym się stylu.

Wersja v1.82: usunięto wskazane dodatkowe teksty, poprawiono czytelność Gift Codes i uzupełniono przypisane role w Alliance Space.

Wersja v1.83: usunięto dodatkowy opis nad formularzem zgłoszenia kodu.

Wersja v1.84: wzmocniono hierarchię nagłówka Gift Code Center, przeniesiono małą datę aktualizacji pod kody i sformatowano ją lokalnie bez zapisu ISO.

Wersja v1.85: wyśrodkowano opisy i liczniki Bear Trap w kartach, pozostawiając ustawienia w prawym górnym rogu.

Wersja v1.86: przywrócono poprzedni układ kart Bear Trap.

Wersja v1.87: dodano własne szablony wiadomości i krótkie ściągi DYN dla sojuszu oraz R4/R5, z kopiowaniem jednym kliknięciem.

Wersja v1.88: dodano 16 własnych, edytowalnych szablonów wiadomości do wydarzeń, po angielsku i polsku. Każdy szablon można skopiować jednym kliknięciem.

Wersja v1.91: usunięto niedziałającą tabelę SvS wraz z polem do kopiowania.
