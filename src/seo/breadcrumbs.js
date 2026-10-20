const labels = {
  en: { breadcrumb: 'Breadcrumb', agents: 'All agents', home: 'Home', crosshairs: 'Crosshairs', guides: 'Guides', tools: 'Tools' },
  es: { breadcrumb: 'Ruta de navegación', agents: 'Todos los agentes', home: 'Inicio', crosshairs: 'Miras', guides: 'Guías', tools: 'Herramientas' },
  'pt-BR': { breadcrumb: 'Navegação estrutural', agents: 'Todos os agentes', home: 'Início', crosshairs: 'Miras', guides: 'Guias', tools: 'Ferramentas' },
  'zh-CN': { breadcrumb: '当前位置', agents: '全部英雄', home: '首页', crosshairs: '找准星', guides: '准星指南', tools: '准星工具' },
  ja: { breadcrumb: 'パンくずリスト', agents: 'エージェント一覧', home: 'ホーム', crosshairs: 'クロスヘア', guides: 'ガイド', tools: 'ツール' },
}

export function breadcrumbCopy(locale) {
  return labels[locale] || labels.en
}
