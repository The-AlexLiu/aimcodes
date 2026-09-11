import { getReactionRank, isValidReactionTime, REACTION_ROUNDS } from './reactionRecommendation.js'

export const AIM_PROFILE_STORAGE_KEY = 'aimcodes-aim-profile-v1'
export const AIM_PROFILE_HISTORY_LIMIT = 50

function normalizeAttempt(attempt) {
  if (!attempt || typeof attempt !== 'object') return null
  const rounds = Array.isArray(attempt.rounds)
    ? attempt.rounds.map(Number).filter(isValidReactionTime)
    : []
  const average = Number(attempt.average)
  const consistency = Number(attempt.consistency)
  const best = Number(attempt.best)
  const completedAt = new Date(attempt.completedAt)

  if (
    rounds.length !== REACTION_ROUNDS
    || !isValidReactionTime(average)
    || !isValidReactionTime(best)
    || !Number.isFinite(consistency)
    || consistency < 0
    || Number.isNaN(completedAt.getTime())
  ) return null

  return {
    id: typeof attempt.id === 'string' && attempt.id ? attempt.id.slice(0, 80) : `saved-${completedAt.getTime()}`,
    completedAt: completedAt.toISOString(),
    rounds,
    average: Math.round(average),
    consistency: Math.round(consistency),
    best: Math.round(best),
    earlyClicks: Math.max(0, Math.round(Number(attempt.earlyClicks) || 0)),
    rankId: getReactionRank(average).id,
    recommendationId: typeof attempt.recommendationId === 'string' ? attempt.recommendationId.slice(0, 80) : '',
    inputType: ['mouse', 'touch', 'pen', 'keyboard'].includes(attempt.inputType) ? attempt.inputType : 'unknown',
  }
}

export function sanitizeAimProfileHistory(value) {
  if (!Array.isArray(value)) return []
  const seen = new Set()
  return value
    .map(normalizeAttempt)
    .filter((attempt) => {
      if (!attempt || seen.has(attempt.id)) return false
      seen.add(attempt.id)
      return true
    })
    .sort((left, right) => new Date(left.completedAt) - new Date(right.completedAt))
    .slice(-AIM_PROFILE_HISTORY_LIMIT)
}

function resolveStorage(storage) {
  if (storage) return storage
  try {
    return typeof window !== 'undefined' ? window.localStorage : null
  } catch {
    return null
  }
}

export function readAimProfileHistory(storage) {
  const targetStorage = resolveStorage(storage)
  if (!targetStorage) return []
  try {
    return sanitizeAimProfileHistory(JSON.parse(targetStorage.getItem(AIM_PROFILE_STORAGE_KEY) || '[]'))
  } catch {
    return []
  }
}

export function saveAimProfileHistory(history, storage) {
  const nextHistory = sanitizeAimProfileHistory(history)
  const targetStorage = resolveStorage(storage)
  if (!targetStorage) return nextHistory
  try {
    targetStorage.setItem(AIM_PROFILE_STORAGE_KEY, JSON.stringify(nextHistory))
  } catch {
    // Storage can be unavailable in private or restricted browsing modes.
  }
  return nextHistory
}

export function clearAimProfileHistory(storage) {
  const targetStorage = resolveStorage(storage)
  if (!targetStorage) return
  try {
    targetStorage.removeItem(AIM_PROFILE_STORAGE_KEY)
  } catch {
    // The UI still clears its in-memory state when storage is unavailable.
  }
}

export function createAimProfileAttempt(result, rounds, id, completedAt = new Date().toISOString(), inputType = 'unknown') {
  return normalizeAttempt({
    id,
    completedAt,
    rounds,
    average: result.average,
    consistency: result.consistency,
    best: result.best,
    earlyClicks: result.earlyClicks,
    rankId: result.rank?.id,
    recommendationId: result.id,
    inputType,
  })
}

function mean(values) {
  if (!values.length) return 0
  return values.reduce((total, value) => total + value, 0) / values.length
}

export function summarizeAimProfile(value) {
  const history = sanitizeAimProfileHistory(value)
  if (!history.length) return null

  const current = history.at(-1)
  const recent = history.slice(-7)
  const latestWindow = history.slice(-3)
  const previousWindow = history.slice(-6, -3)
  const trendDifference = previousWindow.length
    ? Math.round(mean(previousWindow.map((attempt) => attempt.average)) - mean(latestWindow.map((attempt) => attempt.average)))
    : 0

  return {
    history,
    current,
    recent,
    totalAttempts: history.length,
    personalBest: Math.min(...history.map((attempt) => attempt.best)),
    overallAverage: Math.round(mean(history.map((attempt) => attempt.average))),
    recentAverage: Math.round(mean(recent.map((attempt) => attempt.average))),
    averageConsistency: Math.round(mean(history.map((attempt) => attempt.consistency))),
    trendDifference,
    hasTrendBaseline: previousWindow.length === 3,
    previousAverage: history.length > 1 ? history.at(-2).average : null,
    latestDifference: history.length > 1 ? history.at(-2).average - current.average : 0,
    rank: getReactionRank(current.average),
  }
}
