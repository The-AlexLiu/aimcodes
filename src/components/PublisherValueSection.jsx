import { publisherCopy } from '../seo/publisherContent.js'
import { routePath } from '../seo/routes.js'

export default function PublisherValueSection({ locale, type }) {
  const content = publisherCopy(locale, type)
  const links = {
    en: ['Read how AimCodes reviews codes', 'Open the import guide'],
    es: ['Cómo revisa AimCodes los códigos', 'Abrir la guía de importación'],
    'pt-BR': ['Como o AimCodes revisa códigos', 'Abrir o guia de importação'],
    'zh-CN': ['查看 AimCodes 如何检查代码', '打开准星导入教程'],
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
