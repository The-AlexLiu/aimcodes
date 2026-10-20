import assert from 'node:assert/strict'
import { HARBOR_CROSSHAIR, HARBOR_GENERATOR_SETTINGS } from '../src/data/harborCrosshair.js'
import { parseCrosshairCode } from '../src/utils/crosshairCode.js'
import { harborArticleCopy } from '../src/seo/harborContent.js'
import { isIndexableRoute } from '../src/seo/routes.js'
const p = parseCrosshairCode(HARBOR_CROSSHAIR.code)
assert.equal(p.settings.inner.horizontalLength, 1)
assert.equal(p.settings.inner.verticalLength, 7)
assert.equal(p.settings.inner.thickness, 4)
assert.equal(p.settings.dot.enabled, false)
assert.equal(p.settings.outer.enabled, false)
assert.equal(HARBOR_GENERATOR_SETTINGS.innerVerticalLength, 7)
for (const locale of ['en', 'es', 'pt-BR', 'zh-CN', 'ja']) {
  const copy = harborArticleCopy(locale)
  assert.deepEqual(copy.abilities.map(a => a.binding), ['C', 'Q', 'E', 'X'])
  assert.deepEqual(copy.abilities.map(a => a.key), ['storm-surge', 'high-tide', 'cove', 'ultimate'])
  assert.equal(copy.gallery.length, 2)
  assert.doesNotMatch(JSON.stringify(copy), /Fade|黑梦|フェイド|Cascade|瀑流|震荡/)
  assert.equal(isIndexableRoute({ type: 'article', articleKey: 'harbor' }, locale), false)
}
assert.deepEqual(harborArticleCopy('zh-CN').abilities.map(a => a.name), ['乱涌', '狂潮', '海盾', '怒涛'])
console.log('Harbor current kit, bindings/media mapping, geometry and five-language index policy passed')
