# Full Bloom — Especificación completa para construir la app (con ChatGPT)

### *Hacer Florecer el Talento a través del Liderazgo*

**Dinámica de liderazgo · Store Manager Conference 2026 · Pandora LATAM**

> Documento **autosuficiente**: contiene todo el contenido y todas las reglas para construir la app desde cero. Pensado para usarse con **ChatGPT** como asistente de código. Lee la sección 0 primero.

---

## 0\. Cómo usar este documento con ChatGPT (léelo primero)

ChatGPT construye mejor **por módulos y con instrucciones literales**. No le pidas "hazme toda la app": se inventa contenido, mete frameworks y pierde detalles. Haz esto:

1. **Prompt 1 — andamiaje.** Pega las secciones 2, 3 y 4\. Pide: *"Crea `index.html`, `styles.css` y un `app.js` con el router y la máquina de estados de la sección 4\. Vanilla JS, sin frameworks, sin build. Mobile-first. Aún sin implementar pantallas."*  
2. **Prompt 2 — contenido.** Pega la sección 8 completa. Di: *"Crea `config.js` y `content.es.js` con exactamente estos datos. **No cambies, resumas ni 'mejores' ningún texto**: cópialos literalmente."* (Los LLM tienden a reescribir textos; prohíbeselo.)  
3. **Prompt 3 en adelante — pantalla por pantalla.** Por cada pantalla de la sección 5: *"Implementa esta pantalla usando `content.es.js` y la lógica de la sección 6\. Muéstrame el resultado antes de seguir."* Verifica cada una antes de la siguiente.  
4. **Repítele en cada prompt** los errores típicos de la IA a evitar: (a) **nunca puntuación ni "correcto/incorrecto"** salvo el feedback indicado; (b) **sin frameworks ni librerías**; (c) **localStorage siempre en `try/catch`**; (d) **textos tal cual**, sin reescribir.  
5. **Cierre.** Pega la sección 12 (aceptación) y pídele verificar el resultado contra la lista.

---

## 1\. Qué es · no-objetivos

Web app móvil, **híbrida con cartas físicas**, para equipos de 3–5 Store Managers. El equipo delibera en la mesa y **registra su decisión en la app**, que cronometra, guía y **guarda las decisiones de forma anónima** en una Google Sheet. Tres secciones, \~90 min, dos idiomas (ES / PT-BR) en sesiones separadas.

**No construir:** puntuaciones/ranking · login/cuentas · datos personales · backend de pago · analítica de terceros · nada con *build step*.

**Las tres secciones se llaman:** **Proceso de Selección** · **Onboarding** · **Retos del día a día**.

---

## 2\. Arquitectura y organización de archivos

Requisito clave: **contenido, estilo y lógica separados**, para que RRHH cambie textos y formato sin tocar la lógica.

/index.html      → \<div id="app"\> \+ \<script src\> de los ficheros de abajo

/styles.css      → TODO el estilo (aquí se cambia el formato visual)

/config.js       → CONFIG (tiempos, endpoint, duración)

/content.es.js   → todo el contenido en español (RRHH edita aquí)

/content.pt.js   → lo mismo en portugués (pendiente; de momento null, fallback a ES)

/app.js          → router, estado, lógica, captura (no se toca para texto/formato)

/img/            → fotos de los candidatos (sección 11\)

- **Stack:** HTML \+ CSS \+ JavaScript **vanilla**, sin framework, sin build. Cero dependencias.  
- Cargar el contenido con `<script>` (no `fetch`) para que funcione **offline**.  
- Estado y offline: `localStorage` (siempre en `try/catch`).

---

## 3\. Identidad visual (para `styles.css`)

Fondo ciruela profundo, acentos rosa y oro, mobile-first. *(Colores aproximados; si Pandora da la paleta oficial, sustituir.)*

\--bg:\#1B1420  \--bg2:\#241826  \--surface:\#2A1F31  \--surface-2:\#33253D  \--line:\#4A3852

\--ink:\#F3ECEF \--ink-soft:\#CBBAC6 \--ink-mute:\#9C8898

\--rosa:\#E0729B \--rosa-soft:\#F0AEC8 \--oro:\#D9B45E \--oro-soft:\#ECD59A \--verde:\#7FD1A6

Serif (Georgia) para títulos; sans (system-ui) para el resto. Radios \~14-16px. Área táctil mínima 52px.

Marca "Full Bloom" \= flor de 5 pétalos SVG (rosa con centro oro). Botones tipo tarjeta; seleccionado \= borde oro \+ tinte rosa. Barra inferior fija para la acción principal.

---

## 4\. Flujo · máquina de estados

`lang → welcome → req → priorities → puzzle(×3) → candidates → obDiag → ranking → enfoque(×3) → reveal → retos(×≥3) → close`

| Sección | Pantallas | Crono |
| :---- | :---- | :---- |
| Inicio | idioma, bienvenida/registro | — |
| **Proceso de Selección** | requisición → prioridades → entrevista(×3) → candidatos | `sel` |
| **Onboarding** | diagnóstico → prioriza → enfoque(×3) → revelación | `onb` |
| **Retos del día a día** | retos (≥3, uno tras otro) | `ret` |
| Cierre | cierre \+ sync | — |

Siempre hacia delante. "Atrás" del navegador desactivado o sin pérdida. Reanudar tras refresh desde `localStorage`.

---

## 5\. Pantalla por pantalla (copy exacto en `content.es.js`, §8)

**\[0\] Idioma (landing).** Marca \+ "Full Bloom" \+ subtítulo `CONFIG.subtitle` \+ `UI.landing` \+ botones ES/PT. Al elegir: set `lang`, guardar, → welcome.

**\[1\] Bienvenida.** `UI.welcome` (incluye "duración máxima de {min} minutos" y "No gana quien termina primero", sustituyendo {min} por `CONFIG.durationLabel`). Campo alias (obligatorio, máx 30). Botón `UI.start` habilitado con alias. Guarda alias \+ `startedAt`. Arranca crono `sel`.

**\[2\] Requisición (Proceso de Selección · Fase A).** `UI.req`. Lista `POOL` agrupada por `block`. Multi-selección. Los distractores (`dist:true`) están **dentro del bloque "Requisitos y Experiencia"**, intercalados, sin etiqueta especial. Mínimo `CONFIG.numPriorities` \+ ventana `deliberationMin.req` para continuar.

**\[3\] Prioridades (Fase B).** `UI.priorities`. Muestra las seleccionadas no-distractoras (orden por peso desc, solo presentación). Tocan **3 en orden** (numeradas). Esas 3 → puzzles.

**\[4\] Entrevista / escape room (Fase B, ×3).** Por prioridad con puzzle. Cabecera \= nombre competencia \+ progreso. Opciones **barajadas**.

- **Single:** `UI.puzzleSingle`. Al confirmar: **correct** → `UI.detectaOk` \+ Siguiente. **near** → el `near` de esa opción \+ reintentar. **weak** → `UI.porQueNoMejor` \+ su `why` \+ reintentar.  
- **Multi** (`multi:true`): `UI.puzzleMulti`. Marcan varias. Al confirmar: no-correcta marcada → su `why`; falta una correcta → `UI.faltaUna`; conjunto **exacto** → `UI.detectaOkMulti` \+ Siguiente.  
- Crono `sel` corre pero no corta la entrevista.

**\[5\] Candidatos (Fase C).** `UI.candidates`. Los 4 `CANDIDATES`: **foto** (`photo`) junto al nombre, edad, tag, CV, checklist de `REQS` (`met[i]` true=☑ verde, false=☐ gris). Eligen uno tras `deliberationMin.candidate`. Guarda `candidate`. Sync aquí.

