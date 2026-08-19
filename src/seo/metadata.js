import { localeRoutes } from '../i18n/localeRoutes.js'
import { articleCopy } from './articles.js'
import { crosshairDisplayName, seoCopy } from './content.js'
import { collectionCopy } from './collectionContent.js'
import { crosshairSlug, routePath, SEO_COLLECTIONS } from './routes.js'
import { trustCopy } from './trustContent.js'
import { seoToolCopy } from './toolContent.js'
import { proPlayerHubCopy } from './proPlayerContent.js'

export const SITE_ORIGIN = 'https://aimcodes.com'
export const OG_IMAGE_PATH = '/og-aimcodes.png'
export const SEO_CONTENT_UPDATED_AT = '2026-08-19'

const detailMetadata = Object.freeze({
  tenz: Object.freeze({
    en: Object.freeze({ title: 'TenZ VALORANT Crosshair Code, Settings & Preview | AimCodes', description: 'Preview the TenZ VALORANT crosshair on real map scenes, check its key settings, change the color, and copy the verified profile code.' }),
  }),
  'aspas-dot': Object.freeze({
    en: Object.freeze({ title: 'Aspas VALORANT Crosshair Code, Settings & Preview | AimCodes', description: 'Try the current aspas VALORANT crosshair from his player-channel command, preview the compact closed center, and copy the profile code.' }),
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
  return Object.entries(localeRoutes).map(([locale, config]) => ({
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
