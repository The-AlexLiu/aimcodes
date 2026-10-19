# 炼狱英雄页本地样稿

2026-10-19；分支 `codex/brimstone-agent-preview`；基于 `origin/main` 的 `4ff4e41`。工作目录 `/Users/alex/.codex/worktrees/brimstone-agent-preview/aimcodes-main`。仅本地开发；未经授权不提交、推送、创建 PR 或发布。

## 任务与搜索意图

核心任务：快速看懂炼狱技能操作，预览、复制和调整主题准星。最接近现有页面是 `/en/valorant-phoenix/` 等英雄页；战术板的标记功能不承担技能演示与主题准星任务。主题代码不代表官方或选手配置，不新增目录准星。

| 查询 | 意图 | 模块 |
|---|---|---|
| 炼狱技能 / valorant brimstone abilities | 技能入门 | 标题、简介、四技能演示 |
| brimstone smoke / 炼狱烟怎么放 | 标点与确认 | 空投烟幕 |
| brimstone molly / 炼狱燃烧榴弹 | 弹跳与落点 | 燃烧榴弹 |
| brimstone stim beacon | 投掷与团队加速 | 振奋信标 |
| brimstone ult | 选区与避开队友 | 天基光束 |
| brimstone inspired crosshair | 预览、复制、调整 | 成品主题准星 |

中文 Title：无畏契约炼狱技能与主题准星代码 | AimCodes。H1：炼狱。描述：看炼狱四个技能的实机演示，了解空投烟幕、燃烧榴弹、振奋信标和天基光束的基本操作，预览并复制主题准星代码。

独立教程候选：逐地图封烟位置、燃烧榴弹落点与守包时机。不在此页混入大量点位、配音和台词，也不加缺乏证据的 FAQ。

### 证据边界

- GA4 属性 548356819，America/Los_Angeles，2026-09-19—2026-10-16（28个完整日）；hostName=aimcodes.com，落地路径匹配 brimstone／炼狱／ブリムストーン：0行。不能推导为没有需求，GA4不提供关键词搜索量。
- 既有GSC导出 `data_raw/traffic-audit-2026-10-15/gsc.zip`，2026-09-29—2026-10-12：查询／页面中未匹配以上词。属于旧导出及其截断范围；没有取得更新的GSC查询。
- 2026-10-19 Google联想出现 abilities、lineups、molly、ult、smoke spots；中文只返回紧凑写法。原始响应保存于本地 `data_raw/brimstone-2026-10-19/suggest-*.json`。搜索观察中有官方英雄页和技能资料；没有第三方搜索量估算，不用结果条数代替需求。

## 模板与实现

复用已验收不死鸟的首图、四技能、展开连播、角色动画、灯箱、资料、完整准星交互。抽出 `AgentAbilityPage.jsx` 共享布局，由不死鸟和炼狱薄包装传入数据；不死鸟内容、媒体、准星和颜色不变。炼狱主题作用域为 `.hush-page.brimstone-page`，保留全站品牌导航。

图集只用两张可靠角色镜头，桌面两列、手机单列。保留点击放大、Esc、焦点返回。准星为实心方点＋四枚短外刻线：无内十字，中心4px，外线长1、粗3、间距6；以完整同一设置生成Canvas、复制与编辑器代码。未改已有英雄准星，未经游戏客户端导入，不声称实机验证。

## 来源与媒体

- Riot英雄页：https://playvalorant.com/en-us/agents/brimstone/；英／日／西／巴葡对应官方页核对名称。完整公开数据保存于本地 `official-*.json`。四技能图标／视频使用其中 `iconTab.groups` 的官方 cmsassets 原始地址。
- 国服：https://val.qq.com/game-data.html?pageType=1&heroId=5；官网 `common.js` 指向的公开GraphQL资料，先读取agents列表查得id=5，再读取技能。响应本地 `official-cn.json`。C立即投掷，Q燃烧榴弹，E左键标点／右键确认，X地图选区。
- 4.04官方说明：https://playvalorant.com/en-gb/news/game-updates/deep-dive-into-4-04-controller-agents-changes/；信标加速与团队快速执行定位。旧英雄页英文描述与实机演示可能保留旧装备动作／HUD，不逐帧称为当前版本；当前C操作依据国服官方资料，不写价格、点数或持续时间。
- 角色动画：https://www.youtube.com/watch?v=FUoqAn5T4h4 ，VALORANT已验证官方频道，标题 L’Accord - Chamber Agent Trailer // VALORANT。实际播放后定位并截取视频区域，无字幕／控件。首图72秒，图集69秒（单膝撑地）／71秒（抬头近景）；浏览器截图范围 x16,y68,w822,h462。原始帧保留，派生WebP与OG为重新编码／缩放，无生成细节。没有使用模型正背面或设计演示图。
- `scripts/prepare-brimstone-media.mjs` 从本地原片和选中帧重建派生素材，原始文件只读。四MP4转960px、H.264、静音、faststart；海报3秒。连播C/Q/E/X。
- 原始网页JS保留在data_raw，仅作为来源资料；ESLint忽略data_raw目录，避免把下载原文当作产品代码。

## 五语索引决定

| 语言 | 路径 | 目标／用途 | robots |
|---|---|---|---|
| en | /en/valorant-brimstone/ | valorant brimstone abilities；未来优先评估 | noindex,follow |
| zh-CN | /zh-cn/valorant-brimstone/ | 炼狱技能与主题准星；产品访问 | noindex,follow |
| ja | /ja/valorant-brimstone/ | ブリムストーン アビリティ／クロスヘア | noindex,follow |
| es | /es/valorant-brimstone/ | habilidades de Brimstone；界面访问 | noindex,follow |
| pt-BR | /pt-br/valorant-brimstone/ | habilidades do Brimstone；界面访问 | noindex,follow |

