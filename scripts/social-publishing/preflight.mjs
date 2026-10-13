import { spawnSync } from 'node:child_process'
import { mkdir, writeFile, appendFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const channels = {
  instagram: 'BUFFER_INSTAGRAM_CHANNEL_ID',
  tiktok: 'BUFFER_TIKTOK_CHANNEL_ID',
  youtube: 'BUFFER_YOUTUBE_CHANNEL_ID',
}

export function expiryNotice(value, now = Date.now()) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '') || !Number.isFinite(Date.parse(value))) return null
  const daysRemaining = Math.floor((Date.parse(value) - now) / 86400000)
  return { name: 'buffer_key_expiry', pass: true, code: daysRemaining < 0 ? 'expiration_metadata_stale' : daysRemaining <= 14 ? 'expires_soon' : 'ok',
    expiresOn: value, warning: daysRemaining <= 14 }
}

// Never persist command output: provider errors can contain account data or keys.
export function commandOutcome(result) {
  if (result.error?.code === 'ENOENT') return { pass: false, code: 'cli_missing' }
  if (result.error || result.signal) return { pass: false, code: 'command_unavailable' }
  const codes = { 0: 'ok', 2: 'invalid_command', 3: 'api_error', 4: 'authentication_failed' }
  return { pass: result.status === 0, code: codes[result.status] || 'command_failed' }
}

export function validateChannels(list, env) {
  const items = Array.isArray(list) ? list : list?.items
  return Object.entries(channels).map(([platform, variable]) => {
    const channel = items?.find((item) => item.id === env[variable])
    let code = 'ok'
    if (!channel) code = 'channel_not_found'
    else if (channel.service !== platform) code = 'channel_service_mismatch'
    else if (channel.isDisconnected) code = 'channel_disconnected'
    else if (channel.isLocked) code = 'channel_locked'
    return { name: `buffer_${platform}`, pass: code === 'ok', code }
  })
}

export async function preflight({ env = process.env, run = spawnSync, fetchImpl = fetch } = {}) {
  const checks = []
  const expiry = expiryNotice(env.BUFFER_API_KEY_EXPIRES_AT)
  if (expiry) checks.push(expiry)
  const required = ['BUFFER_API_KEY', 'BUFFER_ORGANIZATION_ID', ...Object.values(channels),
    'AIHUBMIX_API_KEY', 'R2_ENDPOINT', 'R2_BUCKET', 'R2_PUBLIC_BASE_URL', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY']
  const missing = required.filter((name) => !env[name]?.trim())
  checks.push({ name: 'configuration', pass: missing.length === 0, code: missing.length ? 'missing_configuration' : 'ok', missing })

  const buffer = (args) => run('buffer', [...args, '--output', 'json', '--no-color', '--timeout', '20000'], {
    env, encoding: 'utf8', timeout: 25000, stdio: ['ignore', 'pipe', 'pipe'],
  })
  if (env.BUFFER_API_KEY?.trim()) {
    const account = buffer(['account', '--fields', 'organizations.id'])
    const outcome = commandOutcome(account)
    checks.push({ name: 'buffer_authentication', ...outcome })
    if (outcome.pass && env.BUFFER_ORGANIZATION_ID) {
      try {
        const payload = JSON.parse(account.stdout)
        const owned = payload.organizations?.some((org) => org.id === env.BUFFER_ORGANIZATION_ID)
        checks.push({ name: 'buffer_organization', pass: Boolean(owned), code: owned ? 'ok' : 'organization_not_found' })
        if (owned) {
          const result = buffer(['channels', 'list', '--organization-id', env.BUFFER_ORGANIZATION_ID,
            '--fields', 'id,service,isDisconnected,isLocked'])
          const resultOutcome = commandOutcome(result)
          if (!resultOutcome.pass) checks.push({ name: 'buffer_channels', ...resultOutcome })
          else checks.push(...validateChannels(JSON.parse(result.stdout), env))
        }
      } catch { checks.push({ name: 'buffer_response', pass: false, code: 'invalid_response' }) }
    }
  }

  async function httpCheck(name, url, options) {
    try {
      const response = await fetchImpl(url, { ...options, signal: AbortSignal.timeout(20000) })
      const code = response.ok ? 'ok' : [401, 403].includes(response.status) ? 'authentication_failed' : 'http_error'
      checks.push({ name, pass: response.ok, code, httpStatus: response.status })
      await response.body?.cancel()
    } catch { checks.push({ name, pass: false, code: 'network_unavailable' }) }
  }
  if (env.AIHUBMIX_API_KEY) await httpCheck('aihubmix_authentication', 'https://aihubmix.com/v1/models', {
    headers: { Authorization: `Bearer ${env.AIHUBMIX_API_KEY}` },
  })
  if (env.R2_PUBLIC_BASE_URL) await httpCheck('r2_public_delivery', `${env.R2_PUBLIC_BASE_URL.replace(/\/$/, '')}/health/github-actions-ready.txt`, { method: 'HEAD' })
  if (['R2_ENDPOINT', 'R2_BUCKET', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY'].every((name) => env[name])) {
    const result = run('curl', ['--silent', '--head', '--max-time', '20', '--output', '/dev/null', '--write-out', '%{http_code}',
      '--aws-sigv4', 'aws:amz:auto:s3', '--user', `${env.R2_ACCESS_KEY_ID}:${env.R2_SECRET_ACCESS_KEY}`,
      `${env.R2_ENDPOINT.replace(/\/$/, '')}/${env.R2_BUCKET}`], { encoding: 'utf8', timeout: 25000, stdio: ['ignore', 'pipe', 'pipe'] })
    const status = Number(result.stdout)
    const pass = result.status === 0 && status === 200
    checks.push({ name: 'r2_bucket_access', pass, code: pass ? 'ok' : [401, 403].includes(status) ? 'authentication_failed' : 'bucket_unavailable', httpStatus: Number.isInteger(status) ? status : 0 })
  }
  return { generatedAt: new Date().toISOString(), mode: 'read_only', pass: checks.every((check) => check.pass), checks }
}

export async function publishMedia({ writeEnabled, upload, publicBase, videoPath, coverPath, videoKey, coverKey }) {
  if (!writeEnabled) return [videoKey, coverKey].map((key) => `${publicBase.replace(/\/$/, '')}/${key}`)
  return Promise.all([upload(videoPath, videoKey, 'video/mp4'), upload(coverPath, coverKey, 'image/png')])
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const report = await preflight()
  const reportPath = resolve('output/social-publishing/preflight.json')
  await mkdir(dirname(reportPath), { recursive: true })
  await writeFile(reportPath, `${JSON.stringify(report, null, 2)}\n`)
  for (const check of report.checks) {
    console.log(`${check.warning ? 'WARN' : check.pass ? 'PASS' : 'FAIL'} ${check.name}: ${check.code}`)
    if (check.warning && process.env.GITHUB_ACTIONS) console.log(`::warning::Buffer key expiration metadata: ${check.expiresOn}; rotate the key and update BUFFER_API_KEY_EXPIRES_AT.`)
  }
  if (process.env.GITHUB_STEP_SUMMARY) {
    await appendFile(process.env.GITHUB_STEP_SUMMARY,
      `## Read-only social service checks\n\n| Check | Status | Code |\n|---|---|---|\n${report.checks.map((check) => `| ${check.name} | ${check.pass ? 'PASS' : 'FAIL'} | ${check.code} |`).join('\n')}\n`)
  }
  if (!report.pass) process.exitCode = 1
}
