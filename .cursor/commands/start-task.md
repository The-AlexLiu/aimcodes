# 开始 AimCodes 任务

先进入只读模式，不要修改任何文件。

1. 阅读 `AGENTS.md` 与 `docs/CURRENT_STATE.md`。
2. 运行 `pnpm task:context`，先阅读 `.aimcodes-reports/current/scope.md`，再按 Scope 选择项目文档，不要无差别加载全部文档。
3. 运行：
   - `git status -sb`
   - `git diff --stat`
   - `git log --oneline -8`
4. 说明当前分支、已有未提交修改、最新提交和与 `docs/CURRENT_STATE.md` 的差异。
5. 用一句话复述任务目标，并列出准备修改与明确不修改的文件。
6. GPT/Cursor 必须审核自动判断的风险等级和推荐检查，不得直接相信脚本分类。
7. 在获得用户确认前，不提交、不推送、不合并、不部署、不修改外部平台。
