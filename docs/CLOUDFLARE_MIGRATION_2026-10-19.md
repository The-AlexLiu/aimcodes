# Cloudflare migration — in progress

Authorized: migrate the existing production version first, then release Hush. Do not mark complete until DNS, payments/data, live routes and release identity are verified.

## Source and rollback

- Live build marker observed: `2b75ffeb67277c8b0e59a66b732b3f28c00a812c` (2026-10-15).
- Hush saved locally as `d19611e`, production branch merged as `b570ff2`; preserve PR89's three Chinese index exceptions and quick-copy recommendations.
- Original Netlify site: `b244d8b7-4cce-46de-b9b5-2b4f29e30392`, `aimcodes.netlify.app`.
- Registrar: NameSilo, current delegation `ns1.dnsowl.com`, `ns2.dnsowl.com`, `ns3.dnsowl.com`.
- DNS backup (13 records) and BIND import are ignored local files in `output/cloudflare-migration/`; includes Zoho MX/SPF/DKIM, Google verification and Resend records.
- Do not delete Netlify data/site. Do not switch origin until backend and data migration pass. After writes reach Cloudflare, rolling backend back requires reconciliation of new writes, not just switching DNS.

## Prepared

- Worker reuses the existing PayPal handlers; request-scoped D1 store implements atomic create and compare-and-swap used by existing fulfillment and regeneration.
- `PAYMENTS_READY=false` prevents using incomplete migration. Preview refuses production payment environment. Previews have `X-Robots-Tag: noindex, nofollow`.
- `cloudflare/schema.sql`: generic JSON record store with optimistic versions.
- `scripts/cloudflare/prepare-headers.mjs`: converts existing Netlify cache/security policies for static assets.
- D1 `aimcodes-paid-migration`, id `09e0f782-4b02-460c-babf-13e48340409a`; isolated and initially empty.
- Existing production blob inventory: 35 records (not 35 orders). Data copy and readback pending.
- Production baseline built separately from exact source commit, without Hush, in ignored `output/cloudflare-migration/baseline-source`.

## Validation so far

- Merged Hush + current production source: full release 25/25 passed (42.9 s).
- Cloudflare store/redirect checks plus existing PayPal regression: 27/27 passed on Node 26 (SQLite test requires Node 22+).
- Worker dry run successfully bundled; remote baseline preview upload in progress.

## Remaining gates

1. Verify every DNS record after import, with mail CNAME records DNS-only; retain current Netlify target during delegation.
2. Obtain specific permission for machine-only secret transfer (existing user rules prohibit reading credentials); never print secret values or commit them.
3. Transfer all production records, compare content hashes and counts; handle writes during transition with a maintenance/final-sync window. Preserve signing secret so existing cookies/claim links remain valid.
4. Configure production secrets and isolated sandbox testing; verify payment handling, recovery and concurrency on actual Cloudflare runtime. No real charge without user action.
5. Verify baseline preview HTTP, redirects, metadata, robots, sitemaps, assets, 404 and browser behavior.
6. Switch DNS/host only after checks; verify baseline live build marker before releasing Hush.
7. Configure GitHub-based Cloudflare deploy chain and stop Netlify automatic builds after successful cutover. Never leave a second production auto-deployer active.
8. Release Hush after baseline verification; rerun representative desktop/mobile and video checks on public domain. Record exact deployment IDs/commits.

## Checkpoint: DNS delegation and preview

- Created Cloudflare Free zone `118f804f8fee11b40b71054c1f508805`; imported all 13 records and compared name/type/value/MX priority against NameSilo: zero mismatches. All records DNS-only, including Resend CNAMEs.
- NameSilo nameservers changed to `aaron.ns.cloudflare.com` and `ligia.ns.cloudflare.com`; NameSilo readback and Verisign RDAP confirm. Recursive DNS still returned cached dnsowl at last check. Origin remains Netlify (`75.2.60.5` and `aimcodes.netlify.app`).
- Baseline Worker deployed at `https://aimcodes-migration-preview.liusihao05.workers.dev`; first successful version `dfd346d8-7f73-4572-9647-f91f5cb2da35`. First attempt failed startup CPU validation; lazy-loading payment handlers resolved it.
- External HTTP/browser verification blocked by connection timeout from current environment; do not call this preview usable yet. Ego browser later hit CDP timeout. Existing task space is 189, pages p1 Cloudflare, p2 NameSilo, p3 preview. Do not create another task space to recover.
- Local Cloudflare runtime verified eight routes: current production build marker matches, HTML/robots/sitemap 200, missing path 404, private delivery HTML no-store, unconfigured API 503, all preview responses noindex. No customer data migrated and no secret values read.
- Compatibility date pinned to 2026-09-04 supported by installed runtime; Netlify multi-wildcard private headers converted to Cloudflare named locale placeholder. Full release checks passed again; pending final preview redeploy with these fixes.
- User still needs to answer the pending explicit exception for machine-only secret transfer versus manual configuration. Do not access secrets until that answer arrives.
- GitHub has not been pushed; Netlify deployment/automation and production origin remain unchanged. Hush is not live.
- Final preview correction deployed successfully as `ba5f655a-36ab-4352-891b-b07499939fcd`; remote verification still pending. Last full release: 25/25 in 35.3 s. Public build marker still `2b75ffe` after DNS delegation edit.
