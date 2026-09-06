const SHEET_NAME = 'respuestas';
const INTERACTIONS_SHEET_NAME = 'interacciones';

const HEADERS = [
  'session_id', 'timestamp', 'equipo', 'idioma', 'inicio',
  'competencias_ids', 'prioridades_ids', 'candidato_id', 'ranking_ids', 'enfoque_ids',
  'descuidada_id', 'retos_ids', 'timeouts', 'fin',
  'candidato_nombre', 'candidato_perfil', 'competencias_legibles', 'prioridades_legibles',
  'ranking_legible', 'enfoque_legible', 'descuidada_legible', 'retos_legibles',
  'total_clicks', 'historial_clicks', 'duracion_segundos', 'resultado_completo_json',
];

const INTERACTION_HEADERS = [
  'session_id', 'equipo', 'secuencia', 'fecha_hora', 'segundos_desde_inicio',
  'pantalla', 'accion', 'elemento_id', 'texto_visible', 'intencion',
];

function ensureSheet_(spreadsheet, name, headers) {
  const sheet = spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
  if (sheet.getMaxColumns() < headers.length) {
    sheet.insertColumnsAfter(sheet.getMaxColumns(), headers.length - sheet.getMaxColumns());
  }
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold');
  sheet.setFrozenRows(1);
  return sheet;
}

function list_(values) {
  return (values || []).join(' | ');
}

function readableFocus_(values) {
  return Object.entries(values || {})
    .map(([dimension, actions]) => `${dimension}: ${(actions || []).join(' / ')}`)
    .join('\n');
}

function readableChallenges_(retos) {
  return (retos || []).map((item, index) => {
    const decision = (item.eleccionTextos || []).join(' / ') || 'Sin respuesta';
    return `${index + 1}. ${item.fortaleza || item.retoId} — ${item.reto || ''}: ${decision}`;
  }).join('\n');
}

function readableClicks_(interactions) {
  return (interactions || []).map((item) =>
    `${item.sequence}. [${item.screenLabel || item.screen}] ${item.actionLabel || item.action}: ${item.text || item.targetId || ''} (${item.selection || 'acción'})`
  ).join('\n');
}

function durationSeconds_(payload) {
  if (!payload.startedAt || !payload.finishedAt) return '';
  return Math.max(0, Math.round((new Date(payload.finishedAt) - new Date(payload.startedAt)) / 1000));
}

function responseRow_(payload) {
  return [
    payload.sessionId, new Date(), payload.alias || '', payload.lang || '', payload.startedAt || '',
    list_(payload.seleccion?.elegidas), list_(payload.seleccion?.prioridades),
    payload.seleccion?.candidato || '', list_(payload.onboarding?.ranking),
    JSON.stringify(payload.onboarding?.enfoque || {}), payload.onboarding?.descuidada || '',
    JSON.stringify((payload.retos || []).map((item) => ({ retoId: item.retoId, eleccion: item.eleccion || [] }))),
    list_(payload.timeouts), payload.finishedAt || '',
    payload.seleccion?.candidatoNombre || '', payload.seleccion?.candidatoPerfil || '',
    list_(payload.seleccion?.elegidasLabels), list_(payload.seleccion?.prioridadesLabels),
    list_(payload.onboarding?.rankingLabels), readableFocus_(payload.onboarding?.enfoqueLabels),
    payload.onboarding?.descuidadaLabel || '', readableChallenges_(payload.retos),
    (payload.interactions || []).length, readableClicks_(payload.interactions),
    durationSeconds_(payload), JSON.stringify(payload),
  ];
}

function upsertResponse_(sheet, payload) {
  const row = responseRow_(payload);
  const ids = sheet.getLastRow() > 1
    ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues().flat()
    : [];
  const previous = ids.indexOf(payload.sessionId);
  if (previous >= 0) sheet.getRange(previous + 2, 1, 1, row.length).setValues([row]);
  else sheet.getRange(sheet.getLastRow() + 1, 1, 1, row.length).setValues([row]);
}

function interactionRow_(payload, item) {
  return [
    payload.sessionId, payload.alias || '', item.sequence || '', item.at || '',
    item.elapsedSeconds ?? '', item.screenLabel || item.screen || '',
    item.actionLabel || item.action || '', item.targetId || '', item.text || '', item.selection || '',
  ];
}

function upsertInteractions_(sheet, payload) {
  const interactions = payload.interactions || [];
  if (!interactions.length) return;
  const existing = sheet.getLastRow() > 1
    ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 3).getValues()
    : [];
  const rowsByKey = new Map(existing.map((row, index) => [`${row[0]}::${row[2]}`, index + 2]));
  const newRows = [];
  interactions.forEach((item) => {
    const row = interactionRow_(payload, item);
    const previousRow = rowsByKey.get(`${payload.sessionId}::${item.sequence}`);
    if (previousRow) sheet.getRange(previousRow, 1, 1, row.length).setValues([row]);
    else newRows.push(row);
  });
  if (newRows.length) {
    sheet.getRange(sheet.getLastRow() + 1, 1, newRows.length, INTERACTION_HEADERS.length).setValues(newRows);
  }
}

function doPost(e) {
  if (!e?.postData?.contents) {
    return ContentService.createTextOutput('Este método se prueba mediante una solicitud HTTP POST, no con el botón Ejecutar.');
  }
  const payload = JSON.parse(e.postData.contents);
  if (!payload.sessionId) throw new Error('sessionId is required');
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const responsesSheet = ensureSheet_(spreadsheet, SHEET_NAME, HEADERS);
    const interactionsSheet = ensureSheet_(spreadsheet, INTERACTIONS_SHEET_NAME, INTERACTION_HEADERS);
    upsertResponse_(responsesSheet, payload);
    upsertInteractions_(interactionsSheet, payload);
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput('ok');
}
