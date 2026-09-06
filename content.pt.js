/* Conteúdo PT-BR (Brasil). Tradução completa e explícita — não gerada automaticamente.
   Mantém a mesma estrutura, ids, pesos, flags e placeholders ({nombre}, {min}, {n}, {total}, {dim}). */

const UI_PT = {
  langES:"Español (LATAM)", langPT:"Português (Brasil)",
  landing:"A equipe já está completa? Já está tudo pronto sobre a mesa? Se já estão prontos, escolham o idioma e vamos começar.",
  welcomeTitle:"Vocês são uma só equipe",
  welcome:"Vocês precisam chegar a um consenso em todas as decisões que vão tomar ao longo deste jogo. Cada decisão conta, e vocês têm um tempo limitado para debater e decidir como equipe. O jogo dura {min} minutos. Não vence quem termina primeiro.",
  teamQ:"A primeira decisão importante é: qual é o nome da equipe de vocês?", aliasPh:"Nome da equipe", start:"Começar",
  req:"Vocês são Store Managers na Pandora: têm uma vaga na loja e precisam contratar um/a Sales Assistant para a equipe. Como em todo processo seletivo, começamos definindo o perfil. Decidam quais são as competências-chave que buscam. Escolham apenas as que forem relevantes para a função. Não há um número máximo de requisitos ou competências para selecionar. No envelope, que já podem abrir, encontrarão as descrições de cada requisito e competência.",
  reqCount:"{n} selecionadas · mínimo {min}", reqNext:"Continuar para a entrevista",
  priorities:"Só para que o jogo não se estenda demais, escolham as 3 competências mais importantes para a função e, assim, preparem bem as perguntas da entrevista. Toquem nelas em ordem, da maior para a menor importância.",
  prioNext:"Começar a entrevista",
  puzzleSingle:"Qual destas perguntas realmente identifica esta competência? Descartem as que não e fiquem com uma.",
  puzzleMulti:"Há mais de uma pergunta que identifica esta competência. Marquem todas as que identificam e descartem o resto.",
  detectaOk:"Muito bem! Esta é das que funcionam de verdade: pede um exemplo real de algo que a pessoa já viveu, não uma opinião nem uma promessa. Assim vocês veem como ela age de verdade, não como acha que age.",
  detectaOkMulti:"Excelente! Estas duas se complementam: as duas pedem exemplos reais do que a pessoa já fez e, juntas, dão uma imagem muito mais completa do que uma só.",
  porQueNoMejor:"Por que não é a melhor pergunta sozinha:", faltaUna:"Quase! Aqui há mais de uma que serve: falta pelo menos uma para marcar.",
  confirm:"Confirmar", next:"Próximo",
  candidates:"A esta altura vocês já entrevistaram vários candidatos e pré-selecionaram 4. Todos têm potencial e pontos fortes diferentes, mas só podem escolher uma pessoa. Como na vida real, os candidatos ideais —que reúnem todos os requisitos— são difíceis de encontrar. Decidam em equipe quem contratar. Anotem o candidato/a escolhido e as suas características no perfil em branco que incluímos no envelope: será útil mais adiante, se precisarem.",
  hire:"Contratar esta pessoa",
  obDiagTitle:"Vocês contrataram {nombre}", strengths:"Pontos fortes", devAreas:"Áreas para desenvolver",
  obDiagIntro:"Tem muito potencial e bons pontos fortes, mas também oportunidades de desenvolvimento. Com esta lista em mente, é hora de preparar o onboarding.",
  obPlan:"Planejar o onboarding",
  ranking:"Como Store Manager, vocês não vão poder desenvolver todas as áreas de oportunidade ao mesmo tempo, então precisam decidir em qual é prioritário focar nas primeiras semanas, para que esse talento floresça. Ordenem as 4 dimensões do onboarding conforme o que for mais necessário trabalhar com {nombre} (1 = o mais importante e urgente).",
  rankNext:"Confirmar prioridades",
  enfoquePrompt:"Como vocês planejam isso para {nombre}? Marquem as ações que fariam.",
  espejoTitle:"O espelho", espejoTomadas:"Das ações de vocês, estas realmente constroem:", espejoFaltaron:"Vocês deixaram passar:",
  revealTitle:"Antes do dia a dia", flanco:"O ponto cego descoberto",
  flancoTxt:"Vocês deixaram {dim} para o final. É justamente a dimensão que costumamos deixar de lado quando sentimos que não há tempo… e costuma ser a que mais cobra depois. Nenhuma das quatro sobra: mesmo com o dia corrido, esta não dá para largar.",
  toRetos:"Ir para os desafios do dia a dia",
  retoIntro:"O tempo passou. Um ponto forte de {nombre}, levado ao dia a dia, vira um desafio a administrar.",
  register:"Registrar decisão", porQueMejor:"Por que é a melhor:", porQueNoMejorReto:"Por que não é a melhor:", suma:"Soma:",
  restart:"Novo jogo"
};

const REQS_PT = ["Atendimento ao cliente e storytelling","Fechamento e orientação a resultados","Venda cruzada e upselling",
 "Orientação ao cliente / experiência memorável","Comunicação eficaz","Trabalho em equipe",
 "Adaptabilidade e flexibilidade","Manuseio de caixa e processos operacionais","Experiência prévia em varejo ou joalheria"];

