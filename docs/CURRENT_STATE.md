# AimCodes 当前状态

状态日期：2026-08-07

本文件用于 GPT/Codex、Antigravity 和人工开发者快速恢复项目上下文。发生生产发布、重要合并、路由变化或权限变化后必须更新。

## 生产环境

- 正式域名：<https://aimcodes.com>
- 线上渲染器：<https://aimcodes.com/tools/social-renderer/>
- Netlify 项目：`aimcodes`
- Netlify Project ID：`b244d8b7-4cce-46de-b9b5-2b4f29e30392`
- 2026-08-07 最近一次已确认生产部署：`6a755861ee635c8891988038`
- 最近一次上线内容：配套封面功能与 Instagram、YouTube、TikTok、Facebook 官方入口。

## GitHub

- 主仓库：<https://github.com/The-AlexLiu/aimcodes>
- 当前本地分支：`seo/programmatic-pages-v1`
- 主仓库最近功能提交：`81cbf20 新增配套封面与官方社媒入口`
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

## 当前工作树提醒

截至本文件创建时，主仓库存在早于 Antigravity 迁移整理的未提交修改，主要涉及：

- Logo、favicon、OG 图片和分享成绩图；
- `index.html` 与 `netlify.toml`；
- 品牌组件和样式；
- 本地渲染器数据生成/QA 脚本。

这些修改不属于本次“共享项目记忆包”，不得被 Antigravity 自动覆盖、回滚或和其他任务混合提交。开始任何新任务前必须以 `git status -sb` 和 `git diff --stat` 重新确认实际状态。

## 已确认验证基线

2026-08-07 最近一次产品发布前已经确认：

- ESLint 通过；
- Vite 生产构建通过；
- 四语种词条验证通过；
- 多语种路由验证通过；
- 264 个生成路由和 48 个 sitemap URL 验证通过；
- 四个官方社媒链接出现在结构化数据和前端资源中；
- 线上 `/en/`、`/es/`、`/pt-br/`、`/zh-cn/` 和渲染器均返回 200；
- 三份渲染器副本 SHA-1 相同：`361c61af9ab91f965939ef7f36b05033fe1bb04f`。

## 当前已知问题

1. GitHub 最新提交、当前本地工作树和最近一次手动 Netlify 部署不是严格的一一对应关系。
2. 两个草稿 PR 尚未合并到 `main`。
3. 渲染器有三份副本，尚未实现单一源自动同步。
4. `GA4-安装与事件字典.md` 的事件表少于验证脚本要求的 23 个事件，需要后续同步。
5. Netlify 应改为 GitHub `main` 自动生产部署，减少本地手动发布产生的版本漂移。

## 推荐后续顺序

1. 审核现有未提交修改，按功能拆分提交。
2. 更新 GA4 事件字典。
3. 合并或关闭现有草稿 PR，建立干净的 `main` 基线。
4. 把 Netlify 生产部署绑定到 GitHub `main`。
5. 将渲染器重构为一个源文件、自动生成主站和作品集副本。
6. 再开始新的产品功能或 SEO 内容扩展。
