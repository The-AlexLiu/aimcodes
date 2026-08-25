# AimCodes SEO data review — 2026-08-25

This snapshot records the decision basis for the August 25 SEO release. It is intentionally separate from evergreen strategy docs so the same pages can be compared again after 7–14 days.

## Executive diagnosis

- Organic visibility is still growing. GSC impressions rose from 908 on August 16 to 1,467 on August 22.
- Click growth has begun to flatten at roughly 33–41 clicks per day, so the immediate constraint is SERP click-through and page-one intent fit rather than a lack of indexable URLs.
- The site already has more than 1,700 canonical sitemap URLs. This release improves proven and near-page-one routes instead of adding another batch of low-signal pages.
- Recently changed TenZ, teammate-copy, firing-error, and movement-vs-firing pages remain in a 7–14 day observation window and must not be rewritten again before enough post-change data exists.

## GSC baseline

Date range: 2026-08-16 through 2026-08-22.

| Metric | Value |
| --- | ---: |
| Clicks | 179 |
| Impressions | 8,220 |
| CTR | 2.2% |
| Average position | 25.6 |

### Highest-value query opportunities

| Query | Clicks | Impressions | CTR | Position | Decision |
| --- | ---: | ---: | ---: | ---: | --- |
| white crosshair valorant | 0 | 31 | 0% | 7.9 | Rewrite English collection title and snippet |
| dot crosshair | 0 | 30 | 0% | 11.9 | Strengthen relevant internal links; protect current page copy |
| valorant dot crosshair | 0 | 27 | 0% | 10.8 | Strengthen relevant internal links; protect current page copy |
| small crosshair valorant | 0 | 27 | 0% | 11.1 | Strengthen relevant internal links; protect current page copy |
| pink crosshair valorant | 0 | 26 | 0% | 5.5 | Keep current title; collect more data before rewriting |
| movement error valorant | 0 | 11 | 0% | 7.1 | Protect recent query-targeting update |
| shooting error valorant | 0 | 14 | 0% | 8.5 | Protect recent query-targeting update |

### Pages to protect

| Page | Clicks | Impressions | CTR | Position | Reason |
| --- | ---: | ---: | ---: | ---: | --- |
| `/en/funny-crosshairs/` | 19 | 269 | 7.1% | 12.2 | Strongest collection demand; only add contextual links |
| `/en/small-crosshairs/` | 12 | 358 | 3.4% | Existing traction; avoid title churn |
| `/en/pink-crosshairs/` | 11 | 313 | 3.5% | Page-one query variants; avoid premature rewrite |
| `/en/valorant-movement-error-crosshair/` | 9 | 236 | 3.8% | Strong intent and recently optimized |
| `/en/one-tap-crosshairs/` | 8 | 153 | 5.2% | High engagement and healthy CTR |

## GA4 baseline

Comparison: 2026-08-17 through 2026-08-23 versus 2026-08-10 through 2026-08-16.

| Source / metric | Current | Previous | Note |
| --- | ---: | ---: | --- |
| Google organic users | 178 | — | 214 sessions, 70.1% engagement rate |
| Organic Search users | 347 | 76 | Inflated by Bing referral classification |
| Organic page views | 978 | 283 | Engagement rate remained stable at about 66% |
| `crosshair_code_copy` events | 173 | 36 | Strong growth in the core product action |
| `share` events | 13 | 0 | Sharing is now measurable but still early |

`cn.bing.com / referral` contributed 145 users and 159 sessions. This is search traffic classified as referral in GA4, so channel-level “Organic Search” comparisons must be reconciled with source/medium before being used as a growth claim. Do not add it to unwanted referrals because that would hide the source as Direct.

## Changes in this release

1. Rewrite the English white-crosshair collection title, intro, and snippet around the page-one query.
2. Align the inner-lines-versus-outer-lines and gap/offset guides with their exact settings intent.
3. Add dot and small collections as contextual next steps from funny and white collections.
4. Show actual dot size, line length, thickness, and offset on every crosshair detail page.
5. Localize color names on detail pages instead of leaking Portuguese source labels into English, Chinese, Spanish, or Japanese pages.

## Measurement rules for the next review

Review no earlier than 2026-09-01 and preferably after 2026-09-08.

- Compare page and query performance over equal 7-day periods.
- Treat a title rewrite as a win when impressions are stable or higher and CTR increases by at least 20% relative.
- Do not rewrite the same URL again based on fewer than seven complete days of post-change data.
- Watch the English white collection for `white crosshair valorant` and related variants.
- Watch the two settings guides for non-branded impressions, CTR, and engaged sessions.
- Keep Google, Bing organic, and `cn.bing.com / referral` separate in GA4 reporting.
