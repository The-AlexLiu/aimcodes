import { HARBOR_OG_IMAGE, HARBOR_UPDATED_AT, harborArticleCopy } from './harborContent.js'
import { FADE_OG_IMAGE, FADE_UPDATED_AT, fadeArticleCopy } from './fadeContent.js'
import { ASTRA_OG_IMAGE, ASTRA_UPDATED_AT, astraArticleCopy } from './astraContent.js'
import { SKYE_OG_IMAGE, SKYE_UPDATED_AT, skyeArticleCopy } from './skyeContent.js'
import { YORU_OG_IMAGE, YORU_UPDATED_AT, yoruArticleCopy } from './yoruContent.js'
import { SOVA_OG_IMAGE, SOVA_UPDATED_AT, sovaArticleCopy } from './sovaContent.js'
import { ISO_OG_IMAGE, ISO_UPDATED_AT, isoArticleCopy } from './isoContent.js'
import { WAYLAY_OG_IMAGE, WAYLAY_UPDATED_AT, waylayArticleCopy } from './waylayContent.js'
import { TEJO_OG_IMAGE, TEJO_UPDATED_AT, tejoArticleCopy } from './tejoContent.js'
import { KAYO_OG_IMAGE, KAYO_UPDATED_AT, kayoArticleCopy } from './kayoContent.js'
import { BREACH_OG_IMAGE, BREACH_UPDATED_AT, breachArticleCopy } from './breachContent.js'
import { NEON_OG_IMAGE, NEON_UPDATED_AT, neonArticleCopy } from './neonContent.js'
import { REYNA_OG_IMAGE, REYNA_UPDATED_AT, reynaArticleCopy } from './reynaContent.js'
import { JETT_OG_IMAGE, JETT_UPDATED_AT, jettArticleCopy } from './jettContent.js'
import { RAZE_OG_IMAGE, RAZE_UPDATED_AT, razeArticleCopy } from './razeContent.js'
import { CHAMBER_OG_IMAGE, CHAMBER_UPDATED_AT, chamberArticleCopy } from './chamberContent.js'


import { BRIMSTONE_OG_IMAGE, BRIMSTONE_UPDATED_AT, brimstoneArticleCopy } from './brimstoneContent.js'
import { OMEN_OG_IMAGE, OMEN_UPDATED_AT, omenArticleCopy } from './omenContent.js'
import { VIPER_OG_IMAGE, VIPER_UPDATED_AT, viperArticleCopy } from './viperContent.js'
import { PHOENIX_OG_IMAGE, PHOENIX_UPDATED_AT, phoenixArticleCopy } from './phoenixContent.js'
import { SAGE_OG_IMAGE, SAGE_UPDATED_AT, sageArticleCopy } from './sageContent.js'
import { HUSH_OG_IMAGE, HUSH_UPDATED_AT, hushArticleCopy } from './hushContent.js'
import { freeSiteCopy } from '../i18n/freeSiteCopy.js'
import { localeRoutes } from '../i18n/localeRoutes.js'
import { articleCopy } from './articles.js'
import { crosshairDisplayName, seoCopy } from './content.js'
import { collectionCopy } from './collectionContent.js'
import { crosshairSlug, isIndexableRoute, routePath, SEO_COLLECTIONS } from './routes.js'
import { trustCopy } from './trustContent.js'
import { seoToolCopy } from './toolContent.js'
import { proPlayerHubCopy } from './proPlayerContent.js'

export const SITE_ORIGIN = 'https://aimcodes.com'
export const OG_IMAGE_PATH = '/og-aimcodes.png'
export const SEO_CONTENT_UPDATED_AT = '2026-08-25'

const routeUpdateKey = (locale, route) => `${locale}:${route.type}:${route.collectionKey || route.articleKey || route.toolKey || route.crosshairId || ''}`

