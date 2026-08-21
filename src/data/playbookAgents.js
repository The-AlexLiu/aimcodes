const agentRows = [
  ['jett', 'Jett', 'Jett', 'duelist', ['Cloudburst', 'Updraft', 'Tailwind', 'Blade Storm']],
  ['raze', 'Raze', 'Raze', 'duelist', ['Boom Bot', 'Blast Pack', 'Paint Shells', 'Showstopper']],
  ['phoenix', 'Phoenix', 'Phoenix', 'duelist', ['Blaze', 'Hot Hands', 'Curveball', 'Run It Back']],
  ['yoru', 'Yoru', 'Yoru', 'duelist', ['Fakeout', 'Blindside', 'Gatecrash', 'Dimensional Drift']],
  ['neon', 'Neon', 'Neon', 'duelist', ['Fast Lane', 'Relay Bolt', 'High Gear', 'Overdrive']],
  ['reyna', 'Reyna', 'Reyna', 'duelist', ['Leer', 'Devour', 'Dismiss', 'Empress']],
  ['iso', 'Iso', 'Iso', 'duelist', ['Contingency', 'Undercut', 'Double Tap', 'Kill Contract']],
  ['waylay', 'Waylay', 'Waylay', 'duelist', ['Saturate', 'Lightspeed', 'Refract', 'Convergent Paths']],
  ['sova', 'Sova', 'Sova', 'initiator', ['Owl Drone', 'Shock Bolt', 'Recon Bolt', "Hunter's Fury"]],
  ['breach', 'Breach', 'Breach', 'initiator', ['Aftershock', 'Flashpoint', 'Fault Line', 'Rolling Thunder']],
  ['skye', 'Skye', 'Skye', 'initiator', ['Regrowth', 'Trailblazer', 'Guiding Light', 'Seekers']],
  ['kayo', 'Kayo', 'KAY/O', 'initiator', ['FRAG/ment', 'FLASH/drive', 'ZERO/point', 'NULL/cmd']],
  ['fade', 'Fade', 'Fade', 'initiator', ['Prowler', 'Seize', 'Haunt', 'Nightfall']],
  ['gekko', 'Gekko', 'Gekko', 'initiator', ['Mosh Pit', 'Wingman', 'Dizzy', 'Thrash']],
  ['tejo', 'Tejo', 'Tejo', 'initiator', ['Stealth Drone', 'Special Delivery', 'Guided Salvo', 'Armageddon']],
  ['astra', 'Astra', 'Astra', 'controller', ['Gravity Well', 'Nova Pulse', 'Nebula / Dissipate', 'Cosmic Divide']],
  ['viper', 'Viper', 'Viper', 'controller', ['Snake Bite', 'Poison Cloud', 'Toxic Screen', "Viper's Pit"]],
  ['brimstone', 'Brimstone', 'Brimstone', 'controller', ['Stim Beacon', 'Incendiary', 'Sky Smoke', 'Orbital Strike']],
  ['omen', 'Omen', 'Omen', 'controller', ['Shrouded Step', 'Paranoia', 'Dark Cover', 'From the Shadows']],
  ['harbor', 'Harbor', 'Harbor', 'controller', ['Cascade', 'High Tide', 'Cove', 'Reckoning']],
  ['clove', 'Clove', 'Clove', 'controller', ['Pick-me-up', 'Meddle', 'Ruse', 'Not Dead Yet']],
  ['miks', 'Miks', 'Miks', 'controller', ['M-Pulse Concuss', 'M-Pulse Healing', 'Harmonize', 'Waveform']],
  ['killjoy', 'Killjoy', 'Killjoy', 'sentinel', ['Nanoswarm', 'Alarmbot', 'Turret', 'Lockdown']],
  ['cypher', 'Cypher', 'Cypher', 'sentinel', ['Trapwire', 'Cyber Cage', 'Spycam', 'Neural Theft']],
  ['sage', 'Sage', 'Sage', 'sentinel', ['Barrier Orb', 'Slow Orb', 'Healing Orb', 'Resurrection']],
  ['chamber', 'Chamber', 'Chamber', 'sentinel', ['Trademark', 'Headhunter', 'Rendezvous', 'Tour De Force']],
  ['deadlock', 'Deadlock', 'Deadlock', 'sentinel', ['Barrier Mesh', 'Sonic Sensor', 'GravNet', 'Annihilation']],
  ['vyse', 'Vyse', 'Vyse', 'sentinel', ['Razorvine', 'Shear', 'Arc Rose', 'Steel Garden']],
  ['veto', 'Veto', 'Veto', 'sentinel', ['Crosscut', 'Chokehold', 'Interceptor', 'Evolution']],
]

