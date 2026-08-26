# Anexo al spec v2 — Dos decisiones cerradas

### La Gema del Tiempo · Persistencia del dato y reanudación tras refresh

Complementa al *Requisitos técnicos v2* (secciones §8 "Captura de datos" y el caso "Refresh / cierre accidental"). No lo reemplaza: cierra los dos puntos que quedaban abiertos. **Condición de partida: todo debe ser gratuito y de por vida** (no un plan de prueba que caduca). La arquitectura de abajo lo cumple entera.

---

## Decisión A · Dónde vive el dato → Google Sheet vía Apps Script

**Qué se usa:** las decisiones de cada equipo se guardan en una **Google Sheet de HR**, alimentada por un endpoint de **Google Apps Script**.

**Por qué:**

- Es **gratis de verdad y para siempre**: Apps Script no tiene plan de pago ni cobro por uso; viene incluido con cualquier cuenta de Google. HR ya trabaja sobre Google Drive.  
- **Sin backend ni base de datos que montar o mantener.** Nada que se facture ni que se rompa.  
- El dato aterriza **directamente en una hoja que HR abre y analiza** —justo para afinar RISE.  
- **Capacidad de sobra:** el límite es de miles de peticiones al día; una conferencia son unas decenas de equipos.

**Cómo funciona (resumen):** la app envía el registro del equipo (POST) a un Web App de Apps Script publicado; el script hace `appendRow()` en la Sheet. Una fila por equipo (o por acto, según se prefiera).

**Instrucción para el desarrollador:**

Persistir las respuestas en una Google Sheet de HR mediante un Apps Script Web App (`doPost(e)` → `SpreadsheetApp` → `appendRow`). Sin servidor propio, sin base de datos. La URL del Web App va en la capa de configuración de la app, no hardcodeada.

**Descartado (y por qué):** un BaaS tipo Firebase/Supabase —tiene plan gratuito, pero con cuenta aparte, más mantenimiento y riesgo de que el free tier cambie. Sobredimensionado para este volumen.

**Alojamiento de la app (aparte del dato):** la web app estática también se aloja gratis —GitHub Pages, Netlify, Cloudflare Pages, o dentro del propio Google/SharePoint de Pandora. Lo elige el desarrollador. *Los free tiers de terceros pueden cambiar: conviene confirmar el elegido en el momento de construir.*

---

## Decisión B · Reanudar tras refresh → Sí, con `localStorage`

**El problema:** si alguien recarga la página sin querer, o el móvil se bloquea y el navegador se reinicia, el equipo perdería el progreso del acto. En un juego contrarreloj, es un riesgo real.

**Qué se usa:** la app **persiste el estado del equipo en `localStorage`** del navegador, y al cargar comprueba si hay una partida en curso para reanudarla.

**Dos por uno:** ese mismo `localStorage` sirve de **buffer offline** —mantiene las respuestas en el dispositivo y las sincroniza con la Google Sheet en los checkpoints (fin de cada acto y al cerrar). Un solo mecanismo resuelve *reanudar tras refresh* y *no perder el dato si cae el wifi*.

**Instrucción para el desarrollador:**

Guardar el estado de la sesión del equipo en `localStorage` tras cada decisión; al iniciar, si existe una sesión sin cerrar, ofrecer reanudarla. Usar el mismo store como cola offline: bufferizar los registros y hacer flush a la Sheet cuando haya red; reintentar; como último recurso, permitir exportar/mostrar un código para recuperación manual.

**Límite honesto:** si los móviles se comparten y se limpian entre sesiones, `localStorage` se borra entonces. Pero dentro de la sesión de un equipo —que es la ventana de riesgo real— protege perfectamente contra recargas accidentales. No hace falta nada más sofisticado.

---

## En una línea

Toda la arquitectura es gratuita: **app alojada gratis · dato en una Google Sheet de HR (Apps Script) · guardado local en el navegador**. Nada de servidores, bases de datos de pago ni planes que caduquen.  