export const SEO_ROUTE_UPDATED_AT = Object.freeze({
  'en:home:': '2026-09-28',
  'en:collection:dot': '2026-09-02',
  'en:article:movementVsFiring': '2026-09-02',
  'ja:tool:playbook': '2026-09-02',
  'en:collection:tracker': '2026-09-03',
  'es:collection:tracker': '2026-09-03',
  'pt-BR:collection:tracker': '2026-09-03',
  'zh-CN:collection:tracker': '2026-09-03',
  'ja:collection:tracker': '2026-09-03',
  'en:collection:double': '2026-09-03',
  'es:collection:double': '2026-09-03',
  'pt-BR:collection:double': '2026-09-03',
  'zh-CN:collection:double': '2026-09-03',
  'ja:collection:double': '2026-09-03',
  'en:collection:plus': '2026-09-03',
  'es:collection:plus': '2026-09-03',
  'pt-BR:collection:plus': '2026-09-03',
  'zh-CN:collection:plus': '2026-09-03',
  'ja:collection:plus': '2026-09-03',
  ...Object.fromEntries(Object.keys(localeRoutes).flatMap((locale) => [
    ...['static', 'horizontal', 'plus', 'minimalist', 'cyan', 'white'].map((key) => [`${locale}:collection:${key}`, '2026-09-04']),
    ...['animals', 'meme'].map((key) => [`${locale}:collection:${key}`, '2026-09-07']),
    ...['yellowEnemies', 'offCenter', 'stretched', 'invisible', 'colors', 'gapOffset', 'innerVsOuter', 'staticVsDynamic', 'notWorking'].map((key) => [`${locale}:article:${key}`, '2026-09-04']),
  ])),
  ...Object.fromEntries(['dot', 'small', 'plus', 'cute'].map((key) => [`en:collection:${key}`, '2026-09-28'])),
  'ja:collection:cute': '2026-09-28',
  'en:article:firingError': '2026-09-28',
  'en:article:copy': '2026-09-28',
  'ja:article:copy': '2026-09-28',
  'ja:article:notWorking': '2026-09-28',
  // Only mark the pages with substantive content changes in this SEO review.
  ...Object.fromEntries(Object.keys(localeRoutes).flatMap((locale) => [
    [`${locale}:home:`, '2026-09-28'],
    [`${locale}:collection:funny`, '2026-09-28'],
  ])),
  // Only these existing routes gained substantive content in the October review.
  ...Object.fromEntries(Object.keys(localeRoutes).flatMap((locale) => [
    ...['catalog:', 'collection:best', 'collection:circle', 'article:colors', 'guide:', 'tool:generator', 'crosshair:aspas-dot']
      .map((key) => [`${locale}:${key}`, '2026-10-13']),
  ])),
  ...Object.fromEntries(Object.keys(localeRoutes).flatMap(locale => [
    ...['dot', 'small', 'cute', 'funny', 'sheriff', 'visibility', 'guardian', 'outlaw', 'marshal', 'burst', 'spray', 'longRange'].map(key => [`${locale}:collection:${key}`, '2026-10-14']),
    ...['firingError', 'copy', 'colors', 'statistics'].map(key => [`${locale}:article:${key}`, '2026-10-14']),
  ])),
  ...Object.fromEntries(Object.keys(localeRoutes).flatMap(locale => [
    [`${locale}:home:`, HUSH_UPDATED_AT],
    [`${locale}:article:hush`, HUSH_UPDATED_AT],
    [`${locale}:article:sage`, SAGE_UPDATED_AT],
    [`${locale}:article:yoru`, YORU_UPDATED_AT],
    [`${locale}:article:jett`, JETT_UPDATED_AT],
    [`${locale}:article:raze`, RAZE_UPDATED_AT],
    [`${locale}:article:sova`, SOVA_UPDATED_AT],
    [`${locale}:article:iso`, ISO_UPDATED_AT],
    [`${locale}:article:waylay`, WAYLAY_UPDATED_AT],
    [`${locale}:article:astra`, ASTRA_UPDATED_AT],
    [`${locale}:article:tejo`, TEJO_UPDATED_AT],
    [`${locale}:article:harbor`, HARBOR_UPDATED_AT],
    [`${locale}:article:fade`, FADE_UPDATED_AT],
    [`${locale}:article:kayo`, KAYO_UPDATED_AT],
    [`${locale}:article:skye`, SKYE_UPDATED_AT],
    [`${locale}:article:breach`, BREACH_UPDATED_AT],
    [`${locale}:article:neon`, NEON_UPDATED_AT],
    [`${locale}:article:reyna`, REYNA_UPDATED_AT],
    [`${locale}:article:chamber`, CHAMBER_UPDATED_AT],


    [`${locale}:article:brimstone`, BRIMSTONE_UPDATED_AT],
    [`${locale}:article:omen`, OMEN_UPDATED_AT],
    [`${locale}:article:viper`, VIPER_UPDATED_AT],
    [`${locale}:article:phoenix`, PHOENIX_UPDATED_AT],
  ])),
  ...Object.fromEntries(Object.keys(localeRoutes).map(locale => [`${locale}:collection:best`, '2026-10-15'])),
})

