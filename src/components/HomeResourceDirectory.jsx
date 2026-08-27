import { collectionCopy } from '../seo/collectionContent.js'
import { articleResourceLabel, toolResourceLabel } from '../seo/resourceLabels.js'
import { routePath, SEO_COLLECTION_KEYS } from '../seo/routes.js'
import Icon from './Icon.jsx'

const guideKeys = Object.freeze([
  'statistics',
  'copy',
  'notWorking',
  'makeDot',
  'makeCircle',
  'movementError',
  'firingError',
  'movementVsFiring',
  'staticVsDynamic',
  'dotVsCross',
  'placement',
  'exportCrosshair',
  'shareCrosshair',
  'resetCrosshair',
  'saveMultiple',
  'customColor',
  'outlinesOnOff',
  'centerDotOnOff',
  'innerVsOuter',
  'thickness',
  'gapOffset',
])

const toolKeys = Object.freeze(['playbook', 'generator', 'decoder', 'preview', 'comparison'])

const searchOpportunityRoutes = Object.freeze([
  Object.freeze({ type: 'crosshair', crosshairId: 'tenz', labelKey: 'tenz' }),
  Object.freeze({ type: 'collection', collectionKey: 'circle', labelKey: 'circle' }),
  Object.freeze({ type: 'collection', collectionKey: 'pink', labelKey: 'pink' }),
  Object.freeze({ type: 'article', articleKey: 'copy', labelKey: 'copy' }),
  Object.freeze({ type: 'article', articleKey: 'firingError', labelKey: 'firingError' }),
])

const directoryCopy = {
  en: {
    title: 'More ways to find the right crosshair',
    intro: 'Open only the section you need. Everything else stays out of the way.',
    collections: 'Browse by style',
    collectionsHint: 'Curated collections for different looks and play styles',
    guides: 'Crosshair guides',
    guidesHint: 'Quick answers for settings, errors, and aiming habits',
    tools: 'Tools you can use now',
    toolsHint: 'Plan a round, or build, decode, preview and compare a crosshair',
    trending: 'Popular right now',
    trendingHint: 'Pages players are finding most often from search',
    trendingLabels: { tenz: 'TenZ crosshair code', circle: 'Circle crosshair codes', pink: 'Pink crosshair codes', copy: "Copy a teammate's crosshair", firingError: 'What firing error means' },
  },
  es: {
    title: 'Más formas de encontrar tu mira',
    intro: 'Abre solo la sección que necesitas. Lo demás no estorba.',
    collections: 'Explorar por estilo',
    collectionsHint: 'Colecciones para distintos estilos de juego y diseño',
    guides: 'Guías de miras',
    guidesHint: 'Respuestas rápidas sobre ajustes, errores y puntería',
    tools: 'Herramientas listas para usar',
    toolsHint: 'Planea una ronda o crea, decodifica, prueba y compara una mira',
    trending: 'Lo más buscado ahora',
    trendingHint: 'Accesos que otros jugadores están encontrando en Google',
    trendingLabels: { tenz: 'Código de mira de TenZ', circle: 'Miras circulares', pink: 'Miras rosas', copy: 'Copiar la mira de un compañero', firingError: 'Qué significa el error de disparo' },
  },
  'pt-BR': {
    title: 'Mais caminhos para encontrar sua mira',
    intro: 'Abra só a seção que você precisa. O resto fica fora do caminho.',
    collections: 'Buscar por estilo',
    collectionsHint: 'Coleções para diferentes visuais e jeitos de jogar',
    guides: 'Guias de mira',
    guidesHint: 'Respostas rápidas sobre ajustes, erros e mira',
    tools: 'Ferramentas prontas para usar',
    toolsHint: 'Planeje uma rodada ou crie, decodifique, teste e compare uma mira',
    trending: 'Mais buscados agora',
    trendingHint: 'Atalhos que outros jogadores estão encontrando na busca',
    trendingLabels: { tenz: 'Código de mira do TenZ', circle: 'Miras circulares', pink: 'Miras rosas', copy: 'Copiar a mira de um aliado', firingError: 'O que é erro de disparo' },
  },
  'zh-CN': {
    title: '还想继续找？按需要展开',
    intro: '只打开现在用得上的内容，其他入口先收起来。',
    collections: '按样式找准星',
    collectionsHint: '不同外观和打法的准星合集',
    guides: '先看教程',
    guidesHint: '解决设置、报错和瞄准习惯问题',
    tools: '直接上手',
    toolsHint: '组一套战术，或生成、解析、预览和对比准星',
    trending: '最近大家在找',
    trendingHint: '直接进入近期搜索热度更高的准星和教程',
    trendingLabels: { tenz: 'TenZ 准星代码', circle: '圆形准星代码', pink: '粉色准星代码', copy: '复制队友准星', firingError: '射击误差是什么' },
  },
  ja: {
    title: '目的に合わせて探す',
    intro: '必要な項目だけ開いて、クロスヘア・ガイド・ツールをすぐ見つけられます。',
    collections: '形・用途から探す',
    collectionsHint: 'プロ使用、ドット、小さい、かわいいクロスヘアなど',
    guides: 'クロスヘアガイド',
    guidesHint: '設定、コピー、エラー表示、プリエイムを日本語で確認',
    tools: '今すぐ使えるツール',
    toolsHint: 'ラウンドを組み立て、生成・解析・プレビュー・比較',
    trending: '最近よく見られているページ',
    trendingHint: '検索から多く見つけられているクロスヘアとガイド',
    trendingLabels: { tenz: 'TenZのクロスヘアコード', circle: '丸型クロスヘア', pink: 'ピンクのクロスヘア', copy: '味方のクロスヘアをコピー', firingError: '射撃エラーとは' },
  },
}

