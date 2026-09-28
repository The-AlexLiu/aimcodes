# AimCodes SEO 诊断与页面优化 — 2026-09-28

状态：本文记录首轮诊断及当时的本地验证；后续按用户要求继续扩词与发布，最新状态见 `SEO_KEYWORD_EXPANSION_2026-09-28.md` 及 `CURRENT_STATE.md`。首轮完成时尚未推送、创建 PR 或发布。工作分支 `codex/gefei-seo-20260928`，基于 `origin/main` 的 `0a95aae`。当前目录 `/Users/alex/Documents/Codex/2026-09-28/aimcodes-gefei-seo`。

## 数据与结论

比较 2026-09-12 至 09-25 与 2026-08-29 至 09-11，各 14 个完整日，留出最近两天数据处理时间。GA4 Property 548356819，America/Los_Angeles，sessionSourceMedium = google / organic；GSC 为 sc-domain:aimcodes.com 的 Web 搜索、按 GSC 日期导出并汇总。两者不是同一指标，不强行对齐。

| 指标 | 上期 | 本期 | 变化 |
| --- | ---: | ---: | ---: |
| GSC 点击 | 638 | 264 | -58.6% |
| GSC 展示 | 19,426 | 7,986 | -58.9% |
| GSC CTR | 3.284% | 3.306% | +0.022 个百分点 |
| GA4 Google 自然落地会话 | 716 | 317 | -55.7% |
| 英语 Funny Google 会话 | 122 | 4 | -96.7% |
| 英语首页 Google 会话 | 25 | 7 | -72.0% |
| 英语 Dot Google 会话 | 32 | 6 | -81.3% |
| 英语 One-tap Google 会话 | 35 | 6 | -82.9% |

Funny 占 Google 落地会话净下降 399 的 29.6%，但不是唯一下降页面。当前 GSC URL Inspection 仍显示英语 Funny 已收录；这是索引快照，不保证每次查询的排名。点击下降伴随展示收缩，聚合 CTR 稳定；不能据此证明是算法、季节性、竞争或某次发布导致。需要固定查询/国家/设备的后续对比才能进一步归因。

## 实际使用哥飞工具箱

- **On Page SEO 体检**：`/en/`，目标 valorant crosshair codes，75 分、聚焦 83%、441 词、84 内链、0 图片。技术基础正常，但 Title/H1 使用 aim codes，核心代码与图片依赖客户端组件。
- **On Page SEO 体检**：`/en/funny-crosshairs/`，目标 funny crosshair valorant，94 分、聚焦 81%、649 词、115 内链、1 图片。高分没有阻止真实流量下降。
- **页面军师**：首页被推断为不自然的“300 working valorant aim”，工具自己也标注该词 SERP 与页面主题错位。DR 0、月访问 387 为第三方估算，不是 GA4 实测，更不是 Google 排名分数。
- **站点出词（美国，最多50词）**：库中168个排名词，前3位0个、4–10位2个，估算月搜索流量43。属于月度快照，不等同全球或当前实际流量。`dot crosshair valorant` 被分配到比较指南而非 Dot 集合，属于需要 GSC 查询—页面进一步核实的意图分散线索。
- **SERP 排名解密**：查询 funny valorant crosshairs，出现 VCRDB、Tracker、专门 Funny 页与社区/视频结果。工具评分较低或抓取失败的竞品仍可排名，因此不采用“字数越多/体检分越高就一定超过对手”的推论。

原始页面与报告保存在分析工作区 `data_raw/aimcodes_seo_20260928/`，GA4 完整214个落地页组合响应与 GSC CSV 压缩包均保留。汇总脚本 `data_processed/aimcodes_seo_20260928/summarize.py` 可重建结果；没有删除无变化页或 `(not set)` 行。

## 改动

