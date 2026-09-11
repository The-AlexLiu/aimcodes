export const REACTION_ROUNDS = 3
export const MIN_REACTION_MS = 100
export const MAX_REACTION_MS = 2000
export const REACTION_CALIBRATION_VERSION = 'browser-v3'

export function isValidReactionTime(value) {
  return Number.isFinite(value) && value >= MIN_REACTION_MS && value <= MAX_REACTION_MS
}

// Product-defined reaction tiers. They borrow VALORANT's rank language for
// familiarity, but describe only this browser reaction test—not a player rank.
export const REACTION_RANKS = [
  { id: 'radiant', min: 0, max: 170, color: '#fff0b8' },
  { id: 'immortal', min: 171, max: 200, color: '#ee648f' },
  { id: 'ascendant', min: 201, max: 230, color: '#78d18a' },
  { id: 'diamond', min: 231, max: 260, color: '#83b7ff' },
  { id: 'platinum', min: 261, max: 300, color: '#57d1c2' },
  { id: 'gold', min: 301, max: 350, color: '#e6bd53' },
  { id: 'silver', min: 351, max: 410, color: '#b7c4ce' },
  { id: 'bronze', min: 411, max: 500, color: '#c17a52' },
  { id: 'iron', min: 501, max: Number.POSITIVE_INFINITY, color: '#818b94' },
]

const recommendationProfiles = {
  precision: 'aspas-dot',
  balanced: 'tenz',
  steady: 'jinggg',
  visibility: 'boaster',
}

export function calculateReactionStats(rounds, earlyClicks = 0) {
  const validRounds = rounds.filter(isValidReactionTime)
  if (!validRounds.length) {
    return { average: 0, consistency: 0, best: 0, worst: 0, earlyClicks }
  }

  const average = validRounds.reduce((total, value) => total + value, 0) / validRounds.length
  const variance = validRounds.reduce((total, value) => total + ((value - average) ** 2), 0) / validRounds.length

  return {
    average: Math.round(average),
    consistency: Math.round(Math.sqrt(variance)),
    best: Math.min(...validRounds),
    worst: Math.max(...validRounds),
    earlyClicks,
  }
}

export function getReactionRank(average) {
  const safeAverage = Number.isFinite(average) ? Math.max(0, average) : Number.POSITIVE_INFINITY
  return REACTION_RANKS.find((rank) => safeAverage <= rank.max) || REACTION_RANKS.at(-1)
}

export function getReactionRecommendation(rounds, earlyClicks = 0) {
  const stats = calculateReactionStats(rounds, earlyClicks)
  let profile = 'balanced'

  if (earlyClicks >= 2 || stats.consistency >= 70 || stats.average > 380) {
    profile = 'visibility'
  } else if (earlyClicks === 0 && stats.average < 205 && stats.consistency < 35) {
    profile = 'precision'
  } else if (earlyClicks > 0 || stats.average > 300 || stats.consistency > 45) {
    profile = 'steady'
  }

  return {
    ...stats,
    reliability: earlyClicks > 0 || stats.consistency >= 65
      ? 'low'
      : stats.consistency >= 35
        ? 'medium'
        : 'high',
    profile,
    rank: getReactionRank(stats.average),
    id: recommendationProfiles[profile],
  }
}
