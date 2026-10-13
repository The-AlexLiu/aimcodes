import assert from 'node:assert/strict'
import test from 'node:test'
import { catalogCrosshairs } from '../src/data/catalogManifest.js'
import { dedupeCrosshairsByAppearance } from '../src/utils/crosshairSimilarity.js'
import { searchCatalog } from '../src/utils/catalogSearch.js'
import { createTranslator, localizeCrosshair } from '../src/i18n/translations.js'

for (const language of ['en', 'es', 'pt-BR', 'zh-CN', 'ja']) {
  test(`${language}: find a player's source profile without changing default style count`, () => {
    const t = createTranslator(language)
    const sourceCrosshairs = catalogCrosshairs.map((item) => localizeCrosshair(item, language, t))
    const crosshairs = dedupeCrosshairsByAppearance(catalogCrosshairs).map((item) => localizeCrosshair(item, language, t))
    const options = { crosshairs, sourceCrosshairs, language, activeFilter: 'all', recentIds: [], categoryLabel: (category) => t(`filters.${category}`) }
    assert.equal(searchCatalog({ ...options, query: '' }).length, 540)
    assert.equal(searchCatalog({ ...options, query: '   ' }).length, 540)
    const results = searchCatalog({ ...options, query: '  ASPAS  ' })
    const aspas = results.find((item) => item.id === 'aspas-dot')
    assert(aspas, 'Source profile lost when its appearance matches another entry')
    const original = catalogCrosshairs.find((item) => item.id === aspas.id)
    assert.equal(aspas.code, original.code)
    assert.equal(aspas.sourceCheckedAt, original.sourceCheckedAt)
    assert.equal(aspas.sourceUrl, original.sourceUrl)
    assert.equal(new Set(results.map((item) => item.id)).size, results.length)
    assert(searchCatalog({ ...options, query: '', activeFilter: 'pro' }).some((item) => item.id === aspas.id))
    assert.deepEqual(searchCatalog({ ...options, query: '', activeFilter: 'recent', recentIds: [aspas.id] }).map((item) => item.id), [aspas.id])
    assert.equal(searchCatalog({ ...options, query: 'aspas', activeFilter: 'cute' }).length, 0)
  })
}
