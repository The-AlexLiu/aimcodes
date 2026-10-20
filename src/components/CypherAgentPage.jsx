import AgentAbilityPage from './AgentAbilityPage.jsx'
import { CYPHER_IMAGE, CYPHER_CINEMATIC, cypherArticleCopy } from '../seo/cypherContent.js'
import { CYPHER_CROSSHAIR } from '../data/cypherCrosshair.js'
import './cypherAgent.css'

export default function CypherAgentPage({ locale, onCopy }) {
  return <AgentAbilityPage locale={locale} onCopy={onCopy} copy={cypherArticleCopy(locale)} theme="cypher" image={CYPHER_IMAGE} cinematic={CYPHER_CINEMATIC} cinematicId="9N_iC-Yc0FA" crosshair={CYPHER_CROSSHAIR} />
}
