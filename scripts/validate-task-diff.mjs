import { execFileSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const baseRef = process.env.AIMCODES_BASE_REF || 'origin/main'
const checks = [
  ['diff', '--check', `${baseRef}...HEAD`],
  ['diff', '--check'],
  ['diff', '--cached', '--check'],
]

for (const args of checks) {
  execFileSync('git', args, { cwd: projectRoot, stdio: 'inherit' })
}

const sensitiveFiles = execFileSync('git', ['status', '--short'], {
  cwd: projectRoot,
  encoding: 'utf8',
}).split('\n').filter((line) => /(^|\/)\.env($|\.)|credentials|service-account|\.pem$/i.test(line))

if (sensitiveFiles.length > 0) {
  throw new Error(`Potential sensitive files detected in task diff:\n${sensitiveFiles.join('\n')}`)
}

console.log(`Validated committed, staged, and working-tree whitespace against ${baseRef}; no sensitive credential filenames detected.`)
