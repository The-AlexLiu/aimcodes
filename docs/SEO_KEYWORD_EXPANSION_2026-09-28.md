# 2026-09-28 有效扩词与页面承接

状态：页面修改完成，发布验证进行中。发布记录完成后在 CURRENT_STATE 中补充。

## 结论与口径

筛选 50 个目标查询，覆盖 12 个已有 URL；49 个查询在 GSC 导出中有精确匹配曝光记录，14 个在工具箱长尾结果中有精确匹配。唯一仅由工具箱支持的词是 `heart crosshair valorant`。这 50 个是本轮运营目标，不是新增排名数量，也不是全站词库总量。

GSC 为 2026-09-28 导出的过去三个月 Web 查询表，最多 1,000 行。表内点击、展示、平均排名覆盖导出周期，不是最新 14 天或当前实时排名。上一轮 14 天流量诊断见 `SEO_REVIEW_2026-09-28.md`。

哥飞工具箱 `/ideas/` 实际运行美国同品类 50 行、美国 `crosshair valorant` 长尾 50 行、日本 `valorant クロスヘア` 长尾 50 行。每轮 5 积分；本轮使用 15 个免费额度，界面累计 25/30，未购买。月搜索量是工具自述的月更快照、Google Ads 桶化口径，US/JP 分开记录；预筛难度不等于 SERP 精评，也不证明容易排名。日本不同空格写法可能共享桶化搜索量，不能相加作为独立市场规模。

完整原始结果和 GSC ZIP 保存在本地 `data_raw/aimcodes_seo_20260928/`。可复现处理脚本在 `data_processed/aimcodes_keyword_expansion_20260928/build_opportunities.py`，输出机会表和未采用表。保留 1,086 条未采用/暂缓来源行（包含跨来源重复），没有删除原始数据。

## 本轮落地

| 页面 | 关键词任务 | 具体改动 |
| --- | --- | --- |
| EN 首页 | aim code / crosshair codes | 保留 aim codes 自然表达，明确预览、换色、复制；结合上一轮静态代码卡 |
| EN Dot | dot / small dot / white dot | 纯点、点状短十字、粗中心三个实际代码入口；说明实际尺寸与线层区别 |
| EN Small | small cross / tiny / smallest | 微型十字长度、粗细、偏移对比；避免把点状十字说成纯一像素点 |
| EN Plus | plus / no gap | 两个实际参数例子，闭合中心与留空中心的区别 |
| EN Cute | cat / bunny / heart | 猫、兔、心形详情直达入口，换色与导入 FAQ |
| EN Funny | funny / meme | 保留历史有效标题；补 meme 与 funny 同任务解释，沿用已实现的代码展示 |
| EN Copy | copy / command / teammate | /cc、/crosshair copy 和网站代码导入的分流 |
| EN Firing Error | shooting error / firing error | 修正同义词误判，区分 Shooting Error 图表与准星反馈，补 Riot 官方来源 |
| JA Cute | かわいい / うさぎ / 猫 / ハート | 日语形状入口与针对性问答，替换通用 FAQ |
| JA Funny | ネタ / ネタ コード | 可见代码获取、导入、形状选择及导入错误问答 |
| JA Copy | コピー コマンド / 味方 / コード 入力 | 命令、输入位置、保存后检查，补官方来源 |
| JA Not Working | インポート できない | 分开排查代码拒绝、保存失败、导入后不可见 |

没有新建 URL。上述候选均可由已有页面完成任务；按 SEO_OPERATING_POLICY 的独立意图门，不为词序、空格、同义词单独建页。未扩建职业人物聚合、账号交易、其他游戏、tracker 品牌导航、PS5 兼容承诺或没有验证的 recoil 功能。西/葡语不新增编辑内容，中文索引层级不变。上一轮首页/Funny 的通用代码展示仍覆盖五种 UI 语言。

款式短名单全部引用现有、可索引、属于对应集合的详情页；没有新造代码。数值描述取自代码解析器并加入独立验证，防止后续资料更新后正文参数失真。图库预览和解析成功不等于实际游戏内导入测试。

## 实现与风险

新增集合短名单与指南内容，分别放在 `searchOpportunityContent.js` 和 `searchOpportunityArticles.js`。React 与静态 HTML 共享内容。更新页面 lastmod；同步首页指南标签。

新增内容触发原有性能预算后，将集合说明首屏组件和主题链接按路由加载，并使用轻量五语种列表标题，避免在首页主入口预先加载完整集合正文。构建分组固定共享 SEO 基础模块和延迟集合正文的边界；集合正文不再被入口静态导入，首页的资源目录仍可按需加载它。未放宽 433 KB / gzip 145 KB 预算。异步集合标题有加载态，需实测桌面与手机。

## 验证与观察

发布前：完整 24 项检查、短名单归属/索引/静态链接、7 组代码参数声明、五语种列表标题一致性；桌面/手机真实浏览器检查主要改动，复制交互、无 JS 静态正文检查。

基线不变：548 条源数据、540 种去重样式、396 个可索引详情；3,150 个 canonical 可访问路由、3,165 个构建 HTML、1,887 主 Sitemap URL、1,584 准星 Sitemap URL、1,736 图片页面/3,320 图片引用。不同统计不能混用。

以实际上线日为 D0，D+7 只检查抓取、索引和技术异常；D+21 至 D+30 再比较等长完整周期的查询簇展示、点击、CTR、平均排名与对应落地页 Google organic 会话、复制操作。对美/日和全站分别统计，不用工具箱月度数字替代 GSC/GA4。不承诺恢复排名或即时流量增长，未建立自动监控。

官方事实来源：[Riot 4.10：Shooting Error 图表](https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-4-10/)、[Riot 5.04：观战复制命令](https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-5-04/)。
