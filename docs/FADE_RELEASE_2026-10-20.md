# 黑梦技能与主题准星页面

2026-10-20；独立分支`codex/fade-agent-page`，基线`eda3dc9`。用户明确授权制作后直接发布当前页面。原工作树所有既有修改跳过；复用锁定依赖，未安装升级。

## 意图与范围

核心任务：理解追踪、束缚与恐惧轨迹，再预览、复制、调整黑梦主题准星。

| 查询候选 | 意图 | 模块 |
| --- | --- | --- |
| fade abilities / 黑梦技能 / フェイド アビリティ | 理解操作与限制 | C/Q/E/X官方图标与实机演示 |
| fade haunt / fade prowler / 黑梦诡眼 | 提前下落、引导和轨迹追击 | 技能卡与角色资料 |
| fade crosshair / 黑梦准星 / フェイド クロスヘア | 试用与复制 | 三地图、1×/5×、完整编辑器 |

Title：无畏契约 黑梦技能与主题准星代码 | AimCodes；H1：黑梦；描述：看黑梦黯兽、幽爪、诡眼、夜临的官方演示，了解引导、提前下落与恐惧轨迹，预览、复制并调整冰蓝色主题准星代码。英文Title：VALORANT Fade Abilities & Themed Crosshair Code | AimCodes。

最近承接页为地图战术板及其他英雄页，不能替代黑梦的技能演示与独有准星。复用当前正式版K/O的AgentAbilityPage与AgentCrosshair完整功能，新增局部冰蓝主题和带中心点的横向扁环准星。独立地图诡眼点位教程需要实测素材，本次不扩页，不加无依据FAQ。不改旧英雄准星、目录、埋点或支付。

## 账户数据与索引

GA4属性548356819，America/Los_Angeles，2026-09-21—2026-10-18共28完整日，hostName=aimcodes.com，pagePath正则含fade或heimeng，screenPageViews返回0行、无抽样；不能据此判断站外需求。实时GSC未取得；已有GSC导出data_raw/traffic-audit-2026-10-15/gsc.zip为2026-09-29—2026-10-12，查询1000行、网页665行，未匹配fade/heimeng/黑梦/フェイド；存在查询截断与时效限制。2026-10-20搜索观察有官方英雄页、官方预告及技能指南，不把结果数当搜索量。

五语路径为/en/valorant-fade/、/ja/valorant-fade/、/es/valorant-fade/、/pt-br/valorant-fade/、/zh-cn/valorant-fade/。查询分别为Fade abilities/crosshair、フェイド アビリティ/クロスヘア、habilidades de Fade、habilidades da Fade/mira、黑梦技能/准星。五语均noindex,follow、自canonical、无hreflang/x-default、排除主/准星/图片Sitemap。首页同语种入口可访问。发布授权不扩索引；未来按新增证据单独决定。28完整日观察GSC点击展示查询和GA4自然落地/复制，样本不足延至56天，不自动创建监控。

## 官方来源与媒体

- https://playvalorant.com/en-us/agents/fade/ ：公开__NEXT_DATA__四个主动技能和新增Terror Trails说明；ja-jp、es-es、pt-br官方页面核对本地化名称。演示可能保留旧HUD，不声称当前补丁录制。
- https://api.val.qq.com/go/agame/graphql/graphiQL ：先查agents确认Fade id19，再查agent的name/desc/skill{name desc icon keypad}，核对黯兽/幽爪/诡眼/夜临及C/Q/E/X。
- https://playvalorant.com/en-us/news/tags/fade/ 指向VALORANT官方 https://www.youtube.com/watch?v=e7VOQ1l20eo 《İYİ GECELER - Fade Agent Trailer》，2022-04-24；正常观看页核实官方已验证频道。首图为官方CMS 1920×1080预告宣传图：https://cmsassets.rgpub.io/sanity/images/dsfx7636/news_live/87197cdb8f62135b5f541920bb7fbcc79cf8ffcc-1920x1080.jpg 。逐帧图集筛选及裁切记录在下方补充。

原始JSON/图像/浏览器截图位于data_raw/fade-2026-10-20，中间文件data_processed/fade-media；派生媒体public/images/agents/fade，可复现脚本scripts/prepare-fade-media.mjs。原始资料和账号报表不提交。

中文按dbs-ai-check的22项结合技能操作说明体裁检查，保留国服术语和简短动作，不编造玩家经历/效果数据，不宣称通过AI检测器。

## 验证与发布

正式平台实时核对Cloudflare Workers Builds，生产build-meta基线eda3dc90fdd87fe4d5ea587ea74e3a197273d73d。发布走专用PR、真实部署预览与CI，合并后等正式域名commit一致再确认。未改DNS、托管配置、GA4/GSC后台或Netlify。回滚用仅恢复当前PR的恢复PR；不覆盖其他工作树。未在游戏客户端导入，不宣称游戏实测。

本地与线上结果随后补充。

图集逐张查看后采用约87秒人物施法近景和89秒黯兽成形镜头。浏览器剧院画面x0/y56/1200×510；portrait裁切x690/y166/430×360，nightmare裁切x300/y130/850×430，再生成960×540。排除85秒远景、90/92秒黑场、95秒运动模糊和101秒片尾宣传字卡。首图保留官方宣传画独立裁切，不用同一张图填图集。来源、采集日期及处理保存在本记录/脚本中；未重绘角色。

### 当前本地验证

check:auto调度完整release 25/25通过（39.957秒），随后独立check:release 25/25通过（36.980秒）；文案最后修正后再执行最终release。专项验证与Skill辅助脚本通过：五语四主动技能/双图、完整代码往返、与现有18个英雄几何不同、五语noindex及Sitemap排除。目录仍548条/540样式/396可索引详情，主Sitemap1894、准星1585、图片1739。

同地图1×与5×比较图已逐项查看，黑梦为横向扁环与中心点，区别于芮娜方环、贤者方环点和铁臂横臂十字，不改旧配置。正式构建中文桌面首图/技能与完整模块已查看。截图留在本地output/fade-qa。

浏览器验收中用户接管Ego Lite TaskSpace22，工具明确暂停后续控制。当前尚未完成手机、播放推进、灯箱/复制/编辑器往返、共享样式末尾加载及跨页交互检查，因此尚未创建PR或发布；等待用户明确“继续”后恢复同一空间。此为浏览器控制边界，不是撤销已授权发布。

最终文案版本check:release 25/25通过（42.997秒），已审核verification与seo-scope：3240生成路由、1894索引URL，五语黑梦页均不参与索引。仍以浏览器控制暂停处列出的交互检查为待办；未推送、创建PR或影响生产。
