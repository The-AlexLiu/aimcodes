# AimCodes

[AimCodes](https://aimcodes.com/en/) is a multilingual VALORANT crosshair discovery tool. Players can preview working crosshair codes on familiar map scenes, recolor them, copy the final code, or take a three-round reaction test to get one recommended crosshair.

> 中文简介：这是一个面向全球玩家的无畏契约准星工具，提供真实场景预览、颜色修改、代码复制和基于反应速度的准星推荐。

![AimCodes homepage](docs/aimcodes-homepage.png)

## Why this project

Most crosshair databases make players browse large, repetitive lists. AimCodes keeps the core flow short—preview, adjust, copy—and adds a lightweight reaction test for players who do not know where to start.

## Product highlights

- 60 visually distinct, validated crosshair styles generated from importable profile codes
- Live Canvas previews on Ascent, Haven, and Bind scenes
- Six color presets that update both the preview and copied code
- Three-round reaction test with nine VALORANT-inspired result tiers
- One recommended crosshair available directly on the result screen
- English, Spanish, Brazilian Portuguese, and Simplified Chinese interfaces
- Responsive desktop and mobile experience
- GA4 funnel tracking with 15 validated events and no raw search-query collection

## Localized routing and SEO

| Language | Route | `hreflang` |
|---|---|---|
| English | `/en/` | `en` |
| Spanish | `/es/` | `es` |
| Brazilian Portuguese | `/pt-br/` | `pt-BR` |
| Simplified Chinese | `/zh-cn/` | `zh-Hans` |

The production build creates a separate HTML entry for every locale, including localized titles and descriptions, self-referencing canonicals, reciprocal `hreflang` links, Open Graph metadata, `robots.txt`, and a multilingual sitemap. Netlify redirects `/` to `/en/`, while legacy `?lang=` links are migrated in the client.

## Stack

- React 19 and Vite
- Canvas-based crosshair rendering
- Netlify hosting and route configuration
- Google Analytics 4
- Vanilla CSS with no UI framework

## Run locally

```bash
pnpm install
pnpm dev
```

Create and preview the production build:

```bash
pnpm build
pnpm preview
```

## Validation

```bash
pnpm lint
pnpm validate:crosshairs
pnpm validate:finder
pnpm validate:localization
pnpm validate:analytics
pnpm build
pnpm validate:routing
```

The validation scripts check crosshair parsing and recoloring, visible-style deduplication, recommendation coverage, translation completeness, analytics events, localized metadata, sitemap entries, and route aliases.

## Project structure

```text
src/components/       UI and Canvas components
src/data/             crosshair and preview data
src/i18n/             dictionaries and locale routing
src/utils/            code parsing, analytics and recommendation logic
scripts/              reproducible validation and route generation
public/               public brand, SEO and preview assets
netlify.toml          production build, redirects and security headers
```

## Disclaimer

AimCodes is an independent fan-made project and is not affiliated with or endorsed by Riot Games. VALORANT and related game assets are trademarks or property of their respective owners.
