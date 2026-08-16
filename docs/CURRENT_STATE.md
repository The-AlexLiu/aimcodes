# AimCodes 当前状态

状态日期：2026-08-16

本文件用于 GPT/Codex、Cursor 和人工开发者快速恢复项目上下文。发生生产发布、重要合并、路由变化或权限变化后必须更新。

## 生产环境

- 正式域名：<https://aimcodes.com>
- 线上渲染器：<https://aimcodes.com/tools/social-renderer/>
- Netlify 项目：`aimcodes`
- Netlify Project ID：`b244d8b7-4cce-46de-b9b5-2b4f29e30392`
- 2026-08-15 GA4 + GSC 联合优化：指南页快速结论新增“试现成代码”和“打开工具”入口，四语种同步；英语 Best 页面和四语种颜色指南按现有查询意图调整标题、摘要与内容承接，不新增 URL，也不继续开放剩余 `noindex` 详情。数据口径与观察指标见 `docs/SEO_DATA_REVIEW_2026-08-15.md`。
- 2026-08-12 社媒发布流水线：新增 Instagram、TikTok、YouTube、Facebook 的 Buffer 草稿生成与校验，默认禁止排期和公开发布；账号映射、素材 URL、草稿包与台账只保存在 Git 忽略的 `output/social-publishing/`。
- 2026-08-13 社媒素材质量门：四语种发布视频写入 AimCodes 原创合成背景音乐与时间轴同步的等待/开始/点击/出分反馈音；可复现素材种子会轮换开场、成绩、准星、封面、CTA、发布文案与音乐配置。每条素材必须同时具备 1080 × 1920 PNG 封面；跨平台 MP4 音轨、时长、视频轨与封面尺寸检查失败时，草稿流水线会直接阻止继续。
- 2026-08-16 每日社媒自动化：GitHub Actions 每天北京时间 01:30 为 TikTok、Instagram、YouTube 生成三条不同英文素材；分别排期至 12:30、19:30、22:30。视频与封面上传 Cloudflare R2，AIHubMix 负责玩家口吻文案与五帧画面检查，硬性检查或 90 分质量门未通过时不写入 Buffer。
- 2026-08-16 首次正式自动排期已经完成：Instagram、YouTube 与 TikTok 素材分别以 98、98、100 分通过检查并进入 Buffer；已新增文案发布字段检查，阻止技术准星 ID、素材 Seed 与自动化术语进入平台正文。
- 2026-08-12 第二批目录索引与职业候选管线：开放 50 个既有高质量详情，索引总数提升至 150；职业候选只保存研究线索并强制等待一手来源，生产提交 `06eebb6`、PR #25。
- 2026-08-12 首批玩家来源职业配置：新增 Sacy、Saadhak、mwzera、Cortezia、Sato、Tteuw，并把 Aspas 更新为玩家频道指令中的配置；所有记录均保存直播命令或命令链接文档快照，普通目录保持外观去重。
- 2026-08-12 页面加载与玩家文案修复：准星详情不再展示“代码已检查/检查日期”，生成器移除检查式提示；正常加载时隐藏静态 SEO 兜底，避免进入语言首页时闪现整页链接，生产提交 `2d01a4f`、PR #22。
- 2026-08-12 P0 搜索增长发布：英语高展示页与葡语小圆点集合完成搜索意图优化，内部验收流量支持浏览器级持久排除；生产提交 `2b8eaf7`、PR #20。
- 2026-08-11 最近一次产品代码生产发布：目录架构统一，对应生产提交 `9dbfdf1`、PR #18。
- 当前架构效率版本把索引详情、集合关系、图片和 Sitemap 统一到 `src/data/catalogManifest.js`，并将 `App.jsx` 的目录视图模型和主要页面区域拆分为独立 Hook/组件。
- Netlify 已绑定 GitHub `The-AlexLiu/aimcodes`，生产分支为 `main`，构建命令为 `pnpm build`，发布目录为 `dist`。

## GitHub

