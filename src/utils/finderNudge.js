const NUDGE_STATE_KEY = 'aimcodes-finder-nudge-v1'
const NUDGE_SESSION_KEY = 'aimcodes-finder-nudge-session-v1'
const FINDER_ENTRY_KEY = 'aimcodes-finder-entry-v1'
const DISMISSAL_WINDOW_MS = 14 * 24 * 60 * 60 * 1000
const CLICK_WINDOW_MS = 30 * 24 * 60 * 60 * 1000
const ENTRY_WINDOW_MS = 2 * 60 * 60 * 1000

function readJson(storage, key, fallback) {
  try {
    return JSON.parse(storage.getItem(key) || '') || fallback
  } catch {
    return fallback
  }
}

function writeJson(storage, key, value) {
  try {
    storage.setItem(key, JSON.stringify(value))
  } catch {
    // The rest of the product remains usable when browser storage is blocked.
  }
}

export function shouldShowFinderNudge() {
  if (typeof window === 'undefined') return false
  const now = Date.now()
  const state = readJson(window.localStorage, NUDGE_STATE_KEY, {})
  const session = readJson(window.sessionStorage, NUDGE_SESSION_KEY, {})
  return !session.shown && Number(state.dismissed_until || 0) <= now && Number(state.clicked_until || 0) <= now
}

export function markFinderNudgeShown() {
  if (typeof window === 'undefined') return
  writeJson(window.sessionStorage, NUDGE_SESSION_KEY, { shown: true })
}

export function dismissFinderNudge() {
  if (typeof window === 'undefined') return
  writeJson(window.localStorage, NUDGE_STATE_KEY, { dismissed_until: Date.now() + DISMISSAL_WINDOW_MS })
}

export function recordFinderNudgeEntry({ pageType, trigger }) {
  if (typeof window === 'undefined') return
  writeJson(window.localStorage, NUDGE_STATE_KEY, { clicked_until: Date.now() + CLICK_WINDOW_MS })
  writeJson(window.sessionStorage, FINDER_ENTRY_KEY, {
    entry: 'nudge',
    page_type: pageType,
    trigger,
    recorded_at: Date.now(),
  })
}

export function readFinderEntry() {
  if (typeof window === 'undefined') return 'direct'
  const entry = readJson(window.sessionStorage, FINDER_ENTRY_KEY, {})
  if (entry.entry !== 'nudge' || Date.now() - Number(entry.recorded_at || 0) > ENTRY_WINDOW_MS) return 'direct'
  return 'nudge'
}

export function readFinderEntryPageType() {
  if (typeof window === 'undefined') return ''
  const entry = readJson(window.sessionStorage, FINDER_ENTRY_KEY, {})
  if (entry.entry !== 'nudge' || Date.now() - Number(entry.recorded_at || 0) > ENTRY_WINDOW_MS) return ''
  return typeof entry.page_type === 'string' ? entry.page_type : ''
}
