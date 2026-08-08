import { collectionCopy } from '../seo/content.js'

export default function SeoCollectionDetails({ locale, collectionKey }) {
  const content = collectionCopy(locale, collectionKey)

  return (
    <section className="seo-collection-details">
      <div className="seo-collection-copy">
        {content.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <div className="seo-faq">
        <h2>FAQ</h2>
        {content.faq.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  )
}
