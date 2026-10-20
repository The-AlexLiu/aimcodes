import assert from 'node:assert/strict'
import { KAYO_CROSSHAIR, KAYO_GENERATOR_SETTINGS } from '../src/data/kayoCrosshair.js'
import { parseCrosshairCode } from '../src/utils/crosshairCode.js'
import { kayoArticleCopy } from '../src/seo/kayoContent.js'
import { isIndexableRoute } from '../src/seo/routes.js'
const parsed = parseCrosshairCode(KAYO_CROSSHAIR.code)
assert.equal(parsed.settings.inner.horizontalLength, 1)
assert.equal(parsed.settings.inner.verticalLength, 7)
assert.equal(parsed.settings.dot.enabled, true)
assert.equal(parsed.settings.outer.enabled, false)
assert.equal(KAYO_GENERATOR_SETTINGS.innerVerticalLength, 7)
for (const locale of ['en', 'es', 'pt-BR', 'zh-CN', 'ja']) {
 const copy = kayoArticleCopy(locale)
 assert.deepEqual(copy.abilities.map(a => a.binding), ['C', 'Q', 'E', 'X'])
 assert.deepEqual(copy.abilities.map(a => a.key), ['frag', 'flash', 'zero', 'ultimate'])
 assert.equal(copy.gallery.length, 1)
 assert.doesNotMatch(JSON.stringify(copy), /Breach|铁臂|ブリーチ|Sweden|Suécia|Suecia/)
 assert.equal(isIndexableRoute({ type: 'article', articleKey: 'kayo' }, locale), false)
}
assert.deepEqual(kayoArticleCopy('zh-CN').abilities.map(a => a.name), ['碎片溢出', '闪存过载', '零点嗅探', '无效命令'])
console.log('KAY/O: geometry, official keys, five-language content and index policy passed')
