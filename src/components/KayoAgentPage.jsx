import AgentAbilityPage from './AgentAbilityPage.jsx'
import { KAYO_IMAGE, KAYO_CINEMATIC, kayoArticleCopy } from '../seo/kayoContent.js'
import { KAYO_CROSSHAIR } from '../data/kayoCrosshair.js'
import './kayoAgent.css'

export default function KayoAgentPage({ locale, onCopy }) {
  return <AgentAbilityPage locale={locale} onCopy={onCopy} copy={kayoArticleCopy(locale)} theme="kayo" image={KAYO_IMAGE} cinematic={KAYO_CINEMATIC} cinematicId="eU1l7eBy2_Y" crosshair={KAYO_CROSSHAIR} />
}
