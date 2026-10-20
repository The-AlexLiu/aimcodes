# K/O 技能与主题准星页面

2026-10-20；独立分支 `codex/kayo-agent-page`，基线 `6f9c3aa`。用户明确授权制作后直接发布当前页面。原始混合工作树的全部未提交修改跳过；复用现有锁定依赖，没有安装或升级。

## 页面与搜索意图

核心意图：看懂压制、闪光投掷和倒地重启，再预览、复制、调整 K/O 的淡紫色机械瞄具准星。

| 查询候选 | 用户任务 | 承接模块 |
| --- | --- | --- |
| kayo abilities / K/O 技能 / KAY/O アビリティ | 理解作用、操作和限制 | C/Q/E/X 官方图标与四段实机演示 |
| kayo knife / kayo flash / K/O 大招 | 匕首可摧毁、闪光投掷、倒地重启 | E/Q/X 技能卡与角色资料 |
| kayo crosshair / K/O 准星 | 预览造型并复制调整 | 三地图、1×/5×、完整编辑器 |

中文 Title“无畏契约 K/O 技能与主题准星代码 | AimCodes”，H1“K/O”，描述“看 K/O 四个技能的实机演示，了解碎片溢出、闪存过载、零点嗅探与无效命令，预览、复制并调整淡紫色主题准星代码。”英文 Title“VALORANT KAY/O Abilities & Themed Crosshair Code | AimCodes”。独立教程候选为具体地图闪光/压制匕首点位，本次没有实测素材，不扩页、不补无依据 FAQ。

最接近的现有页面为地图战术板和其他英雄页，不能替代 K/O 的官方演示及独有成品。复用正式站最新铁臂的 AgentAbilityPage/AgentCrosshair：导航、语言、面包屑、首图、四技能、合辑、官方动画、图集灯箱、角色资料、地图/缩放/复制/完整编辑器与同语种内链。新增局部紫色主题。准星为上下细长竖轨、左右短线和中心小点，使用已有独立竖线长度参数，不改旧英雄或解析器。

## 数据与索引

GA4 属性548356819、America/Los_Angeles，2026-09-21—2026-10-18共28完整日，hostName精确aimcodes.com、pagePath正则kayo|kay-o|KAY，screenPageViews返回0行、无抽样。历史GSC导出 `data_raw/traffic-audit-2026-10-15/gsc.zip`（原工作树），2026-09-29—2026-10-12，查询1000行/网页665行，未匹配kayo/kay-o/kay/o/k/o；有截断与时效边界，无实时GSC查询。2026-10-20搜索可观察到官方英雄页、官方揭晓预告片和技能指南承接，不用结果数量估需求，不编造搜索量。

| 语言 | 路径 | 查询候选 |
| --- | --- | --- |
| zh-CN | /zh-cn/valorant-kayo/ | K/O 技能 / K/O 准星 |
| en | /en/valorant-kayo/ | kayo abilities / crosshair |
| ja | /ja/valorant-kayo/ | KAY/O アビリティ / クロスヘア |
| es | /es/valorant-kayo/ | habilidades de KAY/O |
| pt-BR | /pt-br/valorant-kayo/ | habilidades do KAY/O / mira |

五语均noindex,follow、自canonical、无hreflang/x-default，排除三份Sitemap。保留首页同语种入口；发布授权不扩大索引范围。未来索引需新证据和单独决定；28完整日观察GSC点击/展示/查询及GA4自然落地/复制，样本不足延至56天。本次不自动创建监控。

## 来源与媒体

- https://playvalorant.com/en-us/agents/kay-o/ ：公开 __NEXT_DATA__ iconTab 四技能官方图标/MP4；ja-jp、es-es、pt-br 对应官网逐一核对技能名称。当前官网可能复用旧HUD演示，不声称为当前补丁录制。
- https://api.val.qq.com/go/agame/graphql/graphiQL ：先查agents，再查agent(id:16)的skill{name desc icon keypad}。国服名 K/O，C碎片溢出/Q闪存过载/E零点嗅探/X无效命令。
- https://www.youtube.com/watch?v=eU1l7eBy2_Y ：VALORANT 官方《KAY/O Agent Reveal Trailer》，2021-06-17。正常观看页确认官方频道并实播。首图116秒面罩近景；图集112秒废墟中面对敌人的战斗镜头。原始播放器画面x16/y68/1040×585；图集裁切x396/y68/660×585。没有重绘角色。排除纯枪械手部、远处小人、文字转场、故障帧和模糊候选；保留一张合格战斗图，不用差镜头填数量。

原素材/官方JSON/浏览器截图保留data_raw/kayo-2026-10-20，中间文件data_processed/kayo-media；派生文件public/images/agents/kayo。可复现处理为scripts/prepare-kayo-media.mjs，保留原文件。公开来源清单随任务记录交付；账号数据、原视频和私密档案不提交。

中文按dbs-ai-check的22项检查，体裁为技能操作说明。无编造经历、量化效果、泛化钩子或升华；官方术语保留。不声称通过AI检测器。

## 验证与发布边界

本地/预览/正式验收记录逐步补充。运行check:auto、check:release、K/O专项和技能辅助校验；审核verification/seo-scope、548源记录/540样式/396索引详情及Sitemap数量。桌面1440/手机390检查画面、播放推进、灯箱Esc/焦点返回、地图/5×、剪贴板和编辑器逐字一致、跨英雄颜色及共享样式末尾加载。

生产平台实时核对Cloudflare Workers Builds；正式站build-meta基线6f9c3aa。通过专用PR、实际部署预览与CI后合并main，等待正式域名commit一致再宣称发布。只提交当前页面和必要接入；不改变DNS、支付、GA4/GSC后台、Netlify或其他英雄。回滚用仅恢复本PR的专用PR，不覆盖用户工作树。未执行游戏客户端实际导入，不宣称实机验证。
