import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { MIKS_CROSSHAIR, MIKS_GENERATOR_SETTINGS } from '../src/data/miksCrosshair.js'
import { parseCrosshairCode, generateCrosshairCode } from '../src/utils/crosshairCode.js'
import { miksArticleCopy } from '../src/seo/miksContent.js'
import { isIndexableRoute } from '../src/seo/routes.js'
const p = parseCrosshairCode(MIKS_CROSSHAIR.code)
assert.equal(p.settings.inner.verticalLength, 0)
assert.equal(p.settings.outer.verticalLength, 0)
assert.equal(p.settings.inner.horizontalLength, 3)
assert.equal(p.settings.outer.horizontalLength, 2)
assert.equal(p.settings.dot.enabled, true)
assert.equal(MIKS_GENERATOR_SETTINGS.outerVerticalLength, 0)
const geometry = settings => JSON.stringify([settings.dot, settings.inner, settings.outer])
for (const file of readdirSync(new URL('../src/data/', import.meta.url)).filter(f => f.endsWith('Crosshair.js') && f !== 'miksCrosshair.js')) {
  const mod = await import(`../src/data/${file}`)
  const crosshair = Object.values(mod).find(v => v?.code)
  if (crosshair) assert.notEqual(geometry(parseCrosshairCode(crosshair.code).settings), geometry(p.settings), file)
}
assert.equal(generateCrosshairCode({ ...p.settings, colorPreset: '8', customColor: p.color, movementError: p.settings.movementError.enabled, firingError: p.settings.firingError.enabled }), MIKS_CROSSHAIR.code)
for (const locale of ['en', 'es', 'pt-BR', 'zh-CN', 'ja']) {
  const copy = miksArticleCopy(locale)
  assert.deepEqual(copy.abilities.map(a => a.binding), ['C', 'Q', 'E', 'X'])
  assert.deepEqual(copy.abilities.map(a => a.key), ['m-pulse', 'harmonize', 'waveform', 'ultimate'])
  assert.equal(copy.gallery.length, 2)
  assert.doesNotMatch(JSON.stringify(copy), /Harbor|海神|ハーバー|Cove|海盾/)
  assert.equal(isIndexableRoute({ type: 'article', articleKey: 'miks' }, locale), false)
}
assert.deepEqual(miksArticleCopy('zh-CN').abilities.map(a => a.name), ['电音脉冲', '共振谐律', '声波帷幕', '音脉强袭'])
const editor = readFileSync(new URL('../src/components/CrosshairToolsPage.jsx', import.meta.url), 'utf8')
assert.match(editor, /verticalLength: settings.outerVerticalLength/)
console.log('Miks official kit, media bindings, distinct horizontal geometry, editor vertical lengths and five-language noindex passed')
