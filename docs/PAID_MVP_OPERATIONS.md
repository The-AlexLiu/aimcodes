# AimCodes Crosshair Pack — operations

## Commercial settings

- Product: `AimCodes Crosshair Pack`
- Price: one-time USD 1.99
- Delivery: immediate browser access to five tailored crosshairs, two regenerations, and three retained versions
- Access: no fixed product expiry; email recovery is enabled when Resend is configured, with receipt-based support as the fallback
- Support: `contact@aimcodes.com`
- Refund policy: `/en/refund-policy/` (localized route variants are generated)

## Required production settings

Add the variables listed in `.env.example` to Netlify environment variables. Secrets must never be committed or prefixed with `VITE_`.

In Whop, create or select the `AimCodes Crosshair Pack` product, keep the launch offer at USD 1.99 one-time, then create a webhook endpoint:

`https://aimcodes.com/api/aim-pack/whop-webhook`

Subscribe to `payment.succeeded`. Copy the signing secret into `WHOP_WEBHOOK_SECRET` exactly as shown by Whop.

Give the Whop API key only the permissions needed to create checkout configurations and plans. AimCodes collects the delivery email before opening Whop checkout and binds it to the server-side pending order; it is never put into checkout metadata or browser storage.

## Safe release sequence

1. Keep `WHOP_ENVIRONMENT=sandbox`.
2. Create the separate Whop sandbox business, API key, and webhook, then set `WHOP_SANDBOX_API_KEY`, `WHOP_SANDBOX_ACCOUNT_ID`, and `WHOP_SANDBOX_WEBHOOK_SECRET`. A sandbox product is optional because checkout uses an inline plan.
3. Deploy a Netlify preview and verify desktop/mobile free-result, preference, checkout, callback, entitlement, copy, regenerate, recovery, and noindex behavior.
4. Send a signed sandbox `payment.succeeded` webhook and confirm fulfillment happens once even if the webhook is delivered twice.
5. Confirm the price/currency/account mismatch tests reject fulfillment.
6. If email recovery is enabled for this release, confirm Resend domain authentication and delivery from `delivery@mail.aimcodes.com` with Reply-To `contact@aimcodes.com`. Without Resend, keep immediate browser delivery and receipt-based support available and do not describe email delivery as verified.
7. Merge only after preview checks pass.
8. Set `WHOP_ENVIRONMENT=production` only after the Whop account, product, API key, webhook, refund page, and delivery email are all verified.
9. Validate the first real purchase with an independent buyer. The merchant must not purchase from itself.

## 2026-09-13 sandbox evidence

- A Whop Sandbox USD 1.99 checkout completed without a real charge.
- The verified `payment.succeeded` webhook created exactly one entitlement and redirected the browser to the private pack.
- The pack contained five usable crosshair slots.
- Two regenerations reduced the remaining allowance from 2 to 1 to 0; the third regeneration action was disabled.
- A 390px mobile viewport had no horizontal overflow.
- No production payment was attempted.

## Support checks

For a missing delivery, ask only for the Whop receipt ID and checkout email. Never request full card details, passwords, API keys, cookies, or account credentials. Check the corresponding order, payment, and entitlement records in the `aimcodes-paid-entitlements` Netlify Blobs store.
