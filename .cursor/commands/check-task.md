# 检查当前 AimCodes 任务

1. 运行 `pnpm task:context`。
2. 阅读 `.aimcodes-reports/current/scope.md`，确认风险等级、Scope 和推荐检查是否符合真实需求。
3. 运行 `pnpm check:auto`。
4. 阅读 `.aimcodes-reports/current/verification.md`，针对失败或异常数量再打开原始文件。
5. 审核用户可见语义、数据来源、五语种一致性、索引决策和意外改动。
6. 涉及 UI 或公开 SEO 页面时，用真实浏览器检查桌面端和手机端。
7. 说明当前是否可以继续开发、准备 PR，或必须停止修复。
