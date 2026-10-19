# 蝰蛇英雄准星页面：本地样稿

日期：2026-10-19。分支：`codex/viper-agent-preview`，基线：`4ff4e41`。工作目录：`/Users/alex/.codex/worktrees/viper-agent-preview/aimcodes-main`。无推送、PR、部署、线上配置或分析后台变更。

## 意图与范围

核心任务：通过实机演示看懂蝰蛇的四个主动技能，再预览、复制和调整成品主题准星。

| 查询 | 用户任务 | 承接模块 |
|---|---|---|
| valorant viper abilities / 无畏契约蝰蛇技能 | 技能入门 | 四技能图标、视频和操作 |
| viper poison cloud / 蝰蛇烟怎么收 | 烟雾开关、回收与燃料限制 | 瘴云卡片 |
| viper toxic screen / 蝰蛇毒幕 | 部署、开关和燃料 | 毒幕卡片 |
| viper ult / 蝰腹 | 视野、腐坏、离雾限制 | 蝰腹卡片 |
| viper themed crosshair | 使用一款角色配色准星 | 方点预览、复制与编辑器 |

中文 Title：无畏契约蝰蛇技能与主题准星代码 | AimCodes。H1：蝰蛇。
描述：看蝰蛇四个技能的实机演示，了解毒幕与瘴云的开关、燃料和回收限制，预览、复制并调整酸绿色方点主题准星。
英文 Title：VALORANT Viper Abilities & Themed Crosshair Code | AimCodes。

站内已有战术板包含蝰蛇标记，但不承接视频教学或主题准星。最接近的英雄页面为不死鸟、贤者、遐思。潜在独立教程：逐地图毒幕部署、蛇吻落点；需独立地图与版本验证后再考虑，不在此页虚构点位攻略。配音、年龄、Cosplay 与本页任务不同。

## 搜索证据

- GA4 属性 548356819，America/Los_Angeles，2026-09-20 至 2026-10-17 共28个完整日，hostName 精确限定 aimcodes.com，pagePath 匹配 viper/蝰蛇；screenPageViews、sessions 返回0行。表示没有匹配页面记录，不代表关键词没有搜索需求。
- 本地既有 GSC 导出 `traffic-audit-2026-10-15/gsc.zip`：Web，2026-09-29 至 2026-10-12；查询数.csv、网页.csv 未命中 viper/蝰蛇/ヴァイパー。仅适用于导出范围；本次未取得更新或完整的账户关键词数据。
- 2026-10-19 搜索观察：官方英雄页、技能指南、逐地图点位与主题准星页面存在。结果条数不作为需求量。
- Google 联想：`valorant viper abilities` 返回原词与 skills；`valorant viper` 出现 lineups、voice actor、cosplay 等；中文返回紧凑写法。原响应在本地 `data_raw/viper-2026-10-19/suggest-*.json`。未取得第三方搜索量，不做搜索量估算。

## 模板与造型

基于当前已验收 `PhoenixAgentPage.jsx`，保留Logo、导航、面包屑、980px内容宽度、H1、技能卡与视频、展开连播、角色动画、灯箱、角色资料、共享 `AgentCrosshair`。四技能使用C/Q/E/X顺序。技能描述以作用和操作为主，不列价格、英文别名或无依据FAQ。

差异：酸绿色局部主题；两张经过视觉筛选的动画镜头，以完整画面比例铺满图集；单方点准星。未修改不死鸟、贤者、遐思的设置、文案与样式，也未改变准星目录条目数。

准星 Viper Toxin Dot：3px酸绿色方点、1px黑描边，内外线均关闭，运动与开火误差关闭。与遐思短十字、贤者中心点加宽线环、不死鸟分段十字有结构差异。预览、复制和编辑器使用同一完整设置生成代码。未经游戏客户端实际导入，不称实机导入验证。

## 语言与索引决定

五语均为产品访问样稿，`noindex,follow`，无 hreflang/x-default，不进入主、准星或图片 Sitemap。canonical 为正式域名同语种自身路径。

| 语言 | 路径 | 后续索引提案 |
|---|---|---|
| 中文 | /zh-cn/valorant-viper/ | 产品访问；中文SEO例外须明确授权 |
| 英文 | /en/valorant-viper/ | 可评估 abilities / themed crosshair，发布前再决定 |
| 日文 | /ja/valorant-viper/ | 先补日本本地需求证据 |
| 西文 | /es/valorant-viper/ | 维护层，不自动扩索引 |
| 巴葡 | /pt-br/valorant-viper/ | 维护层，不自动扩索引 |

本次用户仅要求制作页面，未授权发布。未来若批准索引，按发布后28天的GSC抓取、收录、查询展示和点击，以及GA4自然落地、复制和编辑器进入评估；样本不足延至56天，不自动新增监控或批量扩页。

## 事实与媒体来源

