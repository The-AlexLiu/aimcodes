import { routePath } from '../seo/routes.js'
import { breadcrumbCopy } from '../seo/breadcrumbs.js'

export default function SeoBreadcrumbs({ locale, section, current }) {
  const copy = breadcrumbCopy(locale)
  const sectionConfig = {
    agents: { label: copy.agents, route: { type: 'agents' } },
    crosshairs: { label: copy.crosshairs, route: { type: 'catalog' } },
    guides: { label: copy.guides, route: { type: 'article', articleKey: 'settings' } },
    tools: { label: copy.tools, route: { type: 'tool', toolKey: 'generator' } },
  }[section]

  return (
    <nav className="seo-breadcrumbs" aria-label={copy.breadcrumb}>
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
