const copy = {
  en: {
    title: 'Choose your agent', eyebrow: 'VALORANT / AGENT DIRECTORY',
    intro: 'Find your main. Watch their abilities. Take a crosshair into your next match.',
    metaTitle: 'VALORANT Agents: Abilities & Themed Crosshairs | AimCodes',
    directory: 'The roster', all: 'All agents', search: 'Search agent names',
    results: 'agents', view: 'Explore agent', crosshair: 'Try the crosshair', preview: 'Preview agent',
    signature: 'THEMED CROSSHAIR', abilities: 'Abilities', clear: 'Clear filters',
    empty: 'No agents found. Try another name or role.', homeLink: 'Meet the agents',
    homeHint: 'Abilities, gameplay and a crosshair for every agent.',
    roles: { duelist: 'Duelist', initiator: 'Initiator', controller: 'Controller', sentinel: 'Sentinel' },
  },
  'zh-CN': {
    title: '选你的主角', eyebrow: '无畏契约 / 英雄图鉴',
    intro: '找到你的本命英雄，看懂技能，带上专属主题准星。',
    metaTitle: '无畏契约英雄图鉴：技能演示与主题准星 | AimCodes',
    directory: '全部英雄', all: '全部', search: '搜索中文名或英文名',
    results: '位英雄', view: '查看英雄', crosshair: '试用主题准星', preview: '预览英雄',
    signature: '专属主题准星', abilities: '技能', clear: '清除筛选',
    empty: '没找到这位英雄，试试其他名字或定位。', homeLink: '逛逛英雄图鉴',
    homeHint: '看技能演示，找本命英雄，试试专属主题准星。',
    roles: { duelist: '决斗', initiator: '先锋', controller: '控场', sentinel: '哨卫' },
  },
  ja: {
    title: 'エージェントを選ぼう', eyebrow: 'VALORANT / エージェント一覧',
    intro: 'お気に入りのエージェントを見つけよう。アビリティを見て、専用テーマのクロスヘアを試そう。',
    metaTitle: 'VALORANT エージェント一覧：アビリティとクロスヘア | AimCodes',
    directory: 'エージェント一覧', all: 'すべて', search: '日本語名・英語名で検索',
    results: 'エージェント', view: '詳細を見る', crosshair: 'クロスヘアを試す', preview: 'プレビュー',
    signature: 'テーマクロスヘア', abilities: 'アビリティ', clear: '絞り込みを解除',
    empty: '見つかりませんでした。別の名前やロールで試してください。', homeLink: 'エージェントを探す',
    homeHint: 'アビリティ映像と、各エージェントをイメージしたクロスヘア。',
    roles: { duelist: 'デュエリスト', initiator: 'イニシエーター', controller: 'コントローラー', sentinel: 'センチネル' },
  },
  es: {
    title: 'Elige a tu agente', eyebrow: 'VALORANT / AGENTES',
    intro: 'Encuentra a tu agente. Mira sus habilidades y prueba una mira temática en tu próxima partida.',
    metaTitle: 'Agentes de VALORANT: habilidades y miras temáticas | AimCodes',
    directory: 'Todos los agentes', all: 'Todos', search: 'Buscar agentes',
    results: 'agentes', view: 'Ver agente', crosshair: 'Probar la mira', preview: 'Vista previa',
    signature: 'MIRA TEMÁTICA', abilities: 'Habilidades', clear: 'Quitar filtros',
    empty: 'No se encontraron agentes. Prueba otro nombre o rol.', homeLink: 'Conoce a los agentes',
    homeHint: 'Habilidades, vídeos y una mira para cada agente.',
    roles: { duelist: 'Duelista', initiator: 'Iniciador', controller: 'Controlador', sentinel: 'Centinela' },
  },
  'pt-BR': {
    title: 'Escolha seu agente', eyebrow: 'VALORANT / AGENTES',
    intro: 'Encontre seu main. Veja as habilidades e leve uma mira temática para a próxima partida.',
    metaTitle: 'Agentes do VALORANT: habilidades e miras temáticas | AimCodes',
    directory: 'Todos os agentes', all: 'Todos', search: 'Buscar agentes',
    results: 'agentes', view: 'Ver agente', crosshair: 'Testar a mira', preview: 'Prévia do agente',
    signature: 'MIRA TEMÁTICA', abilities: 'Habilidades', clear: 'Limpar filtros',
    empty: 'Nenhum agente encontrado. Tente outro nome ou função.', homeLink: 'Conheça os agentes',
    homeHint: 'Habilidades, vídeos e uma mira para cada agente.',
    roles: { duelist: 'Duelista', initiator: 'Iniciador', controller: 'Controlador', sentinel: 'Sentinela' },
  },
}

export function agentsCopy(locale) {
  return copy[locale] || copy.en
}

export function agentsArticleCopy(locale) {
  const item = agentsCopy(locale)
  return { ...item, metaDescription: item.intro, summaryTitle: item.directory, summary: item.intro,
    sections: [], faq: [], sources: [], recommendedCrosshairIds: [], relatedArticleKeys: [],
    relatedCollectionKeys: [], relatedToolKeys: [], cta: item.view }
}
