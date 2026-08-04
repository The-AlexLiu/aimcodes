import { crosshairs } from '../src/data/crosshairs.js'
import { getReactionRank, getReactionRecommendation, REACTION_RANKS } from '../src/utils/reactionRecommendation.js'

const failures = []
const catalogIds = new Set(crosshairs.map((item) => item.id))

for (let index = 0; index < REACTION_RANKS.length; index += 1) {
  const rank = REACTION_RANKS[index]
  const previous = REACTION_RANKS[index - 1]

  if (previous && rank.min !== previous.max + 1) failures.push(`Gap or overlap before ${rank.id}`)
  if (getReactionRank(rank.min).id !== rank.id) failures.push(`Lower boundary failed for ${rank.id}`)
  if (Number.isFinite(rank.max) && getReactionRank(rank.max).id !== rank.id) failures.push(`Upper boundary failed for ${rank.id}`)
}

for (const rounds of [[150, 160, 170], [251, 270, 285], [401, 520, 800]]) {
  const result = getReactionRecommendation(rounds)
  if (!result.rank?.id) failures.push(`Missing rank for ${rounds.join(',')}`)
  if (!catalogIds.has(result.id)) failures.push(`Missing primary recommendation ${result.id}`)
}

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log(`Validated ${REACTION_RANKS.length} continuous reaction tiers and all primary recommendation IDs.`)
