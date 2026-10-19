# 尚勃勒英雄页：样稿与发布记录

> 发布阶段：用户于2026-10-19明确要求继续至发布完成。五语继续保持noindex,follow，不扩搜索索引。以下样稿记录保留，实际PR、预览与正式核验将在文末追加。

日期：2026-10-19。分支 `codex/chamber-agent-preview`；基线 `4ff4e41`（不死鸟 PR #97 合并）。本次仅本地制作，未提交、推送、创建 PR 或部署。

## 页面与范围

核心意图：看懂尚勃勒技能并直接试用主题准星。复用已验收的不死鸟页面结构、64px/40px 首屏字号、980px 内容宽度、四技能卡、展开连播、角色动画、三图灯箱、角色资料及共享 AgentCrosshair 完整交互。使用局部深蓝与香槟金配色；共享样式晚加载也不能覆盖局部主题。没有新增 FAQ、技能价格、新英雄解锁或付费功能。

国服正式名称为“尚勃勒”，按腾讯官网核验使用；用户输入“尚博勒”对应同一 Chamber。本次未改已有遐思、贤者、不死鸟页面与其准星，不扩目录条目。原任务目录的埋点、文档、依赖与未跟踪文件全部保留。工作目录 `/Users/alex/.codex/worktrees/chamber-agent-preview/aimcodes-main`。

| 查询 | 用户任务 | 页面模块 |
| --- | --- | --- |
| valorant chamber abilities / 尚勃勒技能 | 了解四技能的用途和操作 | 标题、简介、四段官方实机视频 |
| chamber teleport / 尚勃勒传送 | 放置、范围内回传、拾回重放 | 闪转自如 |
| chamber headhunter / 尚勃勒金枪 | 掏枪与开镜 | 金牌猎头 |
| chamber trademark / 尚勃勒陷阱 | 视野侦测与减速 | 贵宾限行 |
| chamber ult / 尚勃勒大招 | 狙击枪及击败后减速 | 孤高火力 |
| chamber inspired crosshair / 尚勃勒主题准星 | 预览、复制、编辑 | 中心点与四枚分离方块 |

Title：无畏契约尚勃勒技能与主题准星代码 | AimCodes。H1：尚勃勒。
描述：观看尚勃勒四个技能的实机演示，了解陷阱、金枪、传送锚点和大招的操作，预览、复制或调整金色主题准星代码。
独立教程候选：逐地图锚点站位、开枪后回传时机。当前缺乏足够独立数据，不另建页。

## 需求证据及限制

- GA4 实时读取属性 `548356819`，America/Los_Angeles，2026-09-19 至 2026-10-18，限定 `hostName=aimcodes.com`、落地路径包含 chamber：0 行。说明没有该路径落地记录，不代表没有关键词需求。
- GSC 使用现有官方账户导出 `data_raw/traffic-audit-2026-10-15/gsc.zip`（原任务目录只读），Web，2026-09-29 至 2026-10-12。导出的查询和网页没有 chamber、尚勃勒、尚博勒、チェンバー 命中；该导出有时间与热门行范围限制，本次未获得更新的 GSC 查询。
- 2026-10-19 Google 联想：valorant chamber abilities 有 cost、name、skills、powers；角色词有 nerf、语音、配音及周边等。后者不全部由本页承接。原始响应保存在本地 `data_raw/chamber-2026-10-19/suggest-*.json`。没有使用第三方搜索量估算，没有把结果条数当需求。
- 搜索观察有官方 Chamber 英雄页、补丁、技能指南。站内最接近的是其他英雄页、准星库、生成器和战术板，未有 Chamber 技能与准星文章。

## 五语与索引

| 语言 | 路径 | 目标或用途 | 本地 robots / Sitemap |
| --- | --- | --- | --- |
| 中文 | `/zh-cn/valorant-chamber/` | 尚勃勒技能、主题准星 | noindex,follow / 排除 |
| 英文 | `/en/valorant-chamber/` | valorant chamber abilities、themed crosshair | noindex,follow / 排除 |
| 日文 | `/ja/valorant-chamber/` | チェンバー アビリティ、クロスヘア | noindex,follow / 排除 |
| 西文 | `/es/valorant-chamber/` | habilidades de Chamber | noindex,follow / 排除 |
| 巴葡 | `/pt-br/valorant-chamber/` | habilidades do Chamber、mira | noindex,follow / 排除 |

