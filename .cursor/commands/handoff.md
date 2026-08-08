# 生成 AimCodes 交接记录

不要自动推送或发布。

1. 查看当前分支、`git status -sb`、`git diff --stat` 和最近提交。
2. 区分本任务修改与任务开始前已经存在的修改。
3. 运行与本任务相关的验证；不能运行的项目说明原因。
4. 将长期有效的新事实更新到 `docs/PROJECT_CONTEXT.md`、`docs/ARCHITECTURE.md` 或 `docs/DECISIONS.md`。
5. 将当前分支、完成项、验证结果、未完成项和需人工确认内容更新到 `docs/HANDOFF.md`。
6. 输出以下交接摘要：

```text
任务：
分支：
最后提交：
完成内容：
修改文件：
验证结果：
已有未提交修改：
尚未完成：
需人工确认：
是否影响生产：
```
