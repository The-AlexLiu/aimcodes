import { TRUST_UPDATED_AT, trustCopy } from '../seo/trustContent.js'
import { routePath, TRUST_PAGE_KEYS } from '../seo/routes.js'

export default function TrustPage({ locale, pageKey }) {
  const content = trustCopy(locale, pageKey)

  return (
    <article className="trust-page">
      <header className="trust-hero">
        <span>{content.eyebrow}</span>
        <h1>{content.title}</h1>
        <p>{content.intro}</p>
        <time dateTime={TRUST_UPDATED_AT}>{content.updated}: {TRUST_UPDATED_AT}</time>
      </header>

      <div className="trust-sections">
        {content.sections.map((section, index) => (
          <section key={section.title} className="trust-section">
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets?.length > 0 && (
                <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>
              )}
              {section.links?.length > 0 && (
                <div className="trust-links">
                  {section.links.map((link) => (
                    <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      <nav className="trust-related" aria-label={content.related}>
        <span>{content.related}</span>
        <div>
          {TRUST_PAGE_KEYS.filter((key) => key !== pageKey).map((key) => (
            <a key={key} href={routePath(locale, { type: 'trust', pageKey: key })}>{trustCopy(locale, key).title}</a>
          ))}
          <a href={routePath(locale, { type: 'catalog' })}>{content.back}</a>
        </div>
      </nav>
    </article>
  )
}
