import { test } from 'node:test'
import assert from 'node:assert/strict'
import { DatabaseSync } from 'node:sqlite'
import { readFileSync } from 'node:fs'
import { createD1Store } from '../cloudflare/store.mjs'
import worker, { preferredLocale } from '../cloudflare/worker.mjs'
import { storeContext } from '../netlify/functions/_lib/store-context.mjs'
import { getJson, setJson } from '../netlify/functions/_lib/store.mjs'

function makeStore() {
  const sqlite = new DatabaseSync(':memory:')
  sqlite.exec(readFileSync(new URL('../cloudflare/schema.sql', import.meta.url), 'utf8'))
  const db = { prepare(sql) { return { bind(...args) { return { async first() { return sqlite.prepare(sql).get(...args) }, async run() { return { meta: { changes: Number(sqlite.prepare(sql).run(...args).changes) } } } } } } } }
  return createD1Store(db)
}
test('atomic create does not overwrite existing entitlements; stale version cannot spend quota twice', async () => {
  const store = makeStore()
  assert.equal((await store.setJSON('entitlements/test', { quota: 2 }, { onlyIfNew: true })).modified, true)
  assert.equal((await store.setJSON('entitlements/test', { quota: 99 }, { onlyIfNew: true })).modified, false)
  const row = await store.getWithMetadata('entitlements/test')
  const results = await Promise.all([1, 2].map(() => store.setJSON('entitlements/test', { quota: 1 }, { onlyIfMatch: row.etag })))
  assert.equal(results.filter(r => r.modified).length, 1)
  assert.deepEqual(await store.get('entitlements/test'), { quota: 1 })
})
test('request-scoped stores never mix customers across parallel requests', async () => {
  const stores = [makeStore(), makeStore()]
  const values = await Promise.all(stores.map((store, i) => storeContext.run(store, async () => {
    await setJson('same-key', { id: i }); await new Promise(r => setTimeout(r, 5)); return getJson('same-key')
  })))
  assert.deepEqual(values, [{ id: 0 }, { id: 1 }])
})
test('language redirect, legacy redirect, unknown API and unconfigured preview are safe', async () => {
  assert.equal(preferredLocale('en;q=0.2,zh-CN;q=0.9'), 'zh-cn')
  const response = await worker.fetch(new Request('https://aimcodes.com/?qa=1', { headers: { 'Accept-Language': 'ja' } }), {})
  assert.equal(response.status, 302); assert.equal(response.headers.get('location'), 'https://aimcodes.com/ja/?qa=1')
  assert.equal(response.headers.get('vary'), 'Accept-Language')
  const legacy = await worker.fetch(new Request('https://aimcodes.com/en/pro-players/?qa=1'), {})
  assert.equal(legacy.headers.get('location'), 'https://aimcodes.com/en/crosshairs/?qa=1')
  assert.equal((await worker.fetch(new Request('https://preview.workers.dev/api/aim-pack/create-checkout'), {})).status, 503)
  assert.equal((await worker.fetch(new Request('https://aimcodes.com/api/unknown'), {})).status, 404)
})
