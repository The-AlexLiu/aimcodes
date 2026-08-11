# AimCodes 当前状态

状态日期：2026-08-11

本文件用于 GPT/Codex、Cursor 和人工开发者快速恢复项目上下文。发生生产发布、重要合并、路由变化或权限变化后必须更新。

## 生产环境

- 正式域名：<https://aimcodes.com>
- 线上渲染器：<https://aimcodes.com/tools/social-renderer/>
- Netlify 项目：`aimcodes`
- Netlify Project ID：`b244d8b7-4cce-46de-b9b5-2b4f29e30392`
- 2026-08-11 最近一次产品代码生产发布：目录架构统一，对应生产提交 `9dbfdf1`、PR #18。
- 当前架构效率版本把索引详情、集合关系、图片和 Sitemap 统一到 `src/data/catalogManifest.js`，并将 `App.jsx` 的目录视图模型和主要页面区域拆分为独立 Hook/组件。
- Netlify 已绑定 GitHub `The-AlexLiu/aimcodes`，生产分支为 `main`，构建命令为 `pnpm build`，发布目录为 `dist`。

## GitHub

- 主仓库：<https://github.com/The-AlexLiu/aimcodes>
- 当前生产基线分支：`main`
- 最近产品代码生产提交：`9dbfdf1 refactor: unify AimCodes catalog architecture (#18)`
- 最近产品代码发布 PR：<https://github.com/The-AlexLiu/aimcodes/pull/18>
- 渲染器仓库：<https://github.com/The-AlexLiu/AimCodes-Social-Creative-Renderer>
- 渲染器最近提交：`d2eef82 新增社媒视频配套封面`
- 渲染器草稿 PR：<https://github.com/The-AlexLiu/AimCodes-Social-Creative-Renderer/pull/1>

## 当前产品基线

- 4 种语言；
- 302 条准星源数据，去重后 300 种可见样式；
- 3 张地图预览；
- 3 轮反应测试；
- 9 个反应段位；
- 24 个 GA4 验证事件；
- 准星详情可一键分享当前语言、地图和颜色；接收方打开后直接还原预览并可复制最终代码；
- 站内交互来源统一使用 `interaction_source`，标准 `source` 只用于对外链接的渠道归因；
- 1,364 个生成 HTML 路由；
- 544 个 sitemap canonical URL；
- 100 个可索引准星详情，另有 202 个可访问但保持 `noindex,follow` 的目录详情；
- 100 张索引准星独立预览图、100 张对应 OG 图和 15 张集合页 OG 图；
- 独立准星 Sitemap 覆盖 400 个四语种准星详情 URL；
- 图片 Sitemap 覆盖 460 个四语种集合/详情页，共声明 860 个图片引用；
- 社媒视频、方形图和配套封面生成工具。

## 图片 SEO 基线

- `pnpm build` 会先从真实准星代码和现有地图素材确定性生成图片，不依赖手工导出或外部图片服务；
- 独立准星图位于 `public/images/crosshairs/`，尺寸为 1080 × 1080 WebP；
- 页面分享图位于 `public/images/og/crosshairs/` 与 `public/images/og/collections/`，尺寸为 1200 × 630 JPG；
- 准星详情页和集合页使用独立 OG 图片、图片替代文本、宽高属性和 `ImageObject` 结构化数据；
- 构建产物包含 `sitemap-images.xml`，并由 `robots.txt` 同时声明网页 Sitemap 与图片 Sitemap；
- `pnpm validate:images` 会检查文件数量、格式、尺寸、页面元数据、图片 Sitemap 覆盖率和 robots 声明。

## 已发布 SEO 基线

- 5 类四语种 SEO 主题集合页；
- 新增四语种准星参数说明和准星颜色指南；
- 导入页已扩充导出、观战复制、常见报错和 FAQ；
- 可索引高价值准星详情由 8 个增加到 16 个；
- 生产构建生成 308 个本地化 HTML 路由；
- sitemap 由 48 个 canonical URL 增加到 112 个；
- 已推送 GitHub、合并到 `main` 并发布 Netlify；四语种代表页面、robots、sitemap、canonical 和 JSON-LD 已在线验证。
- GitHub PR 自动生成 Netlify Deploy Preview；合并 `main` 后自动发布生产环境。

## SEO Knowledge Base Phase 1

- 新增 10 个集合搜索意图：圆形、粉色、青色、绿色、极简、瞄头、新手、单点、Vandal 与 Phantom；
- 新增 10 个指南搜索意图：复制、代码排错、点状/圆形制作、移动误差、射击误差、误差对比、静态/动态、点状/十字与准星预瞄；
- 新增 4 个真实可用工具：生成器、代码解析器、预览器与对比器；
- 24 个英语搜索意图同步生成四语种 canonical，共新增 96 个可索引 URL；
- 25 个待补职业选手页因缺少可验证代码、来源和日期而未发布；
- 完整 100 URL 状态见 `docs/SEO_EXPANSION_REPORT_2026-08-10.md`。

## 开发效率基线

