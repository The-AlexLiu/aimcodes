# 首页双排英雄展示与图鉴接入 · 2026-10-20

## 工作区与边界

- 当前分支：`codex/home-hero-directory`，基于 `1d8ae44b365d`。
- 当前工作区：`/Users/alex/.codex/worktrees/home-hero-directory/aimcodes-main`。
- 用户要求复用的图鉴来源：`/Users/alex/.codex/worktrees/agents-collection/aimcodes-main`，本地预览端口 4179。
- 图鉴源工作区只读；未覆盖其文件或运行服务。原混合工作区中的 GA4、SEO、Clarity 等修改保持不动。
- 未提交、推送、创建 PR、部署或修改生产配置。GA4/GSC 无配置变更。
- 本地首页：`http://127.0.0.1:4176/zh-cn/?qa=1#guides-and-tools`
- 本地图鉴：`http://127.0.0.1:4176/zh-cn/valorant-agents/?qa=1`

## 最终实现

1. 首页连续英雄横幅改为两排横向卡片，12 个精选英雄，宽窄卡片错位。两排以不同速度自动无缝循环；鼠标悬停或键盘聚焦卡片时暂停，移开后继续。移除左右切换按钮，保留暂停/继续控制。系统减少动态效果偏好下停止自动播放，改为原生横向浏览。
2. 首页更换为 Valorant-API 分发的 Riot 透明人物立绘原始 PNG；不再使用图鉴带不透明矩形底色的图片。保留原文件，不做像素编辑，卡片背景统一由 CSS 渐变绘制，避免图片边框和背景割裂。首页新素材来源见 `docs/HOME_AGENT_IMAGE_SOURCES.json`。
3. 完整复用用户 `AgentsCollectionPage` 的舞台、技能图标、准星预览、30 人列表及搜索筛选。导入时仅调整数据和文案 import 文件名，避免覆盖首页的轻量数据模块。
4. 路径统一为五语种 `/valorant-agents/`；首页、更多导航、页脚、英雄返回入口均通过同一个 `routePath` 生成。不使用本机 4179 地址作为站内链接。
5. 同步用户图鉴所需的 `AgentCrosshair` 延迟加载后锚点定位修复，确保“试用主题准星”可跳到对应位置。
6. 新目录延续当前任务的 noindex/follow 策略，既有英雄详情索引规则不变。静态 HTML 保留首页 12 个链接与图鉴全部 30 个链接。
7. 废弃本任务先前 `/agents/` 四卡片方案，其组件已从源码移除，修改前副本保存在被忽略的 `output/home-hero-directory/before-two-rows/`。

## 主要文件

- 首页：`HomeAgentSection.jsx`、`HomeResourceDirectory.jsx`、`agentDirectory.css`。
- 复用图鉴：`AgentsCollectionPage.jsx`、`agentsCollection.css`、`agentsCollectionData.js`、`agentsCollectionContent.js`。
- 轻量首页数据与五语文案：`agentDirectory.js`、`agentsContent.js`。
- 路由/导航/元数据：`App.jsx`、`SiteHeader.jsx`、`SiteFooter.jsx`、`SeoArticlePage.jsx`、`AgentCrosshair.jsx`、`routes.js`、`metadata.js`。
- 静态构建和校验：`generate-localized-routes.mjs`、`report-seo-scope.mjs`、`validate-localized-routes.mjs`、`validate-seo-pages.mjs`、`test-agent-directory.mjs`、`package.json`。
- 导入 29 张官方立绘到 `public/images/agents/collection/`；来源记录为 `docs/AGENT_DIRECTORY_IMAGE_SOURCES.json`。Hush 继续使用现有揭晓图。

## 验证

- `pnpm check:auto` 实际执行完整 `check:release`，25 项通过。
- 最后图片背景调整后重新运行 lint、build、routing、performance。
- 3315 个 HTML；1894 个可索引 canonical URL，索引范围未扩大。
- 浏览器实际检查：1200px 桌面、390px 手机双排展示；12 张首页图片正常；完整头部、无整页横向溢出；自动播放、悬停暂停/移开继续、暂停按钮；首页入口到 `/zh-cn/valorant-agents/`；图鉴 30 张卡片；中文“捷风”搜索返回一条；图鉴手机无横向溢出。
- 两个数据模块的 30 个英雄 ID 顺序一致，图鉴所有封面和立绘文件存在。
- 截图：`output/home-hero-directory/home-two-rows-desktop.png`、`home-two-rows-mobile.png`、`collection-reused-mobile.png`。

## 后续

请用户验收最终视觉。推送、PR、上线需要新的明确授权。用户图鉴工作区仍有独立未提交修改；未来合并时以本文件标注的引入范围去重，不要把两套相同图鉴路由并存。

## 自动漫游复验

- 新增 12 张透明原始 PNG 到 `public/images/agents/home/`，原图鉴素材未覆盖。逐张验证含有效透明像素。
- 两个等宽副本使循环位移恰好等于一组宽度；辅助副本不进入 Tab 顺序或读屏内容，点击仍可进入对应英雄。
- 浏览器实测两排 transform 随时间移动；悬停 350ms 后 transform 保持不变；移开后恢复；暂停按钮 aria-pressed/state 一致。
- 390px 手机页面无整页横向溢出。截图 `home-auto-mobile.png`、`home-auto-desktop.png`。

## 最终精简

按用户要求移除首页暂停按钮和自动漫游提示、首页及聚合页每张英雄卡片的序号。保留自动循环、悬停与键盘聚焦暂停。聚合页标题中的英雄总数保留（它是数量而非序号）。

## 中文界面文案

首页英雄区顶部标识改为五语种词条，中文显示“无畏契约 / 英雄图鉴”。检查该区域标题、说明、按钮、12 个英雄名和职责标签，中文版本无不必要英文。

## 图鉴准星居中修复

图鉴舞台的准星画布原先被固定为 106px（手机 64px），但外框为 138px（手机 86px），全局绝对定位导致准星偏上。改为画布铺满外框，文字标签独立定位到顶部，准星保持外框正中心；不修改共享准星绘制逻辑。

## 发布授权与最终视觉

用户已明确授权首页与聚合页一起发布。发布前删除首页首屏“无畏契约准星试用站”和首页英雄区“无畏契约 / 英雄图鉴”两处小字，五语同步移除对应显示元素。聚合页自身标题标识按现状保留。发布经过 PR、CI、Cloudflare 预览及正式域名核验；结果在 PR 和交接记录更新。