function ResourceDisclosure({ label, hint, children }) {
  return (
    <details className="home-resource-disclosure">
      <summary>
        <span>
          <strong>{label}</strong>
          <small>{hint}</small>
        </span>
        <Icon name="chevronDown" size={18} />
      </summary>
      {children}
    </details>
  )
}

export default function HomeResourceDirectory({ locale }) {
  const copy = directoryCopy[locale] || directoryCopy.en

  return (
    <section className="home-resource-directory" id="guides-and-tools" aria-labelledby="home-resource-title">
      <header>
        <h2 id="home-resource-title">{copy.title}</h2>
        <p>{copy.intro}</p>
      </header>
      <nav className="home-search-opportunities" aria-label={copy.trending}>
        <span>
          <strong>{copy.trending}</strong>
          <small>{copy.trendingHint}</small>
        </span>
        <div>
          {searchOpportunityRoutes.map((item) => (
            <a href={routePath(locale, item)} key={item.labelKey}>
              {copy.trendingLabels[item.labelKey]}
            </a>
          ))}
        </div>
      </nav>
      <div className="home-resource-disclosures">
        <ResourceDisclosure label={copy.collections} hint={copy.collectionsHint}>
          <nav className="home-resource-link-grid" aria-label={copy.collections}>
            {SEO_COLLECTION_KEYS.map((collectionKey) => (
              <a href={routePath(locale, { type: 'collection', collectionKey })} key={collectionKey}>
                {collectionCopy(locale, collectionKey).label}
              </a>
            ))}
          </nav>
        </ResourceDisclosure>
        <ResourceDisclosure label={copy.guides} hint={copy.guidesHint}>
          <nav className="home-resource-link-grid" aria-label={copy.guides} id="guides">
            {guideKeys.map((articleKey) => (
              <a href={routePath(locale, { type: 'article', articleKey })} key={articleKey}>
                {articleResourceLabel(locale, articleKey)}
              </a>
            ))}
          </nav>
        </ResourceDisclosure>
        <ResourceDisclosure label={copy.tools} hint={copy.toolsHint}>
          <nav className="home-resource-link-grid" aria-label={copy.tools} id="tools">
            {toolKeys.map((toolKey) => (
              <a href={routePath(locale, { type: 'tool', toolKey })} key={toolKey}>
                {toolResourceLabel(locale, toolKey)}
              </a>
            ))}
          </nav>
        </ResourceDisclosure>
      </div>
    </section>
  )
}
