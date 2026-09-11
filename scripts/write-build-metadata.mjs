import { execFileSync } from 'node:child_process'
import { writeFile } from 'node:fs/promises'

function localCommit() {
  try {
    return execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim()
  } catch {
    return 'unknown'
  }
}

const commit = process.env.COMMIT_REF || process.env.GITHUB_SHA || localCommit()
const payload = {
  commit,
  builtAt: new Date().toISOString(),
}

await writeFile('dist/build-meta.json', `${JSON.stringify(payload, null, 2)}\n`)
console.log(`Wrote build metadata for ${commit.slice(0, 12)}`)
