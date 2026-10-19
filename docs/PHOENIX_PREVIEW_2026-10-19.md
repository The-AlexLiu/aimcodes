# 不死鸟英雄页面：本地样稿与发布边界

> 发布阶段更新：用户随后已明确批准发布。本轮仅英语开启索引并进入 Sitemap；中文／日语／西语／巴葡保持 noindex,follow。以下本地样稿内容保留为开发阶段记录，以文末发布说明为当前决定。

日期：2026-10-19；分支 `codex/phoenix-agent-preview`；基于 `08aaa27736a5`（贤者主题隔离修复，包含与 `codex/hush-agent-page` 相同的最新遐思组件）。本次未提交、推送、创建 PR、部署或修改生产设置。

## 范围与模板差异

- 在独立工作树 `/Users/alex/.codex/worktrees/phoenix-agent-preview/aimcodes-main` 开发；原工作树的分析埋点、文档及未跟踪资料全部保留。遐思与贤者组件、内容和样式零修改。
- 复用应用品牌导航、语言选择器、面包屑、`hushAgent.css` 布局与 `AgentCrosshair` 全套功能。不另建首页壳或准星调参面板。
- 保持首图字号（桌面 64px、390px 手机 40px）、980px 内容宽度、卡片圆角、间距、视频比例、图集及灯箱操作。
- 四个主动技能用二列卡片、移动端单列；回血机制写入火墙／火球卡，不为被动另造图标或添加填充卡片。遐思有五张卡及独占一行的大招，本页四技能使用完整二乘二布局。
- 不死鸟使用局部橙金主题，全部覆盖在 `.phoenix-page` 下；灯箱独立为 `.phoenix-lightbox`。保留品牌导航原有红色。
- 使用官方图标、默认 C/Q/E/X 键位，去掉别名副标题、制作说明、价格、多层问题标题。没有搜索证据支持的 FAQ 不加入。
- 模板的上线／解锁折叠区改为已有英雄的简短角色资料；保留展开连播、官方角色动画、图集放大、准星和准星库内链。
- 主题准星：橙金色分段细十字、中心留空、带四枚独立外线。与遐思短线十字及贤者带中心点的环状造型有明确结构区别；界面不强调 AimCodes 原创，也不称为官方／职业选手配置。

## 搜索证据与意图

### 本站数据

- GSC：读取已有账户导出 `data_raw/traffic-audit-2026-10-15/gsc.zip`，Web、2026-09-29 至 2026-10-12。热门查询和页面导出中未命中 phoenix／不死鸟／フェニックス。这只是该导出范围与截断范围的观察，不能证明完全没有需求；本次未取得更新的 GSC 账户查询。
- GA4：属性 `548356819`，时区 America/Los_Angeles，2026-09-19 至 2026-10-16，限定 `hostName=aimcodes.com`、landingPagePlusQueryString 匹配 phoenix／不死鸟。返回 0 行。GA4 是落地行为证据，不提供关键词搜索量。
- 站内最接近的是 `/en/valorant-sage/`、`/en/valorant-hush/`、准星库与生成器；源码没有不死鸟英雄文章。战术板只有英雄／技能标记，不承担技能视频介绍与成品主题准星任务。

### 搜索结果与联想观察

2026-10-19 查询英文和中文：官方 Phoenix 英雄页、Riot 技能调整说明、中文技能介绍及逐地图点位内容出现在结果中；Phoenix crosshair 结果同时混有同名玩家和其他游戏，不能直接当作本英雄需求。

Google 联想：`valorant phoenix` 包含 abilities、voice actor、voice lines、ult 等；`valorant phoenix abilities` 包含 abilities change、skills、powers、tips；中文“无畏契约 不死鸟”只返回紧凑写法。联想原始响应保留在本地 `data_raw/phoenix-2026-10-19/suggest-*.json`。未取得第三方搜索量估算，不提供虚构搜索量。

核心意图：快速看懂不死鸟技能和操作；原创主题准星作为可直接使用的下一步。

