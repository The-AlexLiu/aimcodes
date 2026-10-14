import assert from 'node:assert/strict'
import test from 'node:test'
import { commandOutcome, expiryNotice, preflight, publishMedia, validateChannels } from './preflight.mjs'
import { DEFAULT_COPY_MODEL, DEFAULT_VISION_MODEL } from './model-config.mjs'

test('expiration notices provide advance warning without treating metadata as authentication', () => {
  const now = Date.parse('2026-10-13')
  assert.equal(expiryNotice('2026-10-20', now).code, 'expires_soon')
  assert.equal(expiryNotice('2026-09-12', now).code, 'expiration_metadata_stale')
  assert.equal(expiryNotice('2027-10-13', now).warning, false)
  assert.equal(expiryNotice('invalid', now), null)
})

test('authentication failures are classified without leaking command output', () => {
  const result = commandOutcome({ status: 4, stdout: 'private-account-data', stderr: 'private-provider-message' })
  assert.deepEqual(result, { pass: false, code: 'authentication_failed' })
  assert.deepEqual(commandOutcome({ status: null, error: { code: 'ENOENT' } }), { pass: false, code: 'cli_missing' })
})

test('configured channels must exist, match the service, and stay connected', () => {
  const env = { BUFFER_INSTAGRAM_CHANNEL_ID: 'ig', BUFFER_TIKTOK_CHANNEL_ID: 'tt', BUFFER_YOUTUBE_CHANNEL_ID: 'yt' }
  const result = validateChannels([
    { id: 'ig', service: 'instagram', isDisconnected: true },
    { id: 'tt', service: 'youtube' },
  ], env)
  assert.deepEqual(result.map((item) => item.code), ['channel_disconnected', 'channel_service_mismatch', 'channel_not_found'])
})

test('failed Buffer authentication produces a durable safe report and still checks other services', async () => {
  const env = Object.fromEntries(['BUFFER_API_KEY', 'BUFFER_ORGANIZATION_ID', 'BUFFER_INSTAGRAM_CHANNEL_ID',
    'BUFFER_TIKTOK_CHANNEL_ID', 'BUFFER_YOUTUBE_CHANNEL_ID', 'AIHUBMIX_API_KEY', 'R2_ENDPOINT',
    'R2_BUCKET', 'R2_PUBLIC_BASE_URL', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY'].map((name) => [name, `private-${name}`]))
  const commands = []
  const requests = []
  const report = await preflight({ env,
    run: (command) => { commands.push(command); return command === 'buffer'
      ? { status: 4, stdout: 'do-not-log-me' } : { status: 0, stdout: '200' } },
    fetchImpl: async (url, options) => { requests.push({ url, method: options.method || 'GET' }); return {
      ok: true, status: 200, json: async () => options.method === 'POST'
        ? { choices: [{ message: { content: 'A cyan crosshair.' } }] }
        : { data: [{ id: DEFAULT_COPY_MODEL }, { id: DEFAULT_VISION_MODEL }] },
    } },
  })
  assert.equal(report.pass, false)
  assert.equal(report.checks.find((item) => item.name === 'buffer_authentication').code, 'authentication_failed')
  assert.deepEqual(commands, ['buffer', 'curl'])
  assert.deepEqual(requests.map((item) => item.method), ['GET', 'POST', 'HEAD'])
  assert.ok(!JSON.stringify(report).includes('private-'))
  assert.ok(!JSON.stringify(report).includes('do-not-log-me'))
})

test('an advertised model still fails preflight when actual vision inference returns 404', async () => {
  const report = await preflight({ env: { AIHUBMIX_API_KEY: 'test-only' },
    run: () => assert.fail('no local commands expected'),
    fetchImpl: async (_url, options) => options.method === 'POST'
      ? { ok: false, status: 404 }
      : { ok: true, status: 200, json: async () => ({ data: [{ id: DEFAULT_COPY_MODEL }, { id: DEFAULT_VISION_MODEL }] }) },
  })
  assert.equal(report.checks.find((item) => item.name === 'aihubmix_vision_model').pass, true)
  assert.equal(report.checks.find((item) => item.name === 'aihubmix_vision_inference').code, 'model_unavailable')
})

test('HTTP 200 from a provider does not hide a removed configured model', async () => {
  const report = await preflight({ env: { AIHUBMIX_API_KEY: 'test-only' },
    run: () => assert.fail('no Buffer or R2 commands expected'),
    fetchImpl: async () => ({ ok: true, status: 200, json: async () => ({ data: [{ id: 'gemini-2.5-flash-lite' }] }) }),
  })
  assert.equal(report.checks.find((item) => item.name === 'aihubmix_copy_model').pass, true)
  assert.equal(report.checks.find((item) => item.name === 'aihubmix_vision_model').code, 'model_unavailable')
})

test('an empty configuration does not accidentally use ambient local credentials', async () => {
  const report = await preflight({ env: {}, run: () => assert.fail('no commands allowed'), fetchImpl: () => assert.fail('no requests allowed') })
  assert.equal(report.pass, false)
  assert.equal(report.checks[0].code, 'missing_configuration')
})

test('dry runs validate planned media URLs without uploading or changing R2', async () => {
  const urls = await publishMedia({ writeEnabled: false, upload: () => assert.fail('no upload allowed'),
    publicBase: 'https://media.example/', videoKey: 'video.mp4', coverKey: 'cover.png' })
  assert.deepEqual(urls, ['https://media.example/video.mp4', 'https://media.example/cover.png'])
})

test('authorized media publication keeps the video and cover upload contract', async () => {
  const calls = []
  const urls = await publishMedia({ writeEnabled: true,
    upload: async (...args) => { calls.push(args); return `https://media.example/${args[1]}` },
    videoPath: '/tmp/video.mp4', coverPath: '/tmp/cover.png', videoKey: 'v.mp4', coverKey: 'c.png' })
  assert.deepEqual(calls, [['/tmp/video.mp4', 'v.mp4', 'video/mp4'], ['/tmp/cover.png', 'c.png', 'image/png']])
  assert.deepEqual(urls, ['https://media.example/v.mp4', 'https://media.example/c.png'])
})
