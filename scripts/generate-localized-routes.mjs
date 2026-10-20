import { SKYE_CROSSHAIR } from '../src/data/skyeCrosshair.js'
import { SKYE_IMAGE, SKYE_CINEMATIC } from '../src/seo/skyeContent.js'
import { SOVA_CROSSHAIR } from '../src/data/sovaCrosshair.js'
import { ISO_CROSSHAIR } from '../src/data/isoCrosshair.js'
import { SOVA_IMAGE, SOVA_CINEMATIC } from '../src/seo/sovaContent.js'
import { ISO_IMAGE, ISO_CINEMATIC } from '../src/seo/isoContent.js'
import { WAYLAY_CROSSHAIR } from '../src/data/waylayCrosshair.js'
import { FADE_CROSSHAIR } from '../src/data/fadeCrosshair.js'
import { KAYO_CROSSHAIR } from '../src/data/kayoCrosshair.js'
import { FADE_IMAGE, FADE_CINEMATIC } from '../src/seo/fadeContent.js'
import { KAYO_IMAGE, KAYO_CINEMATIC } from '../src/seo/kayoContent.js'
import { BREACH_CROSSHAIR } from '../src/data/breachCrosshair.js'
import { NEON_CROSSHAIR } from '../src/data/neonCrosshair.js'
import { WAYLAY_IMAGE, WAYLAY_CINEMATIC } from '../src/seo/waylayContent.js'
import { BREACH_IMAGE, BREACH_CINEMATIC } from '../src/seo/breachContent.js'
import { NEON_IMAGE, NEON_CINEMATIC } from '../src/seo/neonContent.js'
import { YORU_CROSSHAIR } from '../src/data/yoruCrosshair.js'
import { YORU_IMAGE, YORU_CINEMATIC } from '../src/seo/yoruContent.js'
import { REYNA_CROSSHAIR } from '../src/data/reynaCrosshair.js'
import { REYNA_IMAGE, REYNA_CINEMATIC } from '../src/seo/reynaContent.js'
import { JETT_CROSSHAIR } from '../src/data/jettCrosshair.js'
import { JETT_IMAGE, JETT_CINEMATIC } from '../src/seo/jettContent.js'
import { RAZE_CROSSHAIR } from '../src/data/razeCrosshair.js'
import { RAZE_IMAGE, RAZE_CINEMATIC } from '../src/seo/razeContent.js'
import { CHAMBER_CROSSHAIR } from '../src/data/chamberCrosshair.js'
import { CHAMBER_IMAGE, CHAMBER_CINEMATIC } from '../src/seo/chamberContent.js'


import { BRIMSTONE_CROSSHAIR } from '../src/data/brimstoneCrosshair.js'
import { BRIMSTONE_IMAGE, BRIMSTONE_CINEMATIC } from '../src/seo/brimstoneContent.js'
import { OMEN_CROSSHAIR } from '../src/data/omenCrosshair.js'
import { OMEN_IMAGE, OMEN_CINEMATIC } from '../src/seo/omenContent.js'
import { VIPER_CROSSHAIR } from '../src/data/viperCrosshair.js'
import { VIPER_IMAGE, VIPER_CINEMATIC } from '../src/seo/viperContent.js'
import { PHOENIX_CROSSHAIR } from '../src/data/phoenixCrosshair.js'
import { PHOENIX_IMAGE, PHOENIX_CINEMATIC } from '../src/seo/phoenixContent.js'
import { SAGE_CROSSHAIR } from '../src/data/sageCrosshair.js'
import { SAGE_IMAGE } from '../src/seo/sageContent.js'
import { HUSH_CROSSHAIR } from '../src/data/hushCrosshair.js'
import { hushCrosshairCopy } from '../src/i18n/hushCrosshairCopy.js'
import { freeSiteCopy } from '../src/i18n/freeSiteCopy.js'
import { HUSH_IMAGE, HUSH_VIDEOS } from '../src/seo/hushContent.js'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  catalogCrosshairs,
  collectionKeysForCatalogCrosshair,
  crosshairCollectionKeys,
  crosshairCollections,
  indexableCrosshairIds,
  homeFeaturedCrosshairIds,
} from '../src/data/catalogManifest.js'
import { createTranslator, localizeCrosshair } from '../src/i18n/translations.js'
import { DEFAULT_LOCALE, localeRoutes } from '../src/i18n/localeRoutes.js'
import {
  detailCopy,
  detailHeading,
  seoCopy,
} from '../src/seo/content.js'
import { collectionCopy } from '../src/seo/collectionContent.js'
import { reviewCopy } from '../src/seo/octoberReviewContent.js'
import {
  alternateUrls,
  collectionBreadcrumbName,
  crosshairBreadcrumbName,
  routeMetadata,
  routeContentUpdatedAt,
  SEO_CONTENT_UPDATED_AT,
  SITE_ORIGIN,
} from '../src/seo/metadata.js'
import { articleCopy } from '../src/seo/articles.js'
import { seoToolCopy } from '../src/seo/toolContent.js'
import { importGuideDetails } from '../src/seo/importGuideDetails.js'
import {
  DISCOVERABLE_COLLECTION_KEYS,
  isIndexableRoute,
  PAID_PAGE_KEYS,
  routePath,
  SEO_ARTICLE_KEYS,
  SEO_TOOL_KEYS,
  TRUST_PAGE_KEYS,
} from '../src/seo/routes.js'
import { TRUST_UPDATED_AT, trustCopy } from '../src/seo/trustContent.js'
import { publisherCopy } from '../src/seo/publisherContent.js'
import { CONTACT_EMAIL } from '../src/config/contact.js'
import { proPlayerProfiles } from '../src/data/proPlayerProfiles.js'
import { proPlayerHubCopy } from '../src/seo/proPlayerContent.js'
import { proPlayerProfileCopy } from '../src/seo/proPlayerProfileContent.js'
import {
  CROSSHAIR_STATISTICS_UPDATED_AT,
  crosshairStatisticShare,
  crosshairStatistics,
} from '../src/data/catalogStatistics.js'
import { crosshairStatisticsCopy } from '../src/seo/crosshairStatisticsContent.js'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const distRoot = resolve(projectRoot, 'dist')
const sourcePath = resolve(distRoot, 'index.html')
const seoStart = '<!-- aimcodes:seo:start -->'
const seoEnd = '<!-- aimcodes:seo:end -->'

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function escapeXml(value) {
  return escapeHtml(value).replaceAll("'", '&apos;')
}

function jsonLd(value) {
  return JSON.stringify(value).replaceAll('<', '\\u003c')
}

function structuredData(locale, route, crosshair, localizedCrosshairs) {
  const metadata = routeMetadata(locale, route, crosshair)
  const graph = [
    {
      '@type': 'Organization',
      '@id': `${SITE_ORIGIN}/#organization`,
      name: 'AimCodes',
      alternateName: 'Aim Codes',
      url: `${SITE_ORIGIN}/`,
      logo: {
        '@type': 'ImageObject',
        '@id': `${SITE_ORIGIN}/#logo`,
        url: `${SITE_ORIGIN}/brand/aimcodes-logo.png`,
        contentUrl: `${SITE_ORIGIN}/brand/aimcodes-logo.png`,
        width: 512,
        height: 512,
        caption: 'AimCodes',
      },
      email: CONTACT_EMAIL,
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_ORIGIN}/#website`,
      url: `${SITE_ORIGIN}/`,
      name: 'AimCodes',
      inLanguage: localeRoutes[locale].htmlLang,
      publisher: { '@id': `${SITE_ORIGIN}/#organization` },
    },
  ]

  if (route.type === 'catalog' || route.type === 'collection' || route.type === 'players') {
    const collectionIds = route.type === 'collection'
      ? crosshairCollections[route.collectionKey].crosshairIds
      : route.type === 'players'
        ? proPlayerProfiles.map((profile) => profile.crosshairId)
      : indexableCrosshairIds
    graph.push({
      '@type': 'CollectionPage',
      '@id': `${metadata.canonical}#collection`,
      url: metadata.canonical,
      name: metadata.title,
      description: metadata.description,
      isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: collectionIds.map((id, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${SITE_ORIGIN}${routePath(locale, { type: 'crosshair', crosshairId: id })}`,
          name: localizedCrosshairs.find((item) => item.id === id)?.shortName || id,
        })),
      },
    })

    if (route.type === 'players') {
      const players = proPlayerHubCopy(locale)
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'AimCodes', item: `${SITE_ORIGIN}${routePath(locale, { type: 'home' })}` },
          { '@type': 'ListItem', position: 2, name: players.breadcrumb, item: metadata.canonical },
        ],
      })
    } else if (route.type === 'collection') {
      const collection = collectionCopy(locale, route.collectionKey)
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'AimCodes', item: `${SITE_ORIGIN}${routePath(locale, { type: 'home' })}` },
          { '@type': 'ListItem', position: 2, name: seoCopy(locale).catalog.title, item: `${SITE_ORIGIN}${routePath(locale, { type: 'catalog' })}` },
          { '@type': 'ListItem', position: 3, name: collectionBreadcrumbName(locale, route.collectionKey), item: metadata.canonical },
        ],
      })
      graph.push({
        '@type': 'FAQPage',
        mainEntity: collection.faq.map(([name, text]) => ({
          '@type': 'Question',
          name,
          acceptedAnswer: { '@type': 'Answer', text },
        })),
      })
    }
  }

  if (route.type === 'finder') {
    graph.push({
      '@type': 'WebApplication',
      '@id': `${metadata.canonical}#app`,
      name: metadata.title,
      url: metadata.canonical,
      description: metadata.description,
      applicationCategory: 'GameApplication',
      operatingSystem: 'Any',
      isAccessibleForFree: true,
      isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
    })
  }

  if (route.type === 'tool') {
    const tool = seoToolCopy(locale, route.toolKey)
    graph.push({
      '@type': 'WebApplication',
      '@id': `${metadata.canonical}#app`,
      name: tool.title,
      url: metadata.canonical,
      description: tool.intro,
      applicationCategory: 'GameApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      isAccessibleForFree: true,
      inLanguage: localeRoutes[locale].htmlLang,
      isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
    })
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AimCodes', item: `${SITE_ORIGIN}${routePath(locale, { type: 'home' })}` },
        { '@type': 'ListItem', position: 2, name: tool.title, item: metadata.canonical },
      ],
    })
  }

  if (route.type === 'guide') {
    const guide = seoCopy(locale).guide
    const details = importGuideDetails(locale)
    graph.push({
      '@type': 'HowTo',
      '@id': `${metadata.canonical}#howto`,
      name: guide.title,
      description: guide.intro,
      url: metadata.canonical,
      inLanguage: localeRoutes[locale].htmlLang,
      step: guide.steps.map(([name, text], index) => ({
        '@type': 'HowToStep',
        position: index + 1,
        name,
        text,
      })),
    })
    graph.push({
      '@type': 'FAQPage',
      mainEntity: details.faq.map(([name, text]) => ({
        '@type': 'Question',
        name,
        acceptedAnswer: { '@type': 'Answer', text },
      })),
    })
  }

  if (route.type === 'article') {
    const article = articleCopy(locale, route.articleKey)
    graph.push({
      '@type': 'Article',
      '@id': `${metadata.canonical}#article`,
      headline: article.title,
      ...(['hush', 'sage', 'phoenix', 'omen', 'viper', 'brimstone', 'chamber', 'raze', 'yoru', 'jett', 'reyna', 'neon', 'iso', 'waylay', 'breach', 'sova', 'skye', 'kayo', 'fade'].includes(route.articleKey) ? { image: metadata.image } : {}),
      description: article.intro,
      url: metadata.canonical,
      dateModified: route.articleKey === 'statistics' ? CROSSHAIR_STATISTICS_UPDATED_AT : routeContentUpdatedAt(locale, route),
      inLanguage: localeRoutes[locale].htmlLang,
      author: { '@id': `${SITE_ORIGIN}/#organization` },
      publisher: { '@id': `${SITE_ORIGIN}/#organization` },
      isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
    })
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AimCodes', item: `${SITE_ORIGIN}${routePath(locale, { type: 'home' })}` },
        { '@type': 'ListItem', position: 2, name: article.title, item: metadata.canonical },
      ],
    })
    if (article.faq.length) graph.push({
      '@type': 'FAQPage',
      mainEntity: article.faq.map(([name, text]) => ({
        '@type': 'Question',
        name,
        acceptedAnswer: { '@type': 'Answer', text },
      })),
    })
    if (route.articleKey === 'statistics') {
      const statisticsCopy = crosshairStatisticsCopy(locale)
      graph.push({
        '@type': 'Dataset',
        '@id': `${metadata.canonical}#dataset`,
        name: statisticsCopy.title,
        description: statisticsCopy.intro,
        url: metadata.canonical,
        dateModified: CROSSHAIR_STATISTICS_UPDATED_AT,
        inLanguage: localeRoutes[locale].htmlLang,
        creator: { '@id': `${SITE_ORIGIN}/#organization` },
        measurementTechnique: statisticsCopy.methodology,
        variableMeasured: [
          { '@type': 'PropertyValue', name: statisticsCopy.metrics.published, value: crosshairStatistics.total },
          { '@type': 'PropertyValue', name: statisticsCopy.metrics.pros, value: crosshairStatistics.proCount },
          ...crosshairStatistics.colors.map(({ key, count }) => ({ '@type': 'PropertyValue', name: statisticsCopy.colors[key] || key, value: count })),
          ...crosshairStatistics.categories.map(({ key, count }) => ({ '@type': 'PropertyValue', name: statisticsCopy.categories[key] || key, value: count })),
        ],
      })
    }
  }

  if (route.type === 'trust') {
    const page = trustCopy(locale, route.pageKey)
    graph.push({
      '@type': route.pageKey === 'about' ? 'AboutPage' : 'WebPage',
      '@id': `${metadata.canonical}#webpage`,
      url: metadata.canonical,
      name: page.title,
      description: page.intro,
      dateModified: TRUST_UPDATED_AT,
      inLanguage: localeRoutes[locale].htmlLang,
      publisher: { '@id': `${SITE_ORIGIN}/#organization` },
      isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
    })
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AimCodes', item: `${SITE_ORIGIN}${routePath(locale, { type: 'home' })}` },
        { '@type': 'ListItem', position: 2, name: page.title, item: metadata.canonical },
      ],
    })
  }

  if (route.type === 'crosshair' && crosshair) {
    const page = {
      '@type': 'WebPage',
      '@id': `${metadata.canonical}#webpage`,
      url: metadata.canonical,
      name: metadata.title,
      description: metadata.description,
      inLanguage: localeRoutes[locale].htmlLang,
      isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
      mainEntity: {
        '@type': 'CreativeWork',
        name: detailHeading(locale, crosshair),
        description: detailCopy(locale, crosshair).bestFor,
        text: crosshair.code,
        ...(crosshair.sourceUrl ? { citation: crosshair.sourceUrl } : {}),
      },
      ...(crosshair.sourceUrl ? { citation: crosshair.sourceUrl } : {}),
    }
    graph.push(page)
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AimCodes', item: `${SITE_ORIGIN}${routePath(locale, { type: 'home' })}` },
        { '@type': 'ListItem', position: 2, name: seoCopy(locale).catalog.title, item: `${SITE_ORIGIN}${routePath(locale, { type: 'catalog' })}` },
        { '@type': 'ListItem', position: 3, name: crosshairBreadcrumbName(locale, crosshair), item: metadata.canonical },
      ],
    })
  }

  const primaryImageId = `${metadata.canonical}#primaryimage`
  const primaryEntity = graph.find((item) => typeof item['@id'] === 'string' && item['@id'].startsWith(metadata.canonical))
  if (primaryEntity) {
    primaryEntity.image = { '@id': primaryImageId }
    primaryEntity.primaryImageOfPage = { '@id': primaryImageId }
  }
  graph.push({
    '@type': 'ImageObject',
    '@id': primaryImageId,
    url: metadata.image,
    contentUrl: metadata.image,
    width: metadata.imageWidth,
    height: metadata.imageHeight,
    caption: metadata.imageAlt,
  })

  return { '@context': 'https://schema.org', '@graph': graph }
}

