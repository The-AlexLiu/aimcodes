# 钢锁技能与主题准星页面

2026-10-20，独立分支 `codex/deadlock-agent-page`，基线 `e7003b7`。用户明确要求制作完成后直接发布当前钢锁页面；此授权不扩展到其他英雄或索引策略。原混合GA4工作树全部跳过。

## 页面意图与索引

核心意图：看懂钢锁技能的用途、操作和限制，预览、复制并调整主题准星。

| 查询候选 | 用户意图 | 模块 |
| --- | --- | --- |
| valorant deadlock abilities / 钢锁技能 / デッドロック アビリティ | 看作用和操作 | 四技能图标与可播放演示 |
| deadlock sensor / 钢锁声感陷阱 | 理解声音触发限制 | Q技能卡 |
| valorant deadlock crosshair / 钢锁准星 | 获取并试用主题配置 | 地图、1×/5×、复制、编辑器 |

Title：无畏契约 钢锁技能与主题准星代码 | AimCodes；H1：钢锁。描述：看钢锁阻域屏障、声感陷阱、重力捕网与断魂索道的官方演示，了解放置、投掷和束缚操作，预览、复制并调整白色主题准星。

站内最近承接为战术板和其他英雄页，无法替代钢锁技能与独立准星。独立教程候选是逐地图装置摆位，需要实测，本轮不扩展。复用最新奇乐正式构建、AgentAbilityPage和AgentCrosshair全部交互；本页只增加钢锁主题和独立内容，不重写共享布局。

五语路径：/en/valorant-deadlock/、/ja/valorant-deadlock/、/es/valorant-deadlock/、/pt-br/valorant-deadlock/、/zh-cn/valorant-deadlock/。目标查询均以本地角色名+技能/准星为候选。全部noindex,follow、自canonical、无hreflang、排除三份Sitemap，不扩中文白名单。可访问不等于索引授权。28天可按真实落地访问、复制和编辑器使用复查，不自动创建监控。

GA4属性548356819、America/Los_Angeles，2026-09-21—10-18共28完整日，hostName/pagePath维度，screenPageViews/sessions指标，钢锁/Deadlock路径过滤返回0行，无抽样。不把不存在的页面无记录当站外无需求。GSC实时数据未取得，不编造搜索量。2026-10-20搜索观察有官方技能承接和Valve同名游戏混杂，故英文查询明确VALORANT；不以结果条数估量。

## 官方事实与媒体

国际技能真源：https://playvalorant.com/en-us/agents/deadlock/ 以及ja-jp/es-es/pt-br官方页__NEXT_DATA__。官网顺序为声感/屏障/重力/终极，本站按当前C/Q/E/X重排为屏障/声感/重力/终极。中文从国服公开GraphQL先查agents，再查询agent(id:22){name skill{name keypad desc icon}}，确认阻域屏障、声感陷阱、重力捕网、断魂索道及按键。

官方10.04补丁：https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-10-04/ 已将重力捕网改为招牌技能、屏障改为非招牌技能。文案采用当前按键和可充能特性，不引用旧HUD的价格、范围或冷却数值。技能演示为官网旧示意素材，不声称为当前客户端录制。

角色动画：官方VALORANT认证频道《UNMADE // Episode 7 Cinematic》https://www.youtube.com/watch?v=sUoSPryMZr0 ，由Riot官网动画入口跳转核实。Ego正常观看页确认标题/频道并播放。采集110秒走廊近景与230秒持枪；先看候选联系表再逐张看原图。实际画面范围x136/y140/w1228/h523，不含黑边和播放器控件；首图从110秒x610/y140/w720/h523裁切。派生规格与来源写入public/images/agents/deadlock/sources.json，处理脚本scripts/prepare-deadlock-media.mjs。原图/原视频留在本地data_raw，不提交。

主题准星：无中心点，白色细长竖线配左右短宽线块，内层仅竖线、外层仅横线。全部由完整设置生成真实代码；不替换已有英雄，不宣称官方/选手配置，也不声称已在游戏客户端导入。须在相同地图1×/5×与旧英雄视觉对照。

公开中文按产品操作说明体裁使用dbs-ai-check的22项检查；无需报告的AI表达，不加入虚构经历、承诺或互动结尾。

## 验收和发布

发布门：check:auto报告、完整check:release、聚焦/Skill校验、正式构建桌面/手机、PR预览和CI、Cloudflare生产build-meta匹配及正式交互。回滚使用仅恢复本任务的PR或平台已知版本，保护所有其他工作树。正式链接和实际结果在下方追加。

本地check:auto自动选择release：25/25通过；聚焦脚本和Skill辅助检查通过。548源记录/540外观/396索引详情不变；生成3285路由，主Sitemap1894、准星1585、图片1739，新增5个可访问而不索引的路由。

Ego正式构建：1440px/390px无溢出，H1为64px/40px；五语手机均正确。四技能视频readyState4，时长分别28.93/13.23/19.17/14.07秒，合辑75.40秒，全部实际播放时间推进。每个视频5秒帧已视觉核对技能。灯箱点击/Esc/焦点返回通过；Haven地图、5×、复制成功反馈正常，原生剪贴板与实际生成器代码逐字一致。首页实际入口及中英语言切换通过。共享hushAgent.css临时最后追加后，技能标题rgb(231,243,232)、正文rgb(237,247,255)、悬停白色、键盘焦点3px正确；临时验收样式未写入产品。

28英雄实际Canvas已在同一Ascent背景、1×/5×并排视觉对照（截图存本地output/deadlock-2026-10-20/shapes.png）。钢锁无中心点、细长上下轨配短宽左右块，与奇乐的横轨/上下方块、K/O的中心点/细竖轨、斯凯的双层细线均可区分；未改任何已有配置。显式check:release最终25/25通过，报告已审核。
