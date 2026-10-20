import assert from 'node:assert/strict'
import { test } from 'node:test'
import { readFileSync, existsSync } from 'node:fs'
import { yoruArticleCopy } from '../src/seo/yoruContent.js'
import { YORU_CROSSHAIR, YORU_GENERATOR_SETTINGS as s } from '../src/data/yoruCrosshair.js'
import { OMEN_CROSSHAIR } from '../src/data/omenCrosshair.js'
import { HUSH_CROSSHAIR } from '../src/data/hushCrosshair.js'
import { SAGE_CROSSHAIR } from '../src/data/sageCrosshair.js'
import { PHOENIX_CROSSHAIR } from '../src/data/phoenixCrosshair.js'
import { parseCrosshairCode, generateCrosshairCode } from '../src/utils/crosshairCode.js'
import { isIndexableRoute, routePath } from '../src/seo/routes.js'

test('Yoru uses a split square frame and reproduces the complete editor code', () => {
  const p = parseCrosshairCode(YORU_CROSSHAIR.code)
  assert.equal(p.settings.inner.enabled, true)
  assert.equal(p.settings.dot.enabled, false)
  assert.equal(p.settings.outer.enabled, true)
  assert.equal(p.settings.inner.horizontalLength, 1)
  assert.equal(p.settings.inner.thickness, 5)
  assert.equal(p.settings.inner.offset, 4)
  const code = generateCrosshairCode({colorPreset:s.colorPreset,customColor:s.customColor,
    outline:{enabled:s.outline,opacity:s.outlineOpacity,thickness:s.outlineThickness},
    dot:{enabled:s.dot,opacity:s.dotOpacity,size:s.dotSize},
    inner:{enabled:s.inner,opacity:s.innerOpacity,length:s.innerLength,thickness:s.innerThickness,offset:s.innerOffset},
    outer:{enabled:s.outer,opacity:s.outerOpacity,length:s.outerLength,thickness:s.outerThickness,offset:s.outerOffset},
    movementError:s.movementError,firingError:s.firingError})
  assert.equal(code, YORU_CROSSHAIR.code)
  for(const other of [HUSH_CROSSHAIR,SAGE_CROSSHAIR,PHOENIX_CROSSHAIR,OMEN_CROSSHAIR]) {
    const o=parseCrosshairCode(other.code)
    assert.notDeepEqual([p.settings.dot,p.settings.inner,p.settings.outer],[o.settings.dot,o.settings.inner,o.settings.outer])
  }
})

test('Five Yoru drafts have official localized ability names, local media and no indexing', () => {
  for(const locale of ['en','es','pt-BR','zh-CN','ja']) {
    const c=yoruArticleCopy(locale)
    assert.equal(c.abilities.length,4)
    assert.deepEqual(c.abilities.map(a=>a.binding),['C','Q','E','X'])
    if(locale==='zh-CN')assert.deepEqual(c.abilities.map(a=>a.name),['出其不意','攻其不备','不请自来','神鬼不觉'])
    for(const a of c.abilities)for(const suffix of ['.mp4','.webp','-poster.webp'])assert.ok(existsSync(`public/images/agents/yoru/${a.key}${suffix}`))
    for(const i of c.gallery)assert.ok(existsSync(`public${i.src}`))
    assert.equal(isIndexableRoute({type:'article',articleKey:'yoru'},locale),false)
    assert.ok(routePath(locale,{type:'article',articleKey:'yoru'}).endsWith('/valorant-yoru/'))
    assert.doesNotMatch(JSON.stringify(c),/Raze|雷兹|レイズ|WARM UP/i)
  }
  assert.match(readFileSync('src/components/CrosshairToolsPage.jsx','utf8'), /theme'\) === 'yoru' \? \{ \.\.\.YORU_GENERATOR_SETTINGS \}/)
})
