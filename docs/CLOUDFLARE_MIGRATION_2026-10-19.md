# Cloudflare migration — 2026-10-19

## Scope

Migrate the existing live site first, then publish Hush. Paid crosshair packs are permanently retired at the user's request. All purchase, delivery, recovery and refund interfaces are removed from navigation; old URLs redirect to the free catalog and discard query tokens. All retired API routes return 410. Five-language contact and privacy copy reflects this change.

No payment credentials were read or transferred. No customer records were copied. Historical Netlify data remains intact; the earlier D1/payment migration draft is superseded and has no production binding.

## Source and rollback

- Original production commit: `2b75ffeb67277c8b0e59a66b732b3f28c00a812c`.
- Baseline source is built separately from this commit with free-site retirement changes, without Hush. Its marker ends in `-free-migration` to distinguish it from the original commit.
- Original Netlify site: `b244d8b7-4cce-46de-b9b5-2b4f29e30392`, origin `aimcodes.netlify.app`, previous apex A `75.2.60.5`.
- Netlify automatic builds are stopped (`stop_builds=true`, verified). Do not delete the old site or historical data.
- DNS backup: ignored `output/cloudflare-migration/namesilo-dns-before.json` and `aimcodes-dns.zone`. Mail/verification records must remain unchanged. Restoring the old web origin would also restore the old purchase UI; use only as an emergency rollback with that consequence understood.

## Cloudflare

- Account: `09d1cc2373bb7e37b6b0a85826059f9f`.
- Active zone: `118f804f8fee11b40b71054c1f508805`.
- NameSilo delegation: `aaron.ns.cloudflare.com`, `ligia.ns.cloudflare.com`, confirmed in registrar and RDAP.
- All 13 original DNS records matched after import. Zoho, Resend and Google records are retained.
- Preview Worker: `aimcodes-migration-preview`, custom domain `preview.aimcodes.com`, noindex.
- Production Worker: `aimcodes`, custom domains `aimcodes.com` and `www.aimcodes.com`. The latter redirects to the apex.
- Runtime contains only static assets, redirects and retired API responses. No payment secrets, customer database or mail credentials are required.
- Source configuration: `wrangler.jsonc`; build `pnpm build:cloudflare`; deployment `pnpm deploy:cloudflare`.
- `prepare-headers.mjs` carries forward cache/security headers from the archived Netlify configuration. Production preparation must omit `--preview`.

## Verified before cutover

- Full release suite: 25/25 passed.
- Cloudflare adapter/retirement tests: 4/4 passed, including all 20 legacy localized route redirects with query removal.
- GitHub required checks `product-data` and `build-and-seo` passed for PR #90.
- Latest baseline preview version: `772ef8d3-6c01-4177-8799-0eedf83665a0`.
- Baseline five-language pages, robots, sitemaps, 404 and retired APIs passed remote checks. Hush is absent from baseline.
- Latest mobile contact-page readback: no purchase/recovery/refund links, no horizontal overflow; recovery URL resolves to the free catalog.

## Release gates still pending

1. Verify the production baseline after custom-domain cutover, including build marker, mail DNS preservation and removal of preview noindex headers.
2. Merge PR #90 only after baseline verification, then deploy the Hush version and verify public media and desktop/mobile behavior.
3. Connect and verify Cloudflare GitHub builds for main. Keep Netlify builds stopped.
4. Record final production version and commit in handoff documentation. A configured pipeline is not proof of a successful build.