const POOL_PT = [
 {id:"atencion",block:"Excelência Comercial",w:4,name:"Atendimento ao cliente e storytelling"},
 {id:"cierre",block:"Excelência Comercial",w:3,name:"Fechamento e orientação a resultados"},
 {id:"cruzada",block:"Excelência Comercial",w:4,name:"Venda cruzada e upselling"},
 {id:"producto",block:"Excelência Comercial",w:3,name:"Conhecimento de produto e coleções"},
 {id:"negocio",block:"Excelência Comercial",w:3,name:"Entendimento do negócio e KPIs"},
 {id:"procesos",block:"Excelência Operacional",w:3,name:"Execução dos processos da loja"},
 {id:"caja",block:"Excelência Operacional",w:3,name:"Manuseio de caixa e transações"},
 {id:"visual",block:"Excelência Operacional",w:2,name:"Visual merchandising"},
 {id:"sistemas",block:"Excelência Operacional",w:2,name:"Uso de sistemas e PDV"},
 {id:"organizacion",block:"Excelência Operacional",w:3,name:"Organização e gestão do tempo"},
 {id:"estandares",block:"Excelência Operacional",w:3,name:"Cumprimento de padrões e políticas"},
 {id:"mercancia",block:"Excelência Operacional",w:3,name:"Cuidado com a mercadoria / prevenção de perdas"},
 {id:"orientacion",block:"Excelência com as Pessoas",w:4,name:"Orientação ao cliente / experiência memorável"},
 {id:"equipo",block:"Excelência com as Pessoas",w:4,name:"Trabalho em equipe"},
 {id:"comunicacion",block:"Excelência com as Pessoas",w:4,name:"Comunicação eficaz"},
 {id:"apoyo",block:"Excelência com as Pessoas",w:3,name:"Apoio a novos integrantes"},
 {id:"marca",block:"Atitude e Comportamento",w:4,name:"Promove a marca e vive os valores"},
 {id:"adaptabilidad",block:"Atitude e Comportamento",w:3,name:"Adaptabilidade e flexibilidade"},
 {id:"desarrollo",block:"Atitude e Comportamento",w:3,name:"Desenvolvimento próprio e aprendizado contínuo"},
 {id:"integridad",block:"Atitude e Comportamento",w:4,name:"Responsabilidade, confiabilidade e integridade"},
 {id:"entorno",block:"Atitude e Comportamento",w:2,name:"Consciência do entorno"},
 {id:"experiencia",block:"Requisitos e Experiência",w:2,name:"Experiência prévia em varejo ou joalheria"},
 {id:"d_moda",block:"Requisitos e Experiência",w:0,dist:true,name:"Conhecimento de moda e tendências"},
 {id:"educativo",block:"Requisitos e Experiência",w:1,name:"Escolaridade (ensino médio)"},
 {id:"d_idiomas",block:"Requisitos e Experiência",w:0,dist:true,name:"Domínio de idiomas estrangeiros (inglês avançado)"},
 {id:"office",block:"Requisitos e Experiência",w:1,name:"Office / Excel básico"},
 {id:"d_ppt",block:"Requisitos e Experiência",w:0,dist:true,name:"Criação de apresentações (PowerPoint)"},
 {id:"disponibilidad",block:"Requisitos e Experiência",w:3,name:"Disponibilidade e mobilidade"},
 {id:"d_foto",block:"Requisitos e Experiência",w:0,dist:true,name:"Fotografia de produto e conteúdo para redes"},
 {id:"d_creatividad",block:"Requisitos e Experiência",w:0,dist:true,name:"Criatividade para vitrines e campanhas próprias"},
 {id:"d_publico",block:"Requisitos e Experiência",w:0,dist:true,name:"Falar em público / oratória"},
 {id:"d_reparacion",block:"Requisitos e Experiência",w:0,dist:true,name:"Reparo e ajuste de joias"},
 {id:"d_gemologia",block:"Requisitos e Experiência",w:0,dist:true,name:"Gemologia e certificação de pedras"}
];

