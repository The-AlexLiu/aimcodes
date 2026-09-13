# AimCodes Crosshair Pack — Requirements

## Objective

Add a low-friction paid MVP to the reaction-test result flow. The free result remains complete; buyers may unlock a five-crosshair personalized pack for a one-time USD 1.99 payment through Whop.

## Product rules

- Product name: `AimCodes Crosshair Pack`; in-product label: `My Aim Pack`.
- One-time launch price: USD 1.99.
- Every paid pack contains five roles: all-round, close-range, long-range, high-visibility, and warm-up/fun.
- The user may choose a play mode and visual preference; defaults must allow checkout without answering.
- A purchase grants long-term access without a fixed product expiry, subject to the terms and service availability.
- The first pack and two regenerations are included; at most three versions are retained.
- Support and refund requests use `contact@aimcodes.com`.

## Functional requirements

1. WHEN a user completes the reaction test, THE SYSTEM SHALL show the existing free recommendation before a paid offer.
2. WHEN checkout is not configured or fails to load, THE SYSTEM SHALL keep the free result fully usable and show a recoverable, non-blocking state.
3. WHEN the buyer begins checkout, THE SYSTEM SHALL create a server-side order draft and a Whop checkout configuration containing only the order identifier as metadata.
4. WHEN Whop sends `payment.succeeded`, THE SYSTEM SHALL verify the raw webhook signature before parsing or fulfilling the order.
5. WHEN a verified payment does not match the expected account, price, currency, or order, THE SYSTEM SHALL reject fulfillment.
6. WHEN the same payment or webhook is delivered again, THE SYSTEM SHALL return success without creating a second entitlement.
7. WHEN a verified payment succeeds, THE SYSTEM SHALL generate and store the five-crosshair pack, an entitlement, a hashed recovery index, and a one-time claim token.
8. WHEN a user claims a valid token, THE SYSTEM SHALL set an HttpOnly, Secure, SameSite=Lax access cookie and redirect to a clean private pack URL.
9. WHEN the access cookie is valid, THE SYSTEM SHALL return the pack without exposing stored payment or email details.
10. WHEN a buyer requests a regeneration and has fewer than two regenerations, THE SYSTEM SHALL create a new deterministic version and retain no more than three versions.
11. WHEN a buyer submits the delivery email to recovery, THE SYSTEM SHALL respond generically and email a fresh claim link without revealing whether the address exists.
12. WHEN fulfillment succeeds, THE SYSTEM SHALL send a best-effort delivery email and a deduplicated server-side GA4 `purchase` event; either integration may fail without revoking access.

## Security and privacy

- Secrets exist only in Netlify environment variables and are never returned by public configuration endpoints.
- Payment fulfillment is never based on browser redirect state.
- Raw card data and complete webhook payloads are not stored.
- Email addresses are normalized, hashed for lookup, and omitted from client analytics.
- Private routes are `noindex, nofollow`, excluded from the sitemap, and ineligible for ads.
- Public API responses use `no-store`; state-changing routes accept same-origin requests only.
- The claim token is random, hashed at rest, short lived, and single use.

## Acceptance criteria

- Desktop and 390 px mobile layouts pass visual and keyboard QA.
- Checkout can be exercised in Whop sandbox; production activation requires a separate live-account configuration and independent buyer test.
- Automated validation covers pack selection, request validation, noindex/private routes, event names, and secret scanning.
- `pnpm check:release` passes before release.
