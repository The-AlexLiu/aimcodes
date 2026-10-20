import { routePath } from '../seo/routes.js'
import { collectionCopy } from '../seo/collectionContent.js'
import SeoTopicLinks from './SeoTopicLinks.jsx'
import SeoBreadcrumbs from './SeoBreadcrumbs.jsx'

export default function SeoCollectionIntro({ locale, collectionKey, crosshairs, copiedId, onCopy, t }) {
  const content = collectionCopy(locale, collectionKey)

  return (
    <section className={`seo-page-intro is-collection${collectionKey === 'funny' ? ' is-funny' : ''}`}>
      <SeoBreadcrumbs locale={locale} section="crosshairs" current={content.title} />

      <h1>{content.title}</h1>
      <p>{content.intro}</p>
      {content.quickPicks?.length > 0 && (
        <section className="seo-quick-picks" aria-label={content.quickPicksTitle}>
          <h2>{content.quickPicksTitle}</h2>
          <ul>{content.quickPicks.map((pick) => {
            const crosshair = collectionKey === 'best' && crosshairs.find((item) => item.id === pick.id)
            const copied = copiedId === pick.id
            return (
              <li key={pick.id}>
                <div className={crosshair ? 'seo-quick-pick-actions' : undefined}>
                  <a href={routePath(locale, { type: 'crosshair', crosshairId: pick.id })}>{pick.label}</a>
                  {crosshair && (
                    <button
                      className="secondary-button"
                      type="button"
                      aria-label={t(copied ? 'card.copied' : 'card.copy', { name: crosshair.name })}
                      onClick={() => onCopy(crosshair, { interactionSource: 'catalog_card' })}
                    >
                      {t(copied ? 'actions.copiedShort' : 'actions.copyShort')}
                    </button>
                  )}
                </div>
                <span>{pick.reason}</span>
              </li>
            )
          })}</ul>
        </section>
      )}
      <SeoTopicLinks locale={locale} activeCollection={collectionKey} collectionKeys={content.introCollectionKeys} />
    </section>
  )
}
