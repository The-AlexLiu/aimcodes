import test from 'node:test'
import assert from 'node:assert/strict'
import { approvedUrl, completedCapture, paypalOrderBody, paypalRequest, paypalRuntimeConfig, webhookVerificationBody } from '../netlify/functions/_lib/paypal.mjs'
import { fulfillPayPalOrder } from '../netlify/functions/_lib/fulfillment.mjs'
import { sha256 } from '../netlify/functions/_lib/security.mjs'
import checkout from '../netlify/functions/aim-pack-create-checkout.mjs'
import captureHandler from '../netlify/functions/aim-pack-paypal-capture.mjs'
import webhook from '../netlify/functions/aim-pack-paypal-webhook.mjs'
import { paidPackCopy } from '../src/i18n/paidPackCopy.js'

// Tests must never send production email or analytics, even in an inherited shell.
delete process.env.RESEND_API_KEY
delete process.env.GA4_API_SECRET
process.env.AIMCODES_ACCESS_SECRET = 'test-only-secret-with-at-least-thirty-two-characters'
const order = { id: 'ord_test', paypalOrderId: 'PAYPAL123456789', merchantId: 'MERCHANT123', locale: 'en', email: 'buyer@example.com', provider: 'paypal', productId: 'aimcodes_crosshair_pack_v1', browserClaimHash: sha256('test-claim'), input: { average: 247, consistency: 20, best: 225, profile: 'balanced', mode: 'ranked', visual: 'balanced', weapon: 'rifle' } }
const confirmed = () => ({ id: order.paypalOrderId, status: 'COMPLETED', purchase_units: [{ custom_id: order.id, payee: { merchant_id: order.merchantId }, amount: { currency_code: 'USD', value: '1.99' }, payments: { captures: [{ id: 'CAPTURE123', status: 'COMPLETED', amount: { currency_code: 'USD', value: '1.99' } }] } }] })

test('confirmed payment requires matching provider order, merchant and exact amount', () => {
  assert.equal(completedCapture(confirmed(), order).id, 'CAPTURE123')
  for (const mutate of [p => { p.id = 'OTHER' }, p => { p.status = 'APPROVED' }, p => { p.purchase_units[0].custom_id = 'OTHER' }, p => { p.purchase_units[0].payee.merchant_id = 'OTHER' }, p => { p.purchase_units[0].amount.value = '0.01' }, p => { p.purchase_units[0].payments.captures[0].amount.currency_code = 'EUR' }, p => { p.purchase_units[0].payments.captures[0].status = 'PENDING' }, p => { p.purchase_units[0].payments.captures.push(p.purchase_units[0].payments.captures[0]) }]) {
    const payload = confirmed(); mutate(payload); assert.equal(completedCapture(payload, order), null)
  }
})

test('digital checkout has fixed server price and no shipping address', () => {
  const payload = paypalOrderBody(order, 'https://aimcodes.com')
  assert.equal(payload.purchase_units[0].amount.value, '1.99')
  assert.equal(payload.purchase_units[0].items[0].category, 'DIGITAL_GOODS')
  assert.equal(payload.payment_source.paypal.experience_context.shipping_preference, 'NO_SHIPPING')
  assert.equal(payload.payment_source.paypal.experience_context.cancel_url, 'https://aimcodes.com/en/checkout/complete/?cancelled=1')
})

test('redirect accepts only the correct PayPal environment and rejects phishing URLs', () => {
  const payload = href => ({ links: [{ rel: 'payer-action', href }] })
  assert.ok(approvedUrl(payload('https://www.paypal.com/checkoutnow?token=test'), 'production'))
  assert.ok(approvedUrl(payload('https://www.sandbox.paypal.com/checkoutnow?token=test'), 'sandbox'))
  for (const href of ['https://www.paypal.com.evil.example/', 'https://evil.example/', 'http://www.paypal.com/', 'javascript:alert(1)', 'https://attacker@www.paypal.com/']) assert.equal(approvedUrl(payload(href), 'production'), null)
  assert.equal(approvedUrl(payload('https://www.paypal.com/'), 'sandbox'), null)
})

test('preview cannot accidentally use live PayPal credentials', () => {
  const oldEnv = process.env.PAYPAL_ENVIRONMENT; const oldContext = process.env.CONTEXT
  try {
    process.env.PAYPAL_ENVIRONMENT = 'production'; process.env.CONTEXT = 'deploy-preview'
    assert.throws(() => paypalRuntimeConfig(), /live_payments_in_preview/)
    process.env.PAYPAL_ENVIRONMENT = 'sandbox'
    assert.equal(paypalRuntimeConfig().baseUrl, 'https://api-m.sandbox.paypal.com')
  } finally {
    if (oldEnv === undefined) delete process.env.PAYPAL_ENVIRONMENT; else process.env.PAYPAL_ENVIRONMENT = oldEnv
    if (oldContext === undefined) delete process.env.CONTEXT; else process.env.CONTEXT = oldContext
  }
})

