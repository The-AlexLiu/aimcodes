import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { parseCrosshairCode } from '../src/utils/crosshairCode.js'
import { haveSameVisibleShape } from '../src/utils/crosshairSimilarity.js'
import { crosshairs } from '../src/data/crosshairs.js'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const sourceConfigPath = resolve(projectRoot, 'data_raw/pro-crosshair-sources.json')
const outputPath = resolve(projectRoot, 'data_processed/pro-crosshair-candidates.json')
const errorOutputPath = resolve(projectRoot, 'data_processed/pro-crosshair-errors.json')
const reportPath = resolve(projectRoot, 'docs/PRO_CROSSHAIR_CANDIDATES.md')
const requestHeaders = { 'User-Agent': 'AimCodes research bot (contact@aimcodes.com)' }

function decodeHtml(value = '') {
  return String(value)
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
}

function stripTags(value = '') {
  return decodeHtml(String(value).replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim()
}

async function fetchText(url) {
  const response = await fetch(url, { headers: requestHeaders, signal: AbortSignal.timeout(20_000) })
  if (!response.ok) throw new Error(`${response.status} ${url}`)
  return response.text()
}

function isAllowedByRobots(robotsText, playerPathPrefix) {
  const relevant = robotsText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => /^disallow:/i.test(line))
    .map((line) => line.replace(/^disallow:\s*/i, '').trim())
    .filter(Boolean)
  return !relevant.some((path) => playerPathPrefix.startsWith(path) || path === '/')
}

function playerUrlsFromSitemap(xml, source) {
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => decodeHtml(match[1]))
  return urls.filter((url) => {
    const parsed = new URL(url)
    return parsed.origin === source.baseUrl && parsed.pathname.startsWith(source.playerPathPrefix) && parsed.pathname !== source.playerPathPrefix
  })
}