- 主仓库：<https://github.com/The-AlexLiu/aimcodes>
- 当前生产基线分支：`main`
- 最近产品代码生产提交：`06eebb6 feat: expand indexed catalog and add pro candidate pipeline (#25)`
- 最近产品代码发布 PR：<https://github.com/The-AlexLiu/aimcodes/pull/25>
- P0 搜索增长发布 PR：<https://github.com/The-AlexLiu/aimcodes/pull/20>
- 渲染器仓库：<https://github.com/The-AlexLiu/AimCodes-Social-Creative-Renderer>
- 渲染器最近提交：`d2eef82 新增社媒视频配套封面`
- 渲染器草稿 PR：<https://github.com/The-AlexLiu/AimCodes-Social-Creative-Renderer/pull/1>

## 当前产品基线

- 4 种语言；
- 308 条准星源数据，去重后 300 种可见样式；职业选手同款允许共享外观但保留独立档案；
- 3 张地图预览；
- 3 轮反应测试；
- 9 个反应段位；
- 24 个 GA4 验证事件；
- 准星详情可一键分享当前语言、地图和颜色；接收方打开后直接还原预览并可复制最终代码；
- 站内交互来源统一使用 `interaction_source`，标准 `source` 只用于对外链接的渠道归因；
- 1,388 个生成 HTML 路由；
- 768 个 sitemap canonical URL；
- 156 个可索引准星详情，另有 152 个可访问但保持 `noindex,follow` 的目录详情；
- 156 张索引准星独立预览图、156 张对应 OG 图和 15 张集合页 OG 图；
- 独立准星 Sitemap 覆盖 624 个四语种准星详情 URL；
- 图片 Sitemap 覆盖 684 个四语种集合/详情页，共声明 1,308 个图片引用；
- 社媒视频、方形图和配套封面生成工具。

## 图片 SEO 基线

- `pnpm build` 会先从真实准星代码和现有地图素材确定性生成图片，不依赖手工导出或外部图片服务；
- 独立准星图位于 `public/images/crosshairs/`，尺寸为 1080 × 1080 WebP；
- 页面分享图位于 `public/images/og/crosshairs/` 与 `public/images/og/collections/`，尺寸为 1200 × 630 JPG；
- 准星详情页和集合页使用独立 OG 图片、图片替代文本、宽高属性和 `ImageObject` 结构化数据；
- 构建产物包含 `sitemap-images.xml`，并由 `robots.txt` 同时声明网页 Sitemap 与图片 Sitemap；
- `pnpm validate:images` 会检查文件数量、格式、尺寸、页面元数据、图片 Sitemap 覆盖率和 robots 声明。

## 已发布 SEO 基线

- 5 类四语种 SEO 主题集合页；
- 新增四语种准星参数说明和准星颜色指南；
- 导入页已扩充导出、观战复制、常见报错和 FAQ；
- 可索引高价值准星详情由 8 个增加到 16 个；
- 生产构建生成 308 个本地化 HTML 路由；
- sitemap 由 48 个 canonical URL 增加到 112 个；
- 已推送 GitHub、合并到 `main` 并发布 Netlify；四语种代表页面、robots、sitemap、canonical 和 JSON-LD 已在线验证。
- GitHub PR 自动生成 Netlify Deploy Preview；合并 `main` 后自动发布生产环境。

## SEO Knowledge Base Phase 1

- 新增 10 个集合搜索意图：圆形、粉色、青色、绿色、极简、瞄头、新手、单点、Vandal 与 Phantom；
- 新增 10 个指南搜索意图：复制、代码排错、点状/圆形制作、移动误差、射击误差、误差对比、静态/动态、点状/十字与准星预瞄；
- 新增 4 个真实可用工具：生成器、代码解析器、预览器与对比器；
- 24 个英语搜索意图同步生成四语种 canonical，共新增 96 个可索引 URL；
- 25 个待补职业选手页因缺少可验证代码、来源和日期而未发布；
- 完整 100 URL 状态见 `docs/SEO_EXPANSION_REPORT_2026-08-10.md`。

## 开发效率基线

- `pnpm task:context` 输出本次变更 Scope、风险等级和推荐检查；
- `check:quick`、`check:data`、`check:seo` 与 `check:release` 提供四档验证；
- `pnpm validate:manifest` 统一检查完整目录、156 个索引记录和 15 个集合之间的关系；
- `pnpm validate:verified-pros` 交叉检查玩家频道来源快照与正式职业配置，阻止二手候选自动发布；
- 检查报告位于 `.aimcodes-reports/current/`，只在本地和 CI 使用，不提交 Git；
- 图片生成使用内容 Hash，缓存命中只跳过重新渲染，不跳过最终图片验证；
- `automation/skills/aimcodes-maintainer/` 是 Codex Skill 的仓库内单一来源；Cursor 使用相同脚本；
- 计划、差异、QA、发布和线上结果始终需要 GPT/Cursor 审核。

