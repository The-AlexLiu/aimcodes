# 迷核技能与主题准星页

2026-10-20，基线7ee749e，独立分支codex/miks-agent-page。用户明确授权制作完成后直接发布；本任务仅迷核页与必要接入。原混合工作树和旧英雄数据跳过，无追踪/支付/托管配置变更。目录名veto-agent-page为初始工作目录名称；官方核对后实际角色始终按Miks/迷核实现，Veto/禁灭未接入。

## 意图与语言

核心任务：了解迷核技能，预览、复制和调整声波主题准星。

| 查询候选 | 意图 | 模块 |
| --- | --- | --- |
| miks abilities / 迷核技能 / ミクス アビリティ | 理解作用与操作 | 四技能图标、视频与C/Q/E/X说明 |
| miks m-pulse / 迷核治疗震荡 | 切换装置模式 | C技能卡片 |
| miks crosshair / 迷核准星 | 预览复制调整 | 地图、1×/5×、复制反馈、完整生成器 |

Title：无畏契约 迷核技能与主题准星代码 | AimCodes；H1：迷核；Description：看迷核电音脉冲、共振谐律、声波帷幕与音脉强袭的官方演示，了解切换模式、强化队友与放烟操作，预览、复制并调整紫色主题准星。

最近承接页为地图战术板及其他英雄，无法代替迷核技能视频和专属配置。复用当前主线最新共享AgentAbilityPage、AgentCrosshair，保留全部模板交互。独立教程候选为地图烟位/电音脉冲投掷，需要实测证据，本轮不建页、不增FAQ。新增紫色中心点配左右两层刻线：内线细、外线粗，两层均无竖线。生成器补足可选外线竖长的带入与调整，默认旧配置不变。

五语路径：/en/valorant-miks/、/ja/valorant-miks/、/es/valorant-miks/、/pt-br/valorant-miks/、/zh-cn/valorant-miks/。全部noindex,follow，自canonical，无hreflang，排除三份Sitemap；不扩大中文白名单。未来索引另审GSC/GA4完整28天的落地、复制和查询表现，本轮无索引增长承诺。

## 证据与媒体

GA4属性548356819，America/Los_Angeles，2026-09-22—2026-10-19共28完整日，hostName=aimcodes.com且pagePath包含miks，sessions返回0行，无抽样。实时GSC未取得，不能推断站外搜索量。2026-10-20搜索观察官方英雄、角色预告和补丁；未用结果条数估算需求。

官方角色资料与四语名称：https://playvalorant.com/{en-us,ja-jp,es-es,pt-br}/agents/miks/ 的__NEXT_DATA__。四组国际素材顺序Q/E/C/X，按C/Q/E/X重排为m-pulse/harmonize/waveform/ultimate；图标、海报和MP4一同映射。国服公开接口https://api.val.qq.com/go/agame/graphql/graphiQL先查agents，确认id29，再查agent的skill{name desc keypad icon video{vid}}，核对电音脉冲/共振谐律/声波帷幕/音脉强袭。12.09官方补丁提及共振谐律提示更新，正文不固定时长等未经当前版本核验的数值。

角色预告为VALORANT已认证频道NEVER FIGHT ALONE：https://www.youtube.com/watch?v=gictwC-KlTk 。下载403后未重试或使用第三方副本；Ego正常观看页采集50.3秒迷核兜帽近景及159.3秒迷核/盖可舱门画面。逐张视觉筛选，裁切原截图x0/y121/w1200/h504，去掉界面及黑边，再16:9居中裁切至960×540。首图使用官方英雄页插画单独裁切，未复用图集。

原始资料data_raw/miks-2026-10-20仅本地保存，不提交；公开派生文件和sources.json在public/images/agents/miks。技能原MP4保持原内容，合辑各取前8秒、960×540、30fps、静音。图片与实机内容©Riot Games。

中文文案按产品操作说明体裁完成dbs-ai-check，未发现需要单列的AI表达问题。内容保留官方名称与按键，未加泛化承诺、虚构体验或互动结尾。

## 验证与发布

待补正式构建、浏览器桌面/手机、播放/灯箱/复制/编辑器与颜色验收，CI、真实预览、Cloudflare生产提交及正式域名核验。回滚使用只恢复本任务文件的PR；不覆盖其他工作树。解析与浏览器一致不代表已做游戏客户端导入。

本地25/25完整检查通过（2026-10-20T06:23:32Z，38.5秒），已审阅结构化报告。最初自动检查与一次重复发布检查发生构建重叠，导致自动检查读取robots时短暂缺失；终止重叠后串行重跑完整检查通过，未以该失败产物发布。辅助校验已支持可选外线竖长，代码往返通过，与23个已有英雄几何不同。索引1894不变，三份Sitemap1894/1585/1739，无迷核。

Ego正式构建四视频readyState4，推进0.36—0.40秒；合辑23.93秒、推进0.34秒。灯箱打开/Esc/焦点返回通过；Haven地图/5×正常；包装真实clipboard.writeText且等待原写入成功，复制反馈与生成器代码逐字一致。桌面1440、手机390无溢出，首图人物与文字可见，图集裁切逐图查看。共享hushAgent.css临时放到文档末尾后标题rgb(197,160,255)、正文rgb(237,247,255)、hover rgb(227,206,255)、focus紫色保持正确。首页实际入口进入及英语切换通过。
