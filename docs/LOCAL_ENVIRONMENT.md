# AimCodes 本地环境与 GitHub 同步

最后更新：2026-08-16

## 目的

本说明将 AimCodes 的协作拆成三个清晰层次：

1. **GitHub `main`**：唯一可共享的代码、文档和已验证事实来源；
2. **稳定本地环境**：只用于浏览当前 `main`、阅读文档和建立新任务；
3. **任务工作目录**：每个 GPT/Codex、Cursor 或人工任务各用一个分支和工作目录。

本地环境不是云端共享盘。它只存在于当前 Mac；同一台 Mac 上的不同 GPT 账号可以指向同一个稳定目录。若换电脑或需要与外部协作者同步，必须通过 GitHub 获取相同的 `main`，并分别完成各平台授权。

## 推荐目录角色

| 目录角色 | 分支 | 用途 | 规则 |
| --- | --- | --- | --- |
| `aimcodes-main` | `main` | GPT 本地环境、只读参考、GitHub 同步基线 | 保持干净，不直接开发 |
| `aimcodes-<task>` | `codex/<task>`、`cursor/<task>` 或 `feat/<task>` | 单一任务的实现与验证 | 一任务一目录；完成后走 PR |
| 历史/进行中目录 | 任意 | 尚未完成的工作 | 未确认来源的改动一律保留，不作为新账号的起点 |

不要让两个智能体同时修改同一个任务目录或同一分支。

## GPT 本地环境应绑定什么

在 ChatGPT/Codex Desktop 的 **设置 → 环境** 中，添加并选择干净的 `aimcodes-main` 目录。

这样本地环境能读取：

- Git 仓库与当前 `main`；
- `AGENTS.md` 的共同规则；
- `docs/CURRENT_STATE.md` 的产品与生产现状；
- 本文档和 `docs/HANDOFF.md` 的交接协议；
- 现有脚本、测试、构建与本地预览能力。

不要在本地环境中上传或保存 `.env.local`、Cookie、Token、OAuth 回调、浏览器资料或任何密钥。

首次创建该目录后，在目录内执行一次：

```bash
pnpm install --frozen-lockfile
```

这只会按仓库锁定的版本安装开发依赖，不会写入或更改 `package.json`、锁文件或线上环境。

## 每个 GPT 账号的首次操作

1. 在 GPT Desktop 的 **设置 → 环境** 添加同一个 `aimcodes-main` 目录；
2. 进入项目后，先阅读 `AGENTS.md`、`docs/CURRENT_STATE.md`、本文和 `docs/HANDOFF.md`；
3. 执行 `pnpm task:context`、`git status -sb` 与 `git log --oneline -8`；
4. 如果需要改代码，从稳定目录新建独立任务工作目录，而不是直接修改 `main`；
5. 外部平台分别登录：GitHub、Netlify、GA4、GSC、Buffer 等权限不会随 Git 或 GPT 账号自动迁移。

可直接给新账号的第一条指令：

```text
你正在维护 AimCodes。把 GitHub main 视为唯一共享事实来源。
先阅读 AGENTS.md、docs/CURRENT_STATE.md、docs/LOCAL_ENVIRONMENT.md 和 docs/HANDOFF.md，运行 pnpm task:context、git status -sb、git log --oneline -8；只读汇报当前状态与风险，未经我明确授权不得修改、提交、推送、合并或发布。
```

## 同步节奏

### 开始新任务前

在稳定目录中仅快进同步：

```bash
git fetch origin main --prune
git pull --ff-only origin main
```

然后从 `origin/main` 新建任务目录与分支。不要在 `main` 上直接写代码。

### 完成任务后

1. 在任务目录运行对应验证；
2. 只暂存本任务文件；
3. 提交并推送任务分支；
4. 使用 PR 进行审查，检查 Netlify Preview；
5. 合并 `main` 后由 Netlify 自动发布；
6. 回到稳定目录，使用 `git pull --ff-only origin main` 获取最新基线。

## 事实与权限边界

| 类型 | 共享方式 | 不应共享的内容 |
| --- | --- | --- |
| 代码、文档、验证脚本、产品决策 | GitHub 提交与 PR | 临时输出、构建产物、缓存 |
| GPT 项目上下文 | 项目说明与仓库文档 | 账号的私人聊天记忆与登录态 |
| GitHub / Netlify / Google / Buffer 权限 | 每个账号独立 OAuth 或平台邀请 | 密码、Token、Cookie、凭据文件 |
| 生产状态 | `docs/CURRENT_STATE.md`、PR、Netlify 部署记录 | 未核实的口头结论 |

## 资料导航

| 需要了解什么 | 先读什么 |
| --- | --- |
| 开始任务与安全边界 | `AGENTS.md` |
| 正式站、数据、当前已知问题 | `docs/CURRENT_STATE.md` |
| 交接与最近发布 | `docs/HANDOFF.md` |
| 架构与关键文件 | `docs/ARCHITECTURE.md` |
| SEO 优先级 | `docs/SEO_STRATEGY.md`、`docs/CONTENT_ROADMAP.md` |
| 权限范围 | `docs/ACCESS_MATRIX.md` |
| 日常验证流程 | `docs/DEVELOPMENT_WORKFLOW.md` |

## 异常处理

- 稳定目录出现未提交改动：停止在该目录工作，保留改动并另建干净任务目录；
- 本地与 GitHub `main` 无法快进：不要强制重置，先查看差异并确认来源；
- 不同账号结论不一致：以最新 `main`、关联 PR、验证报告和 `docs/CURRENT_STATE.md` 为准；
- 需要生产权限：在平台中单独邀请或授权最小权限，不通过复制登录凭据解决。
