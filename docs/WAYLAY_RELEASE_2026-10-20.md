# 幻棱技能与主题准星页面

2026-10-20；分支 `codex/waylay-agent-page`，基线 `df820d6`，独立工作目录 `/Users/alex/.codex/worktrees/vyse-agent-page/aimcodes-main`（目录名为早期研究标签，实际英雄已经按官方确认为 Waylay）。用户明确要求制作好后直接发布，只授权本页面。原混合工作树全部跳过。使用现有锁定依赖，不升级依赖；不修改 GA4/GSC、支付、DNS 或发布配置。

## 页面与索引

核心任务：查看幻棱四技能的作用、冲刺与回溯操作，并预览、复制、调整主题准星。

| 查询候选 | 用户任务 | 页面模块 |
| --- | --- | --- |
| waylay abilities / 幻棱技能 / ウェイレイ アビリティ | 看懂技能与操作 | C/Q/E/X 官方图标、说明、实机演示 |
| waylay dash / refract / 光速飞跃 / 溯流回光 | 分清冲刺与返回 | Q/E 卡、角色资料 |
| waylay crosshair / 幻棱准星 | 试用成品 | 三地图、1×/5×、复制、完整编辑器 |

中文 Title：无畏契约幻棱技能与主题准星代码 | AimCodes；H1：幻棱；描述：看幻棱四个技能的实机演示，了解冲刺、回溯与干扰效果，预览、复制并调整浅金色主题准星代码。

独立教程候选为地图突进与回溯路线。缺少实测地图素材，本次不新增教程和 FAQ。最相近现有页面是霓虹、捷风及夜露英雄页，但角色技能和准星造型独立。本次复用最新 `AgentAbilityPage`、`AgentCrosshair`，保留品牌导航、语言、面包屑、四技能、展开合辑、动画入口、图集灯箱、角色资料、地图/倍率/复制/编辑器和同语种内链。只增加幻棱局部主题，不改其他英雄组件或准星。

| 语言 | 路径 | 查询候选 |
| --- | --- | --- |
| zh-CN | /zh-cn/valorant-waylay/ | 幻棱技能 / 幻棱准星 |
| en | /en/valorant-waylay/ | waylay abilities / themed crosshair |
| ja | /ja/valorant-waylay/ | ウェイレイ アビリティ / クロスヘア |
| es | /es/valorant-waylay/ | habilidades de Waylay |
| pt-BR | /pt-br/valorant-waylay/ | habilidades da Waylay / mira |

五语均 `noindex,follow`、自 canonical、无 hreflang/x-default，不进入三份 Sitemap。首页同语种入口可访问；发布授权不扩大索引。未来索引需单独证据与决定，用28个完整日的GSC查询簇和GA4自然落地/复制评估；样本不足延至56天。不自动创建监控。

## 数据与事实边界

- 实时 GA4 属性548356819，America/Los_Angeles，2026-09-21—2026-10-18共28个完整日，hostName/pagePath、screenPageViews/activeUsers，路径包含waylay返回0行，无抽样。既无英雄页流量，也不能据此推断市场无需求。
- GSC历史账户导出 `gsc-compare.zip`：2026-09-27—2026-10-10，查询1254行，未命中waylay/幻棱/ウェイレイ。导出有行数边界，不代表所有长尾；未取得更新的完整GSC查询。
- 2026-10-20搜索观察确认官方英雄资料、预告和技能解释承接；未获取第三方搜索量或完整联想，不以结果数推算需求。
- 国际官方页面 `https://playvalorant.com/{en-us,ja-jp,es-es,pt-br}/agents/waylay/`，公开 `__NEXT_DATA__` 核对技能名、说明、图标和视频；原网页与JSON仅在本地data_raw。
- 国服官方 `https://api.val.qq.com/go/agame/graphql/graphiQL`：先查 `agents{id name e_name icon}`，确认Waylay/id27/幻棱，再查 `agent(id:27){id name e_name skill{name desc keypad icon}}`。C光棱闪爆、Q光速飞跃、E溯流回光、X时光修罗场。Vyse/id25为维斯，不属于本页面。
- 交叉核对官方补丁13.01、13.02、13.05，近期涉及位移和干扰缺陷修复。本页不写旧HUD价格/秒数，也不声称官方演示录于当前版本。官方13.05：https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-13-05/ 。