test('server calls authenticate and use a stable capture idempotency key', async () => {
  const calls = []
  const fetcher = async (url, options) => { calls.push({ url, options }); return Response.json(calls.length === 1 ? { access_token: 'test-access' } : confirmed()) }
  await paypalRequest('/v2/checkout/orders/TEST/capture', { method: 'POST', body: {}, requestId: 'test-capture-key' }, { baseUrl: 'https://api-m.sandbox.paypal.com', clientId: 'test-id', clientSecret: 'test-secret' }, fetcher)
  assert.equal(calls[1].options.headers['PayPal-Request-Id'], 'test-capture-key')
  assert.equal(calls[0].options.body, 'grant_type=client_credentials')
  await assert.rejects(paypalRequest('/test', {}, { baseUrl: '', clientId: 'x', clientSecret: 'y' }, async () => Response.json({}, { status: 401 })), /paypal_auth_failed/)
})

test('unsigned notifications and cross-origin capture/checkout requests are rejected', async () => {
  assert.equal((await webhook(new Request('https://aimcodes.com/api/aim-pack/paypal-webhook', { method: 'POST', body: '{}' }))).status, 401)
  for (const handler of [checkout, captureHandler]) assert.equal((await handler(new Request('https://aimcodes.com/api/aim-pack/create-checkout', { method: 'POST', headers: { Origin: 'https://evil.example' }, body: '{}' }))).status, 403)
  assert.equal(webhookVerificationBody(new Request('https://aimcodes.com'), {}, 'TEST'), null)
})

function memoryStore(failKey = '') {
  const data = new Map()
  let failed = false
  return { data, async setJSON(key, value, options = {}) {
    if (key === failKey && !failed) { failed = true; throw new Error('test-storage-outage') }
    if (options.onlyIfNew && data.has(key)) return { modified: false }
    data.set(key, structuredClone(value)); return { modified: true }
  } }
}

test('parallel webhook/capture confirmations create one entitlement', async () => {
  const store = memoryStore()
  const results = await Promise.all(Array.from({ length: 4 }, () => fulfillPayPalOrder(order, confirmed().purchase_units[0].payments.captures[0], 'https://aimcodes.com', store)))
  assert.equal(new Set(results).size, 1)
  assert.equal([...store.data.keys()].filter(key => key.startsWith('entitlements/')).length, 1)
  const key = `entitlements/${results[0]}`
  store.data.get(key).regenerationsRemaining = 0; store.data.get(key).version = 3
  await fulfillPayPalOrder(order, confirmed().purchase_units[0].payments.captures[0], 'https://aimcodes.com', store)
  assert.equal(store.data.get(key).regenerationsRemaining, 0)
  assert.equal(store.data.get(key).version, 3)
})

test('retry after partial storage failure repairs delivery without replacing entitlement', async () => {
  const store = memoryStore(`orders/${order.id}`)
  const confirmedCapture = confirmed().purchase_units[0].payments.captures[0]
  await assert.rejects(fulfillPayPalOrder(order, confirmedCapture, 'https://aimcodes.com', store), /test-storage-outage/)
  await fulfillPayPalOrder(order, confirmedCapture, 'https://aimcodes.com', store)
  assert.equal(store.data.get(`orders/${order.id}`).state, 'fulfilled')
})

test('all five locales have cancellation, retry and honest recovery errors', () => {
  for (const locale of ['en', 'zh-CN', 'ja', 'es', 'pt-BR']) {
    const copy = paidPackCopy(locale)
    for (const key of ['retry', 'confirmationError', 'confirmationHelp', 'cancelledTitle', 'cancelledBody', 'backToTest', 'recoveryError']) assert.ok(copy[key], `${locale}/${key}`)
    assert.ok(copy.continue.includes('PayPal'))
    assert.ok(!JSON.stringify(copy).includes('Whop'))
  }
})

const { createCaptureHandler } = await import('../netlify/functions/aim-pack-paypal-capture.mjs')
const { createWebhookHandler } = await import('../netlify/functions/aim-pack-paypal-webhook.mjs')
const browserOrder = { ...order, id: 'ord_12345678-1234-1234-1234-123456789abc', state: 'pending', environment: 'sandbox', statusTokenHash: sha256('test-status') }
function browserRequest(overrides = {}) {
  return new Request('https://aimcodes.com/api/aim-pack/paypal-capture', { method: 'POST', headers: { Origin: 'https://aimcodes.com' }, body: JSON.stringify({ orderId: browserOrder.id, statusToken: 'test-status', paypalOrderId: browserOrder.paypalOrderId, ...overrides }) })
}
const testConfig = () => ({ environment: 'sandbox', merchantId: order.merchantId })

