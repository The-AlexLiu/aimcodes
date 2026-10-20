# 禁灭技能与主题准星页面

2026-10-20。用户明确授权完成后直接发布本页。独立分支 `codex/veto-page-release`，基线 `9634439`。原 GA4 混合工作树全部跳过；名为 veto-agent-page 的既有工作树实际属于 miks 分支，也保留不动。

## 页面与索引决定

核心意图：看懂禁灭技能的作用和操作，试用、复制及调整主题准星。

| 查询候选 | 意图 | 模块 |
| --- | --- | --- |
| veto abilities / 禁灭技能 / ヴィトー アビリティ | 技能作用与操作 | 四技能卡、官方图标/演示 |
| veto interceptor / 禁灭噬源体 | 放置、激活与反制 | 二次激活、拦截条件、本体可摧毁 |
| veto crosshair / 禁灭准星 | 获取可用配置 | 地图、1×/5×、复制、编辑器 |

Title：无畏契约 禁灭技能与主题准星代码 | AimCodes；H1：禁灭。描述见 `src/seo/vetoContent.js`。独立教程候选是逐地图陷阱和传送点布置，需要游戏实测，本轮不扩展。最近已有页面是其他英雄与战术板，均不能替代禁灭专属演示和配置。

复用最新已发布维斯页的 AgentAbilityPage、AgentCrosshair，保留品牌导航、语言、面包屑、64/40px标题、技能合辑、角色预告、双图灯箱和资料。不添加调参面板或无证据FAQ。五语同步；`/en/valorant-veto/`、`/ja/valorant-veto/`、`/es/valorant-veto/`、`/pt-br/valorant-veto/`、`/zh-cn/valorant-veto/`均noindex,follow、自canonical、无hreflang、不入三份Sitemap。未获新增索引例外授权。28天后可按实际访问、复制与编辑器使用评估，不自动创建监控。

GA4 548356819，America/Los_Angeles，2026-09-21至10-18共28完整日，生产hostName=aimcodes.com、pagePath包含veto、screenPageViews返回0行、无抽样。不把不存在路径的0行当站外无需求。未取得实时GSC查询。2026-10-20搜索观察以官方英雄页核验角色/技能意图，不编造量，也不把搜索结果条数当需求。

## 官方资料与媒体

Riot `https://playvalorant.com/en-us/agents/veto/` 及ja-jp/es-es/pt-br公开__NEXT_DATA__提供角色、技能名称/说明、图标和MP4。国服官方GraphQL `https://api.val.qq.com/go/agame/graphql/graphiQL` 先agents确认id28，再agent.skill确认涡流折跃、裂变残片、噬源体、完全进化。国际官方实机视频HUD为C涡流折跃、Q裂变残片、E噬源体、X完全进化；国服API的图片文件名Q/E对应相反，文件名不作为按键证据。本页按官方实机HUD排列。视频是官方历史演示，不代表当前数值或游戏内导入验收。

核对官方11.10、12.00、12.05补丁相关修复；12.09公开正文未发现Veto，因此不采用第三方12.09数值变更说法。不写旧半径、冷却、价格或无敌承诺。完全进化获得减益免疫，不宣称防弹；噬源体说明限定拦截条件及敌人可射击破坏。

角色预告为VALORANT已验证频道 `GIVE THEM NOTHING // Veto Agent Trailer`，https://www.youtube.com/watch?v=2FLY-gn-hGQ ，Ego Lite正常观看页实际播放。132秒树下通话作为首图，82秒半脸异变与105秒完全异变持枪作为图集，均逐图视觉检查。原截图1200×648视频区域，去除浏览器/播放器UI；原视频1280×692。裁切、尺寸、来源及日期见 `public/images/agents/veto/sources.json`，复现脚本 `scripts/prepare-veto-media.mjs`。原始资料只在本地data_raw，派生文件进入public。

准星为青蓝色上下宽块、左右细长横线、中心留空、无中心点。完整设置生成Canvas、复制与编辑器共用代码，不替换旧英雄，不改变目录记录总数。没有游戏客户端导入证据。

中文按产品操作说明体裁进行dbs-ai-check检查，没有需要单列的AI表达问题，无虚构经历、数据或效果承诺。

## 验证与发布

待正式构建、check:auto、check:release、Skill辅助检查、桌面/手机、PR实际预览、CI及Cloudflare生产build-meta核验。回滚使用仅恢复本页的PR或发布前Cloudflare版本，不覆盖其他工作树。发布只覆盖本页，不修改托管、追踪、支付或索引策略。

本地验收：check:auto自动选择release 25/25通过，最终pnpm check:release 25/25通过；test-veto-agent与Skill check-agent --index-locales none通过，30种英雄几何均不相同。统一Ascent背景和青蓝颜色并排比较1×/5×，与奇乐的上下竖短线、钢锁的竖长线/横宽块不同；本页上下横宽块、左右细长横线。

Ego正式构建实测：1440/390宽无横向溢出，H1 64/40px；四视频及展开合辑readyState4且播放时间推进；图集打开/ESC关闭/焦点返回通过；地图Haven、5×、真实复制成功；编辑器生成代码逐字等于复制代码。共享hushAgent.css临时最后追加后，技能名仍rgb(105,217,255)，正文rgb(198,217,227)，实际hover背景rgb(185,239,255)、键盘焦点3px青蓝。通过首页实际链接依次进入维斯和禁灭，维斯仍紫色、禁灭青蓝；五语切换含日语官方名ヴィトー通过。角色预告按钮载入正确YouTube隐私嵌入，官方正常观看页已实播。