**\[6\] Diagnóstico — Fortalezas y áreas a desarrollar (Onboarding).** `UI.obDiagTitle` con {nombre}. **Dos bloques:** **Fortalezas** \= `candidate.destaca`; **Áreas a desarrollar** \= `REQS[i]` donde `met[i]===false`. `UI.obDiagIntro`. Botón → prioriza. Arranca crono `onb`.

**\[7\] Prioriza (Onboarding).** `UI.ranking` con {nombre}. Ordenan las 4 `DIMENSIONS` (1–4). `neglected = ranking[3]`. → enfoque(0).

**\[8\] Diseña el enfoque (Onboarding, ×3).** Para las 3 primeras de `ranking`. Por dimensión: `dimension.label` \+ `UI.enfoquePrompt` con {nombre}. Muestra sus `actions` **barajadas y SIN etiqueta** (multi-selección). Al confirmar → **el espejo**: `dimension.mirror` (con {nombre}) \+ marcar cuáles **intencionales** (`int:true`) eligieron y cuáles se les pasaron. **No es acierto/fallo.** Guarda las acciones elegidas.

**\[9\] Revelación (Onboarding).** Resumen del espejo de las 3 \+ **flanco descubierto** \= `neglected`. `UI.revealTitle` / `UI.flancoTxt`. Botón → retos.

**\[10\] Retos del día a día (×≥3).** Mostrar los retos de `candidate.shadows`: si tiene 3, esos 3; si tiene 2, esos 2 **\+ `GENERIC`**. Uno tras otro. **Sustituir `{nombre}` por el nombre del candidato** en la escena. Intro `UI.retoIntro`. Arranca crono `ret`.

- **Retos de fortaleza (9 en `CHALLENGES`):** una **mejor respuesta** (`best:true`, sigue **EIC**). Al resolver: mejor → felicitar \+ `UI.porQueMejor` \+ su `porQue`; otra → `UI.porQueNoMejorReto` \+ su `porQue`.  
- **Reto genérico (`GENERIC`):** **varias válidas** (`valid:true`, multi-selección). Al resolver, marca las válidas y muestra `GENERIC.mejorEnfoque`.

**\[11\] Cierre.** `CLOSE` (título \+ `lines` \+ `final`). Sync final. Botón `UI.restart` (reset).

---

## 6\. Lógica de negocio

selección válida: \>= CONFIG.numPriorities elegidas

prioridades: ordenar 3 de las elegidas no-distractoras \-\> activan puzzles

puzzle single: avanzar solo con correct:true ; 'near' \= mensaje suave \+ reintentar

puzzle multi:  avanzar solo si el conjunto marcado \=== conjunto de correct:true

neglected \= ranking\[3\]  (se muestra como flanco en la revelación)

retos a mostrar: base \= candidate.shadows ; si base.length \< 3 \-\> añadir 'generic' ; mostrar todos

reto de fortaleza: mejor \= best:true (EIC) ; feedback por opción

reto genérico: válidas \= valid:true (varias) ; feedback por opción

- Cronos por sección (`sel`,`onb`,`ret`): a 0 → avanzar registrando \+ `timeouts`; nunca bloquear.  
- Ventanas de deliberación (`deliberationMin`): deshabilitan el botón un mínimo de segundos.  
- Todo tiempo/valor desde `CONFIG`; todo texto desde `content.es.js`.  
- **EIC** \= Ejemplo · Impacto · Continuar/Cambiar (método de la mejor respuesta en los retos).

---

## 7\. Captura de datos · Apps Script · despliegue

### 7.1 Qué se guarda (una fila por equipo; sin datos personales)

{ alias, lang, startedAt, finishedAt,

  seleccion:{ elegidas:\[ids\], prioridades:\[ids\], candidato:id },

  onboarding:{ ranking:\[dimIds\], enfoque:{dimId:\[accionesElegidas\]}, descuidada:dimId },

  retos:\[ {retoId, eleccion} ... \], timeouts:\[\] }

### 7.2 Envío desde la app

await fetch(CONFIG.sheetEndpoint, { method:"POST", mode:"no-cors",

  headers:{ "Content-Type":"text/plain;charset=utf-8" }, body: JSON.stringify(record) });

`no-cors` \+ `text/plain` evita configurar CORS.

### 7.3 Apps Script (Sheet → Extensiones → Apps Script)

function doPost(e){

  const sh \= SpreadsheetApp.getActiveSpreadsheet().getSheetByName("respuestas");

  const d \= JSON.parse(e.postData.contents);

  sh.appendRow(\[ new Date(), d.alias, d.lang,

    (d.seleccion.elegidas||\[\]).join("|"), (d.seleccion.prioridades||\[\]).join("|"), d.seleccion.candidato,

    (d.onboarding.ranking||\[\]).join("|"), JSON.stringify(d.onboarding.enfoque||{}), d.onboarding.descuidada,

    JSON.stringify(d.retos||\[\]), (d.timeouts||\[\]).join("|"), d.finishedAt||"" \]);

  return ContentService.createTextOutput("ok");

}

Encabezados (fila 1, hoja `respuestas`): `timestamp | equipo | idioma | competencias | prioridades | candidato | ranking | enfoque | descuidada | retos | timeouts | fin`

### 7.4 Desplegar

Apps Script → guardar → **Implementar → Nueva implementación → Aplicación web** (*Ejecutar como:* Yo · *Acceso:* Cualquiera) → copiar URL **/exec** → `CONFIG.sheetEndpoint`. Cada cambio de código \= nueva implementación.

---

## 8\. CONTENIDO COMPLETO (copiar literalmente a `config.js` y `content.es.js`)

> **ChatGPT: copia estos objetos tal cual. No cambies, resumas ni reescribas ningún texto.**

### 8.1 `config.js`

const CONFIG \= {

  subtitle: "Hacer Florecer el Talento a través del Liderazgo",

  durationLabel: "XX",                                 // minutos; pendiente de calibrar

  numPriorities: 3,

  timers: { sel:1500, onb:900, ret:1200 },             // segundos

  deliberationMin: { req:60, candidate:45, reto:45 },  // para testear se pueden bajar a 15

  sheetEndpoint: ""                                    // URL /exec del Apps Script

};

### 8.2 `content.es.js`

/\* \---------- Textos de interfaz \---------- \*/

