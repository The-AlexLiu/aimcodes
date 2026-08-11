---
name: aimcodes-maintainer
description: Standardize AimCodes development, catalog changes, SEO and localization work, UI changes, verification, GitHub PRs, Netlify releases, and production smoke tests. Use whenever Codex works in the AimCodes repository or is asked to add, fix, review, verify, publish, or hand off an AimCodes change.
---

# AimCodes Maintainer

Use repository scripts for deterministic work and keep GPT/Codex responsible for product meaning, risk, exceptions, browser experience, and release decisions.

## Start

1. Confirm the repository root contains `AGENTS.md` and `package.json` with the name `aimcodes-mvp`.
2. Read `AGENTS.md` and `docs/CURRENT_STATE.md`.
3. Run `pnpm task:context`.
4. Read `.aimcodes-reports/current/scope.md` and only the project references required by its scopes.
5. Inspect `git status -sb`. Preserve all pre-existing user changes.
6. State the plan, exclusions, risk level, and proposed checks before editing.

Read [task-routing.md](references/task-routing.md) when choosing project references or a validation suite. Read [risk-matrix.md](references/risk-matrix.md) for data, routing, tracking, deployment, or large generated changes.

## GPT gates

Do not skip any gate even when scripts pass:

1. **Plan gate:** verify intent, affected systems, data provenance, files, and rollback boundary.
2. **Diff gate:** review the semantic diff, player-facing wording, localization, index decisions, and unintended files.
3. **QA gate:** run `pnpm check:auto`, inspect both structured reports, and investigate every failure or unusual count. For UI or public SEO changes, use a real browser at desktop and mobile widths.
4. **Release gate:** run `pnpm check:release`, inspect staged files explicitly, and verify CI plus the Netlify deploy preview. A successful script is evidence, not approval.
5. **Production gate:** after authorized release, verify representative live URLs, metadata, assets, robots, and relevant sitemaps. Record the release in project docs when it changes durable facts.

Read [release-gates.md](references/release-gates.md) before a PR, deployment, or production configuration change.

## Operating rules

- Use `pnpm check:auto` during development; use `pnpm check:release` before any remote release.
- Read `.aimcodes-reports/current/verification.md` first. Load raw code or logs only for failed, changed, or suspicious areas.
- Never invent player codes, sources, verification dates, analytics outcomes, or search performance.
- Never expose or commit credentials. Authenticate GitHub, Netlify, Google, and Cursor separately.
- Never let cache hits suppress validation. Validators must still verify generated outputs.
- Never publish solely because CI is green. Complete the GPT release and production gates.
- Keep the canonical workflow, scripts, and project facts in the repository. This Skill is only the thin Codex adapter; Cursor must use the same repository commands.
