import assert from 'node:assert/strict'
import { BREACH_CROSSHAIR, BREACH_GENERATOR_SETTINGS as s } from '../src/data/breachCrosshair.js'
import { parseCrosshairCode, generateCrosshairCode } from '../src/utils/crosshairCode.js'
import { breachArticleCopy } from '../src/seo/breachContent.js'
const parsed = parseCrosshairCode(BREACH_CROSSHAIR.code)
assert.equal(parsed.settings.inner.horizontalLength, 7)
assert.equal(parsed.settings.inner.verticalLength, 2)
assert.equal(parsed.settings.dot.enabled, false)
assert.equal(parsed.settings.outer.enabled, false)
// An editor change to horizontal length must preserve the separate vertical length.
const adjusted = generateCrosshairCode({ inner: { enabled: true, length: 9, verticalLength: s.innerVerticalLength, thickness: 3, offset: 2 } })
assert.equal(parseCrosshairCode(adjusted).settings.inner.verticalLength, 2)
for (const locale of ['en', 'es', 'pt-BR', 'zh-CN', 'ja']) {
 const copy = breachArticleCopy(locale)
 assert.deepEqual(copy.abilities.map(a => a.binding), ['C', 'Q', 'E', 'X'])
 assert.equal(copy.abilities.length, 4)
 assert.doesNotMatch(JSON.stringify(copy), /Waylay|幻棱|ウェイレイ|Thailand|Tailândia/)
}
assert.deepEqual(breachArticleCopy('zh-CN').abilities.map(a => a.name), ['剧震余波', '闪点爆破', '山崩地陷', '惊雷卷地'])
console.log('Breach: independent axes, controls and five-language ability mapping passed')
