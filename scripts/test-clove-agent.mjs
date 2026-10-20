import assert from 'node:assert/strict'
import { CLOVE_CROSSHAIR } from '../src/data/cloveCrosshair.js'
import { parseCrosshairCode } from '../src/utils/crosshairCode.js'
import { cloveArticleCopy } from '../src/seo/cloveContent.js'
import { isIndexableRoute } from '../src/seo/routes.js'
const p = parseCrosshairCode(CLOVE_CROSSHAIR.code)
assert.equal(p.settings.inner.verticalLength, 0, 'Wings must have no vertical marks')
assert.equal(p.settings.inner.horizontalLength, 3)
assert.equal(p.settings.inner.thickness, 6)
assert.equal(p.settings.dot.enabled, true)
assert.equal(p.settings.dot.size, 1)
assert.equal(p.settings.outer.enabled, false)
for (const locale of ['en', 'es', 'pt-BR', 'zh-CN', 'ja']) {
  const copy = cloveArticleCopy(locale)
  assert.deepEqual(copy.abilities.map(a => a.binding), ['C', 'Q', 'E', 'X'])
  assert.deepEqual(copy.abilities.map(a => a.key), ['pick-me-up', 'meddle', 'ruse', 'ultimate'])
  assert.equal(copy.gallery.length, 2)
  assert.doesNotMatch(JSON.stringify(copy), /Harbor|海神|ハーバー/)
  assert.equal(isIndexableRoute({ type: 'article', articleKey: 'clove' }, locale), false)
}
assert.deepEqual(cloveArticleCopy('zh-CN').abilities.map(a => a.name), ['虹吸', '整蛊', '霞染', '化蝶'])
assert.match(cloveArticleCopy('zh-CN').abilities[1].action, /落地/)
assert.match(cloveArticleCopy('zh-CN').abilities[2].action, /更短/)
assert.match(cloveArticleCopy('zh-CN').abilities[3].action, /伤害助攻/)
console.log('Clove current mechanics, official names/media bindings, wing geometry and five-language index policy passed')
