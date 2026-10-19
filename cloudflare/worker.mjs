import { createD1Store } from './store.mjs'
import { storeContext } from '../netlify/functions/_lib/store-context.mjs'
const handlers = {
  entitlement: () => import('../netlify/functions/aim-pack-entitlement.mjs'),
  claim: () => import('../netlify/functions/aim-pack-claim.mjs'),
  'paypal-webhook': () => import('../netlify/functions/aim-pack-paypal-webhook.mjs'),
  'paypal-capture': () => import('../netlify/functions/aim-pack-paypal-capture.mjs'),
  'create-checkout': () => import('../netlify/functions/aim-pack-create-checkout.mjs'),
  recover: () => import('../netlify/functions/aim-pack-recover.mjs'),
  status: () => import('../netlify/functions/aim-pack-status.mjs'),
  regenerate: () => import('../netlify/functions/aim-pack-regenerate.mjs'),
}
const liveHosts = new Set(['aimcodes.com', 'www.aimcodes.com'])
export function preferredLocale(header = '') {
  const languages = header.split(',').map((entry, i) => {
    const [language, weight] = entry.trim().toLowerCase().split(';q=')
    return { language, weight: weight === undefined ? 1 : Number(weight), i }
  }).filter(item => item.weight > 0).sort((a, b) => b.weight - a.weight || a.i - b.i)
  for (const { language } of languages) {
    const base = language.split('-')[0]
    if (base === 'zh') return 'zh-cn'
    if (base === 'pt') return 'pt-br'
    if (['en', 'es', 'ja'].includes(base)) return base
  }
  return 'en'
}
function decorate(response, request) {
  const out = new Response(response.body, response)
  const url = new URL(request.url)
  out.headers.set('X-Content-Type-Options', 'nosniff')
  out.headers.set('X-Frame-Options', 'SAMEORIGIN')
  out.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  out.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  if (!liveHosts.has(url.hostname)) out.headers.set('X-Robots-Tag', 'noindex, nofollow')
  if (/^\/api\/|\/(my-aim-pack|checkout\/complete|recover-aim-pack)(\/|$)/.test(url.pathname)) {
    out.headers.set('Cache-Control', 'private, no-store, max-age=0')
    out.headers.set('X-Robots-Tag', 'noindex, nofollow')
  }
  return out
}
export default {
  async fetch(request, env) {
    const url = new URL(request.url)
    const path = url.pathname
    const redirect = (target, code) => {
      url.pathname = target
      return decorate(Response.redirect(url.href, code), request)
    }
    if (url.hostname === 'www.aimcodes.com') {
      url.hostname = 'aimcodes.com'
      return decorate(Response.redirect(url.href, 301), request)
    }
    if (path === '/') {
      const result = redirect(`/${preferredLocale(request.headers.get('Accept-Language') || '')}/`, 302)
      result.headers.set('Vary', 'Accept-Language')
      result.headers.set('Cache-Control', 'no-store')
      return result
    }
    if (path === '/zh/' || path === '/pt/') return redirect(path === '/zh/' ? '/zh-cn/' : '/pt-br/', 301)
    const legacy = path.match(/^\/(en|ja|es|pt-br|zh-cn)\/(meme-crosshairs|pro-players|pro-player-crosshairs)\/?$/)
    if (legacy) return redirect(`/${legacy[1]}/${legacy[2] === 'meme-crosshairs' ? 'funny-crosshairs' : 'crosshairs'}/`, 301)
    if (path.startsWith('/api/')) {
      // Never expose unconfigured payment handlers or connect previews to Live data.
      const handler = handlers[path.replace('/api/aim-pack/', '')]
      if (!handler) return decorate(new Response('{"code":"not_found"}', { status: 404 }), request)
      if (env.PAYMENTS_READY !== 'true' || !env.PAID_DB || !liveHosts.has(url.hostname) && env.PAYPAL_ENVIRONMENT === 'production') {
        return decorate(new Response('{"code":"migration_not_ready"}', { status: 503, headers: { 'Content-Type': 'application/json' } }), request)
      }
      try {
        return decorate(await storeContext.run(createD1Store(env.PAID_DB), async () => (await handler()).default(request)), request)
      } catch {
        return decorate(new Response('{"code":"temporarily_unavailable"}', { status: 503, headers: { 'Content-Type': 'application/json' } }), request)
      }
    }
    const result = decorate(await env.ASSETS.fetch(request), request)
    if (result.status === 200 && !result.headers.get('Cache-Control')?.includes('private') && /text\/html/.test(result.headers.get('Content-Type') || '')) result.headers.set('Cache-Control', 'public, max-age=0, must-revalidate')
    return result
  },
}
