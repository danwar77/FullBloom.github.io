# Full Bloom — Especificación completa para el desarrollador

### *Hacer Florecer el Talento a través del Liderazgo*

**Dinámica de liderazgo · Store Manager Conference 2026 · Pandora LATAM**

> **Para:** el desarrollador que construirá la app. **Junto a este documento va `FullBloom_app.html`**, una implementación de referencia funcional de un solo archivo. Contiene **todo el contenido validado** y una versión que funciona de **cada** comportamiento descrito aquí. Úsala como (a) fuente del contenido exacto y (b) referencia de comportamiento. Este documento explica la arquitectura y los requisitos para que puedas **reconstruirla con el contenido separado de la lógica y del estilo**, de modo que HR pueda cambiar textos y formato sin tocar la lógica. **Regla que atraviesa todo:** el juego **no puntúa ni declara ganadores**. Se registra qué elige cada equipo, pero **nunca** se muestra como acierto/error.

---

## 1\. Qué construir · no-objetivos

**Qué es:** una web app móvil, **híbrida con cartas físicas**, para equipos de 3–5 Store Managers. El equipo delibera en la mesa y **registra su decisión en la app**, que cronometra cada acto, guía el recorrido y **guarda las decisiones de forma anónima** en una Google Sheet. Tres actos, \~90 min, dos idiomas (ES-LATAM / PT-BR) en sesiones separadas.

**No construir:** puntuaciones o ranking visibles · login/cuentas/perfiles (solo un **alias de equipo**) · datos personales · backend/base de datos de pago · analítica de terceros · dependencias con *build step* o mantenimiento continuo.

---

## 2\. Cómo debe estar organizado (importante)

HR va a iterar **formato y textos**. Por eso el requisito de arquitectura es: **contenido, estilo y lógica separados.**

/index.html        → contenedor \<div id="app"\> \+ \<script\> de los ficheros de abajo

/styles.css        → TODO el estilo (mobile-first). Aquí se cambia el formato visual.

/config.js         → CONFIG (tiempos, endpoint, duración, etc.)

/content.es.js     → CONTENT\_ES: todos los textos y datos en español   (HR edita aquí)

/content.pt.js     → CONTENT\_PT: lo mismo en portugués                  (pendiente de traducir)

/app.js            → router, estado, lógica, captura. HR no toca esto.

- El **contenido** (textos de pantallas, competencias, preguntas, candidatos, dimensiones, casos) vive en `content.*.js`, no incrustado en la lógica.  
- El **formato** (colores, tipografías, tamaños, espaciados, disposición) vive en `styles.css` y en las plantillas de render; que sea fácil de tocar sin romper nada.  
- Cargar el contenido como `<script>` (no `fetch`) para que funcione **offline** sin servidor.  
- En la referencia de un solo archivo, `CONFIG` y los objetos de contenido (`REQS`, `POOL`, `PUZZLES`, `CANDIDATES`, `DIMENSIONS`, `SHADOW_MAP`, `CHALLENGES`) están al principio del `<script>`: son exactamente lo que debe salir a `config.js` y `content.es.js`.

---

## 3\. Stack y principios

- **App:** SPA estática en **HTML \+ CSS \+ JavaScript vanilla**, **sin framework, sin build**. Cero dependencias.  
- **Estado y offline:** `localStorage`.  
- **Captura de datos:** Google Apps Script → Google Sheet.  
- **Hosting:** estático y gratuito (GitHub Pages / Netlify / Cloudflare Pages).  
- **Reglas de oro:** nunca pintar puntuación ni acierto/error · todo el texto desde `content.*.js` · todos los tiempos desde `CONFIG` · probar en móviles reales y en modo avión.

---

## 4\. Flujo de 90 min · máquina de estados

| Bloque | Pantallas | Crono |
| :---- | :---- | :---- |
| Inicio | idioma → bienvenida/registro | — |
| **Acto 1 · La selección** | requisición → prioridades → entrevista (×3 puzzles) → candidatos | `act1` |
| **Acto 2 · El plan de onboarding** | diagnóstico → prioriza → enfoque (×3) → revelación | `act2` |
| **Acto 3 · El mundo real** | (routeo de sombra) → caso | `act3` |
| Cierre | cierre \+ sync | — |

**Estados del router:** `lang → welcome → req → priorities → puzzle → candidates → act2diag → ranking → enfoque → reveal → (routeShadow) → case → close`. Siempre hacia delante. "Atrás" del navegador: desactivar o mantener estado sin pérdida.

---

