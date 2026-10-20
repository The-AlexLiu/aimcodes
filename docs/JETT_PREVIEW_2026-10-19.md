# 捷风英雄页面：本地样稿

2026-10-19；分支 `codex/jett-agent-preview`；基于 `origin/main` 的 `4ff4e41`（已合并不死鸟修订）。工作树 `/Users/alex/.codex/worktrees/jett-agent-preview/aimcodes-main`。未提交、推送、创建 PR 或部署。

## 意图与范围

核心任务：看懂捷风技能，预览、复制和继续调整主题准星。最接近的页面是 `/en/valorant-phoenix/`、`/en/valorant-sage/` 和准星生成器；战术板的捷风标记不承担技能视频与主题准星任务。本次不扩大准星目录，不改变其他英雄、支付、追踪或线上设置。

| 查询 | 意图 | 模块 |
| --- | --- | --- |
| valorant jett abilities / 无畏契约捷风技能 | 技能入门 | 首图、五个技能视频 |
| Jett cloudburst / 捷风烟怎么拐 | 弯烟与短暂掩护 | 瞬云 |
| Jett dash / 捷风逐风 | 先预备再突进、方向 | 逐风 |
| Jett knives / 捷风回刀 | 左右键与补充飞刀 | 飓刃 |
| Jett drift / 捷风飘移 | 空中滑翔 | 飘移 |
| Jett inspired crosshair / 捷风主题准星 | 可复制结果 | 准星地图、1×/5×、复制、编辑器 |

Title：无畏契约捷风技能与主题准星代码 | AimCodes。H1：捷风。
描述：看捷风瞬云、凌空、逐风、飓刃和飘移的实机演示，了解弯烟、突进与回刀操作，预览、复制或调整冰蓝色主题准星。
独立教程候选：各地图进点配合、高台落点、狙击后撤路线；需要当前地图实机素材，不把泛用技能页扩写成点位攻略。配音、年龄、壁纸不在本次范围。

## 数据证据

- GA4 属性 `548356819`；America/Los_Angeles；2026-09-20—2026-10-17，共28个完整日；限定 hostName=aimcodes.com、landingPagePlusQueryString 匹配 jett / 捷风 / ジェット：返回0行。它是落地行为数据，不能推导关键词没有需求。
- GSC 使用已授权本地导出 `data_raw/traffic-audit-2026-10-15/gsc.zip`，2026-09-29—2026-10-12，Web。查询与网页导出没有上述词匹配；导出有热门行范围限制，本轮未获得更新的完整账户查询。
- 2026-10-19 Google联想：valorant jett 包含 abilities、knife、voice actor、voice lines、wallpaper；abilities 包含 skills、powers、tips、ability icons。中文返回紧凑写法。原始响应在本地 `data_raw/jett-2026-10-19/suggest-*.json`。只作为意图线索，不提供搜索量估算。
- 当前搜索结果出现 Riot 官方英雄页及技能指南。未以结果条数衡量需求。

## 模板与语言索引

复用不死鸟页面组件结构及共享 AgentCrosshair，不死鸟/贤者/遐思文件保持不变。捷风增加有官方图标与视频的飘移被动，键位为 C/Q/E/X/Space；四个主动技能为两列，被动独占一行。保留品牌导航、语言切换、面包屑、展开连播、动画、图集灯箱、角色资料及准星交互。采用局部冰蓝主题，覆盖选择器高于共享 CSS，不依赖加载顺序。

| 语言 | 路径 | 目标查询或用途 | 当前索引 |
| --- | --- | --- | --- |
| en | /en/valorant-jett/ | valorant jett abilities / jett inspired crosshair | noindex,follow |
| zh-CN | /zh-cn/valorant-jett/ | 捷风技能、主题准星；产品访问 | noindex,follow |
| ja | /ja/valorant-jett/ | ジェット アビリティ / クロスヘア；界面访问 | noindex,follow |
| es | /es/valorant-jett/ | habilidades de Jett；维护语言访问 | noindex,follow |
| pt-BR | /pt-br/valorant-jett/ | habilidades da Jett；维护语言访问 | noindex,follow |

五语自身 canonical 指向正式域名同语种路径；无 hreflang/x-default；排除主 Sitemap、准星 Sitemap 和图片 Sitemap。首页提供同语种捷风入口。将来发布和索引需分别决定；中文受产品专用政策约束，需明确例外授权。英语可作后续索引候选；日语先补本地证据。索引后建议28天观察查询簇展示/点击、自然落地与复制/编辑器使用；样本不足延至56天，不自动安排任务。

## 事实、素材与准星

- 国际服官方页：https://playvalorant.com/en-us/agents/jett/ 。英、日、西、巴葡名称分别从对应官方页面 `iconTab` 数据核验；保存技能公开资料而非完整网页运行配置。原始下载在 `data_raw/jett-2026-10-19/`。
- 国服官方资料：https://val.qq.com/game-data.html?pageType=1&heroId=2 。官网 common.js 公布的只读 GraphQL 返回确认“瞬云、凌空、逐风、飓刃、飘移”及键位，保存 `official-cn.json`。不从第三方手游页面引用数值。
- 官方技能演示保留旧HUD；当前操作与技能限制来自当前官方说明。不声称视频代表当前版本每项数值；不写技能价格、精确秒数或大招点数。
- 官方动画 DUELISTS：https://www.youtube.com/watch?v=e_E9W2vsRbQ ，VALORANT认证频道。点击加载隐私增强嵌入并保留外链。图像从正常浏览器播放画面截取，去掉播放器UI、字幕与原片黑边。截图来源与具体裁切记在 `data_raw/jett-2026-10-19/media-provenance.json`。
- `scripts/prepare-jett-media.mjs` 只读原始媒体，派生H.264静音960px视频、WebP图标/海报/图集与OG。没有借用其他英雄画面。
- Jett Five：冰蓝色、中心点大小1、无内线、外线长1/粗1/间距6；中心点加四枚独立外围点，与遐思紧凑十字、贤者环状中心点、不死鸟分段长十字有结构差异。Canvas/复制/编辑器由同一份完整设置生成。仅验证网站内一致性，未在游戏客户端导入。

