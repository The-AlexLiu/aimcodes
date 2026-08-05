import { useEffect, useMemo, useRef, useState } from 'react'
import CrosshairCanvas from './CrosshairCanvas.jsx'
import Icon from './Icon.jsx'
import { crosshairColorPresets, previewBackgroundOptions } from '../data/previewOptions.js'
import { parseCrosshairCode, updateCrosshairColor } from '../utils/crosshairCode.js'
import { getReactionRecommendation, REACTION_RANKS, REACTION_ROUNDS } from '../utils/reactionRecommendation.js'
import { createResultShareCard } from '../utils/shareResultCard.js'
import { trackEvent } from '../utils/analytics.js'

const WAIT_MIN_MS = 1400
const WAIT_VARIANCE_MS = 1700
const FEEDBACK_MS = 850
const RESULT_PREVIEW_SCALE = 2.25

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
    <div className="finder-progress-dots" aria-label={t('finder.progressLabel', { completed, total: REACTION_ROUNDS })}>
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

export default function CrosshairFinder({ crosshairs, onExit, onCopy, onFocusChange, t }) {
  const [phase, setPhase] = useState('intro')
  const [roundTimes, setRoundTimes] = useState([])
  const [earlyClicks, setEarlyClicks] = useState(0)
  const [lastReaction, setLastReaction] = useState(null)
  const [result, setResult] = useState(null)
  const [resultCode, setResultCode] = useState('')
  const [resultBackground, setResultBackground] = useState('ascent')
  const [resultCopied, setResultCopied] = useState(false)
  const [shareStatus, setShareStatus] = useState('idle')
  const readyAt = useRef(0)
  const waitTimer = useRef(null)
  const feedbackTimer = useRef(null)
  const copiedTimer = useRef(null)
  const shareTimer = useRef(null)
  const attemptNumber = useRef(0)
  const isFocusedTest = ['waiting', 'ready', 'early', 'feedback'].includes(phase)

  useEffect(() => {
    onFocusChange?.(isFocusedTest)
  }, [isFocusedTest, onFocusChange])

  useEffect(() => () => onFocusChange?.(false), [onFocusChange])

  const clearTimers = () => {
    if (waitTimer.current) window.clearTimeout(waitTimer.current)
    if (feedbackTimer.current) window.clearTimeout(feedbackTimer.current)
    if (copiedTimer.current) window.clearTimeout(copiedTimer.current)
    if (shareTimer.current) window.clearTimeout(shareTimer.current)
    waitTimer.current = null
    feedbackTimer.current = null
    copiedTimer.current = null
    shareTimer.current = null
  }

  useEffect(() => () => {
    if (waitTimer.current) window.clearTimeout(waitTimer.current)
    if (feedbackTimer.current) window.clearTimeout(feedbackTimer.current)
    if (copiedTimer.current) window.clearTimeout(copiedTimer.current)
    if (shareTimer.current) window.clearTimeout(shareTimer.current)
  }, [])

  useEffect(() => {
    if (phase !== 'waiting') return undefined
    const delay = WAIT_MIN_MS + Math.round(Math.random() * WAIT_VARIANCE_MS)
    waitTimer.current = window.setTimeout(() => {
      readyAt.current = window.performance.now()
      setPhase('ready')
    }, delay)
    return () => {
      if (waitTimer.current) window.clearTimeout(waitTimer.current)
      waitTimer.current = null
    }
  }, [phase, roundTimes.length])

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

  const selectedCodeColorKey = useMemo(() => {
    if (!resultCrosshair) return 'custom'
    try {
      return parseCrosshairCode(resultCrosshair.code, { fallbackColor: resultCrosshair.color }).colorKey
    } catch {
      return 'custom'
    }
  }, [resultCrosshair])

  const startTest = (source = 'intro') => {
    clearTimers()
    attemptNumber.current += 1
    setRoundTimes([])
    setEarlyClicks(0)
    setLastReaction(null)
    setResult(null)
    setResultCode('')
    setResultBackground('ascent')
    setResultCopied(false)
    setShareStatus('idle')
    setPhase('waiting')
    trackEvent('finder_start', {
      attempt_number: attemptNumber.current,
      source,
      total_rounds: REACTION_ROUNDS,
    })
  }

  const queueNextRound = (nextPhase = 'feedback') => {
    setPhase(nextPhase)
    feedbackTimer.current = window.setTimeout(() => setPhase('waiting'), FEEDBACK_MS)
  }

  const handlePlayArea = () => {
    if (phase === 'intro') {
      startTest('intro')
      return
    }

    if (phase === 'waiting') {
      if (waitTimer.current) window.clearTimeout(waitTimer.current)
      waitTimer.current = null
      setEarlyClicks((current) => current + 1)
      trackEvent('finder_false_start', {
        attempt_number: attemptNumber.current,
        round_number: roundTimes.length + 1,
        false_start_count: earlyClicks + 1,
      })
      queueNextRound('early')
      return
    }

    if (phase !== 'ready') return

    const reaction = Math.max(1, Math.round(window.performance.now() - readyAt.current))
    const nextRoundTimes = [...roundTimes, reaction]
    setRoundTimes(nextRoundTimes)
    setLastReaction(reaction)

    if (nextRoundTimes.length >= REACTION_ROUNDS) {
      const nextResult = getReactionRecommendation(nextRoundTimes, earlyClicks)
      setResult(nextResult)
      setResultCode('')
      setResultCopied(false)
      setPhase('result')
      trackEvent('finder_complete', {
        attempt_number: attemptNumber.current,
        reaction_ms: nextResult.average,
        consistency_ms: nextResult.consistency,
        best_reaction_ms: nextResult.best,
        reaction_rank: nextResult.rank.id,
        early_clicks: nextResult.earlyClicks,
        recommendation_profile: nextResult.profile,
        recommended_crosshair_id: nextResult.id,
      })
      window.requestAnimationFrame(() => window.scrollTo({ top: 0, behavior: 'auto' }))
      return
    }

    queueNextRound('feedback')
  }

  const changeResultColor = (option) => {
    if (!resultCrosshair) return
    try {
      setResultCode(updateCrosshairColor(resultCrosshair.code, { preset: option.preset }))
      setResultCopied(false)
      trackEvent('crosshair_color_change', {
        crosshair_id: resultCrosshair.id,
        color_key: option.key,
        source: 'finder_result',
      })
    } catch {
      // Catalog codes are validated before display; keep the last valid result.
    }
  }

  const copyResultCode = async () => {
    if (!resultCrosshair) return
    const copied = await onCopy(resultCrosshair, { source: 'finder_result' })
    if (copied === false) return
    setResultCopied(true)
    if (copiedTimer.current) window.clearTimeout(copiedTimer.current)
    copiedTimer.current = window.setTimeout(() => setResultCopied(false), 1800)
  }

  const changeResultBackground = (nextBackground) => {
    setResultBackground(nextBackground)
    trackEvent('map_change', { map_name: nextBackground, source: 'finder_result' })
  }

  const exitFinder = () => {
    trackEvent('finder_exit', {
      phase,
      completed_rounds: roundTimes.length,
      attempt_number: attemptNumber.current,
    })
    onExit()
  }

  const handleShareResult = async () => {
    if (!result || !resultCrosshair || shareStatus === 'working') return
    setShareStatus('working')
    try {
      const rankName = t(`finder.ranks.${result.rank.id}`)
      const blob = await createResultShareCard({
        title: t('finder.shareCardTitle'),
        rankName,
        rankRange: formatRankRange(result.rank, t),
        average: result.average,
        unit: t('finder.millisecondsShort'),
        taunt: t(`finder.rankTaunts.${result.rank.id}`),
        pickLabel: t('finder.shareCardPick'),
        crosshair: resultCrosshair,
        footer: t('finder.shareCardFooter'),
        rankColor: result.rank.color,
      })
      const fileName = `aimcodes-reaction-${result.rank.id}-${result.average}ms.png`
      let shared = false
      const prefersNativeShare = navigator.maxTouchPoints > 0 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)

      if (prefersNativeShare && typeof File === 'function' && navigator.share && navigator.canShare) {
        const file = new File([blob], fileName, { type: 'image/png' })
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: t('finder.shareTitle'),
            text: t('finder.shareText', { rank: rankName, average: result.average, unit: t('finder.millisecondsShort') }),
          })
          shared = true
        }
      }

      if (!shared) {
        const downloadUrl = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = downloadUrl
        link.download = fileName
        document.body.appendChild(link)
        link.click()
        link.remove()
        window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000)
      }

      trackEvent('share', {
        method: shared ? 'native_share' : 'image_download',
        content_type: 'reaction_result',
        item_id: result.rank.id,
        reaction_ms: result.average,
        crosshair_id: resultCrosshair.id,
      })
      setShareStatus(shared ? 'shared' : 'saved')
      if (shareTimer.current) window.clearTimeout(shareTimer.current)
      shareTimer.current = window.setTimeout(() => setShareStatus('idle'), 2400)
    } catch (error) {
      if (error?.name === 'AbortError') {
        trackEvent('share_cancel', { content_type: 'reaction_result', item_id: result.rank.id })
        setShareStatus('idle')
        return
      }
      console.error('Unable to create or share the result card.', error)
      trackEvent('share_error', { content_type: 'reaction_result', item_id: result.rank.id })
      setShareStatus('error')
      if (shareTimer.current) window.clearTimeout(shareTimer.current)
      shareTimer.current = window.setTimeout(() => setShareStatus('idle'), 2400)
    }
  }

  const phaseTitle = phase === 'intro'
    ? t('finder.introTitle')
    : phase === 'waiting'
      ? t('finder.wait')
      : phase === 'ready'
        ? t('finder.clickNow')
        : phase === 'early'
          ? t('finder.tooSoon')
          : t('finder.reactionTime', { time: lastReaction })

  const phaseHint = phase === 'intro'
    ? t('finder.introHint')
    : phase === 'waiting'
      ? t('finder.waitHint')
      : phase === 'ready'
        ? t('finder.readyHint')
        : phase === 'early'
          ? t('finder.tooSoonHint')
          : t('finder.nextHint')

  if (phase === 'result' && result && resultCrosshair) {
    const displayRanks = [...REACTION_RANKS].reverse()
    const shareLabel = shareStatus === 'working'
      ? t('finder.sharePreparing')
      : shareStatus === 'shared'
        ? t('finder.shareShared')
        : shareStatus === 'saved'
          ? t('finder.shareSaved')
          : shareStatus === 'error'
            ? t('finder.shareError')
            : t('finder.shareResult')

    return (
      <section className="finder finder-results" aria-labelledby="finder-results-title">
        <div className="finder-heading finder-result-heading">
          <div>
            <h1 id="finder-results-title">{t('finder.resultsTitle')}</h1>
            <p>{t('finder.resultsSubtitle')}</p>
          </div>
          <div className="finder-heading-actions">
            <button className="finder-secondary-button finder-share-button" type="button" onClick={handleShareResult} disabled={shareStatus === 'working'} aria-live="polite">
              <Icon name={shareStatus === 'shared' || shareStatus === 'saved' ? 'check' : 'share'} size={17} />{shareLabel}
            </button>
            <button className="finder-secondary-button" type="button" onClick={() => startTest('retest')}><Icon name="rotate" size={17} />{t('finder.testAgain')}</button>
          </div>
        </div>

        <section className="finder-rank-summary" style={{ '--rank-color': result.rank.color }} aria-label={t('finder.reactionRank')}>
          <div className="finder-rank-emblem" aria-hidden="true"><Icon name="target" size={29} strokeWidth={1.5} /></div>
          <div className="finder-rank-copy">
            <span>{t('finder.reactionRank')}</span>
            <h2>{t(`finder.ranks.${result.rank.id}`)}</h2>
            <p>{t('finder.rankPlacement', { average: result.average, unit: t('finder.millisecondsShort'), range: formatRankRange(result.rank, t) })}</p>
            <strong className="finder-rank-taunt">{t(`finder.rankTaunts.${result.rank.id}`)}</strong>
          </div>
          <div className="finder-rank-score">
            <span>{t('finder.average')}</span>
            <strong>{result.average}<small>{t('finder.millisecondsShort')}</small></strong>
          </div>
        </section>

        <section className="finder-primary-recommendation finder-result-workbench">
          <div className="finder-workbench-heading">
            <span>{t('finder.recommended')}</span>
            <div><h2>{resultCrosshair.name}</h2><p>{t(`finder.rankReasons.${result.rank.id}`)}</p></div>
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

        <section className="finder-rank-spectrum" aria-labelledby="finder-rank-spectrum-title">
          <div><h2 id="finder-rank-spectrum-title">{t('finder.rankRanges')}</h2><p>{t('finder.rankRangesHint')}</p></div>
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
        </section>

        <button className="finder-back-link" type="button" onClick={exitFinder}><Icon name="arrowLeft" size={17} />{t('finder.backExplore')}</button>
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

      <div className="finder-round-heading"><span />{t('finder.round', { current: roundNumber, total: REACTION_ROUNDS })}<span /></div>
      <button className={`reaction-field is-${phase}`} type="button" onClick={handlePlayArea} data-phase={phase} aria-label={t('finder.playArea')}>
        <span className="finder-corner finder-corner-tl" aria-hidden="true" />
        <span className="finder-corner finder-corner-tr" aria-hidden="true" />
        <span className="finder-corner finder-corner-bl" aria-hidden="true" />
        <span className="finder-corner finder-corner-br" aria-hidden="true" />
        <ReactionReticle />
        <span className="reaction-copy" aria-live="polite"><strong>{phaseTitle}</strong><small>{phaseHint}</small></span>
        <ProgressDots completed={roundTimes.length} t={t} />
      </button>
    </section>
  )
}