## 5\. Especificación pantalla por pantalla

Los textos exactos están en `FullBloom_app.html` (funciones `screen*`). Aquí, la conducta.

### \[0\] Idioma (landing)

- Título "Full Bloom" \+ subtítulo *"Hacer Florecer el Talento a través del Liderazgo"* \+ texto de bienvenida ("¿Ya está el equipo al completo?…").  
- Dos botones: **Español (LATAM)** · **Português (Brasil)**. Al elegir: set `lang`, guardar, ir a `welcome`.

### \[1\] Bienvenida / registro

- Texto "Sois un solo equipo… tiempo limitado… duración máxima de **{CONFIG.durationLabel}** minutos… **No gana quien termina primero**".  
- Campo **alias del equipo** (obligatorio, máx. \~30). Botón **Empezar** habilitado solo con alias. Guarda alias y `startedAt`; va a `req`. Arranca crono `act1`.

### \[2\] Acto 1 · Fase A · Requisición

- Texto "Nos ponemos en situación… definir el perfil… elegid solo las relevantes".  
- Lista **POOL** agrupada por `block` (encabezado por bloque). Multi-selección (checkbox).  
- Los **distractores** (`dist:true`, `w:0`) van **dentro del bloque "Requisitos y Experiencia"**, intercalados con los reales, **sin etiqueta especial** (no deben cantar).  
- Contador "X elegidas · mínimo {numPriorities}". **Confirmar** habilitado con ≥ `numPriorities` seleccionadas **y** tras la ventana de deliberación (`deliberationMin.req`). Va a `priorities`.

### \[3\] Acto 1 · Fase B · Prioridades

- Texto "Preparad la entrevista… las 3 más importantes… en orden de mayor a menor".  
- Muestra las competencias **seleccionadas no-distractoras**, ordenadas por peso desc (solo para presentación).  
- El equipo toca **exactamente `numPriorities` (3)** en orden; se numeran 1,2,3. **Empezar la entrevista** habilitado al llegar a 3\. Guarda `priorities` (en orden). Va a `puzzle` (idx 0).

### \[4\] Acto 1 · Fase B · Entrevista (escape room) — se repite por cada prioridad con puzzle

- Para `priorities[puzzleIdx]`, si existe en `PUZZLES`, muestra sus opciones **barajadas**. Cabecera \= nombre de la competencia \+ puntos de progreso.  
- **Dos modos** (según el puzzle):  
  - **Single (por defecto):** "¿Cuál detecta de verdad? Descarta y quédate con una." El equipo elige **una**. Al confirmar:  
    - opción **correcta** → feedback verde "Así se detecta" \+ botón **Siguiente** (avanza al siguiente puzzle).  
    - opción **near** (casi) → mensaje especial propio de esa opción (p. ej. *"Esta es muy buena pregunta, pero hay otra un poco más específica."*), la opción se atenúa, y se puede reintentar.  
    - opción **weak** (floja) → se marca en rojo \+ su texto **"por qué falla"**; reintentar.  
  - **Multi (`multi:true`, p. ej. "Promueve la marca"):** "Hay **más de una** que detecta. Marcad todas las que detecten." El equipo marca varias. Al confirmar:  
    - si marcó alguna floja → se marca en rojo con su "por qué falla"; reintentar.  
    - si le falta alguna correcta → "Casi. Falta al menos una"; reintentar.  
    - si marcó **exactamente** el conjunto correcto → verde \+ **Siguiente**.  
- El crono `act1` sigue corriendo pero **no corta** la fase de entrevista.  
- Cuando `puzzleIdx` supera el número de puzzles → `candidates`.  
- Registrar (opcional, para análisis) el nº de intentos fallidos por competencia (`puzzleErrors`).

### \[5\] Acto 1 · Fase C · Candidatos

- Texto "…preseleccionado a 4… solo una persona… los ideales son difíciles de encontrar…".  
- Muestra los **4 CANDIDATES** como fichas: nombre · edad · tag · CV · **checklist de requisitos** (usa `REQS`; `met[i]` true \= ☑ verde, false \= ☐ gris).  
- Eligen **uno**. **Contratar** tras la ventana de deliberación (`deliberationMin.candidate`). Guarda `candidate`. Va a `act2diag`. (Sync recomendado aquí.)

### \[6\] Acto 2 · Diagnóstico

- Texto "Habéis contratado a **{nombre}**… oportunidades de desarrollo… requisitos que no cumple al 100%…".  
- Lista los **huecos** del candidato \= las `REQS[i]` donde `met[i]===false`.  
- Botón **Planificar su onboarding** → `ranking`. Arranca crono `act2`.

