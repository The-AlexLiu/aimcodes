# AimCodes 工具间交接

最后更新：2026-08-08

## 当前交接目标

把 AimCodes 从依赖单一 GPT/Codex 长对话的开发方式，迁移为 GPT/Codex 与 Cursor 都能从 GitHub 恢复上下文的协作方式。

## 本次已经整理

- 根目录共享智能体规则 `AGENTS.md`；
- 协作流程 `CONTRIBUTING.md`；
- 产品背景、架构、状态、决策、发布和权限文档；
- Cursor 协作接管验证与固定协议；
- 可共享的团队上下文规范。

## 当前分支与提交

- 主仓库当前分支：`seo/programmatic-pages-v1`
- 最近功能提交：`9d8155a`
- 当前功能分支已经推送到 GitHub；同步完成时本地与远端功能分支一致。

## Cursor 接手时第一步

1. 先只读，不修改文件。
2. 阅读 `AGENTS.md` 和 `docs/` 中所有 Markdown 文件。
3. 运行 `git status -sb`、`git diff --stat` 和 `git log --oneline -8`。
4. 对照 `docs/CURRENT_STATE.md` 报告差异。
5. 识别本地新增提交与远端分支、生产部署之间的差异。
6. 未获得明确授权前，不提交、不推送、不合并、不部署。

## 尚未完成

- 当前功能分支尚未合并到 GitHub `main`；
- 两个草稿 PR 尚未合并；
- Netlify 尚未确认改为 GitHub `main` 自动生产部署；
- 渲染器尚未完成单一源自动同步；
- GA4 后台尚未创建计划中的自定义维度和指标。

## 本次验证结果

共享记忆包创建后已经确认：

- 新增文档与 Cursor 规则不存在本机绝对路径；
- 未发现 Token、API Key、私钥或其他凭据值；
- `git diff --check` 通过；
- `pnpm lint` 通过；
- 62 条准星源代码、60 种可见样式验证通过；
- 9 个连续反应段位和推荐 ID 验证通过；
- 4 语种词典和 62 条准星本地化验证通过；
- 23 个 GA4 漏斗事件验证通过，未采集原始搜索词；
- Vite 生产构建通过；
- 生成 264 个本地化 HTML 路由和 48 个 sitemap URL；
- SEO 与四语种路由验证通过。
- 反应测试的超长等待不会再生成异常成绩，超过 2 秒会重开当前轮；
- 渲染器的 MP4、封面 PNG、方形 PNG 已通过真实浏览器导出测试；
- `pnpm audit --prod` 无已知漏洞。

## 最近生产发布

- 发布时间：2026-08-08；
- Netlify Deploy ID：`6a76add812930ae0a8e8666e`；
- 正式域名：<https://aimcodes.com>；
- 发布后已确认四语种入口、Sitemap、robots、渲染器和反应测试超时保护正常。

## 下一任务推荐

先完成 `main` 基线收口，再开始新的大型功能：

1. 检查并更新主仓库草稿 PR #2；
2. 确认后合并到 `main`；
3. 将 Netlify 生产部署绑定到 GitHub `main`；
4. 再开始 Cursor 与 GPT/Codex 的后续协作。

## 交接原则

聊天只用于讨论；长期事实必须回写仓库文档。任务只在可验证的 Git 提交点交接，不在两个工具同时编辑同一工作树时交接。
