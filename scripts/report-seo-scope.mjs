import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { catalogCrosshairs, crosshairCollectionKeys } from '../src/data/catalogManifest.js'
import { localeRoutes } from '../src/i18n/localeRoutes.js'
import {
  HIDDEN_COLLECTION_KEYS,
  isIndexableRoute,
  RETIRED_COLLECTION_REDIRECTS,
  SEO_ARTICLE_KEYS,
  SEO_LOCALE_TIERS,
  SEO_TOOL_KEYS,
  TRUST_PAGE_KEYS,
} from '../src/seo/routes.js'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const reportRoot = resolve(projectRoot, '.aimcodes-reports/current')
const routeTypes = ['home', 'catalog', 'players', 'finder', 'guide', 'collection', 'article', 'tool', 'trust', 'crosshair']

function routesForLocale() {
  return [
    { type: 'home' },
    { type: 'catalog' },
    { type: 'players' },
    { type: 'finder' },
    { type: 'guide' },
    ...crosshairCollectionKeys.map((collectionKey) => ({ type: 'collection', collectionKey })),
    ...SEO_ARTICLE_KEYS.map((articleKey) => ({ type: 'article', articleKey })),
    ...SEO_TOOL_KEYS.map((toolKey) => ({ type: 'tool', toolKey })),
    ...TRUST_PAGE_KEYS.map((pageKey) => ({ type: 'trust', pageKey })),
    ...catalogCrosshairs.map((crosshair) => ({ type: 'crosshair', crosshairId: crosshair.id })),
  ]
}

const errors = []
const locales = Object.keys(localeRoutes).map((locale) => {
  const routes = routesForLocale()
  const indexed = routes.filter((route) => isIndexableRoute(route, locale))
  const indexByType = Object.fromEntries(routeTypes.map((type) => [type, indexed.filter((route) => route.type === type).length]))

  if (!SEO_LOCALE_TIERS[locale]) errors.push(`${locale}: SEO locale tier missing`)
  if (locale === 'zh-CN') {
    const unexpected = indexed.filter((route) => !['home', 'catalog', 'finder'].includes(route.type))
    if (unexpected.length) errors.push(`zh-CN: product-only policy leaked ${unexpected.length} SEO routes`)
  }

  return {
    locale,
    tier: SEO_LOCALE_TIERS[locale],
    generatedRoutes: routes.length,
    indexedRoutes: indexed.length,
    indexByType,
  }
})

for (const locale of Object.keys(localeRoutes)) {
  for (const collectionKey of HIDDEN_COLLECTION_KEYS) {
    if (isIndexableRoute({ type: 'collection', collectionKey }, locale)) {
      errors.push(`${locale}: hidden collection ${collectionKey} is indexable`)
    }
  }
  if (isIndexableRoute({ type: 'players' }, locale)) errors.push(`${locale}: retired player hub is indexable`)
}

const report = {
  generatedAt: new Date().toISOString(),
  uiLocales: Object.keys(localeRoutes),
  localePolicy: SEO_LOCALE_TIERS,
  hiddenCollections: HIDDEN_COLLECTION_KEYS,
  retiredCollectionRedirects: RETIRED_COLLECTION_REDIRECTS,
  locales,
  totals: {
    generatedRoutes: locales.reduce((sum, item) => sum + item.generatedRoutes, 0),
    indexedRoutes: locales.reduce((sum, item) => sum + item.indexedRoutes, 0),
  },
  errors,
}

await mkdir(reportRoot, { recursive: true })
await writeFile(resolve(reportRoot, 'seo-scope.json'), `${JSON.stringify(report, null, 2)}\n`)

const rows = locales.map((item) => `| ${item.locale} | ${item.tier} | ${item.generatedRoutes} | ${item.indexedRoutes} | ${item.indexByType.crosshair} | ${item.indexByType.collection} |`).join('\n')
const markdown = `# AimCodes SEO scope\n\n- Generated: ${report.generatedAt}\n- UI locales: ${report.uiLocales.join(', ')}\n- Generated routes: ${report.totals.generatedRoutes}\n- Indexed routes: ${report.totals.indexedRoutes}\n- Hidden collections: ${report.hiddenCollections.join(', ')}\n\n| Locale | Tier | Generated | Indexed | Indexed crosshairs | Indexed collections |\n| --- | --- | ---: | ---: | ---: | ---: |\n${rows}\n\n## Retired collection redirects\n\n${Object.entries(RETIRED_COLLECTION_REDIRECTS).map(([from, to]) => `- ${from} -> ${to}`).join('\n')}\n${errors.length ? `\n## Errors\n\n${errors.map((error) => `- ${error}`).join('\n')}\n` : ''}`
await writeFile(resolve(reportRoot, 'seo-scope.md'), markdown)

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`SEO scope validation passed: ${report.totals.generatedRoutes} accessible routes, ${report.totals.indexedRoutes} indexable routes, ${locales.length} locale tiers.`)
