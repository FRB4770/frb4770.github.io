(() => {
  const root = document.getElementById('commander-frb-mount');
  if (!root || root.dataset.ready) return;
  root.dataset.ready = 'true';

  // Beginner knowledge for a Day 36 state: Gen 0/1 heroes, level-30 buildings, and the first three pets.
  const rounds = [
    { id:'basics', category:'Settlement & Survival', icon:'🏠', source:'FRB Beginner Guide', questions:[
      {q:'Which structure should be your top upgrade priority from the very beginning?',a:['The Furnace','The Embassy','The Infirmary'],correct:0,explain:'The Furnace is your main progression gate. Prioritize it to unlock more building levels and features.'},
      {q:'Which two early-game resources are most essential for powering the Furnace and upgrading most buildings?',a:['Coal and wood','Iron and meat','Gems and coal'],correct:0,explain:'Coal powers the Furnace, while wood is needed for most structures and upgrades.'},
      {q:'Which troop type beats Lancers, and which troop type beats Infantry?',a:['Infantry beats Lancers; Marksmen beat Infantry','Lancers beat Infantry; Infantry beat Marksmen','Marksmen beat Lancers; Lancers beat Infantry'],correct:0,explain:'Remember the troop counter: Infantry beats Lancers, and Marksmen beat Infantry.'},
      {q:'Should you spend speedups right away on short timers during your first few days?',a:['Save them for scoring events such as Hall of Chiefs','Use every speedup as soon as you get it','Spend them only on troop healing'],correct:0,explain:'Save speedups for event scoring windows, such as Hall of Chiefs, instead of using them immediately on short timers.'},
      {q:'What is the main trade-off when workers gather at world-map nodes outside the city?',a:['They gather faster, but can be exposed to cold and may need to return to heated zones','They gather more slowly, but never need warmth','They cannot bring resources back to the city'],correct:0,explain:'Outer nodes gather faster, but workers are exposed to the cold. Move them back to heated zones when temperatures drop.'}
    ]},
    { id:'heroes-events', category:'Heroes & Early Events', icon:'⚔', source:'FRB Early-State Notes', questions:[
      {q:'Which early heroes are commonly recommended for joining rallies and helping in Bear Trap rallies?',a:['Jessie, Jasser and Seo-Yoon','Sergey, Patrick and Gina','Molly, Natalia and Jeronimo'],correct:0,explain:'Jessie, Jasser and Seo-Yoon are common early rally joiners. For a Bear Trap rally, put your chosen joiner hero in the first slot.'},
      {q:'According to the FRB Sunfire Castle callout, which hero pair is used for attack and defense?',a:['Jessie for attack; Patrick for defense','Patrick for attack; Jessie for defense','Gina for attack; Molly for defense'],correct:0,explain:'FRB’s early-state callout is Jessie for attack and Patrick for defense. Follow your alliance’s current assignment.'},
      {q:'Which early hero is commonly used for Exploration and can lead a rally?',a:['Molly','Patrick','Jasser'],correct:0,explain:'Molly is used for Exploration and rally leading in the early roster.'},
      {q:'You are marching to attack a beast on the world map. Which hero is the Growth pick with useful support for this job?',a:['Gina','Sergey','Jessie'],correct:0,explain:'Gina is better classified as Growth than Combat and is useful as support when attacking monsters on the map.'},
      {q:'What is a good beginner approach to an early alliance event such as Bear Trap?',a:['Join rallies on time and use a recommended rally-joiner hero in the first slot','Start a solo attack with every march','Spend speedups before checking the event'],correct:0,explain:'Participate with your alliance. For a Bear Trap rally join, the first hero slot matters; use a recommended joiner such as Jessie, Jasser or Seo-Yoon.'}
    ]},
    { id:'first-pets', category:'First Pets · Gen 1', icon:'🐾', source:'FRB Pet Guide · Early-State Range', questions:[
      {q:'What is the correct order of the first three Gen 1 pets?',a:['Cave Hyena → Arctic Wolf → Musk Ox','Musk Ox → Arctic Wolf → Cave Hyena','Arctic Wolf → Cave Hyena → Musk Ox'],correct:0,explain:'The first pet sequence is Cave Hyena, Arctic Wolf and Musk Ox. This round stays with the early-state pets.'},
      {q:'What item do you use to gain pet levels?',a:['Pet Food','Taming Manuals only','Coal'],correct:0,explain:'Pet Food gives pets experience and raises their level. Advancement materials are used at milestone levels.'},
      {q:'When is it useful to activate a pet skill?',a:['Before the matching activity, such as a relevant building, resource or battle task','Only after the activity ends','Only while the pet is on an Adventure'],correct:0,explain:'Use a pet skill before the activity it supports so the bonus can help with that task.'}
    ]}
  ];

  const esc = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const roundMarkup = round => `<div class="commander-play" data-round="${round.id}" hidden>
    <div class="commander-playhead"><div><span class="commander-kicker">${esc(round.source)}</span><h3>${esc(round.category)}</h3></div><button class="commander-back" type="button">← Missions</button></div>
    <div class="commander-progress-row"><span class="commander-progress-label">Question <b class="commander-current">1</b> of ${round.questions.length}</span><span class="commander-score-label">Score <b class="commander-score">0</b></span></div>
    <div class="commander-progress"><span></span></div>
    <div class="commander-question-list">${round.questions.map((item,index)=>`<article class="commander-question" data-question="${index}" ${index?'hidden':''}>
      <h4>${esc(item.q)}</h4><div class="commander-answers">${item.a.map((answer,answerIndex)=>`<button class="commander-answer" type="button" data-answer="${answerIndex}"><span class="commander-answer-mark">${String.fromCharCode(65+answerIndex)}</span><span>${esc(answer)}</span></button>`).join('')}</div>
      <div class="commander-feedback" hidden><strong class="commander-result"><span class="commander-correct-label">Correct call</span><span class="commander-wrong-label" hidden>Not quite</span></strong><p>${esc(item.explain)}</p><button class="commander-next" type="button">${index===round.questions.length-1?'See my result':'Next question'} <span aria-hidden="true">→</span></button></div>
    </article>`).join('')}</div>
    <div class="commander-finish" hidden><span class="commander-finish-icon">✦</span><h4>Round complete</h4><p class="commander-final-score">You scored <b>0</b> out of ${round.questions.length}.</p><p class="commander-finish-note">Keep learning with the FRB field guides.</p><button class="commander-retry" type="button">Choose another round</button></div>
  </div>`;

  root.innerHTML = `<section class="commander-game" aria-labelledby="commander-title">
    <div class="commander-topline"><span class="commander-emblem" aria-hidden="true">✦</span><div><p class="commander-kicker">FRB FIELD TRAINING</p><h2 id="commander-title">Commander FRB</h2></div><span class="commander-tag">BEGINNER CHALLENGE</span></div>
    <p class="commander-lede">Test your early-game knowledge with short FRB field scenarios. Learn the call behind each answer as you play.</p>
    <div class="commander-stage-note"><span aria-hidden="true">❄</span><span><strong>Early-state training</strong> · Around Day 36 · Gen 0/1 heroes · Buildings up to Lv. 30</span></div>
    <div class="commander-meta"><span>❄ Guide-based questions</span><span>◷ Quick rounds</span><span>✦ No in-game resources used</span></div>
    <div class="commander-missions" aria-label="Choose a training mission">${rounds.map(round=>`<button class="commander-mission" type="button" data-start="${round.id}"><span class="commander-mission-icon" aria-hidden="true">${round.icon}</span><span class="commander-mission-copy"><strong>${esc(round.category)}</strong><small>${round.questions.length} questions · ${esc(round.source)}</small></span><span class="commander-arrow" aria-hidden="true">›</span></button>`).join('')}</div>
    ${rounds.map(roundMarkup).join('')}
    <p class="commander-footnote">The quiz stays within early-state knowledge. Hero assignments follow FRB callouts; always follow your alliance’s live event instructions.</p>
  </section>`;

  const missions = root.querySelector('.commander-missions');
  let active = null;
  function resetRound(panel, round) {
    panel.querySelectorAll('.commander-question').forEach((card,index)=>{
      card.hidden = index !== 0;
      delete card.dataset.answered;
      card.querySelectorAll('.commander-answer').forEach(option=>{option.disabled=false;option.classList.remove('is-correct','is-wrong')});
      card.querySelector('.commander-feedback').hidden=true;
      card.querySelector('.commander-correct-label').hidden=false;
      card.querySelector('.commander-wrong-label').hidden=true;
    });
    panel.querySelector('.commander-current').textContent='1';
    panel.querySelector('.commander-score').textContent='0';
    panel.querySelector('.commander-progress span').style.width='0%';
    panel.querySelector('.commander-progress-row').hidden=false;
    panel.querySelector('.commander-progress').hidden=false;
    panel.querySelector('.commander-finish').hidden=true;
    panel.querySelector('.commander-final-score b').textContent='0';
    panel.dataset.score='0';panel.dataset.current='0';
  }
  rounds.forEach(round=>{
    const panel=root.querySelector(`[data-round="${round.id}"]`);
    panel.querySelector('.commander-back').addEventListener('click',()=>{panel.hidden=true;missions.hidden=false});
    panel.querySelector('.commander-retry').addEventListener('click',()=>{panel.hidden=true;missions.hidden=false});
    panel.querySelectorAll('.commander-question').forEach((card,index)=>{
      card.querySelectorAll('.commander-answer').forEach(button=>button.addEventListener('click',()=>{
        if(card.dataset.answered) return;
        card.dataset.answered='true';
        const isCorrect=Number(button.dataset.answer)===round.questions[index].correct;
        const score=Number(panel.dataset.score||0)+(isCorrect?1:0);
        panel.dataset.score=String(score);
        card.querySelectorAll('.commander-answer').forEach((option,optionIndex)=>{
          option.disabled=true;
          if(optionIndex===round.questions[index].correct) option.classList.add('is-correct');
          else if(option===button) option.classList.add('is-wrong');
        });
        card.querySelector('.commander-correct-label').hidden=!isCorrect;
        card.querySelector('.commander-wrong-label').hidden=isCorrect;
        card.querySelector('.commander-feedback').hidden=false;
        panel.querySelector('.commander-score').textContent=score;
      }));
      card.querySelector('.commander-next').addEventListener('click',()=>{
        card.hidden=true;
        const current=Number(panel.dataset.current||0)+1;
        panel.dataset.current=String(current);
        panel.querySelector('.commander-current').textContent=Math.min(current+1,round.questions.length);
        panel.querySelector('.commander-progress span').style.width=`${current/round.questions.length*100}%`;
        if(current<round.questions.length) panel.querySelector(`[data-question="${current}"]`).hidden=false;
        else {
          panel.querySelector('.commander-final-score b').textContent=panel.dataset.score;
          panel.querySelector('.commander-progress-row').hidden=true;
          panel.querySelector('.commander-progress').hidden=true;
          panel.querySelector('.commander-finish').hidden=false;
        }
      });
    });
  });
  root.querySelectorAll('[data-start]').forEach(button=>button.addEventListener('click',()=>{
    missions.hidden=true;
    active=root.querySelector(`[data-round="${button.dataset.start}"]`);
    const round=rounds.find(item=>item.id===button.dataset.start);
    resetRound(active,round);
    active.hidden=false;
    active.scrollIntoView({behavior:'smooth',block:'nearest'});
  }));
})();