export function routeContentUpdatedAt(locale, route) {
  return SEO_ROUTE_UPDATED_AT[routeUpdateKey(locale, route)] || SEO_CONTENT_UPDATED_AT
}

const detailMetadata = Object.freeze({
  tenz: Object.freeze({
    en: Object.freeze({ title: 'TenZ Crosshair Code for VALORANT: Copy & Preview | AimCodes', description: 'Copy the TenZ VALORANT crosshair code, preview it on real map scenes, check the settings, and test another color before importing the profile.' }),
  }),
  'aspas-dot': Object.freeze({
    en: Object.freeze({ title: 'Aspas VALORANT Crosshair Code, Settings & Preview | AimCodes', description: 'Preview the aspas VALORANT crosshair snapshot from his player-channel command, review its source date and compact closed center, and copy the profile code.' }),
    'pt-BR': Object.freeze({ title: 'Mira do Aspas no VALORANT: Código e Configuração | AimCodes', description: 'Copie o código da mira do aspas, veja os ajustes e teste a cruz ciano no mapa. Fonte e data do registro visíveis; não é uma promessa de configuração atual.' }),
  }),
  sacy: Object.freeze({
    en: Object.freeze({ title: 'Sacy VALORANT Crosshair Code & Settings | AimCodes', description: 'Preview Sacy’s 1-4-2-2 cyan VALORANT crosshair on real map scenes and copy the code listed in his player-owned crosshair document.' }),
  }),
  saadhak: Object.freeze({
    en: Object.freeze({ title: 'Saadhak VALORANT Crosshair Code & Settings | AimCodes', description: 'Preview Saadhak’s layered white VALORANT crosshair, review the dot and line settings, and copy the code from his player-owned crosshair list.' }),
  }),
  mwzera: Object.freeze({
    en: Object.freeze({ title: 'mwzera VALORANT Crosshair Code & Preview | AimCodes', description: 'Preview the mwzera compact black VALORANT crosshair from his Twitch command, change the color for visibility, and copy the profile code.' }),
  }),
  cortezia: Object.freeze({
    en: Object.freeze({ title: 'Cortezia VALORANT Crosshair Code & Settings | AimCodes', description: 'Try Cortezia’s outlined black dot crosshair from his player-channel command on real VALORANT map scenes and copy the code.' }),
  }),
  sato: Object.freeze({
    en: Object.freeze({ title: 'Sato VALORANT Crosshair Code & Settings | AimCodes', description: 'Preview Sato’s compact VALORANT crosshair, check its settings, test a clearer color, and copy the profile code from his player-channel command.' }),
  }),
  tteuw: Object.freeze({
    en: Object.freeze({ title: 'Tteuw VALORANT Crosshair Code & Settings | AimCodes', description: 'Preview Tteuw’s layered white dot crosshair from his player-channel command, review its movement setting, and copy the VALORANT code.' }),
  }),
  forsaken: Object.freeze({
    en: Object.freeze({ title: 'f0rsakeN Crosshair Code for VALORANT | AimCodes', description: 'Copy the working f0rsakeN VALORANT crosshair code, preview its compact white center on real maps, and check the settings before you import it.' }),
  }),
  'scream-dot': Object.freeze({
    en: Object.freeze({ title: 'ScreaM Dot Crosshair Code & Settings | AimCodes', description: 'Test the ScreaM dot crosshair on real VALORANT map scenes, check its compact settings, and copy the verified profile code.' }),
  }),
  'cat-pink': Object.freeze({
    en: Object.freeze({ title: 'Cat / Kitty VALORANT Crosshair Code | AimCodes', description: 'Preview a working Cat or Kitty VALORANT crosshair on real maps, switch its color, and copy the full profile code.' }),
  }),
  'pig-pink': Object.freeze({
    en: Object.freeze({ title: 'Pig Crosshair Code for VALORANT (Working) | AimCodes', description: 'Copy a working Pig VALORANT crosshair code, preview the pig face at normal scale, switch its color, and see how much of the target it covers.' }),
  }),
  'bunny-white': Object.freeze({
    en: Object.freeze({ title: 'Bunny VALORANT Crosshair Code & Preview | AimCodes', description: 'Preview a working Bunny VALORANT crosshair on real maps, test clearer colors, and copy the full profile code.' }),
  }),
  'tracker-drift': Object.freeze({
    en: Object.freeze({ title: 'Tracker VALORANT Crosshair Code & Preview | AimCodes', description: 'Try the Tracker Drift VALORANT crosshair on real map scenes, compare its tracking-focused shape, change the color, and copy the working code.' }),
  }),
})

