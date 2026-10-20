# 首页英雄图片首次加载优化 · 2026-10-20

## 范围和状态

- 基线：已发布的 `85fb00c07d1b9cfbe61ae3606ccdb12a894aa824`（PR #125）。
- 工作区复用 `home-hero-directory/aimcodes-main`，当前分支 `codex/home-image-loading`。
- 本地优化已验收；按用户随后提出的 Sitemap/索引要求，与 `HERO_INDEXING_2026-10-20.md` 中的索引修复一并走发布流程。最终上线状态以对应 PR 和正式 build-meta 核验为准。
- 保留原始透明 PNG、用户图鉴源工作区及其他任务工作树。

## 原因与处理

12 张原始立绘均为约 2048×1860 的透明 PNG，合计 8,693,034 bytes。原来在图片仍加载时就开始自动滑动，且屏幕外轮播一直运行。首屏训练场背景约 50 KB，此轮主要瓶颈为立绘。

1. 从原始 PNG 生成 640px/960px 的透明 WebP，质量 82、透明质量 100，保持原构图和完整画幅。640px 组合计 445,144 bytes（减少 94.9%）；960px 组合计 763,932 bytes（减少 91.2%）。浏览器按视口和像素密度选择版本。
2. 英雄区接近屏幕 500px 时才给图片分配真实地址，提前加载；尚未接近时不请求立绘，避免和首屏资源竞争。
3. 每排的六张独立图片完成加载与解码后，才启动该排动画。重复副本共享相同地址和就绪状态。画布外观、文案、链接、卡片宽度和悬停暂停保持。
4. 英雄区离开视口或页面标签隐藏时暂停动画；系统减少动态效果偏好继续使用静态横向浏览。
5. 性能检查增加立绘的单张/总量体积预算、尺寸和透明通道校验，防止以后重新引用过大素材。

## 文件

- 修改：`src/components/HomeAgentSection.jsx`、`src/components/agentDirectory.css`、`scripts/validate-performance-budget.mjs`。
- 新增：`scripts/prepare-home-agent-images.mjs`、`docs/HOME_AGENT_IMAGE_VARIANTS.json`、本说明，以及 `public/images/agents/home/*-{640,960}.webp` 共 24 张。
- 可重现生成：`node scripts/prepare-home-agent-images.mjs`，使用项目既有 Sharp 依赖，不安装新依赖，不覆盖 PNG。

## 验证与边界

- `pnpm check:auto`（quick）及 `pnpm validate:performance` 通过，包含 lint、构建和新增图片预算。入口约 116.3 KB gzip，图片集合为 434.7/746.0 KiB。
- 首次进入页面时，英雄区位于视口之外：0 个立绘请求，0 个图片 src，两个动画均暂停。
- 390px、DPR 2、禁用缓存，150ms 延迟/150,000 bytes/s 的模拟慢网：实际只请求 12 个 640px WebP，无 PNG 请求。第一排约 1.82 秒、第二排约 3.24 秒分别在六张图解码完成后开始移动；全过程未出现未就绪排运行。此为本地受控测试，不等同于线上用户加载时间，也不据此宣称实际速度提升百分比。
- 实测悬停暂停、滚回页首后两排暂停、减少动态效果下无动画；桌面与手机无整页横向溢出，透明人物构图已查看截图。
- 截图和细节位于被忽略的 `output/home-image-loading/`：`desktop.png`、`mobile.png`、`mobile-cold.json`。
- 无路由、索引、追踪、支付或生产配置变更；正式速度改善需发布后用线上冷缓存再核验。
