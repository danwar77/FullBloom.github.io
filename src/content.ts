import type { Axis, Challenge, Characteristic, Lang, LocalizedText, Archetype } from './types';

export const t = (value: LocalizedText, lang: Lang) => value[lang] || value.es;

export const timings = {
  actSeconds: 15 * 60,
  revealSeconds: 5 * 60,
  phaseSeconds: 3 * 60,
  deliberationSeconds: 5,
  hintAfterSeconds: 45,
};

export const ui = {
  noScore: {
    es: 'No hay puntos. No hay ganador. Solo decisiones bajo tiempo.',
    pt: 'Não há pontos. Não há vencedores. Apenas decisões sob pressão do tempo.',
  },
  offline: {
    es: 'Modo local activo. La partida sigue y se sincronizará al volver la conexión.',
    pt: 'Modo local ativo. A partida continua e será sincronizada quando a conexão voltar.',
  },
};

export const characteristics: Characteristic[] = [
  {
    id: 'c1',
    category: 'empuje',
    weight: 3,
    name: { es: 'Ambición', pt: 'Ambição' },
    faceA: { es: 'Se orienta a resultados y eleva el estándar.', pt: 'Busca resultados e eleva o padrão.' },
    faceB: { es: 'Puede atropellar ritmos y voces del equipo.', pt: 'Pode atropelar ritmos e vozes da equipe.' },
    shadowId: 'impaciencia',
  },
  {
    id: 'c2',
    category: 'relacion',
    weight: 2,
    name: { es: 'Cercanía', pt: 'Proximidade' },
    faceA: { es: 'Construye confianza con naturalidad.', pt: 'Constrói confiança com naturalidade.' },
    faceB: { es: 'Evita conversaciones incómodas para no tensar.', pt: 'Evita conversas difíceis para não criar tensão.' },
    shadowId: 'evitacion',
  },
  {
    id: 'c3',
    category: 'ejecucion',
    weight: 2,
    name: { es: 'Orden', pt: 'Ordem' },
    faceA: { es: 'Da estructura y reduce ambigüedad.', pt: 'Dá estrutura e reduz ambiguidade.' },
    faceB: { es: 'Puede rigidizarse ante lo inesperado.', pt: 'Pode ficar rígida diante do inesperado.' },
    shadowId: 'rigidez',
  },
  {
    id: 'c4',
    category: 'relacion',
    weight: 3,
    name: { es: 'Empatía', pt: 'Empatia' },
    faceA: { es: 'Lee emociones y cuida pertenencia.', pt: 'Percebe emoções e cuida do pertencimento.' },
    faceB: { es: 'Puede confundir cuidado con falta de límites.', pt: 'Pode confundir cuidado com falta de limites.' },
    shadowId: 'sobreproteccion',
  },
  {
    id: 'c5',
    category: 'empuje',
    weight: 2,
    name: { es: 'Energía', pt: 'Energia' },
    faceA: { es: 'Contagia iniciativa y ritmo.', pt: 'Contagia iniciativa e ritmo.' },
    faceB: { es: 'Puede pasar por encima de señales débiles.', pt: 'Pode ignorar sinais sutis.' },
    shadowId: 'aceleracion',
  },
  {
    id: 'c6',
    category: 'ejecucion',
    weight: 3,
    name: { es: 'Precisión', pt: 'Precisão' },
    faceA: { es: 'Cuida el detalle y protege la experiencia.', pt: 'Cuida do detalhe e protege a experiência.' },
    faceB: { es: 'Puede volverse crítica antes de enseñar.', pt: 'Pode se tornar crítica antes de ensinar.' },
    shadowId: 'perfeccionismo',
  },
  {
    id: 'c7',
    category: 'relacion',
    weight: 1,
    name: { es: 'Alegría', pt: 'Alegria' },
    faceA: { es: 'Hace más liviano el aprendizaje.', pt: 'Torna o aprendizado mais leve.' },
    faceB: { es: 'Puede tapar tensiones reales con optimismo.', pt: 'Pode cobrir tensões reais com otimismo.' },
    shadowId: 'minimizacion',
  },
  {
    id: 'c8',
    category: 'ejecucion',
    weight: 2,
    name: { es: 'Autonomía', pt: 'Autonomia' },
    faceA: { es: 'Aprende rápido y toma iniciativa.', pt: 'Aprende rápido e toma iniciativa.' },
    faceB: { es: 'Puede aislarse antes de pedir ayuda.', pt: 'Pode se isolar antes de pedir ajuda.' },
    shadowId: 'aislamiento',
  },
];

