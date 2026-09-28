import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import { catalogCrosshairs, crosshairCollections, indexableCrosshairIds } from '../src/data/catalogManifest.js'
import { collectionCopy } from '../src/seo/collectionContent.js'
import { funnyGridTitle } from '../src/seo/collectionLabels.js'
import { routePath } from '../src/seo/routes.js'
import { parseCrosshairCode } from '../src/utils/crosshairCode.js'

// Guard the numeric claims in the editorial shortlist if a profile changes later.
const claims = {
  demon1: { 'dot.size': 2, 'dot.enabled': true, 'inner.enabled': false, 'outer.enabled': false, 'outline.enabled': true },
  'tap-dot-apex': { 'dot.size': 1, 'dot.enabled': true, 'inner.enabled': true, 'inner.horizontalLength': 1, 'inner.thickness': 1 },
  'small-dot-thick': { 'dot.size': 2, 'inner.horizontalLength': 1, 'inner.thickness': 4, 'inner.offset': 0 },
  'micro-gap-apex': { 'inner.horizontalLength': 1, 'inner.thickness': 1, 'inner.offset': 1, 'dot.enabled': false, 'outline.enabled': true },
  'micro-gap-bolt': { 'inner.horizontalLength': 1, 'inner.thickness': 1, 'inner.offset': 2, 'dot.enabled': false, 'outline.enabled': false },
  'compact-cross-apex': { 'inner.horizontalLength': 2, 'inner.thickness': 3, 'inner.offset': 0, 'dot.enabled': false, 'outer.enabled': false, 'outline.enabled': false },
  'compact-cross-drift': { 'inner.horizontalLength': 2, 'inner.thickness': 3, 'inner.offset': 1, 'outline.enabled': true },
}
for (const [id, values] of Object.entries(claims)) {
  const profile = catalogCrosshairs.find((item) => item.id === id)
  assert(profile, `${id}: missing profile`)
  const { settings } = parseCrosshairCode(profile.code)
  for (const [path, value] of Object.entries(values)) assert.equal(path.split('.').reduce((obj, key) => obj[key], settings), value, `${id}: review published ${path} claim`)
}
let picks = 0
for (const locale of ['en', 'es', 'pt-BR', 'zh-CN', 'ja']) {
  assert.equal(funnyGridTitle(locale), collectionCopy(locale, 'funny').gridTitle, `${locale}: grid heading parity`)
  for (const key of Object.keys(crosshairCollections)) {
    const content = collectionCopy(locale, key)
    if (!content.quickPicks) continue
    assert(['en', 'ja'].includes(locale), 'New editorial shortlist outside growth locales')
    const html = await readFile(new URL(`../dist${routePath(locale, { type: 'collection', collectionKey: key })}index.html`, import.meta.url), 'utf8')
    for (const pick of content.quickPicks) {
      assert(indexableCrosshairIds.includes(pick.id), `${key}: shortlist target is not indexable`)
      assert(crosshairCollections[key].crosshairIds.includes(pick.id), `${key}: shortlist target not in collection`)
      assert(html.includes(routePath(locale, { type: 'crosshair', crosshairId: pick.id })), `${key}: missing prerendered link`)
      assert(html.includes(pick.reason), `${key}: missing prerendered explanation`)
      picks++
    }
  }
}
console.log(`Keyword opportunities passed: ${Object.keys(claims).length} code-setting claims, ${picks} shortlist links and five-locale grid titles.`)