## 媒体与造型

官方VALORANT认证频道《DAWN BREAKS // Waylay Agent Trailer》：https://www.youtube.com/watch?v=OHzUoFKPUB0 ，官方英雄资料：https://playvalorant.com/en-us/agents/waylay/ 。正常观看页确认频道/标题、时间推进后暂停定位。候选联系表排除其他英雄、纯手枪、远景和纯光效。

首图86秒，幻棱面部、上身和施法手势；原截图观察视频区域x16/y68/822×462，实际动画有黑边，取x30/y130/780×310去除黑边与控件，再生成1920×1080 WebP、1200×630 OG。图集83秒持枪棱光、76秒突进动作、84秒眼部近景，均取同一区域后居中裁为960×755 WebP；三张逐一视觉检查。桌面和手机另验人物裁切。版权©Riot Games；未生成或伪造人物画面。

四技能源文件按C/Q/E/X从官方CMS下载，完整URL见 `docs/WAYLAY_MEDIA_SOURCES_2026-10-20.json`。派生为静音H.264 960×540、96px图标、poster，以及25.1秒合辑。脚本 `scripts/prepare-waylay-media.mjs`；原下载、候选帧与联系表只保留本地，不进入发布。

主题为浅金色粗短中心十字，四枚外围小点；内线3/粗4/间距0，外线1/粗1/间距8，无中心点开关，黑轮廓0.7。区别于霓虹细中心配粗外条、雷兹单层实心十字、夜露框与外线、贤者环及其他现有英雄。由同一份完整设置生成预览/复制/编辑器代码；不冒充官方或选手配置，未在游戏客户端导入。

## 本地验收与发布

正式构建预览使用4232端口（4231占用，未触碰）。内部页面带qa=1。截图及交互JSON在本地 `output/waylay-preview/`。首页真实入口进入幻棱，四视频readyState4且时间推进超过0.6秒，合辑可播放25.1秒；灯箱打开/Esc关闭/焦点返回，Haven切换，5×，真实剪贴板写入与已复制反馈已验证。编辑器完整代码逐字比较另记最终验收。

中文按dbs-ai-check的22条规则检查，体裁为玩家操作说明，无需单列的AI表达问题；不声称通过AI检测器。

修改10处路由/元数据/生成器/首页/静态HTML/样式/校验接入；新增WaylayAgentPage、waylayAgent.css、waylayContent、waylayCrosshair、18项派生媒体、媒体脚本、本任务文档及官方来源清单。CURRENT_STATE记录本次范围。未改目录数据、旧英雄配置、追踪、支付和托管配置。回滚为仅恢复本PR的专用PR。

发布前执行完整release、实际PR预览和CI；合并后核对生产build-meta提交、五语元数据、Sitemap、媒体、桌面手机及交互。发布授权不等于已发布，最终结果后续追加。

### 已通过的本地验证

`pnpm check:auto` 25/25（91.3秒）；`pnpm check:release` 25/25（40.8秒），已审核verification、seo-scope与语义差异。agent辅助脚本确认五语各4技能/3图集、代码往返与12个已有英雄不同。桌面1440px/手机390px，H1为64px/40px，无横向溢出；真实复制与编辑器代码逐字相同。追加实际共享hushAgent.css到样式末尾，技能标题rgb(255,233,160)、正文rgb(245,238,220)、真实hover rgb(255,244,210)、键盘focus-visible浅金3px，临时验收样式未保存到产品。构建主Sitemap1894、准星1585、图片1739页/3324引用；新页均排除。目录仍548源记录/540种造型/396索引详情。
