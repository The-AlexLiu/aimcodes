export const valorantMaps = Object.freeze([
  ['abyss', 'Abyss', '幽邃地窟', 'アビス'],
  ['ascent', 'Ascent', '亚海悬城', 'アセント'],
  ['bind', 'Bind', '源工重镇', 'バインド'],
  ['breeze', 'Breeze', '微风岛屿', 'ブリーズ'],
  ['corrode', 'Corrode', '盐海矿镇', 'カロード'],
  ['fracture', 'Fracture', '裂变峡谷', 'フラクチャー'],
  ['haven', 'Haven', '隐世修所', 'ヘイヴン'],
  ['icebox', 'Icebox', '森寒冬港', 'アイスボックス'],
  ['lotus', 'Lotus', '莲华古城', 'ロータス'],
  ['pearl', 'Pearl', '深海明珠', 'パール'],
  ['split', 'Split', '霓虹町', 'スプリット'],
  ['summit', 'Summit', '天枢云阙', 'サミット'],
  ['sunset', 'Sunset', '日落之城', 'サンセット'],
].map(([id, name, zhName, jaName]) => Object.freeze({
  id,
  name,
  names: Object.freeze({ en: name, es: name, 'pt-BR': name, 'zh-CN': zhName, ja: jaName }),
  asset: `/images/playbook/maps/${id}.svg`,
})))

export function playbookMapName(map, locale) {
  return map.names?.[locale] || map.name
}

