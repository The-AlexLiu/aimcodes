import { getStore } from '@netlify/blobs'

export function paidStore() {
  return getStore('aimcodes-paid-entitlements')
}

export async function getJson(key) {
  return paidStore().get(key, { type: 'json' })
}

export async function setJson(key, value) {
  return paidStore().setJSON(key, value)
}