const PUZZLES_PT = {
 atencion:{options:[
  {t:"Pense numa venda recente de que você se lembre com carinho: que história você contou ao cliente sobre a peça e como isso mudou a conversa?",correct:true},
  {t:"Você se considera bom/boa em conectar com o cliente por meio da história do produto?",why:"É uma autoavaliação: a pessoa se dá a nota e quase ninguém dirá que não. Fala de como se percebe, não do que faz."},
  {t:"Como você usaria o storytelling para vender uma peça de preço alto?",why:"É hipotética: mede o que imagina, não o que já fez."},
  {t:"Quais coleções da Pandora você conhece melhor?",why:"É boa pergunta, mas de conhecimento de produto. Identifica outra competência."}]},
 cruzada:{options:[
  {t:"Conte-me como foi a última vez que um cliente queria uma única peça e você conseguiu que levasse algo a mais. Como conseguiu?",correct:true},
  {t:"Você costuma oferecer produtos complementares no atendimento, não é?",why:"A pergunta já traz dentro a resposta que você quer ouvir; a pessoa só concorda."},
  {t:"Se um cliente compra um anel, o que mais você ofereceria?",why:"Mede o critério de produto em abstrato, não se pratica a venda cruzada."},
  {t:"Você costuma bater sua meta de unidades por ticket?",why:"É um número, um resultado; não diz como consegue. O KPI é a consequência, não o comportamento."},
  {t:"Como você costuma fazer sua cerimônia de vendas para bater as metas?",near:"É uma ótima pergunta, mas há outra um pouco mais específica para esta competência."}]},
 orientacion:{multi:true,options:[
  {t:"Fale-me de um cliente que virou habitual e pedia por você. O que você fez para que isso acontecesse?",correct:true},
  {t:"Dê-me um exemplo de uma vez em que você fez além do esperado por um cliente. O que te levou a isso e como terminou?",correct:true},
  {t:"O que é, para você, um bom atendimento ao cliente?",why:"Pede uma definição; todos sabem recitá-la sem tê-la dado. Teoria, não prática."},
  {t:"O que você faria se um cliente fosse embora sem comprar?",why:"Hipotética e, além disso, mira em recuperar uma venda, não em criar experiências memoráveis."},
  {t:"Como você lida com uma reclamação difícil?",why:"Boa pergunta, mas de gestão de conflitos, não de fidelizar pela experiência."}]},
 equipo:{multi:true,options:[
  {t:"Descreva um dia em que a equipe estava sobrecarregada. O que você fez para tirar o time do sufoco junto com os outros?",correct:true},
  {t:"Conte-me de uma vez em que houve um atrito ou desacordo com um colega. Como vocês resolveram?",correct:true},
  {t:"Você se considera uma pessoa de equipe?",why:"Ninguém responde que não. Autoavaliação sem evidência."},
  {t:"Aqui valorizamos muito colaborar, você se adapta bem a trabalhar com os outros?",why:"A pergunta entrega a resposta certa; a pessoa só confirma."},
  {t:"Como é a sua relação com o seu Store Manager?",why:"Mede a relação com o líder, não a colaboração horizontal com os colegas."}]},
 comunicacion:{multi:true,options:[
  {t:"Conte-me de uma vez em que você teve que dar uma informação desconfortável a um cliente ou colega. Como você disse?",correct:true},
  {t:"Dê-me um exemplo de uma vez em que um cliente não te entendia ou entendeu algo errado. Como você resolveu?",correct:true},
  {t:"Você se comunica bem?",why:"Autoavaliação sem evidência; a resposta é sempre que sim."},
  {t:"O que é, para você, uma boa comunicação?",why:"Pede teoria; recitar uma definição não prova que a pessoa se comunique bem."},
  {t:"Conte-me uma situação em que a sua comunicação foi muito eficaz.",why:"Soa comportamental, mas você pede que escolha a própria vitória; não verá como comunica quando complica."}]},
 marca:{multi:true,options:[
  {t:"O que te atrai na Pandora em relação a outras marcas? Há algo concreto de que você gosta na Pandora como marca para trabalhar?",correct:true},
  {t:"Quais valores te representam como profissional? Quais são importantes para você na cultura da empresa ou da marca para se sentir feliz?",correct:true},
  {t:"Nossos valores são sonhar, ousar, cuidar e entregar, você se identifica com eles?",why:"Você entrega os valores na pergunta; a pessoa só concorda."},
  {t:"Você conhece a marca Pandora?",why:"Um sim/não que não distingue quem a admira de quem só sabe que existe."},
  {t:"O que você sabe das nossas coleções atuais?",why:"Mede conhecimento de produto, não compromisso com a marca nem afinidade de valores."}]},
 integridad:{options:[
  {t:"Conte-me de uma vez em que você cometeu um erro no caixa ou com um produto. O que você fez?",correct:true},
  {t:"Você se considera uma pessoa responsável e honesta?",why:"A pergunta de manual que não filtra ninguém: todos dizem que sim."},
  {t:"O que você faria se visse um colega levando um produto?",why:"Hipotética com resposta óbvia; mede se sabe o que deveria fazer, não como ele mesmo se comporta."},
  {t:"Você conhece os processos de abertura e fechamento?",why:"Mede conhecimento operacional, não integridade."}]},
 cierre:{options:[
  {t:"Conte-me de um mês em que você estava abaixo da meta. O que você fez para virar o jogo?",correct:true},
  {t:"Você costuma bater suas metas de venda?",why:"Um resultado sim/não; não diz como chega nem o que faz quando não chega."},
  {t:"O que você faria se estivesse atrasado nas metas do mês?",why:"Hipotética; “me esforçar mais” qualquer um responde."},
  {t:"Você conhece bem os indicadores da loja?",why:"Mede entendimento do negócio, não orientação a resultados na ação."}]},
 producto:{options:[
  {t:"Fale-me de uma peça ou coleção que você adore e como a apresentaria a um cliente.",correct:true},
  {t:"Você conhece bem o nosso catálogo?",why:"Um sim/não sem evidência de profundidade."},
  {t:"Como você se manteria em dia com os novos lançamentos?",why:"Hipotética: mede a intenção, não o hábito."},
  {t:"Você gosta de joias?",why:"Mede a paixão, não o conhecimento aplicado."}]},
 negocio:{options:[
  {t:"Quais indicadores você acompanhava na sua loja e o que você fazia, no salão, para movê-los?",correct:true},
  {t:"Você sabe o que é a taxa de conversão?",why:"Mede se conhece um termo, não se o usa para decidir."},
  {t:"Por que você acha que os KPIs são importantes?",why:"Pede teoria; pode explicá-la sem nunca ter movido um."},
  {t:"Você costuma bater suas metas de venda?",why:"Mira em resultados, não na compreensão do negócio."}]},
 procesos:{options:[
  {t:"Descreva passo a passo como era a sua rotina de abertura ou de fechamento na sua loja anterior.",correct:true},
  {t:"Você sabe fazer abertura e fechamento?",why:"Sim/não que não distingue domínio."},
  {t:"Como você organizaria o recebimento de um pedido grande?",why:"Hipotética: como imagina o processo, não como o executa."},
  {t:"Você é uma pessoa organizada?",why:"Autoavaliação de um traço; não garante cumprir um procedimento concreto."}]},
 caja:{options:[
  {t:"Conte-me da última vez em que o caixa não bateu no fechamento. O que aconteceu e o que você fez?",correct:true},
  {t:"Você tem experiência com caixa?",why:"Sim/não; não revela o rigor nem como reage a uma diferença."},
  {t:"O que você faria se faltasse dinheiro no caixa?",why:"Hipotética com resposta óbvia."},
  {t:"Você conhece o sistema de ponto de venda?",why:"Mede o uso de sistemas, não o rigor com o dinheiro."}]},
 organizacion:{multi:true,options:[
  {t:"Conte-me de um dia em que você teve tarefas demais ao mesmo tempo. Como decidiu a ordem?",correct:true},
  {t:"Dê-me um exemplo de uma vez em que não deu tempo de tudo. O que você deixou para depois e por quê?",correct:true},
  {t:"Você se considera uma pessoa organizada?",why:"Ninguém diz que não; autoavaliação sem evidência."},
  {t:"Como você priorizaria três coisas urgentes ao mesmo tempo?",why:"Hipotética: no abstrato todos priorizam bem."},
  {t:"Aqui o ritmo é intenso, você administra bem o seu tempo?",why:"Induz o sim e esconde as dificuldades reais."}]},
 estandares:{options:[
  {t:"Conte-me de uma regra ou padrão que foi difícil de cumprir. Como você lidou?",correct:true},
  {t:"Você respeita sempre as políticas da empresa?",why:"Todos dizem que sim; não filtra ninguém."},
  {t:"O que você faria se um colega descumprisse uma regra?",why:"Hipotética e sobre o outro, não sobre ele."},
  {t:"Você conhece os protocolos de prevenção de perdas?",why:"Mira no cuidado com a mercadoria, não no cumprimento geral."}]},
 mercancia:{options:[
  {t:"Dê-me um exemplo de uma vez em que você detectou uma diferença de inventário ou um risco com o produto. O que você fez?",correct:true},
  {t:"Você é cuidadoso com o produto?",why:"Autoavaliação sem evidência."},
  {t:"O que você faria se notasse que falta mercadoria?",why:"Hipotética com resposta previsível."},
  {t:"Você sabe fazer inventário no sistema?",why:"Mede o uso de sistemas, não o comportamento de cuidado e alerta."}]},
 apoyo:{options:[
  {t:"Conte-me de alguém novo que você ajudou a se integrar. O que você fez concretamente por essa pessoa?",correct:true},
  {t:"Você gosta de ajudar quem chega novo?",why:"Um sim genérico; disposição declarada, não comportamento."},
  {t:"Como você ajudaria um colega novo?",why:"Hipotética: o que imagina, não um caso real."},
  {t:"Você se considera um bom colega?",why:"Autoavaliação ampla; não é acompanhar quem chega."}]},
 adaptabilidad:{multi:true,options:[
  {t:"Conte-me de uma mudança inesperada na sua loja —de horário, de processo, de equipe— e como você lidou.",correct:true},
  {t:"Dê-me um exemplo de algo que no início foi difícil de aceitar e que depois você acabou fazendo seu. O que aconteceu?",correct:true},
  {t:"Você se adapta bem às mudanças?",why:"Ninguém diz que não; autoavaliação sem evidência."},
  {t:"Aqui as coisas mudam muito, você é flexível?",why:"Induz o sim e avisa qual resposta você quer ouvir."},
  {t:"O que você faria se mudassem o seu turno de um dia para o outro?",why:"Hipotética: reação imaginada, não como respondeu de verdade."}]},
 desarrollo:{multi:true,options:[
  {t:"Conte-me de algo que você aprendeu por conta própria para melhorar no trabalho. O que te levou a isso?",correct:true},
  {t:"Dê-me um exemplo de um feedback que foi difícil de receber. O que você fez com ele?",correct:true},
  {t:"Você gosta de aprender coisas novas?",why:"Quase ninguém diz que não; disposição declarada, não ação."},
  {t:"Como você melhoraria suas habilidades de venda?",why:"Hipotética: uma intenção, não algo já feito."},
  {t:"Você participa de todos os treinamentos?",why:"Mede presença/cumprimento, não iniciativa própria."}]},
 disponibilidad:{options:[
  {t:"Qual é a sua disponibilidade real de horários e fins de semana, e até onde você poderia se deslocar entre lojas se fosse preciso?",correct:true},
  {t:"Você tem disponibilidade total?",why:"Convida a um “sim” cômodo que não concretiza e costuma se desmentir depois."},
  {t:"Precisamos de gente muito flexível, tudo bem?",why:"Pressiona para o sim e esconde as restrições reais."},
  {t:"Você estaria disposto a mudar de loja?",why:"Fácil no abstrato; não aterrissa distância, transporte nem tempos."}]}
};

