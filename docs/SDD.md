# SDD · Full Bloom v5

## Objetivo

SPA móvil y estática para equipos de Store Managers. Guía una dinámica híbrida de 90 minutos en tres actos; no puntúa, no declara ganadores y no registra datos personales.

## Arquitectura

- Vanilla HTML, CSS y JavaScript: `index.html`, `styles.css`, `config.js`, `content.es.js`, `content.pt.js` y `app.js`.
- El contenido editable está en `content.*.js`; los tiempos y endpoint, en `config.js`; la interacción y estado, en `app.js`.
- La sesión se guarda en `localStorage` con la clave `fullbloom2-v5`. Las partidas v4 bajo su clave previa se conservan sin tocarse.
- La captura usa Google Apps Script y un `sessionId` anónimo para actualizar una sola fila por equipo en cada checkpoint.

## Flujo

`lang → welcome → req → priorities → puzzle → candidates → act2diag → ranking → enfoque → reveal → routeShadow → case → close`

Los cronómetros de acto no bloquean: al expirar persisten lo elegido, registran el timeout y avanzan. Las ventanas de deliberación aplican en requisición, candidato y caso. El juego puede reanudarse tras refresh y la sincronización no bloquea el recorrido.

## Contenido provisional

El HTML de referencia v5 no fue entregado. Por eso los candidatos, distractores y preguntas de entrevista incluidos son provisionales y están agrupados en `content.es.js` para que HR pueda sustituirlos sin modificar `app.js`.
