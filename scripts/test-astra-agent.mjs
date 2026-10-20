import assert from 'node:assert/strict'
import { ASTRA_CROSSHAIR } from '../src/data/astraCrosshair.js'
import { parseCrosshairCode } from '../src/utils/crosshairCode.js'
import { astraArticleCopy } from '../src/seo/astraContent.js'
import { isIndexableRoute } from '../src/seo/routes.js'
const p = parseCrosshairCode(ASTRA_CROSSHAIR.code).settings
assert.equal(p.inner.horizontalLength, 7)
assert.equal(p.inner.verticalLength, 3)
assert.equal(p.inner.offset, 0)
assert.equal(p.outer.enabled, true)
assert.equal(p.dot.enabled, false)
for (const locale of ['en','zh-CN','ja','es','pt-BR']) {
 const c = astraArticleCopy(locale)
 assert.deepEqual(c.abilities.map(a => a.binding), ['X','C','Q','E','X'])
 assert.deepEqual(c.abilities.map(a => a.key), ['form','gravity','nova','nebula','ultimate'])
 assert.equal(c.gallery.length, 2)
 assert.doesNotMatch(JSON.stringify(c), /KAY|K\/O|Initiator|イニシエーター|先锋|knife|匕首/)
 assert.equal(isIndexableRoute({ type: 'article', articleKey: 'astra' }, locale), false)
}
assert.deepEqual(astraArticleCopy('zh-CN').abilities.map(a => a.name), ['星界形态','重力之阱','新星脉冲','星云/消散','宇宙分裂'])
console.log('Astra: five ability mappings, distinct starburst geometry and five noindex locales passed')
