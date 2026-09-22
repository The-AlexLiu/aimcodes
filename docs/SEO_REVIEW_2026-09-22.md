# AimCodes SEO 数据复盘与优化 — 2026-09-22

状态：已通过 [PR #76](https://github.com/The-AlexLiu/aimcodes/pull/76) 发布，生产功能提交 `56e274e`。Netlify 于 2026-09-22 完成生产构建并通过线上复测。

## 口径与证据

- GSC：`sc-domain:aimcodes.com`，Web 搜索，`dataState=final`。
- GA4：Aimcodes，Property `548356819`，时区 `America/Los_Angeles`。按落地页、sessionSourceMedium、dateRange 查询；这里只将 `google / organic` 作为 Google 自然会话，不混入 Bing referral 或 AI Assistant。
- 统一比较 **2026-09-06 至 09-19** 与 **2026-08-23 至 09-05**，各 14 个完整自然日。GSC 最终数据截止 09-19。
- 初查 GA4 曾使用 09-07 至 09-20，最终结论全部以以上对齐窗口为准。
- 本机原始响应：分析工作区 `data_raw/ga4-landings-2026-09-22.json`、`gsc-dates-2026-09-22.json`、`gsc-pages-{recent,previous}-2026-09-22.json`、`gsc-queries-{recent,previous}-2026-09-22.json`。原始响应保留，不覆盖或提交凭据。
- 分析工作区：`/Users/alex/Documents/Codex/2026-09-02/ga4-gsc-seo-ga4-gsc-seo`。这些是本机证据路径，不是网站公开链接。

## 结论

| 指标 | 上期 | 最近 | 变化 |
| --- | ---: | ---: | ---: |
| GSC 点击 | 662 | 388 | -41.4% |
| GSC 展示 | 23,238 | 11,232 | -51.7% |
| GSC CTR | 2.85% | 3.45% | +0.61 个百分点 |
| GA4 Google 自然落地会话 | 718 | 480 | -33.1% |

流量下滑真实存在，不是全站 CTR 普遍下降。展示收缩更明显，但不能据此断定只是市场需求下降：查询组合发生变化，部分重要查询的排名也变差。GSC 点击与 GA4 会话不是相同指标，不强行对齐。

| 英文落地页 | GSC 点击 上期→最近 | 最近展示 | 最近 CTR | 最近平均排名 | GA4 Google 会话 上期→最近 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Funny | 165→35 | 244 | 14.34% | 9.80 | 163→33 |
| Small | 30→47 | 1,061 | 4.43% | 7.46 | 30→43 |
| Dot | 22→15 | 978 | 1.53% | 12.53 | 21→20 |
| Plus | 1→0 | 254 | 0% | 8.43 | — |
| Cute | 24→11 | 101 | 10.89% | 12.15 | 26→10 |

Funny 少了 130 次点击，约占全站净损失 274 次的 47.4%。URL Inspection 返回 PASS、Submitted and indexed、抓取成功、Google canonical 与声明一致，最后抓取 09-11；这是索引快照，不是实时页面测试，也不保证未来状态。

可见查询中，`funny crosshair valorant` 从 34/195 点击/展示降到 11/45，排名从 4.95 到 6.91；`valorant funny crosshair` 从 27/127 降到 4/26，排名从 4.76 到 8.77。说明该主题既有曝光减少，也有排名压力，不能只改标题便宣称解决。

Small 在增长，保留其标题、内容和选品。日语已有兔子、可爱准星等表现，但样本小，暂不为了扩量改动赢家。Firing Error（409 展示、1 点击）列为下一轮专项：需要区分玩家查询中的射击误差图表和准星动态反馈，不能用同一泛化回答混淆意图。

## 本轮实施

1. **Dot：补足设置型意图。** 标题与摘要明确 code + small dot settings；正文提供中心点、内外线、透明度、粗细和导入操作。数值明确为试用起点，不宣称通用最佳。关键词证据：`dot crosshair valorant` 277 展示、`valorant dot crosshair code` 96 展示。
2. **Plus：解决“怎么做一个 +”的具体任务。** 标题区分 + 形状，给出内线参数起点、实心与留空中心的区别及导入操作。关键词证据：`plus crosshair valorant` 83 展示、`valorant plus crosshair` 35 展示，均未获点击。
3. **Funny：保护原标题，增强主题承接。** 保留高 CTR 标题与既有 100 款选品，补充动物/可爱风格入口、正常比例检查、独立游戏配置和导入 FAQ。不再把“解析通过”表述成“已验证所有游戏版本都可用”。
4. **有上下文的内链。** 三页首屏仅保留 4–5 个相关集合入口，代替默认大范围分类列表；生成 HTML 同步这些链接，浏览器和无 JS 内容均可访问。
5. **准确更新时间。** 只更新这三个英文页面的 sitemap lastmod 到 09-22，不把全站页面统一刷成新日期。

本轮没有新增近义词页面，没有改变 robots、canonical、重定向或索引白名单；没有改日语/中文产品文案、付款功能、GA4 事件或社媒任务。现有可复制准星代码不变。

## 最佳实践依据

- [Google：描述性、简洁且符合页面内容的标题](https://developers.google.com/search/docs/appearance/title-link)。不堆砌关键词，不给 Funny 已有较高 CTR 的标题做无依据替换。
- [Google：可抓取、带上下文和明确锚文本的链接](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)。用正常 href 连接相关用户任务，不增加一批互相竞争的同义页。

## 验证与回滚边界

按 AimCodes Maintainer 的 SEO 模式验证代码、生成 HTML、本地桌面/手机页面；完整结果以 `.aimcodes-reports/current/verification.md` 为准。仅包含三个 SEO 内容文件、metadata、静态 HTML 生成器及此报告。可独立回退这些变更，不涉及用户数据迁移。

实际验证：`pnpm check:auto` 根据生成器变更升级为 release 套件，24 项全部通过；另行断言三个生成页面的标题、相关链接和 09-22 lastmod 均正确。Ego Lite 在 390px / 1440px 下检查三页，均为单一 H1、正确 canonical、index/follow，且无横向溢出。GitHub `product-data`、`build-and-seo` 与 Netlify Deploy Preview 均通过；生产站再次确认三个页面的标题、canonical、robots 和相关内链正确。未主动提交 GSC 重新抓取，搜索引擎发现与处理时间由平台决定。

## 发布后判断标准

- 以实际发布日期记录基线，等待重新抓取；第 14 天看方向，第 28 天用完整等长周期决策。未发布前不归因效果。
- Dot/Plus：分别看固定查询组的展示、CTR、点击和排名；按设备/国家拆分，避免查询组合变化造成假提升。站内看 Google 落地会话、互动与 code_copy。
- Funny：重点看损失查询的排名/展示是否恢复，以及 Cute/Animals 的后续访问；不只看全站平均排名。
- Small 作为未改动参考页，但不是随机对照实验，不能证明因果。
- 若有展示无点击且位置稳定，再针对摘要/首屏做单项测试；若排名继续下降，调查同查询竞品、SERP 变化与内容差异，不继续堆页。
- 不承诺指数增长或固定提升比例；目前样本不足以量化本轮净增流量。
