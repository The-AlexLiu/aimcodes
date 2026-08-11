import { routePath } from '../seo/routes.js'
import { seoCopy } from '../seo/content.js'
import { importGuideDetails } from '../seo/importGuideDetails.js'

export default function ImportGuide({ locale }) {
  const content = seoCopy(locale).guide
  const details = importGuideDetails(locale)
  const faqLabel = { en: 'Common questions', es: 'Preguntas habituales', 'pt-BR': 'Dúvidas comuns', 'zh-CN': '大家常问' }[locale] || 'Common questions'
  return (
    <article className="guide-page">
      <header>
        <span>{content.eyebrow}</span>
        <h1>{content.title}</h1>
        <p>{content.intro}</p>
      </header>
      <section className="guide-quick-answer" aria-labelledby="guide-quick-answer-title">
        <span>{details.quickLabel}</span>
        <p id="guide-quick-answer-title">{details.quickAnswer}</p>
      </section>
      <ol className="guide-steps">
        {content.steps.map(([title, body], index) => (
          <li key={title}>
            <b>{String(index + 1).padStart(2, '0')}</b>
            <div><h2>{title}</h2><p>{body}</p></div>
          </li>
        ))}
      </ol>
      <section className="guide-extra">
        <h2>{details.moreTitle}</h2>
        <div className="guide-extra-grid">
          {details.sections.map((section) => (
            <article key={section.title}>
              <h3>{section.title}</h3>
              <p>{section.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="guide-faq">
        <span>{faqLabel}</span>
        {details.faq.map(([question, answer]) => (
          <details key={question}>
            <summary>{question}</summary>
            <p>{answer}</p>
          </details>
        ))}
      </section>
      <nav className="guide-related" aria-label={details.moreTitle}>
        <a href={routePath(locale, { type: 'article', articleKey: 'settings' })}>{seoCopy(locale).footer.settings}</a>
        <a href={routePath(locale, { type: 'article', articleKey: 'colors' })}>{seoCopy(locale).footer.colors}</a>
        <a href={routePath(locale, { type: 'collection', collectionKey: 'small' })}>{seoCopy(locale).footer.small}</a>
      </nav>
      <a className="primary-button guide-cta" href={routePath(locale, { type: 'catalog' })}>{content.cta}</a>
    </article>
  )
}
