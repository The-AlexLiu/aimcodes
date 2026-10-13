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
2. **AC · 测试到推荐复制 · v1**: `finder_start` → `finder_complete` → `crosshair_code_copy`, restricted to `https://aimcodes.com/zh-cn/reaction-time-test/`.

These count sessions with ordered steps, not per-attempt success. Directory → detail-page navigation is outside the first funnel. Reloads, changed language and restored results can break step association under denied consent. Do not restore cross-page association by fabricating consent.

## Validation and release

- `validate:clarity` includes allowlist/payload tests, empty-board exclusion, persistent QA and private-route exclusion, SDK failures, repeated successes and independent GA4 dispatch.
- Run `check:auto`, then `check:release` and review the structured results before PR creation.
- Require GitHub CI and Netlify preview validation; verify production build metadata before controlled real-action event smoke tests.
- Backend configuration receipt and production verification will be recorded in this task's delivery report after execution. Do not equate a saved funnel with verified conversion data.

Rollback: revert the event bridge while retaining the base tag and existing GA4 instrumentation. Historical data persists. Stop using or rename funnels rather than automatically deleting them, since deletion is irreversible.
