# 星礈五语英雄页 · 2026-10-20

用户要求使用 aimcodes-agent-page 制作星礈准星页面并完成后直接发布。专用分支 codex/astra-agent-page，工作目录为独立受管工作树，基线 eda3dc9。原混合工作树的埋点、报表、原始数据等既有修改全部跳过。

## 意图、语言与索引

核心任务：看懂星礈放星/回收/触发技能的基本操作，并预览、复制、调整一款对应主题的可用准星。当前KAY/O共享AgentAbilityPage及不死鸟修订为交互参考；保留Logo、导航、语言、技能、合辑、动画、灯箱、资料折叠、地图、1×/5×、复制和同语种编辑器。官方把星界形态独立列出，因此本页为五张卡，不把放星操作埋进大招。

| 查询候选 | 用户意图 | 页面模块 |
|---|---|---|
| valorant astra abilities / アストラ アビリティ / 星礈技能 | 看效果和按键 | 五张官方视频技能卡 |
| astra astral form / 星礈放星与回收 | 区分放星、激活、回收 | 星界形态与星云卡片 |
| astra crosshair code / アストラ クロスヘア / 星礈准星代码 | 试用并复制主题造型 | 紫色横长星芒、地图/倍率、复制与编辑器 |

最接近的是 /en/valorant-omen/ 和 /en/valorant-brimstone/，它们没有星礈的星体分配与回收操作。独立教程候选“星体放置与回收”本次由技能正文承接，不另扩URL。Title为“无畏契约星礈技能与主题准星代码”，H1“星礈”；描述说明五个技能和准星试用。其他四语使用各语言官方名称。

GA4属性548356819、America/Los_Angeles，2026-09-21—2026-10-18共28完整日，pagePath包含astra，维度hostName/pagePath、指标screenPageViews，返回0行、无抽样。历史GSC导出来自原工作树data_raw/traffic-audit-2026-10-15/gsc.zip：2026-09-29—2026-10-12、查询1000行/网页665行，没有匹配astra/星礈/アストラ。该导出有截断与时效边界，不能证明没有市场需求；本次无实时GSC查询。2026-10-20搜索观察到官方英雄页与技能指南、官方预告，不用结果条数估算搜索量。

| 语言 | 路径 | robots | canonical | hreflang | Sitemap |
|---|---|---|---|---|---|
| en | /en/valorant-astra/ | noindex,follow | 自身 | 无 | 排除 |
| ja | /ja/valorant-astra/ | noindex,follow | 自身 | 无 | 排除 |
| es | /es/valorant-astra/ | noindex,follow | 自身 | 无 | 排除 |
| pt-BR | /pt-br/valorant-astra/ | noindex,follow | 自身 | 无 | 排除 |
| zh-CN | /zh-cn/valorant-astra/ | noindex,follow | 自身 | 无 | 排除 |

发布授权不扩大索引。以后若决定索引，需重新提供需求证据，按28完整日观察查询/点击/展示及自然落地/复制，样本不足延至56天；本任务不创建自动监控。中文不新增白名单例外。

## 官方来源与素材

- https://playvalorant.com/en-us/agents/astra/ ，以及ja-jp/es-es/pt-br对应官方页公开__NEXT_DATA__的iconTab，核对五组图标、视频和名称。技能顺序form/gravity/nova/nebula/ultimate，默认键X/C/Q/E/X；官方首段form为WebM，派生统一为MP4。
- https://api.val.qq.com/go/agame/graphql/graphiQL ，公开查询agents后按agent(id:15)读取skill{name desc icon keypad}；国服名星礈，星界形态、重力之阱、新星脉冲、星云/消散、宇宙分裂。宇宙分裂声音说明依据当前国服官方资料；国际官网旧描述仍写heavily dampens audio，不照搬旧行为。
- https://www.youtube.com/watch?v=-ylVnuPWlJM ，VALORANT官方《Astra Gameplay Reveal Trailer》，2021-02-27。正常观看页核对频道和实际画面。49秒盘腿悬浮作为首图，13秒兜帽发光眼睛近景和10秒张臂施法作为图集。播放器区域14/56/1172×659，10秒图集保留同一完整画面再按960×640居中裁切；只隐藏YouTube推荐/控件覆盖后截图，不重绘角色。排除7秒纯手部、16秒远处战斗、46秒背影以及结尾推广画面。

原始官方JSON、视频、浏览器截图保存在data_raw/astra-2026-10-20，中间帧在data_processed/astra-media；仅派生素材public/images/agents/astra和可复现scripts/prepare-astra-media.mjs提交。官方演示可能保留旧HUD，不声称当前补丁录制。原视频/账号数据/个人档案不进入提交。

准星为无中心点、中心连通的横长细十字（横7/竖3/粗1/间距0），外层四枚独立刻点（长1/粗2/距10）。使用同一完整设置生成Canvas、复制和编辑器代码；与已有竖轨、方环、粗横臂等同图同倍率视觉对照。不是官方或选手配置；尚未在游戏客户端实际导入。

中文按dbs-ai-check的22项检查，体裁为技能操作说明。使用具体作用与按键，无虚构体验、泛化钩子或升华；官方名不强行改写。不声称通过AI检测器。

## 发布与回滚

实时生产build-meta基线eda3dc9，当前平台Cloudflare Workers Builds。完整本地检查后创建专用PR、核验实际Cloudflare分支预览与CI，再合并并等待正式域名build-meta匹配。仅当前页面和必要入口，不修改DNS、托管、支付、GA4/GSC后台或旧英雄配置。回滚用只恢复本次变更的PR，保留其他工作树。

验收结果及实际PR/部署版本随执行补充。

### 本地验收

check:auto首轮在历史支付校验发现复用node_modules缺少@netlify/blobs；改为专用工作目录按锁文件安装依赖，未改包清单或支付代码。随后check:release 25/25通过（50.068秒），审核verification与seo-scope；专项test-astra-agent和技能辅助脚本均通过。目录548源记录/540外观/396索引详情保持不变；主Sitemap1894、准星1585、图片1739页/3324图。

正式构建桌面1440/手机390px，H1分别64/40px，无横向溢出。五视频readyState4，分别实际推进0.51秒以上；合辑64.2秒且实际播放。双图960宽真实加载，灯箱Esc关闭且焦点返回触发按钮。Haven/5×切换、真实clipboard.writeText和已复制反馈通过，编辑器code与复制逐字一致。验收脚本初次用了错误的.tool-code定位，按实际.tool-preview-panel code重读后确认一致，页面无需因此修改。

将实际hushAgent.css临时追加到文档末尾后，技能标题rgb(213,160,255)、正文rgb(238,237,255)、按钮hover rgb(236,208,255)、键盘focus紫色仍正确。临时CSS未进入产品。实际首页入口进入星礈、切换日语后H1/路径正确。与Breach/KAYO/Waylay在Ascent同地图5×并排比：星礈连通细横长十字和外四点可清楚区分；1×也保留完整瞄准中心。手机动作图发现原裁切过紧，改为保留完整原帧再居中裁切，避免头部被切掉。

本地截图留在output/astra-qa，不上传账号与原始素材。尚未执行游戏客户端导入；官方YouTube外部观看页已核验，隐私嵌入仍可能因浏览器登录策略要求验证，不把外链可用称为所有设备均可内嵌播放。