const UI \= {

  langES:"Español (LATAM)", langPT:"Português (Brasil)",

  landing:"¿Ya está el equipo al completo? ¿Ya tenéis todo listo en la mesa? Si ya estáis preparados, elegid el idioma y empecemos.",

  welcomeTitle:"Sois un solo equipo",

  welcome:"Debéis consensuar todas las decisiones que vais a tomar a lo largo de este juego. Cada decisión cuenta, y contáis con un tiempo limitado para debatir y decidir como equipo. El juego tiene una duración máxima de {min} minutos. No gana quien termina primero.",

  teamQ:"La primera decisión importante es: ¿cómo se llama vuestro equipo?", aliasPh:"Nombre del equipo", start:"Empezar",

  req:"Sois Store Manager en Pandora: tenéis una vacante en vuestra tienda y debéis reclutar un/a Sales Assistant para el equipo. Como todo proceso de selección, empezamos por definir el perfil. Decidid cuáles son las competencias clave que buscáis. Elegid solo las que sean relevantes para el rol.",

  reqCount:"{n} elegidas · mínimo {min}", reqNext:"Continuar a la entrevista",

  priorities:"Llega el momento de preparar la entrevista. Tenéis que enfocaros en las 3 competencias o requisitos más importantes y prioritarios. Elegidlos tocando en orden de mayor a menor importancia. Nos centraremos en ese momento de la entrevista que nos ayudará a detectar esas competencias en concreto.",

  prioNext:"Empezar la entrevista",

  puzzleSingle:"¿Cuál de estas preguntas detecta de verdad esta competencia? Descarta las que no y quédate con una.",

  puzzleMulti:"Hay más de una pregunta que detecta esta competencia. Marcad todas las que la detecten y descartad el resto.",

  detectaOk:"Así se detecta. Pide un caso concreto —conducta real, no una opinión.",

  detectaOkMulti:"Así se detecta. Las conductuales concretas revelan conducta real.",

  porQueNoMejor:"Por qué no es la mejor pregunta por sí sola:", faltaUna:"Casi. Hay más de una que detecta: falta al menos una.",

  confirm:"Confirmar", next:"Siguiente",

  candidates:"En este punto ya habéis entrevistado a varios candidatos y habéis preseleccionado a 4 de ellos. Todos tienen potencial y fortalezas distintas, pero solo podéis seleccionar a una persona. Como en la vida real, los candidatos ideales —que reúnen todos los requisitos— son difíciles de encontrar. Decidid en equipo quién será contratado.",

  hire:"Contratar a este",

  obDiagTitle:"Habéis contratado a {nombre}", strengths:"Fortalezas", devAreas:"Áreas a desarrollar",

  obDiagIntro:"Tiene mucho potencial y buenas fortalezas, pero también oportunidades de desarrollo. Con esta lista en mente, hay que preparar su plan de onboarding.",

  obPlan:"Planificar su onboarding",

  ranking:"Como Store Manager, no vais a poder desarrollar todas las áreas de oportunidad al mismo tiempo, así que debéis decidir en cuál es prioritario centrarse en las primeras semanas, para que ese talento florezca. Ordenad las 4 dimensiones del onboarding según lo que sea más necesario trabajar con {nombre} (1 \= lo más importante y urgente).",

  rankNext:"Confirmar prioridades",

  enfoquePrompt:"¿Cómo lo planificáis para {nombre}? Marcad las acciones que haríais.",

  espejoTitle:"El espejo", espejoTomadas:"De vuestras acciones, estas construyen de verdad:", espejoFaltaron:"Se os pasaron:",

  revealTitle:"Antes del día a día", flanco:"El flanco descubierto", flancoTxt:"Dejasteis {dim} en último lugar.",

  toRetos:"Ir a los retos del día a día",

  retoIntro:"Ha pasado el tiempo. Una fortaleza de {nombre}, llevada al día a día, se convierte en un reto a gestionar.",

  register:"Registrar decisión", porQueMejor:"Por qué es la mejor:", porQueNoMejorReto:"Por qué no es la mejor:", suma:"Suma:",

  restart:"Nueva partida"

};

/\* \---------- 9 requisitos (orden del checklist de candidatos) \---------- \*/

const REQS \= \["Atención al cliente y storytelling","Cierre y orientación a resultados","Venta cruzada y upselling",

 "Orientación al cliente / experiencia memorable","Comunicación efectiva","Trabajo en equipo",

 "Adaptabilidad y flexibilidad","Manejo de caja y procesos operativos","Experiencia previa en retail o joyería"\];

/\* \---------- Pool de competencias (dist:true \= distractor, w:0) \---------- \*/

const POOL \= \[

 {id:"atencion",block:"Excelencia Comercial",w:4,name:"Atención al cliente y storytelling"},

 {id:"cierre",block:"Excelencia Comercial",w:3,name:"Cierre y orientación a resultados"},

 {id:"cruzada",block:"Excelencia Comercial",w:4,name:"Venta cruzada y upselling"},

 {id:"producto",block:"Excelencia Comercial",w:3,name:"Conocimiento de producto y colecciones"},

 {id:"negocio",block:"Excelencia Comercial",w:3,name:"Entendimiento del negocio y KPIs"},

 {id:"procesos",block:"Excelencia Operativa",w:3,name:"Ejecución de procesos de tienda"},

 {id:"caja",block:"Excelencia Operativa",w:3,name:"Manejo de caja y transacciones"},

 {id:"visual",block:"Excelencia Operativa",w:2,name:"Visual merchandising"},

 {id:"sistemas",block:"Excelencia Operativa",w:2,name:"Uso de sistemas y POS"},

 {id:"organizacion",block:"Excelencia Operativa",w:3,name:"Organización y gestión del tiempo"},

 {id:"estandares",block:"Excelencia Operativa",w:3,name:"Cumplimiento de estándares y políticas"},

 {id:"mercancia",block:"Excelencia Operativa",w:3,name:"Cuidado de mercancía / prevención de pérdidas"},

 {id:"orientacion",block:"Excelencia con las Personas",w:4,name:"Orientación al cliente / experiencia memorable"},

 {id:"equipo",block:"Excelencia con las Personas",w:4,name:"Trabajo en equipo"},

 {id:"comunicacion",block:"Excelencia con las Personas",w:4,name:"Comunicación efectiva"},

 {id:"apoyo",block:"Excelencia con las Personas",w:3,name:"Apoyo a nuevos integrantes"},

 {id:"marca",block:"Actitud y Comportamiento",w:4,name:"Promueve la marca y vive los valores"},

 {id:"adaptabilidad",block:"Actitud y Comportamiento",w:3,name:"Adaptabilidad y flexibilidad"},

 {id:"desarrollo",block:"Actitud y Comportamiento",w:3,name:"Desarrollo propio y aprendizaje continuo"},

 {id:"integridad",block:"Actitud y Comportamiento",w:4,name:"Responsabilidad, confiabilidad e integridad"},

 {id:"entorno",block:"Actitud y Comportamiento",w:2,name:"Conciencia del entorno"},

 {id:"experiencia",block:"Requisitos y Experiencia",w:2,name:"Experiencia previa en retail o joyería"},

 {id:"d\_moda",block:"Requisitos y Experiencia",w:0,dist:true,name:"Conocimiento de moda y tendencias"},

 {id:"educativo",block:"Requisitos y Experiencia",w:1,name:"Nivel educativo (preparatoria)"},

 {id:"d\_idiomas",block:"Requisitos y Experiencia",w:0,dist:true,name:"Dominio de idiomas extranjeros (inglés avanzado)"},

 {id:"office",block:"Requisitos y Experiencia",w:1,name:"Office / Excel básico"},

 {id:"d\_ppt",block:"Requisitos y Experiencia",w:0,dist:true,name:"Diseño de presentaciones (PowerPoint)"},

 {id:"disponibilidad",block:"Requisitos y Experiencia",w:3,name:"Disponibilidad y movilidad"},

 {id:"d\_foto",block:"Requisitos y Experiencia",w:0,dist:true,name:"Fotografía de producto y contenido para redes"},

 {id:"d\_creatividad",block:"Requisitos y Experiencia",w:0,dist:true,name:"Creatividad para escaparates y campañas propias"},

 {id:"d\_publico",block:"Requisitos y Experiencia",w:0,dist:true,name:"Hablar en público / oratoria"},

 {id:"d\_reparacion",block:"Requisitos y Experiencia",w:0,dist:true,name:"Reparación y arreglo de joyas"},

 {id:"d\_gemologia",block:"Requisitos y Experiencia",w:0,dist:true,name:"Gemología y certificación de piedras"}

\];

/\* \---------- Puzzles (19). correct:true \= detecta; near \= casi; multi \= varias correctas \---------- \*/

