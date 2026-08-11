import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { crosshairs } from '../src/data/crosshairs.js'
import { createTranslator, localizeCrosshair } from '../src/i18n/translations.js'
import { DEFAULT_LOCALE, localeRoutes } from '../src/i18n/localeRoutes.js'
import {
  alternateUrls,
  collectionBreadcrumbName,
  collectionCopy,
  crosshairBreadcrumbName,
  detailCopy,
  routeMetadata,
  SEO_CONTENT_UPDATED_AT,
  seoCopy,
  SITE_ORIGIN,
} from '../src/seo/content.js'
import { articleCopy } from '../src/seo/articles.js'
import { seoToolCopy } from '../src/seo/toolContent.js'
import { importGuideDetails } from '../src/seo/importGuideDetails.js'
import { collectionKeysForCrosshair, isIndexableRoute, routePath, SEO_ARTICLE_KEYS, SEO_COLLECTION_KEYS, SEO_COLLECTIONS, SEO_CROSSHAIR_IDS, SEO_TOOL_KEYS, TRUST_PAGE_KEYS } from '../src/seo/routes.js'
import { TRUST_UPDATED_AT, trustCopy } from '../src/seo/trustContent.js'
import { publisherCopy } from '../src/seo/publisherContent.js'
import { CONTACT_EMAIL } from '../src/config/contact.js'

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
      url: `${SITE_ORIGIN}/`,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_ORIGIN}/brand/aimcodes-logo.png`,
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

  if (route.type === 'catalog' || route.type === 'collection') {
    const collectionIds = route.type === 'collection'
      ? SEO_COLLECTIONS[route.collectionKey].crosshairIds
      : SEO_CROSSHAIR_IDS
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

    if (route.type === 'collection') {
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
      description: article.intro,
      url: metadata.canonical,
      dateModified: SEO_CONTENT_UPDATED_AT,
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
    graph.push({
      '@type': 'FAQPage',
      mainEntity: article.faq.map(([name, text]) => ({
        '@type': 'Question',
        name,
        acceptedAnswer: { '@type': 'Answer', text },
      })),
    })
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
    graph.push({
      '@type': 'WebPage',
      '@id': `${metadata.canonical}#webpage`,
      url: metadata.canonical,
      name: metadata.title,
      description: metadata.description,
      inLanguage: localeRoutes[locale].htmlLang,
      isPartOf: { '@id': `${SITE_ORIGIN}/#website` },
    })
    graph.push({
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'AimCodes', item: `${SITE_ORIGIN}${routePath(locale, { type: 'home' })}` },
        { '@type': 'ListItem', position: 2, name: seoCopy(locale).catalog.title, item: `${SITE_ORIGIN}${routePath(locale, { type: 'catalog' })}` },
        { '@type': 'ListItem', position: 3, name: crosshairBreadcrumbName(locale, crosshair), item: metadata.canonical },
      ],
    })
  }

  return { '@context': 'https://schema.org', '@graph': graph }
}

