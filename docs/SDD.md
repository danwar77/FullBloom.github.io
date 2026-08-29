# SDD · Full Bloom v5

## Objetivo

SPA móvil y estática para equipos de Store Managers. Guía una dinámica híbrida configurable en tres actos; no puntúa, no declara ganadores y no registra datos personales.

## Arquitectura

- Vanilla HTML, CSS y JavaScript: `index.html`, `styles.css`, `config.js`, `content.es.js`, `content.pt.js` y `app.js`.
- El contenido editable está en `content.*.js`; los tiempos y endpoint, en `config.js`; la interacción y estado, en `app.js`.
- La sesión se guarda en `localStorage` con la clave `fullbloom2`. El acceso está protegido con `try/catch` y degrada a memoria si el navegador no permite persistir.
- La captura usa Google Apps Script y un `sessionId` anónimo para actualizar una sola fila por equipo en cada checkpoint.

## Flujo

`lang → welcome → req → priorities → puzzle → candidates → act2diag → ranking → enfoque → reveal → routeShadow → case → close`

Los cronómetros de acto no bloquean: al expirar persisten lo elegido, registran el timeout y avanzan. Las ventanas de deliberación aplican en requisición, candidato y caso. El juego puede reanudarse tras refresh y la sincronización no bloquea el recorrido.

## Contenido validado

`FullBloom_app` y `FullBloom_instrucciones_desarrollador_v5.md` son la fuente canónica de la experiencia. `content.es.js` contiene sus 9 requisitos, 33 opciones de requisición, 19 puzzles, 4 candidatos, 4 dimensiones y 9 casos. PT-BR es una capa parcial: cualquier clave ausente usa ES-LATAM como fallback.

## Reglas de continuidad

- El Acto 1 no interrumpe un puzzle cuando vence el tiempo; permite completar la entrevista y registra el timeout.
- Si vence un acto con datos incompletos, se conserva lo elegido y se completan solo los mínimos necesarios mediante el orden canónico del contenido.
- La deliberación mínima empieza al entrar en requisición, candidatos o caso; cambiar una selección no reinicia la espera.
- Cada checkpoint conserva la última versión del registro y Apps Script actualiza una única fila por `sessionId`.
