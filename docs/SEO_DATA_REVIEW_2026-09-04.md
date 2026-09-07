# 2026-09-04 GA4 + GSC 搜索意图扩页

状态：本地实现，尚未提交、合并或发布。基于 `cf4aa19` 的独立工作树，分支 `codex/search-intent-expansion-0904`。原 GA4 埋点审计工作树中的未提交修改没有纳入或覆盖；合并时需要保留两边对 App 的改动。

## 数据口径

- 拉数日期：2026-09-04。统一日期窗口：2026-08-06 至 2026-09-02（含首尾，28 天）。
- GSC：`sc-domain:aimcodes.com`，Web 搜索，`dataState=final`。站点总体 660 点击、31,136 展示，CTR 2.12%，平均排名 24.84。
- GSC 查询报告返回 1,916 行；查询/页面报告返回 10,000 行，达到请求上限。查询匿名化和行数截断意味着词簇只是可见需求信号，不能与站点总量直接对账，也不能当作市场搜索量。
- GA4：`properties/548356819`，属性时区 America/Los_Angeles；按 `landingPage` × `sessionSourceMedium` 查询 `sessions`、`engagedSessions`、`totalUsers`，返回 306 行（请求上限 500）。
- 对返回报告中的 `google / organic` 会话求和：752 会话、519 互动会话，互动率 69.02%。不把各落地页用户数相加当作全站独立用户数，也不把 GSC 点击等同 GA4 会话。
- 英语 Funny 落地页带来 109 次 Google 自然会话、83 次互动会话；英语 Small 为 44/31。已有玩法型页面有实际使用，继续保护这些 URL。
- `cn.bing.com / referral` 保留 GA4 原口径，不擅自归入 Google 自然流量。Google 自然来源的 `(not set)` 为 35 会话/1 互动会话，记录为后续归因审计项，本次不改埋点。
- 原始响应保留在执行任务目录的 `data_raw/`，未加入公开仓库。没有输出或提交凭据。

## 选择的 6 个意图

| 新路由（英语示例） | 类型 | 可见 GSC 信号 | 与现有页面的边界 | 优先级 |
| --- | --- | --- | --- | --- |
| `/en/static-crosshairs/` | Collection | static 词簇 28 展示/0 点击；static crosshair 23 展示、平均排名 8.04 | 要直接复制固定准星的用户；原静态/动态教程继续负责原理比较 | P1 |
| `/en/horizontal-crosshairs/` | Collection | horizontal 2 展示/0 点击，结合 stretched 9 展示/1 点击 | 17 款横长竖短的现成代码；普通 Plus 集合保持独立 | P1 |
| `/en/valorant-crosshair-color-yellow-enemies/` | Guide | yellow enemies 相关查询 34 展示/0 点击，已有排名约 6–10 | 固定黄色敌人轮廓下如何比较配色；不重复通用颜色说明 | P1 |
| `/en/valorant-crosshair-off-center/` | Guide | off center 相关查询 5 展示/0 点击，主要落到 Gap/Offset | 排查视觉偏心；原 Gap/Offset 继续解释参数与间隙 | P1 |
| `/en/valorant-stretched-crosshair/` | Guide | stretched 词簇 9 展示/1 点击，主要落到 Stretch Plus 单款详情 | 区分屏幕拉伸与横竖线长，并给出设置步骤；不是另建 stretched 代码集合 | P1 |
| `/en/valorant-crosshair-not-visible/` | Guide | invisible crosshair 仅 2 展示/0 点击、平均排名 62.5 | 已导入但看不见的诊断；导入被拒绝仍由 Code Not Working 承接 | P2 实验 |

信号总体偏小，尤其不可见问题存在歧义，不能声称高流量关键词已验证。它是有实际排查步骤的低样本实验页，而不是对需求规模的保证。

以上 6 个主题均完成 `en`、`es`、`pt-br`、`zh-cn`、`ja`：共 **30 个新增本地化 canonical URL**，并非 30 个完全不同的主题。关键词、标题、描述、正文、FAQ 和导航标签对应语言本地化；英文查询信号不等于已经验证五种语言的需求规模。

## 实施和内容核对