## 文案检查

用 `dbs-ai-check` 检查中文产品说明，体裁为简短操作文案。没有虚构体验、套话开场、过度升华或同义词堆叠；统一技能说明顺序服务操作需要，不为形式强行改写，不保证AI检测器结果。

## 验收与交接

结果将在最终验收后追加。原目录所有埋点、文档和未跟踪修改均保留；其他英雄源码及配置未修改。node_modules仅复用已安装依赖，不进入提交。所有预览使用qa=1；没有修改GitHub、Cloudflare、Netlify、GA4或GSC后台。

### 最终验收

- `pnpm check:auto` 实际调度完整 `check:release`，25项通过（46.072秒）；含 lint、构建、准星、Manifest、推荐、五语、SEO、路由、内链、图片、埋点与依赖检查。首轮曾因未完成的图集文件引用失败，已移除该候选并在最终套件通过。最终 alt 文字校正后重新构建及运行语言、SEO、路由检查，均通过。
- `node --test scripts/test-jett-agent.mjs` 2项通过；`check-agent.mjs --agent jett --index-locales none` 通过。代码往返及五语媒体/索引边界已检查。
- 正式构建实际查看1440px桌面、390px手机；H1为64px/40px，无横向溢出。首图、两张图集与灯箱可用；Esc关闭后焦点回到原按钮；首页站内入口能进入捷风页。
- 五语实际切换均保持捷风路径、页面语言与本地化标题。五语自身canonical、noindex,follow、无hreflang；三份Sitemap均无捷风路径。索引数量未增加。
- 共享 `hushAgent.css` 实际追加到样式末尾后，技能标题、按钮、正文、章节标题和边框保持冰蓝主题。按钮正常色rgb(163,233,245)、悬停rgb(208,247,255)；键盘focus-visible边框为rgb(163,233,245)。同一浏览器先后打开遐思、贤者、不死鸟与捷风，并在同一地图对比1×/5×，四者结构清楚不同；没有替换任何既有英雄准星。
- 最终Jett Five复制成功显示“已复制”；实际写入的代码与编辑器生成值、源数据逐字一致。地图切换与1×/5×均可用。未声称在游戏客户端导入。
- 五段站内技能视频实际播放、readyState=4且时间推进；连播也可播放。
- 外部官方动画正常观看页已播放并用于取帧。隐私增强iframe在本机返回YouTube“请登录，以便确认不是聊天机器人”；已停止该项操作，未绕过验证，保留外部观看入口。不能宣称本机嵌入动画实播通过。
- 截图与机器记录：本地 `output/jett-preview/desktop-zh.png`、`mobile-zh.png`、`gallery-mobile.png`、`shape-comparison.png`、`browser-verification.json`、`style-verification.json`、`editor-verification.json`、`index-verification.json`及`video-verification.json`。
- 本地预览：`http://127.0.0.1:4194/zh-cn/valorant-jett/?qa=1`；英语换为 `/en/valorant-jett/?qa=1`。预览服务器保留供审阅。当前页面未发布，无搜索增长或收录结论。

### 文件清单与边界

新增：`src/components/JettAgentPage.jsx`、`src/components/jettAgent.css`、`src/data/jettCrosshair.js`、`src/seo/jettContent.js`；`scripts/prepare-jett-media.mjs`、`scripts/test-jett-agent.mjs`；本记录；`public/images/agents/jett/`内五组图标/海报/MP4、连播、首图、OG与两张图集。

修改接入：`src/components/SeoArticlePage.jsx`、`CrosshairToolsPage.jsx`、`HomeResourceDirectory.jsx`；`src/seo/articles.js`、`metadata.js`、`resourceLabels.js`、`routes.js`；`scripts/generate-localized-routes.mjs`、`validate-localization.mjs`。

原始素材、账户数据摘要、中间帧和截图仅保存在本地，不作为产品发布文件；原始文件未覆盖。原任务目录的所有既有修改、其他英雄源码与配置都未修改。没有提交、推送、PR、部署、迁移平台或修改GA4/GSC后台。后续人工确认当前样稿视觉、是否发布、各语言索引范围，以及实际部署预览/正式站的动画嵌入行为；发布前需再次核对远端与平台状态。


## 已授权发布阶段（2026-10-19）

用户明确“可以发布”。授权范围为当前捷风页面及接入；保留五语全部 noindex，不扩大任何语言索引。当前远端main与正式域名build-meta均为4ff4e41，实际平台为Cloudflare Workers Builds。先通过PR CI与真实Cloudflare预览，再合并等待自动发布并验收正式站。仅提交本次源码、派生媒体、专项验证及必要官方来源清单；原始视频、截图、中间文件、账号报表、node_modules与dist留在本地。回滚为本次PR的恢复PR，不改DNS、支付或分析配置。实际预览/生产提交和核验结果追加在对应PR中。
