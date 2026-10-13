import { useEffect, useRef, useState } from 'react'
import { readCheckoutDraft, saveCheckoutDraft } from '../utils/checkoutDraft.js'
import Icon from './Icon.jsx'
import { previewBackgroundOptions } from '../data/previewOptions.js'
import { paidPackCopy } from '../i18n/paidPackCopy.js'
import { AIM_PACK_CHECKOUT_STORAGE_KEY, AIM_PACK_PRODUCT } from '../utils/paidPack.js'
import { getAnalyticsPurchaseContext, trackEvent } from '../utils/analytics.js'

const OFFER_VARIANT = 'proof_preview_v1'

function isLocalPreview() {
  if (typeof window === 'undefined') return false
  return ['localhost', '127.0.0.1'].includes(window.location.hostname)
    && new URLSearchParams(window.location.search).get('paid_preview') === '1'
}

export default function PremiumAimPackOffer({ result, locale, onRetest }) {
  const content = paidPackCopy(locale)
  const [draft] = useState(() => readCheckoutDraft())
  const [step, setStep] = useState(draft?.step || 'offer')
  const [hasPack, setHasPack] = useState(false)
  const [buyNew, setBuyNew] = useState(draft?.buyNew || false)
  const [mode, setMode] = useState(draft?.preferences?.mode || 'ranked')
  const [visual, setVisual] = useState(draft?.preferences?.visual || 'balanced')
  const [weapon, setWeapon] = useState(draft?.preferences?.weapon || 'rifle')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const impressionTracked = useRef(false)
  const sectionRef = useRef(null)
  const emailRef = useRef(null)
  const checkoutLock = useRef(false)

  useEffect(() => {
    saveCheckoutDraft({ buyNew, preferences: { mode, visual, weapon }, step: step === 'offer' ? 'offer' : 'preferences' })
  }, [mode, visual, weapon, step, buyNew])

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/aim-pack/entitlement', { signal: AbortSignal.any([controller.signal, AbortSignal.timeout(10000)]) })
      .then(async response => { const payload = response.ok ? await response.json().catch(() => ({})) : {}; if (payload.entitlement?.state === 'active') setHasPack(true) }).catch(() => {})
    return () => controller.abort()
  }, [])

  useEffect(() => {
    if (impressionTracked.current || !sectionRef.current) return undefined
    const node = sectionRef.current
    const observer = new IntersectionObserver((entries) => {
      if (!entries.some((entry) => entry.isIntersecting && entry.intersectionRatio >= 0.35)) return
      impressionTracked.current = true
      trackEvent('premium_offer_view', {
        product_id: AIM_PACK_PRODUCT.id,
        price: AIM_PACK_PRODUCT.price,
        currency: AIM_PACK_PRODUCT.currency.toUpperCase(),
        reaction_ms: result.average,
        reaction_rank: result.rank.id,
        recommendation_profile: result.profile,
        offer_variant: OFFER_VARIANT,
      })
      observer.disconnect()
    }, { threshold: [0.35] })
    observer.observe(node)
    return () => observer.disconnect()
  }, [result.average, result.profile, result.rank.id])

  useEffect(() => {
    if (step === 'offer') return undefined
    const frame = window.requestAnimationFrame(() => sectionRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }))
    return () => window.cancelAnimationFrame(frame)
  }, [step])

  const openPreferences = () => {
    if (hasPack && !buyNew) { window.location.assign(`/${locale.toLowerCase()}/my-aim-pack/`); return }
    setStep('preferences')
    trackEvent('premium_offer_select', { product_id: AIM_PACK_PRODUCT.id, offer_location: 'finder_result', offer_variant: OFFER_VARIANT })
    trackEvent('premium_preferences_view', { product_id: AIM_PACK_PRODUCT.id, offer_variant: OFFER_VARIANT })
  }

  const goBack = (nextStep) => {
    trackEvent('checkout_exit', { product_id: AIM_PACK_PRODUCT.id, from_step: step, to_step: nextStep, offer_variant: OFFER_VARIANT })
    setStep(nextStep)
  }

  const openFreeCatalog = () => {
    trackEvent('premium_free_catalog_click', {
      product_id: AIM_PACK_PRODUCT.id,
      offer_location: 'finder_result',
      reaction_rank: result.rank.id,
    })
  }

  const beginCheckout = async () => {
    if (checkoutLock.current) return
    if (hasPack && !buyNew) { window.location.assign(`/${locale.toLowerCase()}/my-aim-pack/`); return }
    setError('')
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError(content.emailError)
      emailRef.current?.focus()
      trackEvent('premium_email_error', { product_id: AIM_PACK_PRODUCT.id, error_reason: 'invalid_format', offer_variant: OFFER_VARIANT })
      return
    }
    checkoutLock.current = true
    setStep('loading')
    trackEvent('premium_preference_complete', { product_id: AIM_PACK_PRODUCT.id, play_mode: mode, visual_preference: visual, weapon_preference: weapon, offer_variant: OFFER_VARIANT })

    if (isLocalPreview()) {
      window.setTimeout(() => { setStep('preview'); checkoutLock.current = false }, 250)
      return
    }

    try {
      const analytics = await getAnalyticsPurchaseContext()
      const response = await fetch('/api/aim-pack/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          result: {
            average: result.average,
            consistency: result.consistency,
            best: result.best,
            profile: result.profile,
            rank: result.rank.id,
          },
          preferences: { mode, visual, weapon },
          locale,
          email: email.trim(),
          analytics,
        }),
        signal: AbortSignal.timeout(30000),
      })
      const payload = await response.json().catch(() => ({}))
      if (!response.ok || !payload.approvalUrl || !payload.paypalOrderId) throw new Error(payload.code || 'checkout_unavailable')
      if (payload.returnOrigin !== window.location.origin) throw new Error('checkout_return_origin_mismatch')
      const checkoutState = {
        orderId: payload.orderId,
        statusToken: payload.statusToken,
        claimToken: payload.claimToken,
        locale,
        provider: 'paypal',
        paypalOrderId: payload.paypalOrderId,
      }
      sessionStorage.setItem(AIM_PACK_CHECKOUT_STORAGE_KEY, JSON.stringify(checkoutState))
      trackEvent('begin_checkout', {
        currency: AIM_PACK_PRODUCT.currency.toUpperCase(),
        value: AIM_PACK_PRODUCT.price,
        product_id: AIM_PACK_PRODUCT.id,
        play_mode: mode,
        visual_preference: visual,
        weapon_preference: weapon,
        offer_variant: OFFER_VARIANT,
      })
      // This event means PayPal created an approval URL, not a rendered provider UI.
      trackEvent('checkout_redirect', { product_id: AIM_PACK_PRODUCT.id, provider: 'paypal', offer_variant: OFFER_VARIANT })
      window.location.assign(payload.approvalUrl)
    } catch {
      checkoutLock.current = false
      setError(content.unavailable)
      setStep('preferences')
      trackEvent('premium_checkout_error', { product_id: AIM_PACK_PRODUCT.id, error_stage: 'create_session' })
    }
  }


  return (
    <section id="premium-pack-offer" ref={sectionRef} className={`premium-pack-offer is-${step}`} aria-labelledby="premium-pack-title">
      <div className="premium-pack-offer__signal" aria-hidden="true"><span>05</span><i /><i /><i /><i /><i /></div>
      {step === 'offer' && (
        <>
          <div className="premium-pack-offer__main">
            <div className="premium-pack-offer__copy">
              <span>{content.eyebrow}</span>
              <h2 id="premium-pack-title">{content.title}</h2>
              <p>{content.body}</p>
              <ul>{content.included.map((item) => <li key={item}><Icon name="check" size={15} />{item}</li>)}</ul>
            </div>
          </div>
          <div className="premium-pack-offer__side">
            <div className="premium-pack-offer__action">
              <strong>{content.price}</strong>
              <span>{content.priceNote}</span>
              <p className="premium-pack-offer__decision"><Icon name="target" size={15} />{content.decisionNote}</p>
              <button className="primary-button" type="button" onClick={openPreferences}>{hasPack && !buyNew ? content.openPack : content.cta}<Icon name="arrowLeft" className="premium-arrow" size={17} /></button>
              {hasPack && !buyNew && <button className="premium-buy-another" type="button" onClick={() => { setBuyNew(true); setStep('preferences') }}>{content.buyAnother}</button>}
              <ul className="premium-pack-delivery-facts">{content.deliveryFacts.map((item) => <li key={item}><Icon name="check" size={13} />{item}</li>)}</ul>
              <small><Icon name="shield" size={14} />{content.secure}</small>
              <a href={`/${locale.toLowerCase()}/crosshairs/`} onClick={openFreeCatalog}>{content.freeCatalog}</a>
            </div>
            <div className="premium-pack-sample">
              <div className="premium-pack-sample__visual" aria-hidden="true">
                <img src={previewBackgroundOptions[0].image} alt="" />
                <span className="premium-pack-sample__reticle"><i /><i /><i /><i /></span>
                <em>{content.sampleEyebrow}</em>
              </div>
              <div className="premium-pack-sample__copy">
                <span>{content.sampleEyebrow}</span>
                <strong>{content.sampleTitle}</strong>
                <p>{content.sampleBody}</p>
                <code>{content.sampleCode}</code>
              </div>
            </div>
            <div className="premium-pack-slots" aria-label={content.slotsLabel}>
              <div><strong>{content.slotsTitle}</strong><span>{content.slotsBody}</span></div>
              {Object.entries(content.roles).map(([key, label], index) => (
                <div className="premium-pack-slot" key={key}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{label}</strong>
                  <Icon name="lock" size={14} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {(step === 'preferences' || step === 'loading') && !(hasPack && !buyNew) && (
        <div className="premium-pack-preferences">
          <div className="premium-pack-preferences__heading">
            <button type="button" onClick={() => goBack('offer')} disabled={step === 'loading'} aria-label={content.back}><Icon name="arrowLeft" size={18} /></button>
            <div><span>{content.eyebrow}</span><h2 id="premium-pack-title">{content.preferenceTitle}</h2><p>{content.preferenceIntro}</p></div>
          </div>
          <div className="premium-pack-preferences__layout">
            <div>
              <fieldset><legend>{content.modeLabel}</legend><div>{Object.entries(content.modes).map(([key, label]) => <button className={mode === key ? 'is-selected' : ''} type="button" onClick={() => setMode(key)} aria-pressed={mode === key} key={key}>{label}</button>)}</div></fieldset>
              <fieldset><legend>{content.visualLabel}</legend><div>{Object.entries(content.visuals).map(([key, label]) => <button className={visual === key ? 'is-selected' : ''} type="button" onClick={() => setVisual(key)} aria-pressed={visual === key} key={key}>{label}</button>)}</div></fieldset>
              <fieldset><legend>{content.weaponLabel}</legend><div>{Object.entries(content.weapons).map(([key, label]) => <button className={weapon === key ? 'is-selected' : ''} type="button" onClick={() => setWeapon(key)} aria-pressed={weapon === key} key={key}>{label}</button>)}</div></fieldset>
              <label className="premium-pack-email">
                <span>{content.emailLabel}</span>
                <input ref={emailRef} type="email" inputMode="email" autoComplete="email" value={email} onChange={(event) => { setEmail(event.target.value); setError('') }} placeholder={content.emailPlaceholder} aria-invalid={error === content.emailError || undefined} aria-describedby={`premium-email-help${error ? ' premium-email-error' : ''}`} required />
                <small id="premium-email-help">{content.emailHelp}</small>
              </label>
              <button className="primary-button premium-pack-continue" type="button" onClick={beginCheckout} disabled={step === 'loading'}>{step === 'loading' ? content.loading : content.continue}</button>
              {error && <p id="premium-email-error" className="premium-pack-error" role="alert">{error}</p>}
              <p className="premium-pack-paypal-note">{content.paypalNote}</p>
              <small className="premium-pack-terms">{content.terms} <a href={`/${locale.toLowerCase()}/refund-policy/`}>{content.refundLink}</a></small>
            </div>
            <aside className="premium-pack-preferences__summary">
              <span>{content.eyebrow}</span>
              <strong>{content.price}</strong>
              <p>{content.priceNote}</p>
              <ul>{content.deliveryFacts.map((item) => <li key={item}><Icon name="check" size={14} />{item}</li>)}</ul>
              <small><Icon name="shield" size={14} />{content.secure}</small>
            </aside>
          </div>
        </div>
      )}

      {hasPack && !buyNew && step !== 'offer' && <div className="premium-existing-pack"><a className="primary-button" href={`/${locale.toLowerCase()}/my-aim-pack/`}>{content.openPack}</a><button type="button" onClick={() => setBuyNew(true)}>{content.buyAnother}</button></div>}
      <div className="finder-mobile-actions" aria-label={content.preferenceTitle}><button className="finder-secondary-button" type="button" onClick={onRetest} disabled={step === 'loading'}>{content.retest}</button><button className="primary-button" type="button" disabled={step === 'loading'} onClick={() => { if (step === 'offer') { trackEvent('premium_offer_mobile_jump', { product_id: AIM_PACK_PRODUCT.id, offer_location: 'finder_mobile_bar' }); openPreferences() } else if (hasPack && !buyNew) openPreferences(); else beginCheckout() }}>{step === 'loading' ? content.loading : hasPack && !buyNew ? content.openPack : step === 'offer' ? content.shortCta : content.continue}</button></div>
      {step === 'preview' && <div className="premium-pack-preview-state"><Icon name="shield" size={26} /><h2 id="premium-pack-title">{content.previewTitle}</h2><p>{content.previewBody}</p><button type="button" onClick={() => setStep('offer')}>{content.back}</button></div>}
    </section>
  )
}