export const archetypes: Archetype[] = [
  {
    id: 'a-empuje',
    match: { dominantFamily: 'empuje', fallback: true },
    name: { es: 'Valentina', pt: 'Valentina' },
    birthday: '12 mar',
    blurb: { es: 'Brilla cuando hay una meta clara, pero necesita aprender a sumar al equipo en el camino.', pt: 'Brilha quando há uma meta clara, mas precisa aprender a somar a equipe no caminho.' },
  },
  {
    id: 'a-relacion',
    match: { dominantFamily: 'relacion', fallback: true },
    name: { es: 'Camila', pt: 'Camila' },
    birthday: '4 ago',
    blurb: { es: 'Conecta rápido con las personas, aunque a veces posterga conversaciones necesarias.', pt: 'Conecta rápido com as pessoas, embora às vezes adie conversas necessárias.' },
  },
  {
    id: 'a-ejecucion',
    match: { dominantFamily: 'ejecucion', fallback: true },
    name: { es: 'Renata', pt: 'Renata' },
    birthday: '21 nov',
    blurb: { es: 'Ordena el caos y cuida la calidad, pero puede convertir el estándar en presión.', pt: 'Organiza o caos e cuida da qualidade, mas pode transformar o padrão em pressão.' },
  },
];

export const axes: Axis[] = [
  {
    id: 'estandar',
    label: { es: 'Estándar y expectativas', pt: 'Padrão e expectativas' },
    options: [
      { id: 'estandar-claro', text: { es: 'Definir el estándar con ejemplos de piso.', pt: 'Definir o padrão com exemplos de loja.' }, cost: 3, isTrap: false },
      { id: 'estandar-suave', text: { es: 'No marcar límites para no agobiar.', pt: 'Não impor limites para não sobrecarregar.' }, cost: 1, isTrap: true, trapExplain: { es: 'Parece amable, pero la ambigüedad crea dependencia.', pt: 'Parece gentil, mas a ambiguidade cria dependência.' } },
      { id: 'estandar-tecnico', text: { es: 'Enviar solo materiales técnicos.', pt: 'Enviar apenas materiais técnicos.' }, cost: 2, isTrap: false },
    ],
  },
  {
    id: 'conexion',
    label: { es: 'Conexión y pertenencia', pt: 'Conexão e pertencimento' },
    options: [
      { id: 'conexion-ritual', text: { es: 'Crear ritual de bienvenida con el equipo.', pt: 'Criar ritual de boas-vindas com a equipe.' }, cost: 3, isTrap: false },
      { id: 'conexion-exceso', text: { es: 'Protegerla de toda presión del equipo.', pt: 'Protegê-la de toda pressão da equipe.' }, cost: 2, isTrap: true, trapExplain: { es: 'El cuidado sin exposición real retrasa pertenencia.', pt: 'O cuidado sem exposição real atrasa pertencimento.' } },
      { id: 'conexion-cafe', text: { es: 'Una conversación breve al cierre del primer turno.', pt: 'Uma conversa breve ao fim do primeiro turno.' }, cost: 1, isTrap: false },
    ],
  },
  {
    id: 'conversaciones',
    label: { es: 'Conversaciones y seguimiento', pt: 'Conversas e acompanhamento' },
    options: [
      { id: 'conversaciones-semanal', text: { es: 'Seguimiento semanal con pregunta y compromiso.', pt: 'Acompanhamento semanal com pergunta e compromisso.' }, cost: 3, isTrap: false },
      { id: 'conversaciones-espontaneo', text: { es: 'Hablar solo cuando surja un problema.', pt: 'Falar apenas quando surgir um problema.' }, cost: 1, isTrap: true, trapExplain: { es: 'Lo espontáneo suele llegar tarde cuando la persona está aprendiendo.', pt: 'O espontâneo costuma chegar tarde quando a pessoa está aprendendo.' } },
      { id: 'conversaciones-quincenal', text: { es: 'Seguimiento quincenal con observación de piso.', pt: 'Acompanhamento quinzenal com observação de loja.' }, cost: 2, isTrap: false },
    ],
  },
  {
    id: 'equipo',
    label: { es: 'Equipo y equidad', pt: 'Equipe e equidade' },
    options: [
      { id: 'equipo-roles', text: { es: 'Asignar parejas de aprendizaje rotativas.', pt: 'Definir duplas de aprendizagem rotativas.' }, cost: 3, isTrap: false },
      { id: 'equipo-estrella', text: { es: 'Darle visibilidad especial para motivarla.', pt: 'Dar visibilidade especial para motivá-la.' }, cost: 2, isTrap: true, trapExplain: { es: 'La visibilidad sin criterio puede romper la percepción de equidad.', pt: 'Visibilidade sem critério pode quebrar a percepção de equidade.' } },
      { id: 'equipo-sombra', text: { es: 'Pedir al equipo que observe y dé feedback.', pt: 'Pedir à equipe que observe e dê feedback.' }, cost: 1, isTrap: false },
    ],
  },
];

