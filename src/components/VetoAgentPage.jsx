import AgentAbilityPage from './AgentAbilityPage.jsx'
import { VETO_IMAGE, VETO_CINEMATIC, vetoArticleCopy } from '../seo/vetoContent.js'
import { VETO_CROSSHAIR } from '../data/vetoCrosshair.js'
import './vetoAgent.css'

export default function VetoAgentPage({ locale, onCopy }) {
  return <AgentAbilityPage locale={locale} onCopy={onCopy} copy={vetoArticleCopy(locale)} theme="veto" image={VETO_IMAGE} cinematic={VETO_CINEMATIC} cinematicId="2FLY-gn-hGQ" crosshair={VETO_CROSSHAIR} />
}
