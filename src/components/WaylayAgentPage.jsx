import AgentAbilityPage from './AgentAbilityPage.jsx'
import { WAYLAY_IMAGE, WAYLAY_CINEMATIC, waylayArticleCopy } from '../seo/waylayContent.js'
import { WAYLAY_CROSSHAIR } from '../data/waylayCrosshair.js'
import './waylayAgent.css'

export default function WaylayAgentPage({ locale, onCopy }) {
  return <AgentAbilityPage locale={locale} onCopy={onCopy} copy={waylayArticleCopy(locale)} theme="waylay" image={WAYLAY_IMAGE} cinematic={WAYLAY_CINEMATIC} cinematicId="OHzUoFKPUB0" crosshair={WAYLAY_CROSSHAIR} />
}
