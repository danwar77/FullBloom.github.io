# Full Bloom — Requisitos técnicos y de diseño (v4, definitivo)

### *cada decisión hace florecer o marchitar*

**Dinámica gamificada de liderazgo · Store Manager Conference 2026 · Pandora LATAM**

> **Para:** el desarrollador. Documento único y autosuficiente para construir la app. Sustituye a todas las versiones anteriores. **Estructura:** §1–§10 \= qué construir y cómo se comporta · §11 \= blueprint técnico con código · §12–§14 \= aceptación, pendientes y contenido. **Regla que atraviesa todo:** el juego **no puntúa ni declara ganadores**. Se registra qué elige cada equipo, pero **nunca** se muestra como acierto/error.

---

## 1\. Resumen y no-objetivos

**Qué es:** web app móvil, **híbrida con cartas físicas**, para equipos de 3–5 Store Managers. El equipo delibera en la mesa y **registra su decisión final en la app**, que cronometra cada acto, guía el recorrido y **guarda las decisiones de forma anónima** en una Google Sheet de HR. Tres actos, \~90 minutos. Dos idiomas (ES-LATAM / PT-BR) en sesiones separadas.

**No-objetivos (no construir):**

- ❌ Puntuaciones, ranking o "respuesta correcta" visibles al jugador.  
- ❌ Login, cuentas o perfiles individuales (solo un **alias de equipo**).  
- ❌ Datos personales de participantes o de asociados reales.  
- ❌ Backend propio de pago, base de datos de pago, IA, o analytics de terceros.  
- ❌ Dependencias que requieran build step o mantenimiento (ver §11: vanilla JS).

---

## 2\. Decisiones cerradas (para que no las tengas que preguntar)

- **Nombre:** `Full Bloom`. **Subtítulo:** `cada decisión hace florecer o marchitar`.  
- **Duración:** 90 min. **Equipos:** 3–5 SM. **Idiomas:** ES-LATAM y PT-BR, sesiones separadas.  
- **Formato:** híbrido — cartas físicas para deliberar \+ app para registrar/cronometrar/guardar.  
- **Sin marcador** en ningún punto. Única presión: el tiempo.  
- **Acto 1:** eligen **4 de 9 características** (cada una con cara A/B). La combinación revela un asociado-persona (arquetipo). La **cara B dominante** determina el caso del Acto 3\.  
- **Acto 2 · Radar del Onboarding:** 4 ejes; casos con escena \+ "estás pensando…" \+ opciones \+ **trampa** \+ **mensaje**. Sin mecánica de recursos/fichas.  
- **Acto 3:** un **caso de decisión** por característica (9 casos), opciones A–D. La opción "más completa" es **guía interna**; no se muestra.  
- **Captura:** Google Sheet vía Apps Script (anónima). **Reanudar tras refresh** \+ buffer offline con `localStorage`. **Todo gratuito.**

---

## 3\. Mapa de 90 min y máquina de estados

| \# | Pantalla / bloque | Min | Crono |
| :---- | :---- | :---- | :---- |
| 0 | Idioma | — | — |
| 1 | Registro de equipo \+ reglas \+ premisa | 10 | — |
| 2 | **Acto 1 · La selección** | 15 | por acto |
| 3 | **Acto 2 · Radar del Onboarding** | 15 | por acto |
| 4 | Revelación de trampas \+ hoja Radar | 5 | — |
| 5 | **Acto 3 · El caso** | 15 | por acto |
| 6 | Cierre \+ sync | 30 (debrief, fuera de app) | — |

**Estados (router):** `lang → welcome → act1_select → act1_reveal → act2_radar → trap_reveal → act3_case → close`. Transición siempre hacia delante. "Atrás" del navegador: desactivado o sin pérdida de estado (ver §10).

---

## 4\. Especificación pantalla por pantalla

### \[0\] Idioma

- Dos botones grandes: **Español (LATAM)** · **Português (Brasil)**.  
- Al elegir: set `state.lang`, `save()`, ir a `welcome`.