const PUZZLES \= {

 atencion:{options:\[

  {t:"Piensa en una venta reciente que recuerdes con cariño: ¿qué historia le contaste al cliente sobre la pieza y cómo cambió eso la conversación?",correct:true},

  {t:"¿Te consideras bueno/a conectando con el cliente a través de la historia del producto?",why:"Es una autoevaluación: se puntúa a sí mismo y casi nadie dirá que no. Habla de cómo se percibe, no de lo que hace."},

  {t:"¿Cómo usarías el storytelling para vender una pieza de precio alto?",why:"Es hipotética: mide lo que imagina, no lo que ha hecho."},

  {t:"¿Qué colecciones de Pandora conoces mejor?",why:"Es buena pregunta, pero de conocimiento de producto. Detecta otra competencia."}\]},

 cruzada:{options:\[

  {t:"Cuéntame cómo fue la última vez que un cliente quería una sola pieza y conseguiste que se llevase algo más. ¿Cómo lo lograste?",correct:true},

  {t:"¿Sueles ofrecer productos complementarios cuando atiendes, verdad?",why:"La pregunta ya lleva dentro la respuesta que quieres oír; solo asiente."},

  {t:"Si un cliente compra un anillo, ¿qué le ofrecerías además?",why:"Mide su criterio de producto en abstracto, no si practica la venta cruzada."},

  {t:"¿Sueles cumplir tu objetivo de unidades por ticket?",why:"Es un número, un resultado; no dice cómo lo consigue. El KPI es la consecuencia, no la conducta."},

  {t:"¿Cómo sueles hacer tu ceremonia de ventas para alcanzar tus objetivos?",near:"Esta es muy buena pregunta, pero hay otra un poco más específica para esta competencia."}\]},

 orientacion:{multi:true,options:\[

  {t:"Háblame de un cliente que se convirtió en habitual y te pedía a ti. ¿Qué hiciste para que eso pasara?",correct:true},

  {t:"Dame un ejemplo de una vez que hiciste algo más de lo esperado por un cliente. ¿Qué te llevó a hacerlo y cómo acabó?",correct:true},

  {t:"¿Qué es para ti un buen servicio al cliente?",why:"Pide una definición; todos saben recitarla sin haberla dado. Teoría, no práctica."},

  {t:"¿Qué harías si un cliente se va sin comprar?",why:"Hipotética y, además, apunta a rescatar una venta, no a crear experiencias memorables."},

  {t:"¿Cómo gestionas una reclamación difícil?",why:"Buena pregunta, pero de gestión de conflictos, no de fidelizar por experiencia."}\]},

 equipo:{multi:true,options:\[

  {t:"Descríbeme un día en que el equipo estaba desbordado. ¿Qué hiciste tú para sacarlo adelante con los demás?",correct:true},

  {t:"Cuéntame de una vez que hubo un roce o desacuerdo con un compañero. ¿Cómo lo resolvisteis?",correct:true},

  {t:"¿Te consideras una persona de equipo?",why:"Nadie responde que no. Autoevaluación sin evidencia."},

  {t:"Aquí valoramos mucho colaborar, ¿tú te adaptas bien a trabajar con otros?",why:"La pregunta le regala la respuesta correcta; solo confirma."},

  {t:"¿Cómo es tu relación con tu Store Manager?",why:"Mide la relación con el líder, no la colaboración horizontal con los compañeros."}\]},

 comunicacion:{multi:true,options:\[

  {t:"Cuéntame una vez que tuviste que dar una información incómoda a un cliente o compañero. ¿Cómo se lo dijiste?",correct:true},

  {t:"Dame un ejemplo de una vez que un cliente no te entendía o entendió mal algo. ¿Cómo lo resolviste?",correct:true},

  {t:"¿Se te da bien comunicar?",why:"Autoevaluación sin evidencia; la respuesta es siempre que sí."},

  {t:"¿Qué es para ti una buena comunicación?",why:"Pide teoría; recitar una definición no demuestra que comunique bien."},

  {t:"Cuéntame una situación en la que tu comunicación fue muy efectiva.",why:"Suena conductual, pero le pides que elija su propia victoria; no verás cómo comunica cuando se complica."}\]},

 marca:{multi:true,options:\[

  {t:"¿Qué te atrae de Pandora frente a otras marcas? ¿Hay algo concreto que te gusta de Pandora como marca para la que trabajar?",correct:true},

  {t:"¿Qué valores te representan como profesional? ¿Cuáles son importantes para ti dentro de la cultura de la empresa o marca para sentirte feliz?",correct:true},

  {t:"Nuestros valores son soñar, atreverse, cuidar y entregar, ¿te identificas con ellos?",why:"Le entregas los valores en la pregunta; solo asiente."},

  {t:"¿Conoces la marca Pandora?",why:"Un sí/no que no distingue a quien la admira de quien solo sabe que existe."},

  {t:"¿Qué sabes de nuestras colecciones actuales?",why:"Mide conocimiento de producto, no compromiso con la marca ni afinidad de valores."}\]},

 integridad:{options:\[

  {t:"Cuéntame de una vez que cometiste un error en caja o con producto. ¿Qué hiciste?",correct:true},

  {t:"¿Te consideras una persona responsable y honesta?",why:"La pregunta de manual que no filtra a nadie: todos dicen que sí."},

  {t:"¿Qué harías si vieras a un compañero llevándose producto?",why:"Hipotética con respuesta evidente; mide si sabe qué debería hacer, no cómo se comporta él."},

  {t:"¿Conoces los procesos de apertura y cierre?",why:"Mide conocimiento operativo, no integridad."}\]},

 cierre:{options:\[

  {t:"Cuéntame de un mes que ibas por debajo de tu objetivo. ¿Qué hiciste para darle la vuelta?",correct:true},

  {t:"¿Sueles cumplir tus objetivos de venta?",why:"Un resultado sí/no; no dice cómo llega ni qué hace cuando no llega."},

  {t:"¿Qué harías si vas retrasado en tus metas del mes?",why:"Hipotética; “esforzarme más” lo contesta cualquiera."},

  {t:"¿Conoces bien los indicadores de la tienda?",why:"Mide entendimiento del negocio, no orientación a resultados en acción."}\]},

 producto:{options:\[

  {t:"Háblame de una pieza o colección que te encante y cómo se la presentarías a un cliente.",correct:true},

  {t:"¿Conoces bien nuestro catálogo?",why:"Un sí/no sin evidencia de profundidad."},

  {t:"¿Cómo te mantendrías al día de los nuevos lanzamientos?",why:"Hipotética: mide la intención, no el hábito."},

  {t:"¿Te gusta la joyería?",why:"Mide afición, no conocimiento aplicado."}\]},

 negocio:{options:\[

  {t:"¿Qué indicadores mirabas en tu tienda y qué hacías tú, en el piso, para moverlos?",correct:true},

  {t:"¿Sabes qué es la tasa de conversión?",why:"Mide si conoce un término, no si lo usa para decidir."},

  {t:"¿Por qué crees que son importantes los KPIs?",why:"Pide teoría; puede explicarlo sin haber movido uno."},

  {t:"¿Sueles cumplir tus metas de venta?",why:"Apunta a resultados, no a comprensión del negocio."}\]},

 procesos:{options:\[

  {t:"Descríbeme paso a paso cómo era tu rutina de apertura o de cierre en tu tienda anterior.",correct:true},

  {t:"¿Sabes hacer apertura y cierre?",why:"Sí/no que no distingue dominio."},

  {t:"¿Cómo organizarías la recepción de un pedido grande?",why:"Hipotética: cómo se imagina el proceso, no cómo lo ejecuta."},

  {t:"¿Eres una persona ordenada?",why:"Autoevaluación de un rasgo; no garantiza cumplir un procedimiento concreto."}\]},

 caja:{options:\[

  {t:"Cuéntame de la última vez que la caja no cuadró al cierre. ¿Qué pasó y qué hiciste?",correct:true},

  {t:"¿Tienes experiencia manejando caja?",why:"Sí/no; no revela el rigor ni cómo reacciona a un descuadre."},

  {t:"¿Qué harías si te falta dinero en caja?",why:"Hipotética con respuesta evidente."},

  {t:"¿Conoces el sistema de punto de venta?",why:"Mide manejo de sistemas, no rigor con el efectivo."}\]},

 organizacion:{multi:true,options:\[

  {t:"Cuéntame de un día en que tuviste demasiadas tareas a la vez. ¿Cómo decidiste el orden?",correct:true},

  {t:"Dame un ejemplo de una vez que no te dio tiempo a todo. ¿Qué dejaste para después y por qué?",correct:true},

  {t:"¿Te consideras una persona organizada?",why:"Nadie dice que no; autoevaluación sin evidencia."},

  {t:"¿Cómo priorizarías tres cosas urgentes a la vez?",why:"Hipotética: en abstracto todos priorizan bien."},

  {t:"Aquí hay mucho ritmo, ¿gestionas bien tu tiempo?",why:"Induce el sí y tapa las dificultades reales."}\]},

 estandares:{options:\[

  {t:"Cuéntame de una norma o estándar que te costara cumplir. ¿Cómo lo llevaste?",correct:true},

  {t:"¿Respetas siempre las políticas de la empresa?",why:"Todos dicen que sí; no filtra a nadie."},

  {t:"¿Qué harías si un compañero incumple una norma?",why:"Hipotética y sobre otro, no sobre él."},

  {t:"¿Conoces los protocolos de prevención de pérdidas?",why:"Apunta al cuidado de mercancía, no al cumplimiento general."}\]},

 mercancia:{options:\[

  {t:"Dame un ejemplo de una vez que detectaste una diferencia de inventario o un riesgo con el producto. ¿Qué hiciste?",correct:true},

  {t:"¿Eres cuidadoso con el producto?",why:"Autoevaluación sin evidencia."},

  {t:"¿Qué harías si notas que falta mercancía?",why:"Hipotética con respuesta esperable."},

  {t:"¿Sabes hacer inventarios en el sistema?",why:"Mide manejo de sistemas, no la conducta de cuidado y alerta."}\]},

 apoyo:{options:\[

  {t:"Cuéntame de alguien nuevo al que ayudaste a integrarse. ¿Qué hiciste concretamente por esa persona?",correct:true},

  {t:"¿Te gusta ayudar a los que llegan nuevos?",why:"Un sí genérico; disposición declarada, no conducta."},

  {t:"¿Cómo ayudarías a un compañero nuevo?",why:"Hipotética: lo que imagina, no un caso real."},

  {t:"¿Te consideras buen compañero?",why:"Autoevaluación amplia; no es acompañar a quien llega."}\]},

 adaptabilidad:{multi:true,options:\[

  {t:"Cuéntame de un cambio inesperado en tu tienda —de horario, de proceso, de equipo— y cómo lo llevaste.",correct:true},

  {t:"Dame un ejemplo de algo que al principio te costó aceptar y luego terminaste haciendo tuyo. ¿Qué pasó?",correct:true},

  {t:"¿Te adaptas bien a los cambios?",why:"Nadie dice que no; autoevaluación sin evidencia."},

  {t:"Aquí las cosas cambian mucho, ¿tú eres flexible?",why:"Induce el sí y le avisa de qué quieres oír."},

  {t:"¿Qué harías si te cambian el turno de un día para otro?",why:"Hipotética: reacción imaginada, no cómo respondió de verdad."}\]},

 desarrollo:{multi:true,options:\[

  {t:"Cuéntame de algo que aprendiste por tu cuenta para mejorar en tu trabajo. ¿Qué te llevó a hacerlo?",correct:true},

  {t:"Dame un ejemplo de un feedback que te costó recibir. ¿Qué hiciste con él?",correct:true},

  {t:"¿Te gusta aprender cosas nuevas?",why:"Casi nadie dice que no; disposición declarada, no acción."},

  {t:"¿Cómo mejorarías tus habilidades de venta?",why:"Hipotética: una intención, no algo ya emprendido."},

  {t:"¿Asistes a todas las capacitaciones?",why:"Mide asistencia/cumplimiento, no iniciativa propia."}\]},

 disponibilidad:{options:\[

  {t:"¿Cuál es tu disponibilidad real de horarios y fines de semana, y hasta dónde podrías moverte entre tiendas si hiciera falta?",correct:true},

  {t:"¿Tienes disponibilidad completa?",why:"Invita a un “sí” cómodo que no concreta y suele desmentirse después."},

  {t:"Necesitamos gente muy flexible, ¿no hay problema?",why:"Presiona hacia el sí y tapa las restricciones reales."},

  {t:"¿Estarías dispuesto a cambiar de tienda?",why:"Fácil en abstracto; no aterriza distancia, transporte ni tiempos."}\]}

};

