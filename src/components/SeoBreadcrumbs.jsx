import { routePath } from '../seo/routes.js'

const labels = {
  en: { home: 'Home', crosshairs: 'Crosshairs', guides: 'Guides', tools: 'Tools' },
  es: { home: 'Inicio', crosshairs: 'Miras', guides: 'Guías', tools: 'Herramientas' },
  'pt-BR': { home: 'Início', crosshairs: 'Miras', guides: 'Guias', tools: 'Ferramentas' },
  'zh-CN': { home: '首页', crosshairs: '找准星', guides: '准星指南', tools: '准星工具' },
}

export default function SeoBreadcrumbs({ locale, section, current }) {
  const copy = labels[locale] || labels.en
  const sectionConfig = {
    crosshairs: { label: copy.crosshairs, route: { type: 'catalog' } },
    guides: { label: copy.guides, route: { type: 'article', articleKey: 'settings' } },
    tools: { label: copy.tools, route: { type: 'tool', toolKey: 'generator' } },
  }[section]

  return (
    <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
      <a href={routePath(locale, { type: 'home' })}>{copy.home}</a>
      {sectionConfig && (
        <>
          <span aria-hidden="true">/</span>
          <a href={routePath(locale, sectionConfig.route)}>{sectionConfig.label}</a>
        </>
      )}
      <span aria-hidden="true">/</span>
      <span aria-current="page">{current}</span>
    </nav>
  )
}
