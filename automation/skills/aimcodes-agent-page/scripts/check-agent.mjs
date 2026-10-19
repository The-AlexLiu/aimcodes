#!/usr/bin/env node
// Mechanical checks only. Inspect real pixels, playback, sources and interactions separately.
import assert from 'node:assert/strict'
import { readFile, readdir, access } from 'node:fs/promises'
import { resolve, join } from 'node:path'
import { pathToFileURL } from 'node:url'

const args = Object.fromEntries(process.argv.slice(2).reduce((pairs, value, i, all) => {
  if (value.startsWith('--')) pairs.push([value.slice(2), all[i + 1]])
  return pairs
}, []))
assert.ok(args.agent && /^[a-z][a-z0-9-]*$/.test(args.agent), 'Provide --agent phoenix')
assert.ok(args['index-locales'] && !args['index-locales'].startsWith('--'), 'Provide --index-locales none or en,ja explicitly')
const root = resolve(args.repo || '.')
const key = args.agent
const camel = key.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase())
const constant = key.toUpperCase().replaceAll('-', '_')
const expectedIndex = args['index-locales'] === 'none' ? [] : args['index-locales'].split(',')
const load = path => import(pathToFileURL(resolve(root, path)).href)
const { parseCrosshairCode, generateCrosshairCode } = await load('src/utils/crosshairCode.js')
const { localeRoutes } = await load('src/i18n/localeRoutes.js')
const { routePath, isIndexableRoute, SEO_ARTICLES } = await load('src/seo/routes.js')
const module = await load(args['crosshair-module'] || `src/data/${camel}Crosshair.js`)
const crosshair = module[args['crosshair-export'] || `${constant}_CROSSHAIR`]
const settings = module[args['settings-export'] || `${constant}_GENERATOR_SETTINGS`]
assert.ok(crosshair?.code && settings, 'Crosshair and full editor settings must be exported')
assert.ok(SEO_ARTICLES[key], 'Agent article route must exist')
for (const locale of expectedIndex) assert.ok(localeRoutes[locale], `Unknown index locale ${locale}`)
const parsed = parseCrosshairCode(crosshair.code)
const s = settings
const regenerated = generateCrosshairCode({
  colorPreset: s.colorPreset, customColor: s.customColor,
  outline: { enabled: s.outline, opacity: s.outlineOpacity, thickness: s.outlineThickness },
  dot: { enabled: s.dot, opacity: s.dotOpacity, size: s.dotSize },
  inner: { enabled: s.inner, opacity: s.innerOpacity, length: s.innerLength, thickness: s.innerThickness, offset: s.innerOffset },
  outer: { enabled: s.outer, opacity: s.outerOpacity, length: s.outerLength, thickness: s.outerThickness, offset: s.outerOffset },
  movementError: s.movementError, firingError: s.firingError,
})
assert.equal(crosshair.code, regenerated, 'Editor settings must reproduce the preview/copy code exactly')
function geometry(p) {
  const { dot, inner, outer } = p.settings
  const line = value => value.enabled ? { enabled: true, horizontal: value.horizontalLength, vertical: value.verticalLength, thickness: value.thickness, offset: value.offset } : { enabled: false }
  return { dot: dot.enabled ? { enabled: true, size: dot.size } : { enabled: false }, inner: line(inner), outer: line(outer) }
}
const compared = []
for (const file of (await readdir(join(root, 'src/data'))).filter(file => file.endsWith('Crosshair.js'))) {
  const otherModule = await load(`src/data/${file}`)
  for (const [name, other] of Object.entries(otherModule)) {
    if (!name.endsWith('_CROSSHAIR') || !other?.code || other.id === crosshair.id) continue
    assert.notDeepEqual(geometry(parsed), geometry(parseCrosshairCode(other.code)), `Same geometry as ${other.id}; recoloring is insufficient`)
    compared.push(other.id)
  }
}
const contentModule = await load(args['content-module'] || `src/seo/${camel}Content.js`)
const content = contentModule[args['content-export'] || `${camel}ArticleCopy`]
assert.equal(typeof content, 'function', 'Localized article copy factory must be available')
const mediaRoot = args['media-root'] || `/images/agents/${key}`
const rows = []
for (const locale of Object.keys(localeRoutes)) {
  const copy = content(locale)
  assert.ok(copy.title && copy.intro && copy.metaDescription, `${locale}: missing metadata or intro`)
  assert.ok(copy.abilities?.length > 0 && copy.gallery?.length > 0, `${locale}: missing abilities/gallery`)
  for (const ability of copy.abilities) {
    assert.ok(ability.name && (ability.effect || ability.body) && (ability.action || ability.body), `${locale}: incomplete ability`)
    const id = ability.key || ability.media?.key
    const sources = [ability.media?.icon || `${mediaRoot}/${id}.webp`, ability.media?.src || `${mediaRoot}/${id}.mp4`, ability.media?.poster || `${mediaRoot}/${id}-poster.webp`]
    for (const source of sources) {
      assert.ok(source.startsWith('/'), `Expected locally hosted media: ${source}`)
      await access(join(root, 'public', source))
    }
  }
  for (const image of copy.gallery) {
    assert.ok(image.label?.trim(), `${locale}: gallery alt missing`)
    await access(join(root, 'public', image.src))
  }
  const route = { type: 'article', articleKey: key }
  const path = routePath(locale, route)
  const index = expectedIndex.includes(locale)
  assert.equal(isIndexableRoute(route, locale), index, `${locale}: route index decision differs from requested set`)
  const html = await readFile(join(root, 'dist', path, 'index.html'), 'utf8')
  assert.ok(html.includes(`<h1>${copy.heroName || copy.ui?.heroTitle}</h1>`), `${locale}: static H1 mismatch`)
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1]
  assert.equal(new URL(canonical).pathname, path, `${locale}: canonical path mismatch`)
  const robots = html.match(/<meta name="robots" content="([^"]+)"/)?.[1]
  const directives = new Set((robots || '').split(',').map(value => value.trim()))
  assert.ok(directives.has(index ? 'index' : 'noindex') && directives.has('follow') && !directives.has(index ? 'noindex' : 'index'), `${locale}: wrong robots`)
  if (!index) assert.ok(!html.includes('hreflang='), `${locale}: noindex must not declare hreflang`)
  for (const sitemap of ['sitemap.xml', 'sitemap-images.xml', 'sitemap-crosshairs.xml']) {
    const xml = await readFile(join(root, 'dist', sitemap), 'utf8')
    if (!index) assert.ok(!xml.includes(path), `${locale}: noindex leaked into ${sitemap}`)
    if (index && sitemap === 'sitemap.xml') assert.ok(xml.includes(path), `${locale}: missing in sitemap`)
  }
  rows.push({ locale, path, index, abilities: copy.abilities.length, galleryImages: copy.gallery.length })
}
console.log(JSON.stringify({ agent: key, codeRoundTrip: true, geometricallyDifferentFrom: compared, pages: rows, stillRequired: ['visual shape comparison at identical scales', 'official fact/media review', 'production-build browser interactions and colors', 'authorized preview/production verification'] }, null, 2))