const localizedAgentNames = Object.freeze({
  jett: { 'zh-CN': '捷风', ja: 'ジェット' },
  raze: { 'zh-CN': '雷兹', ja: 'レイズ' },
  phoenix: { 'zh-CN': '不死鸟', ja: 'フェニックス' },
  yoru: { 'zh-CN': '夜露', ja: 'ヨル' },
  neon: { 'zh-CN': '霓虹', ja: 'ネオン' },
  reyna: { 'zh-CN': '芮娜', ja: 'レイナ' },
  iso: { 'zh-CN': '壹决', ja: 'アイソ' },
  waylay: { 'zh-CN': '幻棱', ja: 'ウェイレイ' },
  sova: { 'zh-CN': '猎枭', ja: 'ソーヴァ' },
  breach: { 'zh-CN': '铁臂', ja: 'ブリーチ' },
  skye: { 'zh-CN': '斯凯', ja: 'スカイ' },
  kayo: { 'zh-CN': 'K/O', ja: 'KAY/O' },
  fade: { 'zh-CN': '黑梦', ja: 'フェイド' },
  gekko: { 'zh-CN': '盖可', ja: 'ゲッコー' },
  tejo: { 'zh-CN': '钛狐', ja: 'テホ' },
  astra: { 'zh-CN': '星礈', ja: 'アストラ' },
  viper: { 'zh-CN': '蝰蛇', ja: 'ヴァイパー' },
  brimstone: { 'zh-CN': '炼狱', ja: 'ブリムストーン' },
  omen: { 'zh-CN': '幽影', ja: 'オーメン' },
  harbor: { 'zh-CN': '海神', ja: 'ハーバー' },
  clove: { 'zh-CN': '暮蝶', ja: 'クローヴ' },
  miks: { 'zh-CN': '迷核', ja: 'ミクス' },
  killjoy: { 'zh-CN': '奇乐', ja: 'キルジョイ' },
  cypher: { 'zh-CN': '零', ja: 'サイファー' },
  sage: { 'zh-CN': '贤者', ja: 'セージ' },
  chamber: { 'zh-CN': '尚勃勒', ja: 'チェンバー' },
  deadlock: { 'zh-CN': '钢锁', ja: 'デッドロック' },
  vyse: { 'zh-CN': '维斯', ja: 'ヴァイス' },
  veto: { 'zh-CN': '禁灭', ja: 'ヴィトー' },
})