test('capture endpoint rejects forged status tokens and substituted PayPal orders before API calls', async () => {
  let calls = 0
  const handler = createCaptureHandler({ readOrder: async () => browserOrder, configured: () => true, runtimeConfig: testConfig, api: async () => { calls += 1 } })
  assert.equal((await handler(browserRequest({ statusToken: 'forged' }))).status, 404)
  assert.equal((await handler(browserRequest({ paypalOrderId: 'OTHER' }))).status, 422)
  assert.equal(calls, 0)
})

test('approved orders are captured server-side and only a confirmed result is delivered', async () => {
  const calls = []; let delivered = 0
  const paid = confirmed(); paid.purchase_units[0].custom_id = browserOrder.id
  const handler = createCaptureHandler({ readOrder: async () => browserOrder, configured: () => true, runtimeConfig: testConfig,
    api: async (path, options) => { calls.push({ path, options }); return calls.length === 1 ? { status: 'APPROVED' } : paid },
    fulfill: async () => { delivered += 1 },
  })
  assert.equal((await handler(browserRequest())).status, 200)
  assert.equal(calls[1].options.requestId, `${browserOrder.id}-capture`)
  assert.equal(delivered, 1)
})

test('pending/declined captures never deliver, and retries can recover a completed provider order', async () => {
  let delivered = 0
  const paid = confirmed(); paid.purchase_units[0].custom_id = browserOrder.id
  let payload = { status: 'CREATED' }
  const handler = createCaptureHandler({ readOrder: async () => browserOrder, configured: () => true, runtimeConfig: testConfig, api: async () => payload, fulfill: async () => { delivered += 1 } })
  assert.equal((await handler(browserRequest())).status, 409)
  assert.equal(delivered, 0)
  payload = paid
  assert.equal((await handler(browserRequest())).status, 200)
  assert.equal(delivered, 1)
})

function signedFixtureRequest() {
  return new Request('https://aimcodes.com/api/aim-pack/paypal-webhook', { method: 'POST', headers: { 'paypal-transmission-sig': 'fixture-signature', 'paypal-transmission-id': 'fixture', 'paypal-transmission-time': '2026-10-13T02:00:00Z', 'paypal-cert-url': 'https://api.paypal.com/fixture', 'paypal-auth-algo': 'SHA256withRSA' }, body: JSON.stringify({ event_type: 'PAYMENT.CAPTURE.COMPLETED', resource: { id: 'CAPTURE123', supplementary_data: { related_ids: { order_id: order.paypalOrderId } } } }) })
}
test('invalid provider signature is rejected before order lookup or fulfillment', async () => {
  let reads = 0
  const handler = createWebhookHandler({ runtimeConfig: () => ({ ...testConfig(), webhookId: 'fixture' }), configured: () => true, api: async () => ({ verification_status: 'FAILURE' }), readOrder: async () => { reads += 1 } })
  assert.equal((await handler(signedFixtureRequest())).status, 401)
  assert.equal(reads, 0)
})

test('verified notification fetches provider order and validates capture before fulfillment', async () => {
  const paid = confirmed(); paid.purchase_units[0].custom_id = browserOrder.id
  let delivered = 0; let calls = 0
  const handler = createWebhookHandler({ runtimeConfig: () => ({ ...testConfig(), webhookId: 'fixture' }), configured: () => true,
    api: async () => ++calls === 1 ? { verification_status: 'SUCCESS' } : paid,
    readOrder: async key => key.startsWith('paypal-orders/') ? { orderId: browserOrder.id } : browserOrder,
    fulfill: async () => { delivered += 1 },
  })
  assert.equal((await handler(signedFixtureRequest())).status, 200)
  assert.equal(delivered, 1)
})

const { paidStoreName } = await import('../netlify/functions/_lib/store.mjs')
test('sandbox entitlements cannot overwrite production purchases', () => {
  const previous = process.env.PAYPAL_ENVIRONMENT
  try {
    process.env.PAYPAL_ENVIRONMENT = 'sandbox'
    assert.equal(paidStoreName(), 'aimcodes-paid-entitlements-sandbox')
    process.env.PAYPAL_ENVIRONMENT = 'production'
    assert.equal(paidStoreName(), 'aimcodes-paid-entitlements')
  } finally {
    if (previous === undefined) delete process.env.PAYPAL_ENVIRONMENT; else process.env.PAYPAL_ENVIRONMENT = previous
  }
})

const { trackServerPurchase } = await import('../netlify/functions/_lib/analytics.mjs')
test('sandbox purchases never call production GA4', async () => {
  const originalFetch = globalThis.fetch
  let calls = 0
  try {
    globalThis.fetch = async () => { calls += 1; throw new Error('unexpected analytics request') }
    assert.equal(await trackServerPurchase({ order: { environment: 'sandbox' }, paymentId: 'fixture' }), false)
    assert.equal(calls, 0)
  } finally { globalThis.fetch = originalFetch }
})
