# Requisitos técnicos · v2 — App de la dinámica

### La Gema del Tiempo · Store Manager Conference 2026 · Pandora LATAM

**Para:** el desarrollador (handoff). **Sustituye** por completo a la v1. El juego evolucionó: cambian los tres actos, la duración, la mecánica y —lo más importante para ti— **ahora sí se capturan datos**. Léelo entero antes de reutilizar nada del prototipo anterior. **Nota de contenido:** competencias, retos, arquetipos y textos siguen en co-creación. Lo que aparece como contenido es **placeholder**. La lógica es estable; solo cambiará el contenido → construir contenido y lógica separados desde el día uno.

---

## 0\. Lo que cambia respecto a la v1 (leer primero)

| \# | Antes (v1) | Ahora (v2) |
| :---- | :---- | :---- |
| Duración | \~30 min | **90 min**, con cronómetro por acto y micro-tiempos por fase en el Acto 3 |
| Captura de datos | Ninguna | **Sí**: registro de equipo \+ guardado de decisiones para análisis (rompe el "todo en el móvil") |
| Puntuación | Marcador falso | **Sin puntos ni ganador**, y se dice desde el inicio. La única presión es el tiempo |
| Acto 1 | 5 de 10 competencias | **4 de 8 características**, cada una con cara A \+ cara B; revela un asociado-persona |
| Acto 2 | Checklist de 4 pilares | **Decisiones con recursos limitados** sobre 4 ejes, con trampas |
| Acto 3 | Reto \+ consecuencia | **Puzzle de método por fases** (escape room), contrarreloj |

**El cambio de arquitectura más importante:** el registro de equipo y el guardado de respuestas **exigen una capa de persistencia** (backend ligero, Google Sheets vía Apps Script, o similar). La app deja de ser un único archivo autocontenido "sin red". Ver §2 y §8.

---

## 1\. Qué es (en una frase)

Una web app móvil, **híbrida con material físico**, que guía a equipos de 3–5 Store Managers por un juego de 3 actos (\~90 min), cronometra cada fase, y guarda de forma anónima las decisiones del equipo para análisis posterior. No muestra puntuaciones.

### No-objetivos (esto NO se construye)

- ❌ Sin puntuaciones, ranking ni "respuestas correctas" visibles al jugador.  
- ❌ Sin login ni cuentas individuales (el equipo se identifica solo con un alias).  
- ❌ Sin datos personales de asociados reales ni de los participantes.  
- ❌ Sin IA ni texto generado dinámicamente (posible fase 2).  
- ❌ Sin sincronización en tiempo real entre dispositivos de distintos equipos.

---

## 2\. Restricciones de arquitectura (leer antes que nada)

| \# | Restricción | Por qué |
| :---- | :---- | :---- |
| A1 | **Mobile-first, vertical.** Un móvil por equipo (o por mesa). | Es el contexto de uso. |
| A2 | **Contenido separado de lógica.** Todo el texto y contenido de juego (características, arquetipos, ejes, trampas, retos con el contenido de sus puzzles, toolkit) vive en una capa de contenido editable por alguien no técnico. La lógica no se toca para cambiar contenido. | El contenido cambiará tras la co-creación; es mucho y crecerá. |
| A3 | **Bilingüe ES-LATAM / PT-BR.** Idioma elegido al inicio; sesiones separadas por idioma. Todo el texto sale de la capa de contenido, nada hardcodeado. | Dos sesiones distintas. |
| A4 | **Persistencia ligera y anónima.** Se guarda: alias del equipo, idioma, y las decisiones de cada acto. **No** se guardan datos personales. Ver esquema en §8. | Requisito de negocio: analizar para mejorar RISE. |
| A5 | **Resiliencia ante red intermitente.** Durante el juego, la app debe seguir funcionando aunque el wifi falle: bufferiza las decisiones en memoria y sincroniza cuando haya red (o exporta al final). No debe bloquearse esperando al servidor. | El wifi de conferencia es poco fiable, pero necesitamos el dato. |
| A6 | **Sin marcador.** La UI nunca muestra puntos ni aciertos al jugador. | Regla de diseño: no hay ganador. |