### \[1\] Registro \+ reglas \+ premisa

- Campo de texto: **alias del equipo** (obligatorio, máx. \~30 caracteres, cualquier texto).  
- Texto de reglas/premisa (desde `CONTENT.welcome`): la premisa narrativa \+ **"no hay puntos ni ganador; la única presión es el tiempo"**.  
- Botón **Empezar** (habilitado solo si hay alias). Al pulsar: guardar alias, arrancar y ir a `act1_select`.

### \[2\] Acto 1 · La selección

- Muestra el **crono del acto** (15:00 descendente) arriba.  
- Lista las **9 características** como tarjetas seleccionables (mostrar `name`; opcional: `caraA`/`caraB` al tocar "ver más").  
- El equipo debe seleccionar **exactamente 4**:  
  - Al llegar a 4, las no seleccionadas se atenúan (no se pueden marcar más sin desmarcar).  
  - Contador visible "X/4".  
- **Ventana de deliberación:** el botón **Confirmar** está deshabilitado durante `CONFIG.deliberationMin.act1` segundos (muestra la cuenta atrás), y además requiere exactamente 4 elegidas.  
- Al confirmar: calcular `dominantShadow` (§5) y `archetype` (§5), guardar, ir a `act1_reveal`.

### \[2b\] Acto 1 · Revelación del asociado

- Muestra al asociado como **persona**: `archetype.name`, `archetype.birthday`, un blurb, y los **rasgos elegidos** (cara A) con su **cara B**.  
- Botón **Continuar** → `act2_radar`. (Reinicia el crono para el Acto 2.)  
- *Si no hay arquetipo escrito para la combinación:* usar nombre/blurb genérico de la familia dominante y mostrar igualmente los 4 rasgos.

### \[3\] Acto 2 · Radar del Onboarding

- Crono del acto (15:00).  
- Presenta **un recorrido por los 4 ejes**. Por cada eje se muestra(n) su(s) caso(s) según `CONFIG.radarCasesPerAxis` (1 \= uno al azar de los 2; 2 \= ambos).  
- Cada caso: `escena` \+ bloque **"Estás pensando: …"** (`pensando`) \+ opciones (A/B/C) como botones.  
- El equipo elige una opción por caso. **No** se muestra si es la "más completa".  
- Registrar por eje: opción elegida y si `option.isTrap` → añadir a `trapsFallen`.  
- Al terminar los 4 ejes → `trap_reveal`.

### \[4\] Revelación de trampas \+ hoja Radar

- Sin crono. Por cada eje: mostrar la **trampa** y el **mensaje** correspondientes.  
- Enmarca el momento para completar la **hoja Radar** física/digital (trampa → aprendizaje → acción → compromiso). La app no necesita capturar el texto libre de la hoja; solo enmarca y temporiza suavemente si se desea.  
- Botón **Continuar** → `act3_case` (arranca crono del Acto 3).

### \[5\] Acto 3 · El caso

- Crono del acto (15:00).  
- `caso = assignChallenge(state.act1.dominantShadow)` (§5).  
- Mostrar `escena` \+ opciones **A–D** como botones.  
- **Ventana de deliberación** (`CONFIG.deliberationMin.act3case`) antes de habilitar **Registrar decisión**.  
- Al registrar: guardar `act3.choice`, ir a `close`. **Nunca** mostrar cuál era la "más completa".

### \[6\] Cierre

- Resumen de la partida (asociado construido \+ su caso), apto para screenshot. Mensaje **"lo construisteis vosotros"**.  
- Ejecutar **sync final** a la Sheet (§8). Sin puntuación.  
- (Opcional) botón para el QR de la encuesta del debrief.

---

## 5\. Lógica de negocio

**Selección (Acto 1):** válida solo si `chosen.length === 4`.

**Cara B dominante:**

