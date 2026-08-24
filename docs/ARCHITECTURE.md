# AimCodes 架构说明

最后更新：2026-08-23

## 总体结构

AimCodes 是一个不依赖业务后端的 React + Vite 静态网站。准星数据、推荐算法、语言词典和 GA4 事件均在前端代码中维护，生产构建后部署到 Netlify CDN。

```text
src/data + src/i18n + src/seo
              ↓
         React 应用与 Canvas
              ↓
          Vite 生产构建
              ↓
  generate-localized-routes.mjs
              ↓
  多语种 HTML + sitemap + 静态资源
              ↓
             Netlify
```

## 关键目录

| 路径 | 作用 |
|---|---|
| `src/App.jsx` | 页面路由解释、全局交互状态和业务动作编排 |
| `src/components/` | 预览、准星卡片、反应测试、导入教程和页脚 |
| `src/hooks/useCrosshairCatalog.js` | 目录去重、本地化、搜索、排序、集合选择和当前准星视图模型 |
| `src/data/catalogManifest.js` | 准星目录、索引子集、集合关系、图片与 Sitemap 的共享清单 |
| `src/data/` | 准星代码、目录清单、分类和地图预览配置 |
| `src/i18n/` | 五语种词典、准星本地化和语言路径 |
| `src/seo/` | SEO 文案、页面元数据和路由解析 |
| `src/utils/` | 准星解析、相似度、推荐、分享图和 GA4 |
| `scripts/` | 数据、埋点、语言、SEO 和路由验证 |
| `automation/skills/` | Codex 项目维护 Skill 的可共享源文件 |
| `public/` | Logo、favicon、OG 图、robots、sitemap 和静态工具 |
| `.github/workflows/ci.yml` | GitHub Push/PR 自动验证 |
| `.github/workflows/social-daily.yml` | 每日生成、AI 质检、R2 上传与 Buffer 定时发布 |
| `netlify.toml` | 构建、发布目录、重定向、缓存和安全响应头 |

## 页面与路由

根路径根据设备首选语言跳转：中文进入 `/zh-cn/`、西班牙语进入 `/es/`、葡萄牙语进入 `/pt-br/`、日语进入 `/ja/`，其他或无法识别的语言回落到 `/en/`。五种语言均使用固定的独立目录 URL。

| 页面类型 | 英语示例 | 路由定义 |
|---|---|---|
| 首页精选 | `/en/` | `home` |
| 全部准星 | `/en/crosshairs/` | `catalog` |
| 单个准星 | `/en/crosshairs/tenz/` | `crosshair` |
| 反应测试 | `/en/reaction-time-test/` | `finder` |
| 导入教程 | `/en/how-to-import-valorant-crosshair/` | `guide` |
| 主题集合 | `/en/small-crosshairs/` | `collection` |
| 参数/颜色指南 | `/en/valorant-crosshair-settings/` | `article` |

语言前缀：

- 英语：`/en/`
- 西班牙语：`/es/`
- 巴西葡萄牙语：`/pt-br/`
- 简体中文：`/zh-cn/`
- 日语：`/ja/`

`pnpm build` 先按内容 Hash 增量生成索引准星与 OG 图片，再执行 Vite 构建和本地化路由生成。生成器源码、地图、Logo 或对应准星数据变化会自动失效缓存；图片验证仍覆盖全部必需输出。当前版本生成 2,505 个本地化 HTML 路由，将 1,730 个允许索引的 canonical URL 写入主 Sitemap，并将其中 1,440 个准星详情 URL 写入 `sitemap-crosshairs.xml`。

任务范围由 `scripts/task-context.mjs` 汇总，分级验证由 `scripts/run-check-suite.mjs` 调度。报告写入 `.aimcodes-reports/current/`，使智能体优先读取异常和差异而不是完整日志；流程细节见 `docs/DEVELOPMENT_WORKFLOW.md`。

除基础页面和准星详情外，当前有 25 个高意图主题集合、22 个操作/选型指南，以及 4 个可实际使用的准星工具。日语页面按日本玩家的搜索表达独立改写；未经验证的选手数据和未完成工具不会进入 sitemap。索引边界与扩页规则记录在 `docs/SEO_STRATEGY.md`，日语扩展记录在 `docs/JAPANESE_LOCALIZATION_2026-08-17.md`。

