# Captura en Google Sheets · Full Bloom v5

1. Crea una Google Sheet con la pestaña `respuestas`.
2. En **Extensiones → Apps Script**, pega [`Code.gs`](../google-apps-script/Code.gs).
3. Despliega como **Aplicación web**, ejecutada como tú y accesible por cualquier persona.
4. Copia la URL terminada en `/exec` en `CONFIG.sheetEndpoint`.

La app envía checkpoints no bloqueantes con `no-cors` y `text/plain`. Cada `sessionId` anónimo actualiza su misma fila, por lo que una partida no se duplica al sincronizar varias veces.

Columnas: `session_id`, `timestamp`, `equipo`, `idioma`, `inicio`, `competencias`, `prioridades`, `errores_puzzles`, `candidato`, `ranking`, `enfoque`, `descuidada`, `sombra`, `decision`, `timeouts`, `fin`.

No se almacenan cuentas, perfiles ni datos personales. Si no hay red, el estado permanece en el navegador y se reintenta al volver la conexión.
