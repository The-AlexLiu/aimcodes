import assert from 'node:assert/strict'
import { vetoArticleCopy } from '../src/seo/vetoContent.js'
import { VETO_CROSSHAIR } from '../src/data/vetoCrosshair.js'
import { parseCrosshairCode } from '../src/utils/crosshairCode.js'
import { isIndexableRoute } from '../src/seo/routes.js'
for (const locale of ['en', 'es', 'pt-BR', 'zh-CN', 'ja']) {
 const c = vetoArticleCopy(locale)
 assert.deepEqual(c.abilities.map(a => [a.key, a.binding]), [['crosscut', 'C'], ['chokehold', 'Q'], ['interceptor', 'E'], ['evolution', 'X']])
 assert.equal(isIndexableRoute({ type: 'article', articleKey: 'veto' }, locale), false)
 assert.doesNotMatch(JSON.stringify(c), /Vyse|维斯|ヴァイス|Razorvine|Steel Garden/)
}
const c = vetoArticleCopy('zh-CN')
assert.deepEqual(c.abilities.map(a => a.name), ['涡流折跃', '裂变残片', '噬源体', '完全进化'])
assert.match(c.abilities[0].action, /范围内看向/)
assert.match(c.abilities[2].action, /再按 E 激活/)
assert.match(c.abilities[3].action, /躲子弹/)
const { settings: s } = parseCrosshairCode(VETO_CROSSHAIR.code)
assert.equal(s.dot.enabled, false)
assert.equal(s.inner.horizontalLength, 0)
assert.equal(s.inner.verticalLength, 1)
assert.equal(s.inner.thickness, 8)
assert.equal(s.outer.horizontalLength, 8)
assert.equal(s.outer.verticalLength, 0)
console.log('Veto bindings, official names, counterplay, split-shield geometry and five-language noindex passed')
