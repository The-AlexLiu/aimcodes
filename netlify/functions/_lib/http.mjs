const securityHeaders = {
  'Cache-Control': 'no-store, max-age=0',
  'Content-Type': 'application/json; charset=utf-8',
  'X-Content-Type-Options': 'nosniff',
  'X-Robots-Tag': 'noindex, nofollow',
}

export function json(status, body, headers = {}) {
  return new Response(JSON.stringify(body), { status, headers: { ...securityHeaders, ...headers } })
}

export async function readJson(request, maxBytes = 16_384) {
  const declaredLength = Number(request.headers.get('content-length') || 0)
  if (declaredLength > maxBytes) throw new Error('payload_too_large')
  const raw = await request.text()
  if (new TextEncoder().encode(raw).length > maxBytes) throw new Error('payload_too_large')
  return JSON.parse(raw || '{}')
}

export function requireSameOrigin(request) {
  const origin = request.headers.get('origin')
  if (!origin) return false
  const requestUrl = new URL(request.url)
  const allowed = new Set([requestUrl.origin, process.env.URL, process.env.DEPLOY_PRIME_URL].filter(Boolean))
  return allowed.has(origin)
}

export function safeLocale(value) {
  const normalized = String(value || 'en').toLowerCase()
  return ['en', 'ja', 'es', 'zh-cn', 'pt-br'].includes(normalized) ? normalized : 'en'
}

export function siteOrigin(request) {
  // Netlify build variables (URL/CONTEXT/DEPLOY_PRIME_URL) are not reliable
  // request-domain metadata in Functions. Bind redirects and email links to
  // the host that actually served this request, including PR previews.
  return new URL(request.url).origin
}
