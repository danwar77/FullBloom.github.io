(() => {
  const option = (id, text, isTrap = false, best = false) => ({ id, text, isTrap, best });
  const radarCase = (id, escena, pensando, choices, trampa, mensaje) => ({
    id, escena, pensando, options: choices, trampa, mensaje,
  });
  const challenge = (id, shadowId, title, escena, options) => ({ id, shadowId, title, escena, options: options.map((text, index) => ({ id: 'ABCD'[index], text })) });

  window.CONTENT_ES = {
    ui: {
      language: 'Elige el idioma de esta sesión', spanish: 'Español (LATAM)', portuguese: 'Português (Brasil)',
      act: 'Acto', timer: 'Tiempo restante', choose: 'Elegid exactamente', selected: 'seleccionadas',
      confirm: 'Confirmar selección', continue: 'Continuar', reveal: 'Revelación', radar: 'Radar del Onboarding',
      thinking: 'Estáis pensando:', register: 'Registrar decisión', close: 'Cierre', export: 'Exportar respaldo',
      sync: 'Sincronizar ahora', resumed: 'Partida reanudada', restart: 'Empezar de nuevo', resume: 'Reanudar',
      incomplete: 'La selección se registrará tal como está al terminar el tiempo.',
      offline: 'Sin conexión: las decisiones siguen guardadas en este dispositivo.',
      syncPending: 'Respaldo pendiente de sincronización.', syncDone: 'Registro enviado a la hoja.',
      radarSheet: 'Completad la hoja Radar: trampa, aprendizaje, acción y compromiso.',
      built: 'Lo construisteis vosotros', noAnswer: 'Sin respuesta', noSelection: 'Sin selección',
    },
    welcome: {
      eyebrow: 'Store Manager Conference 2026',
      title: 'Una persona toma forma en vuestras decisiones.',
      premise: 'Con cartas físicas y una sola decisión por equipo, construiréis el perfil de una nueva asociada y exploraréis cómo acompañarla.',
      rules: 'No hay puntos ni ganador; la única presión es el tiempo.',
      aliasLabel: 'Alias del equipo', aliasHelp: 'Usad un nombre breve para identificar vuestra mesa.', start: 'Empezar',
    },
    characteristics: [
      { id: 'c1', familia: 'empuje', peso: 1, shadowId: 'crecer', name: 'Ganas de crecer', caraA: 'Busca aprender, asumir nuevos retos y ampliar su impacto.', caraB: 'Puede mirar siempre al siguiente paso y perder presencia en el actual.' },
      { id: 'c2', familia: 'relacion', peso: 1, shadowId: 'conexion', name: 'Crea conexiones genuinas', caraA: 'Genera confianza y hace que las personas se sientan vistas.', caraB: 'Puede evitar conversaciones difíciles para no romper la armonía.' },
      { id: 'c3', familia: 'empuje', peso: 1, shadowId: 'actitud', name: 'Actitud positiva ante los retos', caraA: 'Sostiene el ánimo y encuentra posibilidades en momentos exigentes.', caraB: 'Puede minimizar tensiones reales con optimismo.' },
      { id: 'c4', familia: 'relacion', peso: 1, shadowId: 'energia', name: 'Energía que inspira a clientes y equipo', caraA: 'Contagia iniciativa y crea una experiencia cálida.', caraB: 'Puede imponer ritmo sin percibir señales más silenciosas.' },
      { id: 'c5', familia: 'ejecucion', peso: 1, shadowId: 'cumple', name: 'Cumple lo que promete', caraA: 'Da seguimiento, orden y confianza con cada compromiso.', caraB: 'Puede priorizar el resultado rápido sobre explicar el camino.' },
      { id: 'c6', familia: 'empuje', peso: 1, shadowId: 'aprende', name: 'Aprende y busca mejorar constantemente', caraA: 'Pide feedback, experimenta y convierte errores en aprendizaje.', caraB: 'Puede exigirse demasiado antes de consolidar lo aprendido.' },
      { id: 'c7', familia: 'relacion', peso: 1, shadowId: 'experiencias', name: 'Crea experiencias memorables', caraA: 'Cuida los detalles que convierten una visita en una conexión.', caraB: 'Puede prometer más de lo sostenible para sorprender.' },
      { id: 'c8', familia: 'ejecucion', peso: 1, shadowId: 'rol', name: 'Se adueña de su rol', caraA: 'Toma iniciativa y resuelve con autonomía responsable.', caraB: 'Puede aislarse antes de pedir ayuda o coordinar.' },
      { id: 'c9', familia: 'ejecucion', peso: 1, shadowId: 'detalle', name: 'Cuida cada detalle', caraA: 'Protege el estándar y la calidad de la experiencia.', caraB: 'Puede corregir antes de enseñar y volver rígido el estándar.' },
    ],
    archetypes: [
      { id: 'a-valentina', match: { dominantFamily: 'empuje', keyCharacteristic: 'c1' }, name: 'Valentina', birthday: '12 mar', blurb: 'Tiene hambre de crecer y una energía que mueve al equipo. Su siguiente paso es aprender a crecer sin dejar voces atrás.' },
      { id: 'a-sofia', match: { dominantFamily: 'relacion', keyCharacteristic: 'c2' }, name: 'Sofía', birthday: '7 jun', blurb: 'Conecta con facilidad y crea confianza. Ahora necesita usar ese vínculo también cuando la conversación se vuelve incómoda.' },
      { id: 'a-daniela', match: { dominantFamily: 'ejecucion', keyCharacteristic: 'c5' }, name: 'Daniela', birthday: '18 sep', blurb: 'Es fiable y convierte las promesas en hechos. Puede ampliar su impacto haciendo visible el aprendizaje detrás de cada resultado.' },
      { id: 'a-empuje', match: { dominantFamily: 'empuje' }, name: 'Valentina', birthday: '12 mar', blurb: 'Avanza con iniciativa y aprende rápido. El desafío es sostener el ritmo sin perder la escucha.' },
      { id: 'a-relacion', match: { dominantFamily: 'relacion' }, name: 'Camila', birthday: '4 ago', blurb: 'Hace que las personas se sientan parte. El desafío es convertir ese cuidado en conversaciones claras.' },
      { id: 'a-ejecucion', match: { dominantFamily: 'ejecucion' }, name: 'Florencia', birthday: '21 nov', blurb: 'Ordena lo importante y protege la calidad. El desafío es mantener el estándar como una invitación a aprender.' },
    ],
    radar: { axes: [
      { id: 'estandar', label: 'Estándar y expectativas', cases: [
        radarCase('estandar_1', 'En su tercer turno, la asociada pregunta cómo saber si una recomendación fue realmente buena.', 'Ya le expliqué todo durante la inducción.', [option('A', 'Decirle que observe cómo lo hacen las personas con más experiencia.', true), option('B', 'Acordar dos señales observables y revisarlas al final del turno.'), option('C', 'Pedirle que memorice de nuevo el manual de servicio.', false, true)], 'Pensar que informar es lo mismo que dar claridad.', 'El estándar se vuelve útil cuando se observa, se nombra y se revisa en contexto.'),
        radarCase('estandar_2', 'La asociada atiende con entusiasmo, pero omite un paso clave al cerrar una venta.', 'Prefiero no corregirla para que no pierda seguridad.', [option('A', 'Esperar a que vuelva a ocurrir para no interrumpir el turno.', true), option('B', 'Reconocer lo que hizo bien y practicar el paso pendiente en la siguiente oportunidad.', false, true), option('C', 'Mandarle un mensaje con el protocolo completo al cierre.')], 'Confundir cuidar la confianza con dejar el estándar en silencio.', 'La claridad amable permite aprender sin adivinar.'),
      ] },
      { id: 'conexion', label: 'Conexión y pertenencia', cases: [
        radarCase('conexion_1', 'La nueva asociada conversa bien con clientes, pero almuerza sola y participa poco con el equipo.', 'Con el tiempo se integrará sola.', [option('A', 'Invitarla a una presentación breve y asignar una compañera de referencia.', false, true), option('B', 'No intervenir para no hacerla sentir diferente.', true), option('C', 'Pedirle que lidere una actividad grande desde el primer día.')], 'Esperar que la pertenencia aparezca sin diseñar momentos de conexión.', 'La pertenencia se construye con gestos repetidos, no con una única bienvenida.'),
        radarCase('conexion_2', 'El equipo protege mucho a la asociada nueva y empieza a resolverle cada duda antes de que ella participe.', 'Así se sentirá cuidada.', [option('A', 'Mantenerla solo con la persona más paciente del equipo.', true), option('B', 'Crear momentos de apoyo y también oportunidades graduales para contribuir.', false, true), option('C', 'Pedirle que se adapte al ritmo sin acompañamiento.')], 'Confundir protección con pertenencia.', 'Cuidar también es abrir espacio para que la persona aporte y sea parte.'),
      ] },
      { id: 'conversaciones', label: 'Conversaciones y seguimiento', cases: [
        radarCase('conversaciones_1', 'La asociada recibe feedback informal de varias personas, pero no sabe cuál es su prioridad.', 'Hablaremos si aparece un problema más claro.', [option('A', 'Agendar una conversación breve con una prioridad y un próximo paso.', false, true), option('B', 'Esperar a la evaluación mensual para ordenar los comentarios.', true), option('C', 'Pedir al equipo que le dé más consejos durante el turno.')], 'Dejar el seguimiento para cuando ya hay una dificultad.', 'La frecuencia convierte el feedback en orientación, no en sorpresa.'),
        radarCase('conversaciones_2', 'Después de una semana, la asociada ha mejorado en algunas cosas, pero evita pedir ayuda.', 'Si necesita algo, ella misma lo dirá.', [option('A', 'Preguntar qué le está resultando más fácil y qué necesita ensayar acompañada.', false, true), option('B', 'Dar por cerrado el acompañamiento porque los resultados son aceptables.', true), option('C', 'Enviar una lista de tareas sin abrir conversación.')], 'Leer el silencio como autonomía plena.', 'El seguimiento abre una puerta concreta para que pedir ayuda sea fácil.'),
      ] },
      { id: 'integracion', label: 'Integración y equidad', cases: [
        radarCase('integracion_1', 'La asociada aprende rápido y el equipo propone darle los turnos más visibles desde la primera semana.', 'Se lo ha ganado; así seguirá motivada.', [option('A', 'Dar visibilidad sin explicar al resto por qué.', true), option('B', 'Definir oportunidades de aprendizaje con criterios claros para todo el equipo.', false, true), option('C', 'Evitar reconocer cualquier avance hasta el final del mes.')], 'Confundir reconocimiento con privilegio.', 'La equidad hace visibles los criterios, no invisibles los logros.'),
        radarCase('integracion_2', 'Dos personas del equipo tienen formas distintas de enseñar a la asociada y ella recibe indicaciones contradictorias.', 'Es bueno que escuche estilos diferentes.', [option('A', 'Dejar que cada persona le enseñe a su manera.', true), option('B', 'Acordar un estándar común y distribuir el acompañamiento con roles claros.', false, true), option('C', 'Pedirle que elija a quién seguir.')], 'Llamar diversidad a la falta de acuerdos.', 'La integración se fortalece cuando la experiencia es consistente y compartida.'),
      ] },
    ] },
    challenges: [
      challenge('r1', 'crecer', 'El siguiente paso demasiado pronto', 'Valentina destaca y ya pide un nuevo reto, pero deja a medias los acuerdos de su rol actual.', ['Acompañarla a cerrar los compromisos actuales y acordar un reto gradual con revisión.', 'Dar el nuevo reto de inmediato para aprovechar su energía.', 'Pedirle que espere sin explicar cuándo podrá crecer.', 'Asignarle más tareas para comprobar si realmente puede.']),
      challenge('r2', 'conexion', 'La conversación que nadie nombra', 'Sofía evita una conversación incómoda con una compañera para mantener el buen ambiente.', ['Preparar una conversación privada, concreta y respetuosa sobre lo observado.', 'Hablar del tema con todo el equipo para que ella se dé por aludida.', 'Esperar a que la tensión se resuelva sola.', 'Pedir a otra persona que tenga la conversación por ella.']),
      challenge('r3', 'actitud', 'Optimismo que tapa una señal', 'Andrea anima al equipo tras una jornada difícil, pero no escucha una preocupación repetida.', ['Reconocer la energía y abrir un espacio breve para entender la preocupación.', 'Repetir que mañana será un día mejor y seguir adelante.', 'Cambiar de tema para no bajar el ánimo.', 'Pedir que solo compartan soluciones ya terminadas.']),
      challenge('r4', 'energia', 'Un ritmo que deja a alguien atrás', 'Lucía acelera el piso en hora punta y una asociada nueva empieza a cometer errores.', ['Ajustar el ritmo, asignar apoyo puntual y revisar qué parte del proceso necesita práctica.', 'Mantener el ritmo para que aprenda bajo presión.', 'Retirarla de toda atención al cliente.', 'Corregir cada error delante del equipo.']),
      challenge('r5', 'cumple', 'La promesa sin aprendizaje', 'Daniela resuelve cada tarea, pero el equipo no entiende cómo prioriza cuando surgen imprevistos.', ['Invitarla a compartir su criterio en una revisión breve de equipo.', 'Dejar que siga resolviendo porque sus resultados hablan por sí solos.', 'Asignarle solo tareas individuales para no distraerla.', 'Pedirle que documente todo sin conversar con nadie.']),
      challenge('r6', 'aprende', 'Aprender sin pausa', 'Tomás pide feedback en cada turno y corrige tantas cosas a la vez que se frustra.', ['Elegir un foco de práctica, reconocer avance y revisar después.', 'Dar feedback de todo para que avance más rápido.', 'Decirle que deje de preguntar hasta sentirse seguro.', 'Cambiarle de tarea cada día para que pruebe más cosas.']),
      challenge('r7', 'experiencias', 'Una promesa difícil de sostener', 'Camila promete a una clienta una atención excepcional que depende de recursos que el equipo no tiene.', ['Cuidar la relación, aclarar lo posible y coordinar una alternativa sostenible.', 'Cumplir la promesa aunque desordene al equipo.', 'Decir que no se puede sin ofrecer otra opción.', 'Pedir a otra tienda que resuelva siempre estas situaciones.']),
      challenge('r8', 'rol', 'Autonomía sin red', 'Florencia toma decisiones con iniciativa, pero deja fuera a quienes necesitan coordinar con ella.', ['Reconocer su iniciativa y acordar qué decisiones requieren consulta previa.', 'Pedirle que no tome ninguna decisión sola.', 'Dejar que el equipo se adapte a sus decisiones.', 'Asignarle una persona que decida todo por ella.']),
      challenge('r9', 'detalle', 'El estándar que se vuelve presión', 'Martina detecta cada error y corrige con precisión, pero la nueva asociada deja de preguntar.', ['Convertir una corrección en práctica guiada, priorizando el detalle más importante.', 'Pedirle que sea todavía más estricta para mantener la calidad.', 'Evitar cualquier corrección hasta la siguiente evaluación.', 'Decir a la nueva asociada que debe ser más cuidadosa.']),
    ],
  };
})();