// Geometry follows the same visual vocabulary used by Icarus: deployable
// points, circular areas, walls, directional corridors, tripwires and meshes.
// Values are normalized to the 1000 x 1000 tactical-board coordinate space.
const abilityGeometry = Object.freeze({
  'jett-1': { shape: 'radius', size: 72 },
  'raze-2': { shape: 'radius', size: 56 }, 'raze-3': { shape: 'radius', size: 92 }, 'raze-4': { shape: 'cone', size: 150 },
  'phoenix-1': { shape: 'wall', length: 180, width: 22 }, 'phoenix-2': { shape: 'radius', size: 88 },
  'neon-1': { shape: 'corridor', length: 190, width: 70 }, 'neon-2': { shape: 'radius', size: 74 },
  'reyna-1': { shape: 'cone', size: 110 },
  'iso-1': { shape: 'wall', length: 150, width: 24 }, 'iso-2': { shape: 'cone', size: 120 }, 'iso-4': { shape: 'rectangle', length: 170, width: 92 },
  'waylay-1': { shape: 'radius', size: 100 }, 'waylay-4': { shape: 'cone', size: 170 },
  'sova-1': { shape: 'point' }, 'sova-2': { shape: 'radius', size: 72 }, 'sova-3': { shape: 'radius', size: 125 }, 'sova-4': { shape: 'corridor', length: 210, width: 34 },
  'breach-1': { shape: 'cone', size: 105 }, 'breach-3': { shape: 'corridor', length: 185, width: 48 }, 'breach-4': { shape: 'cone', size: 190 },
  'skye-1': { shape: 'point' }, 'skye-2': { shape: 'point' }, 'skye-3': { shape: 'point' }, 'skye-4': { shape: 'point' },
  'kayo-1': { shape: 'radius', size: 92 }, 'kayo-3': { shape: 'radius', size: 125 }, 'kayo-4': { shape: 'radius', size: 165 },
  'fade-2': { shape: 'radius', size: 92 }, 'fade-3': { shape: 'radius', size: 122 }, 'fade-4': { shape: 'cone', size: 190 },
  'gekko-1': { shape: 'radius', size: 105 }, 'gekko-3': { shape: 'cone', size: 110 },
  'tejo-1': { shape: 'point' }, 'tejo-2': { shape: 'radius', size: 72 }, 'tejo-3': { shape: 'radius', size: 94 }, 'tejo-4': { shape: 'corridor', length: 210, width: 52 },
  'astra-1': { shape: 'radius', size: 112 }, 'astra-2': { shape: 'radius', size: 82 }, 'astra-3': { shape: 'radius', size: 105 }, 'astra-4': { shape: 'wall', length: 220, width: 18 },
  'viper-1': { shape: 'radius', size: 88 }, 'viper-2': { shape: 'radius', size: 104 }, 'viper-3': { shape: 'wall', length: 220, width: 20 }, 'viper-4': { shape: 'radius', size: 190 },
  'brimstone-1': { shape: 'radius', size: 104 }, 'brimstone-2': { shape: 'radius', size: 92 }, 'brimstone-3': { shape: 'radius', size: 108 }, 'brimstone-4': { shape: 'radius', size: 175 },
  'omen-2': { shape: 'corridor', length: 180, width: 34 }, 'omen-3': { shape: 'radius', size: 112 },
  'harbor-1': { shape: 'wall', length: 150, width: 28 }, 'harbor-2': { shape: 'wall', length: 220, width: 20 }, 'harbor-3': { shape: 'radius', size: 118 }, 'harbor-4': { shape: 'radius', size: 170 },
  'clove-2': { shape: 'radius', size: 92 }, 'clove-3': { shape: 'radius', size: 108 },
  'miks-1': { shape: 'radius', size: 92 }, 'miks-2': { shape: 'radius', size: 92 }, 'miks-3': { shape: 'radius', size: 122 }, 'miks-4': { shape: 'wall', length: 190, width: 28 },
  'killjoy-1': { shape: 'radius', size: 92 }, 'killjoy-2': { shape: 'radius', size: 105 }, 'killjoy-3': { shape: 'cone', size: 118 }, 'killjoy-4': { shape: 'radius', size: 188 },
  'cypher-1': { shape: 'tripwire', length: 170, width: 12 }, 'cypher-2': { shape: 'radius', size: 92 }, 'cypher-4': { shape: 'point' },
  'sage-1': { shape: 'wall', length: 175, width: 24 }, 'sage-2': { shape: 'radius', size: 118 },
  'chamber-1': { shape: 'radius', size: 112 }, 'chamber-3': { shape: 'radius', size: 145 },
  'deadlock-1': { shape: 'mesh', size: 155 }, 'deadlock-2': { shape: 'rectangle', length: 118, width: 90 }, 'deadlock-3': { shape: 'net', size: 115 }, 'deadlock-4': { shape: 'cone', size: 180 },
  'vyse-1': { shape: 'radius', size: 102 }, 'vyse-2': { shape: 'wall', length: 145, width: 20 }, 'vyse-3': { shape: 'cone', size: 105 }, 'vyse-4': { shape: 'radius', size: 170 },
  'veto-2': { shape: 'radius', size: 92 }, 'veto-3': { shape: 'radius', size: 120 },
})

export const playbookAgentRoles = Object.freeze(['duelist', 'initiator', 'controller', 'sentinel'])

export const playbookAgents = Object.freeze(agentRows.map(([id, folder, name, role, abilityNames]) => Object.freeze({
  id,
  folder,
  name,
  names: Object.freeze({ en: name, es: name, 'pt-BR': name, ...localizedAgentNames[id] }),
  role,
  asset: `/images/playbook/agents/${folder}/icon.webp`,
  abilities: Object.freeze(abilityNames.map((abilityName, index) => Object.freeze({
    id: `${id}-${index + 1}`,
    name: abilityName,
    slot: ['C', 'Q', 'E', 'X'][index],
    asset: `/images/playbook/agents/${folder}/${index + 1}.webp`,
    geometry: Object.freeze(abilityGeometry[`${id}-${index + 1}`] || { shape: 'point' }),
  }))),
})))

export function playbookAgentName(agent, locale) {
  return agent.names?.[locale] || agent.name
}

export function playbookAbilityName(ability, locale) {
  if (locale === 'en') return ability.name
  if (locale === 'es') return `Habilidad ${ability.slot}`
  if (locale === 'pt-BR') return `Habilidade ${ability.slot}`
  if (locale === 'zh-CN') return `${ability.slot} 技能`
  if (locale === 'ja') return `${ability.slot}アビリティ`
  return ability.name
}

// A VALORANT team has five unique agents. Keep this rule in one pure helper so
// the board UI and validation script cannot drift apart.
export function playbookAgentPlacementIssue(elements, agentId, side) {
  const sideAgents = elements.filter((element) => element.type === 'agent' && element.side === side)
  if (sideAgents.some((element) => element.agentId === agentId)) return 'duplicate'
  if (sideAgents.length >= 5) return 'full'
  return null
}
