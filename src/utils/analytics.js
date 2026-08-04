export const GA_MEASUREMENT_ID = 'G-2VMCECN5S6'

const LIVE_HOSTS = new Set(['aimcodes.com', 'www.aimcodes.com'])
const MAX_PARAMETER_LENGTH = 100
const PARAMETER_LENGTH_OVERRIDES = {
  page_location: 1000,
  page_referrer: 420,
  page_title: 300,
}

let analyticsContext = {}
let lastPageView = ''

function hasWindow() {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

function debugModeEnabled() {
  if (!hasWindow()) return false
  return new URLSearchParams(window.location.search).get('ga_debug') === '1'
}

function analyticsEnabled() {
  if (!hasWindow()) return false
  return LIVE_HOSTS.has(window.location.hostname.toLowerCase()) || debugModeEnabled()
}

function sanitizeValue(value, key) {
  if (typeof value === 'string') return value.slice(0, PARAMETER_LENGTH_OVERRIDES[key] || MAX_PARAMETER_LENGTH)
  if (typeof value === 'number') return Number.isFinite(value) ? value : undefined
  if (typeof value === 'boolean') return value
  return undefined
}

function sanitizeParameters(parameters = {}) {
  return Object.fromEntries(
    Object.entries(parameters)
      .map(([key, value]) => [key, sanitizeValue(value, key)])
      .filter(([, value]) => value !== undefined),
  )
}

function ensureGoogleTag() {
  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function gtag() {
    window.dataLayer.push(arguments)
  }

  if (!document.querySelector(`script[data-aimcodes-ga="${GA_MEASUREMENT_ID}"]`)) {
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    script.dataset.aimcodesGa = GA_MEASUREMENT_ID
    document.head.appendChild(script)
  }
}

export function initializeAnalytics() {
  if (!analyticsEnabled()) return false
  if (window.__aimcodesGaInitialized) return true

  ensureGoogleTag()
  window.gtag('js', new Date())
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false,
    debug_mode: debugModeEnabled(),
  })
  window.__aimcodesGaInitialized = true
  window.__aimcodesGa = {
    measurementId: GA_MEASUREMENT_ID,
    enabled: true,
    debug: debugModeEnabled(),
  }
  return true
}

export function setAnalyticsContext(nextContext = {}) {
  analyticsContext = {
    ...analyticsContext,
    ...sanitizeParameters(nextContext),
  }
}

export function trackEvent(eventName, parameters = {}) {
  if (!/^[a-z][a-z0-9_]{0,39}$/.test(eventName)) return false
  if (!initializeAnalytics()) return false

  const eventParameters = sanitizeParameters({
    ...analyticsContext,
    ...parameters,
  })
  window.gtag('event', eventName, eventParameters)

  if (debugModeEnabled()) {
    window.__aimcodesGaDebugEvents = window.__aimcodesGaDebugEvents || []
    window.__aimcodesGaDebugEvents.push({ event: eventName, parameters: eventParameters })
  }
  return true
}

export function trackPageView(viewName, pageTitle) {
  if (!hasWindow() || lastPageView === viewName) return false

  const virtualLocation = new URL(window.location.href)
  virtualLocation.hash = viewName === 'finder' ? 'finder' : 'explore'
  const tracked = trackEvent('page_view', {
    page_title: pageTitle,
    page_location: virtualLocation.href,
    app_view: viewName,
  })
  if (tracked) lastPageView = viewName
  return tracked
}
