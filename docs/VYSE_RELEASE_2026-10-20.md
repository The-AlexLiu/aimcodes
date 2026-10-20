# 维斯技能与主题准星页面

2026-10-20。用户明确授权制作完成后直接发布本页。独立分支 `codex/vyse-page-release`，基线 `e7003b7`。原 GA4 混合工作树全部跳过；名为 vyse-agent-page 的既有工作树属于 waylay 分支，也保留不动。

## 页面与索引

核心意图：看懂维斯技能的作用与操作，试用、复制和调整主题准星。

| 查询候选 | 意图 | 模块 |
| --- | --- | --- |
| vyse abilities / 维斯技能 / ヴァイス アビリティ | 技能作用和按键 | 四张技能卡、官方图标/演示 |
| vyse shear trigger / 维斯裁断 | 触发与反制 | 裁断进入再离开机制、玫瑰启动可破坏 |
| vyse crosshair / 维斯准星 | 获取可用配置 | 地图、1×/5×、复制、编辑器 |

Title：无畏契约 维斯技能与主题准星代码 | AimCodes；H1：维斯。描述：看维斯剃刀藤蔓、裁断、弧光玫瑰与铁棘禁园的官方演示，了解放置、触发与闪光操作，预览、复制并调整紫色主题准星。

最接近现有页是战术板及其他英雄页，均不能替代维斯专属演示和配置。逐地图陷阱布置可作为独立教程候选，需实际验证，本轮不扩展。使用最新已发布奇乐 AgentAbilityPage 和 AgentCrosshair，保留导航、五语、技能合辑、动画、图集灯箱、角色资料和准星交互，不增加调参面板/无证据FAQ。与奇乐正式构建1440/390对照，H1为64/40px。

五语路径 `/en/valorant-vyse/`、`/ja/valorant-vyse/`、`/es/valorant-vyse/`、`/pt-br/valorant-vyse/`、`/zh-cn/valorant-vyse/`。查询以各语种官方角色名+技能/准星为候选。全部 noindex,follow、自canonical、无hreflang、排除三份Sitemap。没有中文索引例外或新增索引授权。28天后可按真实访问、复制和编辑器操作评估使用，不自动创建监控。

GA4 548356819，America/Los_Angeles，2026-09-21至10-18共28完整日，生产hostName=aimcodes.com、pagePath包含vyse、screenPageViews返回0行、无抽样；不存在路径的0行不证明站外无需求。未取得实时GSC查询。2026-10-20当前搜索观察存在官方英雄/技能页和主题准星讨论，不以结果条数推断需求量。

## 来源与机制

技能/名称：Riot https://playvalorant.com/en-us/agents/vyse/ 以及ja-jp/es-es/pt-br页面的公开__NEXT_DATA__。原顺序Q/E/C/X重排至C/Q/E/X，保持图标、视频绑定。中文通过国服官方GraphQL https://api.val.qq.com/go/agame/graphql/graphiQL ，agents查得id25，再读取agent.skill确认剃刀藤蔓、裁断、弧光玫瑰、铁棘禁园。

按 https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-11-08/ 纠正旧页面的触发/反制：敌人进入再离开裁断触发区后墙升起，玫瑰闪光启动期间可被摧毁。不写过时半径、时长或闪中提示。13.00仅相关语音/错误修复未用于技能数值。官方旧演示用于说明技能，不当作当前HUD/数值验证。

动画来源：VALORANT已认证频道，ALL PATHS END HERE // Vyse Agent Trailer，https://www.youtube.com/watch?v=btpWg1gDXIE 。2026-10-20在Ego正常观看页核对并播放。原始画面1920x810，采集观看区1200x506；截图时临时隐藏播放器控件。原图/原视频保存在本地data_raw，派生脚本 `scripts/prepare-vyse-media.mjs`，时码/裁切见 `public/images/agents/vyse/sources.json`。只提交派生素材。

准星是淡紫色细竖脊与四个分离粗短外线，无中心点；几何区别通过同地图1×/5×与已有英雄对照。完整设置生成Canvas、复制、编辑器共用代码，不替换旧英雄。没有游戏客户端导入证据。

中文文案按dbs-ai-check的22项、产品操作说明体裁检查；没有需要报告的AI写作特征，无虚构经历或效果承诺。

## 验证与发布

待本地正式构建、check:auto、check:release、Skill辅助检查、PR实际预览、CI和Cloudflare生产build-meta核验后记录完成状态。回滚使用仅恢复本页文件的PR或已知Cloudflare部署，不覆盖其他工作树。