## 准星数据流

1. `src/data/crosshairs.js` 汇总基础准星、`catalogExpansionCrosshairs` 与 `funnyExpansionCrosshairs`；前者由 `src/data/catalogExpansion.js` 按 12 个形态家族确定性生成，后者由 `src/data/funnyCrosshairs.js` 维护经过全库外观去重的趣味造型。
2. `src/data/catalogManifest.js` 从完整目录统一派生 288 个索引详情、25 个集合及集合关系，图片生成、静态路由与 Sitemap 不再各自维护索引列表。
3. `src/utils/crosshairCode.js` 解析代码并生成预览参数。
4. `src/hooks/useCrosshairCatalog.js` 根据外观去重、本地化并计算搜索、排序、相关推荐和当前选择。
5. `CrosshairCanvas` 在地图图片上渲染当前形状和颜色。
6. 用户调整颜色时，预览与最终复制代码同步更新。

新增准星必须同时满足：

- ID 唯一；
- 代码可以解析；
- 名称与实际图案一致；
- 与已有样式不构成无意义重复；
- 五语种显示正常；
- `pnpm validate:crosshairs` 通过。

目录规模与索引规模分开管理：前端目录加载完整去重数据，默认每批展示 48 项；`catalogManifest.indexableIds` 只列出具备独立说明、集合内链和图片资产的索引子集。`src/seo/routes.js` 保留旧导出名作为兼容层，但新的构建与验证脚本直接读取 Manifest。其他详情使用 `noindex,follow`。

`pnpm validate:manifest` 会阻止缺失 ID、重复 ID、索引数量漂移、索引详情没有集合入口和重复集合 Slug。集合页允许链接到完整目录中的 `noindex,follow` 详情，这些引用会计数但不会擅自扩大索引。

## 职业选手候选数据流

1. `data_raw/pro-crosshair-sources.json` 只登记允许访问的公开来源和来源等级；
2. `pnpm collect:pro-candidates` 先读取来源 robots 与 Sitemap，再抓取公开选手页；
3. 候选代码必须通过 AimCodes 解析器和可见性检查，处理结果写入 `data_processed/`，异常行单独写入 `pro-crosshair-errors.json`；
4. 自动采集结果始终保持 `needs_primary_source`，不会进入正式目录、可索引页面或 Sitemap；
5. 只有补充选手本人、战队、Riot/VCT、直播命令或可定位 VOD 等一手来源，并经人工/GPT 语义审核后，才能进入正式数据。
6. 已发布职业配置保存在 `src/data/verifiedProCrosshairs.js`，对应来源快照保存在 `data_raw/verified-pro-crosshair-sources.json`；`pnpm validate:verified-pros` 会校验代码、玩家频道、直播指令、索引与职业集合关系，并阻止缺少来源、资料字段或本地头像文件的选手档案进入发布流程。
7. 职业选手中心使用 `/[locale]/pro-players/` 独立路由；公开选手名单由 `src/data/proPlayerProfiles.js` 从已发布职业准星生成，头像使用本地优化副本并保留选手公开频道来源，基础资料、战队、位置、代表成绩和五语种简介由同一档案提供，避免资料页与准星库出现两套互相冲突的真实性口径。
8. 选手外设采用“资料来源”和“分佣链接”分离的数据原则：没有具体型号、来源 URL 和来源日期的外设不得进入公开页面；分佣 URL 不能反向充当型号证据。
9. 职业选手可以使用相同外观。普通目录继续按外观去重，职业选手集合和独立详情页则按玩家保留配置档案，避免把相同十字重复展示为普通样式。

## 反应测试数据流

1. `CrosshairFinder` 执行三轮测试。
2. `reactionRecommendation.js` 计算平均值、稳定性、最好/最慢成绩和提前点击。
3. 平均值映射到 9 个反应段位。
4. 根据速度、稳定性和提前点击选择一个推荐画像。
5. 推荐画像只返回一个首选准星。
6. 结果页允许直接预览地图、切换颜色、复制代码和分享成绩。

反应段位只是产品化表达，不等于用户真实游戏排位。

## 多语种规则