### \[7\] Acto 2 · Prioriza

- Texto "…no vais a poder desarrollar todas las áreas… ordenad las 4 dimensiones… (1 \= lo más importante y urgente)".  
- Muestra las **4 DIMENSIONS**; el equipo las **ordena 1–4**. Guarda `ranking` (en orden). **`neglected` \= ranking\[3\]** (la última). Va a `enfoque(0)`.

### \[8\] Acto 2 · Diseña el enfoque (×3) — *pendiente de retrabajar; mantener el actual*

- Para las **3 primeras** de `ranking`, por cada una: muestra la dimensión y **dos opciones**: enfoque **intencional** vs **atajo**. Guarda en `enfoque[dimId] = "intencional"|"atajo"`.  
- *(HR va a enriquecer estas opciones más adelante; el desarrollador debe dejar esta parte fácil de ampliar —más de dos opciones por dimensión—.)*  
- Al terminar las 3 → `reveal`.

### \[9\] Acto 2 · Revelación

- Muestra los **atajos** que tomaron (dimensión \+ `mensaje`) y **el flanco descubierto** \= la dimensión `neglected`.  
- Botón **Ir al mundo real** → routeo de sombra.

### \[10\] Acto 3 · Routeo de la sombra (sin pantalla propia salvo desempate)

- Calcular **sombras expuestas** \= `candidate.shadows ∩ SHADOW_MAP[neglected]`.  
  - Si **1** → esa es la sombra → `case`.  
  - Si **varias** → pantalla "Emergieron varias sombras. ¿Cuál trabajáis primero?"; el equipo elige una → `case`.  
  - Si **ninguna** → **sombra dominante** \= `candidate.shadows[0]` → `case`.

### \[11\] Acto 3 · El caso

- `CHALLENGES[shadow]`: intro "…la sombra que traía {nombre} se hizo visible", `esc` (escena) y opciones **A–D**.  
- Eligen una tras la ventana de deliberación (`deliberationMin.act3case`). Guarda `act3.choice`. Va a `close`. Crono `act3`.  
- **Nunca** mostrar cuál opción es la "más completa" (`best` es solo interno/análisis).

### \[12\] Cierre

- "Lo construisteis vosotros": recuerda a quién contrataron y qué descuidaron, y el lema. **Sync final.** Botón **Nueva partida** (reset).

---

## 6\. Lógica de negocio

// selección válida: \>= numPriorities competencias elegidas

// prioridades: el equipo ordena numPriorities (3) de las elegidas no-distractoras

// puzzle single: avanzar solo con la opción correct:true

// puzzle multi: avanzar solo si el conjunto marcado \=== conjunto de correct:true

// neglected \= ranking\[3\]

// sombras expuestas \= candidate.shadows ∩ SHADOW\_MAP\[neglected\]

//   1  \-\> esa sombra

//   \>1 \-\> el equipo prioriza cuál

//   0  \-\> candidate.shadows\[0\]  (sombra dominante)

// caso \= CHALLENGES\[shadow\]

- **Cronos por acto** (`act1`, `act2`, `act3`): al llegar a 0, **avanzar** registrando lo que haya y añadir el acto a `timeouts`; nunca bloquear.  
- **Ventanas de deliberación** (`deliberationMin`): deshabilitan el botón de avanzar un mínimo de segundos en requisición, elección de candidato y caso del Acto 3\.  
- Todos los tiempos y mínimos vienen de `CONFIG`.

---

## 7\. Modelo de datos

### 7.1 CONFIG (`config.js`)

const CONFIG \= {

  tagline: "Hacer Florecer el Talento a través del Liderazgo",

  durationLabel: "XX",                 // minutos, pendiente de calibrar en la demo

  numPriorities: 3,                    // competencias que van al escape room

  timers: { act1:1500, act2:900, act3:900 },        // segundos

  deliberationMin: { req:15, candidate:15, act3case:15 },  // CONFERENCIA sugerida: 60 / 45

  sheetEndpoint: ""                    // URL /exec del Apps Script (vacío \= no sincroniza)

};

### 7.2 CONTENT (`content.es.js`) — formas de cada objeto

El **contenido completo y validado** está en `FullBloom_app.html`. Formas:

// Etiquetas de los 9 requisitos (orden del checklist). candidate.met\[\] se alinea con este orden.

const REQS \= \["Atención al cliente y storytelling", …9 items…\];

// Pool de competencias. dist:true \= distractor (w:0). block agrupa en pantalla.

