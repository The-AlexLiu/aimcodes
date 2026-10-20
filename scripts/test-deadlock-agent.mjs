import assert from 'node:assert/strict'
import { deadlockArticleCopy } from '../src/seo/deadlockContent.js'
import { DEADLOCK_CROSSHAIR } from '../src/data/deadlockCrosshair.js'
import { parseCrosshairCode } from '../src/utils/crosshairCode.js'
import { isIndexableRoute } from '../src/seo/routes.js'
for(const locale of ['en','es','pt-BR','zh-CN','ja']){
 const c=deadlockArticleCopy(locale)
 assert.deepEqual(c.abilities.map(a=>[a.key,a.binding]),[['barrier','C'],['sensor','Q'],['gravnet','E'],['ultimate','X']])
 assert.equal(isIndexableRoute({type:'article',articleKey:'deadlock'},locale),false)
 assert.doesNotMatch(JSON.stringify(c),/Killjoy|奇乐|キルジョイ|Nanoswarm|Turret/)
}
const c=deadlockArticleCopy('zh-CN')
assert.deepEqual(c.abilities.map(a=>a.name),['阻域屏障','声感陷阱','重力捕网','断魂索道'])
assert.match(c.abilities[0].action,/子弹可以穿过/)
assert.match(c.abilities[1].action,/静步/)
assert.match(c.abilities[2].action,/可充能/)
assert.match(c.abilities[3].action,/打破纤维茧/)
const {settings:s}=parseCrosshairCode(DEADLOCK_CROSSHAIR.code)
assert.equal(s.dot.enabled,false)
assert.equal(s.inner.horizontalLength,0)
assert.equal(s.inner.verticalLength,7)
assert.equal(s.outer.horizontalLength,2)
assert.equal(s.outer.verticalLength,0)
console.log('Deadlock current bindings, official names, counterplay, mesh geometry and noindex passed')
