import AgentAbilityPage from './AgentAbilityPage.jsx'
import { SKYE_IMAGE, SKYE_CINEMATIC, skyeArticleCopy } from '../seo/skyeContent.js'
import { SKYE_CROSSHAIR } from '../data/skyeCrosshair.js'
import './skyeAgent.css'

export default function SkyeAgentPage({ locale, onCopy }) {
  return <AgentAbilityPage locale={locale} onCopy={onCopy} copy={skyeArticleCopy(locale)} theme="skye" image={SKYE_IMAGE} cinematic={SKYE_CINEMATIC} cinematicId="C3QTyMXi-WE" crosshair={SKYE_CROSSHAIR} />
}
