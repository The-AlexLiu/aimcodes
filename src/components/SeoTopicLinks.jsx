import { createTranslator } from '../i18n/translations.js'
import { seoCopy } from '../seo/content.js'
import { collectionCopy } from '../seo/collectionContent.js'
import { DISCOVERABLE_COLLECTION_KEYS, routePath } from '../seo/routes.js'

export default function SeoTopicLinks({ locale, activeCollection, collectionKeys = DISCOVERABLE_COLLECTION_KEYS }) {
  const primary = collectionKeys.slice(0, 6)
  if (collectionKeys.includes(activeCollection) && !primary.includes(activeCollection)) primary[5] = activeCollection
  const more = collectionKeys.filter((key) => !primary.includes(key))
  const link = (collectionKey) => (
    <a
      className={activeCollection === collectionKey ? 'is-active' : ''}
      href={routePath(locale, { type: 'collection', collectionKey })}
      aria-current={activeCollection === collectionKey ? 'page' : undefined}
      key={collectionKey}
    >
      {collectionCopy(locale, collectionKey).label}
    </a>
  )
  return (
    <nav className="seo-topic-links" aria-label={seoCopy(locale).topics.title}>
      <span>{seoCopy(locale).topics.title}</span>
      <div>{primary.map(link)}</div>
      {more.length > 0 && <details>
        <summary>{createTranslator(locale)('nav.moreStyles')} ({more.length})</summary>
        <div className="additional-style-links">{more.map(link)}</div>
      </details>}
    </nav>
  )
}