function seoBlock(locale, route, crosshair, localizedCrosshairs, indexed) {
  const config = localeRoutes[locale]
  const metadata = routeMetadata(locale, route, crosshair)
  const alternateLinks = (indexed ? alternateUrls(route) : [])
    .map((item) => `    <link rel="alternate" hreflang="${item.hreflang}" href="${item.url}" />`)
    .join('\n')
  const alternateLocales = Object.entries(localeRoutes)
    .filter(([alternateLocale]) => alternateLocale !== locale)
    .map(([, item]) => `    <meta property="og:locale:alternate" content="${item.ogLocale}" />`)
    .join('\n')
  const schema = structuredData(locale, route, crosshair, localizedCrosshairs)

  return `${seoStart}
    <meta name="robots" content="${indexed ? 'index,follow,max-image-preview:large' : route.type === 'paid' ? 'noindex,nofollow' : 'noindex,follow'}" />
    <link rel="canonical" href="${metadata.canonical}" />
${alternateLinks}
    ${indexed ? `<link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}${routePath(DEFAULT_LOCALE, route)}" />` : ''}
    <meta property="og:type" content="${route.type === 'guide' || route.type === 'article' ? 'article' : 'website'}" />
    <meta property="og:url" content="${metadata.canonical}" />
    <meta property="og:title" content="${escapeHtml(metadata.title)}" />
    <meta property="og:description" content="${escapeHtml(metadata.description)}" />
    <meta property="og:image" content="${metadata.image}" />
    <meta property="og:image:width" content="${metadata.imageWidth}" />
    <meta property="og:image:height" content="${metadata.imageHeight}" />
    <meta property="og:image:alt" content="${escapeHtml(metadata.imageAlt)}" />
    <meta property="og:locale" content="${config.ogLocale}" />