// Multi (varias correctas): orientacion, equipo, comunicacion, marca, organizacion, adaptabilidad, desarrollo.

/\* \---------- Candidatos. met\[\] alineado a REQS. shadows\[\] \= ids de reto; shadows\[0\] \= principal. photo \= /img/. \---------- \*/

const CANDIDATES \= \[

 {id:"mateo",name:"Mateo",age:26,tag:"El vendedor ambicioso",photo:"img/mateo.jpg",

  cv:"3 años en retail de moda rápida como top vendedor. Números altos y mucha energía; busca crecer rápido. Sin experiencia en joyería.",

  destaca:\["Ganas de crecer","Energía que inspira","Orientación a resultados"\],

  met:\[false,true,true,false,true,false,true,true,true\], shadows:\["crecer","energia"\]},

 {id:"valeria",name:"Valeria",age:31,tag:"El trato excepcional",photo:"img/valeria.jpg",

  cv:"5 años en perfumería y retail de atención al cliente. Clientas fieles que la buscan por su trato. Cálida; menos cómoda con la presión de metas.",

  destaca:\["Crea conexiones genuinas","Crea experiencias memorables","Orientación al cliente"\],

  met:\[true,false,false,true,true,true,true,true,true\], shadows:\["conexion","experiencias"\]},

 {id:"andres",name:"Andrés",age:38,tag:"El operador sólido",photo:"img/andres.jpg",

  cv:"8 años en retail, key holder. Impecable en procesos, caja y estándares. Rígido con lo nuevo y poca chispa comercial.",

  destaca:\["Cumple lo que promete","Cuida cada detalle","Se adueña de su rol"\],

  met:\[false,true,false,false,true,true,false,true,true\], shadows:\["cumple","detalle","rol"\]},

 {id:"rocio",name:"Rocío",age:22,tag:"La promesa por pulir",photo:"img/rocio.jpg",

  cv:"Recién egresada, 1 año en cafetería. Primer empleo en retail. Entusiasta, aprende rápido, disponibilidad total. Sin rodaje comercial ni de caja.",

  destaca:\["Aprende y busca mejorar","Actitud positiva ante los retos","Ganas de crecer"\],

  met:\[false,false,false,true,true,true,true,false,false\], shadows:\["aprende","actitud","crecer"\]}

\];

/\* \---------- Dimensiones. actions barajadas y SIN etiqueta; int:true \= intencional. {nombre} \= candidato. \---------- \*/

