# AimCodes 架构说明

最后更新：2026-08-11

## 总体结构

AimCodes 是一个不依赖业务后端的 React + Vite 静态网站。准星数据、推荐算法、语言词典和 GA4 事件均在前端代码中维护，生产构建后部署到 Netlify CDN。

```text
src/data + src/i18n + src/seo
              ↓
         React 应用与 Canvas
              ↓
          Vite 生产构建
              ↓
  generate-localized-routes.mjs
              ↓
  多语种 HTML + sitemap + 静态资源
              ↓
             Netlify
```

## 关键目录

| 路径 | 作用 |
|---|---|
| `src/App.jsx` | 页面路由解释、准星选择、筛选、调色和主要交互 |
| `src/components/` | 预览、准星卡片、反应测试、导入教程和页脚 |
| `src/data/` | 准星代码、分类和地图预览配置 |
| `src/i18n/` | 四语种词典、准星本地化和语言路径 |
| `src/seo/` | SEO 文案、页面元数据和路由解析 |
| `src/utils/` | 准星解析、相似度、推荐、分享图和 GA4 |
| `scripts/` | 数据、埋点、语言、SEO 和路由验证 |
| `automation/skills/` | Codex 项目维护 Skill 的可共享源文件 |
| `public/` | Logo、favicon、OG 图、robots、sitemap 和静态工具 |
| `.github/workflows/ci.yml` | GitHub Push/PR 自动验证 |
| `netlify.toml` | 构建、发布目录、重定向、缓存和安全响应头 |

## 页面与路由

根路径根据设备首选语言跳转：中文进入 `/zh-cn/`、西班牙语进入 `/es/`、葡萄牙语进入 `/pt-br/`，其他或无法识别的语言回落到 `/en/`。四种语言仍使用固定的独立目录 URL。

| 页面类型 | 英语示例 | 路由定义 |
|---|---|---|
| 首页精选 | `/en/` | `home` |
| 全部准星 | `/en/crosshairs/` | `catalog` |
| 单个准星 | `/en/crosshairs/tenz/` | `crosshair` |
| 反应测试 | `/en/reaction-time-test/` | `finder` |
| 导入教程 | `/en/how-to-import-valorant-crosshair/` | `guide` |
| 主题集合 | `/en/small-crosshairs/` | `collection` |
| 参数/颜色指南 | `/en/valorant-crosshair-settings/` | `article` |

语言前缀：

- 英语：`/en/`
- 西班牙语：`/es/`
- 巴西葡萄牙语：`/pt-br/`
- 简体中文：`/zh-cn/`

`pnpm build` 先按内容 Hash 增量生成索引准星与 OG 图片，再执行 Vite 构建和本地化路由生成。生成器源码、地图、Logo 或对应准星数据变化会自动失效缓存；图片验证仍覆盖全部必需输出。当前生产版本生成 1,364 个本地化 HTML 路由，将 544 个允许索引的 canonical URL 写入主 Sitemap，并将其中 400 个准星详情 URL 写入 `sitemap-crosshairs.xml`。

任务范围由 `scripts/task-context.mjs` 汇总，分级验证由 `scripts/run-check-suite.mjs` 调度。报告写入 `.aimcodes-reports/current/`，使智能体优先读取异常和差异而不是完整日志；流程细节见 `docs/DEVELOPMENT_WORKFLOW.md`。

除基础页面和准星详情外，当前新增 10 个高意图主题集合、10 个操作/选型指南，以及 4 个可实际使用的准星工具。新增搜索意图均同步为四语种页面；未经验证的选手数据和未完成工具不会进入 sitemap。索引边界与扩页规则记录在 `docs/SEO_STRATEGY.md`，内容优先级与 100 URL 状态记录在 `docs/CONTENT_ROADMAP.md` 和 `docs/SEO_EXPANSION_REPORT_2026-08-10.md`。

## 准星数据流