export function routeMetadata(locale, route, crosshair) {
  const localized = seoCopy(locale)
  const canonical = `${SITE_ORIGIN}${routePath(locale, route)}`
  let title = localized.meta.homeTitle
  let description = localized.meta.homeDescription

  if (route.type === 'catalog') {
    title = localized.meta.catalogTitle
    description = localized.meta.catalogDescription
  } else if (route.type === 'players') {
    const players = proPlayerHubCopy(locale)
    title = players.metaTitle
    description = players.metaDescription
  } else if (route.type === 'collection') {
    const collection = collectionCopy(locale, route.collectionKey)
    title = collection.metaTitle
    description = collection.metaDescription
  } else if (route.type === 'finder') {
    title = localized.meta.finderTitle
    description = localized.meta.finderDescription
  } else if (route.type === 'guide') {
    title = localized.meta.guideTitle
    description = localized.meta.guideDescription
  } else if (route.type === 'article') {
    const article = articleCopy(locale, route.articleKey)
    title = article.metaTitle
    description = article.metaDescription
  } else if (route.type === 'tool') {
    const tool = seoToolCopy(locale, route.toolKey)
    title = tool.metaTitle
    description = tool.metaDescription
  } else if (route.type === 'trust') {
    const page = trustCopy(locale, route.pageKey)
    title = `${page.title} | AimCodes`
    description = page.intro
  } else if (route.type === 'paid') {
    const content = freeSiteCopy(locale)
    title = `${content.title} | AimCodes`
    description = content.body
  } else if (route.type === 'crosshair' && crosshair) {
    const searchName = crosshairDisplayName(locale, crosshair)
    const metadataOverride = detailMetadata[crosshair.id]?.[locale]
    const names = {
      en: `${searchName} VALORANT Crosshair Code & Preview | AimCodes`,
      es: `${searchName}: código de mira de VALORANT | AimCodes`,
      'pt-BR': `${searchName}: código de mira do VALORANT | AimCodes`,
      'zh-CN': `${searchName} 无畏契约准星代码与预览 | AimCodes`,
      ja: `${searchName}のVALORANTクロスヘアコード・設定 | AimCodes`,
    }
    const descriptions = {
      en: `Preview the ${searchName} VALORANT crosshair on real maps, change its color, and copy the working profile code in one click.`,
      es: `Prueba la mira ${searchName} de VALORANT en mapas reales, cambia el color y copia el código de perfil en un clic.`,
      'pt-BR': `Teste a mira ${searchName} do VALORANT em mapas reais, troque a cor e copie o código de perfil em um clique.`,
      'zh-CN': `在真实地图中预览 ${searchName} 无畏契约准星，切换颜色并一键复制可用的准星配置代码。`,
      ja: `${searchName}のVALORANTクロスヘアを実際のマップで確認。色を変え、使えるプロファイルコードをワンクリックでコピーできます。`,
    }
    title = metadataOverride?.title || names[locale] || names.en
    description = metadataOverride?.description || descriptions[locale] || descriptions.en
  } else if (route.type === 'notFound') {
    title = `${localized.notFound.title} | AimCodes`
    description = localized.notFound.body
  }

  let imagePath = OG_IMAGE_PATH
  let standaloneImagePath = null
  let imageAlt = title

  if (route.type === 'crosshair' && crosshair) {
    const searchName = crosshairDisplayName(locale, crosshair)
    imagePath = `/images/og/crosshairs/${crosshairSlug(crosshair.id)}.jpg`
    standaloneImagePath = `/images/crosshairs/${crosshairSlug(crosshair.id)}.webp`
    imageAlt = {
      en: `${searchName} VALORANT crosshair preview on Ascent`,
      es: `Vista previa de la mira ${searchName} de VALORANT en Ascent`,
      'pt-BR': `Prévia da mira ${searchName} do VALORANT na Ascent`,
      'zh-CN': `${searchName} 无畏契约准星在亚海悬城中的预览效果`,
      ja: `${searchName}のVALORANTクロスヘアをアセントでプレビュー`,
    }[locale] || `${searchName} VALORANT crosshair preview`
  } else if (route.type === 'collection') {
    const collection = collectionCopy(locale, route.collectionKey)
    imagePath = `/images/og/collections/${SEO_COLLECTIONS[route.collectionKey].slug}.jpg`
    imageAlt = {
      en: `${collection.label} shown in VALORANT map previews`,
      es: `${collection.label} mostradas en mapas de VALORANT`,
      'pt-BR': `${collection.label} mostradas em mapas do VALORANT`,
      'zh-CN': `${collection.label}在无畏契约地图中的预览合集`,
      ja: `${collection.label}をVALORANTマップでプレビュー`,
    }[locale] || collection.title
  } else if (route.type === 'catalog' || route.type === 'players') {
    imagePath = `/images/og/collections/${route.type === 'players' ? SEO_COLLECTIONS.pro.slug : SEO_COLLECTIONS.best.slug}.jpg`
    imageAlt = {
      en: route.type === 'players' ? 'AimCodes VALORANT pro player crosshair profiles' : 'AimCodes VALORANT crosshair library preview',
      es: route.type === 'players' ? 'Perfiles de miras de profesionales de VALORANT en AimCodes' : 'Vista previa de la biblioteca de miras de VALORANT de AimCodes',
      'pt-BR': route.type === 'players' ? 'Perfis de miras de pro players de VALORANT no AimCodes' : 'Prévia da biblioteca de miras do VALORANT do AimCodes',
      'zh-CN': route.type === 'players' ? 'AimCodes 无畏契约职业选手准星档案' : 'AimCodes 无畏契约准星库预览',
      ja: route.type === 'players' ? 'AimCodesのVALORANTプロ選手クロスヘアプロフィール' : 'AimCodesのVALORANTクロスヘアコード一覧',
    }[locale] || title
  }

  if (route.type === 'article' && route.articleKey === 'yoru') {
    imagePath = YORU_OG_IMAGE
    imageAlt = yoruArticleCopy(locale).imageAlt
  }
  if (route.type === 'article' && route.articleKey === 'sova') {
    imagePath = SOVA_OG_IMAGE
    imageAlt = sovaArticleCopy(locale).imageAlt
  }
  if (route.type === 'article' && route.articleKey === 'iso') {
    imagePath = ISO_OG_IMAGE
    imageAlt = isoArticleCopy(locale).imageAlt
  }
  if (route.type === 'article' && route.articleKey === 'waylay') {
    imagePath = WAYLAY_OG_IMAGE
    imageAlt = waylayArticleCopy(locale).imageAlt
  }
  if (route.type === 'article' && route.articleKey === 'astra') {
    imagePath = ASTRA_OG_IMAGE
    imageAlt = astraArticleCopy(locale).imageAlt
  }
  if (route.type === 'article' && route.articleKey === 'fade') {
    imagePath = FADE_OG_IMAGE
    imageAlt = fadeArticleCopy(locale).imageAlt
  }
  if (route.type === 'article' && route.articleKey === 'harbor') {
    imagePath = HARBOR_OG_IMAGE
    imageAlt = harborArticleCopy(locale).imageAlt
  }
  if (route.type === 'article' && route.articleKey === 'tejo') {
    imagePath = TEJO_OG_IMAGE
    imageAlt = tejoArticleCopy(locale).imageAlt
  }
  if (route.type === 'article' && route.articleKey === 'kayo') {
    imagePath = KAYO_OG_IMAGE
    imageAlt = kayoArticleCopy(locale).imageAlt
  }
  if (route.type === 'article' && route.articleKey === 'skye') {
    imagePath = SKYE_OG_IMAGE
    imageAlt = skyeArticleCopy(locale).imageAlt
  }
  if (route.type === 'article' && route.articleKey === 'breach') {
    imagePath = BREACH_OG_IMAGE
    imageAlt = breachArticleCopy(locale).imageAlt
  }
  if (route.type === 'article' && route.articleKey === 'neon') {
    imagePath = NEON_OG_IMAGE
    imageAlt = neonArticleCopy(locale).imageAlt
  }
  if (route.type === 'article' && route.articleKey === 'reyna') {
    imagePath = REYNA_OG_IMAGE
    imageAlt = reynaArticleCopy(locale).imageAlt
  }
  if (route.type === 'article' && route.articleKey === 'jett') {
    imagePath = JETT_OG_IMAGE
    imageAlt = jettArticleCopy(locale).imageAlt
    }
  if (route.type === 'article' && route.articleKey === 'raze') {
    imagePath = RAZE_OG_IMAGE
    imageAlt = razeArticleCopy(locale).imageAlt
  }
  if (route.type === 'article' && route.articleKey === 'chamber') {
    imagePath = CHAMBER_OG_IMAGE
    imageAlt = chamberArticleCopy(locale).imageAlt
  }
  if (route.type === 'article' && route.articleKey === 'brimstone') {
    imagePath = BRIMSTONE_OG_IMAGE
    imageAlt = brimstoneArticleCopy(locale).imageAlt
  }
  if (route.type === 'article' && route.articleKey === 'omen') {
    imagePath = OMEN_OG_IMAGE
    imageAlt = omenArticleCopy(locale).imageAlt
    }
  if (route.type === 'article' && route.articleKey === 'viper') {
    imagePath = VIPER_OG_IMAGE
    imageAlt = viperArticleCopy(locale).imageAlt
  }
  if (route.type === 'article' && route.articleKey === 'phoenix') {
    imagePath = PHOENIX_OG_IMAGE
    imageAlt = phoenixArticleCopy(locale).imageAlt
  }
  if (route.type === 'article' && route.articleKey === 'sage') {
    imagePath = SAGE_OG_IMAGE
    imageAlt = sageArticleCopy(locale).imageAlt
  }
  if (route.type === 'article' && route.articleKey === 'hush') {
    imagePath = HUSH_OG_IMAGE
    imageAlt = hushArticleCopy(locale).ui.imageAlt
  }

  return {
    title,
    description,
    canonical,
    image: `${SITE_ORIGIN}${imagePath}`,
    imagePath,
    standaloneImage: standaloneImagePath ? `${SITE_ORIGIN}${standaloneImagePath}` : null,
    imageAlt,
    imageWidth: 1200,
    imageHeight: 630,
  }
}

export function alternateUrls(route) {
  return Object.entries(localeRoutes)
    .filter(([locale]) => isIndexableRoute(route, locale))
    .map(([locale, config]) => ({
      locale,
      hreflang: config.hreflang,
      url: `${SITE_ORIGIN}${routePath(locale, route)}`,
    }))
}

export function crosshairUrl(locale, id) {
  return `${SITE_ORIGIN}${routePath(locale, { type: 'crosshair', crosshairId: id })}`
}

export function crosshairBreadcrumbName(locale, crosshair) {
  if (locale === 'ja') return `${crosshair.shortName}のクロスヘア`
  if (locale === 'zh-CN') return `${crosshair.shortName} 准星`
  if (locale === 'es') return `Mira ${crosshair.shortName}`
  if (locale === 'pt-BR') return `Mira ${crosshair.shortName}`
  return `${crosshair.shortName} crosshair`
}

export function collectionBreadcrumbName(locale, collectionKey) {
  return collectionCopy(locale, collectionKey).label
}