const DIMENSIONS \= \[

 {id:"estandar",label:"Estándar y expectativas",principio:"Informar no es dar claridad.",

  actions:\[

   {int:true, t:"Acordar con {nombre} qué se espera de ella en sus primeros 30 días y cómo sabrá que va bien."},

   {int:true, t:"Mostrarle ejemplos concretos de cómo se ve “hacerlo bien” aquí, no solo describírselo."},

   {int:false,t:"Repasar de nuevo con ella toda la información de la inducción, para que no le quede ninguna duda."},

   {int:false,t:"La práctica del día a día irá aclarando las dudas y prioridades."},

   {int:false,t:"Entregarle el manual de procedimientos para que lo estudie por su cuenta."}\],

  mirror:"Un buen plan aquí no da más información: da claridad —qué es lo importante en cada etapa y cómo se ve hacerlo bien. Si vuestras acciones ayudaban a {nombre} a distinguir lo prioritario, ¡bien visto\! Si sobre todo le dabais más información, recordad: informar no es dar claridad."},

 {id:"conexion",label:"Conexión y pertenencia",principio:"La pertenencia se diseña, no ocurre sola.",

  actions:\[

   {int:true, t:"Asignarle un compañero de referencia para sus primeras semanas."},

   {int:true, t:"Crear un par de momentos concretos para que interactúe con el equipo, más allá del “hola” del primer día."},

   {int:true, t:"Preguntarle a la semana cómo se está sintiendo con el equipo, no solo con las tareas."},

   {int:true, t:"Crear un espacio con el equipo para trabajar los Vision Boards (tableros de sueños) e invitar a {nombre} a hacer el suyo."},

   {int:false,t:"Confiar en que, como el equipo es muy abierto, se irá integrando sola."},

   {int:false,t:"Dejar que ella marque el ritmo y se acerque cuando se sienta cómoda."}\],

  mirror:"Un buen plan aquí diseña la integración con acciones concretas: no basta con recibir a alguien, hay que hacerlo sentir parte. Si creasteis momentos y apoyos para que {nombre} se integrara, ¡bien\! Si lo dejasteis al tiempo o a su iniciativa, recordad: la pertenencia se diseña, no ocurre sola."},

 {id:"conversaciones",label:"Conversaciones y seguimiento",principio:"El silencio no significa que todo esté bien.",

  actions:\[

   {int:true, t:"Agendar una conversación breve de seguimiento cada semana, aunque todo vaya bien."},

   {int:true, t:"Reconocer avances concretos, no solo señalar lo que hay que corregir."},

   {int:true, t:"Hacer flash coaching en el piso: darle retroalimentación en el momento sobre la selling ceremony o un proceso concreto."},

   {int:false,t:"Estar disponible por si necesita algo; si hay un problema, ya lo dirá."},

   {int:false,t:"Hablar con ella solo cuando aparezca un error que corregir."},

   {int:false,t:"Preguntarle “¿todo bien?” al pasar y seguir si dice que sí."}\],

  mirror:"Un buen plan aquí no espera a que haya un problema: agenda el seguimiento y reconoce lo que va bien, no solo lo que hay que corregir. Si vuestras acciones incluían seguimiento planificado y reconocimiento, ¡bien visto\! Si dependían de que {nombre} avisara o solo de corregir errores, recordad: el silencio no significa que todo esté bien."},

 {id:"integracion",label:"Integración y equidad",principio:"Equidad no es igualdad.",

  actions:\[

   {int:true, t:"Mantener el mismo estándar para todos, pero ajustar el acompañamiento a lo que cada persona necesita."},

   {int:true, t:"Dedicarle más tiempo si le cuesta más, explicando al equipo que el objetivo es que todos lleguen al mismo nivel."},

   {int:true, t:"Apoyarte en un compañero con experiencia para acompañar parte de su aprendizaje, sin soltar tú el seguimiento."},

   {int:false,t:"Darle exactamente el mismo plan y el mismo tiempo que a cualquier otra incorporación, para ser justo."},

   {int:false,t:"Reducir el acompañamiento extra para que el equipo no perciba favoritismos."}\],

  mirror:"Un buen plan aquí mantiene el mismo estándar para todos, pero adapta el acompañamiento a lo que cada persona necesita para llegar a él. Si ajustasteis el apoyo según lo que {nombre} necesita, ¡bien\! Si distribuisteis todo por igual para “ser justos”, recordad: equidad no es igualdad."}

\];

/\* \---------- Retos: 9 de fortaleza-en-exceso (best:true \= mejor, EIC) \+ genérico (varias valid:true). {nombre} \= candidato. \---------- \*/

