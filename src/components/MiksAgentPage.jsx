import AgentAbilityPage from './AgentAbilityPage.jsx'
import { MIKS_IMAGE, MIKS_CINEMATIC, miksArticleCopy } from '../seo/miksContent.js'
import { MIKS_CROSSHAIR } from '../data/miksCrosshair.js'
import './miksAgent.css'

export default function MiksAgentPage({ locale, onCopy }) {
  return <AgentAbilityPage locale={locale} onCopy={onCopy} copy={miksArticleCopy(locale)} theme="miks" image={MIKS_IMAGE} cinematic={MIKS_CINEMATIC} cinematicId="gictwC-KlTk" crosshair={MIKS_CROSSHAIR} />
}