export const challenges: Challenge[] = [
  {
    id: 'reto-impaciencia-estandar',
    targetShadow: 'impaciencia',
    targetAxis: 'estandar',
    title: { es: 'El brillo que corre demasiado', pt: 'O brilho que corre rápido demais' },
    scene: { es: 'Tu asociada vende mucho, pero interrumpe a quienes aprenden y el equipo empieza a callarse.', pt: 'Sua associada vende muito, mas interrompe quem está aprendendo e a equipe começa a se calar.' },
    excuse: { es: '“Yo traigo los números. No entiendo por qué se molestan.”', pt: '“Eu trago os números. Não entendo por que se incomodam.”' },
    phases: {
      facts: [
        { id: 'f1', text: { es: 'Cerró el 30% de las ventas del mes.', pt: 'Fechou 30% das vendas do mês.' }, isFact: true },
        { id: 'f2', text: { es: 'La novata dejó de proponer después de ser interrumpida.', pt: 'A novata deixou de propor depois de ser interrompida.' }, isFact: true },
        { id: 'f3', text: { es: 'Se cree superior al equipo.', pt: 'Ela se acha superior à equipe.' }, isFact: false },
        { id: 'f4', text: { es: 'Dos personas pidieron no compartir turno con ella.', pt: 'Duas pessoas pediram para não dividir turno com ela.' }, isFact: true },
      ],
      priority: { es: 'Prioridad: proteger el estándar sin perder el vínculo con el equipo.', pt: 'Prioridade: proteger o padrão sem perder o vínculo com a equipe.' },
      settings: [
        { id: 's1', text: { es: 'En privado, inicio de turno, 15 minutos.', pt: 'Em privado, início do turno, 15 minutos.' }, correct: true },
        { id: 's2', text: { es: 'En piso, delante del equipo, para que todos aprendan.', pt: 'Na loja, diante da equipe, para que todos aprendam.' }, correct: false },
        { id: 's3', text: { es: 'Por chat al cierre del día.', pt: 'Por chat ao fim do dia.' }, correct: false },
      ],
      fragments: [
        { id: 'e', text: { es: 'Ayer, cuando Ana propuso una alternativa...', pt: 'Ontem, quando Ana propôs uma alternativa...' }, role: 'E' },
        { id: 'i', text: { es: 'El impacto fue que dejó de participar.', pt: 'O impacto foi que ela deixou de participar.' }, role: 'I' },
        { id: 'c', text: { es: 'Te pido dejar terminar antes de responder.', pt: 'Peço que deixe a pessoa terminar antes de responder.' }, role: 'C' },
        { id: 'trap', text: { es: 'Eres arrogante y tienes que cambiar.', pt: 'Você é arrogante e precisa mudar.' }, role: 'TRAP' },
      ],
      responses: [
        { id: 'pull1', text: { es: '¿Qué necesitas para que el equipo te sume?', pt: 'Do que você precisa para que a equipe some com você?' }, mode: 'pull' },
        { id: 'pull2', text: { es: '¿Qué viste tú que yo no estoy viendo?', pt: 'O que você viu que eu talvez não esteja vendo?' }, mode: 'pull' },
        { id: 'push1', text: { es: 'Ya te lo dije muchas veces.', pt: 'Eu já disse isso muitas vezes.' }, mode: 'push' },
      ],
      requests: [
        { id: 'reconocimiento', text: { es: 'Reconocimiento', pt: 'Reconhecimento' } },
        { id: 'claridad', text: { es: 'Claridad de estándar', pt: 'Clareza de padrão' } },
        { id: 'crecimiento', text: { es: 'Crecimiento', pt: 'Crescimento' } },
      ],
      commitments: [
        { id: 'real', text: { es: 'Ella da espacio; tú das visibilidad y coaching.', pt: 'Ela dá espaço; você dá visibilidade e coaching.' }, real: true },
        { id: 'vago', text: { es: 'Que ponga de su parte.', pt: 'Que ela faça a parte dela.' }, real: false },
      ],
      followupPrompt: { es: '¿Cómo y cuándo verificarás el cambio?', pt: 'Como e quando você verificará a mudança?' },
    },
  },
];
