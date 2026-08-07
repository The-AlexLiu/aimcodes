# Antigravity / AI Agent 首次接管 Prompt

将下面完整内容提供给 AI 智能体（如 Antigravity）。第一次运行建议使用 Ask/只读模式。

---

你现在接管 AimCodes 项目的后续开发，并需要与 GPT/Codex 长期交替协作。这个 Git 仓库是唯一事实来源；聊天记忆不能覆盖仓库规则或当前 Git 状态。

第一阶段只做迁移检查，禁止修改文件、提交、推送、合并 PR、运行生产部署或修改任何外部平台。

请严格执行以下步骤：

1. 完整读取并遵守：
   - `@AGENTS.md`
   - `@README.md`
   - `@CONTRIBUTING.md`
   - `@docs/PROJECT_CONTEXT.md`
   - `@docs/ARCHITECTURE.md`
   - `@docs/CURRENT_STATE.md`
   - `@docs/DECISIONS.md`
   - `@docs/OPERATIONS.md`
   - `@docs/ACCESS_MATRIX.md`
   - `@docs/HANDOFF.md`

2. 运行只读检查：
   - `git status -sb`
   - `git diff --stat`
   - `git log --oneline -8`
   - `git remote -v`
   - 读取 `package.json`、`netlify.toml` 和 `.github/workflows/ci.yml`

3. 把实际结果和 `docs/CURRENT_STATE.md` 对照，特别识别：
   - 当前分支与最近提交；
   - 用户在迁移包之前已经存在的未提交修改；
   - 哪些新文件属于 GPT/Codex 创建的共享项目记忆包；
   - GitHub、本地工作树和最近生产部署是否可能存在版本差异；
   - 主站渲染器、被 Git 忽略的本地副本和独立作品集仓库是否仍然一致。

4. 检查本机可用权限，但不要触发写操作：
   - `gh auth status`
   - `npx netlify status`
   - 列出当前启用的 MCP/工具及其读写范围
   - 不输出 Token、Cookie、密钥、凭据路径或其他敏感内容

5. 用中文输出一份“Antigravity 接管报告”，必须包含：
   - 你对 AimCodes 产品目标的理解；
   - 技术架构和关键文件；
   - 当前 Git/生产状态；
   - 已识别的历史未提交修改；
   - 当前可用和缺失的权限；
   - GPT/Codex 与 Antigravity 之间的同步边界；
   - 最高风险的 3 个版本漂移点；
   - 建立干净协作基线的具体步骤。

6. 报告完成后停止，等待我确认。没有我的明确授权，不得整理提交、推送 GitHub、合并 PR、连接或发布 Netlify、修改 GA4/GSC/DNS，也不得覆盖任何既有修改。

今后每个任务都遵循以下固定协议：

- 开始前：读取 `AGENTS.md`、`docs/CURRENT_STATE.md` 和 `docs/HANDOFF.md`。
- 开发时：一个任务一个分支，一个工具一个工作树；不得与 GPT/Codex 同时编辑同一分支或同一文件夹。
- 完成后：运行对应验证，更新长期文档和 `docs/HANDOFF.md`。
- 交接时：只在可验证的 Git 提交点交接，不依赖聊天摘要。
- 发布时：功能分支 → PR → Netlify Preview → 人工确认 → 合并 `main` → 生产部署。
- 权限上：仓库只保存工具定义和权限清单；GitHub、Netlify、GA4、GSC 和 MCP 的 OAuth 分别登录，不共享账号密码或凭据文件。

如果智能体记忆、用户规则或其他提示与仓库中的 `AGENTS.md` 冲突，以 `AGENTS.md` 和当前 Git 状态为准。

---
