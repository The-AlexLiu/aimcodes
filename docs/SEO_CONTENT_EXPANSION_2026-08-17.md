# AimCodes SEO 内容扩张（2026-08-17）

## 目标

在不继续开放低差异 `noindex` 准星详情、不虚构职业选手代码、不上线假工具的前提下，扩大可索引搜索意图。该批次新增 10 个可直接预览和复制真实代码的集合，以及 10 个解决具体设置问题的指南；四语种同步后预计新增 80 个 canonical URL。

## Google Trends 与现有数据依据

- Google Trends：Worldwide、Web Search、Past 90 days，查询组为 `valorant crosshair`、`valorant crosshair codes`、`best valorant crosshair`、`valorant sensitivity`、`valorant crosshair generator`。
- 相对平均热度：`valorant crosshair` 78，`valorant sensitivity` 10，`best valorant crosshair` 4，`valorant crosshair codes` 3，`valorant crosshair generator` 低于可稳定显示阈值。
- 相关上升查询中，`funny valorant crosshair codes` 上升 130%，`recoil crosshair valorant` 上升 50%。因此本轮优先加入 Funny 集合，并用中心点、粗细、间隙、轮廓和颜色等真实设置意图扩大主题覆盖。
- `xantares crosshair valorant` 上升 170%，但当前没有玩家控制的一手来源，因此不创建职业选手页面。
- 灵敏度换算和 AI sensitivity finder 相关词也有上升，但当前产品没有可用工具；本轮不创建只有文字的假工具，留到真实计算器上线时处理。
- 站点在 2026-08-03 至 2026-08-14 的 GSC 基线为 60 次点击、4,658 次展示、1.3% CTR、平均排名 25.7。上一轮已经优化高展示 URL 的点击率，本轮转向新增独立搜索意图。

## 新增 Collection Pages

| Key | URL slug | Search intent | 数据筛选规则 |
| --- | --- | --- | --- |
| funny | `funny-crosshairs` | funny valorant crosshair codes | 真实可用可爱造型、Burst Ring、Guard Frame |
| white | `white-crosshairs` | white valorant crosshair | 解析后主颜色为 white |
| red | `red-crosshairs` | red valorant crosshair | 解析后主颜色为 red |
| thin | `thin-crosshairs` | thin valorant crosshair | 内线开启且厚度为 1 |
| thick | `thick-crosshairs` | thick valorant crosshair | 内线开启且厚度至少 3 |
| centerDot | `center-dot-crosshairs` | valorant center dot crosshair | 中心点开启 |
| withOutlines | `crosshairs-with-outlines` | valorant crosshair with outline | 轮廓开启 |
| withoutOutlines | `crosshairs-without-outlines` | valorant crosshair no outline | 轮廓关闭 |
| openCenter | `open-center-crosshairs` | open center valorant crosshair | 内线偏移至少 3 |
| closed | `closed-crosshairs` | closed valorant crosshair | 内线偏移不超过 1 |

每个集合从 `catalogManifest` 当前可索引真实代码中筛选，展示 20–24 个不同准星，不生成新代码、不使用查询参数作为 SEO URL。

## 新增 Guide Pages

| Key | URL slug | Search intent | Priority |
| --- | --- | --- | --- |
| exportCrosshair | `how-to-export-valorant-crosshair` | how to export valorant crosshair | P0 |
| shareCrosshair | `how-to-share-valorant-crosshair` | how to share valorant crosshair | P1 |
| resetCrosshair | `how-to-reset-valorant-crosshair` | how to reset valorant crosshair | P1 |
| saveMultiple | `how-to-save-multiple-crosshairs-valorant` | save multiple valorant crosshairs | P1 |
| customColor | `how-to-use-custom-crosshair-color-valorant` | valorant custom crosshair color | P0 |
| outlinesOnOff | `valorant-crosshair-outlines-on-or-off` | valorant crosshair outlines on or off | P1 |
| centerDotOnOff | `valorant-center-dot-on-or-off` | valorant center dot on or off | P1 |
| innerVsOuter | `valorant-inner-lines-vs-outer-lines` | valorant inner lines vs outer lines | P1 |
| thickness | `valorant-crosshair-thickness` | valorant crosshair thickness | P1 |
| gapOffset | `valorant-crosshair-gap-offset` | valorant crosshair offset gap | P1 |

每篇指南包含快速答案、3 个独立解决步骤、FAQ、4 个真实可用准星，以及到相关集合、指南和工具的上下文链接。四语种均为玩家口吻的本地化内容，不使用英文正文回退。

## 索引与质量门

- 只有构建成功、HTTP 200、自指 canonical、内容完整的四语种 URL 才进入 `sitemap.xml`。
- 所有集合使用实际准星代码筛选，不为数量制造颜色换皮页面。
- 不发布没有一手来源的职业页面，不发布没有真实功能的工具页面。
- 发布前必须通过 `pnpm check:release`，并检查重复标题、描述、canonical、H1、断链、Sitemap、图片、性能预算和真实浏览器桌面/手机布局。

## 下一轮候选

1. 观察 14–28 天，按新 URL 的 impressions、平均排名和查询词决定扩展同一主题还是合并弱页。
2. 如果灵敏度查询持续上升，先做真实的 sensitivity converter 和 eDPI calculator，再建立相关指南集群。
3. 只有取得玩家控制来源和验证日期后，才发布 XANTARES 或其他职业选手页面。
