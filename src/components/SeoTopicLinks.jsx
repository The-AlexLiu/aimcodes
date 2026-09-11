import { seoCopy } from '../seo/content.js'
import { collectionCopy } from '../seo/collectionContent.js'
import { DISCOVERABLE_COLLECTION_KEYS, routePath } from '../seo/routes.js'

export default function SeoTopicLinks({ locale, activeCollection, collectionKeys = DISCOVERABLE_COLLECTION_KEYS }) {
  return (
    <nav className="seo-topic-links" aria-label={seoCopy(locale).topics.title}>
      <span>{seoCopy(locale).topics.title}</span>
      <div>
        {collectionKeys.map((collectionKey) => (
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
