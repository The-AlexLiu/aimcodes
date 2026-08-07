# 验证 AimCodes 并准备 PR

目标是生成可审查的提交和 PR 草稿，不默认执行远程写操作。

1. 运行 `git status -sb`，确认不在 `main` 直接开发。
2. 只检查和暂存本任务文件，混合工作树中禁止 `git add -A`。
3. 按改动范围运行：

```bash
pnpm lint
pnpm validate:crosshairs
pnpm validate:finder
pnpm validate:localization
pnpm validate:analytics
pnpm build
pnpm validate:seo
pnpm validate:routing
```

4. 检查必需语言、链接、静态资源、移动端、GA4 参数和敏感信息。
5. 输出拟提交文件、提交信息和 PR 描述草稿。
6. 只有用户明确要求“提交/推送/创建 PR”后才能执行 GitHub 写操作。
7. 只有用户明确要求“发布生产”后才能操作 Netlify 正式环境。
