import { useState } from 'react'
import { agentDirectory, agentDirectoryName, filterAgents } from '../data/agentsCollectionData.js'
import { agentsCopy } from '../seo/agentsCollectionContent.js'
import { routePath } from '../seo/routes.js'
import CrosshairCanvas from './CrosshairCanvas.jsx'
import SeoBreadcrumbs from './SeoBreadcrumbs.jsx'
import './agentsCollection.css'

export default function AgentsCollectionPage({ locale }) {
  const copy = agentsCopy(locale)
  const [selectedId, setSelectedId] = useState('jett')
  const [query, setQuery] = useState('')
  const [role, setRole] = useState('all')
  const selected = agentDirectory.find(agent => agent.id === selectedId)
  const selectedCopy = selected.copy(locale)
  const selectedName = agentDirectoryName(selected, locale)
  const selectedPath = routePath(locale, { type: 'article', articleKey: selected.id })
  const filtered = filterAgents(query, role, locale)
  const featured = ['jett', 'sage', 'omen', 'phoenix', 'hush'].map(id => agentDirectory.find(agent => agent.id === id))

  return <article className="agents-page">
    <SeoBreadcrumbs locale={locale} current={copy.directory} />
    <header className="agents-heading"><div><h1>{copy.title}</h1></div><p>{copy.intro}</p></header>
    <section className="agents-stage" style={{ '--agent-accent': selected.crosshair.color }} aria-label={copy.preview}>
      <img key={selected.id} className="agents-stage-art" src={selected.image} alt="" width="1920" height="1080" fetchPriority="high" />
      <div className="agents-stage-shade" />
      <div className="agents-stage-copy">
        <span className="agents-role"><span aria-hidden="true">◈</span> {copy.roles[selected.role]}</span>
        <h2>{selectedName}</h2>
        <p>{selectedCopy.intro}</p>
        <div className="agents-stage-abilities" aria-label={copy.abilities}>{selectedCopy.abilities.map((ability, index) => <span key={ability.key || index} title={ability.label || ability.name}><img src={ability.media?.icon || `/images/agents/${selected.id}/${ability.key}.webp`} alt={ability.label || ability.name} width="32" height="32" /></span>)}</div>
        <div className="agents-stage-actions"><a className="agents-primary" href={selectedPath}>{copy.view} <span aria-hidden="true">↗</span></a><a className="agents-secondary" href={`${selectedPath}#${selected.id}-crosshair-title`}>{copy.crosshair} <span aria-hidden="true">↗</span></a></div>
      </div>
      <div className="agents-stage-crosshair"><CrosshairCanvas crosshair={selected.crosshair} scale={3} label={copy.signature} /><span>{copy.signature}</span></div>
      <div className="agents-featured" aria-label={copy.preview}>{featured.map(agent => <button key={agent.id} type="button" aria-pressed={selectedId === agent.id} onClick={() => setSelectedId(agent.id)} style={{ '--agent-accent': agent.crosshair.color }}><img src={agent.asset} alt="" width="48" height="48" /><span>{agentDirectoryName(agent, locale)}</span></button>)}</div>
    </section>
    <section className="agents-directory" aria-labelledby="agents-roster-title">
      <div className="agents-directory-heading"><h2 id="agents-roster-title">{copy.directory}<span>{String(agentDirectory.length).padStart(2, '0')}</span></h2><label className="agents-search"><span aria-hidden="true">⌕</span><input type="search" value={query} onChange={event => setQuery(event.target.value)} placeholder={copy.search} aria-label={copy.search} /></label></div>
      <div className="agents-filter-row"><div className="agents-filters" aria-label={copy.directory}>{['all', ...Object.keys(copy.roles)].map(key => <button key={key} type="button" aria-pressed={role === key} onClick={() => setRole(key)}>{key === 'all' ? copy.all : copy.roles[key]}</button>)}</div><span className="agents-count" role="status">{filtered.length} {copy.results}</span></div>
      {filtered.length ? <div className="agents-grid">{filtered.map((agent) => {
        const name = agentDirectoryName(agent, locale)
        return <a key={agent.id} className="agents-card" href={routePath(locale, { type: 'article', articleKey: agent.id })} style={{ '--agent-accent': agent.crosshair.color }}>
          <div className="agents-card-art"><img src={agent.portrait} alt="" width="480" height="640" loading="lazy" /><span className="agents-card-crosshair" aria-hidden="true"><CrosshairCanvas crosshair={agent.crosshair} scale={2} label={copy.signature} /></span></div>
          <div className="agents-card-info"><div><span>{copy.roles[agent.role]}</span><h3>{name}</h3></div><span className="agents-card-arrow" aria-hidden="true">↗</span></div>
        </a>
      })}</div> : <div className="agents-empty"><p>{copy.empty}</p><button type="button" onClick={() => { setQuery(''); setRole('all') }}>{copy.clear}</button></div>}
    </section>
  </article>
}
