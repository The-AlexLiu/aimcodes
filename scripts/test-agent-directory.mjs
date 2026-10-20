import assert from 'node:assert/strict'
import { access, readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'
import { agentDirectory, agentName, agentRoles, featuredAgents, filterAgents } from '../src/data/agentDirectory.js'
import { agentsCopy } from '../src/seo/agentsContent.js'
import { isIndexableRoute, parseSeoRoute, routePath, SEO_ARTICLES } from '../src/seo/routes.js'

const root = fileURLToPath(new URL('../', import.meta.url))
const locales = ['en', 'es', 'pt-BR', 'zh-CN', 'ja']

test('directory covers published ability pages and twelve editorial home slots', async () => {
  const expected = Object.keys(SEO_ARTICLES).filter((id) => SEO_ARTICLES[id].keyword?.includes('abilities'))
  assert.deepEqual(agentDirectory.map((a) => a.id).sort(), expected.sort())
  assert.equal(new Set(agentDirectory.map((a) => a.id)).size, agentDirectory.length)
  assert.equal(featuredAgents.length, 12)
  assert.deepEqual(new Set(featuredAgents.map((a) => a.role)), new Set(agentRoles))
  for (const agent of agentDirectory) {
    await access(resolve(root, 'public', agent.image.slice(1)))
    for (const locale of locales) {
      assert.ok(agentName(agent, locale))
      assert.ok(agentsCopy(locale).roles[agent.role])
      assert.equal(parseSeoRoute(routePath(locale, { type: 'article', articleKey: agent.id })).articleKey, agent.id)
    }
  }
})

test('search supports local and English names, role combinations and empty results', () => {
  assert.equal(filterAgents('zh-CN', '  ＪＥＴＴ  ')[0].id, 'jett')
  assert.equal(filterAgents('zh-CN', '捷风')[0].id, 'jett')
  assert.equal(filterAgents('ja', 'ジェット')[0].id, 'jett')
  assert.equal(filterAgents('en', 'KAY/O')[0].id, 'kayo')
  assert.equal(filterAgents('zh-CN', '捷风', 'sentinel').length, 0)
  assert.equal(filterAgents('en', 'no-such-agent').length, 0)
  assert.equal(filterAgents('en', '  ').length, agentDirectory.length)
  for (const role of agentRoles) assert.ok(filterAgents('en', '', role).every((agent) => agent.role === role))
})

test('five generated directories retain noindex and every hero link; home has twelve', async () => {
  const sitemap = await readFile(resolve(root, 'dist/sitemap.xml'), 'utf8')
  for (const locale of locales) {
    const path = routePath(locale, { type: 'agents' })
    assert.equal(parseSeoRoute(path).type, 'agents')
    assert.equal(isIndexableRoute({ type: 'agents' }, locale), false)
    const html = await readFile(resolve(root, 'dist', path.slice(1), 'index.html'), 'utf8')
    assert.ok(html.includes('<meta name="robots" content="noindex,follow"'))
    assert.ok(html.includes(`rel="canonical" href="https://aimcodes.com${path}"`))
    assert.ok(!html.includes('hreflang='))
    assert.ok(!sitemap.includes(`https://aimcodes.com${path}<`))
    assert.ok(html.includes('"@type":"ItemList"'))
    for (const agent of agentDirectory) assert.ok(html.includes(`href="${routePath(locale, { type: 'article', articleKey: agent.id })}"`))
    const home = await readFile(resolve(root, 'dist', routePath(locale, { type: 'home' }).slice(1), 'index.html'), 'utf8')
    const linkedAgents = agentDirectory.filter((agent) => home.includes(`href="${routePath(locale, { type: 'article', articleKey: agent.id })}"`))
    assert.deepEqual(new Set(linkedAgents.map((a) => a.id)), new Set(featuredAgents.map((a) => a.id)))
  }
})
