import { routePath } from '../seo/routes.js'
import { seoCopy } from '../seo/content.js'
import SeoTopicLinks from './SeoTopicLinks.jsx'

export default function SeoPageIntro({ locale, type = 'home', t }) {
  const content = seoCopy(locale)[type]
  if (!content) return null

  return (
    <section className={`seo-page-intro is-${type}`}>
      <div className="seo-intro-copy">
        <span className="seo-intro-eyebrow">{content.eyebrow}</span>
        <h1>{content.title}</h1>
        <p>{content.intro}</p>
        {type === 'catalog' && t && (
          <a className="catalog-reaction-cta" href={routePath(locale, { type: 'finder' })}>
            <strong>{t('finder.title')}</strong>
            <span className="catalog-reaction-cta-body">{t('finder.testBriefLabel')} · {t('finder.testDuration')}</span>
            <span className="catalog-reaction-cta-action">{t('nav.finder')} →</span>
          </a>
        )}
        {type === 'home' && (
          <div className="seo-intro-actions">
            <a className="primary-button" href="#preview">{content.tryNow}</a>
            <a className="secondary-button" href={routePath(locale, { type: 'catalog' })}>{content.primary}</a>
          </div>
        )}
      </div>
      {type === 'home' && (
        <div className="home-hero-visual" aria-hidden="true" />
      )}
      {type !== 'home' && type !== 'catalog' && <SeoTopicLinks locale={locale} />}
    </section>
  )
}
