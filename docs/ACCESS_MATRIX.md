# AimCodes 权限与工具清单

最后更新：2026-08-07

本文件只记录服务、用途、推荐权限和授权方式。不得记录密码、Cookie、Token、私钥、OAuth 凭据或 Google 凭据文件路径。

## 权限矩阵

| 服务 | 用途 | 开发者推荐权限 | Cursor/GPT 同步方式 |
|---|---|---|---|
| GitHub `aimcodes` | 代码、Issue、PR、CI | Collaborator；生产 `main` 走 PR | 同一 Git 仓库；每个账号单独登录 |
| GitHub 渲染器仓库 | 作品集镜像 | Collaborator | 通过提交/PR 同步，不共享 Token |
| Netlify `aimcodes` | 预览、构建、生产发布 | 初期无需平台权限；确需日志时给项目级 Developer | 优先 GitHub 自动部署；平台登录分别授权 |
| GA4 AimCodes 属性 | 漏斗和事件分析 | Viewer；改配置时临时 Editor | 两个工具的 MCP/OAuth 分别登录 |
| Google Search Console | 收录、sitemap、搜索表现 | Full user，不给 Owner | 两个工具分别授权或人工操作 |
| NameSilo | 域名与 DNS | 仅所有者 | 不接入智能体，不共享账号 |
| Instagram/YouTube/TikTok/Facebook | 内容分发 | 开发阶段不提供 | 不共享密码；需要时使用平台角色 |

## GPT/Codex 与 Cursor 的配置差异

GPT/Codex 项目级 MCP 可配置在：

```text
.codex/config.toml
```

Cursor 项目级 MCP 可在 `.cursor/mcp.json` 或 IDE 设置中管理。两种工具可以共享“需要哪些 MCP”的清单，但实际 OAuth 和 Token 必须分别完成。

## 推荐 MCP 清单

| MCP/连接器 | 当前用途 | 是否必须 |
|---|---|---|
| GitHub | 查看 PR、检查 CI、提交协作 | 推荐 |
| Netlify | 查看部署状态和日志 | 可选；不默认开放生产写权限 |
| Google Analytics | 读取 GA4 数据 | 可选；使用只读权限 |
| Browser/Playwright | 本地和线上 UI 验收 | 推荐 |

## 同一台 Mac

Cursor 终端和 GPT/Codex 本地终端在同一 macOS 用户下运行时，可以复用系统中的 Git 和 CLI 登录状态。开始前只读检查：

```bash
gh auth status
npx netlify status
```

即使终端 CLI 已登录，不同智能体环境的 GitHub 扩展、MCP 或 OAuth 仍可能要求分别登录。

## 环境变量与秘密

- 当前 AimCodes 前端没有必需的私密构建环境变量。
- GA4 Measurement ID 是公开客户端标识，不是秘密。
- `.env.example` 只记录变量名和非敏感示例。
- 真实值进入 `.env.local` 或 Netlify 环境变量。
- `.env.local`、凭据 JSON、Token 文件和浏览器登录状态不得提交 GitHub。

## 外部写操作

以下操作必须获得用户本次任务中的明确授权：

- 推送 GitHub；
- 合并或关闭 PR；
- 修改 Netlify 生产配置；
- 发布正式站；
- 修改 GA4、GSC、DNS 或社媒设置；
- 删除远程资源或撤销其他用户权限。
