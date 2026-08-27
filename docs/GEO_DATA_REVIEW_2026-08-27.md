# AimCodes GEO data review — 2026-08-27

## Executive decision

AimCodes already receives measurable traffic from AI answers, but the current sample is small and the landing experience is weaker than organic search. The highest-value next step is not to create generic “AI SEO” pages. It is to make the existing catalog easier to cite, add a proprietary data asset, preserve the search pages already winning, and measure AI referrals separately.

This release therefore adds a multilingual crosshair statistics page built from the live indexable catalog, visible source links on crosshair and player pages, machine-readable Dataset and citation data, explicit ChatGPT search crawler access, and a dedicated GA4 AI referral event.

## GA4 findings

Window: 2026-07-30 through 2026-08-26.

| Segment | Sessions | Engaged sessions | Engagement rate | Average engagement | Events per session |
| --- | ---: | ---: | ---: | ---: | ---: |
| All traffic | 1,118 | — | — | — | — |
| Organic Search | 636 | 339 | 53.3% | 32 seconds | 9.47 |
| AI Assistant | 8 | 2 | 25.0% | 6 seconds | 7.38 |

All eight AI Assistant sessions were attributed to `chatgpt.com`.

Known AI landing pages:

| Landing page | Sessions | Average engagement |
| --- | ---: | ---: |
| `/en/pink-crosshairs` | 2 | 4 seconds |
| `/en/crosshairs/tenz` | 1 | 0 seconds |
| `/en/how-to-make-circle-crosshair-valorant` | 1 | 11 seconds |
| `/en/pro-players` | 1 | 32 seconds |
| `/en/valorant-movement-error-crosshair` | 1 | 1 second |
| `/zh-cn/best-valorant-crosshair-colors` | 1 | 0 seconds |
| `(not set)` | 1 | — |

Interpretation:

- ChatGPT discovery already works, so AimCodes has a real GEO baseline rather than a hypothetical opportunity.
- The pro-player hub produced the strongest AI-session engagement in this small sample. Player identity, factual profiles, sources and usable codes deserve continued investment.
- Overall AI engagement is materially below organic search. AI visitors need an immediate answer plus a strong next action: preview, compare or copy.
- Six of seven known AI landing sessions entered English pages. English remains the first GEO priority, while the statistics asset ships in all five supported languages to preserve international coverage.

## GSC findings

Query report window: past 28 days. Total: 111 clicks, 5,587 impressions, 1.99% CTR, average position 20.43.

| Query | Clicks | Impressions | CTR | Position | Decision |
| --- | ---: | ---: | ---: | ---: | --- |
| funny crosshair valorant | 11 | 75 | 14.67% | 3.83 | Preserve winner; expand internal discovery |
| valorant funny crosshair | 9 | 71 | 12.68% | 4.49 | Preserve winner |
| movement error crosshair valorant | 4 | 30 | 13.33% | 8.27 | Strengthen factual sources and continuation paths |
| vandal crosshair | 3 | 14 | 21.43% | 5.07 | Preserve title/content |
| dynamic crosshair valorant | 2 | 13 | 15.38% | 6.23 | Keep cluster links intact |
| mira ponto valorant | 2 | 107 | 1.87% | 12.07 | Portuguese CTR opportunity after enough data |
| aim valorant code | 1 | 161 | 0.62% | 7.14 | Clarify catalog entity coverage, not a duplicate page |
| valorant aim code | 1 | 212 | 0.47% | 6.44 | Same intent; avoid keyword-variant thin content |

Page report window: past 28 days. Total: 336 clicks, 17,910 impressions, 1.88% CTR, average position 25.53.

| Page | Clicks | Impressions | CTR | Position |
| --- | ---: | ---: | ---: | ---: |
| `/en/funny-crosshairs/` | 39 | 430 | 9.07% | 11.98 |
| `/en/small-crosshairs/` | 25 | 742 | 3.37% | 12.42 |
| `/en/one-tap-crosshairs/` | 21 | 290 | 7.24% | 14.39 |
| `/en/pink-crosshairs/` | 17 | 516 | 3.29% | 9.91 |
| `/en/valorant-movement-error-crosshair/` | 13 | 504 | 2.58% | 7.95 |
| `/en/best-valorant-crosshair-colors/` | 10 | 996 | 1.00% | 20.53 |

The prior SEO release was only two days old. This release does not rewrite the titles of current winners. The new work is additive and should be observed for 7–14 complete days before another broad snippet rewrite.

## Implemented GEO changes

1. **Proprietary, citable dataset**
   - New `/[locale]/valorant-crosshair-statistics/` page in English, Spanish, Brazilian Portuguese, Simplified Chinese and Japanese.
   - Counts are generated from 288 canonical, indexable crosshair pages at build time.
   - Visible tables cover normalized color groups, non-overlapping primary shape groups, and browseable collection counts.
   - The page explicitly states that catalog distribution is not global player usage or win-rate data.

2. **Machine-readable facts that match visible content**
   - Dataset structured data for the statistics page.
   - Crosshair pages expose the actual profile code and source as a CreativeWork entity.
   - Player-backed pages expose a sourced Person entity.
   - No special “AI schema”, keyword stuffing or `llms.txt` was added.

3. **Human-visible provenance**
   - Crosshair pages now show the public code source without exposing internal review dates.
   - Verified public player panels now link to the player-profile source.

4. **ChatGPT search discovery**
   - `OAI-SearchBot` is explicitly allowed in `robots.txt`.
   - Existing Googlebot access, sitemaps, canonical URLs and alternate-language annotations remain unchanged.

5. **AI traffic measurement**
   - New GA4 event: `ai_referral_landing`.
   - Parameters: `ai_provider`, `referring_host`, `landing_path` plus existing page context.
   - Recognized providers: ChatGPT, Perplexity, Claude, Gemini, Copilot and Meta AI.
   - No prompt, raw query or personal data is collected.

## Measurement plan

Review after 7 and 14 complete days:

- GA4 AI Assistant sessions, engaged sessions, engagement rate and conversions by landing page.
- `ai_referral_landing` count by provider and page type.
- GSC impressions/clicks for the new statistics URLs and related queries such as `valorant crosshair statistics`, `most common valorant crosshair color`, and localized equivalents.
- Assisted behavior from AI landings: preview interaction, crosshair copy, collection click and share.
- Crawl/index status for all five statistics URLs.

GA4 custom dimensions should be registered for `ai_provider`, `referring_host` and `landing_path` if provider-level reporting is needed in the standard GA4 interface. Event data will still be collected without those custom dimensions.

## Official implementation references

- Google Search Central: AI features and your website — https://developers.google.com/search/docs/appearance/ai-features
- Google Search Central: Top ways to ensure your content performs well in Google's AI experiences — https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- OpenAI Publisher FAQ — https://help.openai.com/en/articles/12627856
- OpenAI ChatGPT Search — https://help.openai.com/en/articles/9237897
