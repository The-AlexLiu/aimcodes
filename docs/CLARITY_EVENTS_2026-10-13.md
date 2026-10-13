# Clarity success events and same-page funnels

User-authorized scope: event instrumentation and two same-page funnels. Performance changes are explicitly excluded.

## Implementation

`src/utils/analytics.js` forwards an allowlist to Clarity before GA4 initialization. Existing successful action branches remain the source of truth; no additional click handlers or effects are installed. GA4 names, payloads and counting rules remain unchanged.

| API event | Trigger |
| --- | --- |
| `crosshair_code_copy` | `copyText` resolves successfully in App's copy handler. |
| `finder_start` | A reaction-test attempt starts; supporting funnel event. |
| `finder_complete` | Three valid rounds finish and a recommendation is generated. |
| `playbook_export` | PNG generation and download initiation succeed, with an integer `element_count > 0`. Empty-board exports remain in GA4 but are excluded from Clarity's meaningful-success metric. |

The Clarity bridge rechecks the existing live-host, QA, opt-out, private-route, sensitive-query and storage exclusions for each action. It never initializes tracking on demand. Consent stays denied. An absent or throwing Clarity SDK returns false without changing the successful product action.

Only event names and enum tags (`app_language`, `page_type`, `measurement_version=success_v1`) are sent. No attempt IDs, raw crosshair codes, search text, email, board content, share hashes or GA4 parameter objects are forwarded to the SDK. Tags are session classifications, not event-scoped GA4 parameters.

## Approved Clarity configuration

Create only after the API events appear and same-page event association is verified:

1. **AC · 目录到复制 · v1**: visit `https://aimcodes.com/zh-cn/crosshairs/` → `crosshair_code_copy`, restricted to that page.
2. **AC · 测试开始到完成 · v1**: visit `https://aimcodes.com/zh-cn/reaction-time-test/` → `finder_start` → `finder_complete`, restricted to that page. Preview inspection confirmed that the current results page has no free recommendation-copy control, so a final copy step would describe an unavailable path. No recommendation or payment UI is changed by this release.

These count sessions with ordered steps, not per-attempt success. Directory → detail-page navigation is outside the first funnel. Reloads, changed language and restored results can break step association under denied consent. Do not restore cross-page association by fabricating consent.

## Validation and release

- `validate:clarity` includes allowlist/payload tests, empty-board exclusion, persistent QA and private-route exclusion, SDK failures, repeated successes and independent GA4 dispatch.
- Run `check:auto`, then `check:release` and review the structured results before PR creation.
- Require GitHub CI and Netlify preview validation; verify production build metadata before controlled real-action event smoke tests.
- Backend configuration receipt and production verification will be recorded in this task's delivery report after execution. Do not equate a saved funnel with verified conversion data.

Rollback: revert the event bridge while retaining the base tag and existing GA4 instrumentation. Historical data persists. Stop using or rename funnels rather than automatically deleting them, since deletion is irreversible.

## Production receipt, 2026-10-13

- PR #84 merged; production commit `4876f4dc1e38675f615459edebf00fbb19e50564`, Netlify deploy `6acd99fecb973ac84199970b`, live metadata matched.
- Full release checks 25/25 and Clarity tests 16/16 passed. Product preview validated copying, three rounds and an actual nonempty-board PNG download. The final documentation-only commit reused the already validated product preview; product code was unchanged.
- Controlled production actions reached the Clarity SDK as one copy event, one start/complete pair and one nonempty-board export event. Collect responses included HTTP 204. These internal validation actions are not organic conversion evidence.
- The first reaction smoke's logging wrapper was replaced during SDK initialization, so its empty capture is not a product failure. The subsequent settled-SDK test captured the actual start/complete pair and result page; both records are preserved locally.
- QA and persistent QA exclusion after navigation were verified on production. Canonical/robots/status checks passed for catalog, test and playbook routes.
- Backend API event list remained empty at the final check. Both funnels are **pending**, not saved or verified. The user authorized automatic continuation after processing and a notification on completion; no further production code change or synthetic test traffic is required.
