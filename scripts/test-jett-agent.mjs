import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { test } from 'node:test'
import { jettArticleCopy } from '../src/seo/jettContent.js'
import { JETT_CROSSHAIR, JETT_GENERATOR_SETTINGS } from '../src/data/jettCrosshair.js'
import { PHOENIX_CROSSHAIR } from '../src/data/phoenixCrosshair.js'
import { HUSH_CROSSHAIR } from '../src/data/hushCrosshair.js'
import { SAGE_CROSSHAIR } from '../src/data/sageCrosshair.js'
import { generateCrosshairCode, parseCrosshairCode } from '../src/utils/crosshairCode.js'
import { isIndexableRoute, routePath } from '../src/seo/routes.js'

test('Jett preview code round-trips the full editor configuration and differs in geometry', () => {
  const p = parseCrosshairCode(JETT_CROSSHAIR.code)
  const s = JETT_GENERATOR_SETTINGS
  assert.equal(p.color.toLowerCase(), s.customColor)
  assert.equal(p.settings.dot.enabled, true, 'Jett aims with a small center dot')
  assert.equal(p.settings.outer.enabled, true, 'Jett has four separate peripheral points')
  assert.equal(p.settings.inner.enabled, false)
  assert.equal(p.settings.dot.size, 1)
  assert.equal(p.settings.outer.horizontalLength, 1)
  const editorCode = generateCrosshairCode({ colorPreset:s.colorPreset, customColor:s.customColor,
    outline:{enabled:s.outline,opacity:s.outlineOpacity,thickness:s.outlineThickness},
    dot:{enabled:s.dot,opacity:s.dotOpacity,size:s.dotSize},
    inner:{enabled:s.inner,opacity:s.innerOpacity,length:s.innerLength,thickness:s.innerThickness,offset:s.innerOffset},
    outer:{enabled:s.outer,opacity:s.outerOpacity,length:s.outerLength,thickness:s.outerThickness,offset:s.outerOffset},
    movementError:s.movementError,firingError:s.firingError })
  assert.equal(editorCode, JETT_CROSSHAIR.code)
  for (const other of [HUSH_CROSSHAIR, SAGE_CROSSHAIR, PHOENIX_CROSSHAIR]) assert.notDeepEqual(p.settings, parseCrosshairCode(other.code).settings)
  assert.match(readFileSync(new URL('../src/components/CrosshairToolsPage.jsx',import.meta.url),'utf8'), /theme'\) === 'jett' \? \{ \.\.\.JETT_GENERATOR_SETTINGS \}/)
})

test('Five localized Jett pages have matching official icons/videos and respect the noindex preview boundary', () => {
  const titles=new Set()
  for (const locale of ['en','zh-CN','es','pt-BR','ja']) {
    const c = jettArticleCopy(locale)
    assert.equal(c.abilities.length,5)
    assert.equal(c.faq.length,0)
    assert.ok(c.title && c.intro && c.metaDescription && c.themeDescription)
    for(const a of c.abilities){
      assert.ok(a.name && a.action && a.effect)
      for(const ext of ['webp','mp4','-poster.webp']) assert.ok(existsSync(`public/images/agents/jett/${a.key}${ext.startsWith('-')?ext:'.'+ext}`))
    }
    assert.ok(c.gallery.every(i=>existsSync(`public${i.src}`)))
    const route={type:'article',articleKey:'jett'}
    assert.equal(isIndexableRoute(route,locale),false)
    assert.ok(routePath(locale,route).endsWith('/valorant-jett/'))
    titles.add(c.title)
  }
  assert.equal(titles.size,5)
})
