import { seoCopy } from '../seo/content.js'
import { collectionCopy } from '../seo/collectionContent.js'
import { routePath, SEO_COLLECTION_KEYS } from '../seo/routes.js'

export default function SeoTopicLinks({ locale, activeCollection }) {
  return (
    <nav className="seo-topic-links" aria-label={seoCopy(locale).topics.title}>
      <span>{seoCopy(locale).topics.title}</span>
      <div>
        {SEO_COLLECTION_KEYS.map((collectionKey) => (
          <a
            className={activeCollection === collectionKey ? 'is-active' : ''}
            href={routePath(locale, { type: 'collection', collectionKey })}
            aria-current={activeCollection === collectionKey ? 'page' : undefined}
            key={collectionKey}
          >
            {collectionCopy(locale, collectionKey).label}
          </a>
        ))}
      </div>
    </nav>
  )
}
