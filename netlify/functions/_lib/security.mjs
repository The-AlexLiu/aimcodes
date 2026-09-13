import { createHash, createHmac, randomBytes, timingSafeEqual } from 'node:crypto'

export function randomToken(bytes = 32) {
  return randomBytes(bytes).toString('base64url')
}

export function sha256(value) {
  return createHash('sha256').update(String(value)).digest('hex')
}

export function hmac(value, secret = process.env.AIMCODES_ACCESS_SECRET) {
  if (!secret || secret.length < 32) throw new Error('access_secret_missing')
  return createHmac('sha256', secret).update(String(value)).digest('base64url')
}

export function stablePrivateId(prefix, value) {
  return `${prefix}_${hmac(value).slice(0, 24)}`
}

export function normalizeEmail(value) {
  const email = String(value || '').trim().toLowerCase()
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : ''
}

export function safeEqual(left, right) {
  const a = Buffer.from(String(left || ''))
  const b = Buffer.from(String(right || ''))
  return a.length === b.length && timingSafeEqual(a, b)
}

export function createAccessCookie(entitlementId, maxAgeSeconds = 31_536_000) {
  const expires = Math.floor(Date.now() / 1000) + maxAgeSeconds
  const payload = `${entitlementId}.${expires}`
  return `${payload}.${hmac(payload)}`
}

export function readAccessCookie(request) {
  const cookie = request.headers.get('cookie') || ''
  const value = cookie.split(';').map((entry) => entry.trim()).find((entry) => entry.startsWith('aimcodes_pack='))?.slice('aimcodes_pack='.length)
  if (!value) return null
  const [entitlementId, expiresText, signature] = value.split('.')
  const expires = Number(expiresText)
  if (!entitlementId || !Number.isInteger(expires) || expires <= Math.floor(Date.now() / 1000)) return null
  return safeEqual(signature, hmac(`${entitlementId}.${expires}`)) ? entitlementId : null
}

export function accessCookieHeader(value, maxAgeSeconds = 31_536_000) {
  return `aimcodes_pack=${value}; Path=/; Max-Age=${maxAgeSeconds}; HttpOnly; Secure; SameSite=Lax`
}
