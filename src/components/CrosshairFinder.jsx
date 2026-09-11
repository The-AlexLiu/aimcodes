import { useEffect, useMemo, useRef, useState } from 'react'
import CrosshairCanvas from './CrosshairCanvas.jsx'
import Icon from './Icon.jsx'
import { crosshairColorPresets, previewBackgroundOptions } from '../data/previewOptions.js'
import { parseCrosshairCode, updateCrosshairColor } from '../utils/crosshairCode.js'
import {
  getReactionRank,
  getReactionRecommendation,
  isValidReactionTime,
  MIN_REACTION_MS,
  MAX_REACTION_MS,
  REACTION_CALIBRATION_VERSION,
  REACTION_RANKS,
  REACTION_ROUNDS,
} from '../utils/reactionRecommendation.js'
import { createResultShareCard } from '../utils/shareResultCard.js'
import { trackEvent, trackShareSuccess } from '../utils/analytics.js'
import { canShareData, copyText, downloadBlob, isWeChatBrowser, shareData } from '../utils/share.js'
import useDialogA11y from '../hooks/useDialogA11y.js'
import {
  clearAimProfileHistory,
  createAimProfileAttempt,
  readAimProfileHistory,
  saveAimProfileHistory,
  summarizeAimProfile,
} from '../utils/aimProfile.js'
import { getAimProfileCopy } from '../i18n/aimProfileCopy.js'

const WAIT_MIN_MS = 1400
const WAIT_VARIANCE_MS = 1700
const FEEDBACK_MS = 1100
const RESULT_PREVIEW_SCALE = 2.25
const NATIVE_SHARE_TIMEOUT_MS = 8000

function withTimeout(promise, timeoutMs = NATIVE_SHARE_TIMEOUT_MS) {
  let timeoutId
  const timeout = new Promise((_, reject) => {
    timeoutId = window.setTimeout(() => {
      const error = new Error('native-share-timeout')
      error.name = 'TimeoutError'
      reject(error)
    }, timeoutMs)
  })
  return Promise.race([promise, timeout]).finally(() => window.clearTimeout(timeoutId))
}

function ReactionReticle() {
  return (
    <span className="reaction-reticle" aria-hidden="true">
      <i className="reaction-reticle-center" />
      <i className="reaction-reticle-top" />
      <i className="reaction-reticle-right" />
      <i className="reaction-reticle-bottom" />
      <i className="reaction-reticle-left" />
    </span>
  )
}

function ProgressDots({ completed, t }) {
  return (
    <div className="finder-progress-dots" role="progressbar" aria-valuemin="0" aria-valuemax={REACTION_ROUNDS} aria-valuenow={completed} aria-label={t('finder.progressLabel', { completed, total: REACTION_ROUNDS })}>
      {Array.from({ length: REACTION_ROUNDS }, (_, index) => (
        <span className={index < completed ? 'is-complete' : ''} key={index}>
          {index < completed && <Icon name="check" size={15} strokeWidth={2.6} />}
        </span>
      ))}
    </div>
  )
}

function formatRankRange(rank, t) {
  const unit = t('finder.millisecondsShort')
  if (!Number.isFinite(rank.max)) return `≥ ${rank.min} ${unit}`
  if (rank.min === 0) return `≤ ${rank.max} ${unit}`
  return `${rank.min}–${rank.max} ${unit}`
}

function readChallengeFromLocation() {
  if (typeof window === 'undefined') return null
  const parameters = new URLSearchParams(window.location.search)
  const score = Number.parseInt(parameters.get('challenge') || '', 10)
  if (!Number.isInteger(score) || score < MIN_REACTION_MS || score > MAX_REACTION_MS) return null
  const rank = getReactionRank(score)
  const requestedRank = parameters.get('rank')
  const isKnownRequestedRank = REACTION_RANKS.some((item) => item.id === requestedRank)
  return { score, rankId: rank.id, sharedRankId: isKnownRequestedRank ? requestedRank : '' }
}

function createChallengeUrl(result) {
  if (!result || typeof window === 'undefined') return ''
  const url = new URL(window.location.pathname, window.location.origin)
  url.searchParams.set('challenge', String(result.average))
  url.searchParams.set('rank', result.rank.id)
  url.searchParams.set('utm_source', 'share')
  url.searchParams.set('utm_medium', 'challenge')
  url.searchParams.set('utm_campaign', 'reaction_rank')
  return url.toString()
}

function getChallengeComparison(average, target) {
  const difference = Math.abs(average - target)
  if (average < target) return { outcome: 'won', difference }
  if (average > target) return { outcome: 'missed', difference }
  return { outcome: 'tied', difference: 0 }
}

function getNextFasterRank(rank) {
  const index = REACTION_RANKS.findIndex((item) => item.id === rank.id)
  return index > 0 ? REACTION_RANKS[index - 1] : null
}

function getReactionMarkerPosition(average) {
  const scaleMin = MIN_REACTION_MS
  const scaleMax = 650
  return Math.min(98, Math.max(2, ((average - scaleMin) / (scaleMax - scaleMin)) * 100))
}

function createAttemptId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') return crypto.randomUUID()
  return `attempt-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`
}

function getShareCardOptions({ result, resultCrosshair, challengeUrl, locale, t, format = 'portrait' }) {
  return {
    format,
    title: t('finder.shareCardTitle'),
    rankName: t(`finder.ranks.${result.rank.id}`),
    rankRange: formatRankRange(result.rank, t),
    average: result.average,
    unit: t('finder.millisecondsShort'),
    taunt: getAimProfileCopy(locale, `rankFeedback_${result.rank.id}`),
    pickLabel: t('finder.shareCardPick'),
    crosshair: resultCrosshair,
    footer: t('finder.shareCardFooter'),
    rankColor: result.rank.color,
    challengeTitle: getAimProfileCopy(locale, 'shareCardChallengeTitle', { average: result.average, unit: t('finder.millisecondsShort') }),
    challengeHint: getAimProfileCopy(locale, 'shareCardChallengeHint'),
    disclaimer: getAimProfileCopy(locale, 'shareCardDisclaimer'),
    challengeUrl,
  }
}

function ResultSharePreviewDialog({ previewUrl, onClose, locale }) {
  const dialogRef = useDialogA11y(onClose, '[data-share-preview-close]')
  const copy = (key) => getAimProfileCopy(locale, key)
  return (
    <div className="modal-backdrop finder-share-preview-backdrop" role="presentation" onMouseDown={onClose}>
      <section ref={dialogRef} className="finder-share-preview-dialog" role="dialog" aria-modal="true" aria-labelledby="finder-share-preview-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="finder-share-preview-dialog-heading">
          <div><span>{copy('sharePanelEyebrow')}</span><h2 id="finder-share-preview-title">{copy('previewShareCard')}</h2></div>
          <button data-share-preview-close className="icon-button" type="button" onClick={onClose} aria-label={copy('closeSharePreview')}><Icon name="x" /></button>
        </div>
        <img src={previewUrl} alt={copy('sharePreviewAlt')} />
      </section>
    </div>
  )
}

