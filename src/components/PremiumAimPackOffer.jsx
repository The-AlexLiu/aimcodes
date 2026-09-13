import { lazy, Suspense, useEffect, useMemo, useRef, useState } from 'react'
import Icon from './Icon.jsx'
import { paidPackCopy } from '../i18n/paidPackCopy.js'
import { AIM_PACK_CHECKOUT_STORAGE_KEY, AIM_PACK_PRODUCT } from '../utils/paidPack.js'
import { getAnalyticsPurchaseContext, trackEvent } from '../utils/analytics.js'

const WhopCheckoutEmbed = lazy(() => import('@whop/checkout/react').then((module) => ({ default: module.WhopCheckoutEmbed })))

function isLocalPreview() {
  if (typeof window === 'undefined') return false
  return ['localhost', '127.0.0.1'].includes(window.location.hostname)
    && new URLSearchParams(window.location.search).get('paid_preview') === '1'
}

export default function PremiumAimPackOffer({ result, locale }) {
  const content = paidPackCopy(locale)
  const [step, setStep] = useState('offer')
  const [mode, setMode] = useState('ranked')
  const [visual, setVisual] = useState('balanced')
  const [email, setEmail] = useState('')
  const [checkout, setCheckout] = useState(null)
  const [error, setError] = useState('')
  const impressionTracked = useRef(false)
  const sectionRef = useRef(null)
  const returnUrl = useMemo(() => `${window.location.origin}/${locale.toLowerCase()}/checkout/complete/`, [locale])

  useEffect(() => {
    if (impressionTracked.current) return
    impressionTracked.current = true
    trackEvent('premium_offer_view', {
      product_id: AIM_PACK_PRODUCT.id,
      price: AIM_PACK_PRODUCT.price,
      currency: AIM_PACK_PRODUCT.currency.toUpperCase(),
      reaction_ms: result.average,
      reaction_rank: result.rank.id,
    })
  }, [result.average, result.rank.id])

  useEffect(() => {
    if (step === 'offer') return undefined
    const frame = window.requestAnimationFrame(() => sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }))
    return () => window.cancelAnimationFrame(frame)
  }, [step])

  const openPreferences = () => {
    setStep('preferences')
    trackEvent('premium_offer_select', { product_id: AIM_PACK_PRODUCT.id, offer_location: 'finder_result' })
  }

  const beginCheckout = async () => {
    setError('')
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setError(content.emailError)
      return
    }
    setStep('loading')
    trackEvent('premium_preference_complete', { product_id: AIM_PACK_PRODUCT.id, play_mode: mode, visual_preference: visual })

    if (isLocalPreview()) {
      window.setTimeout(() => setStep('preview'), 250)
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
          preferences: { mode, visual },
          locale,
          email: email.trim(),
          analytics,
        }),
      })
      const payload = await response.json().catch(() => ({}))
      if (!response.ok || !payload.sessionId) throw new Error(payload.code || 'checkout_unavailable')
      const checkoutState = {
        orderId: payload.orderId,
        statusToken: payload.statusToken,
        claimToken: payload.claimToken,
        locale,
      }
      sessionStorage.setItem(AIM_PACK_CHECKOUT_STORAGE_KEY, JSON.stringify(checkoutState))
      setCheckout(payload)
      setStep('checkout')
      trackEvent('begin_checkout', {
        currency: AIM_PACK_PRODUCT.currency.toUpperCase(),
        value: AIM_PACK_PRODUCT.price,
        product_id: AIM_PACK_PRODUCT.id,
        play_mode: mode,
        visual_preference: visual,
      })
    } catch {
      setError(content.unavailable)
      setStep('preferences')
      trackEvent('premium_checkout_error', { product_id: AIM_PACK_PRODUCT.id, error_stage: 'create_session' })
    }
  }

  const handleComplete = () => {
    trackEvent('checkout_browser_complete', { product_id: AIM_PACK_PRODUCT.id, provider: 'whop' })
    window.location.assign(returnUrl)
  }

  return (
    <section ref={sectionRef} className={`premium-pack-offer is-${step}`} aria-labelledby="premium-pack-title">
      <div className="premium-pack-offer__signal" aria-hidden="true"><span>05</span><i /><i /><i /><i /><i /></div>
      {step === 'offer' && (
        <>
          <div className="premium-pack-offer__copy">
            <span>{content.eyebrow}</span>
            <h2 id="premium-pack-title">{content.title}</h2>
            <p>{content.body}</p>
            <ul>{content.included.map((item) => <li key={item}><Icon name="check" size={15} />{item}</li>)}</ul>
          </div>
          <div className="premium-pack-offer__action">
            <strong>{content.price}</strong>
            <button className="primary-button" type="button" onClick={openPreferences}>{content.cta}<Icon name="arrowLeft" className="premium-arrow" size={17} /></button>
            <small><Icon name="shield" size={14} />{content.secure}</small>
          </div>
        </>
      )}

      {(step === 'preferences' || step === 'loading') && (
        <div className="premium-pack-preferences">
          <div className="premium-pack-preferences__heading">
            <button type="button" onClick={() => setStep('offer')} aria-label={content.back}><Icon name="arrowLeft" size={18} /></button>
            <div><span>{content.eyebrow}</span><h2 id="premium-pack-title">{content.preferenceTitle}</h2></div>
          </div>
          <fieldset><legend>{content.modeLabel}</legend><div>{Object.entries(content.modes).map(([key, label]) => <button className={mode === key ? 'is-selected' : ''} type="button" onClick={() => setMode(key)} aria-pressed={mode === key} key={key}>{label}</button>)}</div></fieldset>
          <fieldset><legend>{content.visualLabel}</legend><div>{Object.entries(content.visuals).map(([key, label]) => <button className={visual === key ? 'is-selected' : ''} type="button" onClick={() => setVisual(key)} aria-pressed={visual === key} key={key}>{label}</button>)}</div></fieldset>
          <label className="premium-pack-email">
            <span>{content.emailLabel}</span>
            <input type="email" inputMode="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder={content.emailPlaceholder} required />
            <small>{content.emailHelp}</small>
          </label>
          <button className="primary-button premium-pack-continue" type="button" onClick={beginCheckout} disabled={step === 'loading'}>{step === 'loading' ? content.loading : content.continue}</button>
          {error && <p className="premium-pack-error" role="alert">{error}</p>}
          <small className="premium-pack-terms">{content.terms} <a href={`/${locale.toLowerCase()}/refund-policy/`}>{content.refundLink}</a></small>
        </div>
      )}

      {step === 'checkout' && checkout && (
        <div className="premium-pack-checkout">
          <div className="premium-pack-checkout__heading"><button type="button" onClick={() => setStep('preferences')}><Icon name="arrowLeft" size={18} />{content.back}</button><span><Icon name="shield" size={15} />{content.secure}</span></div>
          <Suspense fallback={<p role="status">{content.loading}</p>}>
            <WhopCheckoutEmbed
              sessionId={checkout.sessionId}
              environment={checkout.environment}
              returnUrl={returnUrl}
              onComplete={handleComplete}
              onPaymentError={() => trackEvent('premium_checkout_error', { product_id: AIM_PACK_PRODUCT.id, error_stage: 'payment' })}
              theme="dark"
              themeOptions={{ accentColor: '#ff5b55', backgroundColor: '#0b151c', borderRadius: 12, buttonText: content.continue }}
              adaptivePricing
              collectPhoneNumbers={false}
              collectShipping={false}
              locale={locale.toLowerCase()}
            />
          </Suspense>
        </div>
      )}

      {step === 'preview' && <div className="premium-pack-preview-state"><Icon name="shield" size={26} /><h2 id="premium-pack-title">{content.previewTitle}</h2><p>{content.previewBody}</p><button type="button" onClick={() => setStep('offer')}>{content.back}</button></div>}
    </section>
  )
}
