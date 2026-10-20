import { featuredAgents, agentName } from '../data/agentDirectory.js'
import { agentsCopy } from '../seo/agentsContent.js'
import { routePath } from '../seo/routes.js'
import './agentDirectory.css'

const tones = ['#9adce6', '#9edbc5', '#9c9fe2', '#e8aa72', '#a6c6e5', '#d7bd7b', '#b0d16d', '#eead78', '#d3c4a2', '#c58cda', '#b8ce86', '#8ca9e5']

export default function HomeAgentSection({ locale }) {
  const copy = agentsCopy(locale)
  return (
    <section className="home-agents" aria-labelledby="home-agents-title">
      <header className="home-agents-heading">
        <div><h2 id="home-agents-title">{copy.homeTitle}</h2><p>{copy.intro}</p></div>
        <a className="home-agents-all" href={routePath(locale, { type: 'agents' })}>{copy.viewAll}<span aria-hidden="true"> ↗</span></a>
      </header>
      <div className="home-agents-window" role="region" aria-label={copy.homeTitle}>
        {[featuredAgents.slice(0, 6), featuredAgents.slice(6)].map((row, rowIndex) => <div className="home-agents-lane" key={rowIndex}><div className="home-agents-track">
          {[false, true].map(duplicate => <div className="home-agents-row" key={String(duplicate)} aria-hidden={duplicate || undefined}>{row.map((agent, index) => <a className="home-agent-tile" key={agent.id} href={routePath(locale, { type: 'article', articleKey: agent.id })} style={{ '--agent-tone': tones[rowIndex * 6 + index] }} tabIndex={duplicate ? -1 : undefined}>

            <img src={`/images/agents/home/${agent.id}.png`} width="2048" height="1860" alt="" loading="lazy" />
            <div className="home-agent-label"><span>{copy.roles[agent.role]}</span><h3>{agentName(agent, locale)}</h3></div><span className="home-agent-arrow" aria-hidden="true">↗</span>
          </a>)}</div>)}
        </div></div>)}
      </div>

    </section>
  )
}