1. `src/data/crosshairs.js` 汇总基础准星和 `catalogExpansionCrosshairs`；后者由 `src/data/catalogExpansion.js` 按 12 个形态家族确定性生成。
2. `src/utils/crosshairCode.js` 解析代码并生成预览参数。
3. `src/utils/crosshairSimilarity.js` 根据外观去重。
4. `src/i18n/translations.js` 为准星名称和描述提供本地化。
5. `CrosshairCanvas` 在地图图片上渲染当前形状和颜色。
6. 用户调整颜色时，预览与最终复制代码同步更新。

新增准星必须同时满足：

- ID 唯一；
- 代码可以解析；
- 名称与实际图案一致；
- 与已有样式不构成无意义重复；
- 四语种显示正常；
- `pnpm validate:crosshairs` 通过。

目录规模与索引规模分开管理：前端目录加载完整去重数据，默认每批展示 48 项；`SEO_CROSSHAIR_IDS` 只列出具备独立说明、集合内链和图片资产的索引子集。构建脚本只为该子集生成图片和 Sitemap，其他详情使用 `noindex,follow`。

## 反应测试数据流

1. `CrosshairFinder` 执行三轮测试。
2. `reactionRecommendation.js` 计算平均值、稳定性、最好/最慢成绩和提前点击。
3. 平均值映射到 9 个反应段位。
4. 根据速度、稳定性和提前点击选择一个推荐画像。
5. 推荐画像只返回一个首选准星。
6. 结果页允许直接预览地图、切换颜色、复制代码和分享成绩。

反应段位只是产品化表达，不等于用户真实游戏排位。

## 多语种规则

用户界面词条主要位于 `src/i18n/translations.js`，SEO/静态页面词条位于 `src/seo/content.js`。

任何文案或路由改动都必须：

1. 同步四种语言；
2. 保留正确 `htmlLang`、`hreflang` 和 `og:locale`；
3. 重新执行 `pnpm build`；
4. 执行语言、SEO 和路由验证。

## GA4

- Measurement ID：`G-2VMCECN5S6`
- 正式主机：`aimcodes.com`、`www.aimcodes.com`
- 本地默认不上报；`?ga_debug=1` 可开启调试。
- `?qa=1` 阻止内部验收流量进入 GA4。
- `scripts/validate-analytics.mjs` 当前要求 24 个漏斗事件。
- 搜索事件只上报长度、结果数量和是否有结果，不上报原始搜索词。

普通准星详情页的分享链接通过 `src/utils/shareLinks.js` 生成，保留语言、准星、地图和颜色，并使用 `utm_source=share`、`utm_medium=crosshair` 识别分享带来的访问。浏览器支持系统分享时直接打开分享面板，不支持时复制“准星名称 + 可用代码 + 深层链接”。`share_landing` 用于识别接收方落地，`scripts/validate-sharing.mjs` 负责校验四语种路径、预览还原和归因参数。

事件实现以代码和 `validate-analytics.mjs` 为准；`GA4-安装与事件字典.md` 若与验证脚本不一致，需要同步更新。

## 社媒素材渲染器

线上路径：`/tools/social-renderer/`。

主要能力：

- 四语种；
- 302 条源代码、300 种可见样式；
- TikTok、Reels、Shorts 和通用平台预设；
- 自定义三次反应成绩；
- MP4、1080×1080 方形图和 1080×1920 竖版封面；
- 可选视频末尾 1 秒封面候选帧；
- 可选择本地下载目录。

当前存在三份文件副本，详见 `AGENTS.md`。在单一源自动同步完成前，每次修改后必须核对三份文件校验值。

## 构建与部署

本地构建：

```bash
pnpm build
```

Netlify 配置：

- Build command：`pnpm build`
- Publish directory：`dist`
- Node：20
- Project ID：`b244d8b7-4cce-46de-b9b5-2b4f29e30392`
- 正式域名：`https://aimcodes.com`

目标工作流是 GitHub PR → Netlify Deploy Preview → 合并 `main` → 自动生产部署。当前历史上仍使用过本地 Netlify CLI 手动发布，因此执行生产部署前必须先确认 GitHub、工作树和线上版本关系。