用户界面词条主要位于 `src/i18n/translations.js`，SEO/静态页面词条位于 `src/seo/content.js`。

任何文案或路由改动都必须：

1. 同步五种语言；
2. 保留正确 `htmlLang`、`hreflang` 和 `og:locale`；
3. 重新执行 `pnpm build`；
4. 执行语言、SEO 和路由验证。

## GA4

- Measurement ID：`G-2VMCECN5S6`
- 正式主机：`aimcodes.com`、`www.aimcodes.com`
- 本地默认不上报；`?ga_debug=1` 可开启调试。
- `?qa=1` 阻止内部验收流量进入 GA4。
- `scripts/validate-analytics.mjs` 当前要求 26 个漏斗事件，并阻止业务组件绕过统一分享成功 helper 直接发送 `share`。
- 搜索事件只上报长度、结果数量和是否有结果，不上报原始搜索词。

普通准星详情页的分享链接通过 `src/utils/shareLinks.js` 生成，保留语言、准星、地图和颜色，并使用 `utm_source=share`、`utm_medium=crosshair` 识别分享带来的访问。用户先进入统一分享面板：支持系统分享的设备可直接调用系统 App，不支持时仍可明确选择复制预览链接或复制“准星代码 + 深层链接”。微信内置浏览器通过 `MicroMessenger` 标识识别，不再调用无法保证好友选择完成的 Web Share；页面改为引导右上角菜单发送，并提供复制链接后粘贴到聊天的可靠兜底。中文页面在普通手机浏览器中也明确提供微信复制兜底，成功事件的方法值为 `wechat_link_copy`。反应成绩分享不再在桌面端意外触发下载，下载战绩卡改为独立动作；战术板同样优先系统分享并回退到复制链接。`share_sheet_open` 与统一 `share` 事件构成分享漏斗，`share_landing` 用于识别接收方落地，`scripts/validate-sharing.mjs` 负责校验五语种路径、微信环境识别、可访问分享面板、预览还原和归因参数。

事件实现以代码和 `validate-analytics.mjs` 为准；`GA4-安装与事件字典.md` 若与验证脚本不一致，需要同步更新。

## 社媒素材渲染器

线上路径：`/tools/social-renderer/`。

主要能力：

- 五语种；
- 308 条源代码、300 种可见样式，另保留 7 个具有玩家控制来源的职业配置快照；
- TikTok、Reels、Shorts 和通用平台预设；
- 自定义三次反应成绩；
- MP4、1080×1080 方形图和 1080×1920 竖版封面；
- 可选视频末尾 1 秒封面候选帧；
- 可选择本地下载目录。

当前存在三份文件副本，详见 `AGENTS.md`。在单一源自动同步完成前，每次修改后必须核对三份文件校验值。

## 每日社媒发布数据流

1. GitHub Actions 每天北京时间 01:30 启动；
2. 三个平台各使用 3 个不同确定性种子，共渲染 9 组 MP4、封面和五个关键帧；
3. 本地脚本验证视频轨、音轨、时长、封面规格和文案事实；
4. AIHubMix 分别生成平台文案并检查封面与关键帧，低于 90 分直接阻止；
5. 通过的 MP4 与封面上传 Cloudflare R2；
6. Buffer 为 TikTok、Instagram、YouTube 创建独立定时帖；
7. R2 Manifest 按日期、平台与波次记录，GitHub Artifact 只保留 7 天的轻量生产报告；视频、封面和抽检帧不重复写入 GitHub，避免扩量后的存储费用。

Instagram 与 TikTok 正文不放裸链接；YouTube 说明允许一个干净的 AimCodes 链接。凭据只通过 GitHub Secrets 注入，不进入仓库或前端构建。

## 构建与部署

本地构建：

```bash
pnpm build
```

Netlify 配置：

- Build command：`pnpm build`
- Publish directory：`dist`
- Node：20
- Project ID：`b244d8b7-4cce-46de-b9b5-2b4f29e30392`
- 正式域名：`https://aimcodes.com`

目标工作流是 GitHub PR → Netlify Deploy Preview → 合并 `main` → 自动生产部署。当前历史上仍使用过本地 Netlify CLI 手动发布，因此执行生产部署前必须先确认 GitHub、工作树和线上版本关系。
