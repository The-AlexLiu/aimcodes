import assert from 'node:assert/strict'
import { FADE_CROSSHAIR, FADE_GENERATOR_SETTINGS } from '../src/data/fadeCrosshair.js'
import { parseCrosshairCode } from '../src/utils/crosshairCode.js'
import { fadeArticleCopy } from '../src/seo/fadeContent.js'
import { isIndexableRoute } from '../src/seo/routes.js'
const p = parseCrosshairCode(FADE_CROSSHAIR.code)
assert.equal(p.settings.inner.horizontalLength, 5)
assert.equal(p.settings.inner.verticalLength, 1)
assert.equal(p.settings.inner.thickness, 8)
assert.equal(p.settings.dot.enabled, true)
assert.equal(p.settings.outer.enabled, false)
assert.equal(FADE_GENERATOR_SETTINGS.innerVerticalLength, 1)
for (const locale of ['en', 'es', 'pt-BR', 'zh-CN', 'ja']) {
  const copy = fadeArticleCopy(locale)
  assert.deepEqual(copy.abilities.map(a => a.binding), ['C', 'Q', 'E', 'X'])
  assert.deepEqual(copy.abilities.map(a => a.key), ['prowler', 'seize', 'haunt', 'ultimate'])
  assert.equal(copy.gallery.length, 2)
  assert.doesNotMatch(JSON.stringify(copy), /KAY.O|K\/O|Suppress|压制|再安定化|Desconhecida|Unknown/)
  assert.equal(isIndexableRoute({ type: 'article', articleKey: 'fade' }, locale), false)
}
assert.deepEqual(fadeArticleCopy('zh-CN').abilities.map(a => a.name), ['黯兽', '幽爪', '诡眼', '夜临'])
console.log('Fade geometry, official controls, five-language content and index policy passed')
