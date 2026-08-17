import assert from 'node:assert/strict'
import { addUtm, assertDraftOnlyPayload, buildBundle, readJson, validatePlan } from './lib.mjs'
import { crosshairDisplayName, validateCopy } from './copy-quality.mjs'
import { normalizeVisualReview, summarizePlatformQuota } from './quality-policy.mjs'

const plan = await readJson('data_raw/social-content-plan.json')
const validation = await validatePlan(plan)
assert.deepEqual(validation.errors, [])

const channelMap = {
  organizationId: 'org-test',
  activePlatforms: ['instagram', 'tiktok', 'youtube', 'facebook'],
  channels: {
    instagram: 'channel-instagram',
    tiktok: 'channel-tiktok',
    youtube: 'channel-youtube',
    facebook: 'channel-facebook',
  },
}
const mediaMap = Object.fromEntries(plan.campaigns.map((campaign) => [
  campaign.id,
  {
    videoUrl: `https://cdn.aimcodes.com/social/${campaign.id}.mp4`,
    coverUrl: `https://cdn.aimcodes.com/social/${campaign.id}-cover.png`,
  },
]))

const { errors, bundle } = buildBundle(plan, channelMap, mediaMap)
assert.deepEqual(errors, [])
assert.equal(bundle.posts.length, plan.campaigns.length * 4)
assert.deepEqual(bundle.posts.flatMap(assertDraftOnlyPayload), [])
assert.ok(bundle.posts.every((post) => post.payload.saveToDraft === true))
assert.ok(bundle.posts.every((post) => !post.payload.dueAt))
assert.ok(bundle.posts.every((post) => post.coverRequired === true && post.coverUrl.endsWith('-cover.png')))
assert.ok(bundle.posts.filter((post) => post.platform === 'youtube')
  .every((post) => post.payload.metadata.youtube.privacy === 'private'))

const trackedUrl = new URL(addUtm('https://aimcodes.com/en/reaction-test/', 'youtube', 'reaction-test-en-v1'))
assert.equal(trackedUrl.searchParams.get('utm_source'), 'youtube')
assert.equal(trackedUrl.searchParams.get('utm_medium'), 'organic_social')
assert.equal(trackedUrl.searchParams.get('utm_campaign'), 'aimcodes_social')
assert.equal(trackedUrl.searchParams.get('utm_content'), 'reaction-test-en-v1')

const youtubeCreative = {
  average: 185,
  crosshair: 'small-dot-thick',
  crosshairName: 'Pixel',
  socialCopy: 'This run averaged 185 ms. The matched crosshair is Pixel.',
}
assert.equal(crosshairDisplayName(youtubeCreative), 'Pixel')
assert.deepEqual(validateCopy({
  caption: '',
  title: '185 ms Immortal Reaction Challenge',
  description: '185 ms with the Pixel crosshair. Can you beat it? https://aimcodes.com/en/reaction-time-test/ #VALORANT #ReactionTime #Shorts',
}, 'youtube', youtubeCreative), [])

const unsafeYouTubeErrors = validateCopy({
  caption: 'This unused caption looks valid. #VALORANT #Shorts',
  title: 'Creative Seed demo',
  description: '185 ms with small-dot-thick. https://example.com #VALORANT #Shorts',
}, 'youtube', youtubeCreative)
assert.ok(unsafeYouTubeErrors.includes('published text must mention the rendered crosshair display name'))
assert.ok(unsafeYouTubeErrors.includes('published copy must not expose the technical crosshair id'))
assert.ok(unsafeYouTubeErrors.includes('published copy must not expose internal production terms'))
assert.ok(unsafeYouTubeErrors.includes('YouTube description must contain exactly one clean AimCodes reaction-test URL'))

const instagramCreative = { average: 228, crosshair: 'micro-gap-cyan', crosshairName: 'Micro Gap' }
assert.deepEqual(validateCopy({
  caption: '228 ms with the Micro Gap crosshair. Drop your rank below. #VALORANT #ReactionTime #AimCodes',
  title: '',
  description: '',
}, 'instagram', instagramCreative), [])
assert.ok(validateCopy({
  caption: '228 ms with the Micro Gap crosshair. https://aimcodes.com #VALORANT #ReactionTime',
}, 'instagram', instagramCreative).includes('Instagram and TikTok captions must not contain a raw URL'))

assert.deepEqual(normalizeVisualReview({
  pass: true,
  score: 96,
  failures: [],
  summary: 'All frames are coherent.',
}), {
  pass: true,
  score: 96,
  failures: [],
  summary: 'All frames are coherent.',
})
assert.equal(normalizeVisualReview({
  pass: false,
  score: 85,
  failures: [],
  summary: 'All visible values match the supplied facts.',
}).pass, false)
assert.equal(normalizeVisualReview({
  pass: true,
  score: 98,
  failures: ['Image 4: score is visible before the click.'],
  summary: 'One sequencing defect.',
}).pass, false)

const completeQuotaPosts = ['tiktok', 'instagram', 'youtube'].flatMap((platform) => [1, 2, 3].map((slot) => ({
  platform,
  slot: `wave-${slot}`,
  status: 'scheduled',
})))
assert.equal(summarizePlatformQuota(completeQuotaPosts).pass, true)
assert.equal(summarizePlatformQuota(completeQuotaPosts.slice(0, -1)).pass, false)
assert.equal(summarizePlatformQuota([...completeQuotaPosts, { platform: 'youtube', slot: 'wave-4', status: 'scheduled' }]).pass, false)

console.log(`Validated ${bundle.posts.length} draft-only platform payloads, UTM safety, publication copy guards, visual QA normalization, and daily platform quotas.`)
