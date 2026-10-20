import AgentAbilityPage from './AgentAbilityPage.jsx'
import { DEADLOCK_IMAGE, DEADLOCK_CINEMATIC, deadlockArticleCopy } from '../seo/deadlockContent.js'
import { DEADLOCK_CROSSHAIR } from '../data/deadlockCrosshair.js'
import './deadlockAgent.css'

export default function DeadlockAgentPage({ locale, onCopy }) {
  return <AgentAbilityPage locale={locale} onCopy={onCopy} copy={deadlockArticleCopy(locale)} theme="deadlock" image={DEADLOCK_IMAGE} cinematic={DEADLOCK_CINEMATIC} cinematicId="sUoSPryMZr0" crosshair={DEADLOCK_CROSSHAIR} />
}
