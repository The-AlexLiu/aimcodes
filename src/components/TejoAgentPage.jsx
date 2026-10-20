import AgentAbilityPage from './AgentAbilityPage.jsx'
import { TEJO_IMAGE, TEJO_CINEMATIC, tejoArticleCopy } from '../seo/tejoContent.js'
import { TEJO_CROSSHAIR } from '../data/tejoCrosshair.js'
import './tejoAgent.css'

export default function TejoAgentPage({ locale, onCopy }) {
  return <AgentAbilityPage locale={locale} onCopy={onCopy} copy={tejoArticleCopy(locale)} theme="tejo" image={TEJO_IMAGE} cinematic={TEJO_CINEMATIC} cinematicId="dRuRID5JoQY" crosshair={TEJO_CROSSHAIR} />
}
