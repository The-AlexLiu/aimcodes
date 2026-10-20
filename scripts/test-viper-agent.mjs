import assert from 'node:assert/strict'
import { test } from 'node:test'
import { existsSync } from 'node:fs'
import { viperArticleCopy } from '../src/seo/viperContent.js'
import { VIPER_CROSSHAIR, VIPER_GENERATOR_SETTINGS } from '../src/data/viperCrosshair.js'
import { PHOENIX_CROSSHAIR } from '../src/data/phoenixCrosshair.js'
import { SAGE_CROSSHAIR } from '../src/data/sageCrosshair.js'
import { HUSH_CROSSHAIR } from '../src/data/hushCrosshair.js'
import { parseCrosshairCode, generateCrosshairCode } from '../src/utils/crosshairCode.js'
import { routePath, isIndexableRoute } from '../src/seo/routes.js'

test('Viper is a standalone square dot and the editor preserves the full code',()=>{
 const p=parseCrosshairCode(VIPER_CROSSHAIR.code),s=VIPER_GENERATOR_SETTINGS
 assert.equal(p.color,s.customColor)
 assert.equal(p.settings.dot.enabled,true)
 assert.equal(p.settings.dot.size,3)
 assert.equal(p.settings.inner.enabled,false)
 assert.equal(p.settings.outer.enabled,false)
 const code=generateCrosshairCode({colorPreset:s.colorPreset,customColor:s.customColor,outline:{enabled:s.outline,opacity:s.outlineOpacity,thickness:s.outlineThickness},dot:{enabled:s.dot,opacity:s.dotOpacity,size:s.dotSize},inner:{enabled:s.inner,opacity:s.innerOpacity,length:s.innerLength,thickness:s.innerThickness,offset:s.innerOffset},outer:{enabled:s.outer,opacity:s.outerOpacity,length:s.outerLength,thickness:s.outerThickness,offset:s.outerOffset},movementError:s.movementError,firingError:s.firingError})
 assert.equal(code,VIPER_CROSSHAIR.code)
 for(const other of [HUSH_CROSSHAIR,SAGE_CROSSHAIR,PHOENIX_CROSSHAIR])assert.notDeepEqual(p.settings,parseCrosshairCode(other.code).settings)
})
test('Five Viper preview routes stay out of search and have complete localized media',()=>{
 for(const locale of ['en','zh-CN','ja','es','pt-BR']){
  const c=viperArticleCopy(locale),route={type:'article',articleKey:'viper'}
  assert.equal(isIndexableRoute(route,locale),false)
  assert.ok(routePath(locale,route).endsWith('/valorant-viper/'))
  assert.equal(c.abilities.length,4)
  assert.deepEqual(c.abilities.map(a=>a.binding),['C','Q','E','X'])
  assert.deepEqual(c.abilities.map(a=>a.key),['bite','cloud','wall','ultimate'])
  for(const a of c.abilities){assert.ok(a.name&&a.effect&&a.action);for(const suffix of ['.webp','.mp4','-poster.webp'])assert.ok(existsSync(`public/images/agents/viper/${a.key}${suffix}`))}
  assert.equal(c.gallery.length,2)
  for(const image of c.gallery)assert.ok(image.label&&existsSync(`public${image.src}`))
 }
 assert.deepEqual(viperArticleCopy('zh-CN').abilities.map(a=>a.name),['蛇吻','瘴云','毒幕','蝰腹'])
})
