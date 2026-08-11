import { execFileSync } from 'node:child_process'
import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const reportRoot = resolve(projectRoot, '.aimcodes-reports/current')

function git(args, fallback = '') {
  try {
    return execFileSync('git', args, {
      cwd: projectRoot,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'ignore'],
    }).trim()
  } catch {
    return fallback
  }
}

function lines(value) {
  return value.split('\n').map((item) => item.trim()).filter(Boolean)
}

function collectChangedFiles(baseRef) {
  const committed = lines(git(['diff', '--name-only', `${baseRef}...HEAD`]))
  const working = lines(git(['diff', '--name-only']))
  const staged = lines(git(['diff', '--cached', '--name-only']))
  const untracked = lines(git(['ls-files', '--others', '--exclude-standard']))
  return [...new Set([...committed, ...working, ...staged, ...untracked])].sort()
}

function classifyFile(file) {
  const scopes = new Set()
  if (/^(src\/data\/|src\/utils\/crosshairCode|scripts\/validate-crosshairs|scripts\/generate-crosshair-images)/.test(file)) scopes.add('data')
  if (/^(src\/seo\/|src\/i18n\/|scripts\/generate-localized-routes|scripts\/validate-(seo|localized|internal|image)|public\/robots\.txt|netlify\.toml)/.test(file)) scopes.add('seo')
  if (/^(src\/(App|components|hooks|styles)|src\/assets\/|public\/brand\/)/.test(file)) scopes.add('ui')
  if (/^(src\/utils\/analytics|scripts\/validate-analytics)/.test(file)) scopes.add('analytics')
  if (/^(public\/tools\/social-renderer|scripts\/generate-promo-renderer-data)/.test(file)) scopes.add('renderer')
  if (/^(package\.json|pnpm-lock\.yaml|scripts\/|\.github\/workflows\/|automation\/)/.test(file)) scopes.add('tooling')
  if (/^(docs\/|README\.md|AGENTS\.md|CONTRIBUTING\.md|\.cursor\/)/.test(file)) scopes.add('docs')
  if (scopes.size === 0) scopes.add('other')
  return [...scopes]
}

function chooseRisk(files, scopes) {
  const criticalPatterns = [
    /^netlify\.toml$/,
    /^\.github\/workflows\//,
    /^scripts\/generate-(localized-routes|crosshair-images|promo-renderer-data)/,
    /^src\/seo\/routes/,
    /^src\/utils\/crosshairCode/,
  ]
  if (files.some((file) => criticalPatterns.some((pattern) => pattern.test(file)))) return 'high'
  if (scopes.some((scope) => ['data', 'seo', 'analytics', 'renderer', 'ui'].includes(scope))) return 'medium'
  return 'low'
}

function chooseSuite(scopes, risk, forceRelease) {
  if (forceRelease || risk === 'high') return 'release'
  if (scopes.includes('data') && scopes.includes('seo')) return 'release'
  if (scopes.includes('seo')) return 'seo'
  if (scopes.includes('data')) return 'data'
  return 'quick'
}

function groupFiles(files) {
  const groups = {}
  for (const file of files) {
    const group = file.split('/').slice(0, 2).join('/')
    groups[group] = (groups[group] || 0) + 1
  }
  return groups
}

function chooseReferences(scopes, risk) {
  const references = new Set(['AGENTS.md', 'docs/CURRENT_STATE.md'])
  if (scopes.includes('ui') || scopes.includes('data') || scopes.includes('tooling')) references.add('docs/ARCHITECTURE.md')
  if (scopes.includes('seo')) {
    references.add('docs/SEO_STRATEGY.md')
    references.add('docs/CONTENT_ROADMAP.md')
  }
  if (scopes.includes('renderer')) references.add('AGENTS.md#社媒渲染器边界')
  if (scopes.includes('tooling')) references.add('docs/DEVELOPMENT_WORKFLOW.md')
  if (risk === 'high') {
    references.add('docs/DECISIONS.md')
    references.add('docs/HANDOFF.md')
  }
  return [...references]
}

export function classifyTask(files, { forceRelease = false } = {}) {
  const scopes = [...new Set(files.flatMap(classifyFile))].sort()
  const risk = chooseRisk(files, scopes)
  return {
    scopes,
    risk,
    recommendedSuite: chooseSuite(scopes, risk, forceRelease),
    recommendedReferences: chooseReferences(scopes, risk),
  }
}

export async function buildScopeReport({ forceRelease = false } = {}) {
  const baseRef = process.env.AIMCODES_BASE_REF || 'origin/main'
  const files = collectChangedFiles(baseRef)
  const classification = classifyTask(files, { forceRelease })
  const { scopes, risk, recommendedSuite: suite, recommendedReferences } = classification
  const head = git(['rev-parse', '--short', 'HEAD'], 'unknown')
  const branch = git(['branch', '--show-current'], 'unknown')
  const status = lines(git(['status', '--short']))
  const report = {
    generatedAt: new Date().toISOString(),
    project: 'AimCodes',
    branch,
    head,
    baseRef,
    changedFileCount: files.length,
    changedFiles: files,
    fileGroups: groupFiles(files),
    scopes,
    risk,
    recommendedSuite: suite,
    recommendedReferences,
    workingTreeStatusCount: status.length,
    gptCheckpoints: [
      'plan: confirm scope, exclusions, risk level, and verification suite before editing',
      'diff: review product meaning, data provenance, localization, and unintended changes',
      'qa: inspect structured failures and run browser checks for UI or SEO-facing changes',
      'release: approve exact staged files, PR, and production impact after check:release passes',
      'production: verify representative live URLs, metadata, assets, and sitemaps',
    ],
  }

  await mkdir(reportRoot, { recursive: true })
  await writeFile(resolve(reportRoot, 'scope.json'), `${JSON.stringify(report, null, 2)}\n`)

  const visibleFiles = files.slice(0, 40).map((file) => `- ${file}`).join('\n') || '- No changed files detected'
  const hiddenCount = Math.max(0, files.length - 40)
  const summary = `# AimCodes task scope\n\n- Generated: ${report.generatedAt}\n- Branch: ${branch}\n- Base: ${baseRef}\n- Risk: ${risk}\n- Scopes: ${scopes.join(', ') || 'none'}\n- Recommended suite: check:${suite}\n- Changed files: ${files.length}${hiddenCount ? ` (showing first 40; ${hiddenCount} more in scope.json)` : ''}\n\n## Read next\n\n${recommendedReferences.map((item) => `- ${item}`).join('\n')}\n\n## GPT gates\n\n${report.gptCheckpoints.map((item) => `- ${item}`).join('\n')}\n\n## Changed files\n\n${visibleFiles}\n`
  await writeFile(resolve(reportRoot, 'scope.md'), summary)
  return report
}

const isDirectRun = process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href
if (isDirectRun) {
  const report = await buildScopeReport({ forceRelease: process.argv.includes('--release') })
  console.log(`AimCodes scope: ${report.risk} risk · ${report.scopes.join(', ') || 'none'} · recommended check:${report.recommendedSuite}`)
  console.log(`Structured report: .aimcodes-reports/current/scope.md`)
}
