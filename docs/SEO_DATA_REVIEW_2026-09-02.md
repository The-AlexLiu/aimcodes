# AimCodes GA4 + GSC SEO review — 2026-09-02

This snapshot records the data and decisions behind the September 2 SEO iteration. The latest complete day available in both products is 2026-08-30.

## Executive diagnosis

- Search growth is still accelerating. GSC clicks increased from 83 to 494 between the previous and latest complete 14-day windows; impressions increased from 6,477 to 21,626.
- CTR improved from 1.28% to 2.28%, while average position stayed broadly flat at 25.84 versus 25.63. The next gain should come from pages already ranking on page one, not another indiscriminate URL expansion.
- Google organic traffic is useful after the click: GA4 recorded 614 sessions, 521 users and 424 engaged sessions from `google / organic` in the latest 28 complete days, a 69.1% engagement rate.
- `funny`, `small`, `pink`, `movement error` and `one tap` are current winners. Rewriting them again would erase the ability to measure the August changes, so this release protects them.

## GSC baseline

Latest window: 2026-08-17 through 2026-08-30. Previous window: 2026-08-03 through 2026-08-16.

| Metric | Latest 14 days | Previous 14 days | Change |
| --- | ---: | ---: | ---: |
| Clicks | 494 | 83 | +495.2% |
| Impressions | 21,626 | 6,477 | +233.9% |
| CTR | 2.28% | 1.28% | +78.2% relative |
| Average position | 25.63 | 25.84 | broadly flat |

### Highest-confidence opportunities

| Search intent | Current landing | Clicks | Impressions | CTR | Position | Decision |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| `valorant dot crosshair` | `/en/dot-crosshairs/` | 2 | 122 | 1.64% | 9.55 | Put copyable codes and preview value directly in H1, intro and snippet |
| `dot crosshair valorant` | `/en/dot-crosshairs/` | 0 | 119 | 0% | 10.92 | Same landing and intent; do not create a duplicate URL |
| `dot crosshair valorant code` | `/en/dot-crosshairs/` | 1 | 112 | 0.89% | 7.69 | Add a direct code/import FAQ answer |
| `valorant aim code` | `/en/` | 2 | 103 | 1.94% | 6.60 | Clarify that AimCodes provides both aim codes and crosshair codes; keep the established title |
| `shooting error valorant` | comparison guide | 0 | 29 | 0% | 7.86 | Move the synonym to the dedicated firing-error guide and keep the comparison page focused |
| `valorant 作戦ボード` | `/ja/tools/valorant-playbook/` | 0 | 7 | 0% | 7.86 | Match the Japanese task wording and communicate that the working tool is free |
| `ヴァロラント 作戦ボード` | `/ja/tools/valorant-playbook/` | 0 | 7 | 0% | 7.00 | Include the Japanese game-name variant naturally in the intro |

### Pages protected in this release

| Page | Latest 14-day result | Reason |
| --- | --- | --- |
| `/en/funny-crosshairs/` | 102 clicks / 898 impressions / 11.36% CTR | Clear winner; expanded on August 27 and still inside its observation window |
| `/en/small-crosshairs/` | 21 / 873 / 2.41% | Existing traction; avoid title churn |
| `/en/pink-crosshairs/` | 20 / 536 / 3.73% | Existing page-one query signals |
| `/en/valorant-movement-error-crosshair/` | 16 / 578 / 2.77% | Recently optimized and already converting impressions into clicks |
| `/en/white-crosshairs/` | `white crosshair valorant`: 0 / 68 / position 7.16 | August 25 copy had only six complete data days and Google last crawled the URL before that change |

## GA4 baseline

Date range: 2026-08-03 through 2026-08-30. There is no comparable GA4 history before August 3, so this is a baseline rather than a growth comparison.

| Metric | Value |
| --- | ---: |
| Sessions | 1,461 |
| Users | 1,208 |
| Engaged sessions | 815 |
| Page views | 3,457 |
| Total events | 14,337 |
| Google organic sessions | 614 |
| Google organic users | 521 |
| Google organic engagement rate | 69.1% |
| Crosshair code copy events | 392 |
| Share events | 31 |

`cn.bing.com / referral` remains separate from Google organic. GA4's existing pages report combines session-scoped landing pages with event-scoped page titles, so GSC page URLs are the primary source for landing-page SEO decisions in this review.

## Technical checks

- GSC lists `sitemap.xml`, `sitemap-crosshairs.xml` and `sitemap-images.xml` as processed with zero warnings and zero errors.
- URL Inspection returned `PASS`, `Submitted and indexed`, successful fetch, indexing allowed and matching Google/user canonicals for the English homepage, Dot, White, Firing Error, comparison guide and Japanese Playbook.
- The Sitemap API's aggregate `indexed: 0` value conflicts with URL Inspection and live search clicks, so it is not treated as evidence that all pages are unindexed.

## Changes in this release

1. Align the English Dot collection H1, intro, grid label, FAQ, title and description with the copy-code intent already ranking at positions 7–12.
2. Clarify the English homepage intro and description around both `aim codes` and `crosshair codes` without changing the winning URL or established title.
3. Give generic `shooting error` intent to the dedicated Firing Error guide and remove that synonym from the movement-versus-firing comparison intro.
4. Align the Japanese Playbook title and snippet with `VALORANT 作戦ボード`, `ヴァロラント 作戦ボード` and the free working-tool value proposition.
5. Add route-specific modified dates for the five changed locale/route pairs. Unchanged Sitemap URLs retain their previous date instead of falsely appearing freshly edited.

## Measurement plan

Review no earlier than 2026-09-10; use 2026-09-17 for a more reliable 14-day comparison.

- Dot: CTR for the three query variants above, page clicks, and `crosshair_code_copy` actions.
- Homepage: `valorant aim code` CTR and whether `/en/` gains share versus `/en/crosshairs/` without harming brand CTR.
- Firing Error: whether generic `shooting error` impressions consolidate on the dedicated page while comparison queries remain on the comparison page.
- Japanese Playbook: impressions, clicks and tool interactions from Japanese organic users.
- Guardrail: do not rewrite a target again before seven complete post-crawl days; do not expand another large catalog batch until the August 27 Funny cohort has 14–28 days of evidence.
