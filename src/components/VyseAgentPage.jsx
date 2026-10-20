import AgentAbilityPage from './AgentAbilityPage.jsx'
import { VYSE_IMAGE, VYSE_CINEMATIC, vyseArticleCopy } from '../seo/vyseContent.js'
import { VYSE_CROSSHAIR } from '../data/vyseCrosshair.js'
import './vyseAgent.css'

export default function VyseAgentPage({ locale, onCopy }) {
  return <AgentAbilityPage locale={locale} onCopy={onCopy} copy={vyseArticleCopy(locale)} theme="vyse" image={VYSE_IMAGE} cinematic={VYSE_CINEMATIC} cinematicId="btpWg1gDXIE" crosshair={VYSE_CROSSHAIR} />
}
