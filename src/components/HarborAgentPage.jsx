import AgentAbilityPage from './AgentAbilityPage.jsx'
import { HARBOR_IMAGE, HARBOR_CINEMATIC, harborArticleCopy } from '../seo/harborContent.js'
import { HARBOR_CROSSHAIR } from '../data/harborCrosshair.js'
import './harborAgent.css'

export default function HarborAgentPage({ locale, onCopy }) {
  return <AgentAbilityPage locale={locale} onCopy={onCopy} copy={harborArticleCopy(locale)} theme="harbor" image={HARBOR_IMAGE} cinematic={HARBOR_CINEMATIC} cinematicId="qRao6FARFRo" crosshair={HARBOR_CROSSHAIR} />
}
