# 仓库接入参考

此表是 2026-10-19 的导航线索，开始任务时验证实际文件；不要固定旧工作树路径、旧模块数量、时码或部署平台。

| 用途 | 当前线索 |
|---|---|
| 页面壳及文章分派 | `src/App.jsx`、`src/components/SeoArticlePage.jsx` |
| 已验收页面 | `HushAgentPage.jsx`、`SageAgentPage.jsx`、`PhoenixAgentPage.jsx` |
| 布局与局部主题 | `hushAgent.css`、`sageAgent.css`、`phoenixAgent.css` |
| 共享准星完整交互 | `AgentCrosshair.jsx`、`CrosshairCanvas.jsx` |
| 角色文案／媒体 | `src/seo/{agent}Content.js`，部分英雄另有 Media 模块 |
| 同一设置与代码真源 | `src/data/{agent}Crosshair.js`，通过 `generateCrosshairCode` 生成 |
| 编辑器初始配置 | `src/components/CrosshairToolsPage.jsx` 的 Generator；`?theme={agent}` |
| 元数据与路由 | `src/seo/articles.js`、`metadata.js`、`routes.js`、`resourceLabels.js` |
| 首页入口 | `src/components/HomeResourceDirectory.jsx`；新页需要合理可发现入口，不能只存在直接 URL |
| 预生成 HTML 与 Sitemap | `scripts/generate-localized-routes.mjs`，检查内容与 React 一致 |
| 产物校验 | `scripts/validate-localization.mjs`、`test-phoenix-agent.mjs`、`report-seo-scope.mjs` |
| 不死鸟实际验收／来源 | `docs/PHOENIX_PREVIEW_2026-10-19.md`，以其中用户反馈修订及发布记录为准 |

新英雄遵循相同接入路径，复用组件而非盲目复制整页。不要让通用文章的“固定 FAQ／四推荐准星”要求迫使英雄页加入无依据内容；必要时为实际页面类型补充针对性验证，同时保留其他文章的校验。

新增角色不应改变目录准星总数、已有角色准星、埋点语义或付费功能，除非任务确实要求。生产索引数量以构建与线上结果为准。