const CHALLENGES \= {

 crecer:{fortaleza:"Ganas de crecer",reto:"la impaciencia por los resultados",

  esc:"{nombre} es de las personas con mejores resultados del equipo y siempre quiere ir a por más. En una jornada de alta afluencia, por cerrar rápido varias ventas, aceleró la atención. Al cierre se detectaron dos errores de cobro y una garantía mal registrada.",

  options:\[

   {t:"Conversar sobre los errores y reforzar que respete cada paso del proceso, sea cual sea el volumen.",porQue:"Se queda en corregir: señala el error, pero no reconoce su fortaleza ni acuerda cómo sostener el ritmo sin perder calidad."},

   {t:"Reconocer su orientación a resultados y, sobre lo que pasó hoy, mostrarle el impacto —dos errores y una garantía mal hecha— y acordar juntos qué mantener (su empuje) y qué cambiar (asegurar los pasos clave en los picos).",best:true,porQue:"Sigue EIC: parte de un ejemplo concreto, nombra el impacto real y acuerda qué continuar y qué cambiar. Desarrolla sin apagar su fortaleza."},

   {t:"Recordar a todo el equipo la importancia de cumplir los procesos en alta demanda.",porQue:"Diluye en el grupo un tema que es de {nombre}; nadie se da por aludido."},

   {t:"Pedirle que en los momentos de más tráfico baje el ritmo para minimizar errores.",porQue:"Frena justo su fortaleza en vez de canalizarla: le pides que sea menos, no mejor."}\]},

 conexion:{fortaleza:"Crea conexiones genuinas",reto:"evitar las conversaciones difíciles",

  esc:"{nombre} genera un clima excelente y se lleva muy bien con todo el mundo. Detectas una oportunidad de mejora en su desempeño, pero evita las conversaciones incómodas para no romper la buena relación, y va posponiendo temas que habría que hablar.",

  options:\[

   {t:"Esperar a que surja una situación más clara antes de decir nada.",porQue:"Evitar la conversación repite justo lo que quieres corregir; el tiempo no arregla lo que no se habla."},

   {t:"Aprovechar la próxima reunión de equipo para reforzar los estándares y ver si cambia.",porQue:"Generaliza al grupo algo individual; {nombre} no se da por aludido/a."},

   {t:"Tener una conversación individual: partir de un ejemplo concreto reciente, mostrarle el impacto de posponer esa charla y acordar qué mantener (su calidez) y qué cambiar (afrontar lo incómodo a tiempo).",best:true,porQue:"EIC completo —ejemplo, impacto y acuerdo— y le modelas la conversación difícil que a él/ella le cuesta tener."},

   {t:"Reconocer su buen clima e ir metiendo mejoras poco a poco en los seguimientos.",porQue:"Sin nombrar el ejemplo ni el impacto, el mensaje se diluye y no acordáis nada concreto."}\]},

 actitud:{fortaleza:"Actitud positiva ante los retos",reto:"aguantar de más y aislarse",

  esc:"{nombre} transmite calma incluso en los días difíciles y siempre saca una buena cara. Últimamente participa menos, evita pedir ayuda y, cuando le preguntas, responde que “todo bien”, aunque se nota que algo cambió.",

  options:\[

   {t:"Respetar su espacio y estar disponible por si quiere hablar.",porQue:"La disponibilidad pasiva deja el peso en quien justamente no pide ayuda."},

   {t:"Reconocer su capacidad de aguante y recordarle que el equipo la/lo apoya.",porQue:"Refuerza el aguante —la fortaleza en exceso— en vez de abrir lo que le pasa."},

   {t:"Generar un seguimiento cercano: partir de algo concreto que has observado, nombrar el impacto (te veo más apagado/a, participas menos) y acordar cómo cuidarse y cuándo pedir apoyo, valorando su entereza.",best:true,porQue:"EIC aplicado con cuidado —observa, nombra el impacto y acuerda— y rompe el “todo bien” con hechos concretos."},

   {t:"Reducir temporalmente sus responsabilidades hasta que se le vea mejor.",porQue:"Decides por él/ella sin entender qué pasa; puede vivirlo como castigo."}\]},

 energia:{fortaleza:"Energía que inspira",reto:"eclipsar al resto del equipo",

  esc:"{nombre} conecta con facilidad y es un referente natural. En las reuniones, muchos esperan su opinión antes de hablar y, con el tiempo, algunos participan cada vez menos.",

  options:\[

   {t:"Cambiar la dinámica de las reuniones para que todos participen por igual.",porQue:"Arregla el síntoma en la sala, pero no habla con {nombre} ni desarrolla su rol."},

   {t:"Pedirle que intervenga menos para dar espacio al resto.",porQue:"Apaga su fortaleza: le pides que brille menos en vez de usar su influencia a favor del equipo."},

   {t:"Reconocer su influencia y pedirle que anime a otros a compartir.",porQue:"Buena dirección, pero sin ejemplo concreto ni impacto nombrado se queda en un encargo genérico."},

   {t:"Conversar sobre un momento concreto en que su peso calló al resto, mostrarle el impacto (compañeros que ya no opinan) y acordar cómo convertir su influencia en desarrollar a otros, sin perder su energía.",best:true,porQue:"EIC completo y reencuadra la fortaleza como palanca para el equipo, no como un problema."}\]},

 cumple:{fortaleza:"Cumple lo que promete",reto:"la rigidez ante el cambio",

  esc:"{nombre} es de toda confianza: cumple, sostiene el estándar y rara vez falla. En el piso notas que hace el mismo recorrido de venta con todos los clientes y le cuesta adaptarse a cada uno, aunque haya oportunidad de personalizar.",

  options:\[

   {t:"Explicarle que hay que adaptar cada conversación y pedirle que lo aplique en todas sus ventas.",porQue:"Impone el cambio sin ejemplo ni diálogo. A alguien rígido, una orden más no le mueve."},

   {t:"Revisar juntos una venta concreta que viste, mostrarle qué oportunidad de conexión se perdió y acordar qué mantener (su solidez) y qué probar distinto (personalizar), acompañándolo/a.",best:true,porQue:"EIC sobre un caso real y le da seguridad para moverse de lo que ya domina."},

   {t:"Mantener su forma de vender mientras dé buenos resultados.",porQue:"Evita el desarrollo: su fortaleza se queda en la zona de confort."},

   {t:"Recordar al equipo la importancia de personalizar la venta.",porQue:"Generaliza algo que es de {nombre}; no hay conversación ni acuerdo."}\]},

 aprende:{fortaleza:"Aprende y busca mejorar",reto:"dispersarse y aburrirse con lo rutinario",

  esc:"{nombre} aprende rápido y disfruta cada novedad; brilla en los lanzamientos. Pero en las tareas rutinarias, como el inventario o el orden del stock, pierde el interés y hay que recordárselas.",

  options:\[

   {t:"Hablar de la importancia de mantener el mismo compromiso en todo y fijar expectativas claras.",porQue:"Solo corrige y pone reglas; no aprovecha su fortaleza ni acuerda nada que le motive."},

   {t:"Asignarle sobre todo retos de producto y evitar lo rutinario cuando se pueda.",porQue:"Alimenta la dispersión: le quitas lo aburrido en vez de enseñarle a sostenerlo."},

   {t:"Partir de una tarea rutinaria concreta que quedó a medias, mostrarle el impacto en el equipo y la tienda, y acordar cómo canalizar su curiosidad a la vez que sostiene lo operativo, con seguimiento.",best:true,porQue:"EIC y equilibra fortaleza y constancia con un acuerdo concreto."},

   {t:"Rotarlo/a más entre tareas para que no se aburra.",porQue:"Parche organizativo: no desarrolla su constancia, solo esconde el problema."}\]},

 experiencias:{fortaleza:"Crea experiencias memorables",reto:"sobre-implicarse y saltarse el proceso",

  esc:"{nombre} recibe excelentes comentarios y da lo que haga falta por el cliente. Para que una clienta no se fuera disconforme, hizo una excepción al proceso sin consultar. La clienta quedó feliz, pero generó dudas en el equipo sobre cómo actuar.",

  options:\[

   {t:"Explicarle que ante cualquier excepción debe consultar antes.",porQue:"Pone una regla sin reconocer su entrega ni acordar un criterio."},

   {t:"Reconocer su compromiso, revisar el caso concreto, mostrarle el impacto de la excepción en el equipo y acordar cómo equilibrar cliente y estándar: qué mantener y qué cambiar.",best:true,porQue:"EIC completo y protege su fortaleza dándole un marco para usarla bien."},

   {t:"Recordar al equipo qué excepciones permite la compañía.",porQue:"Generaliza; {nombre} no recibe la conversación que necesita."},

   {t:"Pedirle que priorice el proceso por encima del cliente.",porQue:"Apaga justo su fortaleza: invierte el problema en vez de equilibrarlo."}\]},

 rol:{fortaleza:"Se adueña de su rol",reto:"ir por libre",

  esc:"{nombre} resuelve sin esperar instrucciones, lo que le da rapidez. En una jornada de mucho movimiento tomó una decisión con un cliente sin consultar. Resolvió el caso, pero dejó dudas en el equipo sobre cuándo se puede decidir de forma autónoma.",

  options:\[

   {t:"Pedirle que a partir de ahora consulte todo lo que se salga de lo habitual.",porQue:"Mata su autonomía —la fortaleza— con un control total."},

   {t:"Reconocer su iniciativa, revisar la decisión concreta que tomó, mostrarle el impacto en el equipo y acordar juntos qué puede decidir solo/a y qué requiere alinear, compartiéndolo después con el equipo.",best:true,porQue:"EIC y convierte su autonomía en autonomía con criterio, sin apagarla."},

   {t:"Recordar al equipo los procedimientos ante situaciones excepcionales.",porQue:"Generaliza; el aprendizaje individual de {nombre} no ocurre."},

   {t:"Dejar que ese tipo de decisiones queden solo en tus manos.",porQue:"Centraliza y desperdicia su capacidad de resolver."}\]},

 detalle:{fortaleza:"Cuida cada detalle",reto:"el perfeccionismo que frena",

  esc:"{nombre} cuida cada detalle como nadie: exhibición impecable, empaque perfecto. En una jornada de alta afluencia se detiene tanto en dejar todo perfecto que varios clientes esperan sin ser atendidos, y una compañera comenta que “nada le parece suficientemente bien”.",

  options:\[

   {t:"Pedirle que en alta afluencia priorice la rapidez y deje los detalles para después.",porQue:"Le da una regla opuesta a su fortaleza sin acordar un criterio; oscila de un extremo al otro."},

   {t:"Reconocer su exigencia, partir de la jornada concreta, mostrarle el impacto (clientes esperando, equipo tenso) y acordar cómo distinguir cuándo el detalle aporta y cuándo frena.",best:true,porQue:"EIC y le da criterio para calibrar su fortaleza, no para renunciar a ella."},

   {t:"Recordar al equipo equilibrar presentación y agilidad.",porQue:"Generaliza; {nombre} no recibe la conversación concreta."},

   {t:"Mantener su forma de trabajar porque eleva el estándar.",porQue:"Evita el desarrollo: el perfeccionismo sigue frenando la atención."}\]}

};

