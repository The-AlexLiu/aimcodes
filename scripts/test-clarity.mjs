import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { initializeClarity, CLARITY_PROJECT_ID } from '../src/utils/clarity.js'
import { trustCopy } from '../src/seo/trustContent.js'

function storage(entries = []) {
  const values = new Map(entries)
  return { getItem: (key) => values.get(key) ?? null, setItem: (key, value) => values.set(key, value), removeItem: (key) => values.delete(key) }
}

function fixture(url = 'https://aimcodes.com/en/', { session = storage(), local = storage() } = {}) {
  const scripts = []
  globalThis.window = { location: new URL(url), sessionStorage: session, localStorage: local }
  globalThis.document = {
    querySelector: () => scripts[0] || null,
    createElement: () => ({ dataset: {} }),
    head: { appendChild: (script) => scripts.push(script) },
  }
  return { scripts, session, local }
}

test('production queues denied consent before loading the official tag exactly once', () => {
  const { scripts } = fixture()
  assert.equal(initializeClarity(), true)
  assert.equal(initializeClarity(), true)
  assert.equal(scripts.length, 1)
  assert.equal(scripts[0].src, `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`)
  assert.equal(scripts[0].async, true)
  assert.deepEqual(Array.from(window.clarity.q[0]), ['consentv2', { ad_Storage: 'denied', analytics_Storage: 'denied' }])
})

test('local, debug, and deploy preview hosts never record', () => {
  for (const url of ['http://localhost/en/', 'http://127.0.0.1/en/?ga_debug=1', 'https://preview.netlify.app/en/', 'https://aimcodes.com.example.org/en/']) {
    const { scripts } = fixture(url)
    assert.equal(initializeClarity(), false)
    assert.equal(scripts.length, 0)
    assert.equal(window.clarity, undefined)
  }
})

test('QA exclusion survives navigation and qa=0 restores tracking', () => {
  const { session } = fixture('https://aimcodes.com/en/?qa=1')
  assert.equal(initializeClarity(), false)
  fixture('https://aimcodes.com/ja/', { session })
  assert.equal(initializeClarity(), false)
  fixture('https://aimcodes.com/ja/?qa=0', { session })
  assert.equal(initializeClarity(), true)
})

test('opt-out persists and explicit opt-in restores tracking', () => {
  const { local } = fixture('https://aimcodes.com/en/?analytics_optout=1')
  assert.equal(initializeClarity(), false)
  fixture('https://www.aimcodes.com/es/', { local })
  assert.equal(initializeClarity(), false)
  fixture('https://www.aimcodes.com/es/?analytics_optin=1', { local })
  assert.equal(initializeClarity(), true)
})

test('storage unavailable or a GA4 QA flag prevents recording', () => {
  fixture(undefined, { session: { getItem() { throw new Error('blocked') } } })
  assert.equal(initializeClarity(), false)
  fixture()
  window.__aimcodesQaMode = true
  assert.equal(initializeClarity(), false)
})

test('server-side import is safe', () => {
  delete globalThis.window
  delete globalThis.document
  assert.equal(initializeClarity(), false)
})

test('explicit opt-in never overrides a QA visit', () => {
  const { scripts } = fixture('https://aimcodes.com/en/?qa=1&analytics_optin=1')
  assert.equal(initializeClarity(), false)
  assert.equal(scripts.length, 0)
})

test('blocked local storage fails closed even when session storage works', () => {
  fixture(undefined, { local: { getItem() { throw new Error('blocked') } } })
  assert.equal(initializeClarity(), false)
  assert.equal(window.clarity, undefined)
})

test('application startup invokes Clarity and every locale discloses it', () => {
  const startup = readFileSync(new URL('../src/main.jsx', import.meta.url), 'utf8')
  assert.match(startup, /import \{ initializeClarity \} from '\.\/utils\/clarity\.js'/)
  assert.match(startup, /initializeAnalytics\(\)\s+initializeClarity\(\)/)
  for (const locale of ['en', 'es', 'pt-BR', 'zh-CN', 'ja']) {
    const privacy = JSON.stringify(trustCopy(locale, 'privacy'))
    assert.match(privacy, /Microsoft Clarity/, locale)
    assert.match(privacy, /analytics_optout=1/, locale)
    assert.match(privacy, /privacy\.microsoft\.com\/privacystatement/, locale)
  }
})

test('purchase delivery, recovery, and sensitive URL parameters never record', () => {
  for (const path of ['/en/my-aim-pack/', '/ja/recover-aim-pack/', '/en/?token=synthetic-test', '/en/?email=synthetic-test', '/en/?access_token=synthetic-test']) {
    const { scripts } = fixture(`https://aimcodes.com${path}`)
    assert.equal(initializeClarity(), false, path)
    assert.equal(scripts.length, 0)
  }
})
