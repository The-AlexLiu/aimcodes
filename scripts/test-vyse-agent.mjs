import assert from 'node:assert/strict'
import { VYSE_CROSSHAIR } from '../src/data/vyseCrosshair.js'
import { parseCrosshairCode } from '../src/utils/crosshairCode.js'
import { vyseArticleCopy } from '../src/seo/vyseContent.js'
import { isIndexableRoute } from '../src/seo/routes.js'
const { settings: s } = parseCrosshairCode(VYSE_CROSSHAIR.code)
assert.equal(s.inner.horizontalLength, 0)
assert.equal(s.inner.verticalLength, 5)
assert.equal(s.inner.offset, 0)
assert.equal(s.outer.thickness, 3)
assert.equal(s.dot.enabled, false)
for (const locale of ['en', 'es', 'pt-BR', 'zh-CN', 'ja']) {
 const copy = vyseArticleCopy(locale)
 assert.deepEqual(copy.abilities.map(a => a.binding), ['C', 'Q', 'E', 'X'])
 assert.deepEqual(copy.abilities.map(a => a.key), ['razorvine', 'shear', 'arcrose', 'ultimate'])
 assert.equal(copy.gallery.length, 2)
 assert.doesNotMatch(JSON.stringify(copy), /Killjoy|奇乐|キルジョイ|Germany|德国/)
 assert.equal(isIndexableRoute({ type: 'article', articleKey: 'vyse' }, locale), false)
}
const zh = vyseArticleCopy('zh-CN')
assert.deepEqual(zh.abilities.map(a => a.name), ['剃刀藤蔓', '裁断', '弧光玫瑰', '铁棘禁园'])
assert.match(zh.abilities[1].action, /退回/)
assert.match(zh.abilities[2].action, /打掉/)
assert.match(zh.abilities[3].action, /副武器/)
console.log('Vyse bindings, current counterplay, vertical spine and five-language noindex passed')