function extractCandidate(html, url, source) {
  const slug = new URL(url).pathname.split('/').filter(Boolean).at(-1)
  const title = stripTags(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '')
  const displayName = title.replace(/\s+Valorant Settings[\s\S]*$/i, '').trim() || slug
  const code = decodeHtml(html.match(/<code[^>]+id=["']share-code-value["'][^>]*>([\s\S]*?)<\/code>/i)?.[1] || '').trim()
  const verifiedAt = html.match(/Verified[\s\S]{0,260}?<time[^>]+datetime=["']([^"']+)/i)?.[1] || null
  const pageUpdatedAt = html.match(/Updated\s*<time[^>]+datetime=["']([^"']+)/i)?.[1] || null
  const record = {
    playerId: slug,
    displayName,
    code,
    sourceId: source.id,
    sourceName: source.name,
    sourceUrl: url,
    sourceClass: source.sourceClass,
    sourcePublishedAt: pageUpdatedAt,
    sourceClaimedVerifiedAt: verifiedAt,
    capturedAt: new Date().toISOString().slice(0, 10),
    status: source.defaultStatus,
    parserStatus: 'rejected',
    exactCatalogMatches: [],
    appearanceCatalogMatches: [],
    reviewNotes: [],
  }

  if (!code) {
    record.status = 'missing_code'
    record.reviewNotes.push('Source page did not expose a crosshair code.')
    return record
  }

  try {
    const parsed = parseCrosshairCode(code)
    const visible = [parsed.settings.dot, parsed.settings.inner, parsed.settings.outer].some((part) => part.enabled)
    if (!visible) throw new Error('no visible primary component')
    record.parserStatus = 'accepted'
    record.color = parsed.color
    record.colorKey = parsed.colorKey
    record.exactCatalogMatches = crosshairs.filter((item) => item.code === code).map((item) => item.id)
    record.appearanceCatalogMatches = crosshairs.filter((item) => haveSameVisibleShape(item, { code, color: parsed.color })).map((item) => item.id)
    record.reviewNotes.push('Code parses and renders in AimCodes.')
    record.reviewNotes.push('A primary player, team, Riot, stream, or VOD source is still required before publication.')
  } catch (error) {
    record.status = 'parser_rejected'
    record.reviewNotes.push(`AimCodes parser rejected the code: ${error.code || error.message}`)
  }
  return record
}

async function mapWithConcurrency(items, limit, task) {
  const results = new Array(items.length)
  let cursor = 0
  async function worker() {
    while (cursor < items.length) {
      const index = cursor++
      try {
        results[index] = await task(items[index])
      } catch (error) {
        results[index] = { sourceUrl: items[index], status: 'fetch_failed', error: error.message }
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker))
  return results
}

const config = JSON.parse(await readFile(sourceConfigPath, 'utf8'))
const enabledSources = config.sources.filter((source) => source.enabled)
const candidates = []
const sourceSummaries = []

for (const source of enabledSources) {
  const [robotsText, sitemapXml] = await Promise.all([fetchText(source.robotsUrl), fetchText(source.sitemapUrl)])
  if (!isAllowedByRobots(robotsText, source.playerPathPrefix)) {
    throw new Error(`${source.id}: robots.txt does not allow ${source.playerPathPrefix}`)
  }
  const urls = playerUrlsFromSitemap(sitemapXml, source)
  const sourceCandidates = await mapWithConcurrency(urls, 6, async (url) => extractCandidate(await fetchText(url), url, source))
  candidates.push(...sourceCandidates)
  sourceSummaries.push({ sourceId: source.id, discovered: urls.length })
}

candidates.sort((left, right) => String(left.playerId || left.sourceUrl).localeCompare(String(right.playerId || right.sourceUrl)))
const summary = {
  discovered: candidates.length,
  parserAccepted: candidates.filter((item) => item.parserStatus === 'accepted').length,
  needsPrimarySource: candidates.filter((item) => item.status === 'needs_primary_source').length,
  parserRejected: candidates.filter((item) => item.status === 'parser_rejected').length,
  missingCode: candidates.filter((item) => item.status === 'missing_code').length,
  fetchFailed: candidates.filter((item) => item.status === 'fetch_failed').length,
  alreadyInCatalog: candidates.filter((item) => item.exactCatalogMatches?.length).length,
}
const output = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  publicationPolicy: 'Candidates are research leads only. No record may become indexable until a primary source is attached and reviewed.',
  sources: sourceSummaries,
  summary,
  candidates,
}
await mkdir(dirname(outputPath), { recursive: true })
await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`)

const rejected = candidates.filter((item) => item.status !== 'needs_primary_source')
await writeFile(errorOutputPath, `${JSON.stringify({
  schemaVersion: 1,
  generatedAt: output.generatedAt,
  count: rejected.length,
  errorRows: rejected,
}, null, 2)}\n`)
const rows = rejected.slice(0, 40).map((item) => `| ${item.playerId || '-'} | ${item.status} | ${item.sourceUrl || '-'} | ${item.error || item.reviewNotes?.join(' ') || '-'} |`).join('\n')
const report = `# AimCodes 职业选手准星候选报告\n\n- 生成时间：${output.generatedAt}\n- 发现选手页：${summary.discovered}\n- AimCodes 可解析：${summary.parserAccepted}\n- 等待一手来源：${summary.needsPrimarySource}\n- 解析失败：${summary.parserRejected}\n- 缺少代码：${summary.missingCode}\n- 抓取失败：${summary.fetchFailed}\n- 与当前目录代码完全相同：${summary.alreadyInCatalog}\n\n## 发布边界\n\n本报告只保存公开事实线索：选手名、代码、来源页和页面更新时间。候选数据不会自动进入正式准星库、Sitemap 或可索引页面。每条记录仍需补充选手本人、战队、Riot/VCT、直播命令或可定位 VOD 等一手证据，并通过 GPT 语义审核。\n\n## 需要处理的异常\n\n| Player | Status | Source | Notes |\n| --- | --- | --- | --- |\n${rows || '| - | None | - | - |'}\n`
await writeFile(reportPath, report)

console.log(`Collected ${summary.discovered} pro candidates: ${summary.parserAccepted} parse, ${summary.needsPrimarySource} await primary sources, ${summary.parserRejected} rejected, ${summary.fetchFailed} fetch failures.`)
