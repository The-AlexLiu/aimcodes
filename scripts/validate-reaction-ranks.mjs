import { crosshairs } from '../src/data/crosshairs.js'
import {
  getReactionRank,
  getReactionRecommendation,
  isValidReactionTime,
  MIN_REACTION_MS,
  MAX_REACTION_MS,
  REACTION_CALIBRATION_VERSION,
  REACTION_RANKS,
} from '../src/utils/reactionRecommendation.js'
import {
  AIM_PROFILE_HISTORY_LIMIT,
  createAimProfileAttempt,
  sanitizeAimProfileHistory,
  summarizeAimProfile,
} from '../src/utils/aimProfile.js'
import { aimProfileLocales, getAimProfileCopy } from '../src/i18n/aimProfileCopy.js'

const failures = []
const catalogIds = new Set(crosshairs.map((item) => item.id))

for (let index = 0; index < REACTION_RANKS.length; index += 1) {
  const rank = REACTION_RANKS[index]
  const previous = REACTION_RANKS[index - 1]

  if (previous && rank.min !== previous.max + 1) failures.push(`Gap or overlap before ${rank.id}`)
  if (getReactionRank(rank.min).id !== rank.id) failures.push(`Lower boundary failed for ${rank.id}`)
  if (Number.isFinite(rank.max) && getReactionRank(rank.max).id !== rank.id) failures.push(`Upper boundary failed for ${rank.id}`)
}

const calibrationExpectations = [
  [170, 'radiant'], [171, 'immortal'], [200, 'immortal'], [201, 'ascendant'],
  [230, 'ascendant'], [231, 'diamond'], [260, 'diamond'], [261, 'platinum'],
  [273, 'platinum'], [300, 'platinum'], [301, 'gold'], [350, 'gold'],
  [351, 'silver'], [399, 'silver'], [410, 'silver'], [411, 'bronze'],
  [500, 'bronze'], [501, 'iron'],
]
for (const [score, expectedRank] of calibrationExpectations) {
  const actualRank = getReactionRank(score).id
  if (actualRank !== expectedRank) failures.push(`Expected ${score} ms to be ${expectedRank}, received ${actualRank}.`)
}

for (const rounds of [[150, 160, 170], [251, 270, 285], [401, 520, 800]]) {
  const result = getReactionRecommendation(rounds)
  if (!result.rank?.id) failures.push(`Missing rank for ${rounds.join(',')}`)
  if (!catalogIds.has(result.id)) failures.push(`Missing primary recommendation ${result.id}`)
}

if (getReactionRecommendation([180, 181, 182]).reliability !== 'high') failures.push('A stable run should have high reliability.')
if (getReactionRecommendation([150, 250, 350]).reliability !== 'low') failures.push('A volatile run should have low reliability.')
if (getReactionRecommendation([MIN_REACTION_MS - 1, 180, 190]).average !== 185) failures.push('Implausible reaction times must not affect result statistics.')

for (const validTime of [MIN_REACTION_MS, 170, MAX_REACTION_MS]) {
  if (!isValidReactionTime(validTime)) failures.push(`Valid reaction time rejected: ${validTime}`)
}

for (const invalidTime of [0, MIN_REACTION_MS - 1, -1, MAX_REACTION_MS + 1, Number.NaN, Number.POSITIVE_INFINITY]) {
  if (isValidReactionTime(invalidTime)) failures.push(`Invalid reaction time accepted: ${invalidTime}`)
}

const profileAttempts = [280, 270, 260, 245, 235, 225, 215].map((average, index) => createAimProfileAttempt(
  getReactionRecommendation([average - 5, average, average + 5]),
  [average - 5, average, average + 5],
  `profile-${index}`,
  new Date(Date.UTC(2026, 8, index + 1)).toISOString(),
))
const profileSummary = summarizeAimProfile(profileAttempts)
if (profileSummary?.totalAttempts !== profileAttempts.length) failures.push('Aim profile did not keep all valid attempts.')
if (profileSummary?.personalBest !== 210) failures.push(`Unexpected personal best: ${profileSummary?.personalBest}`)
if (profileSummary?.recentAverage !== 247) failures.push(`Unexpected recent average: ${profileSummary?.recentAverage}`)
if ((profileSummary?.trendDifference || 0) <= 0) failures.push('Improving runs should produce a positive trend difference.')
if (profileSummary?.recent.length !== 7) failures.push('Aim profile trend should include the latest seven attempts.')
if (!profileSummary?.hasTrendBaseline) failures.push('Seven attempts should provide a complete trend baseline.')

const touchAttempt = createAimProfileAttempt(
  getReactionRecommendation([220, 225, 230]),
  [220, 225, 230],
  'touch-attempt',
  new Date(Date.UTC(2026, 8, 9)).toISOString(),
  'touch',
)
if (sanitizeAimProfileHistory([touchAttempt])[0]?.inputType !== 'touch') failures.push('Aim profile input type was not preserved.')
if (summarizeAimProfile([touchAttempt])?.hasTrendBaseline) failures.push('A single attempt must not claim a trend baseline.')

const oversizedProfile = sanitizeAimProfileHistory(Array.from({ length: AIM_PROFILE_HISTORY_LIMIT + 5 }, (_, index) => ({
  ...profileAttempts[index % profileAttempts.length],
  id: `history-${index}`,
  completedAt: new Date(Date.UTC(2026, 0, index + 1)).toISOString(),
})))
if (oversizedProfile.length !== AIM_PROFILE_HISTORY_LIMIT) failures.push('Aim profile history limit was not enforced.')
if (sanitizeAimProfileHistory([{ nope: true }, profileAttempts[0], profileAttempts[0]]).length !== 1) failures.push('Invalid or duplicate profile attempts were not removed.')
if (aimProfileLocales.length !== 5) failures.push(`Aim profile should support five locales, found ${aimProfileLocales.length}.`)
for (const locale of aimProfileLocales) {
  if (getAimProfileCopy(locale, 'title') === 'title') failures.push(`Missing aim profile title for ${locale}.`)
  if (!getAimProfileCopy(locale, 'trendImproved', { difference: 12, unit: 'ms' }).includes('12')) failures.push(`Aim profile interpolation failed for ${locale}.`)
  for (const rank of REACTION_RANKS) {
    const feedbackKey = `rankFeedback_${rank.id}`
    if (getAimProfileCopy(locale, feedbackKey) === feedbackKey) failures.push(`Missing ${rank.id} feedback for ${locale}.`)
  }
}

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}

console.log(`Validated ${REACTION_RANKS.length} continuous reaction tiers for ${REACTION_CALIBRATION_VERSION}, profile history limits, trend summaries, and all primary recommendation IDs.`)
