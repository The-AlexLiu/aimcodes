# Task routing

Use the scope report as the routing hint, then confirm it against the user request and diff.

| Scope | Read | Default check | Extra GPT review |
| --- | --- | --- | --- |
| Docs only | `docs/CURRENT_STATE.md` plus changed docs | `check:quick` | Facts and stale links |
| UI | `docs/ARCHITECTURE.md`, relevant components | `check:quick` | Desktop, mobile, focus, player wording |
| Data | data schema, parser, relevant collection rules | `check:data` | Valid code, visible uniqueness, naming, provenance |
| SEO/localization | `docs/SEO_STRATEGY.md`, route and content modules | `check:seo` | Intent, canonical, index control, four locales |
| Analytics | analytics utility and event validator | `check:auto` | No PII, reserved fields, production guard |
| Renderer | renderer rule and all canonical copies | `check:auto` | Export output and source synchronization |
| Release/tooling | `docs/HANDOFF.md`, CI and deployment config | `check:release` | Exact staged files, preview, live smoke |

If data and SEO both change, treat the work as release-level validation. If the automatic scope conflicts with the actual task, use the stricter suite and explain why.
