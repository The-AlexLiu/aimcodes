import { collectionCopy } from '../seo/content.js'
import SeoTopicLinks from './SeoTopicLinks.jsx'

export default function SeoCollectionIntro({ locale, collectionKey }) {
  const content = collectionCopy(locale, collectionKey)

  return (
    <section className="seo-page-intro is-collection">
      <span>{content.eyebrow}</span>
      <h1>{content.title}</h1>
      <p>{content.intro}</p>
      <SeoTopicLinks locale={locale} activeCollection={collectionKey} />
    </section>
  )
}
