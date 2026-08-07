import { localeRoutes } from '../i18n/localeRoutes.js'
import { crosshairSlug, routePath } from './routes.js'

export const SITE_ORIGIN = 'https://aimcodes.com'
export const OG_IMAGE_PATH = '/og-aimcodes.png'

const copy = {
  en: {
    home: {
      eyebrow: 'VALORANT CROSSHAIR LAB',
      title: 'VALORANT crosshair codes you can try before you copy',
      intro: 'Preview working crosshair codes on real map scenes, change the color, and copy the one that feels right.',
      primary: 'Browse all crosshairs',
      secondary: 'Take the reaction test',
      popular: 'Popular crosshair codes',
      popularBody: 'Start with pro-style essentials and a couple of playful picks.',
    },
    catalog: {
      eyebrow: '60+ WORKING CODES',
      title: 'Browse VALORANT crosshair codes',
      intro: 'Search by player or style, preview every shape, and copy a code straight into VALORANT.',
    },
    detail: {
      code: 'Crosshair code', copy: 'Copy code', bestFor: 'Best for', tradeoff: 'What to expect', settings: 'Key settings', import: 'Import in VALORANT', related: 'Try another crosshair', verified: 'Code checked',
      importSteps: ['Open Settings in VALORANT.', 'Choose Crosshair, then Import Profile Code.', 'Paste the code and save the new profile.'],
      defaultBest: 'Players who want a clear, repeatable reference point without covering the target.',
      defaultTradeoff: 'Test it on your usual resolution and map brightness before taking it into ranked.',
    },
    guide: {
      eyebrow: '60-SECOND SETUP',
      title: 'How to import a crosshair code in VALORANT',
      intro: 'Copy any code from AimCodes and add it to VALORANT in three quick steps.',
      steps: [
        ['Copy a code', 'Open a crosshair page on AimCodes and press Copy code.'],
        ['Open Crosshair settings', 'In VALORANT, open Settings → Crosshair and choose Import Profile Code.'],
        ['Paste and test', 'Paste the code, name the profile, and try it in the practice range before queueing.'],
      ],
      cta: 'Browse crosshair codes',
    },
    footer: { browse: 'Crosshair codes', finder: 'Reaction test', guide: 'Import guide', note: 'Built for faster crosshair testing.', social: 'Follow AimCodes' },
    notFound: { title: 'That crosshair missed', body: 'This page does not exist. Head back to the crosshair catalog and pick another one.', action: 'Browse crosshairs' },
    meta: {
      homeTitle: 'VALORANT Crosshair Codes & Live Preview | AimCodes',
      homeDescription: 'Preview working VALORANT crosshair codes on real maps, change colors, copy codes, and use a reaction test to find your next crosshair.',
      catalogTitle: 'VALORANT Crosshair Codes: Pro, Dot & Fun Picks | AimCodes',
      catalogDescription: 'Browse 60+ working VALORANT crosshair codes. Preview pro, dot, small, cute, and fun crosshairs, then copy any code in one click.',
      finderTitle: 'VALORANT Reaction Time Test & Crosshair Picker | AimCodes',
      finderDescription: 'Test your reaction time in three rounds, get a playful VALORANT rank, and receive one crosshair recommendation you can preview and copy.',
      guideTitle: 'How to Import a Crosshair Code in VALORANT | AimCodes',
      guideDescription: 'Learn how to copy and import a VALORANT crosshair profile code in three simple steps, then test the crosshair before your next match.',
    },
  },
  es: {
    home: {
      eyebrow: 'LABORATORIO DE MIRAS DE VALORANT',
      title: 'Códigos de mira de VALORANT para probar antes de copiar',
      intro: 'Prueba códigos que funcionan sobre mapas reales, cambia el color y copia la mira que más te guste.',
      primary: 'Ver todas las miras', secondary: 'Hacer la prueba de reacción', popular: 'Miras populares', popularBody: 'Empieza por miras de estilo profesional y algunas opciones divertidas.',
    },
    catalog: { eyebrow: 'MÁS DE 60 CÓDIGOS', title: 'Explora códigos de mira de VALORANT', intro: 'Busca por jugador o estilo, prueba cada forma y copia el código directamente en VALORANT.' },
    detail: {
      code: 'Código de mira', copy: 'Copiar código', bestFor: 'Ideal para', tradeoff: 'Qué puedes esperar', settings: 'Ajustes principales', import: 'Importar en VALORANT', related: 'Prueba otra mira', verified: 'Código revisado',
      importSteps: ['Abre los ajustes de VALORANT.', 'Entra en Mira y elige Importar código de perfil.', 'Pega el código y guarda el perfil.'],
      defaultBest: 'Jugadores que buscan una referencia clara y estable sin tapar al rival.', defaultTradeoff: 'Pruébala con tu resolución y el brillo habitual del mapa antes de usarla en competitivo.',
    },
    guide: {
      eyebrow: 'LISTO EN 60 SEGUNDOS', title: 'Cómo importar un código de mira en VALORANT', intro: 'Copia cualquier código de AimCodes y añádelo a VALORANT en tres pasos.',
      steps: [['Copia un código', 'Abre una mira en AimCodes y pulsa Copiar código.'], ['Abre los ajustes de mira', 'En VALORANT, abre Ajustes → Mira y elige Importar código de perfil.'], ['Pega y prueba', 'Pega el código, ponle un nombre y pruébalo en el campo de tiro antes de jugar.']], cta: 'Ver códigos de mira',
    },
    footer: { browse: 'Códigos de mira', finder: 'Prueba de reacción', guide: 'Guía de importación', note: 'Hecho para probar miras más rápido.', social: 'Sigue a AimCodes' },
    notFound: { title: 'Esta mira falló el tiro', body: 'La página no existe. Vuelve al catálogo y elige otra mira.', action: 'Ver miras' },
    meta: {
      homeTitle: 'Códigos de mira de VALORANT y vista previa | AimCodes', homeDescription: 'Prueba códigos de mira de VALORANT en mapas reales, cambia colores, copia códigos y encuentra tu próxima mira con una prueba de reacción.',
      catalogTitle: 'Códigos de mira de VALORANT: pros, puntos y más | AimCodes', catalogDescription: 'Explora más de 60 códigos de mira de VALORANT que funcionan. Prueba miras de pros, pequeñas, bonitas y originales y copia el código.',
      finderTitle: 'Prueba de reacción y selector de mira de VALORANT | AimCodes', finderDescription: 'Mide tu reacción en tres rondas, consigue un rango divertido de VALORANT y recibe una mira para probar y copiar.',
      guideTitle: 'Cómo importar un código de mira en VALORANT | AimCodes', guideDescription: 'Aprende a copiar e importar un código de perfil de mira de VALORANT en tres pasos y pruébalo antes de tu próxima partida.',
    },
  },
  'pt-BR': {
    home: {
      eyebrow: 'LABORATÓRIO DE MIRAS DO VALORANT', title: 'Códigos de mira do VALORANT para testar antes de copiar', intro: 'Teste códigos que funcionam em mapas reais, troque a cor e copie a mira que combina com você.', primary: 'Ver todas as miras', secondary: 'Fazer o teste de reação', popular: 'Miras populares', popularBody: 'Comece por opções de estilo profissional e algumas escolhas divertidas.',
    },
    catalog: { eyebrow: 'MAIS DE 60 CÓDIGOS', title: 'Explore códigos de mira do VALORANT', intro: 'Busque por jogador ou estilo, teste cada formato e copie o código direto para o VALORANT.' },
    detail: {
      code: 'Código da mira', copy: 'Copiar código', bestFor: 'Ideal para', tradeoff: 'O que esperar', settings: 'Ajustes principais', import: 'Importar no VALORANT', related: 'Teste outra mira', verified: 'Código verificado',
      importSteps: ['Abra as Configurações do VALORANT.', 'Entre em Mira e escolha Importar código de perfil.', 'Cole o código e salve o perfil.'],
      defaultBest: 'Jogadores que querem uma referência clara e estável sem esconder o alvo.', defaultTradeoff: 'Teste na sua resolução e no brilho normal dos mapas antes de levar para a ranqueada.',
    },
    guide: {
      eyebrow: 'PRONTO EM 60 SEGUNDOS', title: 'Como importar um código de mira no VALORANT', intro: 'Copie qualquer código do AimCodes e adicione ao VALORANT em três passos rápidos.',
      steps: [['Copie um código', 'Abra uma mira no AimCodes e toque em Copiar código.'], ['Abra as opções de mira', 'No VALORANT, abra Configurações → Mira e escolha Importar código de perfil.'], ['Cole e teste', 'Cole o código, dê um nome ao perfil e teste no campo de treino antes da partida.']], cta: 'Ver códigos de mira',
    },
    footer: { browse: 'Códigos de mira', finder: 'Teste de reação', guide: 'Guia de importação', note: 'Feito para testar miras mais rápido.', social: 'Siga a AimCodes' },
    notFound: { title: 'Essa mira errou o tiro', body: 'A página não existe. Volte ao catálogo e escolha outra mira.', action: 'Ver miras' },
    meta: {
      homeTitle: 'Códigos de mira do VALORANT e prévia ao vivo | AimCodes', homeDescription: 'Teste códigos de mira do VALORANT em mapas reais, troque cores, copie códigos e encontre sua próxima mira com um teste de reação.',
      catalogTitle: 'Códigos de mira do VALORANT: pro, ponto e diversão | AimCodes', catalogDescription: 'Explore mais de 60 códigos de mira do VALORANT que funcionam. Teste miras profissionais, pequenas, fofas e divertidas e copie o código.',
      finderTitle: 'Teste de reação e seletor de mira do VALORANT | AimCodes', finderDescription: 'Teste sua reação em três rodadas, receba um rank divertido do VALORANT e ganhe uma indicação de mira para testar e copiar.',
      guideTitle: 'Como importar um código de mira no VALORANT | AimCodes', guideDescription: 'Aprenda a copiar e importar um código de perfil de mira do VALORANT em três passos e teste antes da próxima partida.',
    },
  },
  'zh-CN': {
    home: {
      eyebrow: '无畏契约准星试用站', title: '先试效果，再复制无畏契约准星代码', intro: '把准星放进真实地图里看效果，换个顺眼的颜色，满意后直接复制代码。', primary: '查看全部准星', secondary: '测试反应速度', popular: '热门准星代码', popularBody: '先从职业选手风格和几款有趣准星开始试。',
    },
    catalog: { eyebrow: '60+ 个可用代码', title: '浏览无畏契约准星代码', intro: '按选手或样式搜索，在地图里试过效果后，直接复制到游戏。' },
    detail: {
      code: '准星代码', copy: '复制代码', bestFor: '适合谁', tradeoff: '用起来什么感觉', settings: '主要参数', import: '导入无畏契约', related: '再试一个准星', verified: '代码校验',
      importSteps: ['打开《无畏契约》设置。', '进入“准星”，点击“导入准星配置代码”。', '粘贴代码并保存新的准星方案。'],
      defaultBest: '想要中心明确、容易重复定位，同时不希望准星遮挡目标的玩家。', defaultTradeoff: '正式排位前，建议用自己的分辨率和常玩地图先试一局。',
    },
    guide: {
      eyebrow: '一分钟完成', title: '无畏契约准星代码怎么导入', intro: '从 AimCodes 复制任意准星代码，三步添加到游戏里。',
      steps: [['复制准星代码', '打开 AimCodes 的准星页面，点击“复制代码”。'], ['进入准星设置', '打开《无畏契约》设置，进入“准星”，选择“导入准星配置代码”。'], ['粘贴并试用', '粘贴代码、保存方案，先去训练场看看是否顺手。']], cta: '浏览准星代码',
    },
    footer: { browse: '准星代码', finder: '反应测试', guide: '导入教程', note: '让试准星这件事快一点。', social: '关注 AimCodes' },
    notFound: { title: '这枪空了', body: '这个页面不存在，回准星库再挑一个吧。', action: '返回准星库' },
    meta: {
      homeTitle: '无畏契约准星代码与地图预览 | AimCodes', homeDescription: '在真实地图中预览可用的无畏契约准星代码，自定义颜色，一键复制，还能通过反应测试找到更适合自己的准星。',
      catalogTitle: '无畏契约准星代码大全：职业、小点与趣味准星 | AimCodes', catalogDescription: '浏览 60 多个可用的无畏契约准星代码，预览职业同款、小圆点、小准星、可爱和整活样式，一键复制到游戏。',
      finderTitle: '无畏契约反应速度测试与准星推荐 | AimCodes', finderDescription: '完成三轮反应速度测试，看看自己的无畏契约反应段位，并获得一个可以直接预览和复制的准星推荐。',
      guideTitle: '无畏契约准星代码怎么导入 | AimCodes', guideDescription: '三步学会复制并导入无畏契约准星配置代码，保存方案后先去训练场测试，再带进下一局。',
    },
  },
}

