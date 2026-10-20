import AgentAbilityPage from './AgentAbilityPage.jsx'
import { ASTRA_IMAGE, ASTRA_CINEMATIC, astraArticleCopy } from '../seo/astraContent.js'
import { ASTRA_CROSSHAIR } from '../data/astraCrosshair.js'
import './astraAgent.css'

export default function AstraAgentPage({ locale, onCopy }) {
  return <AgentAbilityPage locale={locale} onCopy={onCopy} copy={astraArticleCopy(locale)} theme="astra" image={ASTRA_IMAGE} cinematic={ASTRA_CINEMATIC} cinematicId="-ylVnuPWlJM" crosshair={ASTRA_CROSSHAIR} />
}
