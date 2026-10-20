const copy = {
  en: {
    eyebrow: 'VALORANT / AGENTS',
    pause: 'Pause', resume: 'Resume',
    browseHint: 'Auto-scroll · Hover to pause', previous: 'Previous agents', next: 'Next agents',
    nav: 'Agents', title: 'VALORANT agents', homeTitle: 'Agent abilities & themed crosshairs',
    intro: 'Watch ability demos and try a crosshair inspired by your agent.',
    all: 'All agents', viewAll: 'View all agents', search: 'Find an agent', placeholder: 'Agent name, e.g. Jett',
    filter: 'Filter by role', results: '{count} agents', empty: 'No agents found. Try another name or role.', clear: 'Clear filters', home: 'Home',
    roles: { duelist: 'Duelist', initiator: 'Initiator', controller: 'Controller', sentinel: 'Sentinel' },
  },
  'zh-CN': {
    eyebrow: '无畏契约 / 英雄图鉴',
    pause: '暂停', resume: '继续',
    browseHint: '自动漫游 · 悬停暂停', previous: '上一组英雄', next: '下一组英雄',
    nav: '英雄', title: '无畏契约英雄', homeTitle: '英雄技能与主题准星',
    intro: '看技能演示，试试英雄主题准星。',
    all: '全部', viewAll: '查看全部英雄', search: '找英雄', placeholder: '输入英雄名字，如捷风 / Jett',
    filter: '按职责筛选', results: '{count} 位英雄', empty: '没有找到英雄，换个名字或职责试试。', clear: '清除筛选', home: '首页',
    roles: { duelist: '决斗', initiator: '先锋', controller: '控场', sentinel: '哨卫' },
  },
  ja: {
    eyebrow: 'VALORANT / エージェント',
    pause: '一時停止', resume: '再開',
    browseHint: '自動スクロール · ホバーで一時停止', previous: '前のエージェント', next: '次のエージェント',
    nav: 'エージェント', title: 'VALORANTエージェント', homeTitle: 'アビリティとテーマクロスヘア',
    intro: 'アビリティ動画を見て、エージェントをモチーフにしたクロスヘアを試そう。',
    all: 'すべて', viewAll: '全エージェントを見る', search: 'エージェントを探す', placeholder: '名前を入力（例：ジェット / Jett）',
    filter: 'ロールで絞り込む', results: '{count}エージェント', empty: '見つかりませんでした。名前やロールを変えてみてください。', clear: '絞り込みを解除', home: 'ホーム',
    roles: { duelist: 'デュエリスト', initiator: 'イニシエーター', controller: 'コントローラー', sentinel: 'センチネル' },
  },
  es: {
    eyebrow: 'VALORANT / AGENTES',
    pause: 'Pausar', resume: 'Continuar',
    browseHint: 'Desplazamiento automático · Pausa al pasar el cursor', previous: 'Agentes anteriores', next: 'Agentes siguientes',
    nav: 'Agentes', title: 'Agentes de VALORANT', homeTitle: 'Habilidades y miras de agentes',
    intro: 'Mira sus habilidades en acción y prueba una mira inspirada en tu agente.',
    all: 'Todos', viewAll: 'Ver todos los agentes', search: 'Buscar agente', placeholder: 'Nombre del agente, p. ej. Jett',
    filter: 'Filtrar por rol', results: '{count} agentes', empty: 'No encontramos agentes. Prueba otro nombre o rol.', clear: 'Borrar filtros', home: 'Inicio',
    roles: { duelist: 'Duelista', initiator: 'Iniciador', controller: 'Controlador', sentinel: 'Centinela' },
  },
  'pt-BR': {
    eyebrow: 'VALORANT / AGENTES',
    pause: 'Pausar', resume: 'Continuar',
    browseHint: 'Rolagem automática · Pause ao passar o cursor', previous: 'Agentes anteriores', next: 'Próximos agentes',
    nav: 'Agentes', title: 'Agentes do VALORANT', homeTitle: 'Habilidades e miras de agentes',
    intro: 'Veja as habilidades em ação e teste uma mira inspirada no seu agente.',
    all: 'Todos', viewAll: 'Ver todos os agentes', search: 'Buscar agente', placeholder: 'Nome do agente, ex.: Jett',
    filter: 'Filtrar por função', results: '{count} agentes', empty: 'Nenhum agente encontrado. Tente outro nome ou função.', clear: 'Limpar filtros', home: 'Início',
    roles: { duelist: 'Duelista', initiator: 'Iniciador', controller: 'Controlador', sentinel: 'Sentinela' },
  },
}

export function agentsCopy(locale) {
  return copy[locale] || copy.en
}
