import { entryHelp } from '../seo/entryHelp.js'
import { routePath } from '../seo/routes.js'

export default function SeoEntryHelp({ locale }) {
  const copy = entryHelp(locale)
  return (
    <section className="seo-entry-help">
      <h2>{copy.title}</h2>
      <p>{copy.body} <a href={routePath(locale, { type: 'guide' })}>{copy.link}</a></p>
    </section>
  )
}
