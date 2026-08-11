# Release gates

## Before PR

1. Run `pnpm task:context` and review scope.
2. Review `git diff --check`, semantic diff, new assets, and exact staging list.
3. Run `pnpm check:release`.
4. Review `.aimcodes-reports/current/verification.md`; do not rely only on its pass flag.
5. For UI or SEO output, inspect representative desktop and mobile pages in a real browser.

## PR and preview

1. Push only the task branch and create a focused PR.
2. Require every GitHub job and Netlify deploy preview to pass.
3. Check the preview for the highest-risk changed route and one unaffected route.
4. Merge only when the user has authorized release under the current project rules.

## Production

1. Confirm Netlify built the merged `main` commit.
2. Verify status, canonical, robots directive, images, and interaction on representative live URLs.
3. For SEO changes, verify `robots.txt` and every affected Sitemap count.
4. Record the PR, production commit, counts, and unresolved manual checks in `docs/CURRENT_STATE.md` or `docs/HANDOFF.md`.
5. Report limitations honestly; automated parser checks are not an in-game VALORANT import test.
