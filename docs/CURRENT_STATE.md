# AimCodes 当前状态

状态日期：2026-08-08

本文件用于 GPT/Codex、Cursor 和人工开发者快速恢复项目上下文。发生生产发布、重要合并、路由变化或权限变化后必须更新。

## 生产环境

- 正式域名：<https://aimcodes.com>
- 线上渲染器：<https://aimcodes.com/tools/social-renderer/>
- Netlify 项目：`aimcodes`
- Netlify Project ID：`b244d8b7-4cce-46de-b9b5-2b4f29e30392`
- 2026-08-08 最近一次已确认生产部署：`6a76add812930ae0a8e8666e`
- 最近一次上线内容：反应测试超时保护、四语种超时文案、构建依赖安全修复，以及此前的配套封面和官方社媒入口。

## GitHub

- 主仓库：<https://github.com/The-AlexLiu/aimcodes>
- 当前本地分支：`seo/programmatic-pages-v1`
- 主仓库最近功能提交：`9d8155a fix: 同步反应测试修复与协作基线`
- 主仓库草稿 PR：<https://github.com/The-AlexLiu/aimcodes/pull/2>
- 渲染器仓库：<https://github.com/The-AlexLiu/AimCodes-Social-Creative-Renderer>
- 渲染器最近提交：`d2eef82 新增社媒视频配套封面`
- 渲染器草稿 PR：<https://github.com/The-AlexLiu/AimCodes-Social-Creative-Renderer/pull/1>

## 当前产品基线

- 4 种语言；
- 62 条准星源数据，去重后约 60 种可见样式；
- 3 张地图预览；
- 3 轮反应测试；
- 9 个反应段位；
- 23 个 GA4 验证事件；
- 264 个生成 HTML 路由；
- 48 个 sitemap canonical URL；
- 社媒视频、方形图和配套封面生成工具。

## 本地待发布 SEO 候选

- 5 类四语种 SEO 主题集合页；
- 新增四语种准星参数说明和准星颜色指南；
- 导入页已扩充导出、观战复制、常见报错和 FAQ；
- 可索引高价值准星详情由 8 个增加到 16 个；
- 生产构建生成 292 个本地化 HTML 路由；
- sitemap 由 48 个 canonical URL 增加到 108 个；
- 当前仅在本地完成，尚未推送 GitHub、合并 PR 或发布 Netlify。

## 当前工作树提醒

2026-08-08 已在 `seo/programmatic-pages-v1` 完成本轮 SEO 候选修改。该修改尚未推送远端或发布生产；开始后续任务前必须用 `git status -sb`、`git log` 和 `git diff --stat` 确认实际状态。

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

## 当前已知问题

1. 功能分支与当前 Netlify 生产代码已经同步，但尚未合并到 GitHub `main`。
2. 两个草稿 PR 尚未合并到 `main`。
3. 渲染器有三份副本，尚未实现单一源自动同步。
4. GA4 代码包含 23 个验证事件，但后台尚未创建计划中的自定义维度和指标。
5. Netlify 应改为 GitHub `main` 自动生产部署，减少本地手动发布产生的版本漂移。

## 推荐后续顺序

1. 检查并更新主仓库草稿 PR #2，确认后合并到 `main`。
2. 把 Netlify 生产部署绑定到 GitHub `main`。
3. 在 GA4 后台创建已规划的自定义维度和指标。
4. 将渲染器重构为一个源文件、自动生成主站和作品集副本。
5. 再开始新的产品功能或 SEO 内容扩展。