const priorityDetails = {
  tenz: {
    en: ['Fast target switching and players who like a familiar open center.', 'Four short lines keep the head visible while giving you a clear center reference.'],
    es: ['Cambios rápidos de objetivo y jugadores que prefieren un centro abierto.', 'Cuatro líneas cortas dejan ver la cabeza y mantienen una referencia clara.'],
    'pt-BR': ['Trocas rápidas de alvo e quem prefere o centro aberto.', 'Quatro linhas curtas deixam a cabeça visível e mantêm uma referência clara.'],
    'zh-CN': ['适合喜欢中心留空、需要快速切换目标的玩家。', '四条短线不会挡住头线，同时又能给出明确的中心参照。'],
  },
  'aspas-dot': {
    en: ['Precise first shots and players who prefer a compact center dot.', 'The small dot leaves most of the target visible and is easy to place on a head line.'],
    es: ['Primeros disparos precisos y jugadores que prefieren un punto compacto.', 'El pequeño punto deja visible casi todo el objetivo y se coloca bien a la altura de la cabeza.'],
    'pt-BR': ['Primeiros tiros precisos e quem prefere um ponto compacto.', 'O pequeno ponto deixa quase todo o alvo visível e encaixa bem na linha da cabeça.'],
    'zh-CN': ['适合重视第一枪、喜欢紧凑中心点的玩家。', '小巧的中心点几乎不遮挡目标，很适合贴着头线移动。'],
  },
  forsaken: {
    en: ['Players who want a tiny sight and plenty of space around the target.', 'Minimal marks create a precise center without adding much visual noise.'],
    es: ['Jugadores que quieren una mira mínima y mucho espacio alrededor del objetivo.', 'Las pequeñas marcas señalan el centro sin añadir ruido visual.'],
    'pt-BR': ['Quem quer uma mira mínima e bastante espaço ao redor do alvo.', 'Marcas pequenas definem o centro sem adicionar ruído visual.'],
    'zh-CN': ['适合喜欢极小准星、希望目标周围保持干净的玩家。', '几条极短的线标出中心，不会给画面增加太多干扰。'],
  },
  demon1: {
    en: ['Calm crosshair placement and players who trust a simple center point.', 'A clean dot makes the exact center obvious with almost no extra shape.'],
    es: ['Colocación tranquila de la mira y jugadores que confían en un punto simple.', 'Un punto limpio marca el centro exacto sin formas innecesarias.'],
    'pt-BR': ['Posicionamento calmo e quem confia em um ponto central simples.', 'Um ponto limpo mostra o centro exato sem formatos extras.'],
    'zh-CN': ['适合准星预瞄稳定、习惯用简单中心点定位的玩家。', '干净的中心点直接标出位置，没有多余线条分散注意力。'],
  },
  'scream-dot': {
    en: ['One-tap practice and players who want a bold center with subtle support lines.', 'The center dot stays dominant while the short inner lines make it easier to reacquire.'],
    es: ['Práctica de un toque y jugadores que quieren un centro marcado con líneas discretas.', 'El punto central domina y las líneas cortas ayudan a recuperarlo rápidamente.'],
    'pt-BR': ['Treino de one tap e quem quer um centro marcante com linhas discretas.', 'O ponto central domina e as linhas curtas ajudam a encontrá-lo novamente.'],
    'zh-CN': ['适合练习单点，以及喜欢醒目中心但仍想保留短线参照的玩家。', '中心点足够突出，周围短线又能帮助视线快速找回准星。'],
  },
  less: {
    en: ['Controlled bursts and players who like a tight, closed center.', 'The compact shape is easy to track without taking much screen space.'],
    es: ['Ráfagas controladas y jugadores que prefieren un centro pequeño y cerrado.', 'La forma compacta se sigue con facilidad y ocupa poco espacio.'],
    'pt-BR': ['Rajadas controladas e quem prefere um centro pequeno e fechado.', 'O formato compacto é fácil de acompanhar e ocupa pouco espaço.'],
    'zh-CN': ['适合控制短点射，以及喜欢紧凑闭合中心的玩家。', '造型体积很小，移动时容易跟住，也不会占太多画面。'],
  },
  'cat-pink': {
    en: ['Casual games, clips, and players who want a playful crosshair that still has a center.', 'The blocks form a recognizable cat face while keeping the aiming point in the middle.'],
    es: ['Partidas casuales, clips y jugadores que quieren una mira divertida con un centro útil.', 'Los bloques forman una cara de gato reconocible y mantienen el punto de mira en el centro.'],
    'pt-BR': ['Partidas casuais, clipes e quem quer uma mira divertida sem perder o centro.', 'Os blocos formam um rosto de gato reconhecível e mantêm o ponto de mira no meio.'],
    'zh-CN': ['适合娱乐局、录制视频，以及想要有趣造型又不想丢掉中心点的玩家。', '线块能看出猫脸和耳朵，正中心仍然保留了瞄准位置。'],
  },
  'pig-pink': {
    en: ['Fun matches and players who want a bigger novelty crosshair with a clear middle.', 'Wide blocks create a pig face and snout, making it intentionally bold on screen.'],
    es: ['Partidas divertidas y jugadores que quieren una mira grande y original con un centro claro.', 'Los bloques forman la cara y el hocico de un cerdito y se ven muy marcados en pantalla.'],
    'pt-BR': ['Partidas divertidas e quem quer uma mira grande e diferente com centro claro.', 'Os blocos formam o rosto e o focinho de um porquinho e ficam bem marcantes na tela.'],
    'zh-CN': ['适合娱乐局，以及想要醒目整活造型、同时保留明确中心的玩家。', '宽大的线块拼出猪脸和猪鼻，画面存在感会比常规准星更强。'],
  },
}

