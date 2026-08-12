import { spawnSync } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildScopeReport } from './task-context.mjs'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const reportRoot = resolve(projectRoot, '.aimcodes-reports/current')

const steps = {
  lint: ['pnpm', ['lint']],
  build: ['pnpm', ['build']],
  crosshairs: ['pnpm', ['validate:crosshairs']],
  manifest: ['pnpm', ['validate:manifest']],
  finder: ['pnpm', ['validate:finder']],
  localization: ['pnpm', ['validate:localization']],
  analytics: ['pnpm', ['validate:analytics']],
  sharing: ['pnpm', ['validate:sharing']],
  seo: ['pnpm', ['validate:seo']],
  routing: ['pnpm', ['validate:routing']],
  links: ['pnpm', ['validate:links']],
  tools: ['pnpm', ['validate:tools']],
  adsense: ['pnpm', ['validate:adsense']],
  images: ['pnpm', ['validate:images']],
  performance: ['pnpm', ['validate:performance']],
  audit: ['pnpm', ['audit', '--prod']],
  whitespace: ['pnpm', ['validate:diff']],
  workflow: ['pnpm', ['validate:workflow']],
}

const suites = {
  quick: ['lint', 'workflow', 'build', 'performance'],
  data: ['lint', 'manifest', 'crosshairs', 'finder', 'localization', 'build', 'performance', 'seo', 'routing', 'tools', 'images'],
  seo: ['lint', 'manifest', 'localization', 'build', 'performance', 'seo', 'routing', 'links', 'adsense', 'images'],
  release: ['lint', 'workflow', 'manifest', 'crosshairs', 'finder', 'localization', 'analytics', 'sharing', 'build', 'performance', 'seo', 'routing', 'links', 'tools', 'adsense', 'images', 'audit', 'whitespace'],
}

if (process.env.AIMCODES_SKIP_NETWORK_AUDIT === '1') {
  suites.release = suites.release.filter((name) => name !== 'audit')
}

function tail(value, maxLines = 35) {
  return String(value || '').split('\n').slice(-maxLines).join('\n').trim()
}

function signals(value) {
  const cleanLines = String(value || '')
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith('>') && !line.startsWith('vite v') && !line.includes('/Users/'))
  const important = cleanLines.filter((line) => /^(Image generation complete:|Generated \d+ localized|Validated |.* validation passed:|No known vulnerabilities)/.test(line))
  return [...new Set([...important, ...cleanLines.slice(-8)])].slice(-12)
}

async function persist(report) {
  await mkdir(reportRoot, { recursive: true })
  await writeFile(resolve(reportRoot, 'verification.json'), `${JSON.stringify(report, null, 2)}\n`)
  const rows = report.steps.map((step) => `| ${step.name} | ${step.status} | ${step.durationMs} ms |`).join('\n')
  const evidence = report.steps
    .filter((step) => step.evidence.length > 0)
    .map((step) => `### ${step.name}\n\n${step.evidence.map((line) => `- ${line}`).join('\n')}`)
    .join('\n\n')
  const failures = report.steps
    .filter((step) => step.status === 'failed')
    .map((step) => `### ${step.name}\n\n\`\`\`text\n${step.outputExcerpt}\n\`\`\``)
    .join('\n\n')
  const markdown = `# AimCodes verification\n\n- Suite: ${report.suite}\n- Passed: ${report.passed}\n- Started: ${report.startedAt}\n- Duration: ${report.durationMs} ms\n- GPT review required: yes\n\n| Step | Status | Duration |\n| --- | --- | ---: |\n${rows}\n${evidence ? `\n## Compact evidence\n\n${evidence}\n` : ''}${failures ? `\n## Failures\n\n${failures}\n` : ''}\n`
  await writeFile(resolve(reportRoot, 'verification.md'), markdown)
}

let requestedSuite = process.argv[2] || 'auto'
const scope = await buildScopeReport({ forceRelease: requestedSuite === 'release' })
if (requestedSuite === 'auto') requestedSuite = scope.recommendedSuite

if (!suites[requestedSuite]) {
  console.error(`Unknown suite: ${requestedSuite}. Choose auto, quick, data, seo, or release.`)
  process.exit(2)
}

const startedAt = new Date().toISOString()
const startedMs = Date.now()
const report = {
  suite: requestedSuite,
  startedAt,
  finishedAt: null,
  durationMs: 0,
  passed: false,
  scope: {
    risk: scope.risk,
    scopes: scope.scopes,
    changedFileCount: scope.changedFileCount,
  },
  steps: [],
  gptReviewRequired: true,
}

console.log(`Running AimCodes check:${requestedSuite} (${suites[requestedSuite].length} steps)`)

for (const name of suites[requestedSuite]) {
  const [command, args] = steps[name]
  const stepStarted = Date.now()
  const result = spawnSync(command, args, {
    cwd: projectRoot,
    encoding: 'utf8',
    env: { ...process.env, FORCE_COLOR: '0' },
  })
  const durationMs = Date.now() - stepStarted
  const passed = result.status === 0
  const output = `${result.stdout || ''}\n${result.stderr || ''}`.trim()
  report.steps.push({
    name,
    status: passed ? 'passed' : 'failed',
    durationMs,
    exitCode: result.status,
    evidence: signals(output),
    outputExcerpt: passed ? '' : tail(output),
  })
  console.log(`${passed ? 'PASS' : 'FAIL'} ${name} (${durationMs} ms)`)

  if (!passed) {
    report.finishedAt = new Date().toISOString()
    report.durationMs = Date.now() - startedMs
    await persist(report)
    console.error(tail(output))
    console.error('Stopped at first failure. GPT must review .aimcodes-reports/current/verification.md before retrying.')
    process.exit(result.status || 1)
  }
}

report.passed = true
report.finishedAt = new Date().toISOString()
report.durationMs = Date.now() - startedMs
await persist(report)
console.log(`AimCodes check:${requestedSuite} passed in ${report.durationMs} ms.`)
console.log('GPT review gate: inspect scope.md, verification.md, and the semantic diff before release.')