${alternateLocales}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(metadata.title)}" />
    <meta name="twitter:description" content="${escapeHtml(metadata.description)}" />
    <meta name="twitter:image" content="${metadata.image}" />
    <meta name="twitter:image:alt" content="${escapeHtml(metadata.imageAlt)}" />
    <script type="application/ld+json">${jsonLd(schema)}</script>
    <style id="aimcodes-static-seo">html,body{margin:0;background:#091117;color:#eef2f4}.seo-static-shell{visibility:hidden;animation:aimcodes-show-static-fallback 0s 6s forwards;max-width:1180px;margin:0 auto;padding:64px 28px;color:#eef2f4;font-family:Inter,"Noto Sans SC","PingFang SC","Microsoft YaHei",system-ui,sans-serif}@keyframes aimcodes-show-static-fallback{to{visibility:visible}}.seo-static-shell h1{max-width:900px;font-size:52px;line-height:1.1}.seo-static-shell p{max-width:760px;color:#aeb8bf;font-size:16px;line-height:1.65}.seo-static-shell a{color:#ff6b65}.seo-static-hero-image{display:block;width:min(100%,960px);height:auto;margin:26px 0;border:1px solid #36434d;border-radius:8px}.seo-static-links{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px}.seo-static-links a{padding:10px 14px;border:1px solid #46535e;border-radius:6px;text-decoration:none}.seo-static-card-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:16px}.seo-static-card{min-width:0;padding:14px;border:1px solid #36434d;border-radius:8px}.seo-static-card img{width:100%;height:auto}.seo-static-card summary{min-height:44px;cursor:pointer;display:list-item;padding:12px 0;box-sizing:border-box}.seo-static-shell code{display:block;margin:18px 0;padding:14px;overflow-wrap:anywhere;background:#0d151b;border:1px solid #36434d;border-radius:6px}@media(max-width:680px){.seo-static-shell{padding:36px 18px}.seo-static-shell h1{font-size:36px;line-height:1.12}}</style>
    <noscript><style>.seo-static-shell{visibility:visible;animation:none}</style></noscript>
    ${seoEnd}`
}

function replaceSeoBlock(html, nextBlock) {
  const startIndex = html.indexOf(seoStart)
  const endIndex = html.indexOf(seoEnd)
  if (startIndex === -1 || endIndex === -1) throw new Error('Missing AimCodes SEO markers in built index.html')
  return `${html.slice(0, startIndex)}${nextBlock}${html.slice(endIndex + seoEnd.length)}`
}

function staticLinks(locale, items) {
  return `<div class="seo-static-links">${items.map((item) => `<a href="${routePath(locale, { type: 'crosshair', crosshairId: item.id })}">${escapeHtml(item.shortName)}</a>`).join('')}</div>`
}

// Use the same manifest records as the live gallery, including the real code.
// Native details remain usable when scripts fail or are disabled.
function staticCrosshairCards(locale, items, heading) {
  const t = createTranslator(locale)
  const cards = items.map((item) => {
    const metadata = routeMetadata(locale, { type: 'crosshair', crosshairId: item.id }, item)
    return `<article class="seo-static-card"><h3><a href="${routePath(locale, { type: 'crosshair', crosshairId: item.id })}">${escapeHtml(item.shortName)}</a></h3><img src="${metadata.standaloneImage}" width="1080" height="1080" loading="lazy" alt="${escapeHtml(metadata.imageAlt)}" /><details><summary>${escapeHtml(t('modal.code'))}</summary><code>${escapeHtml(item.code)}</code></details></article>`
  }).join('')
  return `<section><h2>${escapeHtml(heading)}</h2><div class="seo-static-card-grid">${cards}</div></section>`
}

function staticTopicLinks(locale) {
  const localized = seoCopy(locale)
  const collections = DISCOVERABLE_COLLECTION_KEYS.map((collectionKey) => `<a href="${routePath(locale, { type: 'collection', collectionKey })}">${escapeHtml(collectionCopy(locale, collectionKey).label)}</a>`).join('')
  const resources = `<a href="${routePath(locale, { type: 'guide' })}">${escapeHtml(localized.footer.guide)}</a>${SEO_ARTICLE_KEYS.map((articleKey) => `<a href="${routePath(locale, { type: 'article', articleKey })}">${escapeHtml(articleCopy(locale, articleKey).title)}</a>`).join('')}${SEO_TOOL_KEYS.map((toolKey) => `<a href="${routePath(locale, { type: 'tool', toolKey })}">${escapeHtml(seoToolCopy(locale, toolKey).title)}</a>`).join('')}${TRUST_PAGE_KEYS.map((pageKey) => `<a href="${routePath(locale, { type: 'trust', pageKey })}">${escapeHtml(trustCopy(locale, pageKey).title)}</a>`).join('')}`
  return `<nav class="seo-static-links">${collections}${resources}</nav>`
}

function staticPublisherValue(locale, type) {
  const content = publisherCopy(locale, type)
  const cards = content.cards.map(([title, body]) => `<article><h2>${escapeHtml(title)}</h2><p>${escapeHtml(body)}</p></article>`).join('')
  return `<section><h2>${escapeHtml(content.title)}</h2><p>${escapeHtml(content.intro)}</p>${cards}</section>`
}

function staticReferenceLabel(locale) {
  return { en: 'Official references', es: 'Referencias oficiales', 'pt-BR': 'Referências oficiais', 'zh-CN': '官方参考资料', ja: '公式資料' }[locale] || 'Official references'
}

function staticFaqLabel(locale) {
  return { en: 'Common questions', es: 'Preguntas habituales', 'pt-BR': 'Dúvidas comuns', 'zh-CN': '大家常问', ja: 'よくある質問' }[locale] || 'Common questions'
}

function staticStatisticsSnapshot(locale) {
  const copy = crosshairStatisticsCopy(locale)
  const colorCollectionKeys = { white: 'white', cyan: 'cyan', red: 'red', pink: 'pink', green: 'green' }
  const colorRows = crosshairStatistics.colors.map(({ key, count }) => {
    const collectionKey = colorCollectionKeys[key]
    const label = copy.colors[key] || key
    const name = collectionKey ? `<a href="${routePath(locale, { type: 'collection', collectionKey })}">${escapeHtml(label)}</a>` : escapeHtml(label)
    return `<tr><th scope="row">${name}</th><td>${count}</td><td>${crosshairStatisticShare(count)}%</td></tr>`
  }).join('')
  const categoryRows = crosshairStatistics.categories.map(({ key, count }) => `<tr><th scope="row">${escapeHtml(copy.categories[key] || key)}</th><td>${count}</td><td>${crosshairStatisticShare(count)}%</td></tr>`).join('')
  const collections = crosshairStatistics.collections.map(({ key, count }) => `<a href="${routePath(locale, { type: 'collection', collectionKey: key })}">${count} · ${escapeHtml(collectionCopy(locale, key).label)}</a>`).join('')
  const tableHead = `<thead><tr><th>${escapeHtml(copy.table.group)}</th><th>${escapeHtml(copy.table.codes)}</th><th>${escapeHtml(copy.table.share)}</th></tr></thead>`
  return `<section><h2>${escapeHtml(copy.colorTitle)}</h2><p>${escapeHtml(copy.colorIntro)}</p><table>${tableHead}<tbody>${colorRows}</tbody></table></section><section><h2>${escapeHtml(copy.categoryTitle)}</h2><p>${escapeHtml(copy.categoryIntro)}</p><table>${tableHead}<tbody>${categoryRows}</tbody></table></section><section><h2>${escapeHtml(copy.collectionTitle)}</h2><p>${escapeHtml(copy.collectionIntro)}</p><div class="seo-static-links">${collections}</div></section><section><h2>${escapeHtml(copy.methodologyTitle)}</h2><p>${escapeHtml(copy.methodology)}</p></section>`
}

function staticColorComparison(locale) {
  const copy = reviewCopy(locale).colors
  const keys = ['cyan', 'green', 'white']
  const hexes = ['#00FFFF', '#00FF00', '#FFFFFF']
  return `<section><h2>${escapeHtml(copy.compareTitle)}</h2><p>${escapeHtml(copy.compareBody)}</p>${keys.map((key, index) => `<p>${escapeHtml(copy.names[index])} <code>${hexes[index]}</code> <a href="${routePath(locale, { type: 'crosshair', crosshairId: 'tenz' })}?color=${key}&amp;mapa=ascent">${escapeHtml(copy.open)}</a></p>`).join('')}</section>`
}

function staticHeroImage(locale, route, crosshair) {
  const metadata = routeMetadata(locale, route, crosshair)
  const image = metadata.standaloneImage || metadata.image
  const width = metadata.standaloneImage ? 1080 : metadata.imageWidth
  const height = metadata.standaloneImage ? 1080 : metadata.imageHeight
  return `<img class="seo-static-hero-image" src="${image}" width="${width}" height="${height}" alt="${escapeHtml(metadata.imageAlt)}" />`
}

function staticBody(locale, route, crosshair, localizedCrosshairs) {
  const localized = seoCopy(locale)
  if (route.type === 'home') {
    const featured = homeFeaturedCrosshairIds.map((id) => localizedCrosshairs.find((item) => item.id === id)).filter(Boolean)
    const initialPreview = localizedCrosshairs.find((item) => item.id === catalogCrosshairs[0].id)
    return `<main class="seo-static-shell"><h1>${escapeHtml(localized.home.title)}</h1><p>${escapeHtml(localized.home.intro)}</p>${staticCrosshairCards(locale, [initialPreview].filter(Boolean), localized.home.tryNow)}${staticCrosshairCards(locale, featured, localized.home.popular)}${staticTopicLinks(locale)}${staticPublisherValue(locale, 'home')}</main>`
  }
  if (route.type === 'catalog') {
    const indexableItems = indexableCrosshairIds.map((id) => localizedCrosshairs.find((item) => item.id === id)).filter(Boolean)
    return `<main class="seo-static-shell"><h1>${escapeHtml(localized.catalog.title)}</h1><p>${escapeHtml(localized.catalog.intro)}</p><nav>${[routePath(locale, { type: 'collection', collectionKey: 'best' }), routePath(locale, { type: 'tool', toolKey: 'generator' }), routePath(locale, { type: 'guide' })].map((href, index) => `<a href="${href}">${escapeHtml(localized.catalog.links[index])}</a>`).join('')}</nav><p>${escapeHtml(localized.catalog.helpBody)}</p>${staticTopicLinks(locale)}${staticLinks(locale, indexableItems)}${staticPublisherValue(locale, 'catalog')}</main>`
  }
  if (route.type === 'players') {
    const players = proPlayerHubCopy(locale)
    const profileCards = proPlayerProfiles.map((profile) => {
      const item = localizedCrosshairs.find((candidate) => candidate.id === profile.crosshairId)
      if (!item) return ''
      const profileCopy = proPlayerProfileCopy(locale, profile)
      return `<article><img src="${profile.image}" width="300" height="300" alt="${escapeHtml(profile.imageAlt)}" /><h2>${escapeHtml(profile.player)}</h2><p>${escapeHtml(profileCopy.bio)}</p><p>${escapeHtml(profile.team)} · ${escapeHtml(profileCopy.role)}</p><a href="${routePath(locale, { type: 'crosshair', crosshairId: profile.crosshairId })}">${escapeHtml(players.viewProfile)}</a></article>`
    }).join('')
    return `<main class="seo-static-shell"><nav aria-label="Breadcrumb"><a href="${routePath(locale, { type: 'home' })}">AimCodes</a> / <span>${escapeHtml(players.breadcrumb)}</span></nav><h1>${escapeHtml(players.title)}</h1><p>${escapeHtml(players.intro)}</p><section>${profileCards}</section>${staticTopicLinks(locale)}</main>`
  }
  if (route.type === 'collection') {
    const collection = collectionCopy(locale, route.collectionKey)
    const items = crosshairCollections[route.collectionKey].crosshairIds
      .map((id) => localizedCrosshairs.find((item) => item.id === id))
      .filter(Boolean)
    const quickPicks = collection.quickPicks?.length
      ? `<section class="seo-quick-picks"><h2>${escapeHtml(collection.quickPicksTitle)}</h2><ul>${collection.quickPicks.map((pick) => `<li><a href="${routePath(locale, { type: 'crosshair', crosshairId: pick.id })}">${escapeHtml(pick.label)}</a><span>${escapeHtml(pick.reason)}</span></li>`).join('')}</ul></section>`
      : ''
    const body = collection.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('') + (route.collectionKey === 'best' ? `<a href="${routePath(locale, { type: 'catalog' })}">${escapeHtml(reviewCopy(locale).best.database)}</a>` : '')
    const selectionContent = Array.isArray(collection.selection)
      ? `<ul>${collection.selection.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
      : `<p>${escapeHtml(collection.selection || '')}</p>`
    const selection = collection.selection?.length ? `<section><h2>${escapeHtml(collection.selectionTitle)}</h2>${selectionContent}</section>` : ''
    const settings = collection.settings?.length ? `<section><h2>${escapeHtml(collection.settingsTitle)}</h2><ul>${collection.settings.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>` : ''
    const discoverableCollectionSet = new Set(DISCOVERABLE_COLLECTION_KEYS)
    const introLinks = (collection.introCollectionKeys || [])
      .filter((key) => discoverableCollectionSet.has(key))
      .map((key) => `<a href="${routePath(locale, { type: 'collection', collectionKey: key })}">${escapeHtml(collectionCopy(locale, key).label)}</a>`).join('')
    const related = `${(collection.relatedCollectionKeys || []).filter((relatedCollectionKey) => discoverableCollectionSet.has(relatedCollectionKey)).map((relatedCollectionKey) => `<a href="${routePath(locale, { type: 'collection', collectionKey: relatedCollectionKey })}">${escapeHtml(collectionCopy(locale, relatedCollectionKey).title)}</a>`).join('')}${(collection.relatedArticleKeys || []).map((articleKey) => `<a href="${routePath(locale, { type: 'article', articleKey })}">${escapeHtml(articleCopy(locale, articleKey).title)}</a>`).join('')}${(collection.relatedToolKeys || []).map((toolKey) => `<a href="${routePath(locale, { type: 'tool', toolKey })}">${escapeHtml(seoToolCopy(locale, toolKey).title)}</a>`).join('')}`
    const faq = collection.faq.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join('')
    return `<main class="seo-static-shell"><nav aria-label="Breadcrumb"><a href="${routePath(locale, { type: 'home' })}">AimCodes</a> / <a href="${routePath(locale, { type: 'catalog' })}">${escapeHtml(localized.catalog.title)}</a> / <span>${escapeHtml(collection.title)}</span></nav><h1>${escapeHtml(collection.title)}</h1><p>${escapeHtml(collection.intro)}</p>${quickPicks}${introLinks ? `<nav aria-label="${escapeHtml(localized.topics.title)}">${introLinks}</nav>` : ''}${staticHeroImage(locale, route, null)}${route.collectionKey === 'funny' ? staticCrosshairCards(locale, items.slice(0, 12), collection.gridTitle) : ''}${staticLinks(locale, route.collectionKey === 'funny' ? items.slice(12) : items)}<section>${body}</section>${selection}${settings}<section><h2>${escapeHtml(staticFaqLabel(locale))}</h2>${faq}</section><nav class="seo-static-links">${related}</nav></main>`
  }
  if (route.type === 'finder') {
    return `<main class="seo-static-shell"><h1>${escapeHtml(createTranslator(locale)('finder.title'))}</h1><p>${escapeHtml(localized.meta.finderDescription)}</p><a href="${routePath(locale, { type: 'catalog' })}">${escapeHtml(localized.footer.browse)}</a></main>`
  }
  if (route.type === 'paid') {
    const content = freeSiteCopy(locale)
    return `<main class="seo-static-shell"><h1>${escapeHtml(content.title)}</h1><p>${escapeHtml(content.body)}</p><a href="${routePath(locale, { type: 'catalog' })}">${escapeHtml(content.browse)}</a></main>`
  }
  if (route.type === 'guide') {
    const details = importGuideDetails(locale)
    const steps = localized.guide.steps.map(([title, body]) => `<li><strong>${escapeHtml(title)}</strong><p>${escapeHtml(body)}</p></li>`).join('')
    const extra = details.sections.map((section) => `<section><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.body)}</p></section>`).join('')
    const faq = details.faq.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join('')
    return `<main class="seo-static-shell"><h1>${escapeHtml(localized.guide.title)}</h1><p>${escapeHtml(localized.guide.intro)}</p><section><h2>${escapeHtml(details.quickLabel)}</h2><p>${escapeHtml(details.quickAnswer)}</p></section><ol>${steps}</ol><h2>${escapeHtml(details.moreTitle)}</h2>${extra}<h2>${escapeHtml(staticFaqLabel(locale))}</h2>${faq}<nav><a href="${routePath(locale, { type: 'tool', toolKey: 'decoder' })}">${escapeHtml(reviewCopy(locale).guideLinks[0])}</a><a href="${routePath(locale, { type: 'article', articleKey: 'notWorking' })}">${escapeHtml(reviewCopy(locale).guideLinks[1])}</a></nav><a href="${routePath(locale, { type: 'catalog' })}">${escapeHtml(localized.guide.cta)}</a></main>`
  }
  if (route.type === 'article') {
    const article = articleCopy(locale, route.articleKey)
    if (route.articleKey === 'yoru') {
      const abilities = article.abilities.map(a => `<section><h3>${escapeHtml(a.name)}</h3><img src="/images/agents/yoru/${a.key}.webp" alt="" width="48" height="48" /><small>${a.binding}</small><p>${escapeHtml(a.effect)}</p><p>${escapeHtml(a.action)}</p><video controls muted playsinline preload="none" poster="/images/agents/yoru/${a.key}-poster.webp" width="960" height="540" aria-label="${escapeHtml(a.name)}"><source src="/images/agents/yoru/${a.key}.mp4" type="video/mp4" /></video></section>`).join('')
      return `<main class="seo-static-shell"><nav aria-label="Breadcrumb"><a href="${routePath(locale,{type:'home'})}">AimCodes</a> / ${escapeHtml(article.heroName)}</nav><header><h1>${escapeHtml(article.heroName)}</h1><p>${escapeHtml(article.intro)}</p><img class="seo-static-hero-image" src="${YORU_IMAGE}" alt="${escapeHtml(article.imageAlt)}" width="1920" height="1080" /><a href="#yoru-abilities">${escapeHtml(article.watch)}</a></header><section id="yoru-abilities"><h2>${escapeHtml(article.kit)}</h2>${abilities}</section><details><summary>${escapeHtml(article.showDemo)}</summary><video controls muted playsinline preload="none" poster="/images/agents/yoru/fakeout-poster.webp" width="960" height="540"><source src="/images/agents/yoru/abilities-overview.mp4" type="video/mp4" /></video></details><section><h2>${escapeHtml(article.storyTitle)}</h2>${article.story.map(p=>`<p>${escapeHtml(p)}</p>`).join('')}<a href="${YORU_CINEMATIC}">${escapeHtml(article.cinematic)}</a></section><section><h2>${escapeHtml(article.galleryTitle)}</h2>${article.gallery.map(image=>`<a href="${image.src}"><img src="${image.src}" alt="${escapeHtml(image.label)}" width="${image.width}" height="${image.height}" loading="lazy" /></a>`).join('')}</section><details><summary>${escapeHtml(article.profileTitle)}</summary><p>${escapeHtml(article.originLabel)}: ${escapeHtml(article.origin)} · ${escapeHtml(article.roleLabel)}: ${escapeHtml(article.role)}</p><p>${escapeHtml(article.profileBody)}</p></details><section><h2>${escapeHtml(article.themeTitle)}</h2><p>${escapeHtml(article.themeDescription)}</p><code>${escapeHtml(YORU_CROSSHAIR.code)}</code><p>${escapeHtml(article.importBody)}</p><a href="${routePath(locale,{type:'tool',toolKey:'generator'})}?theme=yoru">${escapeHtml(article.adjust)}</a><a href="${routePath(locale,{type:'catalog'})}">${escapeHtml(article.more)}</a></section></main>`
    }
    if (route.articleKey === 'sova') {
      const abilities = article.abilities.map(a => `<section><h3>${escapeHtml(a.name)}</h3><img src="/images/agents/sova/${a.key}.webp" alt="" width="48" height="48" /><small>${a.binding}</small><p>${escapeHtml(a.effect)}</p><p>${escapeHtml(a.action)}</p><video controls muted playsinline preload="none" poster="/images/agents/sova/${a.key}-poster.webp" width="960" height="540" aria-label="${escapeHtml(a.name)}"><source src="/images/agents/sova/${a.key}.mp4" type="video/mp4" /></video></section>`).join('')
      return `<main class="seo-static-shell"><nav aria-label="Breadcrumb"><a href="${routePath(locale,{type:'home'})}">AimCodes</a> / ${escapeHtml(article.heroName)}</nav><header><h1>${escapeHtml(article.heroName)}</h1><p>${escapeHtml(article.intro)}</p><img class="seo-static-hero-image" src="${SOVA_IMAGE}" alt="${escapeHtml(article.imageAlt)}" width="1920" height="1080" /><a href="#sova-abilities">${escapeHtml(article.watch)}</a></header><section id="sova-abilities"><h2>${escapeHtml(article.kit)}</h2>${abilities}</section><details><summary>${escapeHtml(article.showDemo)}</summary><video controls muted playsinline preload="none" poster="/images/agents/sova/drone-poster.webp" width="960" height="540"><source src="/images/agents/sova/abilities-overview.mp4" type="video/mp4" /></video></details><section><h2>${escapeHtml(article.storyTitle)}</h2>${article.story.map(p=>`<p>${escapeHtml(p)}</p>`).join('')}<a href="${SOVA_CINEMATIC}">${escapeHtml(article.cinematic)}</a></section><section><h2>${escapeHtml(article.galleryTitle)}</h2>${article.gallery.map(image=>`<a href="${image.src}"><img src="${image.src}" alt="${escapeHtml(image.label)}" width="${image.width}" height="${image.height}" loading="lazy" /></a>`).join('')}</section><details><summary>${escapeHtml(article.profileTitle)}</summary><p>${escapeHtml(article.originLabel)}: ${escapeHtml(article.origin)} · ${escapeHtml(article.roleLabel)}: ${escapeHtml(article.role)}</p><p>${escapeHtml(article.profileBody)}</p></details><section><h2>${escapeHtml(article.themeTitle)}</h2><p>${escapeHtml(article.themeDescription)}</p><code>${escapeHtml(SOVA_CROSSHAIR.code)}</code><p>${escapeHtml(article.importBody)}</p><a href="${routePath(locale,{type:'tool',toolKey:'generator'})}?theme=sova">${escapeHtml(article.adjust)}</a><a href="${routePath(locale,{type:'catalog'})}">${escapeHtml(article.more)}</a></section></main>`
    }
    if (route.articleKey === 'iso') {
      const abilities = article.abilities.map(a => `<section><h3>${escapeHtml(a.name)}</h3><img src="/images/agents/iso/${a.key}.webp" alt="" width="48" height="48" /><small>${a.binding}</small><p>${escapeHtml(a.effect)}</p><p>${escapeHtml(a.action)}</p><video controls muted playsinline preload="none" poster="/images/agents/iso/${a.key}-poster.webp" width="960" height="540" aria-label="${escapeHtml(a.name)}"><source src="/images/agents/iso/${a.key}.mp4" type="video/mp4" /></video></section>`).join('')
      return `<main class="seo-static-shell"><nav aria-label="Breadcrumb"><a href="${routePath(locale,{type:'home'})}">AimCodes</a> / ${escapeHtml(article.heroName)}</nav><header><h1>${escapeHtml(article.heroName)}</h1><p>${escapeHtml(article.intro)}</p><img class="seo-static-hero-image" src="${ISO_IMAGE}" alt="${escapeHtml(article.imageAlt)}" width="1920" height="1080" /><a href="#iso-abilities">${escapeHtml(article.watch)}</a></header><section id="iso-abilities"><h2>${escapeHtml(article.kit)}</h2>${abilities}</section><details><summary>${escapeHtml(article.showDemo)}</summary><video controls muted playsinline preload="none" poster="/images/agents/iso/wall-poster.webp" width="960" height="540"><source src="/images/agents/iso/abilities-overview.mp4" type="video/mp4" /></video></details><section><h2>${escapeHtml(article.storyTitle)}</h2>${article.story.map(p=>`<p>${escapeHtml(p)}</p>`).join('')}<a href="${ISO_CINEMATIC}">${escapeHtml(article.cinematic)}</a></section><section><h2>${escapeHtml(article.galleryTitle)}</h2>${article.gallery.map(image=>`<a href="${image.src}"><img src="${image.src}" alt="${escapeHtml(image.label)}" width="${image.width}" height="${image.height}" loading="lazy" /></a>`).join('')}</section><details><summary>${escapeHtml(article.profileTitle)}</summary><p>${escapeHtml(article.originLabel)}: ${escapeHtml(article.origin)} · ${escapeHtml(article.roleLabel)}: ${escapeHtml(article.role)}</p><p>${escapeHtml(article.profileBody)}</p></details><section><h2>${escapeHtml(article.themeTitle)}</h2><p>${escapeHtml(article.themeDescription)}</p><code>${escapeHtml(ISO_CROSSHAIR.code)}</code><p>${escapeHtml(article.importBody)}</p><a href="${routePath(locale,{type:'tool',toolKey:'generator'})}?theme=iso">${escapeHtml(article.adjust)}</a><a href="${routePath(locale,{type:'catalog'})}">${escapeHtml(article.more)}</a></section></main>`
    }
    if (route.articleKey === 'waylay') {
      const abilities = article.abilities.map(a => `<section><h3>${escapeHtml(a.name)}</h3><img src="/images/agents/waylay/${a.key}.webp" alt="" width="48" height="48" /><small>${a.binding}</small><p>${escapeHtml(a.effect)}</p><p>${escapeHtml(a.action)}</p><video controls muted playsinline preload="none" poster="/images/agents/waylay/${a.key}-poster.webp" width="960" height="540" aria-label="${escapeHtml(a.name)}"><source src="/images/agents/waylay/${a.key}.mp4" type="video/mp4" /></video></section>`).join('')
      return `<main class="seo-static-shell"><nav aria-label="Breadcrumb"><a href="${routePath(locale,{type:'home'})}">AimCodes</a> / ${escapeHtml(article.heroName)}</nav><header><h1>${escapeHtml(article.heroName)}</h1><p>${escapeHtml(article.intro)}</p><img class="seo-static-hero-image" src="${WAYLAY_IMAGE}" alt="${escapeHtml(article.imageAlt)}" width="1920" height="1080" /><a href="#waylay-abilities">${escapeHtml(article.watch)}</a></header><section id="waylay-abilities"><h2>${escapeHtml(article.kit)}</h2>${abilities}</section><details><summary>${escapeHtml(article.showDemo)}</summary><video controls muted playsinline preload="none" poster="/images/agents/waylay/saturate-poster.webp" width="960" height="540"><source src="/images/agents/waylay/abilities-overview.mp4" type="video/mp4" /></video></details><section><h2>${escapeHtml(article.storyTitle)}</h2>${article.story.map(p=>`<p>${escapeHtml(p)}</p>`).join('')}<a href="${WAYLAY_CINEMATIC}">${escapeHtml(article.cinematic)}</a></section><section><h2>${escapeHtml(article.galleryTitle)}</h2>${article.gallery.map(image=>`<a href="${image.src}"><img src="${image.src}" alt="${escapeHtml(image.label)}" width="${image.width}" height="${image.height}" loading="lazy" /></a>`).join('')}</section><details><summary>${escapeHtml(article.profileTitle)}</summary><p>${escapeHtml(article.originLabel)}: ${escapeHtml(article.origin)} · ${escapeHtml(article.roleLabel)}: ${escapeHtml(article.role)}</p><p>${escapeHtml(article.profileBody)}</p></details><section><h2>${escapeHtml(article.themeTitle)}</h2><p>${escapeHtml(article.themeDescription)}</p><code>${escapeHtml(WAYLAY_CROSSHAIR.code)}</code><p>${escapeHtml(article.importBody)}</p><a href="${routePath(locale,{type:'tool',toolKey:'generator'})}?theme=waylay">${escapeHtml(article.adjust)}</a><a href="${routePath(locale,{type:'catalog'})}">${escapeHtml(article.more)}</a></section></main>`
    }
    if (route.articleKey === 'fade') {
      const abilities = article.abilities.map(a => `<section><h3>${escapeHtml(a.name)}</h3><img src="/images/agents/fade/${a.key}.webp" alt="" width="48" height="48" /><small>${a.binding}</small><p>${escapeHtml(a.effect)}</p><p>${escapeHtml(a.action)}</p><video controls muted playsinline preload="none" poster="/images/agents/fade/${a.key}-poster.webp" width="960" height="540" aria-label="${escapeHtml(a.name)}"><source src="/images/agents/fade/${a.key}.mp4" type="video/mp4" /></video></section>`).join('')
      return `<main class="seo-static-shell"><nav aria-label="Breadcrumb"><a href="${routePath(locale,{type:'home'})}">AimCodes</a> / ${escapeHtml(article.heroName)}</nav><header><h1>${escapeHtml(article.heroName)}</h1><p>${escapeHtml(article.intro)}</p><img class="seo-static-hero-image" src="${FADE_IMAGE}" alt="${escapeHtml(article.imageAlt)}" width="1920" height="1080" /><a href="#fade-abilities">${escapeHtml(article.watch)}</a></header><section id="fade-abilities"><h2>${escapeHtml(article.kit)}</h2>${abilities}</section><details><summary>${escapeHtml(article.showDemo)}</summary><video controls muted playsinline preload="none" poster="/images/agents/fade/prowler-poster.webp" width="960" height="540"><source src="/images/agents/fade/abilities-overview.mp4" type="video/mp4" /></video></details><section><h2>${escapeHtml(article.storyTitle)}</h2>${article.story.map(p=>`<p>${escapeHtml(p)}</p>`).join('')}<a href="${FADE_CINEMATIC}">${escapeHtml(article.cinematic)}</a></section><section><h2>${escapeHtml(article.galleryTitle)}</h2>${article.gallery.map(image=>`<a href="${image.src}"><img src="${image.src}" alt="${escapeHtml(image.label)}" width="${image.width}" height="${image.height}" loading="lazy" /></a>`).join('')}</section><details><summary>${escapeHtml(article.profileTitle)}</summary><p>${escapeHtml(article.originLabel)}: ${escapeHtml(article.origin)} · ${escapeHtml(article.roleLabel)}: ${escapeHtml(article.role)}</p><p>${escapeHtml(article.profileBody)}</p></details><section><h2>${escapeHtml(article.themeTitle)}</h2><p>${escapeHtml(article.themeDescription)}</p><code>${escapeHtml(FADE_CROSSHAIR.code)}</code><p>${escapeHtml(article.importBody)}</p><a href="${routePath(locale,{type:'tool',toolKey:'generator'})}?theme=fade">${escapeHtml(article.adjust)}</a><a href="${routePath(locale,{type:'catalog'})}">${escapeHtml(article.more)}</a></section></main>`
    }
    if (route.articleKey === 'kayo') {
      const abilities = article.abilities.map(a => `<section><h3>${escapeHtml(a.name)}</h3><img src="/images/agents/kayo/${a.key}.webp" alt="" width="48" height="48" /><small>${a.binding}</small><p>${escapeHtml(a.effect)}</p><p>${escapeHtml(a.action)}</p><video controls muted playsinline preload="none" poster="/images/agents/kayo/${a.key}-poster.webp" width="960" height="540" aria-label="${escapeHtml(a.name)}"><source src="/images/agents/kayo/${a.key}.mp4" type="video/mp4" /></video></section>`).join('')
      return `<main class="seo-static-shell"><nav aria-label="Breadcrumb"><a href="${routePath(locale,{type:'home'})}">AimCodes</a> / ${escapeHtml(article.heroName)}</nav><header><h1>${escapeHtml(article.heroName)}</h1><p>${escapeHtml(article.intro)}</p><img class="seo-static-hero-image" src="${KAYO_IMAGE}" alt="${escapeHtml(article.imageAlt)}" width="1920" height="1080" /><a href="#kayo-abilities">${escapeHtml(article.watch)}</a></header><section id="kayo-abilities"><h2>${escapeHtml(article.kit)}</h2>${abilities}</section><details><summary>${escapeHtml(article.showDemo)}</summary><video controls muted playsinline preload="none" poster="/images/agents/kayo/frag-poster.webp" width="960" height="540"><source src="/images/agents/kayo/abilities-overview.mp4" type="video/mp4" /></video></details><section><h2>${escapeHtml(article.storyTitle)}</h2>${article.story.map(p=>`<p>${escapeHtml(p)}</p>`).join('')}<a href="${KAYO_CINEMATIC}">${escapeHtml(article.cinematic)}</a></section><section><h2>${escapeHtml(article.galleryTitle)}</h2>${article.gallery.map(image=>`<a href="${image.src}"><img src="${image.src}" alt="${escapeHtml(image.label)}" width="${image.width}" height="${image.height}" loading="lazy" /></a>`).join('')}</section><details><summary>${escapeHtml(article.profileTitle)}</summary><p>${escapeHtml(article.originLabel)}: ${escapeHtml(article.origin)} · ${escapeHtml(article.roleLabel)}: ${escapeHtml(article.role)}</p><p>${escapeHtml(article.profileBody)}</p></details><section><h2>${escapeHtml(article.themeTitle)}</h2><p>${escapeHtml(article.themeDescription)}</p><code>${escapeHtml(KAYO_CROSSHAIR.code)}</code><p>${escapeHtml(article.importBody)}</p><a href="${routePath(locale,{type:'tool',toolKey:'generator'})}?theme=kayo">${escapeHtml(article.adjust)}</a><a href="${routePath(locale,{type:'catalog'})}">${escapeHtml(article.more)}</a></section></main>`
    }
    if (route.articleKey === 'skye') {
      const abilities = article.abilities.map(a => `<section><h3>${escapeHtml(a.name)}</h3><img src="/images/agents/skye/${a.key}.webp" alt="" width="48" height="48" /><small>${a.binding}</small><p>${escapeHtml(a.effect)}</p><p>${escapeHtml(a.action)}</p><video controls muted playsinline preload="none" poster="/images/agents/skye/${a.key}-poster.webp" width="960" height="540" aria-label="${escapeHtml(a.name)}"><source src="/images/agents/skye/${a.key}.mp4" type="video/mp4" /></video></section>`).join('')
      return `<main class="seo-static-shell"><nav aria-label="Breadcrumb"><a href="${routePath(locale,{type:'home'})}">AimCodes</a> / ${escapeHtml(article.heroName)}</nav><header><h1>${escapeHtml(article.heroName)}</h1><p>${escapeHtml(article.intro)}</p><img class="seo-static-hero-image" src="${SKYE_IMAGE}" alt="${escapeHtml(article.imageAlt)}" width="1920" height="1080" /><a href="#skye-abilities">${escapeHtml(article.watch)}</a></header><section id="skye-abilities"><h2>${escapeHtml(article.kit)}</h2>${abilities}</section><details><summary>${escapeHtml(article.showDemo)}</summary><video controls muted playsinline preload="none" poster="/images/agents/skye/heal-poster.webp" width="960" height="540"><source src="/images/agents/skye/abilities-overview.mp4" type="video/mp4" /></video></details><section><h2>${escapeHtml(article.storyTitle)}</h2>${article.story.map(p=>`<p>${escapeHtml(p)}</p>`).join('')}<a href="${SKYE_CINEMATIC}">${escapeHtml(article.cinematic)}</a></section><section><h2>${escapeHtml(article.galleryTitle)}</h2>${article.gallery.map(image=>`<a href="${image.src}"><img src="${image.src}" alt="${escapeHtml(image.label)}" width="${image.width}" height="${image.height}" loading="lazy" /></a>`).join('')}</section><details><summary>${escapeHtml(article.profileTitle)}</summary><p>${escapeHtml(article.originLabel)}: ${escapeHtml(article.origin)} · ${escapeHtml(article.roleLabel)}: ${escapeHtml(article.role)}</p><p>${escapeHtml(article.profileBody)}</p></details><section><h2>${escapeHtml(article.themeTitle)}</h2><p>${escapeHtml(article.themeDescription)}</p><code>${escapeHtml(SKYE_CROSSHAIR.code)}</code><p>${escapeHtml(article.importBody)}</p><a href="${routePath(locale,{type:'tool',toolKey:'generator'})}?theme=skye">${escapeHtml(article.adjust)}</a><a href="${routePath(locale,{type:'catalog'})}">${escapeHtml(article.more)}</a></section></main>`
    }
    if (route.articleKey === 'breach') {
      const abilities = article.abilities.map(a => `<section><h3>${escapeHtml(a.name)}</h3><img src="/images/agents/breach/${a.key}.webp" alt="" width="48" height="48" /><small>${a.binding}</small><p>${escapeHtml(a.effect)}</p><p>${escapeHtml(a.action)}</p><video controls muted playsinline preload="none" poster="/images/agents/breach/${a.key}-poster.webp" width="960" height="540" aria-label="${escapeHtml(a.name)}"><source src="/images/agents/breach/${a.key}.mp4" type="video/mp4" /></video></section>`).join('')
      return `<main class="seo-static-shell"><nav aria-label="Breadcrumb"><a href="${routePath(locale,{type:'home'})}">AimCodes</a> / ${escapeHtml(article.heroName)}</nav><header><h1>${escapeHtml(article.heroName)}</h1><p>${escapeHtml(article.intro)}</p><img class="seo-static-hero-image" src="${BREACH_IMAGE}" alt="${escapeHtml(article.imageAlt)}" width="1920" height="1080" /><a href="#breach-abilities">${escapeHtml(article.watch)}</a></header><section id="breach-abilities"><h2>${escapeHtml(article.kit)}</h2>${abilities}</section><details><summary>${escapeHtml(article.showDemo)}</summary><video controls muted playsinline preload="none" poster="/images/agents/breach/aftershock-poster.webp" width="960" height="540"><source src="/images/agents/breach/abilities-overview.mp4" type="video/mp4" /></video></details><section><h2>${escapeHtml(article.storyTitle)}</h2>${article.story.map(p=>`<p>${escapeHtml(p)}</p>`).join('')}<a href="${BREACH_CINEMATIC}">${escapeHtml(article.cinematic)}</a></section><section><h2>${escapeHtml(article.galleryTitle)}</h2>${article.gallery.map(image=>`<a href="${image.src}"><img src="${image.src}" alt="${escapeHtml(image.label)}" width="${image.width}" height="${image.height}" loading="lazy" /></a>`).join('')}</section><details><summary>${escapeHtml(article.profileTitle)}</summary><p>${escapeHtml(article.originLabel)}: ${escapeHtml(article.origin)} · ${escapeHtml(article.roleLabel)}: ${escapeHtml(article.role)}</p><p>${escapeHtml(article.profileBody)}</p></details><section><h2>${escapeHtml(article.themeTitle)}</h2><p>${escapeHtml(article.themeDescription)}</p><code>${escapeHtml(BREACH_CROSSHAIR.code)}</code><p>${escapeHtml(article.importBody)}</p><a href="${routePath(locale,{type:'tool',toolKey:'generator'})}?theme=breach">${escapeHtml(article.adjust)}</a><a href="${routePath(locale,{type:'catalog'})}">${escapeHtml(article.more)}</a></section></main>`
    }
    if (route.articleKey === 'neon') {
      const abilities = article.abilities.map(a => `<section><h3>${escapeHtml(a.name)}</h3><img src="/images/agents/neon/${a.key}.webp" alt="" width="48" height="48" /><small>${a.binding}</small><p>${escapeHtml(a.effect)}</p><p>${escapeHtml(a.action)}</p><video controls muted playsinline preload="none" poster="/images/agents/neon/${a.key}-poster.webp" width="960" height="540" aria-label="${escapeHtml(a.name)}"><source src="/images/agents/neon/${a.key}.mp4" type="video/mp4" /></video></section>`).join('')
      return `<main class="seo-static-shell"><nav aria-label="Breadcrumb"><a href="${routePath(locale,{type:'home'})}">AimCodes</a> / ${escapeHtml(article.heroName)}</nav><header><h1>${escapeHtml(article.heroName)}</h1><p>${escapeHtml(article.intro)}</p><img class="seo-static-hero-image" src="${NEON_IMAGE}" alt="${escapeHtml(article.imageAlt)}" width="1920" height="1080" /><a href="#neon-abilities">${escapeHtml(article.watch)}</a></header><section id="neon-abilities"><h2>${escapeHtml(article.kit)}</h2>${abilities}</section><details><summary>${escapeHtml(article.showDemo)}</summary><video controls muted playsinline preload="none" poster="/images/agents/neon/lane-poster.webp" width="960" height="540"><source src="/images/agents/neon/abilities-overview.mp4" type="video/mp4" /></video></details><section><h2>${escapeHtml(article.storyTitle)}</h2>${article.story.map(p=>`<p>${escapeHtml(p)}</p>`).join('')}<a href="${NEON_CINEMATIC}">${escapeHtml(article.cinematic)}</a></section><section><h2>${escapeHtml(article.galleryTitle)}</h2>${article.gallery.map(image=>`<a href="${image.src}"><img src="${image.src}" alt="${escapeHtml(image.label)}" width="${image.width}" height="${image.height}" loading="lazy" /></a>`).join('')}</section><details><summary>${escapeHtml(article.profileTitle)}</summary><p>${escapeHtml(article.originLabel)}: ${escapeHtml(article.origin)} · ${escapeHtml(article.roleLabel)}: ${escapeHtml(article.role)}</p><p>${escapeHtml(article.profileBody)}</p></details><section><h2>${escapeHtml(article.themeTitle)}</h2><p>${escapeHtml(article.themeDescription)}</p><code>${escapeHtml(NEON_CROSSHAIR.code)}</code><p>${escapeHtml(article.importBody)}</p><a href="${routePath(locale,{type:'tool',toolKey:'generator'})}?theme=neon">${escapeHtml(article.adjust)}</a><a href="${routePath(locale,{type:'catalog'})}">${escapeHtml(article.more)}</a></section></main>`
    }
    if (route.articleKey === 'reyna') {
      const abilities = article.abilities.map(a => `<section><h3>${escapeHtml(a.name)}</h3><img src="/images/agents/reyna/${a.key}.webp" alt="" width="48" height="48" /><small>${a.binding}</small><p>${escapeHtml(a.effect)}</p><p>${escapeHtml(a.action)}</p><video controls muted playsinline preload="none" poster="/images/agents/reyna/${a.key}-poster.webp" width="960" height="540" aria-label="${escapeHtml(a.name)}"><source src="/images/agents/reyna/${a.key}.mp4" type="video/mp4" /></video></section>`).join('')
      return `<main class="seo-static-shell"><nav aria-label="Breadcrumb"><a href="${routePath(locale,{type:'home'})}">AimCodes</a> / ${escapeHtml(article.heroName)}</nav><header><h1>${escapeHtml(article.heroName)}</h1><p>${escapeHtml(article.intro)}</p><img class="seo-static-hero-image" src="${REYNA_IMAGE}" alt="${escapeHtml(article.imageAlt)}" width="1920" height="1080" /><a href="#reyna-abilities">${escapeHtml(article.watch)}</a></header><section id="reyna-abilities"><h2>${escapeHtml(article.kit)}</h2>${abilities}</section><details><summary>${escapeHtml(article.showDemo)}</summary><video controls muted playsinline preload="none" poster="/images/agents/reyna/leer-poster.webp" width="960" height="540"><source src="/images/agents/reyna/abilities-overview.mp4" type="video/mp4" /></video></details><section><h2>${escapeHtml(article.storyTitle)}</h2>${article.story.map(p=>`<p>${escapeHtml(p)}</p>`).join('')}<a href="${REYNA_CINEMATIC}">${escapeHtml(article.cinematic)}</a></section><section><h2>${escapeHtml(article.galleryTitle)}</h2>${article.gallery.map(image=>`<a href="${image.src}"><img src="${image.src}" alt="${escapeHtml(image.label)}" width="${image.width}" height="${image.height}" loading="lazy" /></a>`).join('')}</section><details><summary>${escapeHtml(article.profileTitle)}</summary><p>${escapeHtml(article.originLabel)}: ${escapeHtml(article.origin)} · ${escapeHtml(article.roleLabel)}: ${escapeHtml(article.role)}</p><p>${escapeHtml(article.profileBody)}</p></details><section><h2>${escapeHtml(article.themeTitle)}</h2><p>${escapeHtml(article.themeDescription)}</p><code>${escapeHtml(REYNA_CROSSHAIR.code)}</code><p>${escapeHtml(article.importBody)}</p><a href="${routePath(locale,{type:'tool',toolKey:'generator'})}?theme=reyna">${escapeHtml(article.adjust)}</a><a href="${routePath(locale,{type:'catalog'})}">${escapeHtml(article.more)}</a></section></main>`
    }
    if (route.articleKey === 'jett') {
      const abilities = article.abilities.map(a => `<section><h3>${escapeHtml(a.name)}</h3><img src="/images/agents/jett/${a.key}.webp" alt="" width="48" height="48" /><small>${a.binding}</small><p>${escapeHtml(a.effect)}</p><p>${escapeHtml(a.action)}</p><video controls muted playsinline preload="none" poster="/images/agents/jett/${a.key}-poster.webp" width="960" height="540" aria-label="${escapeHtml(a.name)}"><source src="/images/agents/jett/${a.key}.mp4" type="video/mp4" /></video></section>`).join('')
      return `<main class="seo-static-shell"><nav aria-label="Breadcrumb"><a href="${routePath(locale,{type:'home'})}">AimCodes</a> / ${escapeHtml(article.heroName)}</nav><header><h1>${escapeHtml(article.heroName)}</h1><p>${escapeHtml(article.intro)}</p><img class="seo-static-hero-image" src="${JETT_IMAGE}" alt="${escapeHtml(article.imageAlt)}" width="1920" height="1080" /><a href="#jett-abilities">${escapeHtml(article.watch)}</a></header><section id="jett-abilities"><h2>${escapeHtml(article.kit)}</h2>${abilities}</section><details><summary>${escapeHtml(article.showDemo)}</summary><video controls muted playsinline preload="none" poster="/images/agents/jett/cloudburst-poster.webp" width="960" height="540"><source src="/images/agents/jett/abilities-overview.mp4" type="video/mp4" /></video></details><section><h2>${escapeHtml(article.storyTitle)}</h2>${article.story.map(p=>`<p>${escapeHtml(p)}</p>`).join('')}<a href="${JETT_CINEMATIC}">${escapeHtml(article.cinematic)}</a></section><section><h2>${escapeHtml(article.galleryTitle)}</h2>${article.gallery.map(image=>`<a href="${image.src}"><img src="${image.src}" alt="${escapeHtml(image.label)}" width="${image.width}" height="${image.height}" loading="lazy" /></a>`).join('')}</section><details><summary>${escapeHtml(article.profileTitle)}</summary><p>${escapeHtml(article.originLabel)}: ${escapeHtml(article.origin)} · ${escapeHtml(article.roleLabel)}: ${escapeHtml(article.role)}</p><p>${escapeHtml(article.profileBody)}</p></details><section><h2>${escapeHtml(article.themeTitle)}</h2><p>${escapeHtml(article.themeDescription)}</p><code>${escapeHtml(JETT_CROSSHAIR.code)}</code><p>${escapeHtml(article.importBody)}</p><a href="${routePath(locale,{type:'tool',toolKey:'generator'})}?theme=jett">${escapeHtml(article.adjust)}</a><a href="${routePath(locale,{type:'catalog'})}">${escapeHtml(article.more)}</a></section></main>`
    }
    if (route.articleKey === 'raze') {
      const abilities = article.abilities.map(a => `<section><h3>${escapeHtml(a.name)}</h3><img src="/images/agents/raze/${a.key}.webp" alt="" width="48" height="48" /><small>${a.binding}</small><p>${escapeHtml(a.effect)}</p><p>${escapeHtml(a.action)}</p><video controls muted playsinline preload="none" poster="/images/agents/raze/${a.key}-poster.webp" width="960" height="540" aria-label="${escapeHtml(a.name)}"><source src="/images/agents/raze/${a.key}.mp4" type="video/mp4" /></video></section>`).join('')
      return `<main class="seo-static-shell"><nav aria-label="Breadcrumb"><a href="${routePath(locale,{type:'home'})}">AimCodes</a> / ${escapeHtml(article.heroName)}</nav><header><h1>${escapeHtml(article.heroName)}</h1><p>${escapeHtml(article.intro)}</p><img class="seo-static-hero-image" src="${RAZE_IMAGE}" alt="${escapeHtml(article.imageAlt)}" width="1920" height="1080" /><a href="#raze-abilities">${escapeHtml(article.watch)}</a></header><section id="raze-abilities"><h2>${escapeHtml(article.kit)}</h2>${abilities}</section><details><summary>${escapeHtml(article.showDemo)}</summary><video controls muted playsinline preload="none" poster="/images/agents/raze/bot-poster.webp" width="960" height="540"><source src="/images/agents/raze/abilities-overview.mp4" type="video/mp4" /></video></details><section><h2>${escapeHtml(article.storyTitle)}</h2>${article.story.map(p=>`<p>${escapeHtml(p)}</p>`).join('')}<a href="${RAZE_CINEMATIC}">${escapeHtml(article.cinematic)}</a></section><section><h2>${escapeHtml(article.galleryTitle)}</h2>${article.gallery.map(image=>`<a href="${image.src}"><img src="${image.src}" alt="${escapeHtml(image.label)}" width="${image.width}" height="${image.height}" loading="lazy" /></a>`).join('')}</section><details><summary>${escapeHtml(article.profileTitle)}</summary><p>${escapeHtml(article.originLabel)}: ${escapeHtml(article.origin)} · ${escapeHtml(article.roleLabel)}: ${escapeHtml(article.role)}</p><p>${escapeHtml(article.profileBody)}</p></details><section><h2>${escapeHtml(article.themeTitle)}</h2><p>${escapeHtml(article.themeDescription)}</p><code>${escapeHtml(RAZE_CROSSHAIR.code)}</code><p>${escapeHtml(article.importBody)}</p><a href="${routePath(locale,{type:'tool',toolKey:'generator'})}?theme=raze">${escapeHtml(article.adjust)}</a><a href="${routePath(locale,{type:'catalog'})}">${escapeHtml(article.more)}</a></section></main>`
    }
    if (route.articleKey === 'chamber') {
      const abilities = article.abilities.map(a => `<section><h3>${escapeHtml(a.name)}</h3><img src="/images/agents/chamber/${a.key}.webp" alt="" width="48" height="48" /><small>${a.binding}</small><p>${escapeHtml(a.effect)}</p><p>${escapeHtml(a.action)}</p><video controls muted playsinline preload="none" poster="/images/agents/chamber/${a.key}-poster.webp" width="960" height="540" aria-label="${escapeHtml(a.name)}"><source src="/images/agents/chamber/${a.key}.mp4" type="video/mp4" /></video></section>`).join('')
      return `<main class="seo-static-shell"><nav aria-label="Breadcrumb"><a href="${routePath(locale,{type:'home'})}">AimCodes</a> / ${escapeHtml(article.heroName)}</nav><header><h1>${escapeHtml(article.heroName)}</h1><p>${escapeHtml(article.intro)}</p><picture><source media="(max-width: 680px)" srcset="/images/agents/chamber/hero-mobile.webp" /><img class="seo-static-hero-image" src="${CHAMBER_IMAGE}" alt="${escapeHtml(article.imageAlt)}" width="1920" height="1080" /></picture><a href="#chamber-abilities">${escapeHtml(article.watch)}</a></header><section id="chamber-abilities"><h2>${escapeHtml(article.kit)}</h2>${abilities}</section><details><summary>${escapeHtml(article.showDemo)}</summary><video controls muted playsinline preload="none" poster="/images/agents/chamber/trademark-poster.webp" width="960" height="540"><source src="/images/agents/chamber/abilities-overview.mp4" type="video/mp4" /></video></details><section><h2>${escapeHtml(article.storyTitle)}</h2>${article.story.map(p=>`<p>${escapeHtml(p)}</p>`).join('')}<a href="${CHAMBER_CINEMATIC}">${escapeHtml(article.cinematic)}</a></section><section><h2>${escapeHtml(article.galleryTitle)}</h2>${article.gallery.map(image=>`<a href="${image.src}"><img src="${image.src}" alt="${escapeHtml(image.label)}" width="${image.width}" height="${image.height}" loading="lazy" /></a>`).join('')}</section><details><summary>${escapeHtml(article.profileTitle)}</summary><p>${escapeHtml(article.originLabel)}: ${escapeHtml(article.origin)} · ${escapeHtml(article.roleLabel)}: ${escapeHtml(article.role)}</p><p>${escapeHtml(article.profileBody)}</p></details><section><h2>${escapeHtml(article.themeTitle)}</h2><p>${escapeHtml(article.themeDescription)}</p><code>${escapeHtml(CHAMBER_CROSSHAIR.code)}</code><p>${escapeHtml(article.importBody)}</p><a href="${routePath(locale,{type:'tool',toolKey:'generator'})}?theme=chamber">${escapeHtml(article.adjust)}</a><a href="${routePath(locale,{type:'catalog'})}">${escapeHtml(article.more)}</a></section></main>`
    }
    if (route.articleKey === 'brimstone') {
      const abilities = article.abilities.map(a => `<section><h3>${escapeHtml(a.name)}</h3><img src="/images/agents/brimstone/${a.key}.webp" alt="" width="48" height="48" /><small>${a.binding}</small><p>${escapeHtml(a.effect)}</p><p>${escapeHtml(a.action)}</p><video controls muted playsinline preload="none" poster="/images/agents/brimstone/${a.key}-poster.webp" width="960" height="540" aria-label="${escapeHtml(a.name)}"><source src="/images/agents/brimstone/${a.key}.mp4" type="video/mp4" /></video></section>`).join('')
      return `<main class="seo-static-shell"><nav aria-label="Breadcrumb"><a href="${routePath(locale,{type:'home'})}">AimCodes</a> / ${escapeHtml(article.heroName)}</nav><header><h1>${escapeHtml(article.heroName)}</h1><p>${escapeHtml(article.intro)}</p><img class="seo-static-hero-image" src="${BRIMSTONE_IMAGE}" alt="${escapeHtml(article.imageAlt)}" width="1920" height="1080" /><a href="#brimstone-abilities">${escapeHtml(article.watch)}</a></header><section id="brimstone-abilities"><h2>${escapeHtml(article.kit)}</h2>${abilities}</section><details><summary>${escapeHtml(article.showDemo)}</summary><video controls muted playsinline preload="none" poster="/images/agents/brimstone/stim-poster.webp" width="960" height="540"><source src="/images/agents/brimstone/abilities-overview.mp4" type="video/mp4" /></video></details><section><h2>${escapeHtml(article.storyTitle)}</h2>${article.story.map(p=>`<p>${escapeHtml(p)}</p>`).join('')}<a href="${BRIMSTONE_CINEMATIC}">${escapeHtml(article.cinematic)}</a></section><section><h2>${escapeHtml(article.galleryTitle)}</h2>${article.gallery.map(image=>`<a href="${image.src}"><img src="${image.src}" alt="${escapeHtml(image.label)}" width="${image.width}" height="${image.height}" loading="lazy" /></a>`).join('')}</section><details><summary>${escapeHtml(article.profileTitle)}</summary><p>${escapeHtml(article.originLabel)}: ${escapeHtml(article.origin)} · ${escapeHtml(article.roleLabel)}: ${escapeHtml(article.role)}</p><p>${escapeHtml(article.profileBody)}</p></details><section><h2>${escapeHtml(article.themeTitle)}</h2><p>${escapeHtml(article.themeDescription)}</p><code>${escapeHtml(BRIMSTONE_CROSSHAIR.code)}</code><p>${escapeHtml(article.importBody)}</p><a href="${routePath(locale,{type:'tool',toolKey:'generator'})}?theme=brimstone">${escapeHtml(article.adjust)}</a><a href="${routePath(locale,{type:'catalog'})}">${escapeHtml(article.more)}</a></section></main>`
    }
    if (route.articleKey === 'omen') {
      const abilities = article.abilities.map(a => `<section><h3>${escapeHtml(a.name)}</h3><img src="/images/agents/omen/${a.key}.webp" alt="" width="48" height="48" /><small>${a.binding}</small><p>${escapeHtml(a.effect)}</p><p>${escapeHtml(a.action)}</p><video controls muted playsinline preload="none" poster="/images/agents/omen/${a.key}-poster.webp" width="960" height="540" aria-label="${escapeHtml(a.name)}"><source src="/images/agents/omen/${a.key}.mp4" type="video/mp4" /></video></section>`).join('')
      return `<main class="seo-static-shell"><nav aria-label="Breadcrumb"><a href="${routePath(locale,{type:'home'})}">AimCodes</a> / ${escapeHtml(article.heroName)}</nav><header><h1>${escapeHtml(article.heroName)}</h1><p>${escapeHtml(article.intro)}</p><img class="seo-static-hero-image" src="${OMEN_IMAGE}" alt="${escapeHtml(article.imageAlt)}" width="1920" height="1080" /><a href="#omen-abilities">${escapeHtml(article.watch)}</a></header><section id="omen-abilities"><h2>${escapeHtml(article.kit)}</h2>${abilities}</section><details><summary>${escapeHtml(article.showDemo)}</summary><video controls muted playsinline preload="none" poster="/images/agents/omen/step-poster.webp" width="960" height="540"><source src="/images/agents/omen/abilities-overview.mp4" type="video/mp4" /></video></details><section><h2>${escapeHtml(article.storyTitle)}</h2>${article.story.map(p=>`<p>${escapeHtml(p)}</p>`).join('')}<a href="${OMEN_CINEMATIC}">${escapeHtml(article.cinematic)}</a></section><section><h2>${escapeHtml(article.galleryTitle)}</h2>${article.gallery.map(image=>`<a href="${image.src}"><img src="${image.src}" alt="${escapeHtml(image.label)}" width="${image.width}" height="${image.height}" loading="lazy" /></a>`).join('')}</section><details><summary>${escapeHtml(article.profileTitle)}</summary><p>${escapeHtml(article.originLabel)}: ${escapeHtml(article.origin)} · ${escapeHtml(article.roleLabel)}: ${escapeHtml(article.role)}</p><p>${escapeHtml(article.profileBody)}</p></details><section><h2>${escapeHtml(article.themeTitle)}</h2><p>${escapeHtml(article.themeDescription)}</p><code>${escapeHtml(OMEN_CROSSHAIR.code)}</code><p>${escapeHtml(article.importBody)}</p><a href="${routePath(locale,{type:'tool',toolKey:'generator'})}?theme=omen">${escapeHtml(article.adjust)}</a><a href="${routePath(locale,{type:'catalog'})}">${escapeHtml(article.more)}</a></section></main>`
    }
    if (route.articleKey === 'viper') {
      const abilities = article.abilities.map(a => `<section><h3>${escapeHtml(a.name)}</h3><img src="/images/agents/viper/${a.key}.webp" alt="" width="48" height="48" /><small>${a.binding}</small><p>${escapeHtml(a.effect)}</p><p>${escapeHtml(a.action)}</p><video controls muted playsinline preload="none" poster="/images/agents/viper/${a.key}-poster.webp" width="960" height="540" aria-label="${escapeHtml(a.name)}"><source src="/images/agents/viper/${a.key}.mp4" type="video/mp4" /></video></section>`).join('')
      return `<main class="seo-static-shell"><nav aria-label="Breadcrumb"><a href="${routePath(locale,{type:'home'})}">AimCodes</a> / ${escapeHtml(article.heroName)}</nav><header><h1>${escapeHtml(article.heroName)}</h1><p>${escapeHtml(article.intro)}</p><img class="seo-static-hero-image" src="${VIPER_IMAGE}" alt="${escapeHtml(article.imageAlt)}" width="1920" height="1080" /><a href="#viper-abilities">${escapeHtml(article.watch)}</a></header><section id="viper-abilities"><h2>${escapeHtml(article.kit)}</h2>${abilities}</section><details><summary>${escapeHtml(article.showDemo)}</summary><video controls muted playsinline preload="none" poster="/images/agents/viper/bite-poster.webp" width="960" height="540"><source src="/images/agents/viper/abilities-overview.mp4" type="video/mp4" /></video></details><section><h2>${escapeHtml(article.storyTitle)}</h2>${article.story.map(p=>`<p>${escapeHtml(p)}</p>`).join('')}<a href="${VIPER_CINEMATIC}">${escapeHtml(article.cinematic)}</a></section><section><h2>${escapeHtml(article.galleryTitle)}</h2>${article.gallery.map(image=>`<a href="${image.src}"><img src="${image.src}" alt="${escapeHtml(image.label)}" width="${image.width}" height="${image.height}" loading="lazy" /></a>`).join('')}</section><details><summary>${escapeHtml(article.profileTitle)}</summary><p>${escapeHtml(article.originLabel)}: ${escapeHtml(article.origin)} · ${escapeHtml(article.roleLabel)}: ${escapeHtml(article.role)}</p><p>${escapeHtml(article.profileBody)}</p></details><section><h2>${escapeHtml(article.themeTitle)}</h2><p>${escapeHtml(article.themeDescription)}</p><code>${escapeHtml(VIPER_CROSSHAIR.code)}</code><p>${escapeHtml(article.importBody)}</p><a href="${routePath(locale,{type:'tool',toolKey:'generator'})}?theme=viper">${escapeHtml(article.adjust)}</a><a href="${routePath(locale,{type:'catalog'})}">${escapeHtml(article.more)}</a></section></main>`
    }
    if (route.articleKey === 'phoenix') {
      const abilities = article.abilities.map(a => `<section><h3>${escapeHtml(a.name)}</h3><img src="/images/agents/phoenix/${a.key}.webp" alt="" width="48" height="48" /><small>${a.binding}</small><p>${escapeHtml(a.effect)}</p><p>${escapeHtml(a.action)}</p><video controls muted playsinline preload="none" poster="/images/agents/phoenix/${a.key}-poster.webp" width="960" height="540" aria-label="${escapeHtml(a.name)}"><source src="/images/agents/phoenix/${a.key}.mp4" type="video/mp4" /></video></section>`).join('')
      return `<main class="seo-static-shell"><nav aria-label="Breadcrumb"><a href="${routePath(locale,{type:'home'})}">AimCodes</a> / ${escapeHtml(article.heroName)}</nav><header><h1>${escapeHtml(article.heroName)}</h1><p>${escapeHtml(article.intro)}</p><img class="seo-static-hero-image" src="${PHOENIX_IMAGE}" alt="${escapeHtml(article.imageAlt)}" width="1920" height="1080" /><a href="#phoenix-abilities">${escapeHtml(article.watch)}</a></header><section id="phoenix-abilities"><h2>${escapeHtml(article.kit)}</h2>${abilities}</section><details><summary>${escapeHtml(article.showDemo)}</summary><video controls muted playsinline preload="none" poster="/images/agents/phoenix/wall-poster.webp" width="960" height="540"><source src="/images/agents/phoenix/abilities-overview.mp4" type="video/mp4" /></video></details><section><h2>${escapeHtml(article.storyTitle)}</h2>${article.story.map(p=>`<p>${escapeHtml(p)}</p>`).join('')}<a href="${PHOENIX_CINEMATIC}">${escapeHtml(article.cinematic)}</a></section><section><h2>${escapeHtml(article.galleryTitle)}</h2>${article.gallery.map(image=>`<a href="${image.src}"><img src="${image.src}" alt="${escapeHtml(image.label)}" width="${image.width}" height="${image.height}" loading="lazy" /></a>`).join('')}</section><details><summary>${escapeHtml(article.profileTitle)}</summary><p>${escapeHtml(article.originLabel)}: ${escapeHtml(article.origin)} · ${escapeHtml(article.roleLabel)}: ${escapeHtml(article.role)}</p><p>${escapeHtml(article.profileBody)}</p></details><section><h2>${escapeHtml(article.themeTitle)}</h2><p>${escapeHtml(article.themeDescription)}</p><code>${escapeHtml(PHOENIX_CROSSHAIR.code)}</code><p>${escapeHtml(article.importBody)}</p><a href="${routePath(locale,{type:'tool',toolKey:'generator'})}?theme=phoenix">${escapeHtml(article.adjust)}</a><a href="${routePath(locale,{type:'catalog'})}">${escapeHtml(article.more)}</a></section></main>`
    }
    if (route.articleKey === 'sage') {
      const abilities = article.abilities.map(a => `<section id="${a.key}"><h3>${escapeHtml(a.name)} · ${a.binding}</h3><p>${escapeHtml(a.effect)}</p><h4>${escapeHtml(a.question)}</h4><p>${escapeHtml(a.body)}</p><video controls muted playsinline preload="none" poster="/images/agents/sage/${a.key}-poster.webp" width="1280" height="720" aria-label="${escapeHtml(a.name)}"><source src="/images/agents/sage/${a.key}.mp4" type="video/mp4" /></video></section>`).join('')
      const sources = article.sources.map(source => `<a href="${escapeHtml(source.url)}">${escapeHtml(source.label)}</a>`).join(' ')
      return `<main class="seo-static-shell"><nav aria-label="Breadcrumb"><a href="${routePath(locale,{type:'home'})}">AimCodes</a> / ${escapeHtml(article.heroName)}</nav><header><h1>${escapeHtml(article.heroName)}</h1><p>${escapeHtml(article.intro)}</p><img class="seo-static-hero-image" src="${SAGE_IMAGE}" alt="${escapeHtml(article.imageAlt)}" width="1280" height="540" /></header><section><h2>${escapeHtml(article.kit)}</h2>${abilities}</section><details><summary>${escapeHtml(article.showDemo)}</summary><video controls muted playsinline preload="none" width="768" height="432" poster="/images/agents/sage/wall-poster.webp" aria-label="${escapeHtml(article.showDemo)}"><source src="/images/agents/sage/abilities-overview.mp4" type="video/mp4" /></video></details><section><h2>${escapeHtml(article.storyTitle)}</h2>${article.story.map(p=>`<p>${escapeHtml(p)}</p>`).join('')}<a href="https://www.youtube.com/watch?v=XfuMEmcz3k0">${escapeHtml(article.cinematic)}</a></section><section><h2>${escapeHtml(article.galleryTitle)}</h2>${article.gallery.map(image=>`<figure><a href="${image.src}"><img src="${image.src}" alt="${escapeHtml(image.label)}" width="${image.width}" height="${image.height}" loading="lazy"/></a></figure>`).join('')}</section><details><summary>${escapeHtml(article.profileTitle)}</summary><p>${escapeHtml(article.originLabel)}: ${escapeHtml(article.origin)} · ${escapeHtml(article.roleLabel)}: ${escapeHtml(article.role)}</p><p>${escapeHtml(article.profileBody)}</p></details><section><h2>${escapeHtml(article.themeTitle)}</h2><p>${escapeHtml(article.themeDescription)}</p><code>${escapeHtml(SAGE_CROSSHAIR.code)}</code><h3>${escapeHtml(article.importTitle)}</h3><p>${escapeHtml(article.importBody)}</p><a href="${routePath(locale,{type:'tool',toolKey:'generator'})}?theme=sage">${escapeHtml(article.adjust)}</a><a href="${routePath(locale,{type:'catalog'})}">${escapeHtml(article.more)}</a></section><details><summary>${escapeHtml(article.sourcesTitle)}</summary><p>${escapeHtml(article.sourceNote)}</p>${sources}</details></main>`
    }
    if (route.articleKey === 'hush') {
      const { ui } = article
      const theme = hushCrosshairCopy(locale)
      const regions = locale === 'zh-CN' ? [['china', 3], ['international', 4]] : [['international', 4], ['china', 3]]
      const dates = regions.map(([region, sourceIndex]) => `<dt>${escapeHtml(ui[region])}</dt><dd><a href="${escapeHtml(article.sources[sourceIndex].url)}">${escapeHtml(ui[`${region}Date`])}</a></dd>`).join('')
      const abilities = article.abilities.map(ability => `<section><header><h3>${escapeHtml(ability.name)}${ability.label !== ability.name ? `<small>${escapeHtml(ability.label)}</small>` : ''}</h3><div><img src="${ability.media.icon}" alt="" width="48" height="48" loading="lazy" /><small>${escapeHtml(ability.binding)}</small></div></header><p>${escapeHtml(ui.effect)}: ${escapeHtml(ability.body)}</p><p>${escapeHtml(ui.action)}: ${escapeHtml(ability.action)}</p><video controls muted loop playsinline preload="none" width="768" height="432" poster="${ability.media.poster}" aria-label="${escapeHtml(ability.label)}"><source src="${ability.media.src}" type="video/mp4" /></video></section>`).join('')
      const unlock = regions.map(([region]) => `<p><strong>${escapeHtml(ui[region])}</strong> ${escapeHtml(region === 'china' ? ui.chinaUnlock : article.internationalUnlock)}</p>`).join('')
      const gallery = article.gallery.map(image => `<figure><a href="${image.src}"><img src="${image.src}" alt="${escapeHtml(image.label)}" width="${image.width}" height="${image.height}" loading="lazy" /></a><figcaption>${escapeHtml(image.label)}</figcaption></figure>`).join('')
      const story = article.story.map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')
      return `<main class="seo-static-shell"><nav aria-label="Breadcrumb"><a href="${routePath(locale, { type: 'home' })}">AimCodes</a> / <span>${escapeHtml(ui.heroTitle)}</span></nav><header><h1>${escapeHtml(ui.heroTitle)}</h1><p>${escapeHtml(article.intro)}</p><img class="seo-static-hero-image" src="${HUSH_IMAGE}" width="1440" height="810" alt="${escapeHtml(ui.imageAlt)}" /><a href="#hush-abilities">${escapeHtml(ui.kit)}</a></header><section id="hush-abilities"><h2>${escapeHtml(ui.kit)}</h2><p>${escapeHtml(ui.kitNote)}</p>${abilities}</section><details><summary>${escapeHtml(ui.showDemo)}</summary><a href="${HUSH_VIDEOS[1].url}">${escapeHtml(ui.watch)}</a></details><section id="hush-story"><h2>${escapeHtml(ui.storyTitle)}</h2>${story}<a href="${HUSH_VIDEOS[0].url}">RISE AND FALL · ${escapeHtml(ui.videoNames[0])}</a><a href="${article.sources[3].url}">${escapeHtml(ui.chineseVideo)}</a></section><section><h2>${escapeHtml(ui.galleryTitle)}</h2>${gallery}</section><details><summary>${escapeHtml(ui.releaseLabel)}</summary><dl>${dates}</dl>${unlock}</details><section><h2>${escapeHtml(theme.title)}</h2><p>${escapeHtml(theme.description)}</p><code>${escapeHtml(HUSH_CROSSHAIR.code)}</code><p>${escapeHtml(theme.importBody)}</p><a href="${routePath(locale, { type: 'tool', toolKey: 'generator' })}?theme=hush">${escapeHtml(theme.adjust)}</a><a href="${routePath(locale, { type: 'catalog' })}">${escapeHtml(theme.more)}</a></section><p><a href="${HUSH_VIDEOS[0].url}">${escapeHtml(ui.credit)}</a></p></main>`

    }
    const sections = article.sections.map((section) => `<section><h2>${escapeHtml(section.title)}</h2>${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}${section.bullets?.length ? `<ul>${section.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}</ul>` : ''}</section>`).join('')
    const faq = article.faq.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join('')
    const recommended = article.recommendedCrosshairIds.map((id) => localizedCrosshairs.find((item) => item.id === id)).filter(Boolean)
    const discoverableCollectionSet = new Set(DISCOVERABLE_COLLECTION_KEYS)
    const related = `${(article.relatedArticleKeys || []).map((articleKey) => `<a href="${routePath(locale, { type: 'article', articleKey })}">${escapeHtml(articleCopy(locale, articleKey).title)}</a>`).join('')}${(article.relatedCollectionKeys || []).filter((collectionKey) => discoverableCollectionSet.has(collectionKey)).map((collectionKey) => `<a href="${routePath(locale, { type: 'collection', collectionKey })}">${escapeHtml(collectionCopy(locale, collectionKey).title)}</a>`).join('')}${(article.relatedToolKeys || []).map((toolKey) => `<a href="${routePath(locale, { type: 'tool', toolKey })}">${escapeHtml(seoToolCopy(locale, toolKey).title)}</a>`).join('')}`
    const sources = article.sources?.length ? `<section><h2>${escapeHtml(staticReferenceLabel(locale))}</h2>${article.sources.map((source) => `<a href="${escapeHtml(source.url)}">${escapeHtml(source.label)}</a>`).join('')}</section>` : ''
    const statistics = route.articleKey === 'statistics' ? staticStatisticsSnapshot(locale) : ''

    return `<main class="seo-static-shell"><nav aria-label="Breadcrumb"><a href="${routePath(locale, { type: 'home' })}">AimCodes</a> / <span>${escapeHtml(article.title)}</span></nav><h1>${escapeHtml(article.title)}</h1><p>${escapeHtml(article.intro)}</p><section><h2>${escapeHtml(article.summaryTitle)}</h2><p>${escapeHtml(article.summary)}</p></section>${statistics}${route.articleKey === 'colors' ? staticColorComparison(locale) : ''}${sections}${staticLinks(locale, recommended)}<h2>${escapeHtml(staticFaqLabel(locale))}</h2>${faq}${sources}<nav class="seo-static-links">${related}</nav></main>`
  }
  if (route.type === 'tool') {
    const tool = seoToolCopy(locale, route.toolKey)
    const related = SEO_TOOL_KEYS.filter((toolKey) => toolKey !== route.toolKey).map((toolKey) => `<a href="${routePath(locale, { type: 'tool', toolKey })}">${escapeHtml(seoToolCopy(locale, toolKey).title)}</a>`).join('')
    const tips = tool.tips.map((tip) => `<article><h3>${escapeHtml(tip.title)}</h3><p>${escapeHtml(tip.body)}</p></article>`).join('')
    const faq = tool.faq.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join('')
    return `<main class="seo-static-shell"><nav aria-label="Breadcrumb"><a href="${routePath(locale, { type: 'home' })}">AimCodes</a> / <span>${escapeHtml(tool.title)}</span></nav><h1>${escapeHtml(tool.title)}</h1><p>${escapeHtml(tool.intro)}</p><section><h2>${escapeHtml(tool.guideTitle)}</h2><p>${escapeHtml(tool.guideIntro)}</p>${tips}</section><section><h2>${escapeHtml(staticFaqLabel(locale))}</h2>${faq}</section><nav class="seo-static-links">${related}${route.toolKey === 'generator' ? [routePath(locale, { type: 'catalog' }), routePath(locale, { type: 'guide' }), routePath(locale, { type: 'article', articleKey: 'settings' })].map((href, index) => `<a href="${href}">${escapeHtml(reviewCopy(locale).toolLinks[index])}</a>`).join('') : ''}<a href="${routePath(locale, { type: 'finder' })}">${escapeHtml(localized.meta.finderTitle)}</a></nav></main>`
  }
  if (route.type === 'trust') {
    const page = trustCopy(locale, route.pageKey)
    const sections = page.sections.map((section) => {
      const paragraphs = section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')
      const bullets = section.bullets?.length ? `<ul>${section.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}</ul>` : ''
      const links = section.links?.length ? `<div class="seo-static-links">${section.links.map((link) => `<a href="${escapeHtml(link.url)}">${escapeHtml(link.label)}</a>`).join('')}</div>` : ''
      return `<section><h2>${escapeHtml(section.title)}</h2>${paragraphs}${bullets}${links}</section>`
    }).join('')
    return `<main class="seo-static-shell"><h1>${escapeHtml(page.title)}</h1><p>${escapeHtml(page.intro)}</p><p>${escapeHtml(page.updated)}: ${TRUST_UPDATED_AT}</p>${sections}</main>`
  }
  if (route.type === 'crosshair' && crosshair) {
    const details = detailCopy(locale, crosshair)
    const indexableItems = indexableCrosshairIds.map((id) => localizedCrosshairs.find((item) => item.id === id))
      .filter((item) => item && item.id !== crosshair.id)
    const related = [
      ...indexableItems.filter((item) => item.category === crosshair.category),
      ...indexableItems,
    ].filter((item, index, items) => items.findIndex((candidate) => candidate.id === item.id) === index).slice(0, 6)
    const discoverableCollectionSet = new Set(DISCOVERABLE_COLLECTION_KEYS)
    const relatedCollections = collectionKeysForCatalogCrosshair(crosshair.id)
      .filter((collectionKey) => discoverableCollectionSet.has(collectionKey))
      .map((collectionKey) => `<a href="${routePath(locale, { type: 'collection', collectionKey })}">${escapeHtml(collectionCopy(locale, collectionKey).label)}</a>`)
      .join('')
    const contextualLinks = relatedCollections ? `<nav class="seo-static-links" aria-label="${escapeHtml(localized.detail.compareStyle)}">${relatedCollections}</nav>` : ''
    const codeSource = crosshair.sourceUrl && crosshair.sourceName ? `<p><a href="${escapeHtml(crosshair.sourceUrl)}">${escapeHtml(crosshair.sourceName)}</a>${crosshair.id === 'aspas-dot' && crosshair.sourceCheckedAt ? ` · ${escapeHtml(reviewCopy(locale).sourceDate)}: <time datetime="${escapeHtml(crosshair.sourceCheckedAt)}">${escapeHtml(crosshair.sourceCheckedAt)}</time> · ${escapeHtml(reviewCopy(locale).sourceNote)}` : ''}</p>` : ''
    return `<main class="seo-static-shell"><h1>${escapeHtml(detailHeading(locale, crosshair))}</h1><p>${escapeHtml(crosshair.description)}</p>${staticHeroImage(locale, route, crosshair)}<code>${escapeHtml(crosshair.code)}</code>${codeSource}<h2>${escapeHtml(localized.detail.bestFor)}</h2><p>${escapeHtml(details.bestFor)}</p><h2>${escapeHtml(localized.detail.tradeoff)}</h2><p>${escapeHtml(details.tradeoff)}</p>${contextualLinks}${staticTopicLinks(locale)}${staticLinks(locale, related)}</main>`
  }
  return '<main class="seo-static-shell"><h1>Page not found</h1></main>'
}