**Tensión a resolver contigo (A4 vs A5):** capturar datos y funcionar offline tiran en direcciones opuestas. Enfoque recomendado: registrar el estado localmente durante el juego y **enviar el registro del equipo al store en puntos de sincronización** (fin de cada acto y al cerrar); si no hay red, reintentar y, como último recurso, ofrecer exportar/mostrar un código para que el facilitador lo recupere. La implementación es tuya; el requisito es: **no perder el dato y no bloquear el juego.**

---

## 3\. Flujo de pantallas

\[0\] Idioma (ES / PT)

      ↓

\[1\] Registro del equipo (alias) \+ reglas \+ premisa

      · Se enuncia: no hay puntos ni ganador; la única presión es el tiempo.

      ↓

\[2\] ACTO 1 · La selección            (15 min, crono por acto)

      · Eligen 4 de 8 características (cara A / cara B).

      · VENTANA DE DELIBERACIÓN: el botón de confirmar se activa tras un mínimo de tiempo.

      · Se revela el asociado como persona: nombre, cumpleaños, 4 caras A \+ 4 caras B.

      ↓

\[3\] ACTO 2 · El onboarding           (15 min)

      · Decisiones sobre 4 ejes con recursos limitados. Trampas ocultas.

      ↓

\[4\] REVELACIÓN DE TRAMPAS            (5 min, sin crono)

      · Se les muestra en qué trampa cayeron y por qué.

      ↓

\[5\] ACTO 3 · El método sobre el problema   (15 min, crono por acto \+ micro-crono por fase)

      · Reto asignado \= f(sombra dominante del Acto 1, eje descuidado del Acto 2).

      · Puzzle de método en fases. No se avanza sin resolver; si se acaba el tiempo, avanza con consecuencia.

      ↓

\[6\] CIERRE · Resumen "lo construisteis vosotros"

      · Resumen de su partida (apto para screenshot) \+ sincronización final. Sin puntuación.

*(El debrief teórico plenario y el toolkit digital son piezas aparte, no viven en la app.)*

---

## 4\. Lógica por acto

### Acto 1 — La selección

- Mostrar **8 características**; cada una tiene **cara A** (fortaleza) y **cara B** (sombra), una **categoría/familia** y un **peso** (algunas pesan más que otras para la lógica de arquetipos).  
- **Elegir exactamente 4\.** Menos o más → confirmar bloqueado.  
- **Ventana de deliberación:** el botón de confirmar no se activa hasta pasar un mínimo de tiempo configurable (fuerza la conversación en la mesa).  
- Al confirmar:  
  1. La combinación de 4 se mapea a un **arquetipo** de una biblioteca predefinida (persona con nombre \+ cumpleaños \+ descripción). Ver §5.  
  2. Se revelan las **4 caras A \+ 4 caras B** del asociado resultante (con detalle ligero).  
  3. Se calcula la **sombra dominante** (la cara B de mayor peso entre las elegidas) → se guarda para el Acto 3\.

**Matching arquetipo (a definir con producto):** de partida, mapear por la **familia dominante** de las 4 características \+ la característica de mayor peso. Si una combinación no tiene arquetipo escrito, usar un arquetipo genérico de esa familia como fallback. La biblioteca se construye anticipando las combinaciones más elegidas.

### Acto 2 — El onboarding

- Cuatro **ejes**: `Estándar y expectativas · Conexión y pertenencia · Conversaciones y seguimiento · Equipo y equidad`.  
- En cada eje, el equipo toma **decisiones con recursos limitados** (no les alcanza para maximizar todo). **La mecánica exacta de recursos está PENDIENTE de producto (ver §11).** Construir el eje de forma que la mecánica se pueda enchufar sin rehacer la pantalla.  
- Lo técnico **no es un eje**: aparece como una opción-tentación que consume recursos.  
- Cada eje tiene **una trampa** (la "virtud mal calibrada"): una opción que parece la más cálida/correcta pero siembra un problema. Marcar internamente si el equipo cayó.  
- Se guarda: las decisiones por eje, en qué trampas cayeron, la **frecuencia de seguimiento** elegida, y el **eje más descuidado** → para el Acto 3\.

### Revelación de trampas

- Pantalla (o secuencia) que muestra, por cada trampa en la que cayeron, **qué era** y **por qué** es un problema. Contenido desde la capa de contenido.

