import AgentAbilityPage from './AgentAbilityPage.jsx'
import { SOVA_IMAGE, SOVA_CINEMATIC, sovaArticleCopy } from '../seo/sovaContent.js'
import { SOVA_CROSSHAIR } from '../data/sovaCrosshair.js'
import './sovaAgent.css'

export default function SovaAgentPage({ locale, onCopy }) {
  return <AgentAbilityPage locale={locale} onCopy={onCopy} copy={sovaArticleCopy(locale)} theme="sova" image={SOVA_IMAGE} cinematic={SOVA_CINEMATIC} cinematicId="q2eLOupmraQ" crosshair={SOVA_CROSSHAIR} />
}