| 查询 | 意图 | 模块 |
|---|---|---|
| 无畏契约不死鸟技能／VALORANT Phoenix abilities | 技能入门 | Title、简介、四技能视频 |
| 不死鸟闪光怎么拐／Phoenix flash | 左右拐方向及误闪限制 | 闪光曲球 |
| 不死鸟火墙怎么弯／Phoenix wall | 按住开火转动准星 | 火冒三丈 |
| 不死鸟怎么回血／Phoenix heal | 自己的火与离火后治疗 | 火墙、火球 |
| 不死鸟大招／Phoenix Run It Back | 返回机制及起点风险 | 再火一回 |
| 不死鸟主题准星／Phoenix inspired crosshair | 预览、复制、调整 | 原创主题准星 |

Title：无畏契约不死鸟技能与主题准星代码 | AimCodes。H1：不死鸟。
描述：看不死鸟闪光、火墙、火球和大招的实机演示，了解基本操作与回血机制，预览并复制原创主题准星代码。
英文 Title：VALORANT Phoenix Abilities & Themed Crosshair Code | AimCodes。

后续独立题目：逐地图反清闪、进攻闪配合路线、火球落点与时间、返场点位风险。配音演员、语音台词与本页任务不同，暂不承接。

## 语言与索引

| 界面语言 | 正式路径提案 | 目标查询／用途 | 发布建议 |
|---|---|---|---|
| 中文 | `/zh-cn/valorant-phoenix/` | 不死鸟技能、主题准星 | 产品访问；中文索引需用户确认例外 |
| 英文 | `/en/valorant-phoenix/` | valorant phoenix abilities / phoenix crosshair | 优先候选搜索入口，发布时再确认索引 |
| 日文 | `/ja/valorant-phoenix/` | フェニックス アビリティ／クロスヘア | 界面访问；先补日本需求证据 |
| 西文 | `/es/valorant-phoenix/` | habilidades de Phoenix | 语言访问，维护层不自动扩索引 |
| 巴葡 | `/pt-br/valorant-phoenix/` | habilidades do Phoenix / mira Phoenix | 语言访问，维护层不自动扩索引 |

本地阶段五语均 `noindex,follow`；canonical 指向正式域名同语种自身路径；无 hreflang / x-default 声明；不在三份 Sitemap 中。语言选择器可切换五语，与是否索引分别控制。

发布提案：先仅评估英语索引；如果批准，英语改为 index,follow 并进入 Sitemap，其余语言保留 noindex，不进入 hreflang。中文政策只允许首页、目录、反应测试及三个明确白名单，本次未擅自加入英雄例外。若希望中文承接搜索，需用户明确批准后修改白名单和英语／中文 hreflang，并做正式域名核验。不要把本地中文可访问称作中文 SEO 上线。

如果批准索引，以发布后 28 天为首评：GSC 抓取、收录、技能查询簇展示／点击；GA4 自然落地会话与代码复制／生成器使用。样本不足延到 56 天；没有信号先改善意图与内链，不批量扩英雄页。当前不声称存在流量增长。

## 媒体及事实来源