## Catalog Scale Phase 1

- 新增 240 条原创有效代码，分布在 Micro Gap、Tap Dot、Compact Cross、Open Cross、Tracker、Twin Line、Pinpoint、Outer Mark、Tall Axis、Wide Axis、Burst Ring 与 Guard Frame 12 个家族；
- 不冒充职业选手代码，不通过同一形状换颜色凑数量；
- 目录首屏显示 48 项，用户可继续加载；搜索、分类、排序和随机选择仍使用全部 300 种可见造型；
- 每个家族先开放 7 个详情索引，共新增 84 个可索引准星详情；剩余页面保留 `noindex,follow`；
- 现有集合页承接新增详情，并让索引详情只推荐其他可索引详情，控制爬虫进入低价值路径；
- `sitemap-crosshairs.xml` 单独管理 400 个四语种准星详情 URL，主 Sitemap 继续汇总全部 544 个规范 URL。

## Catalog Scale Phase 2

- 在不新增重复代码的前提下，从原有 202 个 `noindex,follow` 详情中开放 50 个具有完整四语种说明、独立图片并被集合页承接的代表造型；
- 第二批原创家族仍维持 150 个索引详情护栏，本轮额外加入 6 个具备玩家控制来源的职业详情，总计 156 个；剩余 152 个详情继续保持 `noindex,follow`；
- 每个原创家族开放 11 个代表，Micro Gap 与 Tap Dot 各开放 12 个；职业详情使用独立来源快照与职业集合入口，不占用原创家族配额；
- 主 Sitemap 增至 768 个 URL，准星 Sitemap 增至 624 个 URL；图片 Sitemap 增至 684 个页面和 1,308 个图片引用；
- 职业选手采集管线发现 121 条公开候选，其中 105 条能被 AimCodes 解析，16 条进入异常清单；二手候选仍不自动发布；当前仅 7 条具有玩家控制来源的记录进入正式目录，其中 6 条为新增索引详情，Aspas 为既有详情更新。
- PR #25 的 GitHub `product-data`、`build-and-seo` 与 Netlify Deploy Preview 均通过；生产 Netlify 已确认构建提交 `06eebb6`。
- 上一生产版本已确认英/中代表详情、独立图片、OG 图和 robots 返回 200；本轮发布后需重新实测 768 / 624 / 684 页面与 1,308 个图片引用。

## 已确认验证基线

2026-08-11 第一批目录本地复核已经确认：

- ESLint 通过；
- Vite 生产构建通过；
- 四语种词条验证通过；
- 多语种路由验证通过；
- 1,364 个生成路由和 544 个主 Sitemap URL 验证通过；
- 400 个独立准星 Sitemap URL 验证通过；
- 54,723 条生成页面站内链接验证通过，无断链；
- 100 张索引准星图、115 张必需 OG 图、460 个图片 Sitemap 页面和 860 个图片引用通过自动验证；
- 4 个新增工具的代码生成、解析、无效代码拒绝与数据库代码兼容验证通过；
- 网站公开联系入口统一为 `contact@aimcodes.com`，不暴露开发者 GitHub 地址；
- 线上 `/en/`、`/es/`、`/pt-br/`、`/zh-cn/` 和渲染器均返回 200；
- 根域语言识别仍由 Netlify 直接返回 302；正式语言页正常加载时不再显示静态 SEO 兜底，脚本禁用或长时间失败时仍可回退；
- 四语种准星详情已移除用户可见的检查标签和日期，中文 Aspas 详情在桌面与 390px 手机端无横向溢出、无控制台错误；
- 三份渲染器副本 SHA-1 相同：`361c61af9ab91f965939ef7f36b05033fe1bb04f`。
- 反应测试超过 2 秒会判定为本轮超时，不计入成绩并自动重开当前轮；真实浏览器验证进度仍为 `0 / 3`；
- 渲染器可实际导出英文 Bunny 准星的 MP4、封面 PNG 和方形 PNG，手机宽度下控制项可用；
- `pnpm audit --prod` 无已知漏洞，构建链中的 `nanoid` 已锁定到修复版本。
- PR #4 的 GitHub CI、Netlify Deploy Preview 和 `main` 自动生产部署均通过；线上构建包含 `interaction_source`，四语种入口、robots.txt、sitemap.xml 与 108 个 canonical URL 已复核。
- 本轮分享增长功能已通过桌面端、390px 手机端、四语种准星详情、地图与颜色还原、语言切换保参和反应挑战结果页的真实浏览器验收；自动检查覆盖 24 个 GA4 事件和四语种分享链接。
- AdSense 准备分支已通过 ESLint、全量产品验证、生产构建、SEO/路由验证和新增 `validate:adsense`；真实浏览器在 1440px 桌面与 390px 手机宽度下无横向溢出，四语种信任页、页脚入口、robots 和广告禁用标记均符合预期。

