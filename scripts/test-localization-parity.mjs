import test from 'node:test'
import assert from 'node:assert/strict'
import { articleCopy } from '../src/seo/articles.js'
import { collectionCopy } from '../src/seo/collectionContent.js'
import { routeMetadata } from '../src/seo/metadata.js'
import { freeSiteCopy } from '../src/i18n/freeSiteCopy.js'
import { catalogCrosshairs, crosshairCollections } from '../src/data/catalogManifest.js'
import { crosshairStatistics } from '../src/data/catalogStatistics.js'
import { collectionDisplayIds } from '../src/data/catalogDisplay.js'
import { dedupeCrosshairsByAppearance } from '../src/utils/crosshairSimilarity.js'

const locales = ['en', 'zh-CN', 'es', 'pt-BR', 'ja']
for (const locale of locales) {
  test(`${locale}: core explanations survive localization`, () => {
    const firing = articleCopy(locale, 'firingError')
    const graph = firing.sections.filter(section => section.id === 'shooting-graph-vs-crosshair')
    assert.equal(graph.length, 1)
    assert(graph[0].paragraphs.length && graph[0].bullets.length >= 3)
    assert(firing.sources.some(source => source.url.endsWith('/valorant-patch-notes-4-10/')))
    const copy = articleCopy(locale, 'copy')
    assert.equal(copy.sections.filter(section => section.id === 'website-code-import').length, 1)
    assert(JSON.stringify(copy).includes('/crosshair copy'))
    assert(JSON.stringify(copy).includes('/cc'))
  })
  test(`${locale}: dot choices and navigation have the same product meaning`, () => {
    const dot = collectionCopy(locale, 'dot')
    assert.deepEqual(dot.quickPicks.map(pick => pick.id), ['demon1', 'tap-dot-apex', 'small-dot-thick'])
    assert.deepEqual(dot.introCollectionKeys, ['dot', 'small', 'plus', 'circle'])
    for (const pick of dot.quickPicks) assert(pick.reason.trim())
    for (const key of ['sheriff', 'visibility', 'guardian', 'outlaw', 'marshal', 'burst', 'spray', 'longRange']) {
      const item = collectionCopy(locale, key)
      assert.notDeepEqual(item.body, collectionCopy(locale, 'best').body, `${key}: generic Best fallback returned`)
      assert.notEqual(item.intro, item.body[0], `${key}: repeated intro`)
    }
  })
  test(`${locale}: retired purchase page titles use the localized free-site dictionary`, () => {
    const copy = freeSiteCopy(locale)
    for (const pageKey of ['pack', 'recover', 'complete']) {
      assert.equal(routeMetadata(locale, { type: 'paid', pageKey }).title, `${copy.title} | AimCodes`)
    }
  })
}

test('collection statistics match the rendered catalog, without removing source profiles', () => {
  const visible = new Set(dedupeCrosshairsByAppearance(catalogCrosshairs).map(item => item.id))
  for (const { key, count } of crosshairStatistics.collections) {
    const expected = crosshairCollections[key].crosshairIds.filter(id => visible.has(id))
    assert.deepEqual(collectionDisplayIds(key), expected)
    assert.equal(count, expected.length)
  }
  assert.equal(crosshairCollections.dot.crosshairIds.length, 65)
  assert.equal(crosshairStatistics.collections.find(item => item.key === 'dot').count, 64)
  assert.equal(catalogCrosshairs.length, 548)
})
