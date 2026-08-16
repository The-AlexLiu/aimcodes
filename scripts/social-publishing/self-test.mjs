import assert from 'node:assert/strict'
import { addUtm, assertDraftOnlyPayload, buildBundle, readJson, validatePlan } from './lib.mjs'

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

console.log(`Validated ${bundle.posts.length} draft-only platform payloads and UTM safety rules.`)
