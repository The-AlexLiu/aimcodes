import AgentAbilityPage from './AgentAbilityPage.jsx'
import { GEKKO_IMAGE, GEKKO_CINEMATIC, gekkoArticleCopy } from '../seo/gekkoContent.js'
import { GEKKO_CROSSHAIR } from '../data/gekkoCrosshair.js'
import './gekkoAgent.css'

export default function GekkoAgentPage({ locale, onCopy }) {
  return <AgentAbilityPage locale={locale} onCopy={onCopy} copy={gekkoArticleCopy(locale)} theme="gekko" image={GEKKO_IMAGE} cinematic={GEKKO_CINEMATIC} cinematicId="iYFh_XAXSPk" crosshair={GEKKO_CROSSHAIR} />
}
