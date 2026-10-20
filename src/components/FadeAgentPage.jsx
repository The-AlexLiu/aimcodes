import AgentAbilityPage from './AgentAbilityPage.jsx'
import { FADE_IMAGE, FADE_CINEMATIC, fadeArticleCopy } from '../seo/fadeContent.js'
import { FADE_CROSSHAIR } from '../data/fadeCrosshair.js'
import './fadeAgent.css'

export default function FadeAgentPage({ locale, onCopy }) {
  return <AgentAbilityPage locale={locale} onCopy={onCopy} copy={fadeArticleCopy(locale)} theme="fade" image={FADE_IMAGE} cinematic={FADE_CINEMATIC} cinematicId="e7VOQ1l20eo" crosshair={FADE_CROSSHAIR} />
}
