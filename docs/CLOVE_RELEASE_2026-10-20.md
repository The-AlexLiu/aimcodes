# 暮蝶技能与主题准星页面

2026-10-20，基线7ee749e，独立分支codex/clove-agent-page。用户明确授权本页面完成后直接发布。原工作树codex/ga4-instrumentation-audit的全部既有修改跳过。

## 意图、内容与索引

核心意图：看懂暮蝶技能，预览、复制并调整主题准星。

| 查询候选 | 意图 | 模块 |
| --- | --- | --- |
| clove abilities / 暮蝶技能 / クローヴ アビリティ | 理解作用和按键 | 四技能图标、说明、官方视频 |
| clove smoke after death / 暮蝶倒地封烟 | 使用范围及限制 | 霞染卡片、角色资料 |
| clove crosshair / 暮蝶准星 | 获取可用配置 | 地图、1×/5×、复制、生成器 |

Title：无畏契约 暮蝶技能与主题准星代码 | AimCodes；H1：暮蝶。Description：看暮蝶虹吸、整蛊、霞染与化蝶的官方演示，了解倒地封烟和复活条件，预览、复制并调整粉紫双翼主题准星代码。英文Title：VALORANT Clove Abilities & Themed Crosshair Code | AimCodes。

最接近已有承接页是其他英雄页和地图战术板，无法替代暮蝶技能媒体及配置。复用最新海神正式页的AgentAbilityPage/AgentCrosshair全部交互，功能无删减。角色内容单独核实；准星采用无竖线的宽双翼与1px中心点，区别于盖可细横线和黑梦上下闭合扁环。独立教程候选为逐地图霞染烟位，需实测，本轮不扩页、不加无证据FAQ。

五语路径：/en/valorant-clove/、/ja/valorant-clove/、/es/valorant-clove/、/pt-br/valorant-clove/、/zh-cn/valorant-clove/。五语均noindex,follow、自canonical、无hreflang、不入三份Sitemap；只发布产品页面，不扩中文索引白名单。28天后可依据真实访问、复制及编辑器使用再评估索引；本次不创建自动监控。

## 证据和素材

GA4属性548356819，America/Los_Angeles，2026-09-22—10-19共28完整日，pagePath匹配clove或agent，screenPageViews/activeUsers均返回0行、无抽样；未过滤hostName，因此仅用于相关路径线索，不代表站外需求。GSC实时数据未取得，不编造量。2026-10-20搜索观察见官方英雄页、角色开发介绍及补丁说明，不把结果条数当需求。

国际官方：https://playvalorant.com/en-us/agents/clove/ ，对应ja-jp/es-es/pt-br页面的__NEXT_DATA__核对本地化名称及技能媒体。国服：https://api.val.qq.com/go/agame/graphql/graphiQL ，先查agents，再读取agent(id:24)的skill/name/keypad/desc/icon，确认C虹吸、Q整蛊、E霞染、X化蝶。官方页面顺序Q/E/C/X，接入按C/Q/E/X重排，图标和视频同步对应。

10.04：https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-10-04/ ，整蛊改为落地短暂延迟后爆炸。12.05：https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-12-05/ ，死亡后烟持续时间缩短及整蛊范围缩小。说明采用当前机制，不拿旧视频HUD当当前数值。

动画：VALORANT官方《2 WORLDS》https://www.youtube.com/watch?v=QL0LUaxWUOI ，下载HTTP403后停止重试，Ego正常官方观看页核对频道、标题并截图。首图77秒；图集60秒灵体近景、91秒回到队友身边。原1920×810视频在1440×608观看区域播放；派生裁切x0/y90/w1360/h475，排除页面与播放器UI，再输出16:9图片。逐张视觉查看后采用；没有使用模型转台、概念图或第三方副本。图集按实际画面写alt。

原始资料/截图保存在data_raw/clove-2026-10-20，不提交。scripts/prepare-clove-media.mjs可重现派生WebP/JPG、四段960宽MP4、海报和合辑；公开来源清单随public/images/agents/clove/sources.json提交。

中文内容按产品操作说明体裁执行dbs-ai-check的22项检查：没有需要单独报告的AI表达；术语以官方为准，保留具体按键和限制，没有泛化承诺或提问收尾。

## 验收与发布

待记录正式构建、浏览器、PR/预览和生产版本。回滚使用只恢复本次文件的PR或Cloudflare已知部署版本，不覆盖其他工作树。

本地：check:auto推荐并执行release，25/25通过。新增文档/聚焦测试后再次check:release，最终25/25通过（2026-10-20T06:24:14Z起，38.724秒）；中间一次进程收到SIGTERM退出143，未当成验证通过。已审阅verification.md和seo-scope.md。目录仍548源/540外观，主Sitemap1894、准星1585、图片1739，索引范围不变。test-clove-agent及Skill辅助检查通过，含五语静态H1/canonical/noindex/hreflang/Sitemap、完整代码往返和23英雄几何差异。

Ego正式构建：1440px和390px无横向溢出，H1分别64/40px；首图人物/文字可见。四技能readyState4，时长16.68/9.17/40.93/36.95秒，各播放推进约0.35秒；合辑103.73秒推进0.35秒。灯箱打开、Esc关闭、焦点返回通过。Haven地图、5×、原生剪贴板写入成功反馈通过，代码与实际生成器.tool-preview-panel code逐字一致。未在游戏客户端导入，不声称游戏内导入验证。

实际hushAgent.css临时追加至文档末尾后，标题rgb(230,161,245)、正文rgb(237,247,255)、悬停背景rgb(243,206,255)、键盘焦点粉紫实线保持正确；临时样式未写入产品。逐个访问24英雄页面，采集实际Canvas的1×/5×，叠在同一Ascent背景并排查看：暮蝶左右宽竖块+中心点明显区别于盖可细横线、黑梦闭合扁环及其余英雄。截图存本地output/clove-2026-10-20，不提交账号资料或原始画面。
