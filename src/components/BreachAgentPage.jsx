import AgentAbilityPage from './AgentAbilityPage.jsx'
import { BREACH_IMAGE, BREACH_CINEMATIC, breachArticleCopy } from '../seo/breachContent.js'
import { BREACH_CROSSHAIR } from '../data/breachCrosshair.js'
import './breachAgent.css'

export default function BreachAgentPage({ locale, onCopy }) {
  return <AgentAbilityPage locale={locale} onCopy={onCopy} copy={breachArticleCopy(locale)} theme="breach" image={BREACH_IMAGE} cinematic={BREACH_CINEMATIC} cinematicId="6nKzziP2lxw" crosshair={BREACH_CROSSHAIR} />
}