- [Riot 官方英雄页](https://playvalorant.com/en-us/agents/viper/)：四技能图标、演示视频、首图。英／日／西／巴葡官方对应页面核验技能名称。
- [国服资料](https://val.qq.com/game-data.html?pageType=1&heroId=9)：从该网站 common.js 使用的公开 GraphQL 接口查询 agents 后确定 Viper id=9，再只读获取技能。中文官方名称为蛇吻、瘴云、毒幕、蝰腹；Q仅在回合开始前回收，C施加易伤。国服官方数据与部分国际英雄页旧描述存在出入：不采用旧页面的“蛇吻减速”描述。
- [8.08官方更新](https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-8-08/)：Q仅购买阶段回收，C单发。 [11.08官方更新](https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-11-08/)：接触腐坏数值变化；本页不写旧数值。
- [RETAKE 官方动画](https://www.youtube.com/watch?v=hhlgphVf-1g)：VALORANT已验证频道。正常观看页可播放；图集截取91秒面罩近景、91.5秒毒雾前射击。截图原尺寸1200×828，纯动画区域 x=0,y=164,w=1200,h=499；去掉播放器区域与黑边，未合成或伪造角色细节。采集日期2026-10-19。候选联系表先视觉检查；背影、远景、小人、纯枪、爆闪画面全部未采用。
- 首图为英雄页原始5120×1772 PNG；截取x=1850,y=0,w=1800,h=1012，生成1920×1080 WebP和1200×630分享图。它是独立官方插画，图集使用动画画面。
- 图标生成96px WebP；技能原视频转960px H.264、静音、faststart，3秒抽帧生成海报，按C/Q/E/X连播。官方演示可能含旧HUD／数值，不能把演示版本等同当前客户端。所有来源URL见 `data_raw/viper-2026-10-19/official-abilities.json` 及媒体清单。

重建入口：`node scripts/prepare-viper-media.mjs`。原件在data_raw只读，中间帧在data_processed，产品派生媒体在public。原视频、网页完整快照、账户数据、node_modules与构建产物均不属于提交范围。

## 中文表达检查

按 `dbs-ai-check` 作为产品操作说明检查。未发现虚构经历、营销式承诺、翻转排比或空泛升华；每个技能采用作用／操作顺序是功能需要。未为句式变化添加无用文案，也不声称能通过AI检测器。

## 验证记录

实际构建、浏览器验收与截图结果在完成后追加于此。截图／机器记录保存到本地 `output/viper-preview/`。保持当前工作树供中文样稿验收，未提交任何代码。

### 最终交付状态

- `pnpm check:auto` 自动选择完整 release 套件：25/25通过；报告 `.aimcodes-reports/current/verification.md`。首次因复用旧工作树依赖缺少 `@netlify/blobs` 中止；改为复用已存在的贤者工作树依赖后全部通过，未安装新包或改动依赖清单。
- 首图收紧裁切后再次 `pnpm build`、英雄 Skill 检查（`--agent viper --index-locales none`）、2项英雄专项测试、`pnpm validate:images` 及 `git diff --check` 通过。548条源代码、540种可见造型、396条索引详情保持基线；主Sitemap仍1894个URL。
- 实际预览：`http://127.0.0.1:4198/zh-cn/valorant-viper/?qa=1`，英文同端口 `/en/valorant-viper/?qa=1`。桌面1440px与手机390px均无横向溢出，H1分别64px与40px；最终首图脸部清楚，边角编号不再进入裁切。
- 四段视频均实际播放、readyState=4、currentTime推进；时长分别12.93／13.67／15.37／9.60秒；展开连播51.57秒。正常YouTube观看页已经实际播放、定位并取帧。页内动画嵌入的播放核验未完成，不能宣称嵌入播放已验证。
- 复制按钮已成功调用真实剪贴板写入并显示“已复制”；地图切换到隐世修所，1×／5×切换正常。实际进入中文编辑器后完整代码与复制内容逐字一致，结果见 `output/viper-preview/editor-verification.json`。没有游戏客户端导入验证。
- 图集灯箱实际打开，Esc关闭后焦点返回原图片按钮；两图均来自可辨识角色画面。最终手机图集仍可继续人工复核触屏体验。
- 将真实共享 `hushAgent.css` 临时追加到样式末尾，按钮与技能标题保持rgb(183,243,75)，悬停为rgb(215,255,148)，正文、章节标题、键盘焦点保持本页色系。按遐思→不死鸟→贤者→蝰蛇切换，各主题色独立，记录在 `theme-navigation.json`。
- 同一亚海悬城地图、相同1×与5×截图并排视觉查看，方点与其他三位英雄几何差异明确，见 `crosshair-comparison.png`。
- 五语构建产物逐一核对：自canonical、noindex,follow、无hreflang、三份Sitemap均无蝰蛇路径，见 `index-verification.json`。中文→英文的真实语言切换已验证；其余连续切换尝试遇到浏览器CDP超时，随后原任务会话消失，未创建替代浏览器会话绕过。待后续人工确认其余语言切换与首页点击入口；路由与五语内容的机械验证已通过。

### 文件与保护范围

新增：`src/components/ViperAgentPage.jsx`、`viperAgent.css`；`src/data/viperCrosshair.js`；`src/seo/viperContent.js`；`scripts/prepare-viper-media.mjs`、`test-viper-agent.mjs`；本任务文档；`public/images/agents/viper/`的17个派生媒体（首图、分享图、4图标、4海报、4视频、1连播、2图集）。原始来源、候选帧、加工中间文件与截图记录保留本地。

修改接入：`src/components/SeoArticlePage.jsx`、`CrosshairToolsPage.jsx`、`HomeResourceDirectory.jsx`；`src/seo/articles.js`、`metadata.js`、`resourceLabels.js`、`routes.js`；`src/styles.css`；`scripts/generate-localized-routes.mjs`、`validate-localization.mjs`。

原工作目录 `aimcodes-main` 中的所有既有埋点、文档、脚本、分析数据与未提交修改均未覆盖、回滚、暂存或提交。未推送GitHub、创建PR、部署Netlify／Cloudflare、修改GA4／GSC后台或生产站。当前分支HEAD仍为基线 `4ff4e41`，本任务变更保留未提交状态。

下一位开发者先复核上述浏览器剩余项，再按用户明确授权决定发布和语言索引范围。仅开放页面访问不等于批准中文索引；本次没有搜索增长或收录结论。
