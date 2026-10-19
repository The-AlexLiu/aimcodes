import { storeContext } from './store-context.mjs'
import { getStore } from '@netlify/blobs'

export function paidStoreName() {
  return process.env.PAYPAL_ENVIRONMENT === 'production'
    ? 'aimcodes-paid-entitlements'
    : 'aimcodes-paid-entitlements-sandbox'
}

export function paidStore() {
  if (storeContext.getStore()) return storeContext.getStore()
  return getStore({ name: paidStoreName(), consistency: 'strong' })
}

export async function getJson(key) {
  return paidStore().get(key, { type: 'json' })
}

export async function setJson(key, value) {
  return paidStore().setJSON(key, value)
}
