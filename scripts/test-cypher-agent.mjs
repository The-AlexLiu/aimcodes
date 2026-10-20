import assert from 'node:assert/strict'
import { cypherArticleCopy } from '../src/seo/cypherContent.js'
import { CYPHER_CROSSHAIR } from '../src/data/cypherCrosshair.js'
import { parseCrosshairCode, generateCrosshairCode } from '../src/utils/crosshairCode.js'
import { isIndexableRoute } from '../src/seo/routes.js'
const parsed=parseCrosshairCode(CYPHER_CROSSHAIR.code)
assert.equal(parsed.settings.inner.offset,0)
assert.equal(parsed.settings.inner.horizontalLength,2)
assert.equal(parsed.settings.inner.thickness,1)
assert.equal(parsed.settings.outer.thickness,5)
assert.equal(parsed.settings.outer.offset,5)
assert.equal(parsed.settings.dot.enabled,false)
assert.equal(generateCrosshairCode({...parsed.settings,colorPreset:'8',customColor:parsed.color,movementError:false,firingError:false}),CYPHER_CROSSHAIR.code)
for(const locale of ['en','es','pt-BR','ja','zh-CN']){
 const c=cypherArticleCopy(locale)
 assert.deepEqual(c.abilities.map(a=>a.binding),['C','Q','E','X'])
 assert.deepEqual(c.abilities.map(a=>a.key),['trapwire','cage','spycam','ultimate'])
 assert.equal(isIndexableRoute({type:'article',articleKey:'cypher'},locale),false)
 assert.equal(c.gallery.length,2)
 assert.doesNotMatch(JSON.stringify(c),/Miks|迷核|ミクス|Harmonize|waveform|m-pulse/)
}
const cn=cypherArticleCopy('zh-CN')
assert.deepEqual(cn.abilities.map(a=>a.name),['震慑绊线','赛博囚笼','战术监控','神经取析'])
assert.match(cn.abilities[0].effect,/减速/)
assert.doesNotMatch(cn.abilities[0].effect,/束缚|震荡|眩晕/)
assert.match(cn.story[1],/愚人节/)
console.log('Cypher current kit, localized bindings, camera-sight geometry, code roundtrip and noindex passed')