function seoBlock(locale, route, crosshair, localizedCrosshairs, indexed) {
  const config = localeRoutes[locale]
  const metadata = routeMetadata(locale, route, crosshair)
  const alternateLinks = alternateUrls(route)
    .map((item) => `    <link rel="alternate" hreflang="${item.hreflang}" href="${item.url}" />`)
    .join('\n')
  const alternateLocales = Object.entries(localeRoutes)
    .filter(([alternateLocale]) => alternateLocale !== locale)
    .map(([, item]) => `    <meta property="og:locale:alternate" content="${item.ogLocale}" />`)
    .join('\n')
  const schema = structuredData(locale, route, crosshair, localizedCrosshairs)

  return `${seoStart}
    <meta name="robots" content="${indexed ? 'index,follow,max-image-preview:large' : 'noindex,follow'}" />
    <link rel="canonical" href="${metadata.canonical}" />
${alternateLinks}
    <link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}${routePath(DEFAULT_LOCALE, route)}" />
    <meta property="og:type" content="${route.type === 'guide' || route.type === 'article' ? 'article' : 'website'}" />
    <meta property="og:url" content="${metadata.canonical}" />
    <meta property="og:title" content="${escapeHtml(metadata.title)}" />
    <meta property="og:description" content="${escapeHtml(metadata.description)}" />
    <meta property="og:image" content="${metadata.image}" />
    <meta property="og:image:width" content="1280" />
    <meta property="og:image:height" content="720" />
    <meta property="og:locale" content="${config.ogLocale}" />
${alternateLocales}
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(metadata.title)}" />
    <meta name="twitter:description" content="${escapeHtml(metadata.description)}" />
    <meta name="twitter:image" content="${metadata.image}" />
    <script type="application/ld+json">${jsonLd(schema)}</script>
    <style id="aimcodes-static-seo">.seo-static-shell{max-width:1180px;margin:0 auto;padding:64px 28px;color:#eef2f4;font-family:Inter,"Noto Sans SC","PingFang SC","Microsoft YaHei",system-ui,sans-serif}.seo-static-shell h1{max-width:900px;font-size:52px;line-height:1.1}.seo-static-shell p{max-width:760px;color:#aeb8bf;font-size:16px;line-height:1.65}.seo-static-shell a{color:#ff6b65}.seo-static-links{display:flex;flex-wrap:wrap;gap:12px;margin-top:24px}.seo-static-links a{padding:10px 14px;border:1px solid #46535e;border-radius:6px;text-decoration:none}.seo-static-shell code{display:block;margin:18px 0;padding:14px;overflow-wrap:anywhere;background:#0d151b;border:1px solid #36434d;border-radius:6px}@media(max-width:680px){.seo-static-shell{padding:36px 18px}.seo-static-shell h1{font-size:36px;line-height:1.12}}</style>
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

function staticTopicLinks(locale) {
  const localized = seoCopy(locale)
  const collections = SEO_COLLECTION_KEYS.map((collectionKey) => `<a href="${routePath(locale, { type: 'collection', collectionKey })}">${escapeHtml(collectionCopy(locale, collectionKey).label)}</a>`).join('')
  const resources = `<a href="${routePath(locale, { type: 'guide' })}">${escapeHtml(localized.footer.guide)}</a>${SEO_ARTICLE_KEYS.map((articleKey) => `<a href="${routePath(locale, { type: 'article', articleKey })}">${escapeHtml(articleCopy(locale, articleKey).title)}</a>`).join('')}${SEO_TOOL_KEYS.map((toolKey) => `<a href="${routePath(locale, { type: 'tool', toolKey })}">${escapeHtml(seoToolCopy(locale, toolKey).title)}</a>`).join('')}${TRUST_PAGE_KEYS.map((pageKey) => `<a href="${routePath(locale, { type: 'trust', pageKey })}">${escapeHtml(trustCopy(locale, pageKey).title)}</a>`).join('')}`
  return `<nav class="seo-static-links">${collections}${resources}</nav>`
}

function staticPublisherValue(locale, type) {
  const content = publisherCopy(locale, type)
  const cards = content.cards.map(([title, body]) => `<article><h2>${escapeHtml(title)}</h2><p>${escapeHtml(body)}</p></article>`).join('')
  return `<section><h2>${escapeHtml(content.title)}</h2><p>${escapeHtml(content.intro)}</p>${cards}</section>`
}

function staticReferenceLabel(locale) {
  return { en: 'Official references', es: 'Referencias oficiales', 'pt-BR': 'Referências oficiais', 'zh-CN': '官方参考资料' }[locale] || 'Official references'
}

function staticBody(locale, route, crosshair, localizedCrosshairs) {
  const localized = seoCopy(locale)
  if (route.type === 'home') {
    const featured = SEO_CROSSHAIR_IDS.map((id) => localizedCrosshairs.find((item) => item.id === id)).filter(Boolean).slice(0, 8)
    return `<main class="seo-static-shell"><h1>${escapeHtml(localized.home.title)}</h1><p>${escapeHtml(localized.home.intro)}</p>${staticLinks(locale, featured)}${staticTopicLinks(locale)}${staticPublisherValue(locale, 'home')}</main>`
  }
  if (route.type === 'catalog') {
    return `<main class="seo-static-shell"><h1>${escapeHtml(localized.catalog.title)}</h1><p>${escapeHtml(localized.catalog.intro)}</p>${staticTopicLinks(locale)}${staticLinks(locale, localizedCrosshairs)}${staticPublisherValue(locale, 'catalog')}</main>`
  }
  if (route.type === 'collection') {
    const collection = collectionCopy(locale, route.collectionKey)
    const items = SEO_COLLECTIONS[route.collectionKey].crosshairIds
      .map((id) => localizedCrosshairs.find((item) => item.id === id))
      .filter(Boolean)
    const body = collection.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')
    const selectionContent = Array.isArray(collection.selection)
      ? `<ul>${collection.selection.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`
      : `<p>${escapeHtml(collection.selection || '')}</p>`
    const selection = collection.selection?.length ? `<section><h2>${escapeHtml(collection.selectionTitle)}</h2>${selectionContent}</section>` : ''
    const settings = collection.settings?.length ? `<section><h2>${escapeHtml(collection.settingsTitle)}</h2><ul>${collection.settings.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}</ul></section>` : ''
    const related = `${(collection.relatedArticleKeys || []).map((articleKey) => `<a href="${routePath(locale, { type: 'article', articleKey })}">${escapeHtml(articleCopy(locale, articleKey).title)}</a>`).join('')}${(collection.relatedToolKeys || []).map((toolKey) => `<a href="${routePath(locale, { type: 'tool', toolKey })}">${escapeHtml(seoToolCopy(locale, toolKey).title)}</a>`).join('')}`
    const faq = collection.faq.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join('')
    return `<main class="seo-static-shell"><nav aria-label="Breadcrumb"><a href="${routePath(locale, { type: 'home' })}">AimCodes</a> / <a href="${routePath(locale, { type: 'catalog' })}">${escapeHtml(localized.catalog.title)}</a> / <span>${escapeHtml(collection.title)}</span></nav><h1>${escapeHtml(collection.title)}</h1><p>${escapeHtml(collection.intro)}</p>${staticLinks(locale, items)}<section>${body}</section>${selection}${settings}<section><h2>FAQ</h2>${faq}</section><nav class="seo-static-links">${related}</nav></main>`
  }
  if (route.type === 'finder') {
    return `<main class="seo-static-shell"><h1>${escapeHtml(createTranslator(locale)('finder.title'))}</h1><p>${escapeHtml(localized.meta.finderDescription)}</p><a href="${routePath(locale, { type: 'catalog' })}">${escapeHtml(localized.footer.browse)}</a></main>`
  }
  if (route.type === 'guide') {
    const details = importGuideDetails(locale)
    const steps = localized.guide.steps.map(([title, body]) => `<li><strong>${escapeHtml(title)}</strong><p>${escapeHtml(body)}</p></li>`).join('')
    const extra = details.sections.map((section) => `<section><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.body)}</p></section>`).join('')
    const faq = details.faq.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join('')
    return `<main class="seo-static-shell"><h1>${escapeHtml(localized.guide.title)}</h1><p>${escapeHtml(localized.guide.intro)}</p><ol>${steps}</ol><h2>${escapeHtml(details.moreTitle)}</h2>${extra}<h2>FAQ</h2>${faq}<a href="${routePath(locale, { type: 'catalog' })}">${escapeHtml(localized.guide.cta)}</a></main>`
  }
  if (route.type === 'article') {
    const article = articleCopy(locale, route.articleKey)
    const sections = article.sections.map((section) => `<section><h2>${escapeHtml(section.title)}</h2>${section.paragraphs.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('')}${section.bullets?.length ? `<ul>${section.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join('')}</ul>` : ''}</section>`).join('')
    const faq = article.faq.map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`).join('')
    const recommended = article.recommendedCrosshairIds.map((id) => localizedCrosshairs.find((item) => item.id === id)).filter(Boolean)
    const related = `${(article.relatedArticleKeys || []).map((articleKey) => `<a href="${routePath(locale, { type: 'article', articleKey })}">${escapeHtml(articleCopy(locale, articleKey).title)}</a>`).join('')}${(article.relatedCollectionKeys || []).map((collectionKey) => `<a href="${routePath(locale, { type: 'collection', collectionKey })}">${escapeHtml(collectionCopy(locale, collectionKey).title)}</a>`).join('')}${(article.relatedToolKeys || []).map((toolKey) => `<a href="${routePath(locale, { type: 'tool', toolKey })}">${escapeHtml(seoToolCopy(locale, toolKey).title)}</a>`).join('')}`
    const sources = article.sources?.length ? `<section><h2>${escapeHtml(staticReferenceLabel(locale))}</h2>${article.sources.map((source) => `<a href="${escapeHtml(source.url)}">${escapeHtml(source.label)}</a>`).join('')}</section>` : ''
    return `<main class="seo-static-shell"><nav aria-label="Breadcrumb"><a href="${routePath(locale, { type: 'home' })}">AimCodes</a> / <span>${escapeHtml(article.title)}</span></nav><h1>${escapeHtml(article.title)}</h1><p>${escapeHtml(article.intro)}</p><section><h2>${escapeHtml(article.summaryTitle)}</h2><p>${escapeHtml(article.summary)}</p></section>${sections}${staticLinks(locale, recommended)}<h2>FAQ</h2>${faq}${sources}<nav class="seo-static-links">${related}</nav></main>`
  }
  if (route.type === 'tool') {
    const tool = seoToolCopy(locale, route.toolKey)
    const related = SEO_TOOL_KEYS.filter((toolKey) => toolKey !== route.toolKey).map((toolKey) => `<a href="${routePath(locale, { type: 'tool', toolKey })}">${escapeHtml(seoToolCopy(locale, toolKey).title)}</a>`).join('')
    return `<main class="seo-static-shell"><nav aria-label="Breadcrumb"><a href="${routePath(locale, { type: 'home' })}">AimCodes</a> / <span>${escapeHtml(tool.title)}</span></nav><h1>${escapeHtml(tool.title)}</h1><p>${escapeHtml(tool.intro)}</p><section><h2>${escapeHtml(tool.eyebrow)}</h2><p>${escapeHtml(tool.metaDescription)}</p></section><nav class="seo-static-links">${related}<a href="${routePath(locale, { type: 'finder' })}">${escapeHtml(localized.meta.finderTitle)}</a></nav></main>`
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
    const details = detailCopy(locale, crosshair.id)
    const related = localizedCrosshairs.filter((item) => item.id !== crosshair.id && item.category === crosshair.category).slice(0, 6)
    const relatedCollections = collectionKeysForCrosshair(crosshair.id)
      .map((collectionKey) => `<a href="${routePath(locale, { type: 'collection', collectionKey })}">${escapeHtml(collectionCopy(locale, collectionKey).label)}</a>`)
      .join('')
    const contextualLinks = relatedCollections ? `<nav class="seo-static-links" aria-label="${escapeHtml(localized.detail.compareStyle)}">${relatedCollections}</nav>` : ''
    return `<main class="seo-static-shell"><h1>${escapeHtml(crosshair.name)}</h1><p>${escapeHtml(crosshair.description)}</p><code>${escapeHtml(crosshair.code)}</code><h2>${escapeHtml(localized.detail.bestFor)}</h2><p>${escapeHtml(details.bestFor)}</p><h2>${escapeHtml(localized.detail.tradeoff)}</h2><p>${escapeHtml(details.tradeoff)}</p>${contextualLinks}${staticTopicLinks(locale)}${staticLinks(locale, related)}</main>`
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
  const localizedCrosshairs = crosshairs.map((item) => localizeCrosshair(item, locale, t))
  const baseRoutes = [
    { type: 'home' },
    { type: 'catalog' },
    { type: 'finder' },
    { type: 'guide' },
    ...SEO_COLLECTION_KEYS.map((collectionKey) => ({ type: 'collection', collectionKey })),
    ...SEO_ARTICLE_KEYS.map((articleKey) => ({ type: 'article', articleKey })),
    ...SEO_TOOL_KEYS.map((toolKey) => ({ type: 'tool', toolKey })),
    ...TRUST_PAGE_KEYS.map((pageKey) => ({ type: 'trust', pageKey })),
  ]
  const detailRoutes = localizedCrosshairs.map((item) => ({ type: 'crosshair', crosshairId: item.id }))

  for (const route of [...baseRoutes, ...detailRoutes]) {
    const crosshair = route.type === 'crosshair'
      ? localizedCrosshairs.find((item) => item.id === route.crosshairId)
      : null
    const indexed = isIndexableRoute(route)
    if (indexed) indexedRoutes.push({ locale, route })

    const outputPath = resolve(distRoot, routePath(locale, route).slice(1), 'index.html')
    await mkdir(dirname(outputPath), { recursive: true })
    await writeFile(outputPath, localizedHtml(template, locale, route, crosshair, localizedCrosshairs, indexed))
    generatedCount += 1
  }
}

const sitemapEntries = indexedRoutes.map(({ locale, route }) => {
  const alternates = alternateUrls(route)
    .map((item) => `    <xhtml:link rel="alternate" hreflang="${item.hreflang}" href="${item.url}" />`)
    .join('\n')
  return `  <url>\n    <loc>${SITE_ORIGIN}${routePath(locale, route)}</loc>\n    <lastmod>${SEO_CONTENT_UPDATED_AT}</lastmod>\n${alternates}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_ORIGIN}${routePath(DEFAULT_LOCALE, route)}" />\n  </url>`
}).join('\n')
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${sitemapEntries}\n</urlset>\n`
await writeFile(resolve(distRoot, 'sitemap.xml'), sitemap)

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

console.log(`Generated ${generatedCount} localized HTML routes; ${indexedRoutes.length} canonical URLs added to sitemap.xml.`)