### Acto 3 — El método sobre el problema

- **Asignación del reto:** `reto = f(sombra dominante, eje descuidado)`. Elegir del banco el reto cuya `targetShadow`/`targetAxis` coincida; si hay varios, elegir uno; si ninguno coincide, fallback aleatorio.  
- El reto se resuelve como un **puzzle de método en fases**. Las fases y su contenido están en §5. Regla transversal: **el orden del método es cerrado** (hay una combinación correcta que desbloquea), pero **la decisión de liderazgo dentro de cada fase queda abierta** (no se valida como acierto/error; se registra la elección).  
- **Por fase:**  
  - Micro-crono visible.  
  - **Ventana de deliberación** (mínimo de tiempo antes de poder enviar).  
  - Validación de la "combinación del método" para desbloquear la siguiente.  
  - **Pista** tras X tiempo sin resolver.  
  - Si el micro-crono se agota → **avanza con consecuencia narrativa** (nunca bloqueo total).  
- **Cierre · Seguimiento:** no cronometrado, no es puzzle; el equipo define cómo y cuándo hará seguimiento (engancha con la frecuencia del Acto 2).

**Decisión de scope crítica (§11): ¿los puzzles se validan en la app, o son físicos (cartas en la mesa) y la app solo cronometra/guía y revela?** Esto cambia mucho tu trabajo. El spec cubre ambos: si es en-app, implementas la validación de cada fase; si es físico/híbrido, la app gestiona crono \+ ventana de deliberación \+ pistas \+ reveal, y registra la decisión abierta que el equipo introduce.

---

## 5\. Modelo de datos (la capa de contenido)

Estructura sugerida (afina nombres). Todo bilingüe `{es, pt}` con fallback a `es`.

const CONTENT \= {

  ui: { /\* cadenas de interfaz es/pt \*/ },

  categories: \[ { id:"empuje" }, { id:"relacion" }, { id:"ejecucion" } \],

  // ACTO 1 — 8 características, cara A / cara B

  characteristics: \[

    { id:"c1", category:"empuje", weight:2,

      name:{es:"Ambición",pt:"Ambição"},

      caraA:{es:"Orientada a resultados...",pt:"..."},

      caraB:{es:"Impaciencia; puede atropellar al equipo...",pt:"..."},

      shadowId:"impaciencia" },   // enlaza con el reto del Acto 3

    // ... c2 .. c8

  \],

  // ACTO 1 — biblioteca de arquetipos (combinaciones \-\> persona)

  archetypes: \[

    { id:"a1",

      match:{ dominantFamily:"empuje", keyCharacteristic:"c1" }, // regla de matching

      name:{es:"Valentina",pt:"Valentina"}, birthday:"12 mar",

      blurb:{es:"...",pt:"..."},

      revealedA:\["c1","c4","c6","..."\], revealedB:\["impaciencia","..."\] }

    // ... \+ arquetipo genérico por familia (fallback)

  \],

  // ACTO 2 — 4 ejes, opciones y trampas

  axes: \[

    { id:"estandar", label:{es:"Estándar y expectativas",pt:"..."},

      options:\[

        { id:"o1", text:{es:"...",pt:"..."}, cost:{/\* según mecánica de recursos \*/}, isTrap:false },

        { id:"o2", text:{es:"No marcarle límites para no agobiarlo",pt:"..."}, isTrap:true,

          trapExplain:{es:"Parece amable, pero la ambigüedad crea dependencia.",pt:"..."} }

      \] },

    // ... conexion, conversaciones, equipo

  \],

  // ACTO 3 — banco de retos con el contenido de cada fase del puzzle

  challenges: \[

    { id:"r1", targetShadow:"impaciencia", targetAxis:"estandar",

      scene:{es:"Valentina, tu asociada \#1...",pt:"..."},

      excuse:{es:"Yo traigo los números...",pt:"..."},

      phase1\_facts: \[   // "El tablero de los hechos"

        { text:{es:"Cerró el 30% de las ventas del mes.",pt:"..."}, isFact:true },

        { text:{es:"Se cree superior al equipo.",pt:"..."}, isFact:false },

        // ...

      \],

      phase1\_priority:{es:"El efecto sobre el equipo, no las ventas.",pt:"..."},

      phase2\_settings: \[  // "El momento correcto"

        { text:{es:"En privado, inicio de turno, 15 min",pt:"..."}, correct:true },

        { text:{es:"En el piso, delante de clientes",pt:"..."}, correct:false }

      \],

      phase3\_fragments: \[ // EIC: válidos ordenables \+ trampas

        { text:{es:"Ayer, cuando la novata propuso...",pt:"..."}, role:"E" },

        { text:{es:"El impacto: la novata dejó de proponer...",pt:"..."}, role:"I" },

        { text:{es:"Lo que te pido: cuando un compañero aporte...",pt:"..."}, role:"C" },

        { text:{es:"Eres arrogante.",pt:"..."}, role:"TRAP" }

      \],

      phase4\_responses: \[ // Push / Pull

        { text:{es:"¿Qué necesitas para que el equipo te sume?",pt:"..."}, mode:"pull" },

        { text:{es:"Ya te lo dije mil veces.",pt:"..."}, mode:"push" }

      \],

      phase4\_requests: \[  // "la petición debajo de la queja" — ABIERTO, no hay correcta

        { text:{es:"Reconocimiento",pt:"..."} }, { text:{es:"Un estándar",pt:"..."} }, { text:{es:"Poder",pt:"..."} }

      \],

      phase4\_commitments: \[

        { text:{es:"Ella da espacio; tú le das visibilidad y crecimiento.",pt:"..."}, real:true },

        { text:{es:"Que ponga de su parte.",pt:"..."}, real:false }

      \],

      followup\_prompt:{es:"¿Cómo y cuándo verificarás el cambio?",pt:"..."}

    }

    // ... r2 .. rN

  \],

  trapReveal: { /\* textos de la pantalla de revelación, si no van dentro de axes \*/ },

  close: { /\* textos del cierre "lo construisteis vosotros" \*/ },

  surveyUrl: "https://forms.office.com/..."   // QR del debrief, si aplica

};

