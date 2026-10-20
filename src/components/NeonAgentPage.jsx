import AgentAbilityPage from './AgentAbilityPage.jsx'
import { NEON_IMAGE, NEON_CINEMATIC, neonArticleCopy } from '../seo/neonContent.js'
import { NEON_CROSSHAIR } from '../data/neonCrosshair.js'
import './neonAgent.css'

export default function NeonAgentPage({ locale, onCopy }) {
  return <AgentAbilityPage locale={locale} onCopy={onCopy} copy={neonArticleCopy(locale)} theme="neon" image={NEON_IMAGE} cinematic={NEON_CINEMATIC} cinematicId="dtx8CgjRmqE" crosshair={NEON_CROSSHAIR} />
}
