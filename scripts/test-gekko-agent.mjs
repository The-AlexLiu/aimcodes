import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { runInNewContext } from 'node:vm'
import { GEKKO_CROSSHAIR, GEKKO_GENERATOR_SETTINGS } from '../src/data/gekkoCrosshair.js'
import { parseCrosshairCode } from '../src/utils/crosshairCode.js'
import { gekkoArticleCopy } from '../src/seo/gekkoContent.js'
import { isIndexableRoute } from '../src/seo/routes.js'
const parsed = parseCrosshairCode(GEKKO_CROSSHAIR.code)
assert.equal(parsed.settings.inner.horizontalLength, 5)
assert.equal(parsed.settings.inner.verticalLength, 0)
assert.equal(parsed.settings.dot.enabled, false)
assert.equal(parsed.settings.outer.enabled, false)
assert.equal(GEKKO_GENERATOR_SETTINGS.innerVerticalLength, 0)
for (const locale of ['en', 'es', 'pt-BR', 'zh-CN', 'ja']) {
 const copy = gekkoArticleCopy(locale)
 assert.deepEqual(copy.abilities.map(a => a.binding), ['C', 'Q', 'E', 'X'])
 assert.deepEqual(copy.abilities.map(a => a.key), ['mosh', 'wingman', 'dizzy', 'ultimate'])
 assert.equal(copy.gallery.length, 2)
 assert.doesNotMatch(JSON.stringify(copy), /KAY\/O|K\/O|抑制ナイフ|零点嗅探|Sweden|Suécia|Suecia/)
 assert.equal(isIndexableRoute({ type: 'article', articleKey: 'gekko' }, locale), false)
}
assert.deepEqual(gekkoArticleCopy('zh-CN').abilities.map(a => a.name), ['嗨爆全场', '顽皮搭档', '炫晕光波', '无敌超鲨'])
assert.match(gekkoArticleCopy('zh-CN').abilities[0].action, /回收/)
assert.match(gekkoArticleCopy('en').abilities[1].action, /carry the Spike/)
assert.match(gekkoArticleCopy('ja').abilities[3].action, /一度だけ/)
console.log('Gekko: double bars, official abilities, recovery, objective controls and five-language index policy passed')

// Execute the real Canvas drawing helpers against a recording context.
// Zero-length axes must not acquire phantom pixels from minimum rectangle sizes.
const source = readFileSync(new URL('../src/components/CrosshairCanvas.jsx', import.meta.url), 'utf8')
const helpers = source.slice(source.indexOf('function drawRect'), source.indexOf('export default function'))
const draw = runInNewContext(`${helpers}; drawLineSet`)
function painted(line, scale) {
 const rectangles = []
 const ctx = { fillRect: (...args) => rectangles.push({ color: ctx.fillStyle, args }) }
 draw(ctx, 100, 100, line, '#bcf15b', scale, { enabled: false, thickness: 1 })
 return rectangles
}
for (const scale of [1, 5]) {
 const bars = painted(parsed.settings.inner, scale)
 assert.equal(bars.length, 2, 'Horizontal-only code must paint exactly two bars')
 assert.ok(bars.every(r => r.args[1] <= 100 && r.args[1] + r.args[3] >= 100))
 const cross = painted({ ...parsed.settings.inner, verticalLength: 5 }, scale)
 assert.equal(cross.length, 4, 'Existing positive-length crosses keep four arms')
 const vertical = painted({ ...parsed.settings.inner, horizontalLength: 0, verticalLength: 5 }, scale)
 assert.equal(vertical.length, 2, 'Vertical-only code must paint exactly two bars')
}
console.log('Canvas zero-length axes and existing four-arm rendering passed at 1x and 5x')