function replaceRoot(html, body) {
  return html.replace('<div id="root"></div>', `<div id="root">${body}</div>`)
}

function localizedHtml(template, locale, route, crosshair, localizedCrosshairs, indexed) {
  const config = localeRoutes[locale]
  const metadata = routeMetadata(locale, route, crosshair)
  return replaceRoot(
    replaceSeoBlock(template, seoBlock(locale, route, crosshair, localizedCrosshairs, indexed))
      .replace(/<html lang="[^"]*">/, `<html lang="${config.htmlLang}">`)
      .replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(metadata.title)}</title>`)
      .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(metadata.description)}" />`),
    staticBody(locale, route, crosshair, localizedCrosshairs),
  )
}

const template = await readFile(sourcePath, 'utf8')
const indexedRoutes = []
let generatedCount = 0

for (const locale of Object.keys(localeRoutes)) {
  const t = createTranslator(locale)
  const localizedCrosshairs = catalogCrosshairs.map((item) => localizeCrosshair(item, locale, t))
  const baseRoutes = [
    { type: 'home' },
    { type: 'catalog' },
    { type: 'players' },
    { type: 'finder' },
    { type: 'guide' },
    ...crosshairCollectionKeys.map((collectionKey) => ({ type: 'collection', collectionKey })),
    ...SEO_ARTICLE_KEYS.map((articleKey) => ({ type: 'article', articleKey })),
    ...SEO_TOOL_KEYS.map((toolKey) => ({ type: 'tool', toolKey })),
    ...TRUST_PAGE_KEYS.map((pageKey) => ({ type: 'trust', pageKey })),
    ...PAID_PAGE_KEYS.map((pageKey) => ({ type: 'paid', pageKey })),
  ]
  const detailRoutes = localizedCrosshairs.map((item) => ({ type: 'crosshair', crosshairId: item.id }))

  for (const route of [...baseRoutes, ...detailRoutes]) {
    const crosshair = route.type === 'crosshair'
      ? localizedCrosshairs.find((item) => item.id === route.crosshairId)
      : null
    const indexed = isIndexableRoute(route, locale)
    if (indexed) indexedRoutes.push({ locale, route, crosshair })

    const outputPath = resolve(distRoot, routePath(locale, route).slice(1), 'index.html')
    await mkdir(dirname(outputPath), { recursive: true })
    await writeFile(outputPath, localizedHtml(template, locale, route, crosshair, localizedCrosshairs, indexed))
    generatedCount += 1
  }
}

