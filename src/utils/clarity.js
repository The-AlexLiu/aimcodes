export const CLARITY_PROJECT_ID = 'yuxaq5sl26'

const LIVE_HOSTS = new Set(['aimcodes.com', 'www.aimcodes.com'])
const QA_STORAGE_KEY = 'aimcodes-analytics-qa-v1'
const EXCLUSION_STORAGE_KEY = 'aimcodes-analytics-excluded-v1'

// Keep recordings out of previews, QA sessions, and opted-out browsers.
// These storage keys intentionally match GA4's existing exclusion contract.
function recordingAllowed() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return false
  if (!LIVE_HOSTS.has(window.location.hostname.toLowerCase())) return false

  const parameters = new URLSearchParams(window.location.search)
  // Delivery/recovery pages can contain purchase access links and personal data.
  if (/\/(?:my-aim-pack|recover-aim-pack)(?:\/|$)/i.test(window.location.pathname)) return false
  if ([...parameters.keys()].some((key) => /^(?:token|access_token|email|order_id|session_id|checkout_id)$/i.test(key))) return false
  let excluded = parameters.get('analytics_optout') === '1'
  let qa = parameters.get('qa') === '1'
  try {
    if (qa) window.sessionStorage.setItem(QA_STORAGE_KEY, '1')
    else if (parameters.get('qa') === '0') window.sessionStorage.removeItem(QA_STORAGE_KEY)
    qa = window.sessionStorage.getItem(QA_STORAGE_KEY) === '1'
    if (excluded) window.localStorage.setItem(EXCLUSION_STORAGE_KEY, '1')
    else if (parameters.get('analytics_optin') === '1') window.localStorage.removeItem(EXCLUSION_STORAGE_KEY)
    excluded = window.localStorage.getItem(EXCLUSION_STORAGE_KEY) === '1'
  } catch {
    // If stored preferences cannot be checked, avoid recording this visit.
    return false
  }
  if (qa || excluded || window.__aimcodesQaMode) return false
  return true
}

export function initializeClarity() {
  if (!recordingAllowed()) return false
  if (document.querySelector('script[data-aimcodes-clarity]')) return true

  window.clarity = window.clarity || function clarity() {
    (window.clarity.q = window.clarity.q || []).push(arguments)
  }
  // No CMP is installed yet. Never infer or fabricate a visitor's consent.
  window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: 'denied' })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`
  script.dataset.aimcodesClarity = CLARITY_PROJECT_ID
  document.head.appendChild(script)
  return true
}

const BUSINESS_EVENTS = new Set(['crosshair_code_copy', 'finder_start', 'finder_complete', 'playbook_export'])
const LANGUAGES = new Set(['en', 'es', 'pt-BR', 'zh-CN', 'ja'])
const PAGE_TYPES = new Set(['home', 'catalog', 'collection', 'crosshair', 'finder', 'tool', 'guide', 'article'])

// Reuse real GA4 success branches, but never forward their free-form payloads.
// This gate is independent of GA4 and remains active after SPA navigation.
export function trackClarityEvent(eventName, context = {}) {
  if (!BUSINESS_EVENTS.has(eventName)) return false
  if (eventName === 'playbook_export' && !(Number.isInteger(context.element_count) && context.element_count > 0)) return false
  if (!recordingAllowed() || typeof window.clarity !== 'function') return false
  try {
    window.clarity('set', 'measurement_version', 'success_v1')
    if (LANGUAGES.has(context.app_language)) window.clarity('set', 'app_language', context.app_language)
    if (PAGE_TYPES.has(context.page_type)) window.clarity('set', 'page_type', context.page_type)
    window.clarity('event', eventName)
    return true
  } catch {
    // Blocked or broken telemetry must not turn a successful action into failure.
    return false
  }
}
