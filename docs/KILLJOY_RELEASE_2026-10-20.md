# 奇乐技能与主题准星页面

2026-10-20，专用工作树killjoy-agent-page，分支codex/killjoy-agent-page。用户明确授权本页制作完成后直接发布。基线fbe5da1。原codex/ga4-instrumentation-audit混合工作树中的全部未提交修改跳过。

## 意图与边界

核心意图：看懂奇乐装置的使用操作，试用、复制并调整主题准星。

| 查询候选 | 意图 | 模块 |
| --- | --- | --- |
| killjoy abilities / 奇乐技能 / キルジョイ アビリティ | 技能作用与操作 | 四技能图标、视频和按键 |
| killjoy turret rotate / 奇乐炮台转向 | 放置与朝向 | 哨戒炮台卡片 |
| killjoy crosshair / 奇乐准星 | 试用与获取配置 | 地图、1×/5×、复制、编辑器 |

Title：无畏契约 奇乐技能与主题准星代码 | AimCodes；H1：奇乐。Description：看奇乐纳米蜂群、自动哨兵、哨戒炮台与全面封锁的官方演示，了解放置、召回和炮台转向操作，预览、复制并调整黄色主题准星。

最接近已有承接页为战术板和其他英雄页，不能替代奇乐技能演示与配置。独立教程候选是逐地图装置摆位，需实测，本轮不扩展。复用最新AgentAbilityPage/AgentCrosshair完整功能，与暮蝶正式构建桌面/手机对照，不改共享布局。没有无证据FAQ或上线解锁文案。

五语路径为/en/valorant-killjoy/、/ja/valorant-killjoy/、/es/valorant-killjoy/、/pt-br/valorant-killjoy/、/zh-cn/valorant-killjoy/。全部noindex,follow、自canonical、无hreflang、不入三份Sitemap。各语言查询以本地角色名+技能/准星为候选，无搜索量推断。界面公开与搜索索引分别决策，不扩中文白名单。28天后可按真实访问和复制/编辑器使用评估，不自动创建监控。

## 证据和素材

GA4属性548356819，America/Los_Angeles，2026-09-21—10-18共28完整日，hostName/pagePath维度、sessions指标，pagePath包含killjoy，返回0行、无抽样。不存在的落地页未有记录不代表站外需求。GSC实时查询未取得，不编造量。2026-10-20搜索观察见官方英雄页与准星查询承接页，不把条数当搜索量。

技能真源：https://playvalorant.com/en-us/agents/killjoy/ 及ja-jp/es-es/pt-br各官方页面__NEXT_DATA__。页面原顺序Q/E/C/X，接入按C/Q/E/X重排并保持图标/视频一一对应。中文通过https://api.val.qq.com/go/agame/graphql/graphiQL先查agents，再读取agent(id:12)确认纳米蜂群、自动哨兵、哨戒炮台、全面封锁。

官网描述含旧180度视野，国服接口也含旧右键翻转说明。本次不沿用其旧数值。按官方12.04补丁https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-12-04/核对，炮台按住右键旋转、再次激活翻转；放置后长按E召回。13.00 https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-13-00/涉及射速、蜂群时长、机器人速度，本次不把旧演示HUD当现行数值，不展示这些数值。

角色动画：VALORANT已认证官方频道《WARM UP》https://www.youtube.com/watch?v=OyLHi34Qzv4 。Ego正常观看页核对并播放，2048x858原视频、观看区域1200x503。采集日期2026-10-20。首图130秒奇乐近景，裁切x608/y56/w505/h420；图集130秒与雷兹观看训练场、50秒坐在机器人旁。全画面裁切x0/y56/w1200/h503，临时隐藏播放器控件后截图，排除页面、控件及黑边；随后生成16:9图集。每张先查看再采用。详情见public/images/agents/killjoy/sources.json，派生脚本scripts/prepare-killjoy-media.mjs；原图和原视频在本地data_raw，未提交。

准星为黄色细横轨加上下独立粗短线块，无中心点。内层仅横线、外层仅竖线，全部使用真实可序列化设置；不是官方或选手配置，不替换其他英雄。解析、完整编辑器设置与几何差异通过辅助脚本；游戏客户端导入未验证。

公开中文文案使用dbs-ai-check的22项按产品操作说明体裁检查：没有需报告的AI表达，保持实际按键与必要限制，无虚构经历、效果承诺或互动收尾。

## 验收与发布记录

发布前完成check:auto、check:release、聚焦检查、正式构建浏览器、PR预览和CI。正式域名build-meta与合并提交匹配并完成线上交互后才认定发布。回滚采用仅恢复本次文件的PR或Cloudflare已知部署版本，不覆盖其他工作树。

本地验收：check:auto自动执行release，25/25通过；最终显式check:release也25/25通过（报告见.aimcodes-reports/current/verification.md），聚焦test-killjoy-agent与Skill辅助检查通过。548源记录/540外观/396索引详情保持不变，主Sitemap1894、准星1585、图片1739；新增5个可访问路由，无索引扩展。

Ego正式构建：1440px和390px无横向溢出，H1为64/40px；五语手机文本均正常。首图最终手机焦点30%/10%，人物清晰。四技能视频readyState4，分别9.03/9.47/9.30/9.63秒，均实播推进约0.35秒；合辑37.43秒正常推进。已查看各技能5秒帧，分别为蜂群伤害、机器人触发、炮台开火、封锁装置。官方动画正常观看页可播放。灯箱放大、Esc关闭、焦点返回通过。Haven地图/5×/复制成功反馈通过，原生剪贴板与实际生成器.tool-preview-panel code逐字一致。

通过真实首页入口进入新页、中文切英文；再切换访问全部五语。把实际共享hushAgent.css临时追加至样式末尾，技能标题rgb(244,211,94)、正文rgb(237,247,255)、悬停rgb(255,237,158)、键盘焦点黄色3px实线正确。临时样式未写入产品。26英雄实际Canvas的1×/5×在同一Ascent图上对照，奇乐无中心点、细长横轨+分离上下方块，区别于钛狐中心点/横长臂和炼狱双层刻线。对照图和截图存本地output/killjoy-2026-10-20，不提交。未在游戏客户端导入，不声称实机导入通过。

发布整合：PR #121（https://github.com/The-AlexLiu/aimcodes/pull/121）。初次提交7bb3476后，零英雄页#120合入主线48783ef；本次合并并保留双方所有入口/路由/完整编辑器设置，没有修改零或其他英雄内容。重新运行完整release检查、奇乐和零聚焦/辅助检查，再等新CI/真实预览及正式版本核验。
