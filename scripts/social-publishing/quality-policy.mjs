export const SOCIAL_PLATFORMS = ['tiktok', 'instagram', 'youtube']

export function normalizeVisualReview(raw, threshold = 90) {
  const score = Number(raw?.score)
  const scoreIsValid = Number.isInteger(score) && score >= 0 && score <= 100
  const reportedFailures = Array.isArray(raw?.failures)
    ? raw.failures
    : (Array.isArray(raw?.issues) ? raw.issues : ['Visual reviewer returned a malformed failure list'])
  const failures = reportedFailures
    .map((item) => String(item || '').trim())
    .filter(Boolean)
  if (!scoreIsValid) failures.push('Visual reviewer returned a score outside the required 0-100 integer range')
  const summary = typeof raw?.summary === 'string' ? raw.summary.trim() : ''
  const pass = raw?.pass === true
    && scoreIsValid
    && score >= threshold
    && failures.length === 0

  return {
    pass,
    score: scoreIsValid ? score : 0,
    failures,
    summary,
  }
}

export function summarizePlatformQuota(posts, { expectedPerPlatform = 3, writeEnabled = true } = {}) {
  const acceptedStatuses = new Set(writeEnabled
    ? ['scheduled', 'already_scheduled', 'scheduled_unconfirmed']
    : ['dry_run', 'already_scheduled'])
  const platforms = {}

  for (const platform of SOCIAL_PLATFORMS) {
    const accepted = posts.filter((post) => post.platform === platform && acceptedStatuses.has(post.status))
    const failed = posts.filter((post) => post.platform === platform && post.status === 'failed')
    platforms[platform] = {
      expected: expectedPerPlatform,
      accepted: accepted.length,
      missing: Math.max(0, expectedPerPlatform - accepted.length),
      excess: Math.max(0, accepted.length - expectedPerPlatform),
      failed: failed.length,
      pass: accepted.length === expectedPerPlatform,
    }
  }

  return {
    expectedTotal: expectedPerPlatform * SOCIAL_PLATFORMS.length,
    acceptedTotal: Object.values(platforms).reduce((sum, item) => sum + item.accepted, 0),
    pass: Object.values(platforms).every((item) => item.pass),
    platforms,
  }
}

export function quotaFailureMessage(quota) {
  return SOCIAL_PLATFORMS
    .filter((platform) => !quota.platforms[platform].pass)
    .map((platform) => {
      const item = quota.platforms[platform]
      return `${platform}: ${item.accepted}/${item.expected} accepted, ${item.failed} failed`
    })
    .join('; ')
}
