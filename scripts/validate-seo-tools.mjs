import { crosshairs } from '../src/data/crosshairs.js'
import { playbookAgentPlacementIssue, playbookAgents, playbookAgentRoles } from '../src/data/playbookAgents.js'
import { valorantMaps } from '../src/seo/playbookContent.js'
import { generateCrosshairCode, parseCrosshairCode } from '../src/utils/crosshairCode.js'
import { existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const errors = []
const cases = [
  {
    name: 'cyan short cross',
    options: { colorPreset: '5', outline: { enabled: true, opacity: 1, thickness: 1 }, inner: { enabled: true, opacity: 1, length: 4, thickness: 2, offset: 2 }, outer: { enabled: false } },
    verify: (parsed) => parsed.colorKey === 'cyan' && parsed.settings.inner.enabled && !parsed.settings.outer.enabled,
  },
  {
    name: 'pink center dot',
    options: { colorPreset: '6', dot: { enabled: true, opacity: 1, size: 3 }, inner: { enabled: false }, outer: { enabled: false } },
    verify: (parsed) => parsed.colorKey === 'pink' && parsed.settings.dot.enabled && !parsed.settings.inner.enabled,
  },
  {
    name: 'training feedback',
    options: { movementError: true, firingError: true, inner: { enabled: true }, outer: { enabled: false } },
    verify: (parsed) => parsed.settings.movementError.enabled && parsed.settings.firingError.enabled,
  },
]

for (const item of cases) {
  try {
    const code = generateCrosshairCode(item.options)
    const parsed = parseCrosshairCode(code)
    if (!item.verify(parsed)) errors.push(`${item.name}: generated settings did not survive decoding`)
  } catch (error) {
    errors.push(`${item.name}: ${error.message}`)
  }
}

for (const crosshair of crosshairs) {
  try {
    parseCrosshairCode(crosshair.code, { fallbackColor: crosshair.color })
  } catch (error) {
    errors.push(`${crosshair.id}: existing database code failed decoder (${error.message})`)
  }
}

for (const invalid of ['', 'broken-code', '0;P;c', '0 P c 5']) {
  try {
    parseCrosshairCode(invalid)
    errors.push(`invalid input unexpectedly passed: ${invalid || '<empty>'}`)
  } catch {
    // Expected: decoder must reject incomplete or malformed input.
  }
}

const agentIds = new Set()
const allowedAbilityShapes = new Set(['point', 'radius', 'wall', 'corridor', 'rectangle', 'cone', 'tripwire', 'mesh', 'net'])
for (const agent of playbookAgents) {
  if (agentIds.has(agent.id)) errors.push(`${agent.id}: duplicate playbook agent id`)
  agentIds.add(agent.id)
  if (!playbookAgentRoles.includes(agent.role)) errors.push(`${agent.id}: invalid role ${agent.role}`)
  if (agent.abilities.length !== 4) errors.push(`${agent.id}: expected exactly four primary abilities`)
  if (!agent.names?.['zh-CN'] || !agent.names?.ja) errors.push(`${agent.id}: missing localized agent name`)

  for (const ability of agent.abilities) {
    if (!allowedAbilityShapes.has(ability.geometry?.shape)) errors.push(`${ability.id}: invalid ability geometry ${ability.geometry?.shape}`)
  }

  for (const asset of [agent.asset, ...agent.abilities.map((ability) => ability.asset)]) {
    const assetPath = fileURLToPath(new URL(`../public${asset}`, import.meta.url))
    if (!existsSync(assetPath)) errors.push(`${agent.id}: missing playbook asset ${asset}`)
  }
}

if (playbookAgents.length !== 29) errors.push(`expected 29 playbook agents, found ${playbookAgents.length}`)

const requiredAbilityGeometry = new Map([
  ['cypher-1', 'tripwire'],
  ['sage-1', 'wall'],
  ['harbor-1', 'wall'],
  ['harbor-2', 'wall'],
  ['deadlock-1', 'mesh'],
  ['deadlock-2', 'rectangle'],
  ['deadlock-3', 'net'],
  ['deadlock-4', 'cone'],
])
const playbookAbilities = playbookAgents.flatMap((agent) => agent.abilities)
for (const [abilityId, expectedShape] of requiredAbilityGeometry) {
  const ability = playbookAbilities.find((item) => item.id === abilityId)
  if (ability?.geometry?.shape !== expectedShape) errors.push(`${abilityId}: expected ${expectedShape} geometry`)
}

const nonAreaAbilityIds = ['sage-3', 'sage-4', 'cypher-4', 'reyna-2', 'reyna-3', 'reyna-4', 'chamber-2', 'chamber-4', 'jett-4', 'neon-4', 'skye-1', 'skye-4', 'sova-1', 'tejo-1']
for (const abilityId of nonAreaAbilityIds) {
  const ability = playbookAbilities.find((item) => item.id === abilityId)
  if (ability?.geometry?.shape !== 'point') errors.push(`${abilityId}: non-area ability must use point geometry`)
}

const sampleTeam = [
  { type: 'agent', agentId: 'jett', side: 'attacker' },
  { type: 'agent', agentId: 'sage', side: 'attacker' },
  { type: 'agent', agentId: 'sova', side: 'attacker' },
  { type: 'agent', agentId: 'omen', side: 'attacker' },
  { type: 'agent', agentId: 'cypher', side: 'attacker' },
]
if (playbookAgentPlacementIssue(sampleTeam, 'jett', 'attacker') !== 'duplicate') errors.push('playbook team rules must reject duplicate agents on the same side')
if (playbookAgentPlacementIssue(sampleTeam, 'raze', 'attacker') !== 'full') errors.push('playbook team rules must cap each side at five agents')
if (playbookAgentPlacementIssue(sampleTeam, 'jett', 'defender') !== null) errors.push('playbook team rules must allow mirrored agents on opposite sides')

for (const map of valorantMaps) {
  if (!map.names?.['zh-CN'] || !map.names?.ja) errors.push(`${map.id}: missing localized map name`)
  const assetPath = fileURLToPath(new URL(`../public${map.asset}`, import.meta.url))
  if (!existsSync(assetPath)) errors.push(`${map.id}: missing playbook map asset ${map.asset}`)
}

if (errors.length) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`Validated ${cases.length} generated profiles, ${crosshairs.length} database codes, ${playbookAgents.length} localized agents with ${playbookAgents.length * 4} ability geometries, ${valorantMaps.length} localized maps, and decoder rejection cases.`)
