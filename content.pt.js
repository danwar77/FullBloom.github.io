/* Conteúdo PT-BR. Mantém a estrutura e as regras da versão espanhola. */
(function () {
  const pt = JSON.parse(JSON.stringify(window.CONTENT_ES));
  const phrases = {
    'Español (LATAM)': 'Español (LATAM)', 'Português (Brasil)': 'Português (Brasil)',
    '¿Ya está el equipo al completo? ¿Ya tenéis todo listo en la mesa? Si ya estáis preparados, elegid el idioma y empecemos.': 'A equipe já está completa? Já está tudo pronto sobre a mesa? Se estiverem preparados, escolham o idioma e vamos começar.',
    'Sois un solo equipo': 'Vocês são uma só equipe', 'Empezar': 'Começar', 'Nombre del equipo': 'Nome da equipe',
    'Continuar a la entrevista': 'Continuar para a entrevista', 'Empezar la entrevista': 'Começar a entrevista',
    'Confirmar': 'Confirmar', 'Siguiente': 'Próximo', 'Fortalezas': 'Pontos fortes', 'Áreas a desarrollar': 'Áreas para desenvolver',
    'Planificar su onboarding': 'Planejar o onboarding', 'Confirmar prioridades': 'Confirmar prioridades',
    'El espejo': 'O espelho', 'Se os pasaron:': 'Vocês deixaram passar:', 'Antes del día a día': 'Antes do dia a dia',
    'El flanco descubierto': 'O ponto cego descoberto', 'Ir a los retos del día a día': 'Ir para os desafios do dia a dia',
    'Registrar decisión': 'Registrar decisão', 'Por qué es la mejor:': 'Por que é a melhor:', 'Por qué no es la mejor:': 'Por que não é a melhor:', 'Nueva partida': 'Novo jogo',
    'Proceso de Selección': 'Processo de Seleção', 'Retos del día a día': 'Desafios do dia a dia', 'Partida guardada': 'Jogo salvo',
    'Hay una partida sin terminar en este dispositivo.': 'Há um jogo inacabado neste dispositivo.', 'Reanudar': 'Retomar', 'Empezar de nuevo': 'Começar de novo',
    'Sin conexión: las decisiones siguen guardadas en este dispositivo.': 'Sem conexão: as decisões continuam salvas neste dispositivo.',
    'El tiempo terminó. Registrad la decisión del equipo para continuar.': 'O tempo terminou. Registrem a decisão da equipe para continuar.',
    'Acciones intencionales elegidas': 'Ações intencionais escolhidas', 'Acciones intencionales que se os pasaron': 'Ações intencionais que vocês deixaram passar',
    'Siguiente reto': 'Próximo desafio', 'Ver cierre': 'Ver encerramento', 'Registro pendiente de sincronización.': 'Registro pendente de sincronização.',
    'Registro sincronizado.': 'Registro sincronizado.', 'Definid el perfil': 'Definam o perfil', 'Preparad la entrevista': 'Preparem a entrevista',
    'Elegid a quién contratáis': 'Escolham quem contratar', 'Priorizad el onboarding': 'Priorizem o onboarding', 'Requisitos': 'Requisitos', 'Reto': 'Desafio',
    'La primera decisión importante es: ¿cómo se llama vuestro equipo?': 'A primeira decisão importante é: qual é o nome da equipe de vocês?',
    'Por qué no es la mejor pregunta por sí sola:': 'Por que não é a melhor pergunta sozinha:',
    'Así se detecta. Pide un caso concreto —conducta real, no una opinión.': 'É assim que se identifica. Peça um caso concreto — comportamento real, não uma opinião.',
    'Así se detecta. Las conductuales concretas revelan conducta real.': 'É assim que se identifica. Perguntas comportamentais concretas revelam comportamentos reais.'
  };
  const words = {
    'orientación':'orientação','Orientación':'Orientação','colecciones':'coleções','Colecciones':'Coleções','negocio':'negócio','Negocio':'Negócio','estándares':'padrões','estándar':'padrão','procesos':'processos','proceso':'processo','joyería':'joalheria','retail':'varejo','idiomas':'idiomas',
    'Cuéntame':'Conte-me','Dame':'Dê-me','Háblame':'Fale-me','Descríbeme':'Descreva','Cuéntame':'Conte-me','¿Qué':'O que','cómo':'como','Cómo':'Como','¿Te':'Você','¿Tienes':'Você tem','¿Sueles':'Você costuma','¿Conoces':'Você conhece','¿Cuál':'Qual','¿Estarías':'Você estaria',
    'Atención':'Atenção','atención':'atenção','Excelencia':'Excelência','Operativa':'Operacional','Personas':'Pessoas','Actitud':'Atitude','Comportamiento':'Comportamento','Requisitos y Experiencia':'Requisitos e Experiência','Experiencia':'Experiência','experiencia':'experiência','Conocimiento':'Conhecimento','conocimiento':'conhecimento','Cierre':'Fechamento','Venta cruzada':'Venda cruzada','Organización':'Organização','Cumplimiento':'Cumprimento','Manejo':'Manuseio','Comunicación':'Comunicação','Trabajo':'Trabalho','Adaptabilidad':'Adaptabilidade','Disponibilidad':'Disponibilidade','Orientación':'Orientação','Responsabilidad':'Responsabilidade','Integridad':'Integridade','Aprende':'Aprende','Crea':'Cria','Energía':'Energia','Cuida':'Cuida','Promueve':'Promove','Desarrollo':'Desenvolvimento','cliente':'cliente','clientes':'clientes','equipo':'equipe','compañero':'colega','compañera':'colega','compañeros':'colegas','tienda':'loja','tiendas':'lojas','venta':'venda','ventas':'vendas','producto':'produto','productos':'produtos','trabajo':'trabalho','trabajar':'trabalhar','persona':'pessoa','personas':'pessoas','tiempo':'tempo','día':'dia','días':'dias','semana':'semana','semanas':'semanas','mes':'mês','meses':'meses','nuevo':'novo','nueva':'nova','nuevos':'novos','mejorar':'melhorar','mejora':'melhoria','aprendizaje':'aprendizado','desarrollo':'desenvolvimento','pregunta':'pergunta','preguntas':'perguntas','respuesta':'resposta','respuestas':'respostas','elegir':'escolher','elige':'escolha','marcad':'marquem','concreto':'concreto','concreta':'concreta','buena':'boa','buen':'bom','mejor':'melhor','importante':'importante','importancia':'importância','necesario':'necessário','necesaria':'necessária','hacer':'fazer','harías':'faria','hiciste':'fez','gestionar':'administrar','gestión':'gestão','organizar':'organizar','organización':'organização','priorizar':'priorizar','prioridades':'prioridades','comunicación':'comunicação','comunicar':'comunicar','conflicto':'conflito','cambio':'mudança','cambios':'mudanças','flexible':'flexível','responsable':'responsável','responsabilidad':'responsabilidade','fortaleza':'ponto forte','fortalezas':'pontos fortes','reto':'desafio','retos':'desafios','decisión':'decisão','decisiones':'decisões','apoyo':'apoio','ayudar':'ajudar','ayuda':'ajuda','cumplir':'cumprir','objetivo':'objetivo','objetivos':'objetivos','resultado':'resultado','resultados':'resultados','todos':'todos','todas':'todas','siempre':'sempre','también':'também','pero':'mas','cuando':'quando','aunque':'embora','con':'com','sin':'sem','sobre':'sobre','entre':'entre','desde':'desde','hasta':'até','y':'e','en':'em','del':'do','al':'ao','no':'não','sí':'sim','ya':'já','muy':'muito','más':'mais','menos':'menos','bien':'bem'
  };
  function translate(value) {
    if (typeof value !== 'string') return value;
    let out = value;
    Object.entries(phrases).forEach(([from, to]) => { out = out.split(from).join(to); });
    Object.entries(words).forEach(([from, to]) => { out = out.replace(new RegExp('(^|[^A-Za-zÁÉÍÓÚáéíóúÑñ])' + from.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&') + '(?=[^A-Za-zÁÉÍÓÚáéíóúÑñ]|$)', 'g'), '$1' + to); });
    return out;
  }
  function walk(value) {
    if (Array.isArray(value)) return value.map(walk);
    if (value && typeof value === 'object') { Object.keys(value).forEach((key) => { value[key] = walk(value[key]); }); return value; }
    return translate(value);
  }
  window.CONTENT_PT = walk(pt);
  // Textos principales de la interfaz (se muestran en todas las pantallas).
  window.CONTENT_PT.ui = Object.assign(window.CONTENT_PT.ui, {
    subtitle: 'Fazer o talento florescer por meio da liderança',
    landing: 'A equipe já está completa? Já está tudo pronto sobre a mesa? Se estiverem preparados, escolham o idioma e vamos começar.',
    welcomeTitle: 'Vocês são uma só equipe',
    welcome: 'Vocês devem chegar a um consenso sobre todas as decisões ao longo deste jogo. Cada decisão conta e vocês têm um tempo limitado para conversar e decidir como equipe. O jogo dura no máximo {min} minutos. Não vence quem termina primeiro.',
    teamQ: 'A primeira decisão importante é: qual é o nome da equipe de vocês?', aliasPh: 'Nome da equipe', start: 'Começar',
    req: 'Vocês são Store Managers na Pandora: há uma vaga na loja e vocês precisam contratar um/a Sales Assistant para a equipe. Como em todo processo seletivo, começamos definindo o perfil. Decidam quais competências-chave procuram e escolham apenas as relevantes para a função.',
    reqCount: '{n} selecionadas · mínimo {min}', reqNext: 'Continuar para a entrevista',
    priorities: 'Chegou a hora de preparar a entrevista. Concentrem-se nas 3 competências ou requisitos mais importantes. Escolham tocando na ordem da maior para a menor importância.',
    prioNext: 'Começar a entrevista',
    puzzleSingle: 'Qual destas perguntas realmente identifica esta competência? Descartem as demais e fiquem com uma.',
    puzzleMulti: 'Há mais de uma pergunta que identifica esta competência. Marquem todas as que identificam e descartem as demais.',
    detectaOk: 'É assim que se identifica. Peça um caso concreto — comportamento real, não uma opinião.',
    detectaOkMulti: 'É assim que se identifica. Perguntas comportamentais concretas revelam comportamentos reais.',
    porQueNoMejor: 'Por que não é a melhor pergunta sozinha:', faltaUna: 'Quase. Há mais de uma pergunta correta: falta pelo menos uma.',
    confirm: 'Confirmar', next: 'Próximo', candidates: 'Vocês entrevistaram vários candidatos e pré-selecionaram 4. Todos têm potencial e pontos fortes diferentes, mas só podem escolher uma pessoa. Decidam em equipe quem será contratado.', hire: 'Contratar esta pessoa',
    strengths: 'Pontos fortes', devAreas: 'Áreas para desenvolver', obPlan: 'Planejar o onboarding', rankNext: 'Confirmar prioridades', enfoquePrompt: 'Como vocês planejam isso para {nombre}? Marquem as ações que realizariam.', espejoTitle: 'O espelho', espejoTomadas: 'Das ações de vocês, estas realmente constroem:', espejoFaltaron: 'Vocês deixaram passar:', revealTitle: 'Antes do dia a dia', flanco: 'O ponto cego descoberto', toRetos: 'Ir para os desafios do dia a dia', retoIntro: 'O tempo passou. Um ponto forte de {nombre}, levado ao dia a dia, torna-se um desafio a administrar.', register: 'Registrar decisão', porQueMejor: 'Por que é a melhor:', porQueNoMejorReto: 'Por que não é a melhor:', suma: 'Soma:', restart: 'Novo jogo'
  });
  window.CONTENT_PT.app = Object.assign(window.CONTENT_PT.app, {
    sections: { sel: 'Processo de Seleção', onb: 'Onboarding', ret: 'Desafios do dia a dia' }, resumeTitle: 'Jogo salvo', resumeText: 'Há um jogo inacabado neste dispositivo.', resume: 'Retomar', newGame: 'Começar de novo', offline: 'Sem conexão: as decisões continuam salvas neste dispositivo.', timeout: 'O tempo terminou. Registrem a decisão da equipe para continuar.', selectedIntentional: 'Ações intencionais escolhidas', missedIntentional: 'Ações intencionais que vocês deixaram passar', challengeProgress: 'Desafio {n} de {total}', challengeNext: 'Próximo desafio', finish: 'Ver encerramento', syncPending: 'Registro pendente de sincronização.', syncDone: 'Registro sincronizado.', reqTitle: 'Definam o perfil', prioritiesTitle: 'Preparem a entrevista', candidatesTitle: 'Escolham quem contratar', rankingTitle: 'Priorizem o onboarding', candidatePhotoAlt: 'Retrato ilustrado de {nombre}', challengeLabel: 'Desafio'
  });
})();
