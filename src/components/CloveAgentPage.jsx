import AgentAbilityPage from './AgentAbilityPage.jsx'
import { CLOVE_IMAGE, CLOVE_CINEMATIC, cloveArticleCopy } from '../seo/cloveContent.js'
import { CLOVE_CROSSHAIR } from '../data/cloveCrosshair.js'
import './cloveAgent.css'

export default function CloveAgentPage({ locale, onCopy }) {
  return <AgentAbilityPage locale={locale} onCopy={onCopy} copy={cloveArticleCopy(locale)} theme="clove" image={CLOVE_IMAGE} cinematic={CLOVE_CINEMATIC} cinematicId="QL0LUaxWUOI" crosshair={CLOVE_CROSSHAIR} />
}
