export const REACTION_ROUNDS = 3
export const MAX_REACTION_MS = 2000

export function isValidReactionTime(value) {
  return Number.isFinite(value) && value >= 1 && value <= MAX_REACTION_MS
}

// Product-defined reaction tiers. They borrow VALORANT's rank language for
// familiarity, but describe only this browser reaction test—not a player rank.
export const REACTION_RANKS = [
  { id: 'radiant', min: 0, max: 170, color: '#fff0b8' },
  { id: 'immortal', min: 171, max: 190, color: '#ee648f' },
  { id: 'ascendant', min: 191, max: 210, color: '#78d18a' },
  { id: 'diamond', min: 211, max: 230, color: '#83b7ff' },
  { id: 'platinum', min: 231, max: 250, color: '#57d1c2' },
  { id: 'gold', min: 251, max: 285, color: '#e6bd53' },
  { id: 'silver', min: 286, max: 330, color: '#b7c4ce' },
  { id: 'bronze', min: 331, max: 400, color: '#c17a52' },
  { id: 'iron', min: 401, max: Number.POSITIVE_INFINITY, color: '#818b94' },
]

const recommendationProfiles = {
  precision: 'aspas-dot',
  balanced: 'tenz',
  steady: 'jinggg',
  visibility: 'boaster',
}

export function calculateReactionStats(rounds, earlyClicks = 0) {
  const validRounds = rounds.filter((value) => Number.isFinite(value) && value > 0)
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

  if (earlyClicks >= 2 || stats.consistency >= 55 || stats.average > 275) {
    profile = 'visibility'
  } else if (earlyClicks === 0 && stats.average < 190 && stats.consistency < 35) {
    profile = 'precision'
  } else if (earlyClicks > 0 || stats.average > 240 || stats.consistency > 40) {
    profile = 'steady'
  }

  return {
    ...stats,
    profile,
    rank: getReactionRank(stats.average),
    id: recommendationProfiles[profile],
  }
}