- 静态合集：从 Micro Gap、Tap Dot、Compact Cross、Tracker 各选 4 款，共 16 款；使用实际解析器核对移动/射击误差关闭。网页静态预览不冒充游戏运行时验证，页面提示游戏内确认。
- 横向合集：17 款有可见竖向参照、横向长度大于竖向长度的 Wide Axis 代码。Beacon 与 Comet 不满足宽于高条件，未加入新合集；原详情保留。
- **没有新增准星数据记录**，复用 33 款已可索引代码。源数据仍为 548 条、540 种可见样式、396 个可索引详情；未开放未验证选手页。
- 每篇指南有独立的快速结论、4 个解决步骤、2 个相关 FAQ、4 款可直接尝试的准星，以及相关集合和工具入口。
- 两个合集新增独立 OG 图片，进入图片 Sitemap；指南继承现有 Article/Breadcrumb 渲染，合集继承 ItemList/Breadcrumb。FAQ 仅对应页面真实内容。
- 既有 Colors、Gap/Offset、Inner vs Outer、Static vs Dynamic、Code Not Working 指南与 Plus、Minimalist、Cyan、White 集合加入上下文入口；详情通过 manifest 自动反向链接新集合。
- 新合集排在已有 Funny 后，不挤走导航前部的老入口。未新建 cat/bunny/meme 近义集合，未改动 Funny、Small、Tracker 等赢家的内容定位。
- 两个新合集的首屏仅显示当前分类和 3 个相关分类，避免手机用户先滚过 30 个入口才能看到代码；其他页面沿用原导航。
- `lastmod` 只更新新增页和本次实际补充链接的页面，未全站刷新日期。
- 用户可见文案不包含“换关键词生成页面”等内部说明。配色建议是测试候选，不保证视力适配、胜率或最佳结果。
- Riot 5.04 官方说明支持自定义六位 RGB 和横竖线长独立设置：[官方更新说明](https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-5-04/)。诊断步骤是 AimCodes 的排查建议，不冒充 Riot 测试结论。
- 性能：页尾 PublisherValueSection 按需加载；首屏合集标题保持同步显示。性能阈值未提高。

## 构建变化

| 项目 | 之前 | 本轮 |
| --- | ---: | ---: |
| HTML 路由 | 3,065 | 3,095 |
| 主 Sitemap canonical URL | 2,290 | 2,320 |
| 集合主题 | 28 | 30 |
| 可索引准星详情（不计语言） | 396 | 396 |
| 准星 Sitemap URL | 1,980 | 1,980 |
| 图片 Sitemap 页面 | 2,120 | 2,130 |
| 图片引用 | 4,100 | 4,110 |

新增 `validate-search-intents.mjs`，并纳入 `validate:seo`：校验 33 款代码与承诺形状相符、五语种 30 页、标题/描述、推荐数据、导航标签、上下文入链及精确更新日期。发布前仍需执行完整 `check:release` 和浏览器验收。

### 本轮实际验收结果

- 构建、lint、工作流、社媒回归、数据清单、代码解析、职业候选与来源、推荐、五语种、GA4、分享、SEO、路由、内链、工具、AdSense、图片、性能以及独立执行的 diff 校验：21 项通过。
- 22 项完整发布套件未全绿：npm 依赖漏洞接口两次超时；这是未完成检查，不是“零漏洞”。未变更依赖版本或锁文件，不降低检查标准。发布前需在网络恢复后重跑 `pnpm check:release`。
- 最终入口脚本 424.9 KiB raw / 140.9 KiB gzip，原限制 430 / 145 KiB 未调整。
- 本地服务逐一验证 30 个新 URL：HTTP 200、唯一标题和描述、一个 H1、self canonical、Breadcrumb、主 Sitemap 收录。
- 内置浏览器在 390 × 844 逐页验证全部 30 个新页面：均显示正确语言的 H1，无横向溢出；1440 × 900 验证桌面合集、指南与复制。
- 实际点击静态合集复制按钮，成功提示及剪贴板代码前缀通过；拉伸指南的“Try working codes”可跳入横向合集。
- 验收中重建 dist 曾导致一个已打开旧版本页面的旧分包加载失败；最终构建完成后重新打开页面恢复。不要在持续构建过程中把旧标签页的缓存错误误判为线上故障。
- 没有删除原始记录、修改线上 GA4/GSC 设置、提交 GitHub、部署 Netlify 或提交新 Sitemap。

## 发布后的观察计划（未创建定时任务）

1. 第 7 天：检查新增 URL 是否能被发现、索引状态、canonical 与语言版本；不因尚无流量就改标题。
2. 第 14 天：按新旧 URL 对照词簇曝光与点击，重点看 static、yellow enemies、horizontal/stretched 是否出现内耗；看指南到工具/复制的实际路径。
3. 第 28 天：按语言和设备查看落地会话、互动与复制/分享行为。低样本页继续积累，不以几次曝光评判输赢；若同意图持续集中在老页，则优先合并内容而不是继续拆近义 URL。
4. 只有新词簇有持续需求且现有页面无法满足时，才扩下一批；不承诺新页面必然被收录或带来指数增长。
