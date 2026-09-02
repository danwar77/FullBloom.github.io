const SHEET_NAME = 'respuestas';
const HEADERS = [
  'session_id', 'timestamp', 'equipo', 'idioma', 'inicio',
  'competencias', 'prioridades', 'candidato', 'ranking', 'enfoque',
  'descuidada', 'retos', 'timeouts', 'fin',
];

function doPost(e) {
  const payload = JSON.parse(e.postData.contents);
  if (!payload.sessionId) throw new Error('sessionId is required');
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error('Missing sheet: ' + SHEET_NAME);
    if (sheet.getLastRow() === 0) sheet.appendRow(HEADERS);
    const row = [
      payload.sessionId, new Date(), payload.alias || '', payload.lang || '', payload.startedAt || '',
      (payload.seleccion?.elegidas || []).join('|'), (payload.seleccion?.prioridades || []).join('|'),
      payload.seleccion?.candidato || '', (payload.onboarding?.ranking || []).join('|'),
      JSON.stringify(payload.onboarding?.enfoque || {}), payload.onboarding?.descuidada || '',
      JSON.stringify(payload.retos || []),
      (payload.timeouts || []).join('|'), payload.finishedAt || '',
    ];
    const ids = sheet.getLastRow() > 1 ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues().flat() : [];
    const previous = ids.indexOf(payload.sessionId);
    if (previous >= 0) sheet.getRange(previous + 2, 1, 1, row.length).setValues([row]);
    else sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }
  return ContentService.createTextOutput('ok');
}
