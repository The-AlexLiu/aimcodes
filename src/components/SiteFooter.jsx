import { routePath } from '../seo/routes.js'
import { seoCopy } from '../seo/content.js'

export default function SiteFooter({ locale }) {
  const content = seoCopy(locale).footer
  return (
    <footer className="site-footer">
      <a className="site-footer-brand" href={routePath(locale, { type: 'home' })}>AimCodes</a>
      <p>{content.note}</p>
      <nav aria-label="AimCodes">
        <a href={routePath(locale, { type: 'catalog' })}>{content.browse}</a>
        <a href={routePath(locale, { type: 'finder' })}>{content.finder}</a>
        <a href={routePath(locale, { type: 'guide' })}>{content.guide}</a>
      </nav>
    </footer>
  )
}
