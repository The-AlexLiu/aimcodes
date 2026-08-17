import { collectionCopy } from '../seo/collectionContent.js'
import SeoTopicLinks from './SeoTopicLinks.jsx'
import SeoBreadcrumbs from './SeoBreadcrumbs.jsx'

export default function SeoCollectionIntro({ locale, collectionKey }) {
  const content = collectionCopy(locale, collectionKey)

  return (
    <section className="seo-page-intro is-collection">
      <SeoBreadcrumbs locale={locale} section="crosshairs" current={content.title} />
      <span>{content.eyebrow}</span>
      <h1>{content.title}</h1>
      <p>{content.intro}</p>
      <SeoTopicLinks locale={locale} activeCollection={collectionKey} />
    </section>
  )
}
