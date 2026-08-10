import { publisherCopy } from '../seo/publisherContent.js'
import { routePath } from '../seo/routes.js'

export default function PublisherValueSection({ locale, type }) {
  const content = publisherCopy(locale, type)
  const links = {
    en: ['See how we check the codes', 'How to import a code'],
    es: ['Mira cómo comprobamos los códigos', 'Cómo importar un código'],
    'pt-BR': ['Veja como a gente confere os códigos', 'Como importar um código'],
    'zh-CN': ['看看我们怎么筛代码', '准星代码怎么导入'],
  }[locale]

  return (
    <section className="publisher-value-section">
      <header>
        <span>{content.eyebrow}</span>
        <h2>{content.title}</h2>
        <p>{content.intro}</p>
      </header>
      <div className="publisher-value-grid">
        {content.cards.map(([title, body], index) => (
          <article key={title}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </div>
      <nav aria-label={content.title}>
        <a href={routePath(locale, { type: 'trust', pageKey: 'about' })}>{links[0]}</a>
        <a href={routePath(locale, { type: 'guide' })}>{links[1]}</a>
      </nav>
    </section>
  )
}