const POOL \= \[ { id:"atencion", block:"Excelencia Comercial", w:4, name:"Atención al cliente y storytelling" }, … \];

//   distractores: mismo block "Requisitos y Experiencia", w:0, dist:true.

// Puzzles de entrevista, indexados por id de competencia. Dos formatos:

const PUZZLES \= {

  // (a) explícito — permite correct / why / near y multi:

  cruzada: { options:\[

    { text:"…pregunta que detecta…", correct:true },

    { text:"…floja…", why:"por qué falla" },

    { text:"…casi…", near:"mensaje especial de casi-acierto" }

  \]},

  marca: { multi:true, options:\[ {…,correct:true}, {…,correct:true}, {…,why:"…"} \] },

  // (b) legacy — se normaliza a una correcta \+ flojas:

  atencion: { good:"…detecta…", weak:\[ \["…floja…","por qué falla"\], … \] }

};

// 4 candidatos. met\[\] alineado a REQS (true=cumple). shadows\[\] \= ids de sombra; shadows\[0\] \= dominante.

const CANDIDATES \= \[ { id:"mateo", name:"Mateo", age:26, tag:"…", cv:"…", destaca:"…",

  met:\[false,true,true,false,true,false,true,true,true\], shadows:\["crecer","energia"\] }, … \];

// 4 dimensiones del onboarding.

const DIMENSIONS \= \[ { id:"estandar", label:"Estándar y expectativas",

  intencional:"…", atajo:"…", mensaje:"…" }, … \];

// Qué sombra(s) amplifica cada dimensión descuidada.

const SHADOW\_MAP \= { estandar:\["crecer","experiencias","detalle","cumple"\], conexion:\["actitud"\],

  conversaciones:\["conexion","aprende"\], integracion:\["energia","rol"\] };

// 9 casos del Acto 3, indexados por id de sombra. best:true es interno (NO se muestra).

const CHALLENGES \= { crecer:{ prot:"Valentina", esc:"…escena…",

  opts:\[ \["A","…"\], \["B","…", true\], \["C","…"\], \["D","…"\] \] }, … };

### 7.3 Estado inicial (`app.js`)

const FRESH \= { screen:"lang", lang:null, alias:null, startedAt:null, finishedAt:null,

  act1:{ selected:\[\], priorities:\[\], puzzleIdx:0, puzzleErrors:{}, candidate:null },

  act2:{ ranking:\[\], enfoque:{}, neglected:null },

  act3:{ shadow:null, choice:null }, timeouts:\[\] };

---

## 8\. Captura de datos · Apps Script · despliegue

### 8.1 Qué se guarda (una fila por equipo)

{ alias, lang, startedAt, finishedAt,

  act1:{ selected:\[ids\], priorities:\[ids\], candidate:id },

  act2:{ ranking:\[dimIds\], enfoque:{dimId:"intencional"|"atajo"}, neglected:dimId },

  act3:{ shadow, choice }, timeouts:\[actIds\] }

Se envía en varios *checkpoints* (fin de acto y cierre). **Nunca** datos personales.

### 8.2 Envío desde la app (ya resuelto en la referencia)

await fetch(CONFIG.sheetEndpoint, { method:"POST", mode:"no-cors",

  headers:{ "Content-Type":"text/plain;charset=utf-8" },   // evita preflight CORS

  body: JSON.stringify(record) });

Con `no-cors` \+ `text/plain` no hace falta configurar CORS; el Apps Script lee `e.postData.contents`.

### 8.3 Apps Script (pegar en la Sheet: *Extensiones → Apps Script*)

function doPost(e){

  const sh \= SpreadsheetApp.getActiveSpreadsheet().getSheetByName("respuestas");

  const d \= JSON.parse(e.postData.contents);

  sh.appendRow(\[

    new Date(), d.alias, d.lang,

    (d.act1.selected||\[\]).join("|"),

    (d.act1.priorities||\[\]).join("|"),

    d.act1.candidate,

    (d.act2.ranking||\[\]).join("|"),

    JSON.stringify(d.act2.enfoque||{}),

    d.act2.neglected,

    d.act3.shadow, d.act3.choice,

    (d.timeouts||\[\]).join("|"),

    d.finishedAt||""

  \]);

  return ContentService.createTextOutput("ok");

}

Encabezados sugeridos en la hoja `respuestas` (fila 1): `timestamp | equipo | idioma | competencias | prioridades | candidato | ranking | enfoque | descuidada | sombra | decision | timeouts | fin`