### Esquema de captura (lo que se guarda por equipo)

{

  teamAlias: "Los Cronos",

  lang: "es",

  startedAt, finishedAt,

  act1: { chosen:\["c1","c4","c6","c8"\], archetypeId:"a1", dominantShadow:"impaciencia" },

  act2: { choicesByAxis:{estandar:"o2", ...}, trapsFallen:\["estandar"\], followupFrequency:"quincenal", neglectedAxis:"conexion" },

  act3: { challengeId:"r1",

          phase1:{ factsSelected:\[...\], priority:"..." },

          phase2:{ settingSelected:"..." },

          phase3:{ ordered:\["E","I","C"\], trapsKept:\[\] },

          phase4:{ pullSelected:\[...\], requestChosen:"reconocimiento", commitmentChosen:"real" },

          followup:"...",

          timeouts:\["phase3"\] }

}

Sin nombres de personas reales. El `teamAlias` es un apodo elegido por el equipo.

---

## 6\. Mecánicas de tiempo

- **Crono por acto** (15 min visible en Actos 1, 2, 3).  
- **Micro-crono por fase** en el Acto 3 (a repartir dentro de los 15 min; valores exactos a calibrar en test).  
- **Ventana de deliberación:** en el Acto 1 (antes de confirmar) y en cada fase del Acto 3, el botón de avanzar aparece **deshabilitado durante un mínimo configurable**. Fuerza la conversación en vez del clic rápido.  
- **Comportamiento al agotarse un crono:** en el Acto 3, avanzar con consecuencia narrativa; registrar el timeout. Los cronos de acto son marco general (no expulsan a mitad de fase).  
- Todos los tiempos y mínimos deben ser **parámetros configurables**, no números incrustados.

---

## 7\. Casos límite y reglas

