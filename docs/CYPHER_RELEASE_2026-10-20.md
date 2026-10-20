# 零技能与主题准星页

2026-10-20；基线98ffa5f；独立分支codex/cypher-agent-page。用户明确授权完成后直接发布。原混合工作树的埋点/文档/数据及其他英雄工作树全部跳过。本次只新增零页、公开派生素材、准星与必要接入；不改追踪、支付、DNS或托管配置。

## 意图与索引决定

核心任务：了解零的布防侦察技能，预览、复制与调整主题准星。

| 查询候选 | 任务 | 模块 |
| --- | --- | --- |
| cypher abilities / 零技能 / サイファー アビリティ | 理解当前技能与操作 | C/Q/E/X、官方图标与视频 |
| cypher trapwire / 零绊线 | 理解触发与回收、当前减速揭露机制 | 震慑绊线卡片 |
| cypher crosshair / 零准星 | 查看与复制可调配置 | 地图、1×/5×、复制反馈、生成器 |

Title：无畏契约 零技能与主题准星代码 | AimCodes；H1：零；Description：看零震慑绊线、赛博囚笼、战术监控与神经取析的官方演示，了解布防与侦察操作，预览、复制并调整冰蓝色主题准星。

站内最近承接为其他英雄页及地图战术板，均无零的技能/主题成品。独立教程候选为地图绊线与摄像头点位，需实测后另审，本次不建页、不加重复FAQ。按最新已发布迷核页复用共享AgentAbilityPage、AgentCrosshair；功能相同，角色素材/五语文案/冰蓝主题与准星几何独立制作。准星为中心细小实心十字加外围四段粗短刻线，模拟镜头轮廓；不是官方或选手配置。

五语路径：/en/valorant-cypher/、/ja/valorant-cypher/、/es/valorant-cypher/、/pt-br/valorant-cypher/、/zh-cn/valorant-cypher/。全部自canonical、noindex,follow、无hreflang、排除三份Sitemap。保持首页真实入口；本次发布不扩大索引或中文白名单。

GA4属性548356819，America/Los_Angeles，2026-09-21—2026-10-18完整28天：按landingPagePlusQueryString包含cypher、hostName维度检索，返回0行、无抽样；无匹配落地记录不等于站外无需求。实时GSC未取得。2026-10-20公开搜索观察可见技能、绊线/摄像头点位与官方角色页，没有可量化搜索需求或搜索量估计；不据结果条数扩索引。未来索引需要另审完整28日账户查询/落地/复制表现。

## 来源与媒体

四语名称/官方图标/演示/首图取playvalorant.com/{en-us,ja-jp,es-es,pt-br}/agents/cypher/公开页面。原国际页Q/E/C/X映射到C/Q/E/X。国服公开GraphQL先查agents，再按agent(id:10)读取skill{name desc keypad icon video{vid}}，核对震慑绊线/赛博囚笼/战术监控/神经取析。技能机制依据官方0.50、11.08和13.00补丁：囚笼不减速，绊线减速并延迟揭露，不再拉回或震荡；文案不固定时间数值，避免国服描述0.9秒落后于13.00的0.7秒。

国际官网绊线介绍/演示较旧，本页采用国服官方p1281w45qyv演示，不宣称视频HUD/计时就是当前客户端。其余演示为官方页对应素材。原文件保留data_raw/cypher-2026-10-20（不提交），处理帧data_processed/cypher-media（不提交）；public/images/agents/cypher为派生图片/MP4，sources.json记录URL与裁切。可复现脚本scripts/prepare-cypher-media.mjs仅读原文件、重建派生文件。

图集与角色视频来源：VALORANT已认证频道CHECKMATE // Cypher’s Revenge Game Mode Trailer，https://www.youtube.com/watch?v=9N_iC-Yc0FA ，官方2023年愚人节特别短片，五语明确说明夸张玩法不代表正常游戏，不宣传该模式可玩。Ego正常观看页确认频道、播放与人物；采集6秒手势半身及10秒面部近景，视觉逐图筛选。截图纯画面范围x16/y115/822x369，再居中裁16:9输出960x540，无界面/字幕/黑边。首图为官方插画独立裁切，原图5120x1772，区域x2270/y0/1600x1772，顶部裁成1920x1080，OG1200x630。图片与视频©Riot Games。

中文文案按产品技能说明体裁完成dbs-ai-check：操作和使用限制均具体，没有需要单列修改的泛化承诺、虚构体验或互动结尾；不把检查等同于检测器保证。

## 验收与发布记录

待完成：正式构建桌面/手机、四视频与合辑播放、灯箱焦点、地图与缩放、真实复制与生成器逐字一致、跨英雄主题和共享CSS末尾加载；check:auto、完整check:release与辅助检查；PR/预览/Cloudflare正式提交验证。

回滚边界：只恢复本任务文件的PR或平台已知旧部署，不覆盖其他工作树。代码解析和浏览器往返一致不等于游戏客户端导入实测；发布与可访问不等于搜索收录或增长。

本地验收完成：check:auto自动选择release并25/25通过（06:45:15Z起，75.064秒）；整合暮蝶主线fbe5da1后显式check:release再次25/25通过（06:48:31Z起，47.542秒）。已审阅verification.md与seo-scope.md：索引1894不变；五语各655路由，新增页面不入Sitemap。专用test-cypher-agent与Skill辅助检查通过，完整设置/复制代码可往返，与25个既有英雄几何不同。

Ego正式构建：1440桌面与390手机无横向溢出，首图人物/文字清晰，图集逐张查看且无黑边或界面；灯箱点击/Esc/关闭和焦点返回通过。四技能readyState4，分别约10.13/10.23/9.27/8.80秒，实际推进约0.45秒；合辑32.27秒推进约0.39秒。Haven地图与5×切换正常，包装原生clipboard.writeText且等待写入成功，页面反馈“已复制”，其代码与编辑器.tool-preview-panel code逐字相同。真实首页入口与英语切换通过。

共享hushAgent.css临时追加到文档末尾后，技能标题rgb(141,230,255)、正文rgb(237,247,255)、按钮悬停rgb(195,243,255)、键盘焦点冰蓝保持正确。零与25个既有英雄的真实Canvas在相同Ascent背景、1×和5×形成并排对照，已视觉审核；零为粗短镜头边线围绕细小十字，区别于霓虹的四枚方块、猎枭的长外十字、夜露的长横臂等。截图/对照仅存本地data_processed与output，不上传原始数据。

待远端CI、真实Cloudflare预览和正式域名验收；本地通过尚不代表发布。