### 8.4 Desplegar el Web App (pasos exactos)

1. En la Sheet: **Extensiones → Apps Script**, pegar el código, guardar.  
2. **Implementar → Nueva implementación → Aplicación web.**  
3. *Ejecutar como:* **Yo**. *Quién tiene acceso:* **Cualquier persona**.  
4. Copiar la **URL /exec** → pegarla en `CONFIG.sheetEndpoint`.  
5. Cada cambio de código requiere **nueva implementación** (o editar la existente en "Gestionar implementaciones").

---

## 9\. Persistencia · reanudar · offline

- **Guardar el estado en `localStorage` (clave `fullbloom2`) en cada cambio.** Al arrancar, si hay una partida sin `finishedAt` → ofrecer **Reanudar / Empezar de nuevo**.  
- El mismo `localStorage` es el **buffer offline**: las decisiones viven ahí; el envío a la Sheet es un intento aparte que puede fallar sin bloquear el juego.  
- **Reanudar** mapea el estado guardado a la pantalla correspondiente (ver `resume()` en la referencia).  
- Envolver todos los accesos a `localStorage` en `try/catch` (degrada a memoria si no está disponible).

---

## 10\. Casos límite

| Situación | Comportamiento |
| :---- | :---- |
| Eligen menos de `numPriorities` en requisición | Confirmar bloqueado \+ contador. |
| Puzzle single: eligen la **near** | Mensaje especial de esa opción; reintentar. |
| Puzzle multi: falta una correcta / sobra una floja | Feedback; reintentar hasta el conjunto exacto. |
| Flanco sin sombra que coincida | Cae la **sombra dominante** (`shadows[0]`). |
| Flanco con varias sombras | El equipo prioriza cuál trabajar primero. |
| Se agota el crono de un acto | Avanzar registrando lo elegido; añadir a `timeouts`. |
| Sin red al sincronizar | Bufferizar y reintentar; nunca bloquear. |
| Refresh / cierre accidental | Reanudar desde `localStorage`. |
| Falta texto en un idioma | Fallback al otro; nunca hueco vacío. |

---

## 11\. Criterios de aceptación

- [ ] Corre en **Safari iOS** y **Chrome Android** reales; funciona en **modo avión** tras la primera carga.  
- [ ] Partida completa de principio a fin en **ES** (y en PT cuando esté traducido).  
- [ ] Requisición: distractores mezclados en "Requisitos y Experiencia"; mínimo de selección respetado.  
- [ ] Prioridades: se ordenan 3 y esas 3 activan los puzzles.  
- [ ] Escape room: single con **near** y **flojas**; **multi** con conjunto exacto; nunca se muestra puntuación.  
- [ ] Candidatos: checklist correcto; se elige uno.  
- [ ] Acto 2: diagnóstico con huecos reales; ranking fija el flanco; enfoque registra intencional/atajo.  
- [ ] Acto 3: el flanco enruta la sombra correcta (probar las tres ramas); caso A–D; sin "correcto/incorrecto".  
- [ ] El registro llega a la Google Sheet con el esquema §8.1; **sin datos personales**.  
- [ ] **Reanuda** tras refresh; **no pierde** dato si cae el wifi.  
- [ ] Contenido editable en `content.*.js` y formato en `styles.css` **sin tocar** `app.js`.

---

## 12\. Pendiente / no cerrado (marcado a propósito)

- **Duración `XX`**: falta el número; se calibra en la demo (`CONFIG.durationLabel`).  
- **Acto 2 · Fase 3 (enfoque)**: HR va a **enriquecer las opciones** (probablemente más de dos por dimensión). Dejar esa pantalla preparada para ampliar.  
- **PT-BR**: `content.pt.js` pendiente de traducir. Hasta entonces, fallback a ES.  
- **Coherencia de nombres**: el candidato (p. ej. Andrés) y el protagonista del caso (p. ej. Florencia) tienen nombres distintos. Aceptado por ahora ("la sombra que traía Andrés se hizo visible"); refinamiento de contenido futuro.  
- **Tiempos**: calibrar en la demo.

---

## 13\. El archivo de referencia

`FullBloom_app.html` es una implementación completa y funcional (un solo archivo) del diseño descrito aquí, con **todo el contenido validado**. Sirve como fuente del contenido exacto y como comprobación de comportamiento. La tarea es **reconstruirla con la estructura de §2** (contenido / estilo / lógica separados) para que HR pueda iterar formato y textos con facilidad, conectarla a Google (Apps Script), probarla en dispositivos reales y desplegarla.  
