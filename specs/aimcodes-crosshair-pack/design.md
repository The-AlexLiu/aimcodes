# AimCodes Crosshair Pack — Design

## User experience

The free reaction result remains the first value moment. Immediately after the free crosshair workbench, an industrial “loadout unlock” panel previews five locked roles, explains the one-time USD 1.99 price, and opens a compact preference step. Checkout is embedded in a dark modal on desktop and a near-full-height sheet on mobile.

The private pack page shows the five selected crosshairs as a tactical loadout. Each item includes its role, why it fits, a map preview, and a copy-code control. Recovery is email based and intentionally generic.

## Visual direction

- Preserve the AimCodes dark navy foundation, brand red action color, cyan signal color, and existing display typography.
- Use subtle grid, scan-line, target-corner, and loadout-slot details instead of generic SaaS cards.
- Motion is limited to opacity/transform and respects `prefers-reduced-motion`.
- The paid offer is clearly subordinate to the free result and never obscures test metrics or copy controls.

## Architecture

### Frontend

- `PremiumAimPackOffer`: preferences, checkout-session creation, embedded Whop checkout, browser-complete polling, and funnel analytics.
- `AimPackPage`: cookie-gated entitlement view, copy actions, regeneration, and recovery form.
- `paidPackCopy`: localized paid-product UI for all five maintained product locales.
- `paidPack`: shared deterministic selection rules and public-safe pack formatting.

### Netlify Functions

- `aim-pack-create-checkout`: validates reaction result/preferences, stores a draft, creates an inline one-time Whop checkout configuration, and returns session/plan IDs.
- `whop-webhook`: verifies Standard Webhooks signature on raw bytes, validates the payment, fulfills once, then sends best-effort email and GA4 purchase.
- `aim-pack-status`: returns only the draft fulfillment state and a one-time claim URL after browser completion.
- `aim-pack-claim`: consumes a claim token, sets an access cookie, and redirects.
- `aim-pack-entitlement`: returns the current pack for a valid access cookie.
- `aim-pack-regenerate`: consumes one of two regeneration credits and creates the next version.
- `aim-pack-recover`: sends a fresh claim link if the normalized email exists while always returning the same public response.

### Storage

Netlify Blobs uses strong consistency with immutable identifiers:

- `orders/<orderId>` — sanitized draft and fulfillment status.
- `payments/<paymentId>` — minimal deduplication receipt.
- `entitlements/<entitlementId>` — access state and pack versions.
- `email-index/<sha256(email)>` — entitlement pointer.
- `claims/<sha256(token)>` — one-time claim record.

### Configuration

Required: `WHOP_API_KEY`, `WHOP_WEBHOOK_SECRET`, `WHOP_ACCOUNT_ID`, `WHOP_ENVIRONMENT`.

Optional but required for full production delivery/measurement: `RESEND_API_KEY`, `GA4_API_SECRET`, `GA4_MEASUREMENT_ID`, `AIMCODES_SITE_ORIGIN`, `AIMCODES_ENTITLEMENT_SECRET`, `AIMCODES_EMAIL_HASH_SECRET`.

## Failure handling

- API errors return stable public error codes; detailed secrets or upstream bodies are never sent to the browser.
- Email and Measurement Protocol failures are logged with non-PII identifiers and do not fail fulfillment.
- The status page polls with bounded backoff and offers recovery/support after timeout.