function AimProfilePanel({ summary, onClear, locale, t }) {
  if (!summary) return null
  const profileCopy = (key, variables) => getAimProfileCopy(locale, key, variables)
  const values = summary.recent.map((attempt) => attempt.average)
  const chartMin = Math.min(...values)
  const chartMax = Math.max(...values)
  const chartRange = Math.max(1, chartMax - chartMin)
  const points = values.map((value, index) => {
    const x = values.length === 1 ? 50 : (index / (values.length - 1)) * 100
    const y = 8 + ((value - chartMin) / chartRange) * 34
    return `${x},${y}`
  }).join(' ')
  const trendKey = !summary.hasTrendBaseline
    ? 'trendNotReady'
    : summary.trendDifference > 0
    ? 'trendImproved'
    : summary.trendDifference < 0
      ? 'trendSlower'
      : 'trendSteady'

  return (
    <section className="aim-profile-panel" aria-labelledby="aim-profile-title">
      <div className="aim-profile-heading">
        <div>
          <span>{profileCopy('eyebrow')}</span>
          <h2 id="aim-profile-title">{profileCopy('title')}</h2>
          <p>{profileCopy('localNote')}</p>
        </div>
        <div className="aim-profile-current" style={{ '--rank-color': summary.rank.color }}>
          <span>{profileCopy('currentRank')}</span>
          <strong>{t(`finder.ranks.${summary.rank.id}`)}</strong>
        </div>
      </div>

      <div className="aim-profile-body">
        <dl className="aim-profile-metrics">
          <div><dt>{profileCopy('tests')}</dt><dd>{summary.totalAttempts}</dd></div>
          <div><dt>{profileCopy('best')}</dt><dd>{summary.personalBest}<small>{t('finder.millisecondsShort')}</small></dd></div>
          <div><dt>{profileCopy('average')}</dt><dd>{summary.recentAverage}<small>{t('finder.millisecondsShort')}</small></dd></div>
          <div><dt>{profileCopy('stability')}</dt><dd>±{summary.averageConsistency}<small>{t('finder.millisecondsShort')}</small></dd></div>
        </dl>

        <div className="aim-profile-trend">
          <div>
            <span>{profileCopy('recentCount', { count: summary.recent.length })}</span>
            <strong className={summary.trendDifference > 0 ? 'is-improved' : summary.trendDifference < 0 ? 'is-slower' : ''}>
              {profileCopy(trendKey, { difference: Math.abs(summary.trendDifference), unit: t('finder.millisecondsShort') })}
            </strong>
          </div>
          <svg viewBox="0 0 100 50" role="img" aria-label={profileCopy('trendLabel')} preserveAspectRatio="none">
            <path d="M0 42H100" />
            <polyline points={points} />
            {values.map((value, index) => {
              const [x, y] = points.split(' ')[index].split(',')
              return <circle cx={x} cy={y} r="1.8" key={`${index}-${value}`} />
            })}
          </svg>
          <div className="aim-profile-trend-values" aria-hidden="true">
            {summary.recent.map((attempt) => <span key={attempt.id}>{attempt.average}</span>)}
          </div>
          <p className="aim-profile-history-scope">{profileCopy('historyScope')}</p>
        </div>
      </div>

      <button className="aim-profile-clear" type="button" onClick={onClear}>{profileCopy('clear')}</button>
    </section>
  )
}

