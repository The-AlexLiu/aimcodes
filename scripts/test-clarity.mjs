import assert from 'node:assert/strict'
import test from 'node:test'
import { readFileSync } from 'node:fs'
import { initializeClarity, trackClarityEvent, CLARITY_PROJECT_ID } from '../src/utils/clarity.js'
import { trackEvent } from '../src/utils/analytics.js'
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

function capture() {
  const calls = []
  window.clarity = (...args) => calls.push(args)
  return calls
}

test('only four approved events forward and payloads never leave through Clarity', () => {
  fixture()
  const calls = capture()
  for (const event of ['crosshair_code_copy', 'finder_start', 'finder_complete']) {
    assert.equal(trackClarityEvent(event, { app_language: 'zh-CN', page_type: 'finder', attempt_id: 'private', code: 'private', email: 'private' }), true)
  }
  for (const event of ['finder_false_start', 'finder_timeout', 'share_error', 'page_view', 'reaction_test_complete']) {
    assert.equal(trackClarityEvent(event), false)
  }
  assert.deepEqual(calls.filter(([command]) => command === 'event').map(([, event]) => event), ['crosshair_code_copy', 'finder_start', 'finder_complete'])
  assert.equal(JSON.stringify(calls).includes('private'), false)
  assert.equal(trackClarityEvent('finder_complete', { app_language: 'arbitrary text', page_type: 'private input' }), true)
  assert.equal(JSON.stringify(calls).includes('arbitrary text'), false)
})

test('empty or invalid playbook exports are excluded without changing GA4 semantics', () => {
  fixture()
  const calls = capture()
  for (const element_count of [undefined, 0, -1, '1', 1.5, Infinity]) {
    assert.equal(trackClarityEvent('playbook_export', { element_count }), false)
  }
  assert.equal(trackClarityEvent('playbook_export', { element_count: 1 }), true)
  assert.equal(calls.filter(([command]) => command === 'event').length, 1)
})

test('events fail closed for QA, opt-out, preview, private routes and inaccessible storage even with an SDK present', () => {
  for (const url of ['https://aimcodes.com/en/?qa=1', 'https://aimcodes.com/en/?analytics_optout=1', 'https://preview.netlify.app/en/', 'https://aimcodes.com/en/my-aim-pack/', 'https://aimcodes.com/en/?token=synthetic']) {
    fixture(url)
    const calls = capture()
    assert.equal(trackClarityEvent('crosshair_code_copy'), false, url)
    assert.equal(calls.length, 0)
  }
  const { session } = fixture('https://aimcodes.com/en/?qa=1')
  capture()
  assert.equal(trackClarityEvent('finder_start'), false)
  window.location = new URL('https://aimcodes.com/en/reaction-time-test/')
  assert.equal(trackClarityEvent('finder_complete'), false)
  assert.equal(session.getItem('aimcodes-analytics-qa-v1'), '1')
  fixture(undefined, { local: { getItem() { throw new Error('blocked') } } })
  capture()
  assert.equal(trackClarityEvent('finder_complete'), false)
})

test('SDK failures and absent SDK never throw or load tracking on demand', () => {
  const { scripts } = fixture()
  assert.equal(trackClarityEvent('crosshair_code_copy'), false)
  assert.equal(scripts.length, 0)
  window.clarity = () => { throw new Error('blocked') }
  assert.doesNotThrow(() => assert.equal(trackClarityEvent('crosshair_code_copy'), false))
  delete globalThis.window
  delete globalThis.document
  assert.equal(trackClarityEvent('finder_complete'), false)
})

test('GA4 dispatch forwards each approved action once, including repeat successes', () => {
  fixture()
  const calls = capture()
  window.gtag = () => {}
  for (let index = 0; index < 2; index += 1) trackEvent('crosshair_code_copy', { crosshair_id: 'synthetic' })
  trackEvent('finder_timeout', {})
  assert.equal(calls.filter(([command]) => command === 'event').length, 2)
})

test('Clarity does not depend on Google telemetry being available', () => {
  fixture()
  const calls = capture()
  window.gtag = () => { throw new Error('Google blocked') }
  assert.throws(() => trackEvent('finder_start'), /Google blocked/)
  assert.deepEqual(calls.filter(([command]) => command === 'event'), [['event', 'finder_start']])
})
