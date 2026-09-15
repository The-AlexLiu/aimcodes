import { execFileSync } from 'node:child_process'
import { readFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { crosshairs } from '../src/data/crosshairs.js'
import { generateAimPack } from '../src/utils/paidPack.js'
import { isIndexableRoute, PAID_PAGE_KEYS, routePath } from '../src/seo/routes.js'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const errors = []
const ids = crosshairs.map((item) => item.id)
const knownIds = new Set(ids)

for (const mode of ['ranked', 'deathmatch', 'fun']) {
  for (const visual of ['minimal', 'balanced', 'visible']) {
    for (const weapon of ['rifle', 'sniper', 'closeRange']) {
      for (const version of [1, 2, 3]) {
        const pack = generateAimPack({ average: 241, best: 219, consistency: 24, profile: 'balanced', mode, visual, weapon }, ids, version)
        if (pack.length !== 5) errors.push(`${mode}/${visual}/${weapon}/${version}: pack must contain five slots`)
        if (new Set(pack.map((slot) => slot.role)).size !== 5) errors.push(`${mode}/${visual}/${weapon}/${version}: roles must be unique`)
        if (new Set(pack.map((slot) => slot.crosshairId)).size !== 5) errors.push(`${mode}/${visual}/${weapon}/${version}: crosshairs must be unique`)
        if (pack.some((slot) => !knownIds.has(slot.crosshairId))) errors.push(`${mode}/${visual}/${weapon}/${version}: unknown crosshair returned`)
      }
    }
  }
}

const sitemap = await readFile(resolve(projectRoot, 'dist/sitemap.xml'), 'utf8')
const netlifyConfig = await readFile(resolve(projectRoot, 'netlify.toml'), 'utf8')
if (!netlifyConfig.includes('for = "/api/aim-pack/*"')) errors.push('paid API no-store/noindex header rule missing')
const localeHeaderIndex = netlifyConfig.indexOf('for = "/en/*"')
const privateHeaderIndex = netlifyConfig.indexOf('for = "/*/my-aim-pack/*"')
if (privateHeaderIndex < localeHeaderIndex) errors.push('private no-store headers must follow locale-wide cache headers')

for (const pageKey of PAID_PAGE_KEYS) {
  const route = { type: 'paid', pageKey }
  if (isIndexableRoute(route, 'en')) errors.push(`${pageKey}: private route is indexable`)
  const path = routePath('en', route)
  const html = await readFile(resolve(projectRoot, 'dist', path.slice(1), 'index.html'), 'utf8')
  if (!html.includes('<meta name="robots" content="noindex,nofollow"')) errors.push(`${path}: strict private robots tag missing`)
  if (sitemap.includes(`https://aimcodes.com${path}`)) errors.push(`${path}: private route leaked into sitemap`)
}

process.env.AIMCODES_ACCESS_SECRET = 'test-only-secret-with-at-least-thirty-two-characters'
process.env.WHOP_ENVIRONMENT = 'sandbox'
process.env.WHOP_SANDBOX_ACCOUNT_ID = 'biz_test'
process.env.WHOP_SANDBOX_WEBHOOK_SECRET = 'ws_test-only-webhook-secret'
const { createAccessCookie, readAccessCookie } = await import('../netlify/functions/_lib/security.mjs')
const { whopRuntimeConfig } = await import('../netlify/functions/_lib/whop.mjs')
const testWhop = whopRuntimeConfig()
if (testWhop.baseUrl !== 'https://sandbox-api.whop.com/api/v1') errors.push('sandbox checkout is not using the sandbox API')
if (testWhop.accountId !== 'biz_test') errors.push('sandbox account selection failed')
process.env.WHOP_ENVIRONMENT = 'production'
process.env.WHOP_ACCOUNT_ID = 'biz_live_test'
const liveWhop = whopRuntimeConfig()
if (liveWhop.baseUrl !== undefined || liveWhop.accountId !== 'biz_live_test') errors.push('production Whop selection failed')
process.env.WHOP_ENVIRONMENT = 'sandbox'
const cookie = createAccessCookie('ent_test', 120)
const cookieRequest = new Request('https://aimcodes.com/api/aim-pack/entitlement', { headers: { cookie: `aimcodes_pack=${cookie}` } })
if (readAccessCookie(cookieRequest) !== 'ent_test') errors.push('signed access cookie could not be read')
const tamperedRequest = new Request('https://aimcodes.com/api/aim-pack/entitlement', { headers: { cookie: `aimcodes_pack=${cookie}x` } })
if (readAccessCookie(tamperedRequest) !== null) errors.push('tampered access cookie was accepted')

const checkout = (await import('../netlify/functions/aim-pack-create-checkout.mjs')).default
const forbidden = await checkout(new Request('https://aimcodes.com/api/aim-pack/create-checkout', { method: 'POST', body: '{}' }))
if (forbidden.status !== 403) errors.push('checkout route did not reject a cross-origin/absent-origin request')
const webhook = (await import('../netlify/functions/aim-pack-whop-webhook.mjs')).default
const { acceptedPayment } = await import('../netlify/functions/aim-pack-whop-webhook.mjs')
const unsigned = await webhook(new Request('https://aimcodes.com/api/aim-pack/whop-webhook', { method: 'POST', body: '{}' }))
if (unsigned.status !== 401) errors.push('webhook route did not reject an unsigned payload')
delete process.env.RESEND_API_KEY
const recover = (await import('../netlify/functions/aim-pack-recover.mjs')).default
const unavailableRecovery = await recover(new Request('https://aimcodes.com/api/aim-pack/recover', { method: 'POST', headers: { Origin: 'https://aimcodes.com', 'Content-Type': 'application/json' }, body: JSON.stringify({ email: 'buyer@example.com', locale: 'en' }) }))
const unavailableRecoveryPayload = await unavailableRecovery.json()
if (unavailableRecovery.status !== 200 || unavailableRecoveryPayload.deliveryAvailable !== false) errors.push('recovery route did not expose the receipt-support fallback when email delivery is unavailable')
const order = { amount: 1.99, currency: 'usd', checkoutConfigurationId: 'ch_test', planId: 'plan_test' }
const payment = { id: 'pay_test', account_id: 'biz_test', status: 'paid', currency: 'usd', subtotal: { amount: '1.99', currency: 'usd' }, checkout_configuration_id: 'ch_test', plan_id: 'plan_test' }
if (!acceptedPayment({ type: 'payment.succeeded' }, payment, order, { accountId: 'biz_test' })) errors.push('valid Whop v1 Money payment was rejected')
if (acceptedPayment({ type: 'payment.succeeded' }, { ...payment, subtotal: { amount: '2.99', currency: 'usd' } }, order, { accountId: 'biz_test' })) errors.push('wrong Whop amount was accepted')
if (acceptedPayment({ type: 'payment.succeeded' }, { ...payment, account_id: 'biz_other' }, order, { accountId: 'biz_test' })) errors.push('wrong Whop account was accepted')
const localizedPayment = { ...payment, currency: 'eur', subtotal: { amount: '1.79', currency: 'eur' }, usd_total: { amount: '1.99', currency: 'usd' } }
if (!acceptedPayment({ type: 'payment.succeeded' }, localizedPayment, order, { accountId: 'biz_test' })) errors.push('valid adaptive-pricing payment was rejected')

const diff = execFileSync('git', ['diff', '--', '.'], { cwd: projectRoot, encoding: 'utf8' })
const credentialPatterns = [/(?:sk|ws|whsec|re)_[A-Za-z0-9_-]{20,}/, /AIza[A-Za-z0-9_-]{30,}/, /-----BEGIN (?:RSA |EC )?PRIVATE KEY-----/]
if (credentialPatterns.some((pattern) => pattern.test(diff))) errors.push('a value resembling a real credential exists in the working diff')

if (errors.length) {
  console.error(`Paid MVP validation failed:\n- ${errors.join('\n- ')}`)
  process.exit(1)
}
console.log('Paid MVP validation passed: deterministic 5-slot packs, private-route noindex, signed cookies, origin guard, webhook signature rejection, recovery fallback, and secret scan.')