const CANDIDATES_PT = [
 {id:"mateo",name:"Mateo",age:26,tag:"O vendedor ambicioso",photo:"img/mateo.jpg",
  cv:"3 anos em varejo de moda rápida como top vendedor. Números altos e muita energia; quer crescer rápido. Sem experiência em joalheria.",
  destaca:["Vontade de crescer","Energia que inspira","Orientação a resultados"],
  met:[false,true,true,false,true,false,true,true,true], shadows:["crecer","energia"]},
 {id:"valeria",name:"Valeria",age:31,tag:"O atendimento excepcional",photo:"img/valeria.jpg",
  cv:"5 anos em perfumaria e varejo de atendimento ao cliente. Clientes fiéis que a procuram pelo atendimento. Calorosa; menos à vontade com a pressão de metas.",
  destaca:["Cria conexões genuínas","Cria experiências memoráveis","Orientação ao cliente"],
  met:[true,false,false,true,true,true,true,true,true], shadows:["conexion","experiencias"]},
 {id:"andres",name:"Andrés",age:38,tag:"O operador sólido",photo:"img/andres.jpg",
  cv:"8 anos em varejo, key holder. Impecável em processos, caixa e padrões. Rígido com o novo e pouca chispa comercial.",
  destaca:["Cumpre o que promete","Cuida de cada detalhe","Assume o seu papel"],
  met:[false,true,false,false,true,true,false,true,true], shadows:["cumple","detalle","rol"]},
 {id:"rocio",name:"Rocío",age:22,tag:"A promessa a lapidar",photo:"img/rocio.jpg",
  cv:"Recém-formada, 1 ano em cafeteria. Primeiro emprego no varejo. Entusiasmada, aprende rápido, disponibilidade total. Sem rodagem comercial nem de caixa.",
  destaca:["Aprende e busca melhorar","Atitude positiva diante dos desafios","Vontade de crescer"],
  met:[false,false,false,true,true,true,true,false,false], shadows:["aprende","actitud","crecer"]}
];