dominantShadow \= característica elegida con MAYOR \`peso\`.

Empate → la primera seleccionada (orden de clic).

`peso` por defecto \= 1 en todas (→ dominante \= primera elegida). HR puede subir el peso de las características hacia las que quiera sesgar el reto. *(Alternativa opcional de diseño, no implementada por defecto: tras elegir 4, pedir al equipo que marque "el rasgo que más define a esta persona" y usar ese. Ver §13.)*

**Arquetipo (Acto 1):** `match` por familia dominante de las 4 \+ característica clave; fallback a genérico de la familia dominante.

**Asignación del caso (Acto 3):** 1:1 con la característica dominante vía `shadowId`:

challenge \= CONTENT.challenges.find(c \=\> c.shadowId \=== dominantShadow) || aleatorio

**Radar (Acto 2):** presentar casos por eje; registrar elección; marcar `trapsFallen` cuando `option.isTrap`.

---

## 6\. Modelo de datos

### 6.1 CONFIG

const CONFIG \= {

  gameName: "Full Bloom",

  tagline: { es:"cada decisión hace florecer o marchitar", pt:"cada decisão faz florescer ou murchar" },

  choose: 4,

  radarCasesPerAxis: 1,                 // 1 (al azar por eje) | 2 (ambos)  — decisión de producto

  timers:  { act1: 900, act2: 900, act3: 900 },        // segundos

  deliberationMin: { act1: 60, act3case: 45 },          // segundos

  sheetEndpoint: "https://script.google.com/macros/s/XXXX/exec"  // Apps Script Web App

};

### 6.2 Las 9 características (Acto 1\) — tabla de referencia

Texto completo (cara A/B) en el *documento de características*. Estructura \+ mapeo:

| id | familia | name (ES) | shadowId | Caso Acto 3 (protagonista) |
| :---- | :---- | :---- | :---- | :---- |
| c1 | empuje | Ganas de crecer | `crecer` | Valentina |
| c2 | relacion | Crea conexiones genuinas | `conexion` | Sofía |
| c3 | empuje | Actitud positiva ante los retos | `actitud` | Andrea |
| c4 | relacion | Energía que inspira a clientes y equipo | `energia` | Lucía |
| c5 | ejecucion | Cumple lo que promete | `cumple` | **Daniela** |
| c6 | empuje | Aprende y busca mejorar constantemente | `aprende` | Tomás |
| c7 | relacion | Crea experiencias memorables | `experiencias` | Camila |
| c8 | ejecucion | Se adueña de su rol | `rol` | Florencia |
| c9 | ejecucion | Cuida cada detalle | `detalle` | Martina |

Familias equilibradas: Empuje (c1,c3,c6) · Relación (c2,c4,c7) · Ejecución (c5,c8,c9). *Nota: el caso de "Fiabilidad" (c5) se renombró de Andrea a **Daniela** para no repetir con c3.*

characteristics: \[

  { id:"c1", familia:"empuje",   peso:1, shadowId:"crecer",

    name:{es:"Ganas de crecer",pt:"..."},

    caraA:{es:"...",pt:"..."}, caraB:{es:"...",pt:"..."} },

  // c2 .. c9 (misma forma)

\]

### 6.3 Arquetipos (Acto 1\)

archetypes: \[

  { id:"a1", match:{ dominantFamily:"empuje", keyCharacteristic:"c1" },

    name:{es:"Valentina",pt:"Valentina"}, birthday:"12 mar",

    blurb:{es:"...",pt:"..."} }

  // \+ 1 genérico por familia (fallback): match:{ dominantFamily:"empuje" }, etc.

\]

### 6.4 Radar del Onboarding (Acto 2\)

4 ejes, 2 casos cada uno. Texto completo en el *documento del Radar*.

radar: {

  axes: \[

    { id:"estandar",      label:{es:"Estándar y expectativas",pt:"..."},      cases:\[ /\* 2 \*/ \] },

    { id:"conexion",      label:{es:"Conexión y pertenencia",pt:"..."},        cases:\[ /\* 2 \*/ \] },

    { id:"conversaciones",label:{es:"Conversaciones y seguimiento",pt:"..."},  cases:\[ /\* 2 \*/ \] },

    { id:"integracion",   label:{es:"Integración y equidad",pt:"..."},         cases:\[ /\* 2 \*/ \] }

  \]

}

// Cada caso:

{ id:"estandar\_1",

  escena:{es:"...",pt:"..."},

  pensando:{es:"Ya le expliqué todo durante la inducción.",pt:"..."},

  options:\[

    { id:"A", text:{es:"...",pt:"..."}, isTrap:false },

    { id:"B", text:{es:"...",pt:"..."}, isTrap:false },

    { id:"C", text:{es:"...",pt:"..."}, isTrap:false, best:true }

  \],

  trampa:{es:"Pensar que informar es lo mismo que dar claridad.",pt:"..."},

  mensaje:{es:"...",pt:"..."} }

*(La "trampa" del eje es un concepto que se revela; si en algún caso la opción-trampa es una de las A/B, marcarla con `isTrap:true` para poder registrar `trapsFallen`.)*

### 6.5 Casos del Acto 3 — 9, uno por `shadowId`

Texto completo en el *documento de casos*.

challenges: \[

  { id:"r1", shadowId:"crecer",

    escena:{es:"Valentina es una de las asociadas con mejores resultados...",pt:"..."},

    options:\[

      { id:"A", text:{es:"...",pt:"..."} },

      { id:"B", text:{es:"...",pt:"..."}, best:true },

      { id:"C", text:{es:"...",pt:"..."} },

      { id:"D", text:{es:"...",pt:"..."} }

    \],

    note:{es:"(guía interna: por qué B — no se muestra)",pt:"..."} }

  // r2..r9, uno por cada shadowId de la tabla 6.2

\]

**`best:true` es solo para análisis/facilitación. La UI nunca lo usa.**

### 6.6 Esquema de captura (una fila por equipo)

{

  teamAlias:"Los Cronos", lang:"es",

  startedAt:"2026-…", finishedAt:"2026-…",

  act1:{ chosen:\["c1","c4","c6","c9"\], archetypeId:"a1", dominantShadow:"crecer" },

  act2:{ choices:{ estandar:"C", conexion:"A", conversaciones:"C", integracion:"B" },

         trapsFallen:\["conexion"\] },

  act3:{ challengeId:"r1", choice:"B" },

  timeouts:\["act3"\]

}

---

## 7\. Mecánicas de tiempo

- **Crono por acto** (15:00 visible en Actos 1, 2, 3). Al llegar a 0: **avanzar** registrando lo que haya (o "sin respuesta"); nunca bloquear. Añadir el acto a `timeouts`.  
- **Ventana de deliberación:** botón de avanzar/registrar deshabilitado durante un mínimo (`CONFIG.deliberationMin`) en Acto 1 y en el caso del Acto 3 (opcional también por caso del Radar).  
- Todos los tiempos y mínimos vienen de `CONFIG`; **nada incrustado en la lógica**.

---

## 8\. Captura de datos, Apps Script y despliegue

### 8.1 Qué y dónde

- **Qué:** el esquema §6.6. **Qué NO:** datos personales.  
- **Dónde:** Google Sheet de HR, escrita por un **Apps Script Web App**. Gratis, sin servidor.  
- **Cuándo sincroniza:** al final de cada acto y en el cierre (checkpoints). Si falla, reintenta; el juego nunca se bloquea.

### 8.2 Apps Script (pegar en la Sheet: *Extensiones → Apps Script*)

function doPost(e){

  const sheet \= SpreadsheetApp.getActiveSpreadsheet().getSheetByName("respuestas");

  const d \= JSON.parse(e.postData.contents);

  sheet.appendRow(\[

    new Date(),

    d.teamAlias, d.lang,

    (d.act1?.chosen || \[\]).join("|"), d.act1?.archetypeId, d.act1?.dominantShadow,

    JSON.stringify(d.act2?.choices || {}), (d.act2?.trapsFallen || \[\]).join("|"),

    d.act3?.challengeId, d.act3?.choice,

    (d.timeouts || \[\]).join("|"), d.finishedAt || ""

  \]);

  return ContentService.createTextOutput("ok");

}

Fila 1 de la hoja `respuestas` (encabezados sugeridos): `timestamp | equipo | idioma | características | arquetipo | sombra | radar_elecciones | radar_trampas | caso | caso_elección | timeouts | fin`

### 8.3 Despliegue del Web App (pasos exactos)

1. En la Sheet: **Extensiones → Apps Script**, pegar el código, guardar.  
2. **Implementar → Nueva implementación → Aplicación web.**  
3. *Ejecutar como:* **Yo**. *Quién tiene acceso:* **Cualquier persona**.  
4. Copiar la **URL /exec** → pegarla en `CONFIG.sheetEndpoint`.  
5. Cada cambio de código requiere **nueva implementación** (o "gestionar implementaciones" → editar).

---

## 9\. Persistencia, reanudar y offline

- **Guardar `state` en `localStorage` en cada cambio.** Al arrancar, si hay partida sin cerrar → ofrecer **Reanudar** o **Empezar de nuevo**.  
- El mismo `localStorage` es el **buffer offline**: las decisiones viven ahí; el envío a la Sheet es un intento aparte que puede fallar sin consecuencias.  
- **Cola de sync:** marcar cada envío como pendiente/hecho; reintentar en el siguiente checkpoint. Último recurso: botón **Exportar** (descarga el JSON del equipo) para recuperación manual.

---

## 10\. Casos límite

| Situación | Comportamiento |
| :---- | :---- |
| Eligen ≠ 4 características | Confirmar bloqueado \+ contador "X/4". |
| Combinación sin arquetipo escrito | Genérico de la familia dominante \+ mostrar los 4 rasgos. |
| Empate de peso en la sombra dominante | Primera seleccionada. |
| Ningún caso coincide con la sombra | Fallback aleatorio (no debería ocurrir: hay 9 casos, uno por característica). |
| Falta texto en un idioma | Fallback al otro idioma; nunca hueco vacío. |
| Sin red al sincronizar | Bufferizar, reintentar, export manual; nunca bloquear. |
| Refresh / cierre accidental | Reanudar desde `localStorage`. |
| Botón "atrás" del navegador | Desactivar o mantener estado sin pérdida. |
| Se agota el crono de un acto | Avanzar registrando lo elegido / "sin respuesta"; añadir a `timeouts`. |

---

## 11\. Blueprint técnico (cómo lo construiría yo)

### 11.1 Stack

- **App:** SPA estática en **HTML \+ CSS \+ JavaScript vanilla**, **sin framework, sin build**. Cero dependencias, se aloja gratis, funciona offline, dura años. El contenido va aparte, así que no hace falta framework para escalarlo.  
- **Dato:** Google Apps Script → Google Sheet. **Estado/offline:** `localStorage`. **Hosting:** GitHub Pages / Netlify / Cloudflare Pages (gratis).  
- *(Un framework ligero es aceptable pero innecesario; añade build. Por defecto: vanilla.)*

### 11.2 Estructura de archivos

/index.html        → contenedor \#app \+ \<script\> de config/content/app

/styles.css        → mobile-first

/config.js         → CONFIG (§6.1)

/content.es.js     → CONTENT en español  (editable por HR)

/content.pt.js     → CONTENT en portugués (editable por HR)

/app.js            → router, estado, lógica, captura

Cargar contenido como `<script>` (no `fetch`) para que funcione offline sin servidor.

### 11.3 Router \+ estado \+ persistencia

const FRESH \= { screen:"lang", lang:null, teamAlias:null,

  act1:{chosen:\[\], archetypeId:null, dominantShadow:null},

  act2:{choices:{}, trapsFallen:\[\]}, act3:{}, timeouts:\[\], startedAt:null };

let state \= load() || structuredClone(FRESH);

function save(){ localStorage.setItem("fullbloom", JSON.stringify(state)); }

function load(){ try { return JSON.parse(localStorage.getItem("fullbloom")); } catch { return null; } }

function reset(){ state \= structuredClone(FRESH); save(); }

function go(screen){ state.screen \= screen; save(); render(); }

const C \= () \=\> (state.lang \=== "pt" ? CONTENT\_PT : CONTENT\_ES);   // capa de contenido activa

const L \= node \=\> (node && (node\[state.lang\] || node.es)) || "";   // fallback de idioma

Al iniciar: si `load()` tiene una partida sin `finishedAt`, mostrar diálogo **Reanudar / Empezar de nuevo**.

### 11.4 Ventana de deliberación

function armDeliberation(btn, seconds){

  btn.disabled \= true;

  const base \= btn.textContent;

  let left \= seconds;

  const tick \= () \=\> {

    btn.textContent \= left \> 0 ? \`${base} (${left}s)\` : base;

    if (left-- \<= 0){ clearInterval(id); btn.disabled \= false; }

  };

  tick(); const id \= setInterval(tick, 1000);

  return () \=\> clearInterval(id);

}

### 11.5 Cronómetro por acto

function startActTimer(seconds, onTick, onEnd){

  let left \= seconds;

  onTick(left);

  const id \= setInterval(() \=\> {

    left--;

    onTick(left);

    if (left \<= 0){ clearInterval(id); onEnd(); }

  }, 1000);

  return () \=\> clearInterval(id);   // cancelar al cambiar de pantalla

}

// formato mm:ss

const fmt \= s \=\> \`${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}\`;

### 11.6 Selección, sombra dominante y asignación

function isSelectionValid(){ return state.act1.chosen.length \=== CONFIG.choose; }

function computeDominantShadow(){

  const chosen \= state.act1.chosen.map(id \=\> C().characteristics.find(c \=\> c.id \=== id));

  chosen.sort((a,b) \=\> (b.peso \- a.peso) ||

    (state.act1.chosen.indexOf(a.id) \- state.act1.chosen.indexOf(b.id)));

  return chosen\[0\].shadowId;

}

function pickArchetype(){

  const fams \= {};

  state.act1.chosen.forEach(id \=\> { const f \= C().characteristics.find(c=\>c.id===id).familia; fams\[f\]=(fams\[f\]||0)+1; });

  const dominantFamily \= Object.entries(fams).sort((a,b)=\>b\[1\]-a\[1\])\[0\]\[0\];

  return C().archetypes.find(a \=\> a.match.keyCharacteristic \=== state.act1.chosen\[0\] && a.match.dominantFamily \=== dominantFamily)

      || C().archetypes.find(a \=\> a.match.dominantFamily \=== dominantFamily && \!a.match.keyCharacteristic)

      || C().archetypes\[0\];

}

function assignChallenge(shadow){

  return C().challenges.find(c \=\> c.shadowId \=== shadow)

      || C().challenges\[Math.floor(Math.random()\*C().challenges.length)\];

}

### 11.7 Radar: render y captura

function chooseRadar(axisId, caseObj, optionId){

  state.act2.choices\[axisId\] \= optionId;

  const opt \= caseObj.options.find(o \=\> o.id \=== optionId);

  if (opt?.isTrap && \!state.act2.trapsFallen.includes(axisId)) state.act2.trapsFallen.push(axisId);

  save();

}

// Casos por eje según CONFIG.radarCasesPerAxis (1 \= uno al azar, 2 \= ambos)

function casesForAxis(axis){

  return CONFIG.radarCasesPerAxis \=== 2 ? axis.cases : \[axis.cases\[Math.floor(Math.random()\*axis.cases.length)\]\];

}

### 11.8 Sync a la Sheet (buffer \+ reintento)

function buildRecord(){

  return { teamAlias:state.teamAlias, lang:state.lang,

    startedAt:state.startedAt, finishedAt:state.finishedAt || null,

    act1:state.act1, act2:state.act2, act3:state.act3, timeouts:state.timeouts };

}

async function syncToSheet(){

  try {

    await fetch(CONFIG.sheetEndpoint, {

      method:"POST", mode:"no-cors",

      headers:{ "Content-Type":"text/plain;charset=utf-8" },   // evita preflight CORS

      body: JSON.stringify(buildRecord())

    });

    state.\_synced \= true; save();

  } catch (e) { /\* queda en localStorage; se reintenta en el próximo checkpoint \*/ }

}

*Con Apps Script se usa `no-cors` \+ `text/plain`; el script lee `e.postData.contents`. La respuesta no se puede leer en `no-cors`, pero el `appendRow` se ejecuta igual.*

### 11.9 Reglas de oro

- **Nunca** pintar puntuación ni acierto/error (`best`/`isTrap` son solo para el dato).  
- **Todo** el texto sale de `content.*.js`; **todos** los tiempos de `CONFIG`.  
- Probar en **Safari iOS \+ Chrome Android reales** y en **modo avión** tras la primera carga.  
- Sin dependencias ni servicios de pago.

---

## 12\. Criterios de aceptación

- [ ] Corre en Safari iOS y Chrome Android reales; funciona en **modo avión** tras la primera carga.  
- [ ] Partida completa de principio a fin en **ES** y en **PT**.  
- [ ] Registro del equipo con alias; **Empezar** deshabilitado sin alias.  
- [ ] Elegir ≠ 4 características está impedido; **ventana de deliberación** funciona en Acto 1 y en el caso del Acto 3\.  
- [ ] La **sombra dominante** asigna el caso correcto del Acto 3 (probar con las 9).  
- [ ] El **Radar** registra la elección por eje y las trampas; respeta `radarCasesPerAxis`.  
- [ ] **Nunca** se muestra puntuación, "correcto/incorrecto" ni la opción `best`.  
- [ ] Cada crono de acto cuenta y, al agotarse, **avanza** registrando y marcando `timeouts`.  
- [ ] El registro llega a la **Google Sheet** con el esquema §6.6; **sin datos personales**.  
- [ ] **Reanuda** tras un refresh; **no pierde** dato si cae el wifi (buffer \+ reintento/export).  
- [ ] Todo el contenido editable en `content.*.js` sin tocar `app.js`; tiempos en `CONFIG`.

---

## 13\. Decisiones de producto pendientes (las decide HR)

1. **Radar: ¿1 o 2 casos por eje?** (`CONFIG.radarCasesPerAxis`). Con 15 min, 1 por eje da más aire; 2 aprovecha todo el contenido.  
2. **Pesos de las características** (`peso`) — hoy todas a 1 (dominante \= primera elegida). Subir el peso de las que se quiera priorizar como reto. *Alternativa opcional:* pedir al equipo que marque "el rasgo que más define" y usarlo como dominante (más intencional; añade un tap).  
3. **Biblioteca de arquetipos:** cuántos y qué combinaciones (puede empezar mínima con fallback por familia).  
4. **Valores de tiempo** exactos (a calibrar en test).  
5. **Contenido PT-BR** (traducción, cuando el ES esté cerrado).  
6. **Hosting** de la app y administración de la Sheet.

---

## 14\. Contenido de referencia (adjunto)

- **Características (9, cara A/B):** documento de características → `characteristics`.  
- **Casos del Acto 3 (9, uno por característica):** documento de casos → `challenges` (mapeo en §6.2).  
- **Radar del Onboarding (4 ejes, casos \+ trampa \+ mensaje):** documento del Radar → `radar`.  
- Todo es **borrador para co-creación**; el PT-BR está pendiente de traducir. La lógica de §4/§5/§11 no cambia aunque cambie el contenido.

