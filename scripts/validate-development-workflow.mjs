import assert from 'node:assert/strict'
import { classifyTask } from './task-context.mjs'

const cases = [
  {
    name: 'documentation stays quick and low risk',
    files: ['docs/PROJECT_CONTEXT.md'],
    expected: { risk: 'low', suite: 'quick', scopes: ['docs'] },
  },
  {
    name: 'isolated UI changes use quick checks with GPT browser review',
    files: ['src/components/CrosshairCard.jsx', 'src/styles.css'],
    expected: { risk: 'medium', suite: 'quick', scopes: ['ui'] },
  },
  {
    name: 'catalog data uses data checks',
    files: ['src/data/crosshairs.js'],
    expected: { risk: 'medium', suite: 'data', scopes: ['data'] },
  },
  {
    name: 'SEO copy uses SEO checks',
    files: ['src/seo/content.js'],
    expected: { risk: 'medium', suite: 'seo', scopes: ['seo'] },
  },
  {
    name: 'combined data and SEO changes require release checks',
    files: ['src/data/crosshairs.js', 'src/seo/content.js'],
    expected: { risk: 'medium', suite: 'release', scopes: ['data', 'seo'] },
  },
  {
    name: 'route changes are high risk and require release checks',
    files: ['src/seo/routes.js'],
    expected: { risk: 'high', suite: 'release', scopes: ['seo'] },
  },
  {
    name: 'generator changes are high risk and require release checks',
    files: ['scripts/generate-crosshair-images.mjs'],
    expected: { risk: 'high', suite: 'release', scopes: ['data', 'tooling'] },
  },
]

for (const testCase of cases) {
  const result = classifyTask(testCase.files)
  assert.equal(result.risk, testCase.expected.risk, `${testCase.name}: risk`)
  assert.equal(result.recommendedSuite, testCase.expected.suite, `${testCase.name}: suite`)
  assert.deepEqual(result.scopes, testCase.expected.scopes, `${testCase.name}: scopes`)
  assert.ok(result.recommendedReferences.includes('AGENTS.md'), `${testCase.name}: AGENTS reference`)
  assert.ok(result.recommendedReferences.includes('docs/CURRENT_STATE.md'), `${testCase.name}: current-state reference`)
}

console.log(`Validated ${cases.length} task-routing cases and mandatory GPT context references.`)
