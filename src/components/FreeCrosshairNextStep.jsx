import { freeSiteCopy } from '../i18n/freeSiteCopy.js'
import { routePath } from '../seo/routes.js'

export default function FreeCrosshairNextStep({ locale }) {
  const content = freeSiteCopy(locale)
  return <section className="seo-static-shell">
    <h2>{content.title}</h2>
    <p>{content.body}</p>
    <a className="primary-button" href={routePath(locale, { type: 'catalog' })}>{content.browse}</a>
  </section>
}
