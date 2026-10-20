import { SEO_ARTICLES } from '../seo/routes.js'
import { playbookAgents, playbookAgentName } from './playbookAgents.js'

// Published hero pages only. New entries belong here; home slots stay editorial.
export const agentDirectory = Object.freeze([
  ...playbookAgents.filter(({ id }) => SEO_ARTICLES[id]).map(({ id, names, name, role }) => Object.freeze({ id, names, name, role, image: `/images/agents/collection/${id}.webp` })),
  Object.freeze({ id: 'hush', name: 'Hush', names: { en: 'Hush', es: 'Hush', 'pt-BR': 'Hush', 'zh-CN': '遐思', ja: 'ハッシュ' }, role: 'duelist', image: '/images/agents/hush/reveal.webp' }),
])

export const HOME_AGENT_IDS = Object.freeze(['jett', 'sage', 'omen', 'raze', 'sova', 'chamber', 'viper', 'phoenix', 'cypher', 'reyna', 'skye', 'yoru'])
export const featuredAgents = Object.freeze(HOME_AGENT_IDS.map((id) => agentDirectory.find((agent) => agent.id === id)))
export const agentName = playbookAgentName
export const agentRoles = Object.freeze(['duelist', 'initiator', 'controller', 'sentinel'])

function normalizeSearch(value) {
  return String(value).normalize('NFKC').toLocaleLowerCase().replace(/[\s/·-]/g, '')
}

export function filterAgents(locale, query = '', role = 'all') {
  const needle = normalizeSearch(query.trim())
  return agentDirectory.filter((agent) => (role === 'all' || agent.role === role)
    && (!needle || [agent.id, agentName(agent, locale), ...Object.values(agent.names)].some((name) => normalizeSearch(name).includes(needle))))
}
