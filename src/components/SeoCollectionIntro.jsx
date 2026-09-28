import { routePath } from '../seo/routes.js'
import { collectionCopy } from '../seo/collectionContent.js'
import SeoTopicLinks from './SeoTopicLinks.jsx'
import SeoBreadcrumbs from './SeoBreadcrumbs.jsx'

export default function SeoCollectionIntro({ locale, collectionKey }) {
  const content = collectionCopy(locale, collectionKey)

  return (
    <section className={`seo-page-intro is-collection${collectionKey === 'funny' ? ' is-funny' : ''}`}>
      <SeoBreadcrumbs locale={locale} section="crosshairs" current={content.title} />
      <span>{content.eyebrow}</span>
      <h1>{content.title}</h1>
      <p>{content.intro}</p>
      {content.quickPicks?.length > 0 && (
        <section className="seo-quick-picks" aria-label={content.quickPicksTitle}>
          <h2>{content.quickPicksTitle}</h2>
          <ul>{content.quickPicks.map((pick) => (
            <li key={pick.id}>
              <a href={routePath(locale, { type: 'crosshair', crosshairId: pick.id })}>{pick.label}</a>
              <span>{pick.reason}</span>
            </li>
          ))}</ul>
        </section>
      )}
      <SeoTopicLinks locale={locale} activeCollection={collectionKey} collectionKeys={content.introCollectionKeys} />
    </section>
  )
}
