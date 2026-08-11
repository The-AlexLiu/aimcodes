# AimCodes 高效开发流程

状态日期：2026-08-11

目标是在减少重复读取、重复构建和无效日志 Token 的同时，保留 GPT/Codex 或 Cursor 对每个风险关卡的判断。

## 开始任务

```bash
pnpm task:context
```

脚本根据相对 `origin/main` 的提交、暂存、未暂存和未跟踪文件生成：

- `.aimcodes-reports/current/scope.json`
- `.aimcodes-reports/current/scope.md`

报告只负责推荐风险、Scope 与检查套件。GPT/Cursor 必须对照真实需求复核，不得盲从自动分类。

## 分级检查

| 命令 | 用途 |
| --- | --- |
| `pnpm check:auto` | 根据变更自动选择检查套件 |
| `pnpm check:quick` | 文档、孤立文案和普通 UI 修改 |
| `pnpm check:data` | 准星数据、解析、推荐和工具兼容性 |
| `pnpm check:seo` | SEO 内容、语言、路由、内链、图片与 Sitemap |
| `pnpm check:release` | PR 或生产发布前的完整检查 |

准星、集合、图片或 Sitemap 相关任务还会运行 `pnpm validate:manifest`，确认所有索引 ID、集合 ID 与 Slug 都来自同一个目录清单。集合中的 `noindex,follow` 详情会单独计数，验证不会擅自扩大索引。

检查结果写入：

- `.aimcodes-reports/current/verification.json`
- `.aimcodes-reports/current/verification.md`

正常步骤只保留状态和耗时；失败步骤保留精简日志。GPT先读摘要，只在异常时加载相关源码与原始输出。

## 图片增量生成

`pnpm build` 仍会验证所有必需图片，但只重新渲染内容 Hash 发生变化或文件缺失的准星图与 OG 图。Hash 自动包含：

- 图片生成器源码；
- 地图背景与品牌 Logo；
- 准星代码、颜色和预览比例；
- 集合页使用的代表准星。

缓存位于 `.cache/aimcodes/`，不进入 Git。生成器源码或素材变化会自动使缓存失效；`validate:images` 仍会检查最终输出，缓存命中不能绕过验证。

## 必须保留的 GPT 关卡

1. 计划：任务范围、排除项、风险和验证选择。
2. 差异：产品语义、玩家口吻、数据来源、四语种和索引决策。
3. QA：结构化报告、异常计数，以及公开页面的桌面/手机浏览器检查。
4. 发布：暂存文件、完整检查、CI、Deploy Preview 和生产影响。
5. 线上：代表 URL、交互、Metadata、资源、robots 与相关 Sitemap。

Skill 源文件位于 `automation/skills/aimcodes-maintainer/`；Cursor 命令位于 `.cursor/commands/`。两者必须调用仓库中的同一套脚本，不能维护两套产品事实。

GitHub CI 在 PR 上并行运行产品数据检查与构建/SEO 检查；功能分支不再额外触发重复的 push 检查。合并到 `main` 后再运行一次生产基线检查。
