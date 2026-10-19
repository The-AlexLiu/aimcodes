# Sage theme isolation — 2026-10-19

Production inspection reproduced the issue: the Sage article resolved `--hush-pink` to `#f6a1df`, and both the ability heading and primary button rendered `rgb(246,161,223)`. In the production CSS order, the shared `.hush-page` rule loaded after the equally specific `.sage-page` variable declaration. The earlier local color checks did not cover that ordering.

The Sage theme now declares its own `--sage-accent: #8fe8d0` on `.hush-page.sage-page`. This more specific scope supplies the shared component alias while Sage-specific headings, links, play buttons and focus/hover states use its own token directly. Hush retains its pink theme. No content, routes, index policy, analytics or media are changed.

Validation uses the actual production build, not the Vite development view: Chinese desktop and English mobile resolve green headings/buttons both normally and after appending a late `.hush-page` pink rule. Hush still resolves pink. Basic checks and the full release suite are required before release; final CI/production verification is recorded in the PR.