- [Riot 官方英雄页](https://playvalorant.com/en-us/agents/phoenix/)：四技能图标及 MP4。原始 URL 与说明在 `data_raw/phoenix-2026-10-19/official-abilities.json`；保存原片，站内视频转为 960px、H.264、静音、faststart。逐技能抽取海报，连播按 C/Q/E/X 顺序拼接。未改技能效果。
- [国服官方资料](https://val.qq.com/game-data.html?pageType=1&heroId=6)：从官网 `common.js` 使用的 `https://api.val.qq.com/go/agame/graphql/graphiQL` 只读取得不死鸟及技能。官方中文名与当前 C/Q/E/X 已核验，返回在本地 `official-cn.json`。第三方 `valorant-api.com` 只作早期交叉检查，不作为最终真源。
- [9.10 官方更新](https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-9-10/)：闪光变伴生技能、两击杀刷新；火球改非伴生；接触火焰后离开仍持续治疗。13.02 大招点数调整也已检查，但本页不写技能价格／点数。
- [Riot AGENT ORIGINS: Phoenix](https://playvalorant.com/en-us/news/dev/agent-origins-phoenix/)：首图仍使用官方人物近景。图集根据用户反馈全部改为《决斗》动画中的三张人物特写；设定图、正背面模型图均不再引用。
- 首图 `69e2fdd71e179557dfaae1dbcc4dd414b6896060-1920x1080.jpg`；图集肖像 `1368e917e5026c3a13b235a41686a90f10a9b21f-2500x2611.jpg`；大招 `bb5044bb00773a787d463fba82253c668ee57a61-1920x1080.jpg`；设计 `4a5778dc0df0fa947d1e4af90bdade3c50e58908-1280x492.jpg`。均为上述文章的 `cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/` 原图。
- [DUELISTS 官方动画](https://www.youtube.com/watch?v=e_E9W2vsRbQ)：VALORANT 官方频道。隐私增强嵌入，点击后加载，保留外部观看入口。浏览器已实际播放。离线下载返回 403，未使用第三方副本；本轮图集改为浏览器播放官方 1080p 动画后截取，不使用下载副本。
- 英／日／西／巴葡技能名称分别从官方各语种英雄页核对。中文不并列英文名。旧官方演示可能展示旧 HUD／数值；当前键位依据国服官方数据，机制依据官方更新，本页不逐帧宣称视频是当前版本。

## 文案检查

按 `dbs-ai-check` 检查中文产品说明：没有需要修改的套路开场、虚构体验、同义词扩写或关键词堆叠。技能短句采用统一信息顺序是操作说明需要，不以句式整齐作为问题，也不保证检测器结果。

## 验证与待确认

验证截图与记录：本地 `output/phoenix-preview/`。完整检查报告 `.aimcodes-reports/current/verification.md`，`pnpm check:release` 25 项通过；新增 `node --test scripts/test-phoenix-agent.mjs` 两项通过，覆盖五语素材、无索引、几何差异及准星配置往返一致。

正式构建预览：`http://127.0.0.1:4193/zh-cn/valorant-phoenix/?qa=1`。QA 参数用于内部验收。未改变 GA4／GSC 后台或生产追踪配置。

下一位开发者：保留本分支未提交变更，先阅读本文件与浏览器记录；只在用户明确授权后创建 PR／推送／发布。发布前确认语言索引范围、媒体当前可用性及部署平台；发布后必须在 aimcodes.com 核验颜色、媒体、交互和索引标记。

模板既有问题仅记录：编辑器切换语言时会丢失 theme 查询参数并重置配置（不死鸟初次“调整准星”带入配置正确）。未修改共享语言切换逻辑或遐思页面。

### 最终实际页面记录

- 正式构建 1440px 桌面与 390px 手机均无横向溢出；五语语言选择器均保持 `valorant-phoenix/` 路径，标题和页面语言一致。
- 桌面／手机 H1 分别为 64px／40px，与遐思模板实测相同。
- 不死鸟主色 `rgb(255,188,112)`；键盘焦点同色，悬停 `rgb(255,213,163)`。把真实共享 `hushAgent.css` 追加到样式末尾，按钮、技能标题、正文、章节标题及展开区边框颜色保持不死鸟主题。
- 构建页面按遐思→不死鸟→贤者→遐思→不死鸟顺序重新打开，主按钮分别保持粉色／橙金／青绿／粉色／橙金。
- 四段技能视频均实际播放（readyState=4、currentTime 推进）；连播时长 46.17 秒。官方动画实播至 0:02／2:12。
- 原生剪贴板写入成功，反馈“已复制”；地图切换至隐世修所，5×预览可切回 1×；图集灯箱可打开，Esc 关闭后焦点回到原图片按钮。
- “调整这款准星”实际进入中文编辑器，生成的完整代码与英雄页复制内容逐字一致。准星库链接保留当前语种。
- 静态 HTML 五语均自 canonical、noindex,follow、无 hreflang；三份 Sitemap 均无 `/valorant-phoenix/`。
- 关键截图：`output/phoenix-preview/desktop-zh.png`、`mobile-zh.png`、`gallery-crosshair.png`。机器记录：`browser-verification.json`、`interaction-verification.json`、`theme-navigation.json`、`index-verification.json`。

### 文件交接清单

新增：`src/components/PhoenixAgentPage.jsx`、`src/components/phoenixAgent.css`、`src/data/phoenixCrosshair.js`、`src/seo/phoenixContent.js`；18 个 `public/images/agents/phoenix/` 派生媒体；`scripts/test-phoenix-agent.mjs`、`scripts/prepare-phoenix-media.mjs`；本文件与本地证据／截图。

修改接入：`src/components/SeoArticlePage.jsx`、`src/components/CrosshairToolsPage.jsx`、`src/seo/articles.js`、`metadata.js`、`resourceLabels.js`、`routes.js`；`scripts/generate-localized-routes.mjs`、`scripts/validate-localization.mjs`。本地媒体重建脚本只读原素材，把中间帧放入 `data_processed/phoenix-media/`。

未修改：原任务工作树的所有既有修改；遐思和贤者组件／文案／主题文件；GitHub、Netlify、Cloudflare、GSC 和 GA4 后台。本地 `node_modules` 复用现成依赖，不属于应提交文件。

## 用户反馈修订（2026-10-19）

- 图集三张全部换为官方《决斗》35s 转身挥拳、49s 举枪瞄准、77s 面部特写。只截取实际动画区域，去掉播放器 UI 和原片黑边；三图派生为 1280×528 WebP，保留容器铺满、点击放大与五语实际画面描述。来源、时码、截图范围记录在 `data_raw/phoenix-2026-10-19/duelists-gallery-provenance.json`；旧设定图原始文件保留，不在图集中使用。
- 准星改为 Phoenix Spark：无中心点，内线长5、粗1、间距1；外线长2、粗1、间距9。贤者继续为带中心点的宽线环状造型，遐思继续为无外线的紧凑十字。本次不修改其他英雄。
- 五语准星说明均去掉 AimCodes 原创字样，只描述颜色、分段外线和留空中心；元描述同步去除多余原创表述。
- 更新 `scripts/prepare-phoenix-media.mjs`，媒体重建从保留的动画帧生成新图集；新增断言明确约束不死鸟无中心点且使用独立外线，防止再退回环状造型。

本轮修订最终验证：正式构建中的三张动画截图在桌面与390px手机均加载且铺满容器，无横向溢出；灯箱打开正常。新准星复制成功，进入编辑器后的代码逐字相同。`pnpm check:auto` 调度的完整25项检查通过，英雄专项2项测试通过。截图与记录为 `output/phoenix-preview/revision-gallery-desktop.png`、`revision-gallery-mobile.png`、`revision-verification.json`。未推送或发布。

## 已授权发布阶段

用户已批准当前页面上线，并要求沉淀为 Skill。发布基线为 `origin/main` 的 `62c7342`，实际平台为 Cloudflare Workers Builds。英文页面开启 index,follow、进入主 Sitemap；另外四语维持 noindex,follow 并排除 hreflang／Sitemap。canonical 始终为正式域名同语种路径。首页新增与页面一致的橙金入口，未改变其他英雄样式。

新增 Skill 仓库真源 `automation/skills/aimcodes-agent-page/`，包含接入地图、媒体与形状准则、正式构建／发布验收，以及只读机械检查脚本。通过 Skill 结构校验，并对不死鸟、贤者两个实际页面运行数据／构建检查。Skill 安装副本在本机 Codex skills，同源内容保持一致；不把当前上线许可延伸到未来页面。

实际 PR、合并提交与正式站验收结果在本次 GitHub PR 的交付记录中追加，避免把已授权提前写成已发布。回滚边界为本次 PR 的代码和静态素材；无需更改 DNS、支付、广告、分析后台或平台配置。
