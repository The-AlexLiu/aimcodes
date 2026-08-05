import { routePath } from '../seo/routes.js'
import { seoCopy } from '../seo/content.js'

export default function ImportGuide({ locale }) {
  const content = seoCopy(locale).guide
  return (
    <article className="guide-page">
      <header>
        <span>{content.eyebrow}</span>
        <h1>{content.title}</h1>
        <p>{content.intro}</p>
      </header>
      <ol className="guide-steps">
        {content.steps.map(([title, body], index) => (
          <li key={title}>
            <b>{String(index + 1).padStart(2, '0')}</b>
            <div><h2>{title}</h2><p>{body}</p></div>
          </li>
        ))}
      </ol>
      <a className="primary-button guide-cta" href={routePath(locale, { type: 'catalog' })}>{content.cta}</a>
    </article>
  )
}