五语自canonical指向aimcodes.com同路径，无hreflang、x-default，不进三份Sitemap。语言切换与索引分开。中文政策白名单不变；批准发布也不自动开放中文索引。未来如批准英语索引，28天看抓取／收录／查询展示／点击及自然落地、复制和编辑器使用；不足延至56天。不自动创建监控或扩下一英雄。

## 验证与交付

见本地 `output/brimstone-preview/` 截图和验证记录；完整检查见 `.aimcodes-reports/current/verification.md`。原目录及其他英雄任务工作树的既有修改完全保留，GA4/GSC后台、GitHub、托管配置和生产站均未改变。

### 已观察到的本地验证

- 第一轮完整检查在图集生成前运行，links报缺图；素材齐全后完整 `check:release` 25/25通过，43.2秒。随后只改炼狱首图裁切和删除一句多余提示，再次运行最终完整检查；以 `.aimcodes-reports/current/verification.md` 最新结果为准。
- 英雄辅助检查确认五语各4技能／2图、代码往返一致、与遐思／贤者／不死鸟几何不同；不死鸟原有专项2项测试通过。
- 正式构建桌面1440／手机390首屏已查看，中文H1为64px／40px，品牌、导航、面包屑齐全。首轮人物裁切偏低，已调整桌面80%宽／85%焦点，手机230px高；最终裁切需接回浏览器再查看。
- 四段技能视频实播：readyState=4，currentTime均推进；时长C5.87／Q7.23／E13.00／X17.33秒，连播43.43秒且实际推进。
- 灯箱打开、Esc关闭、焦点返回原图按钮均实测成功。
- 地图选择项ascent／haven／bind与5×按钮可操作。复制回读／编辑器往返操作期间Ego Lite报告用户取得控制权，已停止浏览器，未获得完整结果，不声称复制核验完成。
- 尚待：最终首图桌面／手机、五语切换、剪贴板回读与生成器逐字相等、同地图1×／5×真实Canvas并排、最后加载共享CSS的计算颜色／悬停／键盘焦点，以及从首页导航进入和官方动画嵌入实播。
- 模板既有问题：生成器切换语言可能丢失theme参数，不在本任务顺带修复；本页初次带入仍待实际浏览器核验。

中文按 `dbs-ai-check` 检查产品操作说明；未发现需保留在产品里的虚构经历、套路开头、术语扩写或强行升华。删除“信标不会挡子弹”的多余提示；保留必要键位、落点和队友伤害提醒。此检查不代表AI检测器保证。

本地预览：`http://127.0.0.1:4197/zh-cn/valorant-brimstone/?qa=1`；英文将路径换为`/en/valorant-brimstone/`。预览进程保持运行供用户查看。

### 最终机械验收

最终 `pnpm check:release` **25/25通过**，109.6秒；英雄辅助检查五语通过，不死鸟专项2/2通过，`git diff --check`通过。本地预览五语HTTP 200，标题／自canonical／noindex／无hreflang已回读；Sitemap索引数保持1894，生成路由3165。发布与浏览器待办边界不变。

新增文件：`src/components/AgentAbilityPage.jsx`、`BrimstoneAgentPage.jsx`、`brimstoneAgent.css`；`src/data/brimstoneCrosshair.js`；`src/seo/brimstoneContent.js`；`scripts/prepare-brimstone-media.mjs`；17个 `public/images/agents/brimstone/` 派生媒体；本任务文档以及本地来源资料、处理联系表和验收输出。

修改文件：`eslint.config.js`（原始资料排除）；`scripts/generate-localized-routes.mjs`、`validate-localization.mjs`；`src/components/CrosshairToolsPage.jsx`、`HomeResourceDirectory.jsx`、`SeoArticlePage.jsx`、`PhoenixAgentPage.jsx`、`phoenixAgent.css`（共享布局抽取）；`src/seo/articles.js`、`metadata.js`、`resourceLabels.js`、`routes.js`；`src/styles.css`（首页入口主题）。原始账号报表、私人档案、node_modules、dist和output不属于未来产品提交。

## 已授权发布阶段

用户已明确批准发布当前炼狱页。五语维持noindex，不进入Sitemap／hreflang；不扩大索引授权。发布平台已核对为Cloudflare Workers Builds，正式站基线初次为4ff4e41；工作期间主分支新增幽影PR #98（eb82683），合入后重新检查，保留其所有页面。回滚边界为炼狱PR新增源码和派生媒体及共享布局抽取，不改DNS、账号、广告、追踪与支付。

补齐浏览器验收：系统剪贴板回读与主题源代码完全一致；实际点击调整入口后编辑器生成值逐字相同。从首页炼狱入口进入成功，五语切换保持英雄路径且无横向溢出。1440／390最终首图已截图，H1为64／40px。共享Hush样式追加到文档最后后，炼狱主色仍rgb(247,161,107)，悬停rgb(255,195,158)，键盘focus-visible同主色，标题／正文／边框颜色保持主题。

YouTube隐私嵌入当前返回“请登录，以便我们确认你不是聊天机器人”，已停止该认证相关操作；未绕过验证。站内四技能视频和连播可正常播放，官方观看页此前已验证播放；页面保留直接前往官方YouTube的入口。该嵌入限制需如实交付，不声称嵌入实播通过。