| Situación | Comportamiento |
| :---- | :---- |
| Eligen ≠ 4 características | Confirmar bloqueado; indicar cuántas faltan/sobran. |
| Combinación sin arquetipo escrito | Fallback a arquetipo genérico de la familia dominante. |
| Ningún reto coincide con sombra+eje | Fallback: elegir por sombra; si no, aleatorio. |
| Falta texto en un idioma | Fallback al otro; nunca hueco vacío. |
| Sin red en un punto de sincronización | Bufferizar y reintentar; nunca bloquear el juego; opción de export manual. |
| Refresh / cierre accidental | Definir con producto: reanudar (requiere estado persistido local) o reiniciar. |
| Se agota el micro-crono de una fase (Acto 3\) | Avanzar con consecuencia; registrar timeout. |
| Varias mesas a la vez | Cada dispositivo/equipo es independiente; sin sincronización entre equipos. |

---

## 8\. Captura de datos y privacidad (requisito nuevo)

- **Qué se guarda:** el esquema de §5 —alias de equipo, idioma, decisiones por acto, trampas, timeouts. Nada más.  
- **Qué NO se guarda:** nombres reales, correos, datos de participantes o de asociados reales.  
- **Dónde vive:** decisión abierta (§11). Opciones típicas: endpoint serverless \+ base sencilla, o Google Sheet vía Apps Script. Debe permitir a HR exportar para análisis.  
- **Acceso:** restringido a HR LATAM. El dato refleja **cómo decide liderar cada equipo**, así que se trata con cuidado aunque sea anónimo a nivel de persona.  
- **Transporte:** HTTPS. Sin cookies de tracking, sin analytics de terceros.

---

## 9\. Criterios de aceptación (definition of done)

- [ ] Carga y corre en **Safari iOS** y **Chrome Android** (dispositivos reales).  
- [ ] Partida completa en **ES** y en **PT**.  
- [ ] El juego **no se bloquea** si el wifi cae a mitad; las decisiones se recuperan al reconectar (o por export).  
- [ ] Elegir ≠ 4 características está impedido; la **ventana de deliberación** funciona en Acto 1 y en cada fase del Acto 3\.  
- [ ] La **sombra dominante** y el **eje descuidado** determinan correctamente el reto asignado.  
- [ ] En el Acto 3, no se avanza sin resolver el método; al agotarse el tiempo, se avanza con consecuencia; las pistas aparecen.  
- [ ] **Nunca** se muestra puntuación ni "acierto/error" de la decisión de liderazgo.  
- [ ] El registro guardado coincide con el esquema de §5; **sin datos personales**.  
- [ ] Todo el contenido se edita en la capa de contenido, sin tocar la lógica.  
- [ ] Ninguna llamada a analytics/terceros sale del dispositivo.

---

## 10\. Alcance por fases

**Fase 1 (conferencia 2026 — esto):** los 3 actos \+ revelación de trampas \+ cierre, bilingüe, con captura anónima y resiliencia de red. Determinista, sin IA.

**Fase 2 (opcional):** PWA instalable, excusas del asociado más dinámicas, más ramificación, panel de análisis para HR sobre el dato capturado.

---

## 11\. Decisiones de producto pendientes (las decide HR, no el dev)

1. **Puzzles del Acto 3: ¿en-app, físicos (cartas) o híbridos?** Es la decisión de scope más grande.  
2. **Mecánica de recursos del Acto 2** (presupuesto de tiempo/fichas, elección forzada entre pares, o ambas).  
3. **Dónde vive el dato** capturado (backend propio, Google Sheet, otro) y quién lo administra.  
4. **Persistencia ante refresh** (¿reanudar o reiniciar? — afecta si se guarda estado local).  
5. **Valores de tiempo** exactos: micro-cronos por fase y mínimos de la ventana de deliberación (a calibrar en test).  
6. **Volumen de contenido:** nº de arquetipos, nº de retos, nº de ítems por puzzle.  
7. **Idioma:** confirmado ES-LATAM \+ PT-BR (toggle inicial; contenido duplicado en la capa de contenido).

---

## 12\. Punto de partida

Existe un **prototipo v1** funcional (idioma → 3 actos simples → cierre) que sirve como referencia de estilo y de estructura de contenido, **pero la mecánica de la v2 es sustancialmente distinta** (arquetipos, recursos, puzzle de método, captura). Trátalo como maqueta de referencia, no como base a extender: probablemente sea más limpio reconstruir la lógica partiendo de la capa de contenido de esta v2. La separación contenido/lógica y el patrón de pantallas del v1 sí se conservan.  