const DIMENSIONS_PT = [
 {id:"estandar",label:"Padrão e expectativas",principio:"Informar não é dar clareza.",
  actions:[
   {int:true, t:"Combinar com {nombre} o que se espera nos primeiros 30 dias e como saberá que vai bem."},
   {int:true, t:"Mostrar exemplos concretos de como é “fazer bem” aqui, não apenas descrever."},
   {int:false,t:"Repassar de novo toda a informação da integração, para não restar nenhuma dúvida."},
   {int:false,t:"A prática do dia a dia vai esclarecendo as dúvidas e as prioridades."},
   {int:false,t:"Entregar o manual de procedimentos para que {nombre} estude por conta própria."}],
  mirror:"Um bom plano aqui não dá mais informação: dá clareza —o que é importante em cada etapa e como é fazer bem. Se as ações de vocês ajudavam {nombre} a distinguir o prioritário, muito bem! Se sobretudo davam mais informação, lembrem-se: informar não é dar clareza."},
 {id:"conexion",label:"Conexão e pertencimento",principio:"O pertencimento se projeta, não acontece sozinho.",
  actions:[
   {int:true, t:"Designar um colega de referência para as primeiras semanas de {nombre}."},
   {int:true, t:"Criar alguns momentos concretos para {nombre} interagir com a equipe, além do “oi” do primeiro dia."},
   {int:true, t:"Perguntar, ao longo da semana, como {nombre} está se sentindo com a equipe, não só com as tarefas."},
   {int:true, t:"Criar um espaço com a equipe para trabalhar os Vision Boards (quadros dos sonhos) e convidar {nombre} a fazer o de {nombre}."},
   {int:false,t:"Confiar que, como a equipe é muito aberta, {nombre} vai se integrar por conta própria."},
   {int:false,t:"Deixar que {nombre} marque o ritmo e se aproxime quando se sentir à vontade."}],
  mirror:"Um bom plano aqui projeta a integração com ações concretas: não basta receber alguém, é preciso que a pessoa se sinta parte. Se vocês criaram momentos e apoios para {nombre} se integrar, muito bem! Se deixaram por conta do tempo ou da iniciativa de {nombre}, lembrem-se: o pertencimento se projeta, não acontece sozinho."},
 {id:"conversaciones",label:"Conversas e acompanhamento",principio:"O silêncio não significa que está tudo bem.",
  actions:[
   {int:true, t:"Agendar uma conversa breve de acompanhamento toda semana, mesmo que esteja tudo bem."},
   {int:true, t:"Reconhecer avanços concretos, não só apontar o que precisa corrigir."},
   {int:true, t:"Fazer flash coaching no salão: dar feedback na hora sobre a selling ceremony ou um processo específico."},
   {int:false,t:"Estar disponível caso precise de algo; se houver um problema, {nombre} vai avisar."},
   {int:false,t:"Falar com {nombre} só quando aparecer um erro para corrigir."},
   {int:false,t:"Perguntar “tudo bem?” de passagem e seguir em frente se disser que sim."}],
  mirror:"Um bom plano aqui não espera aparecer um problema: agenda o acompanhamento e reconhece o que vai bem, não só o que precisa corrigir. Se as ações de vocês incluíam acompanhamento planejado e reconhecimento, muito bem! Se dependiam de {nombre} avisar ou só de corrigir erros, lembrem-se: o silêncio não significa que está tudo bem."},
 {id:"integracion",label:"Integração e equidade",principio:"Equidade não é igualdade.",
  actions:[
   {int:true, t:"Manter o mesmo padrão para todos, mas ajustar o acompanhamento ao que cada pessoa precisa."},
   {int:true, t:"Dedicar mais tempo a {nombre} se tiver mais dificuldade, explicando à equipe que o objetivo é que todos cheguem ao mesmo nível."},
   {int:true, t:"Apoiar-se em um colega experiente para acompanhar parte do aprendizado de {nombre}, sem largar você o acompanhamento."},
   {int:false,t:"Dar exatamente o mesmo plano e o mesmo tempo que a qualquer outra contratação, para ser justo."},
   {int:false,t:"Reduzir o acompanhamento extra para que a equipe não perceba favoritismo."}],
  mirror:"Um bom plano aqui mantém o mesmo padrão para todos, mas adapta o acompanhamento ao que cada pessoa precisa para chegar lá. Se vocês ajustaram o apoio conforme o que {nombre} precisa, muito bem! Se distribuíram tudo por igual para “ser justos”, lembrem-se: equidade não é igualdade."}
];