const seo = {
  en: {
    eyebrow: 'DRAW THE ROUND. SHARE THE CALL.',
    title: 'VALORANT map strategy board',
    intro: 'Choose a tactical map, place your five agents and their utility, draw routes, mark the Spike, then export a round plan your team can read at a glance.',
    guideTitle: 'Make the map do the explaining',
    guideIntro: 'A useful board shows where players start, where the first contact happens, how the Spike travels and what the fallback route looks like.',
    tips: [
      { title: 'Draw one route per group', body: 'Use different colors for the entry pair, lurker and Spike. If every line crosses, the call is already too complicated.' },
      { title: 'Mark the first fight', body: 'Place attackers and defenders around the first contested area. That tells everyone who clears, who trades and who should stay alive.' },
      { title: 'Export before queueing', body: 'Send the board as an image or copy the share link. One clear picture is easier to follow than a wall of pre-round text.' },
    ],
    faq: [
      ['Does the board include real VALORANT maps?', 'Yes. The tool includes 13 tactical map layouts and keeps a separate drawing for each map.'],
      ['Can teammates edit my board?', 'A copied link opens the same map, routes and markers in their browser. They can continue editing their own copy.'],
      ['Does AimCodes upload my strategies?', 'No. Boards are created and saved in your browser unless you choose to copy a share link.'],
    ],
    metaTitle: 'VALORANT Map Strategy Board & Playbook Tool | AimCodes',
    metaDescription: 'Plan VALORANT rounds on 13 maps. Place agents and ability icons, draw routes, mark the Spike, then export or share your strategy board.',
  },
  es: {
    eyebrow: 'DIBUJA LA RONDA. COMPARTE LA CALL.',
    title: 'Pizarra táctica de mapas de VALORANT',
    intro: 'Elige un mapa, coloca a tus cinco agentes y sus habilidades, dibuja las rutas, marca la Spike y exporta una ronda que el equipo entienda de un vistazo.',
    guideTitle: 'Deja que el mapa explique la jugada',
    guideIntro: 'Una buena pizarra enseña dónde empieza cada jugador, dónde llega el primer duelo, cómo viaja la Spike y cuál es la salida.',
    tips: [
      { title: 'Una ruta por grupo', body: 'Usa colores distintos para entry, lurker y Spike. Si todas las líneas se cruzan, la call ya es demasiado complicada.' },
      { title: 'Marca el primer duelo', body: 'Coloca atacantes y defensores en la primera zona disputada. Así se ve quién limpia, quién tradea y quién debe sobrevivir.' },
      { title: 'Exporta antes de entrar en cola', body: 'Envía la pizarra como imagen o copia el enlace. Una imagen clara gana a un bloque enorme de texto.' },
    ],
    faq: [
      ['¿Incluye mapas reales de VALORANT?', 'Sí. Hay 13 diseños tácticos y cada mapa conserva su propio dibujo.'],
      ['¿Mi equipo puede editar la pizarra?', 'El enlace abre el mismo mapa, rutas y marcadores. Cada persona puede seguir editando su copia.'],
      ['¿AimCodes sube mis estrategias?', 'No. Todo se crea y guarda en el navegador salvo que tú copies un enlace para compartir.'],
    ],
    metaTitle: 'Pizarra Táctica y Playbook de VALORANT | AimCodes',
    metaDescription: 'Planea rondas en 13 mapas de VALORANT. Coloca agentes y habilidades, dibuja rutas, marca la Spike y exporta o comparte la estrategia.',
  },
  'pt-BR': {
    eyebrow: 'DESENHE A RODADA. COMPARTILHE A CALL.',
    title: 'Prancheta tática de mapas do VALORANT',
    intro: 'Escolha o mapa, posicione seus cinco agentes e habilidades, desenhe as rotas, marque a Spike e exporte uma rodada que o time entende de primeira.',
    guideTitle: 'Deixe o mapa explicar a jogada',
    guideIntro: 'Uma boa prancheta mostra onde cada jogador começa, onde sai o primeiro duelo, o caminho da Spike e a rota de saída.',
    tips: [
      { title: 'Uma rota por grupo', body: 'Use cores diferentes para a dupla de entrada, lurker e Spike. Se todas as linhas cruzam, a call já ficou complicada demais.' },
      { title: 'Marque o primeiro duelo', body: 'Coloque atacantes e defensores na primeira área disputada. Fica claro quem limpa, quem troca e quem precisa sobreviver.' },
      { title: 'Exporte antes da fila', body: 'Mande a prancheta como imagem ou copie o link. Uma imagem limpa funciona melhor que um textão antes da rodada.' },
    ],
    faq: [
      ['A prancheta usa mapas reais do VALORANT?', 'Sim. A ferramenta inclui 13 layouts táticos e guarda um desenho separado para cada mapa.'],
      ['Meu time pode editar?', 'O link abre o mesmo mapa, rotas e marcadores. Cada pessoa pode continuar editando a própria cópia.'],
      ['O AimCodes envia minhas estratégias?', 'Não. Tudo é criado e salvo no navegador, a menos que você copie um link para compartilhar.'],
    ],
    metaTitle: 'Prancheta Tática e Playbook do VALORANT | AimCodes',
    metaDescription: 'Planeje rodadas em 13 mapas do VALORANT. Posicione agentes e habilidades, desenhe rotas, marque a Spike e exporte ou compartilhe.',
  },
  'zh-CN': {
    eyebrow: '把路线画出来，队友一眼就懂',
    title: '无畏契约地图战术板',
    intro: '选一张地图，放好五名特工和技能落点，再画进攻路线、标记爆能器，整张战术图可以直接发给队友。',
    guideTitle: '能看懂的战术，地图会替你说清楚',
    guideIntro: '起点、第一波交火、爆能器路线和撤退路线都画在同一张图上，开局就不用念一大段说明。',
    tips: [
      { title: '每组人只画一条主路线', body: '突破、单摸和带包分别用不同颜色。线全挤在一起，说明这套战术已经复杂过头了。' },
      { title: '把第一波交火标出来', body: '攻守方标记放在第一个争夺区，谁清点、谁补枪、谁必须活着，一眼就能看明白。' },
      { title: '排队前直接发图', body: '导出图片发到开黑群，也可以复制战术链接。队友看一张图，比读一面文字快得多。' },
    ],
    faq: [
      ['这里有真实的无畏契约地图吗？', '有。当前提供 13 张战术地图，每张地图都会单独保存自己的标记和路线。'],
      ['队友能继续修改我的战术吗？', '复制链接后，队友打开会看到同一张地图、路线和标记，并能在自己的浏览器里继续改。'],
      ['AimCodes 会上传我的战术吗？', '不会。战术只在你的浏览器里制作和保存，除非你主动复制分享链接。'],
    ],
    metaTitle: '无畏契约地图战术板与 Playbook 工具 | AimCodes',
    metaDescription: '在 13 张无畏契约地图上放置特工头像和技能图标、画路线并标记爆能器，再导出图片或分享战术链接。',
  },
  ja: {
    eyebrow: 'ルートを描けば、チームに一目で伝わる',
    title: 'VALORANT作戦ボード（無料）',
    intro: 'VALORANT（ヴァロラント）の13マップから選び、5人のエージェントとアビリティ、進行ルート、スパイクを配置。無料で作戦図を作り、そのまま共有できます。',
    guideTitle: '作戦はマップで見せる',
    guideIntro: '開始位置、最初の交戦、スパイクのルート、撤退ルートを1枚にまとめれば、長い説明は必要ありません。',
    tips: [
      { title: 'グループごとに1本のルート', body: 'エントリー、ラーク、スパイクで色を分けます。線が全部交差するなら、作戦を少しシンプルにしましょう。' },
      { title: '最初の交戦をマーク', body: '最初に争う場所へ攻守のマーカーを置けば、クリア役、トレード役、生存役がすぐ分かります。' },
      { title: 'キュー前に画像で共有', body: '作戦図を画像で送るか、共有リンクをコピー。一枚の図ならラウンド前でもすぐ確認できます。' },
    ],
    faq: [
      ['実際のVALORANTマップですか？', 'はい。13種類の戦術マップを用意し、マップごとにルートとマーカーを保存します。'],
      ['チームメイトも編集できますか？', '共有リンクを開くと同じマップ、ルート、マーカーが表示され、各自のブラウザで編集を続けられます。'],
      ['作戦はAimCodesへ送信されますか？', 'いいえ。共有リンクを自分でコピーしない限り、作戦はブラウザ内だけで作成・保存されます。'],
    ],
    metaTitle: 'VALORANT 作戦ボード（無料）・マップ戦術ツール | AimCodes',
    metaDescription: '無料のVALORANT作戦ボード。13マップにエージェントとアビリティ、ルート、スパイクを配置し、作戦図を画像やリンクで共有できます。',
  },
}

