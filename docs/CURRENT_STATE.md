# AimCodes 当前状态

状态日期：2026-08-10

本文件用于 GPT/Codex、Cursor 和人工开发者快速恢复项目上下文。发生生产发布、重要合并、路由变化或权限变化后必须更新。

## 生产环境

- 正式域名：<https://aimcodes.com>
- 线上渲染器：<https://aimcodes.com/tools/social-renderer/>
- Netlify 项目：`aimcodes`
- Netlify Project ID：`b244d8b7-4cce-46de-b9b5-2b4f29e30392`
- 2026-08-08 最近一次已确认产品代码生产部署：`6a7749e1fe29900008495c3c`
- 最近一次上线内容：修复 GA4 站内事件对渠道归因的污染；此前发布的 5 类四语种 SEO 主题集合、2 类四语种知识指南、扩充后的导入指南、16 个优先索引准星详情、反应测试、素材渲染器和官方社媒入口继续保留。
- Netlify 已绑定 GitHub `The-AlexLiu/aimcodes`，生产分支为 `main`，构建命令为 `pnpm build`，发布目录为 `dist`。

## GitHub

- 主仓库：<https://github.com/The-AlexLiu/aimcodes>
- 当前生产基线分支：`main`
- 主仓库最近功能提交：`ed865db fix(analytics): 避免站内事件污染渠道归因 (#4)`
- 最近已合并 PR：<https://github.com/The-AlexLiu/aimcodes/pull/4>
- 渲染器仓库：<https://github.com/The-AlexLiu/AimCodes-Social-Creative-Renderer>
- 渲染器最近提交：`d2eef82 新增社媒视频配套封面`
- 渲染器草稿 PR：<https://github.com/The-AlexLiu/AimCodes-Social-Creative-Renderer/pull/1>

## 当前产品基线

- 4 种语言；
- 62 条准星源数据，去重后约 60 种可见样式；
- 3 张地图预览；
- 3 轮反应测试；
- 9 个反应段位；
- 24 个 GA4 验证事件；
- 准星详情可一键分享当前语言、地图和颜色；接收方打开后直接还原预览并可复制最终代码；
- 站内交互来源统一使用 `interaction_source`，标准 `source` 只用于对外链接的渠道归因；
- 292 个生成 HTML 路由；
- 108 个 sitemap canonical URL；
- 社媒视频、方形图和配套封面生成工具。

## 已发布 SEO 基线

- 5 类四语种 SEO 主题集合页；
- 新增四语种准星参数说明和准星颜色指南；
- 导入页已扩充导出、观战复制、常见报错和 FAQ；
- 可索引高价值准星详情由 8 个增加到 16 个；
- 生产构建生成 292 个本地化 HTML 路由；
- sitemap 由 48 个 canonical URL 增加到 108 个；
- 已推送 GitHub、合并到 `main` 并发布 Netlify；四语种代表页面、robots、sitemap、canonical 和 JSON-LD 已在线验证。
- GitHub PR 自动生成 Netlify Deploy Preview；合并 `main` 后自动发布生产环境。

## 当前工作树提醒

2026-08-10 分享增长闭环正在功能分支 `feat/share-growth-loop-20260809` 验收，尚未提交、合并或发布。开始后续任务前仍必须用 `git status -sb`、`git log` 和 `git diff --stat` 确认当前工作树，避免覆盖本轮修改。

## 已确认验证基线

2026-08-08 最近一次本地复核已经确认：

- ESLint 通过；
- Vite 生产构建通过；
- 四语种词条验证通过；
- 多语种路由验证通过；
- 292 个生成路由和 108 个 sitemap URL 验证通过；
- 四个官方社媒链接出现在结构化数据和前端资源中；
- 线上 `/en/`、`/es/`、`/pt-br/`、`/zh-cn/` 和渲染器均返回 200；
- 三份渲染器副本 SHA-1 相同：`361c61af9ab91f965939ef7f36b05033fe1bb04f`。
- 反应测试超过 2 秒会判定为本轮超时，不计入成绩并自动重开当前轮；真实浏览器验证进度仍为 `0 / 3`；
- 渲染器可实际导出英文 Bunny 准星的 MP4、封面 PNG 和方形 PNG，手机宽度下控制项可用；
- `pnpm audit --prod` 无已知漏洞，构建链中的 `nanoid` 已锁定到修复版本。
- PR #4 的 GitHub CI、Netlify Deploy Preview 和 `main` 自动生产部署均通过；线上构建包含 `interaction_source`，四语种入口、robots.txt、sitemap.xml 与 108 个 canonical URL 已复核。
- 本轮分享增长功能已通过桌面端、390px 手机端、四语种准星详情、地图与颜色还原、语言切换保参和反应挑战结果页的真实浏览器验收；自动检查覆盖 24 个 GA4 事件和四语种分享链接。

## 当前已知问题

1. 渲染器有三份副本，尚未实现单一源自动同步。
2. 当前功能分支的 GA4 代码包含 24 个验证事件，但后台尚未创建计划中的自定义维度和指标；`interaction_source` 与 `shared_entry` 建议注册为事件范围自定义维度。
3. 新 SEO 页面刚上线，GSC 尚未形成足够查询和收录数据，不应立即批量扩页。

## 推荐后续顺序

1. 在 GSC 重新提交现有 sitemap，并检查四语种代表页面的抓取与 canonical。
2. 观察 7–14 天的查询、展示、排名和收录状态，优先强化排名 8–30 的页面。
3. 分享增长功能发布后，在 GA4 后台创建已规划的自定义维度和指标，优先注册 `interaction_source` 与 `shared_entry`，观察分享发起和分享落地。
4. 依据 GSC 触发条件选择准星生成器、十字/圆形集合或职业选手页，不批量扩展泛游戏内容。
