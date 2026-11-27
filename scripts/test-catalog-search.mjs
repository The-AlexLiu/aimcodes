import assert from 'node:assert/strict'
import test from 'node:test'
import { parseCrosshairCode } from '../src/utils/crosshairCode.js'
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

test('combine localized color and shape terms, and preserve literal code searches', () => {
  function search(language, query) {
    const t = createTranslator(language)
    const entries = catalogCrosshairs.map((item) => localizeCrosshair({
      ...item, colorKey: item.colorKey || parseCrosshairCode(item.code).colorKey,
    }, language, t))
    return searchCatalog({ crosshairs: entries, sourceCrosshairs: entries, query, language, activeFilter: 'all', recentIds: [], categoryLabel: (category) => t(`filters.${category}`) })
  }
  for (const [language, query, reversed] of [
    ['en', 'white dot', 'dot white'], ['es', 'mira punto blanco', 'blanco punto'],
    ['pt-BR', 'mira ponto branco', 'branco ponto'], ['ja', '白いドット', 'ドット 白'], ['zh-CN', '白色圆点准星', '圆点 白色'],
  ]) {
    const result = search(language, query)
    assert(result.some((item) => item.id === 'demon1'))
    assert(!result.some((item) => item.id === 'needle-cyan'))
    assert.deepEqual(result.map((item) => item.id), search(language, reversed).map((item) => item.id))
  }
  assert(search('en', 'small cyan dot').some((item) => item.id === 'needle-cyan'))
  assert(!search('en', 'small cyan dot').some((item) => item.id === 'aspas-dot'))
  for (const name of ['aspas-dot', 'aspas dot']) {
    assert(search('en', name).some((item) => item.id === 'aspas-dot'))
  }
  assert(search('en', 'circle crosshair').some((item) => item.id === 'hollow-mint'))
  assert.deepEqual(search('ja', 'ＴｅｎＺ の クロスヘア').map((item) => item.id), ['tenz'])
  assert.deepEqual(search('ja', 'ねこ').map((item) => item.id), search('ja', 'ネコクロスヘア').map((item) => item.id))
  assert(search('ja', 'ネコ').some((item) => item.id === 'cat-pink'))
  const code = catalogCrosshairs.find((item) => item.id === 'demon1').code
  assert(search('en', code).some((item) => item.id === 'demon1'))
  assert.equal(search('en', 'no-such-player-xyz').length, 0)
})