const GENERIC \= { multi:true, fortaleza:"Encaja tan bien con el equipo", reto:"la amistad que contamina el trabajo",

  esc:"{nombre} encajó tan bien en el equipo que la sintonía es total: todos se han hecho amigos y hacen planes fuera del trabajo. La armonía se rompe cuando {nombre} se entera de que dos compañeras hablan mal de ella a sus espaldas —la critican por algo que pasó fuera del trabajo— y ahora no le colaboran en nada. {nombre} viene a contártelo con todo detalle de lo de fuera, y critica a sus compañeras.",

  options:\[

   {t:"La escuchas y le das tu opinión y consejo sobre cómo debería resolverlo.",porQue:"Resuelves por ella; el conflicto es suyo y la vuelves dependiente en vez de desarrollar su capacidad de gestionarlo."},

   {t:"Convocas una reunión de urgencia con todo el equipo para resolverlo juntos.",porQue:"Expones en público un conflicto personal, fuerzas bandos y puedes escalarlo. Primero entender, no convocar."},

   {t:"No dejas que siga hablando de lo de fuera del trabajo y reconduces a hechos concretos dentro del trabajo.",valid:true,porQue:"Pones el límite correcto: lo personal de fuera no es tu jurisdicción; lo que sí gestionas es el impacto en el trabajo (que no colaboren)."},

   {t:"Le haces preguntas sobre cómo cree que ella podría resolverlo con sus compañeras.",valid:true,porQue:"Coaching y empoderamiento: devuelves la propiedad del problema a quien lo tiene."},

   {t:"Hablas individualmente con las implicadas para que te cuenten su versión de los hechos.",porQue:"Recoger “versiones” de un tema personal alimenta el chisme y te mete de árbitro en algo de fuera del trabajo. Es justo lo que no quieres alimentar."},

   {t:"Hablas individualmente con las implicadas y les das feedback con EIC, centrado en la conducta en el trabajo (que no colaboran) y su impacto.",valid:true,porQue:"Más completa que la anterior: no vas a recoger chisme, vas a abordar la conducta concreta y su impacto, y a acordar el cambio."}\],

  mejorEnfoque:"El mejor enfoque no es una sola opción: combina reconducir al trabajo \+ devolverle la responsabilidad \+ cerrar con EIC sobre la conducta. Escuchar y aconsejar, convocar a todos o recoger versiones, por sí solas, no ayudan." };

/\* \---------- Cierre (Blooming) \---------- \*/

const CLOSE \= {

  title:"Cada talento puede florecer.",

  lines:\[

   "Elegisteis a una persona real, con su luz y sus retos, y decidisteis acompañarla. Porque nadie llega perfecto —y cada fortaleza, llevada al extremo, se convierte en un reto a gestionar.",

   "La misma energía que hoy desborda, mañana inspira al equipo. El mismo detalle que hoy frena, mañana enamora al cliente. La diferencia no está en el talento que encuentras: está en cómo lo lideras."\],

  final:"Hacer florecer el talento de tu equipo es la huella más honda que dejarás en ellos, y la forma más alta de crecer como líder." };

*(PT-BR: replicar en `content.pt.js` cuando esté traducido; hasta entonces exporta `null` y la app hace fallback a ES.)*

---

## 9\. Persistencia · reanudar · offline

- Guardar el estado en `localStorage` (clave `fullbloom`) en cada cambio; envolver en `try/catch`.  
- Al arrancar, si hay partida sin `finishedAt` → ofrecer Reanudar / Empezar de nuevo, mapeando el estado a su pantalla.  
- El `localStorage` es el buffer offline; el envío a la Sheet es un intento aparte que puede fallar sin bloquear.

---

## 10\. Casos límite

Menos de `numPriorities` elegidas → continuar bloqueado. · Puzzle single con **near** → mensaje suave \+ reintentar. · Puzzle multi → conjunto exacto para avanzar. · Candidato con 2 fortalezas → se añade el genérico como 3.º reto. · Crono a 0 → avanzar registrando \+ `timeouts`. · Sin red → bufferizar y reintentar. · Refresh → reanudar. · Falta texto en un idioma → fallback al otro.

---

## 11\. Fotos de los candidatos (generar con IA)

Cada candidato lleva una **foto de rostro** junto al nombre (campo `photo`, en `/img/`). Genera 4 imágenes con IA (ChatGPT/DALL·E u otra):

- **Rostros ilustrativos y neutros, no personas reales.** Estilo consistente entre los cuatro (mismo tratamiento, encuadre de retrato, fondo neutro).  
- Coherentes con edad/perfil: Mateo (\~26, enérgico), Valeria (\~31, cálida), Andrés (\~38, sobrio), Rocío (\~22, entusiasta). Diversidad LATAM.  
- Cuadradas (p. ej. 400×400), en `/img/` con los nombres del campo `photo`. **Locales** (para que funcione offline).  
- En la ficha: foto a la izquierda del nombre, con esquinas redondeadas o circular.

*Prompt sugerido:* "Retrato ilustrado, estilo plano y amable, de \[descripción\], fondo neutro rosa suave, sin texto, cuadrado, coherente con una serie de 4 retratos del mismo estilo."

---

## 12\. Criterios de aceptación

- [ ] Corre en Safari iOS y Chrome Android reales; funciona en modo avión tras la primera carga.  
- [ ] Partida completa de principio a fin en ES.  
- [ ] Secciones nombradas: Proceso de Selección · Onboarding · Retos del día a día.  
- [ ] Requisición: distractores mezclados en "Requisitos y Experiencia"; mínimo respetado.  
- [ ] Escape room: single con **near** y flojas; **multi** con conjunto exacto; feedback "por qué no es la mejor por sí sola"; nunca puntuación.  
- [ ] Candidatos: **foto** junto al nombre \+ checklist correcto; se elige uno.  
- [ ] Onboarding: pantalla **Fortalezas \+ Áreas a desarrollar**; ranking fija el flanco; enfoque \= acciones **sin etiqueta** \+ **espejo**.  
- [ ] Retos: **≥3** (fortalezas-en-exceso del candidato \+ genérico si tiene 2); **usan el nombre del candidato**; mejor respuesta en clave **EIC** con "por qué es/ no es la mejor"; el genérico admite varias válidas.  
- [ ] Cierre inspirador con `CLOSE.final`.  
- [ ] Registro a la Google Sheet con el esquema §7.1; sin datos personales.  
- [ ] Reanuda tras refresh; no pierde dato si cae el wifi.  
- [ ] Contenido en `content.es.js` y formato en `styles.css` editables **sin tocar** `app.js`.

---

## 13\. Pendiente (a propósito)

- **Duración `XX`**: falta el número; se calibra en la demo (`CONFIG.durationLabel`).  
- **Deliberación**: en producción 60/45/45; para testear se puede bajar a 15\.  
- **PT-BR**: `content.pt.js` pendiente de traducir.  
- **Género en los retos**: quedan algunos "/a" al insertar el nombre; limar en una pasada de revisión.  
- **Tiempos**: calibrar en la demo.