const ui = {
  en: {
    boardEyebrow: 'TACTICAL BOARD', boardTitle: 'Build the round on the map', map: 'Map', toolbar: 'Board tools', select: 'Move', pen: 'Draw', arrow: 'Arrow', attacker: 'Attack', defender: 'Defense', spike: 'Spike', danger: 'Danger', eraser: 'Erase', color: 'Line color', rotateAbility: 'Rotate ability', undo: 'Undo', redo: 'Redo', mapAlt: 'tactical map', canvasLabel: 'Editable VALORANT tactical board', emptyHint: 'Choose an agent, ability, Draw or Arrow, then use the map.', quickStart: 'Start in 20 seconds', quickSteps: ['Choose a side, then place the five agents and their utility.', 'Draw the main route and fallback in different colors.', 'Export the board or share it with your team.'], notes: 'Optional round notes', notesPlaceholder: 'First contact, utility timing, cancel condition…', export: 'Export PNG', exported: 'PNG exported', share: 'Share with the team', shared: 'Board shared', linkCopied: 'Board link copied', clear: 'Clear this map', localNote: 'Saved in this browser. Each map keeps its own board.', attackerShort: 'A', defenderShort: 'D', spikeShort: 'S',
    agentDock: 'Agents & abilities', chooseAgent: 'Choose what to place', chooseSide: 'Team side', filterRole: 'Filter agents by role', allRoles: 'All', roles: { duelist: 'Duelist', initiator: 'Initiator', controller: 'Controller', sentinel: 'Sentinel' }, abilities: 'Abilities', placeAgent: 'Place agent', placeAbility: 'Place ability', tapMap: 'Click the map to place this ability', tapMapAgent: 'Click the map to place this agent', duplicateAgent: 'That agent is already on this side.', fullTeam: 'This side already has five agents.',
  },
  es: {
    boardEyebrow: 'PIZARRA TÁCTICA', boardTitle: 'Monta la ronda sobre el mapa', map: 'Mapa', toolbar: 'Herramientas', select: 'Mover', pen: 'Dibujar', arrow: 'Flecha', attacker: 'Ataque', defender: 'Defensa', spike: 'Spike', danger: 'Peligro', eraser: 'Borrar', color: 'Color de línea', rotateAbility: 'Girar habilidad', undo: 'Deshacer', redo: 'Rehacer', mapAlt: 'mapa táctico', canvasLabel: 'Pizarra táctica editable de VALORANT', emptyHint: 'Elige agente, habilidad, dibujo o flecha y usa el mapa.', quickStart: 'Empieza en 20 segundos', quickSteps: ['Elige bando y coloca los cinco agentes con sus habilidades.', 'Dibuja la ruta principal y la salida con colores distintos.', 'Exporta la imagen o compártela con el equipo.'], notes: 'Notas opcionales', notesPlaceholder: 'Primer contacto, utilidad, condición para cancelar…', export: 'Exportar PNG', exported: 'PNG exportado', share: 'Compartir con el equipo', shared: 'Pizarra compartida', linkCopied: 'Enlace de la pizarra copiado', clear: 'Limpiar mapa', localNote: 'Se guarda en este navegador. Cada mapa conserva su pizarra.', attackerShort: 'A', defenderShort: 'D', spikeShort: 'S',
    agentDock: 'Agentes y habilidades', chooseAgent: 'Elige qué colocar', chooseSide: 'Bando', filterRole: 'Filtrar agentes por rol', allRoles: 'Todos', roles: { duelist: 'Duelista', initiator: 'Iniciador', controller: 'Controlador', sentinel: 'Centinela' }, abilities: 'Habilidades', placeAgent: 'Colocar agente', placeAbility: 'Colocar habilidad', tapMap: 'Haz clic en el mapa para colocarla', tapMapAgent: 'Haz clic en el mapa para colocar al agente', duplicateAgent: 'Ese agente ya está en este bando.', fullTeam: 'Este bando ya tiene cinco agentes.',
  },
  'pt-BR': {
    boardEyebrow: 'PRANCHETA TÁTICA', boardTitle: 'Monte a rodada no mapa', map: 'Mapa', toolbar: 'Ferramentas', select: 'Mover', pen: 'Desenhar', arrow: 'Seta', attacker: 'Ataque', defender: 'Defesa', spike: 'Spike', danger: 'Perigo', eraser: 'Apagar', color: 'Cor da linha', rotateAbility: 'Girar habilidade', undo: 'Desfazer', redo: 'Refazer', mapAlt: 'mapa tático', canvasLabel: 'Prancheta tática editável do VALORANT', emptyHint: 'Escolha agente, habilidade, desenho ou seta e use o mapa.', quickStart: 'Comece em 20 segundos', quickSteps: ['Escolha o lado e posicione os cinco agentes e habilidades.', 'Desenhe a rota principal e a saída com cores diferentes.', 'Exporte a imagem ou compartilhe com o time.'], notes: 'Notas opcionais', notesPlaceholder: 'Primeiro contato, habilidade, condição para cancelar…', export: 'Exportar PNG', exported: 'PNG exportado', share: 'Compartilhar com o time', shared: 'Prancheta compartilhada', linkCopied: 'Link da prancheta copiado', clear: 'Limpar mapa', localNote: 'Salvo neste navegador. Cada mapa guarda sua prancheta.', attackerShort: 'A', defenderShort: 'D', spikeShort: 'S',
    agentDock: 'Agentes e habilidades', chooseAgent: 'Escolha o que colocar', chooseSide: 'Lado do time', filterRole: 'Filtrar agentes por função', allRoles: 'Todos', roles: { duelist: 'Duelista', initiator: 'Iniciador', controller: 'Controlador', sentinel: 'Sentinela' }, abilities: 'Habilidades', placeAgent: 'Posicionar agente', placeAbility: 'Posicionar habilidade', tapMap: 'Clique no mapa para posicionar', tapMapAgent: 'Clique no mapa para posicionar o agente', duplicateAgent: 'Esse agente já está neste lado.', fullTeam: 'Este lado já tem cinco agentes.',
  },
  'zh-CN': {
    boardEyebrow: '地图战术板', boardTitle: '直接在地图上安排这回合', map: '选择地图', toolbar: '战术板工具', select: '移动', pen: '画路线', arrow: '画箭头', attacker: '进攻方', defender: '防守方', spike: '爆能器', danger: '危险点', eraser: '橡皮擦', color: '路线颜色', rotateAbility: '旋转技能范围', undo: '撤销', redo: '重做', mapAlt: '战术地图', canvasLabel: '可编辑的无畏契约地图战术板', emptyHint: '先选特工、技能或画线工具，再直接操作地图。', quickStart: '20 秒上手', quickSteps: ['先选攻守方，再放五名特工和技能落点。', '主攻路线和转点路线用不同颜色。', '导出图片，或者直接发给队友。'], notes: '补充一句回合说明', notesPlaceholder: '第一波在哪接触、技能何时交、什么情况立刻转点……', export: '导出战术图', exported: '战术图已导出', share: '把战术发给队友', shared: '战术已发出', linkCopied: '战术链接已复制', clear: '清空这张地图', localNote: '自动保存在当前浏览器里，每张地图单独保存。', attackerShort: '攻', defenderShort: '守', spikeShort: '包',
    agentDock: '特工与技能', chooseAgent: '选择要放的内容', chooseSide: '选择阵营', filterRole: '按定位筛选特工', allRoles: '全部', roles: { duelist: '决斗', initiator: '先锋', controller: '控场', sentinel: '哨卫' }, abilities: '技能', placeAgent: '放置特工', placeAbility: '放置技能', tapMap: '点击地图放下这个技能', tapMapAgent: '点击地图放下这名特工', duplicateAgent: '这边已经有这名特工了。', fullTeam: '这边已经满五名特工了。',
  },
  ja: {
    boardEyebrow: '作戦ボード', boardTitle: 'マップ上でラウンドを組み立てる', map: 'マップ', toolbar: 'ボードツール', select: '移動', pen: 'ルート', arrow: '矢印', attacker: '攻撃', defender: '防衛', spike: 'スパイク', danger: '注意', eraser: '消去', color: 'ライン色', rotateAbility: 'アビリティ範囲を回転', undo: '元に戻す', redo: 'やり直す', mapAlt: '戦術マップ', canvasLabel: '編集できるVALORANTマップ作戦ボード', emptyHint: 'エージェント、アビリティ、描画ツールを選んでマップを操作。', quickStart: '20秒でスタート', quickSteps: ['攻守を選び、5人のエージェントとアビリティを配置します。', 'メインと撤退ルートを別の色で描きます。', '画像を書き出すかチームへ共有します。'], notes: 'ラウンドメモ（任意）', notesPlaceholder: '最初の接敵、スキルのタイミング、中止条件…', export: 'PNGを書き出す', exported: 'PNGを保存しました', share: 'チームへ共有', shared: '作戦を共有しました', linkCopied: '作戦リンクをコピーしました', clear: 'このマップを消去', localNote: 'このブラウザに自動保存。マップごとに別保存です。', attackerShort: '攻', defenderShort: '守', spikeShort: 'S',
    agentDock: 'エージェントとアビリティ', chooseAgent: '配置するものを選択', chooseSide: '攻守', filterRole: 'ロールで絞り込む', allRoles: 'すべて', roles: { duelist: 'デュエリスト', initiator: 'イニシエーター', controller: 'コントローラー', sentinel: 'センチネル' }, abilities: 'アビリティ', placeAgent: 'エージェントを配置', placeAbility: 'アビリティを配置', tapMap: 'マップをクリックして配置', tapMapAgent: 'マップをクリックしてエージェントを配置', duplicateAgent: 'このサイドには同じエージェントを置けません。', fullTeam: 'このサイドは5人そろっています。',
  },
}

export function playbookSeoCopy(locale) {
  return seo[locale] || seo.en
}

export function playbookUiCopy(locale) {
  return ui[locale] || ui.en
}
