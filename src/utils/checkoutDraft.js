import { AIM_PACK_MODES, AIM_PACK_VISUALS, AIM_PACK_WEAPONS } from './paidPack.js'
import { getReactionRecommendation, isValidReactionTime, REACTION_CALIBRATION_VERSION } from './reactionRecommendation.js'

const KEY = 'aimcodes-checkout-draft-v1'
const MAX_AGE = 2 * 60 * 60 * 1000

// Only non-sensitive choices and rounds are kept. Email and payment credentials
// remain outside this draft; unavailable storage must never break the UI.
export function readCheckoutDraft(storage, now = Date.now()) {
  try {
    storage ??= globalThis.sessionStorage
    const value = JSON.parse(storage.getItem(KEY) || 'null')
    if (!value || !Number.isFinite(value.savedAt) || value.calibration !== REACTION_CALIBRATION_VERSION || now - value.savedAt > MAX_AGE || value.savedAt > now) return null
    if (!Array.isArray(value.rounds) || value.rounds.length !== 3 || !value.rounds.every(isValidReactionTime)) return null
    const preferences = value.preferences || {}
    return { buyNew: value.buyNew === true, rounds: value.rounds, earlyClicks: Math.min(100, Math.max(0, Number.isFinite(value.earlyClicks) ? value.earlyClicks : 0)), preferences: { mode: AIM_PACK_MODES.includes(preferences.mode) ? preferences.mode : 'ranked', visual: AIM_PACK_VISUALS.includes(preferences.visual) ? preferences.visual : 'balanced', weapon: AIM_PACK_WEAPONS.includes(preferences.weapon) ? preferences.weapon : 'rifle' }, step: value.step === 'preferences' ? 'preferences' : 'offer', result: getReactionRecommendation(value.rounds, Math.min(100, Math.max(0, Number.isFinite(value.earlyClicks) ? value.earlyClicks : 0))) }
  } catch { return null }
}

export function saveCheckoutDraft(patch, storage, now = Date.now()) {
  try {
    storage ??= globalThis.sessionStorage
    const previous = readCheckoutDraft(storage, now)
    const rounds = patch.rounds || previous?.rounds
    if (!rounds) return
    const preferences = patch.preferences || previous?.preferences || {}
    storage.setItem(KEY, JSON.stringify({ calibration: REACTION_CALIBRATION_VERSION, savedAt: now, buyNew: patch.buyNew ?? previous?.buyNew ?? false, rounds, earlyClicks: patch.earlyClicks ?? previous?.earlyClicks ?? 0, step: patch.step || previous?.step || 'offer', preferences: { mode: preferences.mode, visual: preferences.visual, weapon: preferences.weapon } }))
  } catch { /* Private browsing can deny storage. */ }
}

export function clearCheckoutDraft(storage) {
  try { (storage || globalThis.sessionStorage).removeItem(KEY) } catch { /* Optional draft. */ }
}
