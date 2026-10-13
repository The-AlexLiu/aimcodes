// No browser SDK or secret is shipped to the client. Preview always uses sandbox.
export function paypalRuntimeConfig() {
  const environment = process.env.PAYPAL_ENVIRONMENT === 'production' ? 'production' : 'sandbox'
  if (environment === 'production' && process.env.CONTEXT && process.env.CONTEXT !== 'production') throw new Error('live_payments_in_preview')
  const prefix = environment === 'production' ? 'PAYPAL_' : 'PAYPAL_SANDBOX_'
  return {
    environment,
    baseUrl: environment === 'production' ? 'https://api-m.paypal.com' : 'https://api-m.sandbox.paypal.com',
    clientId: process.env[`${prefix}CLIENT_ID`],
    clientSecret: process.env[`${prefix}CLIENT_SECRET`],
    merchantId: process.env[`${prefix}MERCHANT_ID`],
    webhookId: process.env[`${prefix}WEBHOOK_ID`],
  }
}

export function paypalConfigured(config) {
  return Boolean(config.clientId && config.clientSecret && (config.environment === 'sandbox' || config.merchantId) && config.webhookId && process.env.AIMCODES_ACCESS_SECRET?.length >= 32)
}

export async function paypalRequest(path, { method = 'GET', body, requestId } = {}, config = paypalRuntimeConfig(), fetcher = fetch) {
  if (!config.clientId || !config.clientSecret) throw new Error('paypal_not_configured')
  const authResponse = await fetcher(`${config.baseUrl}/v1/oauth2/token`, {
    method: 'POST',
    headers: { Authorization: `Basic ${Buffer.from(`${config.clientId}:${config.clientSecret}`).toString('base64')}`, 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials', signal: AbortSignal.timeout(8000),
  })
  const auth = await authResponse.json()
  if (!authResponse.ok || !auth.access_token) throw new Error('paypal_auth_failed')
  const response = await fetcher(`${config.baseUrl}${path}`, {
    method,
    headers: { Authorization: `Bearer ${auth.access_token}`, 'Content-Type': 'application/json', Prefer: 'return=representation', ...(requestId ? { 'PayPal-Request-Id': requestId } : {}) },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}), signal: AbortSignal.timeout(12000),
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(`paypal_http_${response.status}`)
  return payload
}

export function paypalOrderBody(order, origin) {
  const returnUrl = `${origin}/${order.locale}/checkout/complete/`
  return {
    intent: 'CAPTURE',
    purchase_units: [{ reference_id: order.id, custom_id: order.id, invoice_id: order.id,
      ...(order.merchantId ? { payee: { merchant_id: order.merchantId } } : {}),
      amount: { currency_code: 'USD', value: '1.99', breakdown: { item_total: { currency_code: 'USD', value: '1.99' } } },
      items: [{ name: 'AimCodes Crosshair Pack', quantity: '1', category: 'DIGITAL_GOODS', unit_amount: { currency_code: 'USD', value: '1.99' } }],
    }],
    payment_source: { paypal: { experience_context: { brand_name: 'AimCodes', shipping_preference: 'NO_SHIPPING', user_action: 'PAY_NOW', return_url: returnUrl, cancel_url: `${returnUrl}?cancelled=1` } } },
  }
}

export function approvedUrl(payload, environment) {
  const href = payload.links?.find(link => ['payer-action', 'approve'].includes(link.rel))?.href
  try {
    const url = new URL(href)
    const hosts = environment === 'production' ? ['www.paypal.com', 'paypal.com'] : ['www.sandbox.paypal.com', 'sandbox.paypal.com']
    return url.protocol === 'https:' && hosts.includes(url.hostname) && !url.username && !url.password ? url.href : null
  } catch { return null }
}

// Cross-check both the provider order and capture, never trust the return URL.
export function completedCapture(payload, order) {
  if (payload.id !== order.paypalOrderId || payload.status !== 'COMPLETED' || payload.purchase_units?.length !== 1) return null
  const unit = payload.purchase_units[0]
  if (unit.custom_id !== order.id || unit.payee?.merchant_id !== order.merchantId || unit.amount?.currency_code !== 'USD' || unit.amount?.value !== '1.99') return null
  const captures = unit.payments?.captures
  if (captures?.length !== 1) return null
  const capture = captures[0]
  return capture.id && capture.status === 'COMPLETED' && capture.amount?.currency_code === 'USD' && capture.amount?.value === '1.99' ? capture : null
}

export function webhookVerificationBody(request, event, webhookId) {
  const fields = { auth_algo: 'paypal-auth-algo', cert_url: 'paypal-cert-url', transmission_id: 'paypal-transmission-id', transmission_sig: 'paypal-transmission-sig', transmission_time: 'paypal-transmission-time' }
  const body = { webhook_id: webhookId, webhook_event: event }
  for (const [key, header] of Object.entries(fields)) {
    const value = request.headers.get(header)
    if (!value || !webhookId) return null
    body[key] = value
  }
  return body
}
