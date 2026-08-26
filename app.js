(() => {
  const { CONFIG, CONTENT_ES, CONTENT_PT } = window;
  const app = document.querySelector('#app');
  let state = load() || fresh();
  let timerId = null;
  let showResume = Boolean(state.startedAt && !state.finishedAt);

  function fresh() {
    return {
      screen: 'lang', lang: null, teamAlias: '', sessionId: crypto.randomUUID(), startedAt: null, finishedAt: null,
      activeAct: null, actStartedAt: null, actDeadline: null, deliberationStartedAt: null,
      act1: { chosen: [], archetypeId: null, dominantShadow: null },
      act2: { caseIds: {}, choices: {}, trapsFallen: [] }, act3: { challengeId: null, choice: null },
      timeouts: [], pendingSync: false, lastSyncAt: null,
    };
  }

  function load() {
    try { return JSON.parse(localStorage.getItem(CONFIG.storageKey)); } catch { return null; }
  }
  function save() { localStorage.setItem(CONFIG.storageKey, JSON.stringify(state)); }
  function reset() { state = fresh(); showResume = false; save(); render(); }
  function copy(target, source) {
    Object.entries(source || {}).forEach(([key, value]) => {
      if (value && typeof value === 'object' && !Array.isArray(value)) target[key] = copy({ ...(target[key] || {}) }, value);
      else target[key] = value;
    });
    return target;
  }
  function C() { return state.lang === 'pt' ? copy(copy({}, CONTENT_ES), CONTENT_PT) : CONTENT_ES; }
  function esc(value) { return String(value ?? '').replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char])); }
  function actName(id) { return id === 'act1' ? '1 · La selección' : id === 'act2' ? '2 · Radar del Onboarding' : '3 · El caso'; }
  function fmt(seconds) { const value = Math.max(0, seconds); return `${String(Math.floor(value / 60)).padStart(2, '0')}:${String(value % 60).padStart(2, '0')}`; }
  function secondsLeft() { return state.actDeadline ? Math.max(0, Math.ceil((state.actDeadline - Date.now()) / 1000)) : 0; }
  function deliberationLeft() {
    if (!state.deliberationStartedAt) return 0;
    const seconds = state.screen === 'act1_select' ? CONFIG.deliberationMin.act1 : CONFIG.deliberationMin.act3case;
    return Math.max(0, Math.ceil(((state.deliberationStartedAt + seconds * 1000) - Date.now()) / 1000));
  }
  function byId(list, id) { return list.find((item) => item.id === id); }
  function selectedCharacteristics() { return state.act1.chosen.map((id) => byId(C().characteristics, id)).filter(Boolean); }

  function startAct(act, screen) {
    state.activeAct = act;
    state.actStartedAt = Date.now();
    state.actDeadline = state.actStartedAt + CONFIG.timers[act] * 1000;
    state.screen = screen;
    state.deliberationStartedAt = act === 'act1' ? Date.now() : null;
    save(); render();
  }
  function go(screen, options = {}) {
    state.screen = screen;
    state.activeAct = options.keepTimer ? state.activeAct : null;
    state.actStartedAt = options.keepTimer ? state.actStartedAt : null;
    state.actDeadline = options.keepTimer ? state.actDeadline : null;
    state.deliberationStartedAt = options.deliberation ? Date.now() : null;
    save(); render();
  }
  function markTimeout(act) {
    if (!state.timeouts.includes(act)) state.timeouts.push(act);
  }
  function checkpoint() { state.pendingSync = true; save(); syncToSheet(); }

  function dominantFamily(chosen) {
    const counts = chosen.reduce((result, item) => ({ ...result, [item.familia]: (result[item.familia] || 0) + 1 }), {});
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'empuje';
  }
  function resolveAct1() {
    const selected = selectedCharacteristics();
    const ordered = [...selected].sort((a, b) => (b.peso - a.peso) || (state.act1.chosen.indexOf(a.id) - state.act1.chosen.indexOf(b.id)));
    const key = ordered[0];
    const family = dominantFamily(selected);
    const archetype = C().archetypes.find((item) => item.match.dominantFamily === family && item.match.keyCharacteristic === key?.id)
      || C().archetypes.find((item) => item.match.dominantFamily === family && !item.match.keyCharacteristic)
      || C().archetypes[0];
    return { archetype, dominantShadow: key?.shadowId || null };
  }
  function confirmAct1() {
    const result = resolveAct1();
    state.act1.archetypeId = result.archetype.id;
    state.act1.dominantShadow = result.dominantShadow;
    go('act1_reveal'); checkpoint();
  }
  function caseForAxis(axis) {
    return byId(axis.cases, state.act2.caseIds[axis.id]) || axis.cases[0];
  }
  function prepareRadar() {
    C().radar.axes.forEach((axis) => {
      if (state.act2.caseIds[axis.id]) return;
      const cases = CONFIG.radarCasesPerAxis === 2 ? axis.cases : [axis.cases[Math.floor(Math.random() * axis.cases.length)]];
      state.act2.caseIds[axis.id] = cases.map((item) => item.id);
    });
  }
  function radarCases(axis) { return (state.act2.caseIds[axis.id] || []).map((id) => byId(axis.cases, id)).filter(Boolean); }
  function completeRadar() {
    state.act2.trapsFallen = C().radar.axes.flatMap((axis) => radarCases(axis).filter((item) => byId(item.options, state.act2.choices[item.id])?.isTrap).map(() => axis.id));
    go('trap_reveal'); checkpoint();
  }
  function resolveChallenge() {
    return C().challenges.find((item) => item.shadowId === state.act1.dominantShadow) || C().challenges[Math.floor(Math.random() * C().challenges.length)];
  }
  function finishGame() {
    state.finishedAt = new Date().toISOString();
    go('close'); checkpoint();
  }
  function handleTimeout() {
    const act = state.activeAct;
    if (!act || secondsLeft() > 0) return;
    markTimeout(act);
    if (act === 'act1') confirmAct1();
    if (act === 'act2') completeRadar();
    if (act === 'act3') finishGame();
  }
  function record() {
    return {
      sessionId: state.sessionId, teamAlias: state.teamAlias, lang: state.lang, startedAt: state.startedAt, finishedAt: state.finishedAt || null,
      act1: state.act1, act2: { choices: state.act2.choices, trapsFallen: state.act2.trapsFallen }, act3: state.act3, timeouts: state.timeouts,
    };
  }
  async function syncToSheet() {
    if (!CONFIG.sheetEndpoint || !navigator.onLine || !state.pendingSync) return;
    try {
      await fetch(CONFIG.sheetEndpoint, { method: 'POST', mode: 'no-cors', headers: { 'Content-Type': 'text/plain;charset=utf-8' }, body: JSON.stringify(record()) });
      state.pendingSync = false;
      state.lastSyncAt = new Date().toISOString();
      save(); render();
    } catch { save(); }
  }
  function exportRecord() {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([JSON.stringify(record(), null, 2)], { type: 'application/json' }));
    link.download = `full-bloom-${state.teamAlias.replace(/\s+/g, '-').toLowerCase() || 'equipo'}.json`;
    link.click(); URL.revokeObjectURL(link.href);
  }

  function shell(body, options = {}) {
    const content = C();
    const timer = state.activeAct ? `<div class="timer" aria-label="${esc(content.ui.timer)}"><span>${esc(actName(state.activeAct))}</span><strong data-timer-value>${fmt(secondsLeft())}</strong></div>` : '';
    const offline = !navigator.onLine ? `<p class="notice" role="status">${esc(content.ui.offline)}</p>` : '';
    return `<div class="app-shell"><header class="topbar"><div><p class="brand">Full <i>Bloom</i></p><p class="tagline">${esc(CONFIG.tagline[state.lang] || CONFIG.tagline.es)}</p></div>${timer}</header>${offline}<section class="screen ${options.dark ? 'dark-screen' : ''}">${body}</section></div>`;
  }
  function primary(label, action, disabled = false, extra = '') { return `<button class="button primary" data-action="${action}" ${disabled ? 'disabled' : ''} ${extra}>${esc(label)}</button>`; }
  function secondary(label, action) { return `<button class="button secondary" data-action="${action}">${esc(label)}</button>`; }

  function renderLanguage() {
    const content = CONTENT_ES;
    app.innerHTML = `<div class="app-shell intro"><section class="screen intro-screen"><p class="brand large"><img class="brand-mark" src="icono_pandora.webp" alt="Pandora" /><span>Full <i>Bloom</i></span></p><p class="tagline">${esc(CONFIG.tagline.es)}</p><h1>${esc(content.ui.language)}</h1><div class="language-actions"><button class="language-button" data-action="language-es">Español <small>(LATAM)</small></button><button class="language-button" data-action="language-pt">Português <small>(Brasil)</small></button></div></section><footer class="welcome-credit">© 2026, Danwar77 <a href="https://github.com/danwar77" target="_blank" rel="noreferrer" aria-label="GitHub de Danwar77"><svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M8 0a8 8 0 0 0-2.53 15.59c.4.07.55-.17.55-.38v-1.5c-2.23.49-2.7-.95-2.7-.95-.36-.93-.89-1.17-.89-1.17-.73-.5.06-.49.06-.49.81.06 1.23.83 1.23.83.72 1.23 1.88.88 2.34.67.07-.52.28-.88.51-1.08-1.78-.2-3.65-.89-3.65-3.96 0-.88.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82A7.66 7.66 0 0 1 8 1.87c.68 0 1.36.09 2 .27 1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.08-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 8 0Z" /></svg><span>GitHub</span></a></footer></div>`;
  }
  function renderWelcome() {
    const c = C();
    app.innerHTML = shell(`<p class="eyebrow">${esc(c.welcome.eyebrow)}</p><h1>${esc(c.welcome.title)}</h1><p class="lead">${esc(c.welcome.premise)}</p><p class="rule">${esc(c.welcome.rules)}</p><label class="field"><span>${esc(c.welcome.aliasLabel)}</span><input id="team-alias" maxlength="30" autocomplete="off" value="${esc(state.teamAlias)}" aria-describedby="alias-help" /><small id="alias-help">${esc(c.welcome.aliasHelp)}</small></label><div class="action-bar">${primary(c.welcome.start, 'start', !state.teamAlias.trim())}</div>`);
  }
  function renderAct1() {
    const c = C(); const selected = state.act1.chosen; const left = deliberationLeft();
    const cards = c.characteristics.map((item) => {
      const active = selected.includes(item.id); const blocked = selected.length >= CONFIG.choose && !active;
      return `<article class="trait ${active ? 'selected' : ''}"><button data-action="trait" data-id="${item.id}" aria-pressed="${active}" ${blocked ? 'disabled' : ''}><span class="trait-index">${active ? 'Seleccionada' : item.familia}</span><strong>${esc(item.name)}</strong><span>${esc(item.caraA)}</span></button><details><summary>Ver cara B</summary><p>${esc(item.caraB)}</p></details></article>`;
    }).join('');
    const label = left ? `${c.ui.confirm} (${left}s)` : c.ui.confirm;
    app.innerHTML = shell(`<p class="eyebrow">Acto 1 · La selección</p><h1>${esc(c.ui.choose)} ${CONFIG.choose}</h1><p class="selection-count" aria-live="polite">${selected.length}/${CONFIG.choose} ${esc(c.ui.selected)}</p><div class="trait-grid">${cards}</div><div class="action-bar"><p class="helper">${left ? 'Deliberad antes de registrar vuestra selección.' : c.ui.incomplete}</p>${primary(label, 'confirm-act1', selected.length !== CONFIG.choose || left > 0, `data-deliberation-button data-base-label="${esc(c.ui.confirm)}"`)}</div>`);
  }
  function renderAct1Reveal() {
    const c = C(); const result = resolveAct1(); const traits = selectedCharacteristics();
    const traitsHtml = traits.length ? traits.map((item) => `<li><strong>${esc(item.name)}</strong><span>${esc(item.caraA)}</span><small>${esc(item.caraB)}</small></li>`).join('') : `<li>${esc(c.ui.noSelection)}</li>`;
    app.innerHTML = shell(`<p class="eyebrow">${esc(c.ui.reveal)}</p><p class="flower-mark" aria-hidden="true">✦</p><h1>${esc(result.archetype.name)}</h1><p class="birthday">${esc(result.archetype.birthday)}</p><p class="lead">${esc(result.archetype.blurb)}</p><h2>Las facetas elegidas</h2><ul class="trait-summary">${traitsHtml}</ul><div class="action-bar">${primary(c.ui.continue, 'start-act2')}</div>`);
  }
  function renderRadar() {
    const c = C(); const sections = c.radar.axes.map((axis) => radarCases(axis).map((caseItem) => `<article class="radar-case"><p class="axis-label">${esc(axis.label)}</p><h2>${esc(caseItem.escena)}</h2><p class="thinking"><b>${esc(c.ui.thinking)}</b> ${esc(caseItem.pensando)}</p><div class="options">${caseItem.options.map((option) => `<button class="option ${state.act2.choices[caseItem.id] === option.id ? 'selected' : ''}" data-action="radar-choice" data-case="${caseItem.id}" data-option="${option.id}" aria-pressed="${state.act2.choices[caseItem.id] === option.id}"><b>${option.id}</b><span>${esc(option.text)}</span></button>`).join('')}</div></article>`).join('')).join('');
    const allCases = c.radar.axes.flatMap(radarCases); const complete = allCases.every((item) => state.act2.choices[item.id]);
    app.innerHTML = shell(`<p class="eyebrow">Acto 2 · ${esc(c.ui.radar)}</p><h1>Cuatro ejes para acompañar</h1><p class="lead">Conversad con las cartas y registrad una decisión por escena.</p><div class="radar-list">${sections}</div><div class="action-bar">${primary(c.ui.continue, 'complete-radar', !complete)}</div>`);
  }
  function renderTrapReveal() {
    const c = C(); const lessons = c.radar.axes.map((axis) => radarCases(axis).map((caseItem) => `<article class="lesson"><p class="axis-label">${esc(axis.label)}</p><h2>${esc(caseItem.trampa)}</h2><p>${esc(caseItem.mensaje)}</p></article>`).join('')).join('');
    app.innerHTML = shell(`<p class="eyebrow">${esc(c.ui.reveal)}</p><h1>Lo que conviene vigilar</h1><div class="lesson-list">${lessons}</div><p class="rule">${esc(c.ui.radarSheet)}</p><div class="action-bar">${primary(c.ui.continue, 'start-act3')}</div>`);
  }
  function renderAct3() {
    const c = C(); const item = resolveChallenge(); state.act3.challengeId = item.id; const left = deliberationLeft();
    const label = left ? `${c.ui.register} (${left}s)` : c.ui.register;
    app.innerHTML = shell(`<p class="eyebrow">Acto 3 · El caso</p><p class="axis-label">${esc(item.title)}</p><h1>${esc(item.escena)}</h1><div class="options case-options">${item.options.map((option) => `<button class="option ${state.act3.choice === option.id ? 'selected' : ''}" data-action="case-choice" data-option="${option.id}" aria-pressed="${state.act3.choice === option.id}"><b>${option.id}</b><span>${esc(option.text)}</span></button>`).join('')}</div><div class="action-bar">${primary(label, 'finish', !state.act3.choice || left > 0, `data-deliberation-button data-base-label="${esc(c.ui.register)}"`)}</div>`, { dark: true });
  }
  function renderClose() {
    const c = C(); const archetype = resolveAct1().archetype; const challenge = resolveChallenge();
    const status = state.pendingSync ? c.ui.syncPending : state.lastSyncAt ? c.ui.syncDone : '';
    app.innerHTML = shell(`<p class="eyebrow">${esc(c.ui.close)}</p><p class="flower-mark" aria-hidden="true">✦</p><h1>${esc(c.ui.built)}</h1><div class="summary"><p><span>Equipo</span><strong>${esc(state.teamAlias)}</strong></p><p><span>Asociada</span><strong>${esc(archetype.name)}</strong></p><p><span>Caso</span><strong>${esc(challenge.title)}</strong></p><p><span>Decisión</span><strong>${esc(state.act3.choice || c.ui.noAnswer)}</strong></p></div><p class="sync-status" role="status">${esc(status)}</p><div class="button-stack">${secondary(c.ui.sync, 'sync')}${secondary(c.ui.export, 'export')}${secondary(c.ui.restart, 'restart')}</div>`);
  }
  function renderResume() {
    const c = C();
    app.insertAdjacentHTML('beforeend', `<div class="modal-backdrop"><section class="resume-modal" role="dialog" aria-modal="true" aria-labelledby="resume-title"><p class="eyebrow">Full Bloom</p><h1 id="resume-title">${esc(c.ui.resumed)}</h1><p>Hay una partida guardada en este dispositivo.</p>${primary(c.ui.resume, 'resume')}${secondary(c.ui.restart, 'restart')}</section></div>`);
  }
  function updateTemporalUi() {
    const timer = app.querySelector('[data-timer-value]');
    if (timer) timer.textContent = fmt(secondsLeft());

    const deliberationButton = app.querySelector('[data-deliberation-button]');
    if (!deliberationButton) return;
    const left = deliberationLeft();
    deliberationButton.textContent = left ? `${deliberationButton.dataset.baseLabel} (${left}s)` : deliberationButton.dataset.baseLabel;
    const selectionReady = deliberationButton.dataset.action === 'confirm-act1'
      ? state.act1.chosen.length === CONFIG.choose
      : Boolean(state.act3.choice);
    deliberationButton.disabled = left > 0 || !selectionReady;
  }
  function hasActiveClock() { return Boolean(state.activeAct) || deliberationLeft() > 0; }
  function ensureClock() {
    if (!hasActiveClock()) {
      clearInterval(timerId); timerId = null;
      return;
    }
    updateTemporalUi();
    if (timerId !== null) return;
    timerId = window.setInterval(() => {
      handleTimeout();
      updateTemporalUi();
      if (!hasActiveClock()) { clearInterval(timerId); timerId = null; }
    }, 250);
  }
  function render() {
    if (state.screen === 'lang') renderLanguage();
    else if (state.screen === 'welcome') renderWelcome();
    else if (state.screen === 'act1_select') renderAct1();
    else if (state.screen === 'act1_reveal') renderAct1Reveal();
    else if (state.screen === 'act2_radar') renderRadar();
    else if (state.screen === 'trap_reveal') renderTrapReveal();
    else if (state.screen === 'act3_case') renderAct3();
    else renderClose();
    if (showResume) renderResume();
    ensureClock();
  }

  app.addEventListener('input', (event) => {
    if (event.target.id === 'team-alias') {
      state.teamAlias = event.target.value.slice(0, 30); save();
      const start = app.querySelector('[data-action="start"]');
      if (start) start.disabled = !state.teamAlias.trim();
    }
  });
  app.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action]'); if (!button || button.disabled) return;
    const action = button.dataset.action;
    if (action.startsWith('language-')) { state.lang = action.slice(-2); state.screen = 'welcome'; save(); render(); }
    else if (action === 'start') { state.startedAt = new Date().toISOString(); startAct('act1', 'act1_select'); }
    else if (action === 'trait') { const id = button.dataset.id; const has = state.act1.chosen.includes(id); state.act1.chosen = has ? state.act1.chosen.filter((item) => item !== id) : [...state.act1.chosen, id]; save(); render(); }
    else if (action === 'confirm-act1') confirmAct1();
    else if (action === 'start-act2') { prepareRadar(); startAct('act2', 'act2_radar'); }
    else if (action === 'radar-choice') { state.act2.choices[button.dataset.case] = button.dataset.option; save(); render(); }
    else if (action === 'complete-radar') completeRadar();
    else if (action === 'start-act3') { startAct('act3', 'act3_case'); state.deliberationStartedAt = Date.now(); save(); render(); }
    else if (action === 'case-choice') { state.act3.choice = button.dataset.option; save(); render(); }
    else if (action === 'finish') finishGame();
    else if (action === 'sync') { state.pendingSync = true; save(); syncToSheet(); render(); }
    else if (action === 'export') exportRecord();
    else if (action === 'restart') reset();
    else if (action === 'resume') { showResume = false; render(); }
  });
  window.addEventListener('online', () => { syncToSheet(); render(); });
  window.addEventListener('offline', render);
  window.addEventListener('popstate', () => { history.pushState({ fullBloom: true }, '', location.href); render(); });
  history.replaceState({ fullBloom: true }, '', location.href);
  render();
})();
