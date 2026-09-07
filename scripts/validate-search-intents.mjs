import assert from 'node:assert/strict'
import { crosshairCollections, getCatalogCrosshair, indexableCrosshairIds } from '../src/data/catalogManifest.js'
import { parseCrosshairCode } from '../src/utils/crosshairCode.js'
import { localeRoutes } from '../src/i18n/localeRoutes.js'
import { articleCopy } from '../src/seo/articles.js'
import { collectionCopy } from '../src/seo/collectionContent.js'
import { articleResourceLabel } from '../src/seo/resourceLabels.js'
import { searchIntentArticleKeys } from '../src/seo/searchIntentGuides.js'
import { routeContentUpdatedAt } from '../src/seo/metadata.js'

// Check the product promise against the actual parser, independently of family names.
for (const key of ['static', 'horizontal']) {
  const ids = crosshairCollections[key].crosshairIds
  assert.equal(ids.length, key === 'static' ? 16 : 17, `${key} count must match localized copy`)
  for (const id of ids) {
    assert.ok(indexableCrosshairIds.includes(id), `${key}: unindexed recommendation ${id}`)
    const { settings, approximate } = parseCrosshairCode(getCatalogCrosshair(id).code)
    assert.equal(approximate, false)
    if (key === 'static') {
      assert.equal(settings.movementError.enabled, false, `${id}: movement error on`)
      assert.equal(settings.firingError.enabled, false, `${id}: firing error on`)
    } else {
      assert.ok(settings.inner.enabled && settings.inner.opacity > 0)
      assert.ok(settings.inner.horizontalLength > settings.inner.verticalLength, `${id}: not wider than tall`)
      assert.ok(settings.inner.verticalLength > 0, `${id}: promised vertical reference absent`)
    }
  }
}

const titles = new Set()
const descriptions = new Set()
for (const locale of Object.keys(localeRoutes)) {
  for (const key of searchIntentArticleKeys) {
    const page = articleCopy(locale, key)
    assert.equal(articleResourceLabel(locale, key), page.title, `${locale}: navigation fallback`)
    assert.equal(page.sections.length, 4)
    assert.equal(new Set(page.sections.map(s => s.paragraphs.join(' '))).size, 4)
    assert.equal(page.recommendedCrosshairIds.length, 4)
    for (const id of page.recommendedCrosshairIds) assert.ok(indexableCrosshairIds.includes(id))
    assert.equal(routeContentUpdatedAt(locale, { type: 'article', articleKey: key }), '2026-09-04')
    assert.ok(!titles.has(page.metaTitle), `${locale}: duplicate title`)
    assert.ok(!descriptions.has(page.metaDescription), `${locale}: duplicate description`)
    titles.add(page.metaTitle)
    descriptions.add(page.metaDescription)
  }
  for (const key of ['static', 'horizontal']) {
    const page = collectionCopy(locale, key)
    assert.equal(page.introCollectionKeys.length, 4, 'Keep mobile collection navigation focused')
    assert.ok(page.introCollectionKeys.includes(key))
    assert.ok(page.relatedArticleKeys.length >= 2)
    assert.equal(routeContentUpdatedAt(locale, { type: 'collection', collectionKey: key }), '2026-09-04')
    assert.ok(!titles.has(page.metaTitle))
    assert.ok(!descriptions.has(page.metaDescription), `${locale}: duplicate collection description`)
    titles.add(page.metaTitle)
    descriptions.add(page.metaDescription)
  }
  for (const [parent, child] of [['colors', 'yellowEnemies'], ['gapOffset', 'offCenter'], ['innerVsOuter', 'stretched'], ['notWorking', 'invisible']]) {
    assert.ok(articleCopy(locale, parent).relatedArticleKeys.includes(child), `${locale}: missing ${parent} -> ${child}`)
  }
  assert.ok(articleCopy(locale, 'staticVsDynamic').relatedCollectionKeys.includes('static'))
  assert.ok(collectionCopy(locale, 'plus').relatedCollectionKeys.includes('horizontal'))
}
console.log('Search intent validation passed: 30 localized pages, 33 exact code selections, five-language labels and contextual inbound links.')
