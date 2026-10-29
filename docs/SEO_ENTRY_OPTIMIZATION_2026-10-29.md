# SEO entry optimization — 2026-10-29

Status: owner authorized release after user-flow review on October 29; release verification follows below. Branch: `codex/seo-entry-optimization`; base commit: `e7207d7`. The previous mixed worktree and all its pending changes are untouched.

## Scope and decisions

The owner's October 29 GA4/GSC review prioritizes existing English Dot, Spanish Best and Portuguese catalog entry pages. Preserve routes, canonical rules, index permissions, code records and analytics behavior. Public interface changes are shared across five locales; this does not add indexed URLs. Funny, Small and Japanese content expansion remain outside this implementation, so their existing search performance is not disrupted by an unverified rewrite.

- Dot: split the shortlist into two actual pure dots (Demon1, Needle) and two line-based alternatives (Tap Dot Apex, Pixel). Enable the existing copy handler on Dot shortlist buttons. Put pure dots first in the shared collection manifest, which also regenerates the Dot collection OG image.
- Best: retain the existing starting-shape shortlist and direct-copy actions. Add concise in-game import instructions and a working guide link. Spanish metadata now names point/cross choices instead of repeating a generic copying promise.
- Catalog: add the same localized import help. Portuguese metadata leads with crosshair codes and the choose/copy task. Existing search, generator and selection links remain intact.
- Static HTML renders the same groups, descriptions and guide links as React. Only the five-locale Dot, Best and catalog route dates change to October 29. Existing localized titles remain unchanged except the two metadata titles above.
- Existing dependency audit failed on six advisories in Vite 8.2.0. Pin Vite to fixed patch 8.2.4, with its lockfile dependency updates. No hosting configuration changes.

## Files

Modified: `src/components/SeoCollectionIntro.jsx`, `src/components/SeoPageIntro.jsx`, `src/seo/dotSelectionContent.js`, `src/seo/octoberReviewContent.js`, `src/seo/metadata.js`, `src/data/catalogManifest.js`, `src/styles.css`, `scripts/generate-localized-routes.mjs`, `scripts/test-localization-parity.mjs`, `scripts/validate-keyword-opportunities.mjs`, `package.json`, `pnpm-lock.yaml`, and generated `public/images/og/collections/dot-crosshairs.jpg`.

Added: `src/components/SeoEntryHelp.jsx`, `src/seo/entryHelp.js`, this handoff report. `docs/HANDOFF.md` links here. Local ignored `output/seo-entry-2026-10-29/` contains screenshots and the passing check report; `dist/` and `.aimcodes-reports/` are local build/check artifacts.

## Verification

- `pnpm check:auto` selected the full release suite. Its old three-pick expectation exposed the intended Needle addition; the test now verifies all four choices and parses each code to ensure pure dots have no active lines and alternatives do.
- Final `pnpm check:release`: 25/25 passed, 38.8 seconds. Includes lint, build, localization, route/SEO/index scope, crosshairs, internal links, analytics, images and dependency audit.
- 548 records / 540 visible styles / 396 indexable crosshair records, 3,300 generated routes and 2,045 Sitemap URLs remain unchanged. 264,551 generated internal links checked. IndexNow was dry-run only; no indexing notification sent.
- Ego browser: all 15 affected locale/page combinations loaded from the built preview, with localized help and expected group counts. All 15 checked at an explicit 390px viewport without horizontal overflow. English Dot also visually checked on desktop and mobile; Spanish Best and Portuguese catalog screenshots checked at 390px.
- Actual English Demon1 copy button wrote the complete original code through the Clipboard API and displayed Copied. Portuguese import link activated with keyboard and reached the correct guide.
- Chinese UI copy checked with dbs-ai-check as short operational instructions: no actionable expression issue identified. No first-person claims, performance promises or invented code data added.
- Generated Dot OG image visually reviewed. New wording and code settings agree with the parser; not a claim of fresh in-game testing or current player settings.

## Release and measurement

Owner authorized commit/push/PR/release after review. Check CI and the actual deployment preview before merging; verify production afterward. GA4/GSC settings remain unchanged. Current production host is Cloudflare, not the historical Netlify deployment.

After an authorized release, verify the three target pages, shared locale variants, metadata, canonical/index directives, copying and guide links. Observe 7/14/28 days; compare the same page/query/country/device segments and copying users. Do not claim CTR uplift from successful builds. Suggested CTR hypotheses from the review: Dot 2.5%, Spanish Best 2.0%, Portuguese catalog 2.0%, with copying users improving too. Do not automatically expand to more pages if the 28-day comparison fails to improve.

Rollback boundary: revert this task's exact files after any future commit; do not reset the old mixed worktree. Keep the Vite security patch independently if rolling back only SEO presentation.

## Final user-flow review

Needle shortlist copying and navigation to its preview were verified. Its old “maximum precision” description was misleading, so the five-language detail copy and original Portuguese description now describe the parsed size-1 cyan dot without accuracy promises. No code or shape changed. The five Needle route modification dates are included. The original fixed details are in `src/i18n/translations.js` and `src/data/expandedCrosshairs.js`.