export function seoCopy(locale) {
  return copy[locale] || copy.en
}

export function detailCopy(locale, crosshairId) {
  const localized = priorityDetails[crosshairId]?.[locale]
  const base = seoCopy(locale).detail
  return {
    bestFor: localized?.[0] || base.defaultBest,
    tradeoff: localized?.[1] || base.defaultTradeoff,
  }
}

export function routeMetadata(locale, route, crosshair) {
  const localized = seoCopy(locale)
  const canonical = `${SITE_ORIGIN}${routePath(locale, route)}`
  let title = localized.meta.homeTitle
  let description = localized.meta.homeDescription

  if (route.type === 'catalog') {
    title = localized.meta.catalogTitle
    description = localized.meta.catalogDescription
  } else if (route.type === 'finder') {
    title = localized.meta.finderTitle
    description = localized.meta.finderDescription
  } else if (route.type === 'guide') {
    title = localized.meta.guideTitle
    description = localized.meta.guideDescription
  } else if (route.type === 'crosshair' && crosshair) {
    const names = {
      en: `${crosshair.shortName} VALORANT Crosshair Code & Preview | AimCodes`,
      es: `${crosshair.shortName}: código de mira de VALORANT | AimCodes`,
      'pt-BR': `${crosshair.shortName}: código de mira do VALORANT | AimCodes`,
      'zh-CN': `${crosshair.shortName} 无畏契约准星代码与预览 | AimCodes`,
    }
    const descriptions = {
      en: `Preview the ${crosshair.shortName} VALORANT crosshair on real maps, change its color, and copy the working profile code in one click.`,
      es: `Prueba la mira ${crosshair.shortName} de VALORANT en mapas reales, cambia el color y copia el código de perfil en un clic.`,
      'pt-BR': `Teste a mira ${crosshair.shortName} do VALORANT em mapas reais, troque a cor e copie o código de perfil em um clique.`,
      'zh-CN': `在真实地图中预览 ${crosshair.shortName} 无畏契约准星，切换颜色并一键复制可用的准星配置代码。`,
    }
    title = names[locale] || names.en
    description = descriptions[locale] || descriptions.en
  } else if (route.type === 'notFound') {
    title = `${localized.notFound.title} | AimCodes`
    description = localized.notFound.body
  }

  return { title, description, canonical, image: `${SITE_ORIGIN}${OG_IMAGE_PATH}` }
}

export function alternateUrls(route) {
  return Object.entries(localeRoutes).map(([locale, config]) => ({
    locale,
    hreflang: config.hreflang,
    url: `${SITE_ORIGIN}${routePath(locale, route)}`,
  }))
}

export function crosshairUrl(locale, id) {
  return `${SITE_ORIGIN}${routePath(locale, { type: 'crosshair', crosshairId: id })}`
}

export function crosshairBreadcrumbName(locale, crosshair) {
  if (locale === 'zh-CN') return `${crosshair.shortName} 准星`
  if (locale === 'es') return `Mira ${crosshair.shortName}`
  if (locale === 'pt-BR') return `Mira ${crosshair.shortName}`
  return `${crosshair.shortName} crosshair`
}

export function pageSlug(route) {
  if (route.type === 'crosshair') return crosshairSlug(route.crosshairId)
  return route.type
}
