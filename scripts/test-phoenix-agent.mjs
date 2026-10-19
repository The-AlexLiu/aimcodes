import assert from 'node:assert/strict'
import { readFileSync, existsSync } from 'node:fs'
import { test } from 'node:test'
import { phoenixArticleCopy } from '../src/seo/phoenixContent.js'
import { PHOENIX_CROSSHAIR, PHOENIX_GENERATOR_SETTINGS } from '../src/data/phoenixCrosshair.js'
import { HUSH_CROSSHAIR } from '../src/data/hushCrosshair.js'
import { SAGE_CROSSHAIR } from '../src/data/sageCrosshair.js'
import { generateCrosshairCode, parseCrosshairCode } from '../src/utils/crosshairCode.js'
import { isIndexableRoute, routePath } from '../src/seo/routes.js'

test('Phoenix preview code round-trips the full editor configuration and differs in geometry', () => {
  const p = parseCrosshairCode(PHOENIX_CROSSHAIR.code)
  const s = PHOENIX_GENERATOR_SETTINGS
  assert.equal(p.color.toLowerCase(), s.customColor)
  assert.equal(p.settings.dot.enabled, false, 'Phoenix uses an open center, unlike Sage')
  assert.equal(p.settings.outer.enabled, true, 'Phoenix has separate outer rays')
  assert.equal(p.settings.inner.thickness, 1)
  const editorCode = generateCrosshairCode({ colorPreset:s.colorPreset, customColor:s.customColor,
    outline:{enabled:s.outline,opacity:s.outlineOpacity,thickness:s.outlineThickness},
    dot:{enabled:s.dot,opacity:s.dotOpacity,size:s.dotSize},
    inner:{enabled:s.inner,opacity:s.innerOpacity,length:s.innerLength,thickness:s.innerThickness,offset:s.innerOffset},
    outer:{enabled:s.outer,opacity:s.outerOpacity,length:s.outerLength,thickness:s.outerThickness,offset:s.outerOffset},
    movementError:s.movementError,firingError:s.firingError })
  assert.equal(editorCode, PHOENIX_CROSSHAIR.code)
  for (const other of [HUSH_CROSSHAIR, SAGE_CROSSHAIR]) assert.notDeepEqual(p.settings, parseCrosshairCode(other.code).settings)
  assert.match(readFileSync(new URL('../src/components/CrosshairToolsPage.jsx',import.meta.url),'utf8'), /theme'\) === 'phoenix' \? \{ \.\.\.PHOENIX_GENERATOR_SETTINGS \}/)
})

test('Five localized Phoenix pages have matching official icons/videos and respect the English-only release index', () => {
  const titles=new Set()
  for (const locale of ['en','zh-CN','es','pt-BR','ja']) {
    const c = phoenixArticleCopy(locale)
    assert.equal(c.abilities.length,4)
    assert.equal(c.faq.length,0)
    assert.ok(c.title && c.intro && c.metaDescription && c.themeDescription)
    for(const a of c.abilities){
      assert.ok(a.name && a.action && a.effect)
      for(const ext of ['webp','mp4','-poster.webp']) assert.ok(existsSync(`public/images/agents/phoenix/${a.key}${ext.startsWith('-')?ext:'.'+ext}`))
    }
    assert.ok(c.gallery.every(i=>existsSync(`public${i.src}`)))
    const route={type:'article',articleKey:'phoenix'}
    assert.equal(isIndexableRoute(route,locale),locale === 'en')
    assert.ok(routePath(locale,route).endsWith('/valorant-phoenix/'))
    titles.add(c.title)
  }
  assert.equal(titles.size,5)
})
