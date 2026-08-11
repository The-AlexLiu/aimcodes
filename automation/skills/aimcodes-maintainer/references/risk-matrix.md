# Risk matrix

## High risk

- Crosshair parser or generator changes.
- Canonical route, Sitemap, redirect, `robots.txt`, or Netlify changes.
- CI, release scripts, analytics transport, or large generated data changes.
- Indexing more pages or changing verified-player data.

Require a backup or reversible branch, full semantic diff review, `check:release`, browser QA where public output changes, CI, deploy preview, and production smoke tests.

## Medium risk

- Catalog data, translations, public UI, SEO copy, tools, or shared components.

Require targeted validators, semantic review, relevant four-language checks, and browser QA for public changes. Escalate to high risk if several scopes change together.

## Low risk

- Accurate documentation or isolated non-public developer guidance.

Run at least `check:quick`, verify links and durable facts, and keep the GPT diff gate. Low risk never means no review.

## Stop conditions

Stop release when counts change unexpectedly, generated files disappear, a cache reports reuse but required outputs fail validation, a public locale falls back to another language, an indexable page lacks unique intent, CI differs from local results, or production does not match the merged commit.