const CHALLENGES_PT = {
 crecer:{fortaleza:"Vontade de crescer",reto:"a impaciência pelos resultados",
  esc:"{nombre} é uma das pessoas com melhores resultados da equipe e sempre quer ir além. Num dia de grande movimento, para fechar rápido várias vendas, acelerou o atendimento. No fechamento, apareceram dois erros de cobrança e uma garantia registrada errada.",
  options:[
   {t:"Conversar sobre os erros e reforçar que respeite cada passo do processo, seja qual for o volume.",porQue:"Fica só na correção: aponta o erro, mas não reconhece o ponto forte de {nombre} nem combina como sustentar o ritmo sem perder qualidade."},
   {t:"Reconhecer a orientação a resultados de {nombre} e, sobre o que aconteceu hoje, mostrar o impacto —dois erros e uma garantia errada— e combinar juntos o que manter (o empenho) e o que mudar (garantir os passos-chave nos picos).",best:true,porQue:"Segue o EIC: parte de um exemplo concreto, nomeia o impacto real e combina o que continuar e o que mudar. Desenvolve sem apagar o ponto forte de {nombre}."},
   {t:"Lembrar toda a equipe da importância de cumprir os processos em alta demanda.",porQue:"Dilui no grupo um tema que é de {nombre}; ninguém se dá por aludido."},
   {t:"Pedir que, nos momentos de mais movimento, {nombre} reduza o ritmo para minimizar erros.",porQue:"Freia justamente o ponto forte de {nombre} em vez de canalizá-lo: você pede que seja menos, não melhor."}]},
 conexion:{fortaleza:"Cria conexões genuínas",reto:"evitar as conversas difíceis",
  esc:"{nombre} gera um clima excelente e se dá muito bem com todo mundo. Você percebe uma oportunidade de melhora no desempenho de {nombre}, mas evita as conversas desconfortáveis para não estragar a boa relação, e vai adiando temas que precisariam ser tratados.",
  options:[
   {t:"Esperar surgir uma situação mais clara antes de dizer algo.",porQue:"Evitar a conversa repete justamente o que você quer corrigir; o tempo não resolve o que não se fala."},
   {t:"Aproveitar a próxima reunião de equipe para reforçar os padrões e ver se muda.",porQue:"Generaliza para o grupo algo individual; {nombre} não se dá por aludido/a."},
   {t:"Ter uma conversa individual: partir de um exemplo concreto recente, mostrar o impacto de adiar essa conversa e combinar o que manter (a cordialidade) e o que mudar (encarar o desconfortável na hora certa).",best:true,porQue:"EIC completo —exemplo, impacto e acordo— e você modela a conversa difícil que a ele/ela custa ter."},
   {t:"Reconhecer o bom clima de {nombre} e ir inserindo melhorias aos poucos nos acompanhamentos.",porQue:"Sem nomear o exemplo nem o impacto, a mensagem se dilui e não se combina nada concreto."}]},
 actitud:{fortaleza:"Atitude positiva diante dos desafios",reto:"aguentar demais e se isolar",
  esc:"{nombre} transmite calma mesmo nos dias difíceis e sempre mantém a boa cara. Ultimamente participa menos, evita pedir ajuda e, quando você pergunta, responde que está “tudo bem”, embora dê para notar que algo mudou.",
  options:[
   {t:"Respeitar o espaço de {nombre} e estar disponível caso queira conversar.",porQue:"A disponibilidade passiva deixa o peso em quem justamente não pede ajuda."},
   {t:"Reconhecer a capacidade de aguentar de {nombre} e lembrar que a equipe a/o apoia.",porQue:"Reforça o aguentar —o ponto forte em excesso— em vez de abrir o que está acontecendo."},
   {t:"Fazer um acompanhamento próximo: partir de algo concreto que você observou, nomear o impacto (te vejo mais apagado/a, participa menos) e combinar como se cuidar e quando pedir apoio, valorizando a fibra de {nombre}.",best:true,porQue:"EIC aplicado com cuidado —observa, nomeia o impacto e combina— e rompe o “tudo bem” com fatos concretos."},
   {t:"Reduzir temporariamente as responsabilidades de {nombre} até que esteja melhor.",porQue:"Você decide por ela/ele sem entender o que houve; pode soar como castigo."}]},
 energia:{fortaleza:"Energia que inspira",reto:"ofuscar o resto da equipe",
  esc:"{nombre} conecta com facilidade e é uma referência natural. Nas reuniões, muitos esperam a opinião de {nombre} antes de falar e, com o tempo, alguns participam cada vez menos.",
  options:[
   {t:"Mudar a dinâmica das reuniões para que todos participem por igual.",porQue:"Resolve o sintoma na sala, mas não fala com {nombre} nem desenvolve o papel de {nombre}."},
   {t:"Pedir que {nombre} intervenha menos para dar espaço aos outros.",porQue:"Apaga o ponto forte de {nombre}: você pede que brilhe menos em vez de usar a influência a favor da equipe."},
   {t:"Reconhecer a influência de {nombre} e pedir que incentive os outros a compartilhar.",porQue:"Boa direção, mas sem exemplo concreto nem impacto nomeado vira só uma tarefa genérica."},
   {t:"Conversar sobre um momento concreto em que o peso de {nombre} calou o resto, mostrar o impacto (colegas que já não opinam) e combinar como transformar a influência de {nombre} em desenvolver os outros, sem perder a energia.",best:true,porQue:"EIC completo e reenquadra o ponto forte como alavanca para a equipe, não como problema."}]},
 cumple:{fortaleza:"Cumpre o que promete",reto:"a rigidez diante da mudança",
  esc:"{nombre} é de total confiança: cumpre, sustenta o padrão e raramente falha. No salão, você nota que faz o mesmo roteiro de venda com todos os clientes e custa a se adaptar a cada um, mesmo havendo oportunidade de personalizar.",
  options:[
   {t:"Explicar que é preciso adaptar cada conversa e pedir que aplique isso em todas as vendas.",porQue:"Impõe a mudança sem exemplo nem diálogo. A alguém rígido, mais uma ordem não move."},
   {t:"Revisar juntos uma venda concreta que você viu, mostrar qual oportunidade de conexão se perdeu e combinar o que manter (a solidez) e o que tentar diferente (personalizar), acompanhando-o/a.",best:true,porQue:"EIC sobre um caso real e dá segurança para sair do que já domina."},
   {t:"Manter o jeito de vender de {nombre} enquanto der bons resultados.",porQue:"Evita o desenvolvimento: o ponto forte fica na zona de conforto."},
   {t:"Lembrar a equipe da importância de personalizar a venda.",porQue:"Generaliza algo que é de {nombre}; não há conversa nem acordo."}]},
 aprende:{fortaleza:"Aprende e busca melhorar",reto:"dispersar-se e se entediar com a rotina",
  esc:"{nombre} aprende rápido e curte cada novidade; brilha nos lançamentos. Mas nas tarefas rotineiras, como o inventário ou a organização do estoque, perde o interesse e é preciso lembrá-la.",
  options:[
   {t:"Falar da importância de manter o mesmo comprometimento em tudo e fixar expectativas claras.",porQue:"Só corrige e põe regras; não aproveita o ponto forte de {nombre} nem combina nada que a motive."},
   {t:"Designar sobretudo desafios de produto e evitar a rotina quando der.",porQue:"Alimenta a dispersão: você tira o entediante em vez de ensiná-la a sustentá-lo."},
   {t:"Partir de uma tarefa rotineira concreta que ficou pela metade, mostrar o impacto na equipe e na loja, e combinar como canalizar a curiosidade de {nombre} sem largar o operacional, com acompanhamento.",best:true,porQue:"EIC e equilibra ponto forte e constância com um acordo concreto."},
   {t:"Rodá-la mais entre tarefas para que não se entedie.",porQue:"Remendo organizacional: não desenvolve a constância de {nombre}, só esconde o problema."}]},
 experiencias:{fortaleza:"Cria experiências memoráveis",reto:"envolver-se demais e pular o processo",
  esc:"{nombre} recebe ótimos comentários e faz o que for preciso pelo cliente. Para que uma cliente não saísse insatisfeita, abriu uma exceção ao processo sem consultar. A cliente ficou feliz, mas gerou dúvidas na equipe sobre como agir.",
  options:[
   {t:"Explicar que, diante de qualquer exceção, deve consultar antes.",porQue:"Põe uma regra sem reconhecer a entrega de {nombre} nem combinar um critério."},
   {t:"Reconhecer o comprometimento de {nombre}, revisar o caso concreto, mostrar o impacto da exceção na equipe e combinar como equilibrar cliente e padrão: o que manter e o que mudar.",best:true,porQue:"EIC completo e protege o ponto forte de {nombre} dando um marco para usá-lo bem."},
   {t:"Lembrar a equipe de quais exceções a empresa permite.",porQue:"Generaliza; {nombre} não recebe a conversa de que precisa."},
   {t:"Pedir que {nombre} priorize o processo acima do cliente.",porQue:"Apaga justamente o ponto forte de {nombre}: inverte o problema em vez de equilibrá-lo."}]},
 rol:{fortaleza:"Assume o seu papel",reto:"agir por conta própria",
  esc:"{nombre} resolve sem esperar instruções, o que dá agilidade. Num dia de muito movimento, tomou uma decisão com um cliente sem consultar. Resolveu o caso, mas deixou dúvidas na equipe sobre quando se pode decidir de forma autônoma.",
  options:[
   {t:"Pedir que, a partir de agora, consulte tudo o que fuja do habitual.",porQue:"Mata a autonomia de {nombre} —o ponto forte— com um controle total."},
   {t:"Reconhecer a iniciativa de {nombre}, revisar a decisão concreta que tomou, mostrar o impacto na equipe e combinar juntos o que pode decidir por conta própria e o que precisa alinhar, compartilhando depois com a equipe.",best:true,porQue:"EIC e transforma a autonomia de {nombre} em autonomia com critério, sem apagá-la."},
   {t:"Lembrar a equipe dos procedimentos diante de situações excepcionais.",porQue:"Generaliza; o aprendizado individual de {nombre} não acontece."},
   {t:"Deixar que esse tipo de decisão fique só nas suas mãos.",porQue:"Centraliza e desperdiça a capacidade de resolver de {nombre}."}]},
 detalle:{fortaleza:"Cuida de cada detalhe",reto:"o perfeccionismo que trava",
  esc:"{nombre} cuida de cada detalhe como ninguém: vitrine impecável, embalagem perfeita. Num dia de grande movimento, se detém tanto em deixar tudo perfeito que vários clientes esperam sem ser atendidos, e uma colega comenta que “nada parece bom o suficiente”.",
  options:[
   {t:"Pedir que, em alta demanda, {nombre} priorize a rapidez e deixe os detalhes para depois.",porQue:"Dá uma regra oposta ao ponto forte de {nombre} sem combinar um critério; oscila de um extremo ao outro."},
   {t:"Reconhecer a exigência de {nombre}, partir do dia concreto, mostrar o impacto (clientes esperando, equipe tensa) e combinar como distinguir quando o detalhe agrega e quando trava.",best:true,porQue:"EIC e dá critério para calibrar o ponto forte de {nombre}, não para abrir mão dele."},
   {t:"Lembrar a equipe de equilibrar apresentação e agilidade.",porQue:"Generaliza; {nombre} não recebe a conversa concreta."},
   {t:"Manter o jeito de trabalhar de {nombre} porque eleva o padrão.",porQue:"Evita o desenvolvimento: o perfeccionismo segue travando o atendimento."}]}
};

