import { routePath } from '../seo/routes.js'
import { seoCopy } from '../seo/content.js'
import SeoTopicLinks from './SeoTopicLinks.jsx'

export default function SeoPageIntro({ locale, type = 'home' }) {
  const content = seoCopy(locale)[type]
  if (!content) return null

  return (
    <section className={`seo-page-intro is-${type}`}>
      {type !== 'home' && <span>{content.eyebrow}</span>}
      <h1>{content.title}</h1>
      <p>{content.intro}</p>
      {type === 'home' && (
        <div className="seo-intro-actions">
          <a className="primary-button" href={routePath(locale, { type: 'catalog' })}>{content.primary}</a>
          <a className="secondary-button" href={routePath(locale, { type: 'finder' })}>{content.secondary}</a>
        </div>
      )}
      {type !== 'home' && <SeoTopicLinks locale={locale} />}
    </section>
  )
}
