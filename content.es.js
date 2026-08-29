window.CONTENT_ES = {
  ui: {
    language: '¿Ya está el equipo al completo? ¿Ya tenéis todo listo en la mesa?',
    welcomeIntro: 'Si ya estáis preparados, elegid el idioma y empecemos.',
    start: 'Empezar', continue: 'Continuar', confirm: 'Confirmar', hire: 'Contratar a este',
    plan: 'Planificar su onboarding', interview: 'Empezar la entrevista', register: 'Registrar decisión',
    world: 'Ir al mundo real', next: 'Siguiente', resume: 'Reanudar', restart: 'Nueva partida',
    sync: 'Sincronizar ahora', export: 'Exportar respaldo', timer: 'Tiempo restante',
    selected: 'elegidas', minimum: 'mínimo', deliberate: 'Deliberad antes de registrar vuestra decisión.',
    offline: 'Sin conexión: las decisiones siguen guardadas en este dispositivo.',
    syncPending: 'Respaldo pendiente de sincronización.', syncDone: 'Registro enviado a la hoja.',
    noAnswer: 'Sin respuesta', completeFallback: 'El tiempo terminó. La app completó lo imprescindible para continuar.',
    resumeTitle: 'Partida guardada', resumeText: 'Hay una partida sin terminar en este dispositivo.'
  },
  welcome: {
    eyebrow: 'Store Manager Conference 2026', title: 'Sois un solo equipo',
    premise: 'Debéis consensuar todas las decisiones que vais a tomar a lo largo de este juego. Cada decisión cuenta, y contáis con un tiempo limitado para debatir y decidir como equipo.',
    rules: 'El juego tiene una duración máxima de {duration} minutos. No gana quien termina primero.',
    aliasLabel: '¿Cómo se llama vuestro equipo?', aliasHelp: 'Usad un nombre breve para identificar vuestra mesa.'
  },
  acts: { act1: 'Acto 1 · La selección', act2: 'Acto 2 · El plan de onboarding', act3: 'Acto 3 · El mundo real' },
  req: {
    title: 'Nos ponemos en situación',
    intro: 'Sois Store Manager en Pandora: tenéis una vacante en vuestra tienda y debéis reclutar un/a Sales Assistant para el equipo. Decidid cuáles son las competencias clave y elegid solo las que sean relevantes para el rol.',
    priorityTitle: 'Preparad la entrevista',
    priorityIntro: 'Enfocaos en las 3 competencias o requisitos más importantes. Elegidlos tocando en orden de mayor a menor importancia.'
  },
  interview: {
    single: '¿Cuál de estas preguntas detecta de verdad esta competencia? Descarta las que no y quédate con una.',
    multi: 'Hay más de una pregunta que detecta esta competencia. Marcad todas las que la detecten y descartad el resto.',
    success: 'Así se detecta. Pide un caso concreto: conducta real, no una opinión.',
    successMulti: 'Así se detecta. Las conductuales concretas revelan conducta real.',
    missing: 'Casi. Hay más de una pregunta que detecta esta competencia: falta al menos una.', weak: 'Esa no.'
  },
  candidates: {
    title: 'Elegid a quién contratáis',
    intro: 'Habéis preseleccionado a 4 candidatos. Todos tienen potencial y fortalezas distintas, pero solo podéis seleccionar a una persona. Como en la vida real, los candidatos ideales son difíciles de encontrar. Decidid en equipo quién será contratado.',
    requirements: 'Requisitos', cv: 'CV', hired: 'Habéis contratado a {name}',
    gaps: 'Estas son las oportunidades de desarrollo que no cumple al 100%:',
    noGaps: 'Cumple todos los requisitos; aun así, el acompañamiento intencional importa.'
  },
  onboarding: {
    rankTitle: '¿En qué os centráis primero?',
    rankIntro: 'No vais a poder desarrollar todas las áreas al mismo tiempo. Ordenad las 4 dimensiones según lo más necesario: 1 es lo más importante y urgente.',
    focusTitle: 'Diseñad el enfoque', focusIntro: '¿Cómo lo planificáis para esta persona?',
    revealTitle: 'Lo que vuestro plan deja expuesto',
    revealIntro: 'Antes de ir al mundo real, observad los atajos elegidos y el flanco que quedó descubierto.',
    intentional: 'Enfoque intencional', shortcut: 'Atajo', neglected: 'El flanco descubierto',
    noShortcuts: 'No tomasteis atajos en vuestras prioridades.'
  },
  shadows: { title: 'Emergieron varias sombras', intro: '¿Cuál trabajáis primero?' },
  case: { title: 'El mundo real', intro: 'Han pasado varios meses. La sombra que traía {name} se hizo visible.' },
  close: {
    eyebrow: 'Fin de la partida', title: 'Lo construisteis vosotros',
    text: 'El reto que resolvisteis no fue al azar: nació de la sombra que traía quien elegisteis y del flanco que dejasteis sin preparar. La coherencia entre lo que sembráis al inicio y lo que hacéis bajo presión: eso es liderazgo.',
    team: 'Equipo', candidate: 'Contratasteis a', neglected: 'Descuidasteis', decision: 'Decisión final'
  },

  REQS: [
    'Atención al cliente y storytelling', 'Cierre y orientación a resultados', 'Venta cruzada y upselling',
    'Orientación al cliente / experiencia memorable', 'Comunicación efectiva', 'Trabajo en equipo',
    'Adaptabilidad y flexibilidad', 'Manejo de caja y procesos operativos', 'Experiencia previa en retail o joyería'
  ],
  POOL: [
    {id:'atencion',block:'Excelencia Comercial',w:4,name:'Atención al cliente y storytelling'},
    {id:'cierre',block:'Excelencia Comercial',w:3,name:'Cierre y orientación a resultados'},
    {id:'cruzada',block:'Excelencia Comercial',w:4,name:'Venta cruzada y upselling'},
    {id:'producto',block:'Excelencia Comercial',w:3,name:'Conocimiento de producto y colecciones'},
    {id:'negocio',block:'Excelencia Comercial',w:3,name:'Entendimiento del negocio y KPIs'},
    {id:'procesos',block:'Excelencia Operativa',w:3,name:'Ejecución de procesos de tienda'},
    {id:'caja',block:'Excelencia Operativa',w:3,name:'Manejo de caja y transacciones'},
    {id:'visual',block:'Excelencia Operativa',w:2,name:'Visual merchandising'},
    {id:'sistemas',block:'Excelencia Operativa',w:2,name:'Uso de sistemas y POS'},
    {id:'organizacion',block:'Excelencia Operativa',w:3,name:'Organización y gestión del tiempo'},
    {id:'estandares',block:'Excelencia Operativa',w:3,name:'Cumplimiento de estándares y políticas'},
    {id:'mercancia',block:'Excelencia Operativa',w:3,name:'Cuidado de mercancía / prevención de pérdidas'},
    {id:'orientacion',block:'Excelencia con las Personas',w:4,name:'Orientación al cliente / experiencia memorable'},
    {id:'equipo',block:'Excelencia con las Personas',w:4,name:'Trabajo en equipo'},
    {id:'comunicacion',block:'Excelencia con las Personas',w:4,name:'Comunicación efectiva'},
    {id:'apoyo',block:'Excelencia con las Personas',w:3,name:'Apoyo a nuevos integrantes'},
    {id:'marca',block:'Actitud y Comportamiento',w:4,name:'Promueve la marca y vive los valores'},
    {id:'adaptabilidad',block:'Actitud y Comportamiento',w:3,name:'Adaptabilidad y flexibilidad'},
    {id:'desarrollo',block:'Actitud y Comportamiento',w:3,name:'Desarrollo propio y aprendizaje continuo'},
    {id:'integridad',block:'Actitud y Comportamiento',w:4,name:'Responsabilidad, confiabilidad e integridad'},
    {id:'entorno',block:'Actitud y Comportamiento',w:2,name:'Conciencia del entorno'},
    {id:'experiencia',block:'Requisitos y Experiencia',w:2,name:'Experiencia previa en retail o joyería'},
    {id:'d_moda',block:'Requisitos y Experiencia',w:0,dist:true,name:'Conocimiento de moda y tendencias'},
    {id:'educativo',block:'Requisitos y Experiencia',w:1,name:'Nivel educativo (preparatoria)'},
    {id:'d_idiomas',block:'Requisitos y Experiencia',w:0,dist:true,name:'Dominio de idiomas extranjeros (inglés avanzado)'},
    {id:'office',block:'Requisitos y Experiencia',w:1,name:'Office / Excel básico'},
    {id:'d_ppt',block:'Requisitos y Experiencia',w:0,dist:true,name:'Diseño de presentaciones (PowerPoint)'},
    {id:'disponibilidad',block:'Requisitos y Experiencia',w:3,name:'Disponibilidad y movilidad'},
    {id:'d_foto',block:'Requisitos y Experiencia',w:0,dist:true,name:'Fotografía de producto y contenido para redes'},
    {id:'d_moda2',block:'Requisitos y Experiencia',w:0,dist:true,name:'Creatividad para escaparates y campañas propias'},
    {id:'d_publico',block:'Requisitos y Experiencia',w:0,dist:true,name:'Hablar en público / oratoria'},
    {id:'d_reparacion',block:'Requisitos y Experiencia',w:0,dist:true,name:'Reparación y arreglo de joyas'},
    {id:'d_gemologia',block:'Requisitos y Experiencia',w:0,dist:true,name:'Gemología y certificación de piedras'}
  ],

  PUZZLES: {
    atencion:{good:'Cuéntame la última venta en la que usaste la historia de una pieza para conectar con un cliente. ¿Cómo reaccionó?',weak:[['¿Te consideras bueno/a contando la historia de un producto?','Se responde con un sí; no aporta evidencia.'],['¿Cómo usarías el storytelling para vender una pieza cara?','Mide lo que imagina, no lo que ha hecho.'],['¿Qué colecciones conoces mejor?','Detecta conocimiento de producto, no storytelling.']]},
    cruzada:{options:[{text:'Cuéntame cómo fue la última vez que un cliente quería una sola pieza y conseguiste que se llevase algo más. ¿Cómo lo lograste?',correct:true},{text:'¿Sueles ofrecer productos complementarios, verdad?',why:'La pregunta ya dicta la respuesta deseada.'},{text:'Si un cliente compra un anillo, ¿qué le ofrecerías?',why:'Mide criterio teórico, no práctica real.'},{text:'¿Sueles cumplir tu UPT?',why:'Es un KPI; no revela la conducta detrás.'},{text:'¿Cómo sueles hacer tu ceremonia de ventas para alcanzar tus objetivos?',near:'Esta es muy buena pregunta, pero hay otra un poco más específica.'}]},
    orientacion:{good:'Cuéntame de un cliente que volviera a buscarte a ti. ¿Qué hiciste para que pasara?',weak:[['¿Qué es para ti un buen servicio al cliente?','Pide una definición; se recita sin haberlo dado.'],['¿Qué harías si un cliente se va sin comprar?','Mide una reacción imaginada.'],['¿Cómo resuelves una reclamación difícil?','Apunta a gestión de conflictos, no a fidelizar.']]},
    equipo:{good:'Cuéntame una situación en la que el equipo estaba desbordado y cómo te coordinaste con los demás.',weak:[['¿Te consideras una persona de equipo?','Nadie dice que no; sin evidencia.'],['¿Te adaptas bien a trabajar con otros, verdad?','La pregunta induce el sí.'],['¿Cómo te llevas con tu Store Manager?','Mide la relación con el líder, no la horizontal.']]},
    comunicacion:{options:[{text:'Cuéntame una vez que tuviste que dar una información incómoda a un cliente o compañero. ¿Cómo lo dijiste?',correct:true},{text:'¿Se te da bien comunicar?',why:'Autoevaluación sin evidencia.'},{text:'¿Qué es para ti una buena comunicación?',why:'Pide teoría, no demuestra.'},{text:'En ocasiones nos encontramos con situaciones difíciles, como un cliente enojado. Seguro que puedes contarme un ejemplo que te pasó y cómo te enfrentaste a esa situación.',why:'Suena conductual, pero detecta gestión del conflicto, no la comunicación en sí.'},{text:'Cuéntame una situación en la que tu comunicación fue efectiva, ¿qué sucedió y cómo lo resolviste?',why:'Le pides que elija un caso donde ya le fue bien: no revela cómo comunica cuando es difícil.'}]},
    marca:{multi:true,options:[{text:'¿Qué te atrae de Pandora frente a otras marcas? ¿Hay algo concreto que te gusta de Pandora como marca para la que trabajar?',correct:true},{text:'¿Qué valores te representan como profesional? ¿Cuáles son importantes para ti dentro de la cultura de la empresa o marca para sentirte feliz?',correct:true},{text:'Nuestros valores son soñar, atreverse, cuidar y entregar, ¿te identificas?',why:'Le das los valores; solo asiente.'},{text:'¿Conoces la marca Pandora?',why:'Un sí/no; no distingue admiración de ubicación.'},{text:'¿Qué sabes de nuestras colecciones actuales?',why:'Mide producto, no compromiso con la marca.'}]},
    integridad:{good:'Cuéntame una vez que cometiste un error en caja o con producto. ¿Qué hiciste?',weak:[['¿Te consideras una persona responsable y honesta?','Todos dicen que sí; no filtra.'],['¿Qué harías si vieras a un compañero llevándose producto?','Mide la respuesta correcta que todos saben.'],['¿Conoces los procesos de apertura y cierre?','Mide lo operativo, no la integridad.']]},
    cierre:{good:'Cuéntame un mes en el que ibas por debajo de tu objetivo. ¿Qué hiciste para darle la vuelta?',weak:[['¿Sueles cumplir tus objetivos de venta?','Un resultado sí/no; no revela cómo.'],['¿Qué harías si vas retrasado en tus metas?','Respuesta imaginada.'],['¿Conoces bien los KPIs de la tienda?','Mide entendimiento del negocio, no resultados.']]},
    producto:{good:'Háblame de una pieza o colección que te encante y cómo se la presentarías a un cliente.',weak:[['¿Conoces bien nuestro catálogo?','Sí/no sin evidencia.'],['¿Cómo te mantendrías al día de los lanzamientos?','Mide intención, no hábito.'],['Hay que saberse el producto al detalle, ¿tú te lo estudias, no?','Induce el sí.']]},
    negocio:{good:'¿Qué indicadores mirabas en tu tienda y qué hacías tú, en el piso, para moverlos?',weak:[['¿Sabes qué es la tasa de conversión?','Mide si conoce un término, no si lo usa.'],['¿Sueles cumplir tus metas de venta?','Apunta a resultados, no a comprensión.'],['¿Por qué crees que son importantes los KPIs?','Pide teoría sin evidencia de uso.']]},
    procesos:{good:'Cuéntame cómo era tu rutina de apertura o cierre en tu tienda anterior, paso a paso.',weak:[['¿Sabes hacer apertura y cierre?','Sí/no; no distingue dominio.'],['¿Cómo organizarías la recepción de un pedido grande?','Mide imaginación, no experiencia.'],['Los procesos aquí son estrictos, ¿tú eres ordenado, verdad?','Induce la respuesta.']]},
    caja:{good:'Cuéntame la última vez que te cuadró (o no) la caja al cierre. ¿Qué pasó y qué hiciste?',weak:[['¿Tienes experiencia manejando caja?','Sí/no; no revela el rigor.'],['¿Qué harías si te falta dinero en caja?','La respuesta correcta que todos saben.'],['¿Conoces el POS o Charmsys?','Mide sistemas, no el manejo de efectivo.']]},
    organizacion:{good:'Cuéntame un día en el que tuviste demasiadas tareas a la vez. ¿Cómo decidiste el orden?',weak:[['¿Te consideras una persona organizada?','Nadie dice que no.'],['¿Cómo priorizarías tres cosas urgentes a la vez?','Criterio imaginado.'],['Aquí hay mucho ritmo, ¿gestionas bien tu tiempo, no?','Induce el sí.']]},
    estandares:{good:'Cuéntame de una norma o estándar que te costara cumplir y cómo lo llevaste.',weak:[['¿Respetas siempre las políticas de la empresa?','Todos dicen que sí.'],['¿Qué harías si un compañero se salta una norma?','Respuesta de manual.'],['¿Conoces los protocolos de prevención de pérdidas?','Apunta al cuidado de mercancía.']]},
    mercancia:{good:'Cuéntame una vez que detectaste una diferencia de inventario o un riesgo con el producto. ¿Qué hiciste?',weak:[['¿Eres cuidadoso con el producto?','Sí/no sin evidencia.'],['¿Qué harías si notas que falta mercancía?','La respuesta esperada.'],['¿Sabes hacer inventarios en el sistema?','Mide sistemas, no la conducta de cuidado.']]},
    apoyo:{good:'Cuéntame de alguien nuevo al que ayudaste a integrarse. ¿Qué hiciste concretamente?',weak:[['¿Te gusta ayudar a los que llegan nuevos?','Un sí genérico.'],['¿Cómo ayudarías a un compañero nuevo?','Mide lo que imagina.'],['¿Te consideras buen compañero de equipo?','Trabajo en equipo general, no apoyo a nuevos.']]},
    adaptabilidad:{good:'Cuéntame de un cambio inesperado en tu tienda y cómo lo llevaste.',weak:[['¿Te adaptas bien a los cambios?','Nadie dice que no.'],['Aquí cambia mucho, ¿tú eres flexible, verdad?','Induce el sí.'],['¿Qué harías si cambian tu turno de un día para otro?','Reacción imaginada.']]},
    desarrollo:{good:'Cuéntame algo que aprendiste por tu cuenta para mejorar en tu trabajo. ¿Qué te llevó a hacerlo?',weak:[['¿Te gusta aprender cosas nuevas?','Un sí genérico.'],['¿Cómo mejorarías tus habilidades de venta?','Mide intención.'],['¿Asistes a todas las capacitaciones?','Mide asistencia, no iniciativa propia.']]},
    disponibilidad:{good:'¿Cuál es tu disponibilidad real de horarios y fines de semana, y para moverte entre tiendas?',weak:[['¿Tienes disponibilidad completa?','Un sí cómodo que no concreta.'],['Necesitamos gente flexible, ¿no hay problema, verdad?','Induce el sí y tapa restricciones.'],['¿Estarías dispuesto a cambiar de tienda?','Fácil en abstracto; no aterriza condiciones.']]}
  },

  CANDIDATES: [
    {id:'mateo',name:'Mateo',age:26,tag:'El vendedor ambicioso',cv:'3 años en retail de moda rápida como top vendedor. Números altos y mucha energía; busca crecer rápido. Sin experiencia en joyería.',destaca:'Ganas de crecer · Energía que inspira · Orientación a resultados',met:[false,true,true,false,true,false,true,true,true],shadows:['crecer','energia']},
    {id:'valeria',name:'Valeria',age:31,tag:'El trato excepcional',cv:'5 años en perfumería y retail de atención al cliente. Clientas fieles que la buscan por su trato. Cálida; menos cómoda con la presión de metas.',destaca:'Crea conexiones genuinas · Crea experiencias memorables · Orientación al cliente',met:[true,false,false,true,true,true,true,true,true],shadows:['conexion','experiencias']},
    {id:'andres',name:'Andrés',age:38,tag:'El operador sólido',cv:'8 años en retail, key holder. Impecable en procesos, caja y estándares. Rígido con lo nuevo y poca chispa comercial.',destaca:'Cumple lo que promete · Cuida cada detalle · Se adueña de su rol',met:[false,true,false,false,true,true,false,true,true],shadows:['cumple','detalle','rol']},
    {id:'rocio',name:'Rocío',age:22,tag:'La promesa por pulir',cv:'Recién egresada, 1 año en cafetería. Primer empleo en retail. Entusiasta, aprende rápido, disponibilidad total. Sin rodaje comercial ni de caja.',destaca:'Aprende y busca mejorar · Actitud positiva ante los retos · Ganas de crecer',met:[false,false,false,true,true,true,true,false,false],shadows:['aprende','actitud','crecer']}
  ],
  DIMENSIONS: [
    {id:'estandar',label:'Estándar y expectativas',intencional:'Priorizo qué se espera de la persona en los primeros 30 días y cómo sabrá que avanza.',atajo:'Le doy toda la información en la inducción y confío en que la práctica lo aclare.',mensaje:'Informar no es dar claridad.'},
    {id:'conexion',label:'Conexión y pertenencia',intencional:'Diseño oportunidades para que se integre y le asigno un compañero de apoyo.',atajo:'El equipo es abierto; ya se integrará sola con el tiempo.',mensaje:'La pertenencia se diseña, no ocurre sola.'},
    {id:'conversaciones',label:'Conversaciones y seguimiento',intencional:'Agendo seguimientos breves para reconocer avances y detectar temprano si algo no va.',atajo:'Si no hay problemas, no la interrumpo; ya me dirá si algo pasa.',mensaje:'El silencio no significa que todo esté bien.'},
    {id:'integracion',label:'Integración y equidad',intencional:'Mismo estándar para todos, pero ajusto el acompañamiento a lo que cada una necesita.',atajo:'Para ser justo, le doy exactamente lo mismo que a todos.',mensaje:'Equidad no es igualdad.'}
  ],
  SHADOW_MAP: {estandar:['crecer','experiencias','detalle','cumple'],conexion:['actitud'],conversaciones:['conexion','aprende'],integracion:['energia','rol']},
  SHADOW_LABELS: {crecer:'Impaciencia por los resultados',conexion:'Amiguismo, evita el conflicto',actitud:'Aguanta y se aísla en silencio',energia:'Necesita protagonismo',cumple:'Rigidez ante el cambio',aprende:'Se dispersa, se aburre con la rutina',experiencias:'Se sobre-implica, regala de más',rol:'Va por libre',detalle:'Perfeccionismo que frena'},
  CHALLENGES: {
    crecer:{prot:'Valentina',esc:'Valentina es de las asociadas con mejores resultados. En una jornada de alta afluencia, por cerrar rápido, aceleró la atención. Al cierre se detectaron dos errores de cobro y una garantía mal registrada.',opts:[['A','Conversar sobre los errores y reforzar respetar cada paso del proceso, sea cual sea el volumen.'],['B','Reconocer su orientación a resultados y analizar juntos qué decidió, para sostener el desempeño sin comprometer la calidad.',true],['C','Recordar a todo el equipo la importancia de los procesos en alta demanda.'],['D','Pedirle que en alta afluencia reduzca el ritmo para minimizar errores.']]},
    conexion:{prot:'Sofía',esc:'Sofía genera un clima excelente y muy buenas relaciones. Detectas una oportunidad de mejora en su desempeño, pero pospones la conversación porque temes afectar la buena relación.',opts:[['A','Esperar una nueva situación para ver cómo evoluciona antes de decidir si hablas.'],['B','Aprovechar la próxima reunión de equipo para reforzar estándares y ver si cambia.'],['C','Tener una conversación individual con ejemplos concretos, preguntando cómo lo vivió y acordando acciones.',true],['D','Reconocer su impacto e introducir mejoras poco a poco en los seguimientos.']]},
    actitud:{prot:'Andrea',esc:'Andrea transmite calma bajo presión y suele recuperarse rápido. En las últimas semanas participa menos, evita pedir apoyo y responde que “todo bien”, aunque su actitud cambió.',opts:[['A','Respetar su espacio y estar disponible para cuando decida hablar.'],['B','Reconocer su capacidad de afrontar presión y recordarle que el equipo la apoya.'],['C','Generar seguimientos individuales las próximas semanas para entender cómo está y detectar temprano si necesita apoyo.',true],['D','Reducir temporalmente sus responsabilidades hasta que se sienta como antes.']]},
    energia:{prot:'Lucía',esc:'Lucía conecta con facilidad y es un referente natural. En las reuniones muchos esperan su opinión antes de hablar y, con el tiempo, algunos participan cada vez menos.',opts:[['A','Modificar la dinámica de las reuniones para que todos participen por igual.'],['B','Pedirle que intervenga menos para dar espacio al resto.'],['C','Reconocer su influencia y pedirle que anime a otros a compartir sus ideas.'],['D','Conversar sobre cómo usar su influencia para desarrollar a otros, volviendo su liderazgo una herramienta para el equipo.',true]]},
    cumple:{prot:'Daniela',esc:'Daniela es muy confiable y mantiene los estándares. Hace un recorrido de venta muy consistente, pero le cuesta adaptar la conversación a cada cliente y sigue el mismo guion aunque haya opción de personalizar.',opts:[['A','Reconocer su consistencia y trabajar cómo incorporar gradualmente una venta más personalizada.'],['B','Explicarle que hay que adaptar cada conversación y pedirle que lo aplique en todas sus ventas.'],['C','Revisar juntos algunas interacciones para hallar oportunidades, acompañarla en la práctica y hacer seguimiento.',true],['D','Mantener su forma de vender mientras dé buenos resultados.']]},
    aprende:{prot:'Tomás',esc:'Tomás disfruta aprender y destaca en los lanzamientos. Pero en tareas rutinarias (inventario, orden de stock) pierde el interés y necesita recordatorios.',opts:[['A','Conversar sobre mantener el mismo compromiso en todas las tareas y fijar expectativas claras.'],['B','Asignarle nuevos desafíos de producto, evitando lo rutinario siempre que se pueda.'],['C','Aprovechar su interés por aprender e involucrarlo en retos, acordando objetivos para sostener la constancia y haciendo seguimiento.',true],['D','Rotarlo más entre responsabilidades para que no se aburra.']]},
    experiencias:{prot:'Camila',esc:'Camila recibe excelentes comentarios y dedica el tiempo necesario a cada caso. Para que una clienta no se fuera disconforme, aceptó una excepción al proceso sin consultar. La clienta quedó feliz, pero generó dudas en el equipo.',opts:[['A','Explicarle que, ante cualquier excepción, siempre debe consultar antes.'],['B','Reconocer su compromiso con el cliente y trabajar cómo equilibrarlo con los estándares y el negocio.',true],['C','Recordar al equipo qué excepciones permite la compañía.'],['D','Pedirle que priorice los procesos por encima de la satisfacción del cliente.']]},
    rol:{prot:'Florencia',esc:'Florencia resuelve sin esperar instrucciones. En una jornada de mucho movimiento tomó una decisión con un cliente sin consultar. Resolvió el caso, pero generó dudas sobre cuándo se puede decidir de forma autónoma.',opts:[['A','Pedirle que a partir de ahora consulte antes cualquier decisión fuera de lo habitual.'],['B','Reconocer su capacidad y acordar qué decisiones puede tomar sola y cuáles requieren alineación, compartiéndolo con el equipo.',true],['C','Recordar al equipo los procedimientos ante situaciones excepcionales.'],['D','Explicarle que estas decisiones quedan solo en manos del Store Manager.']]},
    detalle:{prot:'Martina',esc:'Martina cuida cada detalle como nadie. En una jornada de alta afluencia se detiene tanto en dejar cada vitrina y empaque perfectos que varios clientes esperan, y una compañera comenta que “con Martina nada está nunca suficientemente bien”.',opts:[['A','Pedirle que en alta afluencia priorice la rapidez y deje los detalles para momentos de menor movimiento.'],['B','Reconocer su cuidado por la excelencia y trabajar cómo distinguir qué nivel de detalle aporta valor en cada momento, sin frenar ni desgastar.',true],['C','Recordar al equipo equilibrar la presentación con la agilidad.'],['D','Mantener su forma de trabajar, ya que eleva el estándar.']]}
  }
};
