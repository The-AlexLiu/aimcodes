# AimCodes 协作开发流程

AimCodes 使用 GitHub 作为代码、任务和交接的唯一事实来源。GPT/Codex、Cursor 和人工开发者都遵循同一套分支与 PR 流程。

## 本地准备

```bash
pnpm install --frozen-lockfile
pnpm dev
```

默认开发服务器由 Vite 提供。正式语言路径包括：

- `/en/`
- `/es/`
- `/pt-br/`
- `/zh-cn/`

## 分支命名

不要直接在 `main` 开发。

```text
cursor/<简短任务名>
codex/<简短任务名>
feat/<简短任务名>
fix/<简短任务名>
docs/<简短任务名>
```

示例：

```text
cursor/mobile-filter-layout
codex/seo-crosshair-pages
fix/renderer-cover-timing
```

## 两个智能体之间交接

同一任务只能由一个工具持有写权限。交接步骤：

1. 当前工具完成一个可验证的最小阶段。
2. 运行与改动相关的验证命令。
3. 更新 `docs/HANDOFF.md` 或 PR 描述。
4. 提交并推送当前分支。
5. 下一工具拉取同一分支，从提交点继续。

不要让 GPT/Codex 与 Cursor 同时编辑同一个工作目录。需要并行工作时使用不同 Git Worktree、不同分支和不重叠的文件范围。

## Pull Request 要求

PR 描述至少包含：

- 改动目的；
- 用户体验变化；
- 受影响的语言、路由、埋点和素材；
- 验证命令及结果；
- Netlify 预览地址；
- 已知限制与人工检查项。

合并前检查：

- [ ] 没有混入其他人的本地修改
- [ ] 四语种词条同步
- [ ] 没有提交 `.env`、Token、Cookie 或本机绝对路径
- [ ] `pnpm lint` 通过
- [ ] 对应数据验证通过
- [ ] `pnpm build` 通过
- [ ] 桌面端和移动端核心流程通过
- [ ] GA4 事件未发送个人信息或搜索原词
- [ ] 生产部署由明确授权或 `main` 自动发布触发

## 发布原则

- PR 和功能分支只生成预览，不直接修改正式域名。
- `main` 是唯一生产分支。
- 生产发布前确认 GitHub `main`、Netlify 构建输入和本地工作树没有未解释差异。
- 需要回滚时优先使用 Netlify 已验证的历史部署，不使用破坏性 Git 命令。