const GENERIC_PT = { multi:true, fortaleza:"Encaixa tão bem com a equipe",reto:"a amizade que contamina o trabalho",
  esc:"{nombre} se encaixou tão bem na equipe que a sintonia é total: todos viraram amigos e fazem planos fora do trabalho. A harmonia se rompe quando {nombre} descobre que duas colegas falam mal de {nombre} pelas costas —criticam algo que aconteceu fora do trabalho— e agora não colaboram em nada. {nombre} vem te contar com todos os detalhes do que houve fora, e critica as colegas.",
  options:[
   {t:"Você escuta {nombre} e dá a sua opinião e um conselho sobre como poderia resolver.",porQue:"Você resolve por {nombre}; o conflito é de {nombre} e você gera dependência em vez de desenvolver a capacidade de administrá-lo."},
   {t:"Você convoca uma reunião de urgência com toda a equipe para resolver juntos.",porQue:"Expõe em público um conflito pessoal, força lados e pode escalá-lo. Primeiro entender, não convocar."},
   {t:"Você não deixa que {nombre} continue falando do que houve fora do trabalho e reconduz para fatos concretos dentro do trabalho.",valid:true,porQue:"Você põe o limite certo: o pessoal de fora não é sua jurisdição; o que você administra é o impacto no trabalho (não colaborarem)."},
   {t:"Você faz perguntas sobre como {nombre} acha que poderia resolver com as colegas.",valid:true,porQue:"Coaching e empoderamento: você devolve a propriedade do problema a quem o tem."},
   {t:"Você fala individualmente com as envolvidas para que te contem a versão delas dos fatos.",porQue:"Recolher “versões” de um tema pessoal alimenta a fofoca e te coloca como árbitro de algo de fora do trabalho. É justamente o que você não quer alimentar."},
   {t:"Você fala individualmente com as envolvidas e dá feedback com EIC, focado no comportamento no trabalho (não colaborarem) e no seu impacto.",valid:true,porQue:"Mais completa que a anterior: você não vai recolher fofoca, vai tratar o comportamento concreto e o seu impacto, e combinar a mudança."}],
  mejorEnfoque:"O melhor enfoque não é uma opção só: combina reconduzir ao trabalho + devolver a responsabilidade + fechar com EIC sobre o comportamento. Escutar e aconselhar, convocar todos ou recolher versões, sozinhas, não ajudam." };