const sitemapEntries = indexedRoutes.map(({ locale, route, crosshair }) => {
  const alternates = alternateUrls(route)
    .map((item) => `    <xhtml:link rel="alternate" hreflang="${item.hreflang}" href="${item.url}" />`)
    .join('\n')
  const japaneseFamilyUpdated = locale === 'ja'
    && ['compactCross', 'tapDot', 'tracker', 'twinLine'].includes(crosshair?.designFamily)
  const crosshairUpdatedAt = japaneseFamilyUpdated
    ? '2026-09-03'
    : crosshair?.sourceCheckedAt && crosshair.sourceCheckedAt > SEO_CONTENT_UPDATED_AT
    ? crosshair.sourceCheckedAt
    : SEO_CONTENT_UPDATED_AT
  const lastModified = route.type === 'article' && route.articleKey === 'statistics'
    ? CROSSHAIR_STATISTICS_UPDATED_AT
    : route.type === 'crosshair'
      ? [crosshairUpdatedAt, routeContentUpdatedAt(locale, route)].sort().at(-1)
      : routeContentUpdatedAt(locale, route)
  return `  <url>\n    <loc>${SITE_ORIGIN}${routePath(locale, route)}</loc>\n    <lastmod>${lastModified}</lastmod>\n${alternates}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}${routePath(DEFAULT_LOCALE, route)}" />\n  </url>`
}).join('\n')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemapEntries}\n</urlset>\n`
await writeFile(resolve(distRoot, 'sitemap.xml'), sitemap)

const crosshairSitemapEntries = indexedRoutes
  .filter(({ route }) => route.type === 'crosshair')
  .map(({ locale, route, crosshair }) => {
    const alternates = alternateUrls(route)
      .map((item) => `    <xhtml:link rel="alternate" hreflang="${item.hreflang}" href="${item.url}" />`)
      .join('\n')
    const japaneseFamilyUpdated = locale === 'ja'
      && ['compactCross', 'tapDot', 'tracker', 'twinLine'].includes(crosshair?.designFamily)
    const lastModified = japaneseFamilyUpdated
      ? '2026-09-03'
      : crosshair?.sourceCheckedAt && crosshair.sourceCheckedAt > SEO_CONTENT_UPDATED_AT
      ? crosshair.sourceCheckedAt
      : SEO_CONTENT_UPDATED_AT
    return `  <url>\n    <loc>${SITE_ORIGIN}${routePath(locale, route)}</loc>\n    <lastmod>${[lastModified, routeContentUpdatedAt(locale, route)].sort().at(-1)}</lastmod>\n${alternates}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}${routePath(DEFAULT_LOCALE, route)}" />\n  </url>`
  })
  .join('\n')
const crosshairSitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${crosshairSitemapEntries}\n</urlset>\n`
await writeFile(resolve(distRoot, 'sitemap-crosshairs.xml'), crosshairSitemap)

const imageSitemapEntries = indexedRoutes
  .filter(({ route }) => route.type === 'crosshair' || route.type === 'collection')
  .map(({ locale, route, crosshair }) => {
    const metadata = routeMetadata(locale, route, crosshair)
    const images = [metadata.standaloneImage, metadata.image]
      .filter(Boolean)
      .map((image) => `    <image:image>\n      <image:loc>${escapeXml(image)}</image:loc>\n      <image:title>${escapeXml(metadata.imageAlt)}</image:title>\n      <image:caption>${escapeXml(metadata.description)}</image:caption>\n    </image:image>`)
      .join('\n')
    return `  <url>\n    <loc>${escapeXml(metadata.canonical)}</loc>\n${images}\n  </url>`
  })
  .join('\n')
const imageSitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${imageSitemapEntries}\n</urlset>\n`
await writeFile(resolve(distRoot, 'sitemap-images.xml'), imageSitemap)

const notFoundCopy = seoCopy('en').notFound
const notFoundSeo = `${seoStart}
    <meta name="robots" content="noindex,follow" />
    <meta property="og:type" content="website" />
    <meta property="og:title" content="${escapeHtml(notFoundCopy.title)} | AimCodes" />
    <meta property="og:description" content="${escapeHtml(notFoundCopy.body)}" />
    <meta property="og:image" content="${SITE_ORIGIN}/og-aimcodes.png" />
    <meta name="twitter:card" content="summary_large_image" />
    ${seoEnd}`
