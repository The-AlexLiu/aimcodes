# 盖可技能与主题准星页面

2026-10-20；独立分支 `codex/gekko-agent-page`，基线 `eda3dc9`。用户明确授权制作当前页后直接发布。原混合工作树的全部未提交修改跳过；复用已有锁定依赖，不安装或升级。发布只涉及当前页面及必要接入，不调整托管、追踪、支付或其他英雄配置。

## 页面与意图

核心任务：看懂盖可伙伴的操作与回收，再预览、复制、调整青柠色双横线准星。

| 查询候选 | 用户任务 | 模块 |
| --- | --- | --- |
| gekko abilities / 盖可技能 / ゲッコー アビリティ | 理解作用与操作 | 四技能官方图标、实机视频 |
| wingman plant defuse / 皮蛋下包 | 携包条件、右键目标与掩护 | 顽皮搭档操作与角色资料 |
| gekko reclaim / 盖可回收 | 回收后复用、鲨鲨次数限制 | 技能卡与角色资料 |
| gekko crosshair / 盖可准星 | 看形状并复制调整 | 地图、1×/5×、复制和编辑器 |

中文 Title“无畏契约盖可技能与主题准星代码 | AimCodes”，H1“盖可”；描述“看盖可四个技能的官方演示，了解皮蛋下包与拆包、伙伴回收和鲨鲨操作，预览、复制并调整青柠色双横线主题准星。”英文 Title“VALORANT Gekko Abilities & Themed Crosshair Code | AimCodes”。独立教程候选是具体地图的皮蛋路线与嗨宝点位，本次无实测素材，不扩页、不加无依据FAQ。

最近的现有页面是战术板与其他英雄页，不能提供盖可完整操作与成品准星。沿用最新主线K/O的 AgentAbilityPage / AgentCrosshair：品牌导航、语言、面包屑、首图、四技能、合辑、角色动画、图集灯箱、资料、复制/调整和同语种内链。新增局部青柠主题。准星为左右两条横线，中间留空，无竖线/中心点/外线。修复Canvas把长度0画成1像素的问题，使预览、代码和编辑器与真实参数一致；既有正长度线条不变。

## 数据与索引

GA4属性548356819、America/Los_Angeles，2026-09-21—2026-10-18，28个完整日；pagePath包含gekko、sessions返回0行，无抽样。这不是搜索量证据。GSC本地历史导出 `data_raw/traffic-audit-2026-10-15/gsc.zip`（原工作树），2026-09-29—2026-10-12，查询1000行、网页665行，无gekko/盖可/ゲッコー命中；存在截断与时效边界，没有实时GSC查询。2026-10-20搜索观察到官方英雄页、预告和技能指南；不把结果数量换成需求。

| 语言 | 路径 | 查询候选 |
| --- | --- | --- |
| zh-CN | /zh-cn/valorant-gekko/ | 盖可技能 / 准星 |
| en | /en/valorant-gekko/ | gekko abilities / crosshair |
| ja | /ja/valorant-gekko/ | ゲッコー アビリティ / クロスヘア |
| es | /es/valorant-gekko/ | habilidades de Gekko |
| pt-BR | /pt-br/valorant-gekko/ | habilidades do Gekko / mira |

五语均noindex,follow、自canonical、无hreflang/x-default、排除三份Sitemap；首页可发现。不扩大中文白名单。未来索引须有新证据与单独决定；28完整日观察GSC查询/展示/点击与GA4自然落地/复制，样本不足延至56天；本次不自动创建监控。

## 来源、版本与媒体

- https://playvalorant.com/en-us/agents/gekko/ ：__NEXT_DATA__ iconTab的4段官方MP4及图标。ja-jp、es-es、pt-br对应官方页核对名称。
- https://api.val.qq.com/go/agame/graphql/graphiQL ：先查询agents确认ID21，再读agent(id:21)的skill{name desc icon keypad}，国服四技能名称与C/Q/E/X一一对应。国际站Q/E/C/X顺序转换为本站C/Q/E/X展示。
- https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-12-03/ ：2026-02-17确认Mosh可回收，不能沿用旧攻略中不可回收的描述。
- https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-13-00/ ：2026-06-23回收后冷却调整为15秒。页面只写冷却后再用，避免未必要数值；旧官方演示HUD不代表当前补丁录制。
- https://www.youtube.com/watch?v=iYFh_XAXSPk ：VALORANT已认证官方《GREATER THAN ONE // Gekko Agent Trailer》，2023-03-04，浏览器正常观看页确认频道与实际播放。90秒盖可托着丢丢作首图；120秒夕阳下盖可携伙伴、160秒盖可/丢丢与芮娜交谈作图集。浏览器视频区域x0/y56/1200×511；隐藏播放器控件后截图，裁切x25/y93/1090×454，派生16:9或OG比例；无重绘。20秒竖屏、60秒远景、145秒Logo等候选排除。

原始官方JSON、技能媒体和浏览器截图留在 `data_raw/gekko-2026-10-20/`；中间文件在 `data_processed/gekko-media/`，均不随PR上传。派生媒体在 `public/images/agents/gekko/`，可复现处理脚本 `scripts/prepare-gekko-media.mjs`。媒体URL清单见本节；逐张查看后采用。

中文按dbs-ai-check的22项检查，体裁为游戏技能操作说明。没有编造经历、情绪、效果提升或泛化结尾；官方名称保留，不声称通过AI检测器。

## 验证、发布与回滚

完整验证与浏览器结果在本记录追加。需检查桌面1440/手机390、所有视频时间推进、合辑展开、图集灯箱Esc与焦点返回、地图/5×、真实复制反馈与编辑器代码逐字一致、所有英雄同地图1×/5×造型对照、共享样式末尾加载与跨页面导航。

实时正式站build-meta基线eda3dc90，平台为Cloudflare Workers Builds。通过专用PR、实际预览与CI后合并，正式域名commit匹配后才宣称发布。回滚使用仅恢复本PR的专用恢复PR；不覆盖其他任务。未在游戏客户端导入，不宣称客户端实测。

### 已完成的本地验收

check:auto调度完整release，25/25通过（76.029秒）；五语专项脚本通过，四技能映射、代码往返及与18位已有英雄的几何差异均通过。目录保持548源记录/540种样式/396条索引详情；主Sitemap1894、准星1585、图片1739页/3324图不变。Canvas实际绘图函数回归检查覆盖1×/5×：横线专用、竖线专用各只画两条，普通十字仍画四条。

正式构建桌面1440px，H1 64px，无横向溢出；四技能视频readyState4，时间分别推进1.15/1.15/0.41/0.43秒，合辑61.417秒且播放推进0.608秒。已视觉查看首图、图集原始候选及派生图片。浏览器任务23在后续验收前被用户接管，自动操作遵守硬停止；灯箱/剪贴板/编辑器/手机/同倍率并排对照/末尾样式及预览与正式发布验收尚未完成。等待用户交回浏览器控制，不把这份本地稿声称为已发布。
