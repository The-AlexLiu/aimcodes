import assert from 'node:assert/strict'
import { KILLJOY_CROSSHAIR } from '../src/data/killjoyCrosshair.js'
import { parseCrosshairCode } from '../src/utils/crosshairCode.js'
import { killjoyArticleCopy } from '../src/seo/killjoyContent.js'
import { isIndexableRoute } from '../src/seo/routes.js'
const { settings: s } = parseCrosshairCode(KILLJOY_CROSSHAIR.code)
assert.equal(s.inner.horizontalLength, 7)
assert.equal(s.inner.verticalLength, 0, 'Inner layer only has horizontal rails')
assert.equal(s.outer.horizontalLength, 0, 'Outer layer only has vertical blocks')
assert.equal(s.outer.verticalLength, 3)
assert.equal(s.dot.enabled, false)
for (const locale of ['en', 'es', 'pt-BR', 'zh-CN', 'ja']) {
 const copy = killjoyArticleCopy(locale)
 assert.deepEqual(copy.abilities.map(a => a.binding), ['C', 'Q', 'E', 'X'])
 assert.deepEqual(copy.abilities.map(a => a.key), ['nanoswarm', 'alarmbot', 'turret', 'ultimate'])
 assert.equal(copy.gallery.length, 2)
 assert.doesNotMatch(JSON.stringify(copy), /Clove|暮蝶|クローヴ|180/)
 assert.equal(isIndexableRoute({ type: 'article', articleKey: 'killjoy' }, locale), false)
}
const zh = killjoyArticleCopy('zh-CN')
assert.deepEqual(zh.abilities.map(a => a.name), ['纳米蜂群', '自动哨兵', '哨戒炮台', '全面封锁'])
assert.match(zh.abilities[2].action, /按住右键转向/)
assert.match(zh.abilities[2].action, /再按 E/)
assert.match(zh.abilities[3].action, /打掉/)
console.log('Killjoy official bindings, patch 12.04 controls, orthogonal rails/blocks and five-language noindex passed')
