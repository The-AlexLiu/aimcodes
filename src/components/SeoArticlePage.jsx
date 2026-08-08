import { articleCopy } from '../seo/articles.js'
import { routePath } from '../seo/routes.js'

export default function SeoArticlePage({ locale, articleKey, crosshairs }) {
  const content = articleCopy(locale, articleKey)
  const labels = {
    en: { quick: 'Quick answer', related: 'Related AimCodes guides', import: 'Import and copy crosshair codes', small: 'Small crosshair codes' },
    es: { quick: 'Respuesta rápida', related: 'Guías relacionadas de AimCodes', import: 'Guía para importar y copiar miras', small: 'Miras pequeñas' },
    'pt-BR': { quick: 'Resposta rápida', related: 'Guias relacionados do AimCodes', import: 'Guia para importar e copiar miras', small: 'Miras pequenas' },
    'zh-CN': { quick: '快速结论', related: 'AimCodes 相关指南', import: '准星代码导入与复制指南', small: '小准星代码' },
  }[locale]
  const recommended = content.recommendedCrosshairIds
    .map((id) => crosshairs.find((item) => item.id === id))
    .filter(Boolean)
  const otherArticleKey = articleKey === 'settings' ? 'colors' : 'settings'
  const otherArticle = articleCopy(locale, otherArticleKey)

  return (
    <article className="seo-article-page">
      <header className="seo-article-hero">
        <span>{content.eyebrow}</span>
        <h1>{content.title}</h1>
        <p>{content.intro}</p>
      </header>

      <aside className="seo-article-summary">
        <span>{labels.quick}</span>
        <div>
          <h2>{content.summaryTitle}</h2>
          <p>{content.summary}</p>
        </div>
      </aside>

      <div className="seo-article-sections">
        {content.sections.map((section, index) => (
          <section key={section.title} className="seo-article-section">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
            </div>
          </section>
        ))}
      </div>

      <section className="seo-article-recommendations">
        <div>
          <span>AIMCODES</span>
          <h2>{content.cta}</h2>
        </div>
        <div className="seo-article-link-grid">
          {recommended.map((crosshair) => (
            <a key={crosshair.id} href={routePath(locale, { type: 'crosshair', crosshairId: crosshair.id })}>
              <strong>{crosshair.shortName}</strong>
              <span>{crosshair.description}</span>
            </a>
          ))}
        </div>
        <a className="primary-button guide-cta" href={routePath(locale, { type: 'catalog' })}>{content.cta}</a>
      </section>

      <section className="seo-article-faq">
        <span>FAQ</span>
        <div>
          {content.faq.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <nav className="seo-article-related" aria-label={labels.related}>
        <a href={routePath(locale, { type: 'article', articleKey: otherArticleKey })}>{otherArticle.title}</a>
        <a href={routePath(locale, { type: 'guide' })}>{labels.import}</a>
        <a href={routePath(locale, { type: 'collection', collectionKey: 'small' })}>{labels.small}</a>
      </nav>
    </article>
  )
}
