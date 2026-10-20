import AgentAbilityPage from './AgentAbilityPage.jsx'
import { REYNA_IMAGE, REYNA_CINEMATIC, reynaArticleCopy } from '../seo/reynaContent.js'
import { REYNA_CROSSHAIR } from '../data/reynaCrosshair.js'
import './reynaAgent.css'

export default function ReynaAgentPage({ locale, onCopy }) {
  return <AgentAbilityPage locale={locale} onCopy={onCopy} copy={reynaArticleCopy(locale)} theme="reyna" image={REYNA_IMAGE} cinematic={REYNA_CINEMATIC} cinematicId="PlpqhZiumDM" crosshair={REYNA_CROSSHAIR} />
}