canonical 均指向正式域名同语种自身路径；五页不声明 hreflang / x-default，不进入主、准星、图片 Sitemap。五语界面可切换，并有首页资源入口。发布与索引分别待明确授权；英语可先评估索引，中文仍受 product-only 政策限制。

## 官方素材与制作记录

- [Riot Chamber 英雄页](https://playvalorant.com/en-us/agents/chamber/)：首图、四个图标及技能视频。原始页面的 `__NEXT_DATA__` 公开数据保存为本地 `official-en.json`；各原始图片/MP4 URL 记录在 `asset-sources.json`。
- [腾讯国服英雄资料](https://val.qq.com/game-data.html?pageType=1)：页面脚本 common.js 的公开只读 GraphQL，`agent(id:17)`。中文名、哨卫定位与 C/Q/E/X 技能名已读回：贵宾限行、金牌猎头、闪转自如、孤高火力。返回在本地 `official-cn.json`。URL heroId 参数未实际切换角色，不能单凭该 URL 声称页面选中了英雄。
- 英／日／西／巴葡名称和机制以各语种官方英雄页公开内容核验；原始 HTML/JSON 保存在 data_raw。文案只简述用途和操作，不复刻整段官方说明。
- [13.08 官方更新](https://playvalorant.com/es-mx/news/game-updates/valorant-patch-notes-13-08/)：检查到 Chamber 评分计算调整，没有用第三方强度排名或传闻覆盖官网技能机制。演示为官方现存视频，不声称是当前客户端录制；本次未在游戏内测试。
- [L’Accord 官方角色动画](https://www.youtube.com/watch?v=FUoqAn5T4h4)：已在 Ego Lite 确认 VALORANT 官方已验证频道、标题和1920×1080解码播放。yt-dlp 下载返回403，使用正常观看页暂停截取；没有使用非官方副本。35秒为眼镜面部近景，77秒为整理领带，59秒为举枪瞄准；淘汰纯手部、远景、其他角色和片尾。裁切移除播放器界面，未生成或伪造画面。
- 首图来自英雄官网横幅 `e0411bbb14b69f7ce3d18b56fcf33649fdcc6a4b-5120x1772.png`，裁切 x=850,y=0,w=2800,h=1575，输出1920×1080 WebP；OG为1200×630 JPG。手机另裁 x=2200,y=0,w=1470,h=1470，输出1080×1080 WebP；桌面与手机焦点单独检查。
- `scripts/prepare-chamber-media.mjs` 只重建派生素材。技能视频960px H.264、静音、faststart，3秒截海报，按 C/Q/E/X 合并连播。原视频保留在 data_raw；中间图在 data_processed，公开派生图和视频在 public/images/agents/chamber。
- 原始下载脚本属于外部来源资料，新增 ESLint 的 data_raw 排除项，避免把存档第三方脚本当项目源码检查；没有修改这些原始脚本。

## 准星与文案

香槟金中心点与四枚分离方块，内线关闭、外线2×2、间距6、中心点2、描边1、不透明度0.7；移动/射击误差关闭。与已有英雄在同一地图的1×/5×并排看，颜色不作为造型差异依据。完整配置、Canvas、复制和生成器共享 `src/data/chamberCrosshair.js`，不替换已有英雄配置。未声称为官方或职业配置，未声称已在游戏客户端导入。

中文已按 dbs-ai-check 的22项检查，体裁为产品操作说明；未发现需要修改的套路开场、虚构体验、金句收束、关键词堆叠或重复转折。保留必要键位及术语，不添加假口语或假犹豫，不承诺检测器结果。

## 验证与交接

正式构建预览：`http://127.0.0.1:4211/zh-cn/valorant-chamber/?qa=1`。截图及浏览器验收记录在本地 `output/chamber-preview/`。QA 参数隔离内部测试统计。

`pnpm check:auto` 自动选择 release 全套，25/25通过；最后一次 `pnpm check:release` 在最终源码与素材上25/25通过，耗时169.156秒。辅助 `check-agent.mjs --agent chamber --index-locales none` 通过五语、素材、配置往返、几何差异、canonical、noindex、无hreflang及三份Sitemap排除检查。`git diff --check` 通过。

正式构建生成3180个HTML路由（SEO scope按可生成产品路由计3165），主Sitemap仍1894条，准星Sitemap1585条，图片Sitemap1739页/3324引用；只增加5个noindex英雄路由，没有扩准星目录或既有英雄索引。

浏览器已检查1440px桌面、390px和320px手机无横向溢出，H1为64px/40px；专用手机首图与桌面裁切均视觉查看。四段技能视频和50.37秒连播实际播放时间推进。图集Esc关闭并焦点返回通过。准星1×/5×与遐思/贤者/不死鸟在同一Ascent地图并排查看；复制成功提示与编辑器实际生成代码逐字一致，地图切至Bind后实际图片改变。首页真实入口进入新页，五语切换和各语canonical/noindex/无hreflang已读回。把实际共享hushAgent.css临时追加至样式末尾后，7类关键元素颜色/边框/字号不变；实际hover背景为rgb(247,230,183)，Tab焦点为香槟金3px描边。临时验收样式已移除。未经当前页发布授权，后续开发者不得推送、建 PR 或部署；发布前核对实时平台与 main，再确认语言索引提案。GA4/GSC后台与生产配置均未修改。


## 文件清单

新增：

- `src/components/ChamberAgentPage.jsx`：复用验收模板的技能、连播、动画、图集灯箱、资料与准星页面。
- `src/components/chamberAgent.css`：局部深蓝/香槟金主题、桌面与手机首图位置、焦点样式。
- `src/seo/chamberContent.js`：五语内容及本地媒体映射。
- `src/data/chamberCrosshair.js`：完整编辑器配置与生成代码。
- `scripts/prepare-chamber-media.mjs`：从原素材生成公开派生图/视频。
- `public/images/agents/chamber/`：桌面/手机首图、OG、四图标、四技能视频及海报、连播、三张动画截图。
- 本文档。原始和中间资料在 `data_raw/chamber-2026-10-19/`、`data_processed/chamber-media/`；验收截图在 `output/chamber-preview/`，均为本地证据，不进入未来生产提交。

修改：`src/components/SeoArticlePage.jsx`、`HomeResourceDirectory.jsx`、`CrosshairToolsPage.jsx`（页面分派、首页入口、主题配置）；`src/seo/articles.js`、`resourceLabels.js`、`metadata.js`、`routes.js`（文章、标题、OG与noindex路由）；`src/styles.css`（首页入口颜色）；`scripts/generate-localized-routes.mjs`（静态内容）；`scripts/validate-localization.mjs`（英雄页不强制无依据FAQ或四款目录推荐）；`eslint.config.js`（原始资料不纳入源码检查）；`docs/CURRENT_STATE.md`（本地状态入口）。

## 浏览器限制

当前环境的 YouTube 隐私增强内嵌要求“登录，以便确认不是聊天机器人”，已停止相关授权操作，没有登录或绕过。站外官方正常观看页已真实播放并用于素材截图，页面保留外部观看链接；站内四段技能视频和连播不依赖 YouTube。内嵌能否在其他用户网络播放仍需其环境确认，不能宣称全环境播放通过。

最后提交仍为基线 `4ff4e41bc477d4732fde250745d9a2b43dfaa8d7`，本任务修改尚未提交。交接时只继续本分支；原工作树、其他预览工作树和其服务器未处理。没有改GitHub、Cloudflare、Netlify、GA4/GSC后台或正式站。

## 发布边界（2026-10-19）

发布前正式站与远端main均为 `eb82683e8b093d79fb4df4451a3cf6355e0909f0`（幽影 #98）。本次只发布尚勃勒五语页面、主题配置和媒体，不改变其他英雄配置、索引或后台设置。先合入最新main，再完整检查、Cloudflare部署预览、PR检查与合并；生产由main自动构建。回滚边界为合并前main提交，通过恢复PR撤回本页及入口，不重置其他任务工作树。

### 合并最新主分支后的发布检查

已将 `eb82683e` 合入本分支，合并提交 `c244f3d`。保留幽影的文章分派、首页入口、生成器配置、静态内容和元数据；完整25项release检查通过，幽影/不死鸟回归测试4/4通过，尚勃勒none索引辅助检查五语通过。发布提交只包含本页代码、公开派生媒体及必要记录，原始大视频、网页、账户分析数据、截图和中间文件留在本地。
