import { collectionCopy } from '../seo/content.js'
import { articleCopy } from '../seo/articles.js'
import { seoToolCopy } from '../seo/toolContent.js'
import { routePath } from '../seo/routes.js'

export default function SeoCollectionDetails({ locale, collectionKey }) {
  const content = collectionCopy(locale, collectionKey)
  const relatedGuides = (content.relatedArticleKeys || []).map((articleKey) => ({
    key: articleKey,
    href: routePath(locale, { type: 'article', articleKey }),
    label: articleCopy(locale, articleKey).title,
  }))
  const relatedTools = (content.relatedToolKeys || []).map((toolKey) => ({
    key: toolKey,
    href: routePath(locale, { type: 'tool', toolKey }),
    label: seoToolCopy(locale, toolKey).title,
  }))
  const relatedLabel = {
    en: 'Keep exploring', es: 'Sigue explorando', 'pt-BR': 'Continue explorando', 'zh-CN': '继续试准星',
  }[locale] || 'Keep exploring'
  const faqLabel = {
    en: 'Common questions', es: 'Preguntas habituales', 'pt-BR': 'Dúvidas comuns', 'zh-CN': '大家常问',
  }[locale] || 'Common questions'

  return (
    <section className="seo-collection-details">
      <div className="seo-collection-copy">
        {content.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      {content.selection?.length > 0 && (
        <section className="seo-collection-method">
          <h2>{content.selectionTitle}</h2>
          {Array.isArray(content.selection)
            ? <ul>{content.selection.map((item) => <li key={item}>{item}</li>)}</ul>
            : <p>{content.selection}</p>}
        </section>
      )}
      {content.settings?.length > 0 && (
        <section className="seo-collection-method">
          <h2>{content.settingsTitle}</h2>
          <ul>{content.settings.map((item) => <li key={item}>{item}</li>)}</ul>
        </section>
      )}
      <div className="seo-faq">
        <h2>{faqLabel}</h2>
        {content.faq.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
      {(relatedGuides.length > 0 || relatedTools.length > 0) && (
        <nav className="seo-context-links" aria-label={relatedLabel}>
          <h2>{relatedLabel}</h2>
          <div>
            {[...relatedGuides, ...relatedTools].map((item) => <a key={item.key} href={item.href}>{item.label}</a>)}
          </div>
        </nav>
      )}
    </section>
  )
}