1. 英语首页 Title、H1、摘要自然表达 VALORANT crosshair codes；去掉含糊的“300+ Working Aim Codes”标题。全目录仍负责完整筛选，首页负责即时预览和选型入口；不新增同义页。
2. 首页和 Funny 列表提供原生 details 完整代码展开区；复用五语种已有“准星代码”标签，保留现有复制按钮。玩家可以不离开列表读取代码，复制失败时也能手动选择。
3. 初始 HTML 首页提供默认预览+8个精选卡片，Funny 提供前12个图片/名称/代码卡片及其余详情链接。所有图片与代码来自现有 manifest；不编造、不改代码，不扩充目录。静态精选从原先前8个索引详情改为与实际首页相同的8个 Funny 条目。
4. Funny 的列表 H2 使用页面自己的标题；英语改成明确的 Funny VALORANT crosshair codes to preview。
5. 静态图片带准确 alt、宽高、延迟加载；无脚本时可展开完整代码。只为实际修改的首页/Funny 本地化页面更新 lastmod。

不改 URL、canonical、索引语言层级、准星记录、支付、分析事件、社媒任务。旧目录里的 GA4 未提交改动及9月24日未提交SEO改动保留，未拷贝、未提交。

## 判断依据与限制

Google 没有推荐的固定字数；不为了工具箱1200词门槛增加空泛文字：[Google helpful content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)。Google 可以渲染 JavaScript，但静态/预渲染有助于内容访问：[JavaScript SEO basics](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics)。本次修复降低初次获取内容对 JS 的依赖，不宣称 Google 原先完全看不到代码或该问题就是流量下降的全部原因。

页面工具所谓“纯跳转”属于静态检测误判：Ego Lite 实测首页已有本页预览、换色和复制。未机械照搬这一条，也未采用关键词密度和难度31.1为排名保证。

## 验证与发布边界

`pnpm check:auto` 首次自动升级到 release 套件并全部通过。修复浏览器发现的卡片 height:100% 导致展开区被下一行遮挡的问题后，最终 `pnpm check:release` 24/24 全部通过（26.9 秒）。Ego Lite 在1440px和390px下检查五种语言的Funny页：单一H1、100个代码展开区、展开成功、无横向溢出；首页8个卡片、展开与复制反馈正常。禁用脚本加载Funny页后，12张静态代码卡片及图片正常，原生展开可读完整代码。英语Small参考页无新增展开区、无溢出。另按五语种逐一核对10个生成页面：首页9张/ Funny12张静态卡片与manifest原始代码完全一致，图片存在，宽高和懒加载声明齐全。站点数据基线应保持548条源数据、540种样式、396个可索引详情、1,887个主Sitemap URL、1,584个详情Sitemap URL与1,736个图片Sitemap页面。构建输出3,165个HTML文件（含重定向/兼容文件），验证器统计3,150个可访问规范路由，两者口径不同。

发布应按仓库规则：获得明确授权→仅推送本任务分支→PR→GitHub CI和Netlify预览→合并main→核对生产提交、页面、代码、Sitemap。没有生产发布前，不能报告已改善线上页面或SEO分数。

## 后续判断

- 发布后先确认重新抓取；第14天看方向，第28天比较等长窗口。
- 固定跟踪英语首页和Funny的查询、曝光、CTR、排名、Google落地会话与复制行为，不把全站波动全部归因本次修改。
- Dot/Plus/Funny在09-22已有改动，不反复换标题或继续批量扩页；Small及日语已有赢家不做无依据文案重写。
- 若曝光继续掉，优先按固定查询/国家/设备核实排名和SERP变化，以及被抓取的渲染页，不用进一步堆词应对。
- 外链与分发可作为下一阶段，但本任务没有购买外链、自动发帖或向他人发消息。

## 文件与交接

修改9个源码/样式/生成器文件，新增本报告；没有删除数据或文件。既有两个混合工作树均未改动。未推送GitHub、未修改Netlify/GA4/GSC配置、未提交索引请求、未执行生产付款。证据工作区为 `/Users/alex/.codex/.chatgpt-projects/g-p-6aa7fbbb990c8191b859c8bb93d44431`。发布后应再用同样关键词运行工具箱复测；本地检查不能冒充线上评分提升。
