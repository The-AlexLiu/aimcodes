import { spawnSync } from 'node:child_process'
import { copyFile, mkdir, readdir } from 'node:fs/promises'
import { basename, dirname, resolve } from 'node:path'
import {
  absolutePath,
  assertDraftOnlyPayload,
  buildBundle,
  defaultChannelMapPath,
  defaultMediaMapPath,
  defaultPlanPath,
  parseArgs,
  pathExists,
  readJson,
  reviewMarkdown,
  validatePlan,
  writeJson,
  writeText,
} from './lib.mjs'

const [command = 'help', ...rawArgs] = process.argv.slice(2)
const { values, flags } = parseArgs(rawArgs)

function fail(message, code = 1) {
  console.error(message)
  process.exit(code)
}

function runBuffer(args, { allowFailure = false } = {}) {
  const result = spawnSync('buffer', args, { encoding: 'utf8', env: process.env })
  if (result.error?.code === 'ENOENT') fail('Buffer CLI is not installed. Run: npm install -g @bufferapp/cli')
  if (result.status !== 0 && !allowFailure) {
    fail(`${result.stderr || result.stdout || 'Buffer command failed'}`.trim(), result.status || 1)
  }
  return result
}

async function setup() {
  const pairs = [
    ['automation/social-publishing/channel-map.example.json', defaultChannelMapPath],
    ['automation/social-publishing/media-map.example.json', defaultMediaMapPath],
  ]
  for (const [source, target] of pairs) {
    if (await pathExists(target)) {
      console.log(`SKIP ${target} already exists`)
      continue
    }
    await mkdir(dirname(absolutePath(target)), { recursive: true })
    await copyFile(absolutePath(source), absolutePath(target))
    console.log(`CREATED ${target}`)
  }
  console.log('Next: connect Buffer, replace placeholder IDs, and add public HTTPS media URLs.')
}

async function validate() {
  const planPath = values.plan || defaultPlanPath
  const plan = await readJson(planPath)
  const result = await validatePlan(plan, { checkLocalAssets: !flags.portable })
  for (const warning of result.warnings) console.warn(`WARN ${warning}`)
  if (result.errors.length) fail(result.errors.map((error) => `ERROR ${error}`).join('\n'))
  console.log(`Validated ${plan.campaigns.length} social campaigns (${plan.campaigns.filter((item) => item.status === 'approved_for_draft').length} approved for Buffer drafts).`)
}

function timestamp() {
  return new Date().toISOString().replaceAll(':', '-').replace(/\.\d{3}Z$/, 'Z')
}

async function prepare() {
  const planPath = values.plan || defaultPlanPath
  const channelPath = values.channels || defaultChannelMapPath
  const mediaPath = values.media || defaultMediaMapPath
  const plan = await readJson(planPath)
  const validation = await validatePlan(plan)
  if (validation.errors.length) fail(validation.errors.map((error) => `ERROR ${error}`).join('\n'))
  for (const warning of validation.warnings) console.warn(`WARN ${warning}`)
  if (!(await pathExists(channelPath))) fail(`Missing ${channelPath}. Run: pnpm social:setup`)
  if (!(await pathExists(mediaPath))) fail(`Missing ${mediaPath}. Run: pnpm social:setup`)
  const channelMap = await readJson(channelPath)
  const mediaMap = await readJson(mediaPath)
  const { errors, bundle } = buildBundle(plan, channelMap, mediaMap)
  if (errors.length) fail(errors.map((error) => `ERROR ${error}`).join('\n'))
  const safetyErrors = bundle.posts.flatMap(assertDraftOnlyPayload)
  if (safetyErrors.length) fail(safetyErrors.map((error) => `ERROR ${error}`).join('\n'))
  const outputDirectory = values.out || `output/social-publishing/bundles/${timestamp()}`
  await writeJson(`${outputDirectory}/bundle.json`, bundle)
  await writeText(`${outputDirectory}/review.md`, reviewMarkdown(bundle))
  for (const post of bundle.posts) await writeJson(`${outputDirectory}/payloads/${post.key}.json`, post.payload)
  console.log(`Prepared ${bundle.posts.length} Buffer-only drafts in ${outputDirectory}`)
  console.log(`Review: ${outputDirectory}/review.md`)
}

async function drafts() {
  const bundlePath = values.bundle
  if (!bundlePath) fail('Provide --bundle output/social-publishing/bundles/<timestamp>/bundle.json')
  const bundle = await readJson(bundlePath)
  const safetyErrors = bundle.posts.flatMap(assertDraftOnlyPayload)
  if (safetyErrors.length) fail(safetyErrors.map((error) => `ERROR ${error}`).join('\n'))
  const writeMode = flags.write
  if (writeMode && process.env.AIMCODES_SOCIAL_ALLOW_DRAFT_WRITE !== 'YES') {
    fail('Draft writes are locked. Re-run with AIMCODES_SOCIAL_ALLOW_DRAFT_WRITE=YES and --write after reviewing review.md.')
  }

  const bundleDirectory = dirname(absolutePath(bundlePath))
  const payloadDirectory = resolve(bundleDirectory, 'payloads')
  const files = (await readdir(payloadDirectory)).filter((file) => file.endsWith('.json')).sort()
  const results = []
  for (const file of files) {
    const args = ['posts', 'create', '--input', resolve(payloadDirectory, file), '--save-to-draft', '--output', 'json', '--no-color']
    if (!writeMode) args.push('--dry-run')
    const result = runBuffer(args, { allowFailure: true })
    const item = {
      payload: basename(file),
      mode: writeMode ? 'buffer_draft_write' : 'local_dry_run',
      success: result.status === 0,
      exitCode: result.status,
      response: (result.stdout || '').trim(),
      error: (result.stderr || '').trim(),
    }
    results.push(item)
    console.log(`${item.success ? 'PASS' : 'FAIL'} ${item.payload} (${item.mode})`)
    if (!item.success && writeMode) break
  }
  const ledgerPath = `output/social-publishing/ledgers/${timestamp()}.json`
  await writeJson(ledgerPath, { createdAt: new Date().toISOString(), bundlePath, writeMode, results })
  console.log(`Ledger: ${ledgerPath}`)
  if (results.some((item) => !item.success)) fail('One or more Buffer draft validations failed. Review the ledger; no public posts were created.')
}

function doctor() {
  const version = runBuffer(['--version'], { allowFailure: true })
  if (version.status !== 0) fail('Buffer CLI is not available')
  console.log(`Buffer CLI ${version.stdout.trim()}`)
  const result = runBuffer(['doctor', '--json'], { allowFailure: true })
  console.log((result.stdout || result.stderr).trim())
  if (result.status !== 0) process.exit(result.status || 1)
}

function help() {
  console.log(`AimCodes social publishing pipeline\n\nCommands:\n  doctor   Check Buffer CLI authentication\n  setup    Create ignored local channel/media maps\n  validate Validate the committed content plan\n  prepare  Build Buffer draft payloads and a review sheet\n  drafts   Dry-run payloads, or create Buffer drafts with --write\n\nThe pipeline cannot schedule or publish public posts. Human review in Buffer is mandatory.`)
}

if (command === 'doctor') doctor()
else if (command === 'setup') await setup()
else if (command === 'validate') await validate()
else if (command === 'prepare') await prepare()
else if (command === 'drafts') await drafts()
else help()