## 当前已知问题

1. 渲染器有三份副本，尚未实现单一源自动同步。
2. GA4 已于 2026-08-12 创建事件范围自定义维度 `interaction_source` 与 `shared_entry`；自创建时起采集，预计约 24 小时后可用于标准报表。正式站支持用 `?analytics_optout=1` 将当前内部测试浏览器永久排除，访问 `?analytics_optin=1` 可恢复。
3. 第二批索引发布后应观察 21–30 天的抓取、收录、展示和长尾词分布；未验证信号前不继续开放剩余 152 个详情索引。
4. AdSense 账号、真实发布商 ID、站点验证码、付款资料和 Google 认证 CMP 尚未配置；不得在仓库中使用占位 `ca-pub-` 或占位 `ads.txt`。
5. 联系入口已统一为域名邮箱 `contact@aimcodes.com`；邮箱实际收件与回复流程需由站点所有者持续维护。
6. 职业候选库仍以二手公开来源为研究入口；只有 `data_raw/verified-pro-crosshair-sources.json` 中具备玩家频道控制证据的记录可以发布，候选日期不得描述为 AimCodes 已核验日期。
7. 每日社媒任务依赖 Buffer、AIHubMix 和 R2 凭据；凭据只在 GitHub Secrets 中维护。任一凭据到期或平台撤销授权时任务会失败并保留 Actions 报告，不会降级为未检查发布。

## GSC 赢家集群优化（2026-08-12）

- 英语 Small 页已从泛“小准星”说明升级为 small / tiny / smallest 统一搜索任务，补充可见度判断、尺寸选择与相关 FAQ；URL、canonical 和索引状态保持不变。
- 英语 Dot 页明确“纯中心点”与“微型十字替代方案”的边界，避免与 Small 页完全重叠。
- Circle 集合负责直接预览和复制现成代码；How to Make Circle 教程负责自行调整参数，二者互相链接但不争抢同一任务。
- Dot、Small、One-Tap、Circle 在四语种页面均新增相关合集入口，且相同链接已经写入预生成 HTML，搜索引擎无需等待客户端脚本即可抓取。
- 葡语 Dot 页面继续保留 `mira ponto` / `mira pontinho` 表达，并新增到 Small、One-Tap 与 Circle 集合的下一步入口。
- 自动发布门槛复核通过：1,388 个生成路由、768 个主 Sitemap URL、624 个准星 Sitemap URL、60,553 条内部链接、684 个图片 Sitemap 页面均无异常；桌面与 390px 手机端无横向溢出、无控制台错误。

## 推荐后续顺序

1. 创建/进入 AdSense 账号，添加根域 `aimcodes.com`，再把 Google 提供的真实站点验证代码交给开发者安装并提交审核。
2. GSC 已存在 `sitemap.xml`、`sitemap-crosshairs.xml` 与 `sitemap-images.xml` 提交记录；本轮发布后文件将自动更新为 768、624 与 684 个页面，下一步检查新增职业页面的抓取与 canonical。
3. 观察 21–30 天的查询、展示、排名和收录状态，优先强化排名 8–30 的页面，并根据家族表现决定是否继续开放剩余 152 个详情。
4. 通过 AdSense 审核后再配置真实 `ads.txt`、Google 认证 CMP 和少量手动广告位；禁止在反应测试与复制按钮附近投放。
