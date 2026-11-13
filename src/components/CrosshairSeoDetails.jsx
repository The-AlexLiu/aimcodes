import { crosshairSettingRows } from '../seo/crosshairSettings.js'
import { detailCopy, seoCopy } from '../seo/content.js'
import { collectionCopy } from '../seo/collectionContent.js'
import { collectionKeysForCrosshair, routePath } from '../seo/routes.js'
import SeoTopicLinks from './SeoTopicLinks.jsx'
import { reviewCopy } from '../seo/octoberReviewContent.js'

const sourceLabels = Object.freeze({
  en: 'Code source',
  es: 'Fuente del código',
  'pt-BR': 'Fonte do código',
  'zh-CN': '代码来源',
  ja: 'コードの出典',
})

export default function CrosshairSeoDetails({ crosshair, locale }) {
  const labels = seoCopy(locale).detail
  const details = detailCopy(locale, crosshair)
  const rows = crosshairSettingRows(crosshair, locale)
  const relatedCollections = collectionKeysForCrosshair(crosshair.id)

  return (
    <section className="seo-detail-content" aria-label={labels.code}>
      <div className="seo-code-panel">
        <div>
          <span>{labels.code}</span>
          <code title={crosshair.code}>{crosshair.code}</code>
        </div>
      </div>
      {crosshair.sourceUrl && crosshair.sourceName && (
        <p className="seo-detail-source">
          <span>{sourceLabels[locale] || sourceLabels.en}</span>
          <a href={crosshair.sourceUrl} target="_blank" rel="noreferrer">{crosshair.sourceName}</a>
          {crosshair.sourceCheckedAt && <>
            <span>{reviewCopy(locale).sourceDate}: <time dateTime={crosshair.sourceCheckedAt}>{crosshair.sourceCheckedAt}</time></span>
            <span>{reviewCopy(locale).sourceNote}</span>
          </>}
        </p>
      )}

      <div className="seo-detail-grid">
        <article>
          <h2>{labels.bestFor}</h2>
          <p>{details.bestFor}</p>
        </article>
        <article>
          <h2>{labels.tradeoff}</h2>
          <p>{details.tradeoff}</p>
        </article>
        <article>
          <h2>{labels.settings}</h2>
          <dl>
            {rows.map(([name, value]) => <div key={name}><dt>{name}</dt><dd>{value}</dd></div>)}
          </dl>
        </article>
        <article>
          <h2>{labels.import}</h2>
          <ol>{labels.importSteps.map((step) => <li key={step}>{step}</li>)}</ol>
        </article>
      </div>
      {relatedCollections.length > 0 && (
        <nav className="seo-detail-context" aria-label={labels.compareStyle}>
          <span>{labels.compareStyle}</span>
          <div>
            {relatedCollections.map((collectionKey) => (
              <a href={routePath(locale, { type: 'collection', collectionKey })} key={collectionKey}>
                {collectionCopy(locale, collectionKey).label}
              </a>
            ))}
          </div>
        </nav>
      )}
      <SeoTopicLinks locale={locale} />
    </section>
  )
}
