import { articleCopy } from '../seo/articles.js'
import { collectionCopy } from '../seo/collectionContent.js'
import { seoToolCopy } from '../seo/toolContent.js'
import { routePath } from '../seo/routes.js'
import SeoBreadcrumbs from './SeoBreadcrumbs.jsx'

export default function SeoArticlePage({ locale, articleKey, crosshairs }) {
  const content = articleCopy(locale, articleKey)
  const labels = {
    en: { quick: 'Quick answer', related: 'Related AimCodes guides', import: 'Import and copy crosshair codes', sources: 'Official references', faq: 'Common questions', tryCodes: 'Try working codes', openTool: 'Open the tool' },
    es: { quick: 'Respuesta rápida', related: 'Guías relacionadas de AimCodes', import: 'Guía para importar y copiar miras', sources: 'Referencias oficiales', faq: 'Preguntas habituales', tryCodes: 'Probar códigos', openTool: 'Abrir la herramienta' },
    'pt-BR': { quick: 'Resposta rápida', related: 'Guias relacionados do AimCodes', import: 'Guia para importar e copiar miras', sources: 'Referências oficiais', faq: 'Dúvidas comuns', tryCodes: 'Testar códigos', openTool: 'Abrir a ferramenta' },
    'zh-CN': { quick: '先说结论', related: '接着看这些', import: '准星代码怎么导入和复制', sources: '官方资料', faq: '大家常问', tryCodes: '直接试代码', openTool: '打开工具' },
  }[locale]
  const recommended = content.recommendedCrosshairIds
    .map((id) => crosshairs.find((item) => item.id === id))
    .filter(Boolean)
  const fallbackArticleKeys = [articleKey === 'settings' ? 'colors' : 'settings']
  const relatedArticleKeys = content.relatedArticleKeys || fallbackArticleKeys
  const relatedCollectionKeys = content.relatedCollectionKeys || ['small']
  const relatedToolKeys = content.relatedToolKeys || []
  const quickCollectionKey = relatedCollectionKeys[0]
  const quickToolKey = relatedToolKeys[0]

  return (
    <article className="seo-article-page">
      <SeoBreadcrumbs locale={locale} section="guides" current={content.title} />
      <header className="seo-article-hero">
        <span>{content.eyebrow}</span>
        <h1>{content.title}</h1>
        <p>{content.intro}</p>
      </header>

      <aside className="seo-article-summary">
        <span>{labels.quick}</span>
        <div>
          {content.summaryTitle.trim().toLocaleLowerCase(locale) !== labels.quick.trim().toLocaleLowerCase(locale) && (
            <h2>{content.summaryTitle}</h2>
          )}
          <p>{content.summary}</p>
          {(quickCollectionKey || quickToolKey) && (
            <nav className="seo-article-quick-actions" aria-label={labels.quick}>
              {quickCollectionKey && (
                <a className="primary-button" href={routePath(locale, { type: 'collection', collectionKey: quickCollectionKey })}>
                  {labels.tryCodes}
                </a>
              )}
              {quickToolKey && (
                <a className="secondary-button" href={routePath(locale, { type: 'tool', toolKey: quickToolKey })}>
                  {labels.openTool}
                </a>
              )}
            </nav>
          )}
        </div>
      </aside>

      <div className="seo-article-sections">
        {content.sections.map((section, index) => (
          <section key={section.title} className="seo-article-section">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets?.length > 0 && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
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
        <span>{labels.faq}</span>
        <div>
          {content.faq.map(([question, answer]) => (
            <details key={question}>
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      {content.sources?.length > 0 && (
        <section className="seo-article-sources">
          <h2>{labels.sources}</h2>
          {content.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer">{source.label}</a>)}
        </section>
      )}

      <nav className="seo-article-related" aria-label={labels.related}>
        {relatedArticleKeys.filter((key) => key !== articleKey).map((key) => (
          <a key={`article-${key}`} href={routePath(locale, { type: 'article', articleKey: key })}>{articleCopy(locale, key).title}</a>
        ))}
        {relatedCollectionKeys.map((key) => (
          <a key={`collection-${key}`} href={routePath(locale, { type: 'collection', collectionKey: key })}>{collectionCopy(locale, key).title}</a>
        ))}
        {relatedToolKeys.map((key) => (
          <a key={`tool-${key}`} href={routePath(locale, { type: 'tool', toolKey: key })}>{seoToolCopy(locale, key).title}</a>
        ))}
        <a href={routePath(locale, { type: 'guide' })}>{labels.import}</a>
      </nav>
    </article>
  )
}
