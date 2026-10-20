import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync, existsSync } from 'node:fs'
import { razeArticleCopy } from '../src/seo/razeContent.js'
import { RAZE_CROSSHAIR, RAZE_GENERATOR_SETTINGS as s } from '../src/data/razeCrosshair.js'
import { OMEN_CROSSHAIR } from '../src/data/omenCrosshair.js'
import { HUSH_CROSSHAIR } from '../src/data/hushCrosshair.js'
import { SAGE_CROSSHAIR } from '../src/data/sageCrosshair.js'
import { PHOENIX_CROSSHAIR } from '../src/data/phoenixCrosshair.js'
import { parseCrosshairCode, generateCrosshairCode } from '../src/utils/crosshairCode.js'
import { isIndexableRoute, routePath } from '../src/seo/routes.js'

test('Raze uses a solid connected plus and reproduces the complete editor code', () => {
  const p = parseCrosshairCode(RAZE_CROSSHAIR.code)
  assert.equal(p.settings.inner.enabled, true)
  assert.equal(p.settings.dot.enabled, false)
  assert.equal(p.settings.outer.enabled, false)
  assert.equal(p.settings.inner.horizontalLength, 5)
  assert.equal(p.settings.inner.thickness, 3)
  assert.equal(p.settings.inner.offset, 0)
  const code = generateCrosshairCode({colorPreset:s.colorPreset,customColor:s.customColor,
    outline:{enabled:s.outline,opacity:s.outlineOpacity,thickness:s.outlineThickness},
    dot:{enabled:s.dot,opacity:s.dotOpacity,size:s.dotSize},
    inner:{enabled:s.inner,opacity:s.innerOpacity,length:s.innerLength,thickness:s.innerThickness,offset:s.innerOffset},
    outer:{enabled:s.outer,opacity:s.outerOpacity,length:s.outerLength,thickness:s.outerThickness,offset:s.outerOffset},
    movementError:s.movementError,firingError:s.firingError})
  assert.equal(code, RAZE_CROSSHAIR.code)
  for(const other of [HUSH_CROSSHAIR,SAGE_CROSSHAIR,PHOENIX_CROSSHAIR,OMEN_CROSSHAIR]) {
    const o=parseCrosshairCode(other.code)
    assert.notDeepEqual([p.settings.dot,p.settings.inner,p.settings.outer],[o.settings.dot,o.settings.inner,o.settings.outer])
  }
})

test('Five Raze drafts have official localized ability names, local media and no indexing', () => {
  for(const locale of ['en','es','pt-BR','zh-CN','ja']) {
    const c=razeArticleCopy(locale)
    assert.equal(c.abilities.length,4)
    assert.deepEqual(c.abilities.map(a=>a.binding),['C','Q','E','X'])
    if(locale==='zh-CN')assert.deepEqual(c.abilities.map(a=>a.name),['花车巡游','惊喜翻腾','彩雷飞溅','晚安焰火'])
    for(const a of c.abilities)for(const suffix of ['.mp4','.webp','-poster.webp'])assert.ok(existsSync(`public/images/agents/raze/${a.key}${suffix}`))
    for(const i of c.gallery)assert.ok(existsSync(`public${i.src}`))
    assert.equal(isIndexableRoute({type:'article',articleKey:'raze'},locale),false)
    assert.ok(routePath(locale,{type:'article',articleKey:'raze'}).endsWith('/valorant-raze/'))
    assert.doesNotMatch(JSON.stringify(c),/Phoenix|不死鸟|フェニックス|Omen|幽影|オーメン|RECKONING/i)
  }
  assert.match(readFileSync('src/components/CrosshairToolsPage.jsx','utf8'), /theme'\) === 'raze' \? \{ \.\.\.RAZE_GENERATOR_SETTINGS \}/)
})
