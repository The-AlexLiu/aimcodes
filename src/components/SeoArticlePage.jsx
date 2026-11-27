import { lazy } from 'react'
import CrosshairCard from './CrosshairCard.jsx'
import './agentDirectory.css'
import { guideArticleCopy } from '../seo/articles.js'
import { collectionCopy } from '../seo/collectionContent.js'
import { seoToolCopy } from '../seo/toolContent.js'
import { DISCOVERABLE_COLLECTION_KEYS, routePath } from '../seo/routes.js'
import CrosshairStatisticsPanel from './CrosshairStatisticsPanel.jsx'
import SeoBreadcrumbs from './SeoBreadcrumbs.jsx'
import CrosshairColorComparison from './CrosshairColorComparison.jsx'

const agentPages = {
  yoru: lazy(() => import('./YoruAgentPage.jsx')),
  sova: lazy(() => import('./SovaAgentPage.jsx')),
  iso: lazy(() => import('./IsoAgentPage.jsx')),
  waylay: lazy(() => import('./WaylayAgentPage.jsx')),
  astra: lazy(() => import('./AstraAgentPage.jsx')),
  cypher: lazy(() => import('./CypherAgentPage.jsx')),
  miks: lazy(() => import('./MiksAgentPage.jsx')),
  harbor: lazy(() => import('./HarborAgentPage.jsx')),
  deadlock: lazy(() => import('./DeadlockAgentPage.jsx')),
  veto: lazy(() => import('./VetoAgentPage.jsx')),
  vyse: lazy(() => import('./VyseAgentPage.jsx')),
  killjoy: lazy(() => import('./KilljoyAgentPage.jsx')),
  clove: lazy(() => import('./CloveAgentPage.jsx')),
  fade: lazy(() => import('./FadeAgentPage.jsx')),
  tejo: lazy(() => import('./TejoAgentPage.jsx')),
  gekko: lazy(() => import('./GekkoAgentPage.jsx')),
  kayo: lazy(() => import('./KayoAgentPage.jsx')),
  skye: lazy(() => import('./SkyeAgentPage.jsx')),
  breach: lazy(() => import('./BreachAgentPage.jsx')),
  neon: lazy(() => import('./NeonAgentPage.jsx')),
  reyna: lazy(() => import('./ReynaAgentPage.jsx')),
  jett: lazy(() => import('./JettAgentPage.jsx')),
  raze: lazy(() => import('./RazeAgentPage.jsx')),
  chamber: lazy(() => import('./ChamberAgentPage.jsx')),
  brimstone: lazy(() => import('./BrimstoneAgentPage.jsx')),
  omen: lazy(() => import('./OmenAgentPage.jsx')),
  viper: lazy(() => import('./ViperAgentPage.jsx')),
  phoenix: lazy(() => import('./PhoenixAgentPage.jsx')),
  sage: lazy(() => import('./SageAgentPage.jsx')),
  hush: lazy(() => import('./HushAgentPage.jsx')),
}

export default function SeoArticlePage({ locale, articleKey, crosshairs, onCopy, copiedId, onSelect, t }) {
  const AgentPage = agentPages[articleKey]
  if (AgentPage) return <AgentPage locale={locale} onCopy={onCopy} />
  const content = guideArticleCopy(locale, articleKey)
  const labels = {
    en: { quick: 'Quick answer', related: 'Related AimCodes guides', import: 'Import and copy crosshair codes', sources: 'Official references', faq: 'Common questions', tryCodes: 'Try working codes', openTool: 'Open the tool' },
    es: { quick: 'Respuesta rápida', related: 'Guías relacionadas de AimCodes', import: 'Guía para importar y copiar miras', sources: 'Referencias oficiales', faq: 'Preguntas habituales', tryCodes: 'Probar códigos', openTool: 'Abrir la herramienta' },
    'pt-BR': { quick: 'Resposta rápida', related: 'Guias relacionados do AimCodes', import: 'Guia para importar e copiar miras', sources: 'Referências oficiais', faq: 'Dúvidas comuns', tryCodes: 'Testar códigos', openTool: 'Abrir a ferramenta' },
    'zh-CN': { quick: '先说结论', related: '接着看这些', import: '准星代码怎么导入和复制', sources: '官方资料', faq: '大家常问', tryCodes: '直接试代码', openTool: '打开工具' },
    ja: { quick: '先に答え', related: '関連ガイド', import: 'クロスヘアコードのインポート方法', sources: '公式資料', faq: 'よくある質問', tryCodes: 'コードを試す', openTool: 'ツールを開く' },
  }[locale]
  const recommended = content.recommendedCrosshairIds
    .map((id) => crosshairs.find((item) => item.id === id))
    .filter(Boolean)
  const featured = recommended.filter((item) => content.featuredCodes?.ids.includes(item.id))
  const remaining = recommended.filter((item) => !featured.includes(item))
  const fallbackArticleKeys = [articleKey === 'settings' ? 'colors' : 'settings']
  const relatedArticleKeys = content.relatedArticleKeys || fallbackArticleKeys
  const discoverableCollectionSet = new Set(DISCOVERABLE_COLLECTION_KEYS)
  const relatedCollectionKeys = (content.relatedCollectionKeys || ['small'])
    .filter((collectionKey) => discoverableCollectionSet.has(collectionKey))
  const relatedToolKeys = content.relatedToolKeys || []
  const quickCollectionKey = relatedCollectionKeys[0]
  const quickToolKey = relatedToolKeys[0]

  return (
    <article className="seo-article-page">
      <SeoBreadcrumbs locale={locale} current={content.title} />
      <header className="seo-article-hero">

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
          {content.quickLinks && <nav className="seo-article-quick-actions" aria-label={labels.quick}>
            {content.quickLinks.map((link, index) => <a className={index === 0 ? 'primary-button' : 'secondary-button'} key={link.label} href={link.fragment ? `#${link.fragment}` : routePath(locale, link.route)}>{link.label}</a>)}
          </nav>}
          {!content.quickLinks && !featured.length && (quickCollectionKey || quickToolKey) && (
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

      {featured.length > 0 && (
        <section className="article-featured-codes">
          <h2>{content.featuredCodes.title}</h2>
          <div>
            {featured.map((item) => (
              <CrosshairCard key={item.id} crosshair={item} showCode
                href={routePath(locale, { type: 'crosshair', crosshairId: item.id })}
                copied={copiedId === item.id} onSelect={onSelect} onCopy={onCopy} t={t} />
            ))}
          </div>
        </section>
      )}

      {articleKey === 'statistics' && <CrosshairStatisticsPanel locale={locale} />}
      {content.colorComparison && <CrosshairColorComparison locale={locale} comparison={content.colorComparison}
        crosshair={crosshairs.find((item) => item.id === content.colorComparison.crosshairId)} />}

      <div className="seo-article-sections">
        {content.sections.map((section, index) => (
          <section key={section.title} className={section.table ? 'seo-article-section seo-article-table-section' : 'seo-article-section'}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.table && (
                <table className="guide-settings-table" aria-label={section.title}>
                  <thead><tr>{section.table.columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
                  <tbody>{section.table.rows.map(([setting, ...cells]) => (
                    <tr key={setting}><th scope="row">{setting}</th>{cells.map((cell) => <td key={cell}>{cell}</td>)}</tr>
                  ))}</tbody>
                </table>
              )}
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
          {remaining.map((crosshair) => (
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
          <a key={`article-${key}`} href={routePath(locale, { type: 'article', articleKey: key })}>{guideArticleCopy(locale, key).title}</a>
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