export default function CrosshairFinder({ crosshairs, locale, onExit, onCopy, onFocusChange, t }) {
  const [phase, setPhase] = useState('intro')
  const [roundTimes, setRoundTimes] = useState([])
  const [earlyClicks, setEarlyClicks] = useState(0)
  const [lastReaction, setLastReaction] = useState(null)
  const [result, setResult] = useState(null)
  const [resultCode, setResultCode] = useState('')
  const [resultBackground, setResultBackground] = useState('ascent')
  const [resultCopied, setResultCopied] = useState(false)
  const [shareStatus, setShareStatus] = useState('idle')
  const [downloadStatus, setDownloadStatus] = useState('idle')
  const [copyStatus, setCopyStatus] = useState('idle')
  const [sharePreviewStatus, setSharePreviewStatus] = useState('idle')
  const [sharePreviewUrl, setSharePreviewUrl] = useState('')
  const [sharePreviewOpen, setSharePreviewOpen] = useState(false)
  const [aimProfileHistory, setAimProfileHistory] = useState(() => readAimProfileHistory())
  const readyAt = useRef(0)
  const readyFrame = useRef(null)
  const waitTimer = useRef(null)
  const readyTimer = useRef(null)
  const feedbackTimer = useRef(null)
  const copiedTimer = useRef(null)
  const shareTimer = useRef(null)
  const downloadTimer = useRef(null)
  const copyTimer = useRef(null)
  const shareCardBlob = useRef(null)
  const shareCardPromise = useRef(null)
  const sharePanelRef = useRef(null)
  const sharePanelViewAttemptId = useRef('')
  const attemptNumber = useRef(0)
  const attemptId = useRef('')
  const attemptStartedAt = useRef(0)
  const roundAttempt = useRef(0)
  const interactionKey = useRef('')
  const resultViewAttemptId = useRef('')
  const profileViewTracked = useRef(false)
  const startLock = useRef(false)
  const inputType = useRef('unknown')
  const resultTitleRef = useRef(null)
  const reactionFieldRef = useRef(null)
  const challenge = useMemo(() => readChallengeFromLocation(), [])
  const weChatBrowser = useMemo(() => isWeChatBrowser(), [])
  const nativeShareAvailable = useMemo(() => !weChatBrowser && typeof navigator !== 'undefined' && typeof navigator.share === 'function', [weChatBrowser])
  const isFocusedTest = ['waiting', 'arming', 'ready', 'early', 'invalid', 'timeout', 'feedback'].includes(phase)
  const aimProfileSummary = useMemo(() => summarizeAimProfile(aimProfileHistory), [aimProfileHistory])

  useEffect(() => {
    if (!challenge) return
    trackEvent('challenge_landing', {
      challenge_ms: challenge.score,
      challenge_rank: challenge.rankId,
      shared_rank: challenge.sharedRankId || challenge.rankId,
      calibration_version: REACTION_CALIBRATION_VERSION,
    })
  }, [challenge])

  useEffect(() => {
    onFocusChange?.(isFocusedTest)
  }, [isFocusedTest, onFocusChange])

  useEffect(() => () => onFocusChange?.(false), [onFocusChange])

  useEffect(() => {
    if (!aimProfileSummary || profileViewTracked.current) return
    profileViewTracked.current = true
    trackEvent('aim_profile_view', {
      history_count: aimProfileSummary.totalAttempts,
      reaction_rank: aimProfileSummary.rank.id,
      storage_scope: 'local',
      calibration_version: REACTION_CALIBRATION_VERSION,
    })
  }, [aimProfileSummary])

  const clearTimers = () => {
    if (waitTimer.current) window.clearTimeout(waitTimer.current)
    if (readyTimer.current) window.clearTimeout(readyTimer.current)
    if (feedbackTimer.current) window.clearTimeout(feedbackTimer.current)
    if (copiedTimer.current) window.clearTimeout(copiedTimer.current)
    if (shareTimer.current) window.clearTimeout(shareTimer.current)
    if (downloadTimer.current) window.clearTimeout(downloadTimer.current)
    if (copyTimer.current) window.clearTimeout(copyTimer.current)
    if (readyFrame.current) window.cancelAnimationFrame(readyFrame.current)
    waitTimer.current = null
    readyTimer.current = null
    feedbackTimer.current = null
    copiedTimer.current = null
    shareTimer.current = null
    downloadTimer.current = null
    copyTimer.current = null
    readyFrame.current = null
    readyAt.current = 0
  }

  useEffect(() => () => {
    if (waitTimer.current) window.clearTimeout(waitTimer.current)
    if (readyTimer.current) window.clearTimeout(readyTimer.current)
    if (feedbackTimer.current) window.clearTimeout(feedbackTimer.current)
    if (copiedTimer.current) window.clearTimeout(copiedTimer.current)
    if (shareTimer.current) window.clearTimeout(shareTimer.current)
    if (downloadTimer.current) window.clearTimeout(downloadTimer.current)
    if (copyTimer.current) window.clearTimeout(copyTimer.current)
    if (readyFrame.current) window.cancelAnimationFrame(readyFrame.current)
  }, [])

  useEffect(() => {
    interactionKey.current = ''
  }, [phase])

  useEffect(() => {
    if (phase !== 'waiting') return undefined
    const delay = WAIT_MIN_MS + Math.round(Math.random() * WAIT_VARIANCE_MS)
    waitTimer.current = window.setTimeout(() => {
      waitTimer.current = null
      setPhase('arming')
    }, delay)
    return () => {
      if (waitTimer.current) window.clearTimeout(waitTimer.current)
      waitTimer.current = null
    }
  }, [phase, roundTimes.length])

  useEffect(() => {
    if (phase !== 'arming') return undefined
    readyFrame.current = window.requestAnimationFrame((timestamp) => {
      readyFrame.current = null
      readyAt.current = timestamp
      setPhase('ready')
    })
    return () => {
      if (readyFrame.current) window.cancelAnimationFrame(readyFrame.current)
      readyFrame.current = null
    }
  }, [phase])

  const primaryRecommendation = useMemo(() => {
    if (!result) return null
    return crosshairs.find((item) => item.id === result.id) || null
  }, [crosshairs, result])

  const activeBackground = previewBackgroundOptions.find((item) => item.value === resultBackground) || previewBackgroundOptions[0]
  const activeBackgroundName = t(`maps.${activeBackground.value}`)

  const resultCrosshair = useMemo(() => {
    if (!primaryRecommendation) return null
    const code = resultCode || primaryRecommendation.code
    try {
      const parsed = parseCrosshairCode(code, { fallbackColor: primaryRecommendation.color })
      return { ...primaryRecommendation, code, color: parsed.color, colorKey: parsed.colorKey }
    } catch {
      return { ...primaryRecommendation, code }
    }
  }, [primaryRecommendation, resultCode])

  const challengeUrl = useMemo(() => createChallengeUrl(result), [result])

  useEffect(() => {
    let isCancelled = false
    let objectUrl = ''
    if (!result || !resultCrosshair || !challengeUrl) return undefined

    shareCardBlob.current = null
    const pendingCard = createResultShareCard(getShareCardOptions({ result, resultCrosshair, challengeUrl, locale, t }))
    shareCardPromise.current = pendingCard
    pendingCard
      .then((blob) => {
        if (isCancelled) return
        shareCardBlob.current = blob
        objectUrl = URL.createObjectURL(blob)
        setSharePreviewUrl(objectUrl)
        setSharePreviewStatus('ready')
      })
      .catch((error) => {
        if (isCancelled) return
        setSharePreviewStatus('error')
        console.error('Unable to prepare the result card preview.', error)
      })
      .finally(() => {
        if (shareCardPromise.current === pendingCard) shareCardPromise.current = null
      })

    return () => {
      isCancelled = true
      shareCardBlob.current = null
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [challengeUrl, locale, result, resultCrosshair, t])

  useEffect(() => {
    if (phase !== 'result' || !result || !sharePanelRef.current) return undefined
    const currentAttemptId = attemptId.current || `result-${result.average}`
    if (sharePanelViewAttemptId.current === currentAttemptId) return undefined
    const node = sharePanelRef.current
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.35)) return
      sharePanelViewAttemptId.current = currentAttemptId
      trackEvent('share_panel_view', {
        content_type: 'reaction_challenge',
        reaction_ms: result.average,
        reaction_rank: result.rank.id,
        locale,
        is_challenge_recipient: Boolean(challenge),
      })
      observer.disconnect()
    }, { threshold: [0.35] })
    observer.observe(node)
    return () => observer.disconnect()
  }, [challenge, locale, phase, result])

  useEffect(() => {
    if (phase !== 'result' || !result || !attemptId.current) return
    if (resultViewAttemptId.current === attemptId.current) return

    resultViewAttemptId.current = attemptId.current
    trackEvent('finder_result_view', {
      attempt_id: attemptId.current,
      attempt_number: attemptNumber.current,
      reaction_ms: result.average,
      reaction_rank: result.rank.id,
      recommendation_profile: result.profile,
      recommended_crosshair_id: result.id,
      calibration_version: REACTION_CALIBRATION_VERSION,
    })
  }, [phase, result])

  useEffect(() => {
    if (phase !== 'result') return
    window.requestAnimationFrame(() => resultTitleRef.current?.focus({ preventScroll: true }))
  }, [phase])

  const selectedCodeColorKey = useMemo(() => {
    if (!resultCrosshair) return 'custom'
    try {
      return parseCrosshairCode(resultCrosshair.code, { fallbackColor: resultCrosshair.color }).colorKey
    } catch {
      return 'custom'
    }
  }, [resultCrosshair])

  const startTest = (interactionSource = 'intro') => {
    // A double click can arrive before React commits the phase change. Lock the
    // transition so one user action cannot create two funnel attempts.
    if (startLock.current) return
    startLock.current = true
    window.setTimeout(() => { startLock.current = false }, 0)

    clearTimers()
    attemptNumber.current += 1
    attemptId.current = createAttemptId()
    attemptStartedAt.current = Date.now()
    roundAttempt.current = 0
    resultViewAttemptId.current = ''
    setRoundTimes([])
    setEarlyClicks(0)
    setLastReaction(null)
    setResult(null)
    setResultCode('')
    setResultBackground('ascent')
    setResultCopied(false)
    setShareStatus('idle')
    setDownloadStatus('idle')
    setCopyStatus('idle')
    setSharePreviewStatus('idle')
    setSharePreviewUrl('')
    setSharePreviewOpen(false)
    readyAt.current = 0
    setPhase('waiting')
    trackEvent('finder_start', {
      attempt_id: attemptId.current,
      attempt_number: attemptNumber.current,
      interaction_source: interactionSource,
      total_rounds: REACTION_ROUNDS,
      calibration_version: REACTION_CALIBRATION_VERSION,
    })
    if (challenge) {
      trackEvent('challenge_start', {
        attempt_id: attemptId.current,
        attempt_number: attemptNumber.current,
        challenge_ms: challenge.score,
        challenge_rank: challenge.rankId,
        shared_rank: challenge.sharedRankId || challenge.rankId,
        calibration_version: REACTION_CALIBRATION_VERSION,
      })
    }
    window.requestAnimationFrame(() => reactionFieldRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' }))
  }

  const queueNextRound = (nextPhase = 'feedback') => {
    setPhase(nextPhase)
    feedbackTimer.current = window.setTimeout(() => setPhase('waiting'), FEEDBACK_MS)
  }

  useEffect(() => {
    if (phase !== 'ready') return undefined
    readyTimer.current = window.setTimeout(() => {
      readyTimer.current = null
      setLastReaction(null)
      roundAttempt.current += 1
      trackEvent('finder_timeout', {
        attempt_id: attemptId.current,
        attempt_number: attemptNumber.current,
        round_number: roundTimes.length + 1,
        round_attempt: roundAttempt.current,
        elapsed_ms: MAX_REACTION_MS,
      })
      queueNextRound('timeout')
    }, MAX_REACTION_MS)
    return () => {
      if (readyTimer.current) window.clearTimeout(readyTimer.current)
      readyTimer.current = null
    }
  }, [phase, roundTimes.length])

  const rememberInputType = (event) => {
    inputType.current = event.pointerType || 'mouse'
  }

  const handlePlayArea = (event) => {
    if (event.detail === 0) inputType.current = 'keyboard'
    // Ignore duplicate pointer/click events for the same phase and round. This
    // keeps false-start and timeout counts aligned with actual round states.
    const currentInteractionKey = `${phase}:${roundTimes.length}`
    if (interactionKey.current === currentInteractionKey) return
    interactionKey.current = currentInteractionKey

    if (phase === 'intro') {
      startTest('intro')
      return
    }

    if (phase === 'waiting') {
      if (waitTimer.current) window.clearTimeout(waitTimer.current)
      waitTimer.current = null
      roundAttempt.current += 1
      setEarlyClicks((current) => current + 1)
      trackEvent('finder_false_start', {
        attempt_id: attemptId.current,
        attempt_number: attemptNumber.current,
        round_number: roundTimes.length + 1,
        round_attempt: roundAttempt.current,
        false_start_count: earlyClicks + 1,
      })
      queueNextRound('early')
      return
    }

    if (phase !== 'ready' || !readyAt.current) return

    if (readyTimer.current) window.clearTimeout(readyTimer.current)
    readyTimer.current = null
    const reaction = Math.max(1, Math.round(window.performance.now() - readyAt.current))
    if (reaction < MIN_REACTION_MS) {
      setLastReaction(reaction)
      roundAttempt.current += 1
      setEarlyClicks((current) => current + 1)
      trackEvent('finder_false_start', {
        attempt_id: attemptId.current,
        attempt_number: attemptNumber.current,
        round_number: roundTimes.length + 1,
        round_attempt: roundAttempt.current,
        false_start_count: earlyClicks + 1,
        false_start_reason: 'implausible_reaction',
        elapsed_ms: reaction,
      })
      queueNextRound('invalid')
      return
    }

    if (!isValidReactionTime(reaction)) {
      setLastReaction(null)
      roundAttempt.current += 1
      trackEvent('finder_timeout', {
        attempt_id: attemptId.current,
        attempt_number: attemptNumber.current,
        round_number: roundTimes.length + 1,
        round_attempt: roundAttempt.current,
        elapsed_ms: reaction,
      })
      queueNextRound('timeout')
      return
    }

    roundAttempt.current += 1
    const nextRoundTimes = [...roundTimes, reaction]
    setRoundTimes(nextRoundTimes)
    setLastReaction(reaction)
    trackEvent('finder_round_complete', {
      attempt_id: attemptId.current,
      attempt_number: attemptNumber.current,
      round_number: nextRoundTimes.length,
      reaction_ms: reaction,
      completed_rounds: nextRoundTimes.length,
    })

    if (nextRoundTimes.length >= REACTION_ROUNDS) {
      const nextResult = getReactionRecommendation(nextRoundTimes, earlyClicks)
      const profileAttempt = createAimProfileAttempt(nextResult, nextRoundTimes, attemptId.current, new Date().toISOString(), inputType.current)
      const nextProfileHistory = saveAimProfileHistory([...aimProfileHistory, profileAttempt].filter(Boolean))
      setAimProfileHistory(nextProfileHistory)
      setResult(nextResult)
      setResultCode('')
      setResultCopied(false)
      setPhase('result')
      trackEvent('finder_complete', {
        attempt_id: attemptId.current,
        attempt_number: attemptNumber.current,
        completed_rounds: nextRoundTimes.length,
        final_round_attempts: roundAttempt.current,
        attempt_duration_ms: Math.max(0, Date.now() - attemptStartedAt.current),
        reaction_ms: nextResult.average,
        consistency_ms: nextResult.consistency,
        best_reaction_ms: nextResult.best,
        reaction_rank: nextResult.rank.id,
        early_clicks: nextResult.earlyClicks,
        recommendation_profile: nextResult.profile,
        result_reliability: nextResult.reliability,
        input_type: inputType.current,
        recommended_crosshair_id: nextResult.id,
        calibration_version: REACTION_CALIBRATION_VERSION,
      })
      trackEvent('aim_profile_saved', {
        history_count: nextProfileHistory.length,
        reaction_ms: nextResult.average,
        reaction_rank: nextResult.rank.id,
        storage_scope: 'local',
        calibration_version: REACTION_CALIBRATION_VERSION,
      })
      if (challenge) {
        const comparison = getChallengeComparison(nextResult.average, challenge.score)
        trackEvent('challenge_complete', {
          attempt_id: attemptId.current,
          attempt_number: attemptNumber.current,
          challenge_ms: challenge.score,
          challenge_rank: challenge.rankId,
          reaction_ms: nextResult.average,
          reaction_rank: nextResult.rank.id,
          outcome: comparison.outcome,
          difference_ms: comparison.difference,
          calibration_version: REACTION_CALIBRATION_VERSION,
        })
        if (comparison.outcome === 'won') {
          trackEvent('challenge_won', {
            attempt_id: attemptId.current,
            challenge_ms: challenge.score,
            reaction_ms: nextResult.average,
            difference_ms: comparison.difference,
            calibration_version: REACTION_CALIBRATION_VERSION,
          })
        }
      }
      window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }))
      return
    }

    roundAttempt.current = 0
    queueNextRound('feedback')
  }

  const clearAimProfile = () => {
    if (!window.confirm(getAimProfileCopy(locale, 'clearConfirm'))) return
    const previousCount = aimProfileHistory.length
    clearAimProfileHistory()
    setAimProfileHistory([])
    profileViewTracked.current = false
    trackEvent('aim_profile_clear', { history_count: previousCount, storage_scope: 'local' })
  }

  const changeResultColor = (option) => {
    if (!resultCrosshair) return
    try {
      setResultCode(updateCrosshairColor(resultCrosshair.code, { preset: option.preset }))
      setResultCopied(false)
      trackEvent('crosshair_color_change', {
        crosshair_id: resultCrosshair.id,
        color_key: option.key,
        interaction_source: 'finder_result',
      })
    } catch {
      // Catalog codes are validated before display; keep the last valid result.
    }
  }

  const copyResultCode = async () => {
    if (!resultCrosshair) return
    const copied = await onCopy(resultCrosshair, { interactionSource: 'finder_result' })
    if (copied === false) return
    setResultCopied(true)
    if (copiedTimer.current) window.clearTimeout(copiedTimer.current)
    copiedTimer.current = window.setTimeout(() => setResultCopied(false), 1800)
  }

  const changeResultBackground = (nextBackground) => {
    setResultBackground(nextBackground)
    trackEvent('map_change', { map_name: nextBackground, interaction_source: 'finder_result' })
  }

  const exitFinder = () => {
    if (isFocusedTest && !window.confirm(t('finder.exitConfirm'))) return
    const attemptOutcome = phase === 'result' ? 'completed' : phase === 'intro' ? 'not_started' : 'abandoned'
    trackEvent('finder_exit', {
      ...(attemptId.current ? { attempt_id: attemptId.current } : {}),
      phase,
      attempt_outcome: attemptOutcome,
      completed_rounds: roundTimes.length,
      current_round: Math.min(roundTimes.length + 1, REACTION_ROUNDS),
      attempt_number: attemptNumber.current,
    })
    onExit()
  }

  const getPreparedShareCard = async () => {
    if (shareCardBlob.current) return shareCardBlob.current
    if (shareCardPromise.current) return shareCardPromise.current
    const pendingCard = createResultShareCard(getShareCardOptions({ result, resultCrosshair, challengeUrl, locale, t }))
    shareCardPromise.current = pendingCard
    try {
      const blob = await pendingCard
      shareCardBlob.current = blob
      return blob
    } finally {
      if (shareCardPromise.current === pendingCard) shareCardPromise.current = null
    }
  }

  const challengeShareText = () => {
    const rankName = t(`finder.ranks.${result.rank.id}`)
    return `${t('finder.shareText', { rank: rankName, average: result.average, unit: t('finder.millisecondsShort') })}\n${t('finder.shareNoLogin')}\n${challengeUrl}`
  }

  const resetStatusLater = (timerRef, setter, delay = 3200) => {
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => setter('idle'), delay)
  }

  const copyChallengeText = async ({ surface = 'secondary' } = {}) => {
    if (!challengeUrl || copyStatus === 'working') return false
    setCopyStatus('working')
    trackEvent('share_action_click', {
      content_type: 'reaction_challenge',
      method: 'challenge_text_copy',
      interaction_source: surface,
      reaction_ms: result.average,
      reaction_rank: result.rank.id,
      is_challenge_recipient: Boolean(challenge),
    })
    try {
      await copyText(challengeShareText())
      setCopyStatus('copied')
      trackEvent('share_link_copy', {
        content_type: 'reaction_challenge',
        method: 'challenge_text_copy',
        interaction_source: surface,
        reaction_ms: result.average,
        reaction_rank: result.rank.id,
      })
      resetStatusLater(copyTimer, setCopyStatus)
      return true
    } catch (error) {
      console.error('Unable to copy the challenge text.', error)
      trackEvent('share_error', { content_type: 'reaction_challenge', item_id: result.rank.id, method: 'challenge_text_copy' })
      setCopyStatus('error')
      resetStatusLater(copyTimer, setCopyStatus, 4200)
      return false
    }
  }

  const handleShareResult = async () => {
    if (!result || !resultCrosshair || shareStatus === 'working' || shareStatus === 'opening') return
    if (!nativeShareAvailable) {
      await copyChallengeText({ surface: weChatBrowser ? 'wechat_primary' : 'desktop_primary' })
      return
    }

    setShareStatus('working')
    try {
      const blob = await getPreparedShareCard()
      const fileName = `aimcodes-reaction-${result.rank.id}-${result.average}ms.png`
      const basePayload = {
        title: t('finder.shareTitle'),
        text: t('finder.shareText', { rank: t(`finder.ranks.${result.rank.id}`), average: result.average, unit: t('finder.millisecondsShort') }),
        url: challengeUrl,
      }
      let sharePayload = basePayload
      let shareMethod = 'native_link_share'
      if (typeof File === 'function') {
        const filePayload = { ...basePayload, files: [new File([blob], fileName, { type: 'image/png' })] }
        if (canShareData(filePayload)) {
          sharePayload = filePayload
          shareMethod = 'native_file_share'
        }
      }
      if (!canShareData(sharePayload)) {
        await copyChallengeText({ surface: 'native_unsupported_fallback' })
        setShareStatus('idle')
        return
      }

      trackEvent('share_action_click', {
        content_type: 'reaction_challenge',
        method: shareMethod,
        interaction_source: 'finder_result_primary',
        reaction_ms: result.average,
        reaction_rank: result.rank.id,
        is_challenge_recipient: Boolean(challenge),
      })
      setShareStatus('opening')
      await withTimeout(shareData(sharePayload))
      trackEvent('share_native', {
        content_type: 'reaction_challenge',
        item_id: result.rank.id,
        method: shareMethod,
        reaction_ms: result.average,
        crosshair_id: resultCrosshair.id,
      })
      trackShareSuccess({
        method: `${shareMethod}_handoff`,
        contentType: 'reaction_challenge',
        itemId: result.rank.id,
        interactionSource: 'finder_result_primary',
        reaction_ms: result.average,
        crosshair_id: resultCrosshair.id,
      })
      setShareStatus('shared')
      resetStatusLater(shareTimer, setShareStatus)
    } catch (error) {
      if (error?.name === 'AbortError') {
        trackEvent('share_cancel', { content_type: 'reaction_challenge', item_id: result.rank.id, method: 'native_share' })
        setShareStatus('cancelled')
        resetStatusLater(shareTimer, setShareStatus, 2400)
        return
      }
      console.error('Unable to share the result challenge.', error)
      trackEvent('share_error', {
        content_type: 'reaction_challenge',
        item_id: result.rank.id,
        method: error?.name === 'TimeoutError' ? 'native_share_timeout' : 'native_share',
      })
      setShareStatus('error')
      resetStatusLater(shareTimer, setShareStatus, 5200)
    }
  }

  const downloadResultCard = async () => {
    if (!result || !resultCrosshair || downloadStatus === 'working') return
    setDownloadStatus('working')
    trackEvent('share_action_click', {
      content_type: 'reaction_result',
      method: 'image_download',
      interaction_source: 'finder_result_secondary',
      reaction_ms: result.average,
      reaction_rank: result.rank.id,
    })
    try {
      const blob = await getPreparedShareCard()
      downloadBlob(blob, `aimcodes-reaction-${result.rank.id}-${result.average}ms.png`)
      trackEvent('share_download', {
        content_type: 'reaction_result',
        item_id: result.rank.id,
        reaction_ms: result.average,
        crosshair_id: resultCrosshair.id,
      })
      setDownloadStatus('saved')
      resetStatusLater(downloadTimer, setDownloadStatus)
    } catch (error) {
      console.error('Unable to download the result card.', error)
      trackEvent('share_error', { content_type: 'reaction_result', item_id: result.rank.id, method: 'image_download' })
      setDownloadStatus('error')
      resetStatusLater(downloadTimer, setDownloadStatus, 4200)
    }
  }

  const openSharePreview = () => {
    if (!sharePreviewUrl) return
    setSharePreviewOpen(true)
    trackEvent('share_card_open', {
      content_type: 'reaction_result',
      reaction_ms: result.average,
      reaction_rank: result.rank.id,
      crosshair_id: resultCrosshair.id,
    })
  }

  const phaseTitle = phase === 'intro'
    ? t('finder.introTitle')
      : phase === 'waiting'
        ? t('finder.wait')
        : phase === 'arming'
          ? t('finder.wait')
      : phase === 'ready'
        ? t('finder.clickNow')
        : phase === 'early'
          ? t('finder.tooSoon')
          : phase === 'invalid'
            ? t('finder.implausible')
          : phase === 'timeout'
            ? t('finder.tooSlow')
            : t('finder.reactionTime', { time: lastReaction })

  const phaseHint = phase === 'intro'
    ? t('finder.introHint')
      : phase === 'waiting'
        ? t('finder.waitHint')
        : phase === 'arming'
          ? t('finder.waitHint')
      : phase === 'ready'
        ? t('finder.readyHint')
        : phase === 'early'
          ? t('finder.tooSoonHint')
          : phase === 'invalid'
            ? t('finder.implausibleHint')
          : phase === 'timeout'
            ? t('finder.tooSlowHint')
            : t('finder.nextHint')

  if (phase === 'result' && result && resultCrosshair) {
    const displayRanks = [...REACTION_RANKS].reverse()
    const nextFasterRank = getNextFasterRank(result.rank)
    const resultCopy = (key, variables) => getAimProfileCopy(locale, key, variables)
    const nextGoalCopy = nextFasterRank
      ? resultCopy('improveGoal', {
          difference: Math.max(1, result.average - nextFasterRank.max),
          unit: t('finder.millisecondsShort'),
          rank: t(`finder.ranks.${nextFasterRank.id}`),
        })
      : resultCopy('topRange')
    const markerPosition = getReactionMarkerPosition(result.average)
    const challengeComparison = challenge ? getChallengeComparison(result.average, challenge.score) : null
    const previousDifference = aimProfileSummary?.latestDifference || 0
    const previousKey = previousDifference > 0 ? 'previousFaster' : previousDifference < 0 ? 'previousSlower' : 'previousTied'
    const calibrationSegments = REACTION_RANKS.map((rank) => {
      const start = Math.max(MIN_REACTION_MS, rank.min)
      const end = Math.min(650, Number.isFinite(rank.max) ? rank.max : 650)
      return { ...rank, width: Math.max(1, end - start + 1) }
    })
    const shareLabel = !nativeShareAvailable
      ? (copyStatus === 'working' ? resultCopy('copyWorking') : copyStatus === 'copied' ? resultCopy('challengeTextCopied') : resultCopy('copyChallengeText'))
      : shareStatus === 'working'
        ? t('finder.sharePreparing')
        : shareStatus === 'opening'
          ? resultCopy('shareOpening')
          : shareStatus === 'shared'
            ? resultCopy('shareHandoff')
            : t('finder.shareResult')
    const shareFeedback = copyStatus === 'copied'
      ? resultCopy('shareCopySuccess')
      : copyStatus === 'error'
        ? resultCopy('shareCopyError')
        : shareStatus === 'error'
          ? resultCopy('shareSystemFailed')
          : shareStatus === 'cancelled'
            ? resultCopy('shareCancelled')
            : downloadStatus === 'saved'
              ? t('finder.shareSaved')
              : downloadStatus === 'error'
                ? resultCopy('shareDownloadError')
                : ''

    return (
      <section className="finder finder-results" aria-labelledby="finder-results-title">
        <div className="finder-heading finder-result-heading">
          <div>
            <h1 id="finder-results-title" ref={resultTitleRef} tabIndex="-1">{t('finder.resultsTitle')}</h1>
            <p>{t('finder.resultsSubtitle')}</p>
          </div>
          <div className="finder-heading-actions">
            <button className="finder-secondary-button" type="button" onClick={() => startTest('retest')}><Icon name="rotate" size={17} />{t('finder.testAgain')}</button>
          </div>
        </div>

        <section className="finder-rank-summary" style={{ '--rank-color': result.rank.color }} aria-label={t('finder.reactionRank')}>
          <div className="finder-rank-emblem" aria-hidden="true"><Icon name="target" size={29} strokeWidth={1.5} /></div>
          <div className="finder-rank-copy">
            <span>{t('finder.reactionRank')}</span>
            <h2>{t(`finder.ranks.${result.rank.id}`)}</h2>
            <p>{t('finder.rankPlacement', { average: result.average, unit: t('finder.millisecondsShort'), range: formatRankRange(result.rank, t) })}</p>
            <strong className="finder-rank-taunt">{resultCopy(`rankFeedback_${result.rank.id}`)}</strong>
            <div className="finder-result-signals">
              <span className={`is-${result.reliability}`}>{resultCopy(`reliability${result.reliability[0].toUpperCase()}${result.reliability.slice(1)}`)}</span>
              <span>{resultCopy(`input_${aimProfileSummary?.current?.inputType || 'unknown'}`)}</span>
              {aimProfileSummary?.previousAverage !== null && <span>{resultCopy(previousKey, { difference: Math.abs(previousDifference), unit: t('finder.millisecondsShort') })}</span>}
            </div>
            {challengeComparison && (
              <strong className={`finder-challenge-outcome is-${challengeComparison.outcome}`}>
                {t(`finder.challenge${challengeComparison.outcome === 'won' ? 'Won' : challengeComparison.outcome === 'missed' ? 'Missed' : 'Tied'}`, {
                  difference: challengeComparison.difference,
                  unit: t('finder.millisecondsShort'),
                })}
              </strong>
            )}
          </div>
          <div className="finder-rank-score">
            <span>{t('finder.average')}</span>
            <strong>{result.average}<small>{t('finder.millisecondsShort')}</small></strong>
          </div>
          <div className="finder-calibration">
            <div className="finder-calibration-labels"><span>{resultCopy('fastLabel')}</span><span>{resultCopy('steadyLabel')}</span></div>
            <div className="finder-calibration-track" role="img" aria-label={t('finder.calibrationLabel', { average: result.average, unit: t('finder.millisecondsShort') })}>
              <span className="finder-calibration-segments" aria-hidden="true">
                {calibrationSegments.map((rank) => <i key={rank.id} style={{ '--segment-color': rank.color, flexGrow: rank.width }} />)}
              </span>
              <i className="finder-calibration-marker" style={{ '--marker-position': `${markerPosition}%` }}><span>{resultCopy('yourMarker')}</span></i>
            </div>
            <div className="finder-calibration-ticks" aria-hidden="true"><span>100</span><span>200</span><span>300</span><span>410</span><span>500+</span></div>
            <div className="finder-calibration-notes">
              <p>{resultCopy('calibrationNote')}</p>
              <strong><span>{resultCopy('nextGoal')}</span>{nextGoalCopy}</strong>
            </div>
          </div>
        </section>

        <section ref={sharePanelRef} className="finder-share-panel" aria-labelledby="finder-share-title">
          <button className="finder-share-preview-frame" type="button" onClick={openSharePreview} disabled={!sharePreviewUrl} aria-label={resultCopy('previewShareCard')}>
            {sharePreviewUrl
              ? <><img src={sharePreviewUrl} alt="" /><span className="finder-share-preview-action"><Icon name="eye" size={16} />{resultCopy('previewShareCard')}</span></>
              : <span role="status"><Icon name="target" size={28} />{sharePreviewStatus === 'error' ? resultCopy('sharePreviewError') : t('finder.sharePreparing')}</span>}
          </button>
          <div className="finder-share-copy">
            <span>{resultCopy('sharePanelEyebrow')}</span>
            <h2 id="finder-share-title">{resultCopy('sharePanelTitle', { average: result.average, unit: t('finder.millisecondsShort') })}</h2>
            <p>{resultCopy('sharePanelBody')}</p>
            <div className="finder-share-proof" aria-label={resultCopy('shareDetailsLabel')}>
              <span><Icon name="target" size={14} />{t('finder.shareThreeRounds')}</span>
              <span><Icon name="check" size={14} />{t('finder.shareNoLogin')}</span>
            </div>
            {weChatBrowser && <p className="finder-share-wechat-note"><Icon name="info" size={16} />{resultCopy('shareWechatHint')}</p>}
            <div className="finder-share-actions">
              <button className="primary-button finder-share-primary" type="button" onClick={handleShareResult} disabled={shareStatus === 'working' || shareStatus === 'opening' || copyStatus === 'working'}>
                <Icon name={shareStatus === 'shared' || copyStatus === 'copied' ? 'check' : nativeShareAvailable ? 'share' : 'copy'} size={18} />{shareLabel}
              </button>
              {nativeShareAvailable && (
                <button className="finder-link-button" type="button" onClick={() => copyChallengeText()} disabled={copyStatus === 'working'}>
                  <Icon name={copyStatus === 'copied' ? 'check' : 'copy'} size={17} />
                  {copyStatus === 'working' ? resultCopy('copyWorking') : copyStatus === 'copied' ? resultCopy('challengeTextCopied') : resultCopy('copyChallengeText')}
                </button>
              )}
              <button className="finder-link-button" type="button" onClick={downloadResultCard} disabled={downloadStatus === 'working'}>
                <Icon name={downloadStatus === 'saved' ? 'check' : 'download'} size={17} />
                {downloadStatus === 'working' ? t('finder.sharePreparing') : downloadStatus === 'saved' ? t('finder.shareSaved') : resultCopy('downloadShareCard')}
              </button>
            </div>
            <p className={`finder-share-feedback ${shareFeedback ? 'is-visible' : ''}`} role="status" aria-live="polite">{shareFeedback}</p>
          </div>
        </section>

        <section className="finder-primary-recommendation finder-result-workbench">
          <div className="finder-workbench-heading">
            <span>{t('finder.recommended')}</span>
            <div><h2>{resultCrosshair.name}</h2><p>{resultCopy(`profileReason_${result.profile}`)}</p></div>
          </div>

          <div className="finder-workbench-body">
            <div className="finder-scene-preview">
              <img src={activeBackground.image} alt={t('preview.mapAlt', { map: activeBackgroundName })} />
              <CrosshairCanvas crosshair={resultCrosshair} scale={RESULT_PREVIEW_SCALE} label={t('card.test', { name: resultCrosshair.name })} />
              <div className="hud-map" aria-hidden="true"><strong>{activeBackgroundName.toLocaleUpperCase()}</strong></div>
              <span className="corner corner-tl" aria-hidden="true" />
              <span className="corner corner-tr" aria-hidden="true" />
              <span className="corner corner-bl" aria-hidden="true" />
              <span className="corner corner-br" aria-hidden="true" />
            </div>

            <div className="finder-result-controls">
              <fieldset className="background-picker">
                <legend>{t('preview.background')}</legend>
                <div className="background-options">
                  {previewBackgroundOptions.map((option) => (
                    <button key={option.value} className={`background-option ${resultBackground === option.value ? 'is-selected' : ''}`} type="button" onClick={() => changeResultBackground(option.value)} aria-pressed={resultBackground === option.value}>
                      <span className="background-swatch"><img src={option.image} alt="" /></span>
                      <span>{t(`maps.${option.value}`)}</span>
                      {resultBackground === option.value && <i><Icon name="check" size={12} strokeWidth={2.6} /></i>}
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="crosshair-color-picker">
                <legend>{t('preview.crosshairColor')}</legend>
                <div className="crosshair-color-options">
                  {crosshairColorPresets.map((option) => (
                    <button
                      className={selectedCodeColorKey === option.key ? 'is-selected' : ''}
                      type="button"
                      onClick={() => changeResultColor(option)}
                      aria-label={t(`colors.${option.key}`)}
                      aria-pressed={selectedCodeColorKey === option.key}
                      title={t(`colors.${option.key}`)}
                      key={option.key}
                    >
                      <span style={{ background: option.hex }} />
                    </button>
                  ))}
                </div>
                <p className="control-help">{t('preview.colorHelp')}</p>
              </fieldset>

              <button className="primary-button finder-copy-result" type="button" onClick={copyResultCode}>
                <Icon name={resultCopied ? 'check' : 'copy'} />{resultCopied ? t('actions.copied') : t('actions.copy')}
              </button>
              <p className="finder-copy-help"><Icon name="gamepad" size={15} />{t('finder.copyHelp')}</p>
            </div>
          </div>
        </section>

        <section className="finder-run-details" aria-labelledby="finder-run-details-title">
          <div className="finder-run-details-heading">
            <div>
              <span>{t('finder.yourResults')}</span>
              <h2 id="finder-run-details-title">{t('finder.runDetailsTitle')}</h2>
            </div>
            <p>{t('finder.deviceNote')}</p>
          </div>
          <dl>
            <div className="finder-run-detail finder-run-detail-rounds">
              <dt>{t('finder.roundTimes')}</dt>
              <dd>{roundTimes.map((time, index) => <span key={`${index}-${time}`}>#{index + 1} · {time}<small>{t('finder.millisecondsShort')}</small></span>)}</dd>
            </div>
            <div className="finder-run-detail">
              <dt>{t('finder.best')}</dt>
              <dd>{result.best}<small>{t('finder.millisecondsShort')}</small></dd>
            </div>
            <div className="finder-run-detail">
              <dt>{t('finder.consistency')}</dt>
              <dd>±{result.consistency}<small>{t('finder.millisecondsShort')}</small></dd>
            </div>
            <div className="finder-run-detail">
              <dt>{t('finder.earlyClicks')}</dt>
              <dd>{result.earlyClicks}</dd>
            </div>
          </dl>
        </section>

        <AimProfilePanel summary={aimProfileSummary} onClear={clearAimProfile} locale={locale} t={t} />

        <details className="finder-rank-spectrum">
          <summary>
            <div><h2>{t('finder.rankRanges')}</h2><p>{t('finder.rankRangesHint')}</p></div>
            <Icon name="chevronDown" size={18} />
          </summary>
          <div className="finder-rank-track" role="list">
            {displayRanks.map((rank) => (
              <div className={rank.id === result.rank.id ? 'is-current' : ''} style={{ '--rank-color': rank.color }} role="listitem" key={rank.id}>
                <span aria-hidden="true" />
                <strong>{t(`finder.ranks.${rank.id}`)}</strong>
                <small>{formatRankRange(rank, t)}</small>
                {rank.id === result.rank.id && <em>{t('finder.yourTier')}</em>}
              </div>
            ))}
          </div>
        </details>

        <div className="finder-mobile-actions" aria-label={t('finder.resultActions')}>
          <button className="finder-secondary-button" type="button" onClick={() => startTest('retest')}><Icon name="rotate" size={17} />{t('finder.testAgain')}</button>
          <button className="primary-button" type="button" onClick={copyResultCode}><Icon name={resultCopied ? 'check' : 'copy'} size={17} />{resultCopied ? t('actions.copied') : t('actions.copy')}</button>
        </div>

        <button className="finder-back-link" type="button" onClick={exitFinder}><Icon name="arrowLeft" size={17} />{t('finder.backExplore')}</button>
        {sharePreviewOpen && sharePreviewUrl && <ResultSharePreviewDialog previewUrl={sharePreviewUrl} onClose={() => setSharePreviewOpen(false)} locale={locale} />}
      </section>
    )
  }

  const roundNumber = Math.min(roundTimes.length + 1, REACTION_ROUNDS)

  return (
    <section className="finder finder-test" aria-labelledby="finder-title">
      <div className="finder-heading">
        <div><h1 id="finder-title">{t('finder.title')}</h1><p>{t('finder.subtitle')}</p></div>
        <button className="finder-secondary-button finder-exit-button" type="button" onClick={exitFinder}><Icon name="exit" size={17} />{t('finder.exit')}</button>
      </div>

      {phase === 'intro' && challenge && (
        <section className="finder-challenge-banner" aria-label={t('finder.challengeLabel')}>
          <span><Icon name="target" size={22} /></span>
          <div>
            <strong>{t('finder.challengeLandingTitle', { score: challenge.score, unit: t('finder.millisecondsShort') })}</strong>
            <p>{t('finder.challengeLandingBody')}</p>
          </div>
        </section>
      )}

      {phase === 'intro' && (
        <section className="finder-test-brief" aria-label={t('finder.testBriefLabel')}>
          <div className="finder-test-brief-main"><Icon name="target" size={18} /><strong>{t('finder.testDuration')}</strong></div>
          <div className="finder-test-brief-rules"><span>{t('finder.legendReady')}</span><span>{t('finder.legendEarly')}</span></div>
          <p>{t('finder.deviceNote')}</p>
        </section>
      )}

      <div className="finder-round-heading"><span />{t('finder.round', { current: roundNumber, total: REACTION_ROUNDS })}<span /></div>
      <button ref={reactionFieldRef} className={`reaction-field is-${phase}`} type="button" onPointerDown={rememberInputType} onClick={handlePlayArea} data-phase={phase} aria-label={t('finder.playArea')}>
        <span className="finder-corner finder-corner-tl" aria-hidden="true" />
        <span className="finder-corner finder-corner-tr" aria-hidden="true" />
        <span className="finder-corner finder-corner-bl" aria-hidden="true" />
        <span className="finder-corner finder-corner-br" aria-hidden="true" />
        <ReactionReticle />
        <span className="reaction-copy" aria-live="polite"><strong>{phaseTitle}</strong><small>{phaseHint}</small></span>
        <ProgressDots completed={roundTimes.length} t={t} />
      </button>
      {phase === 'intro' && <AimProfilePanel summary={aimProfileSummary} onClear={clearAimProfile} locale={locale} t={t} />}
    </section>
  )
}
