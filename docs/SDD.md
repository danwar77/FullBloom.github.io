# SDD · Full Bloom

## Objetivo

Web app móvil para equipos de Store Managers durante la Store Manager Conference 2026. Guía una dinámica híbrida de 90 minutos con cartas físicas, tres actos y captura anónima. No muestra puntuación, ganadores ni respuestas correctas.

## Arquitectura

- SPA estática: `index.html`, `styles.css`, `config.js`, `content.es.js`, `content.pt.js` y `app.js`.
- Sin dependencias, framework, compilación ni servidor propio.
- Estado de sesión y buffer offline: `localStorage` bajo la clave configurable `fullbloom-session-v1`.
- Captura: Google Apps Script Web App que mantiene una única fila por `sessionId` anónimo.

## Contratos

- Todo copy y todos los casos viven en `content.es.js` y `content.pt.js`; el contenido incompleto de PT-BR usa ES como fallback.
- Los tiempos están centralizados en `config.js`.
- `best` e `isTrap` existen solo en los datos para facilitación/captura; la UI no los presenta como acierto o error.
- El juego avanza al agotar un cronómetro, registra el acto en `timeouts` y nunca bloquea por red.
- Cada checkpoint intenta sincronizar; si falla, el registro se conserva en localStorage y puede exportarse en JSON.

## Flujo

`lang → welcome → act1_select → act1_reveal → act2_radar → trap_reveal → act3_case → close`

Acto 1 exige cuatro rasgos salvo timeout. La sombra dominante se resuelve por peso y, ante empate, por orden de selección. Acto 2 muestra un caso aleatorio por eje. Acto 3 resuelve un caso por la sombra dominante o usa un fallback aleatorio si no existe.