const notFound = replaceSeoBlock(template, notFoundSeo)
  .replace(/<html lang="[^"]*">/, '<html lang="en">')
  .replace(/<title>[\s\S]*?<\/title>/, '<title>Page not found | AimCodes</title>')
  .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, '<meta name="description" content="This AimCodes page does not exist." />')
  .replace('<div id="root"></div>', '<main class="not-found-page"><span>404</span><h1>That crosshair missed</h1><p>This page does not exist. Head back to the crosshair catalog and pick another one.</p><a class="primary-button" href="/en/crosshairs/">Browse crosshairs</a></main>')
await writeFile(resolve(distRoot, '404.html'), notFound)

const imageSitemapPageCount = indexedRoutes.filter(({ route }) => route.type === 'crosshair' || route.type === 'collection').length
const imageSitemapImageCount = indexedRoutes.reduce((count, { route }) => count + (route.type === 'crosshair' ? 2 : route.type === 'collection' ? 1 : 0), 0)
const indexedCrosshairRouteCount = indexedRoutes.filter(({ route }) => route.type === 'crosshair').length
console.log(`Generated ${generatedCount} localized HTML routes; ${indexedRoutes.length} canonical URLs added to sitemap.xml; ${indexedCrosshairRouteCount} crosshair URLs added to sitemap-crosshairs.xml; ${imageSitemapPageCount} pages and ${imageSitemapImageCount} image references added to sitemap-images.xml.`)