- `pnpm task:context` 输出本次变更 Scope、风险等级和推荐检查；
- `check:quick`、`check:data`、`check:seo` 与 `check:release` 提供四档验证；
- `pnpm validate:manifest` 统一检查完整目录、100 个索引记录和 15 个集合之间的关系；
- 检查报告位于 `.aimcodes-reports/current/`，只在本地和 CI 使用，不提交 Git；
- 图片生成使用内容 Hash，缓存命中只跳过重新渲染，不跳过最终图片验证；
- `automation/skills/aimcodes-maintainer/` 是 Codex Skill 的仓库内单一来源；Cursor 使用相同脚本；
- 计划、差异、QA、发布和线上结果始终需要 GPT/Cursor 审核。

## Catalog Scale Phase 1

- 新增 240 条原创有效代码，分布在 Micro Gap、Tap Dot、Compact Cross、Open Cross、Tracker、Twin Line、Pinpoint、Outer Mark、Tall Axis、Wide Axis、Burst Ring 与 Guard Frame 12 个家族；
- 不冒充职业选手代码，不通过同一形状换颜色凑数量；
- 目录首屏显示 48 项，用户可继续加载；搜索、分类、排序和随机选择仍使用全部 300 种可见造型；
- 每个家族先开放 7 个详情索引，共新增 84 个可索引准星详情；剩余页面保留 `noindex,follow`；
- 现有集合页承接新增详情，并让索引详情只推荐其他可索引详情，控制爬虫进入低价值路径；
- `sitemap-crosshairs.xml` 单独管理 400 个四语种准星详情 URL，主 Sitemap 继续汇总全部 544 个规范 URL。

## 已确认验证基线

2026-08-11 最近一次本地复核已经确认：

- ESLint 通过；
- Vite 生产构建通过；
- 四语种词条验证通过；
- 多语种路由验证通过；
- 1,364 个生成路由和 544 个主 Sitemap URL 验证通过；
- 400 个独立准星 Sitemap URL 验证通过；
- 54,723 条生成页面站内链接验证通过，无断链；
- 100 张索引准星图、115 张必需 OG 图、460 个图片 Sitemap 页面和 860 个图片引用通过自动验证；
- 4 个新增工具的代码生成、解析、无效代码拒绝与数据库代码兼容验证通过；
- 网站公开联系入口统一为 `contact@aimcodes.com`，不暴露开发者 GitHub 地址；
- 线上 `/en/`、`/es/`、`/pt-br/`、`/zh-cn/` 和渲染器均返回 200；
- 三份渲染器副本 SHA-1 相同：`361c61af9ab91f965939ef7f36b05033fe1bb04f`。
- 反应测试超过 2 秒会判定为本轮超时，不计入成绩并自动重开当前轮；真实浏览器验证进度仍为 `0 / 3`；
- 渲染器可实际导出英文 Bunny 准星的 MP4、封面 PNG 和方形 PNG，手机宽度下控制项可用；
- `pnpm audit --prod` 无已知漏洞，构建链中的 `nanoid` 已锁定到修复版本。
- PR #4 的 GitHub CI、Netlify Deploy Preview 和 `main` 自动生产部署均通过；线上构建包含 `interaction_source`，四语种入口、robots.txt、sitemap.xml 与 108 个 canonical URL 已复核。
- 本轮分享增长功能已通过桌面端、390px 手机端、四语种准星详情、地图与颜色还原、语言切换保参和反应挑战结果页的真实浏览器验收；自动检查覆盖 24 个 GA4 事件和四语种分享链接。
- AdSense 准备分支已通过 ESLint、全量产品验证、生产构建、SEO/路由验证和新增 `validate:adsense`；真实浏览器在 1440px 桌面与 390px 手机宽度下无横向溢出，四语种信任页、页脚入口、robots 和广告禁用标记均符合预期。

## 当前已知问题

1. 渲染器有三份副本，尚未实现单一源自动同步。
2. 当前产品代码包含 24 个验证事件，但 GA4 后台尚未创建计划中的自定义维度和指标；`interaction_source` 与 `shared_entry` 建议注册为事件范围自定义维度。
3. 本轮扩展后应观察 21–30 天的抓取、收录、展示和长尾词分布；未验证信号前不继续开放剩余 202 个详情索引。
4. AdSense 账号、真实发布商 ID、站点验证码、付款资料和 Google 认证 CMP 尚未配置；不得在仓库中使用占位 `ca-pub-` 或占位 `ads.txt`。
5. 联系入口已统一为域名邮箱 `contact@aimcodes.com`；邮箱实际收件与回复流程需由站点所有者持续维护。
6. 主应用 JavaScript 仍约 649 kB（gzip 约 214 kB），构建会提示超过 500 kB；下一轮工程优化应优先按页面类型做懒加载与代码分包。

## 推荐后续顺序

1. 创建/进入 AdSense 账号，添加根域 `aimcodes.com`，再把 Google 提供的真实站点验证代码交给开发者安装并提交审核。
2. 在 GSC 重新提交发布后的 `sitemap.xml` 与 `sitemap-crosshairs.xml`，并检查四语种代表页面的抓取与 canonical。
3. 观察 21–30 天的查询、展示、排名和收录状态，优先强化排名 8–30 的页面，并根据家族表现决定第二批索引。
4. 通过 AdSense 审核后再配置真实 `ads.txt`、Google 认证 CMP 和少量手动广告位；禁止在反应测试与复制按钮附近投放。