const CLOSE_PT = {
  title:"Todo talento pode florescer.",
  lines:[
   "Vocês escolheram uma pessoa real, com a sua luz e os seus desafios, e decidiram acompanhá-la. Porque ninguém chega pronto —e todo ponto forte, levado ao extremo, vira um desafio a administrar.",
   "A mesma energia que hoje transborda, amanhã inspira a equipe. O mesmo detalhe que hoje trava, amanhã encanta o cliente. A diferença não está no talento que você encontra: está em como você o lidera."],
  final:"Fazer florescer o talento da sua equipe é a marca mais profunda que você deixará neles, e a forma mais alta de crescer como líder." };

window.CONTENT_PT = {
  ui: UI_PT,
  REQS: REQS_PT,
  POOL: POOL_PT,
  PUZZLES: PUZZLES_PT,
  CANDIDATES: CANDIDATES_PT,
  DIMENSIONS: DIMENSIONS_PT,
  CHALLENGES: CHALLENGES_PT,
  GENERIC: GENERIC_PT,
  CLOSE: CLOSE_PT,
};

window.CONTENT_PT.app = {
  sections: {
    sel: 'Processo de Seleção',
    selA: 'Competências e prioridades',
    selB: 'Entrevista e candidatos',
    onb: 'Onboarding',
    ret: 'Desafios do dia a dia',
  },
  resumeTitle: 'Jogo salvo',
  resumeText: 'Há um jogo inacabado neste dispositivo.',
  resume: 'Retomar',
  newGame: 'Começar de novo',
  offline: 'Sem conexão: as decisões continuam salvas neste dispositivo.',
  timeout: 'O tempo terminou. Registrem a decisão da equipe para continuar.',
  selectedIntentional: 'Ações intencionais escolhidas',
  missedIntentional: 'Ações intencionais que deixaram passar',
  challengeProgress: 'Desafio {n} de {total}',
  challengeNext: 'Próximo desafio',
  finish: 'Ver encerramento',
  syncPending: 'Registro pendente de sincronização.',
  syncDone: 'Registro sincronizado.',
  reqTitle: 'Definam o perfil',
  prioritiesTitle: 'Preparem a entrevista',
  candidatesTitle: 'Escolham quem contratar',
  rankingTitle: 'Priorizem o onboarding',
  candidatePhotoAlt: 'Retrato ilustrado de {nombre}',
  cv: 'CV',
  requirements: 'Requisitos',
  challengeLabel: 'Desafio',
  eicNote: 'EIC = Exemplo, Impacto e Mudança ou Consolidação.',
};
