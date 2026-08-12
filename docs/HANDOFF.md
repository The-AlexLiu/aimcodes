# AimCodes 工具间交接

最后更新：2026-08-12

## 当前交接目标

把 AimCodes 从依赖单一 GPT/Codex 长对话的开发方式，迁移为 GPT/Codex 与 Cursor 都能从 GitHub 恢复上下文的协作方式。

## 本次已经整理

- 根目录共享智能体规则 `AGENTS.md`；
- 协作流程 `CONTRIBUTING.md`；
- 产品背景、架构、状态、决策、发布和权限文档；
- Cursor 协作接管验证与固定协议；
- 可共享的团队上下文规范。

## 当前分支与提交

- 当前生产基线分支：`main`
- 最近产品代码生产提交：`06eebb6`
- 最近产品代码发布 PR：<https://github.com/The-AlexLiu/aimcodes/pull/25>
- 当前生产内容已包含 SEO Knowledge Base Phase 1、四个真实工具、图片 SEO、独立准星图片和 `sitemap-images.xml`。
- PR <https://github.com/The-AlexLiu/aimcodes/pull/16> 已将目录扩展为 302 条源代码、300 种可见造型；构建生成 1,364 条四语种路由、544 条主 Sitemap URL 和 400 条独立准星 Sitemap URL。
- PR <https://github.com/The-AlexLiu/aimcodes/pull/17> 加入变更范围识别、分级验证、结构化报告、图片增量生成和 `aimcodes-maintainer` Skill。
- PR <https://github.com/The-AlexLiu/aimcodes/pull/18> 新增 `src/data/catalogManifest.js` 与 `pnpm validate:manifest`，图片、Sitemap、集合和索引详情从同一清单派生；`App.jsx` 只保留全局编排，目录视图模型和主要展示区域已拆分。
- PR <https://github.com/The-AlexLiu/aimcodes/pull/22> 移除四语种准星详情的检查标签与日期，生成器改用玩家试枪提示，并让静态 SEO 兜底只在脚本禁用或加载长时间失败时显示，消除语言首页加载闪屏。
- 2026-08-12 第二批目录索引把可索引详情由 100 个提升到 150 个；主 Sitemap 为 744 条、准星 Sitemap 为 600 条、图片 Sitemap 为 660 个页面和 1,260 个图片引用。
- 2026-08-12 首批一手来源职业配置新增 Sacy、Saadhak、mwzera、Cortezia、Sato、Tteuw，并更新 Aspas；构建基线为 308 条源代码、300 种普通目录可见样式、156 个索引详情、768 条主 Sitemap URL、624 条准星 Sitemap URL、684 个图片 Sitemap 页面和 1,308 个图片引用。
- 职业候选管线共发现 121 条公开线索，105 条可解析，16 条异常单独保留；全部等待一手来源，尚未发布职业玩家页。

## Cursor 接手时第一步

1. 先只读，不修改文件。
2. 阅读 `AGENTS.md` 和 `docs/CURRENT_STATE.md`，运行 `pnpm task:context`，再按 Scope 读取相关文档。
3. 运行 `git status -sb`、`git diff --stat` 和 `git log --oneline -8`。
4. 阅读 `.aimcodes-reports/current/scope.md`，由 GPT/Cursor 复核自动风险判断。
5. 识别本地新增提交与远端分支、生产部署之间的差异。
6. 未获得明确授权前，不提交、不推送、不合并、不部署。

## 尚未完成

- 渲染器尚未完成单一源自动同步；
- 页面类型懒加载和代码分包已完成第一轮；当前入口包约 382 kB（gzip 约 124 kB），后续继续以性能预算防止回退；
- GA4 后台尚未创建计划中的自定义维度和指标，需包含 `interaction_source` 和 `shared_entry`。
- 本轮 5 类四语种 SEO 集合页、2 类四语种知识指南、扩充后的导入指南、16 个可索引准星详情和 108 URL sitemap 已发布，后续需观察 GSC 收录与查询数据。
- AdSense 代码层准备已通过 PR #11 发布；还需账号所有者在 Google 后台完成年龄/身份/付款信息、添加根域，并提供真实站点验证代码。
- Google 认证 CMP 与真实 `ads.txt` 必须等到获得 AdSense 账号和发布商 ID 后配置，不能使用占位值。
- 公开联系渠道统一为 `contact@aimcodes.com`，不得向普通用户暴露开发者 GitHub 地址。
- 25 个新增职业选手页仍缺少可验证代码、来源与日期，保持未发布状态；不得为了页面数量编造数据。
- 随机准星、颜色选择器、灵敏度转换器和 eDPI 计算器尚未达到真实工具上线标准，继续保持 Draft。

## 本次验证结果

共享记忆包创建后已经确认：

- 新增文档与 Cursor 规则不存在本机绝对路径；
- 未发现 Token、API Key、私钥或其他凭据值；
- `git diff --check` 通过；
- `pnpm lint` 通过；
- 62 条准星源代码、60 种可见样式验证通过；
- 9 个连续反应段位和推荐 ID 验证通过；
- 4 语种词典和 62 条准星本地化验证通过；
- 24 个 GA4 漏斗事件验证通过，未采集原始搜索词；
- 四语种准星分享链接、地图与颜色还原、UTM 归因和不支持系统分享时的复制保护验证通过；
- 站内分析事件已避免使用保留渠道字段，统一改用 `interaction_source`；
- Vite 生产构建通过；
- 生成 308 个本地化 HTML 路由和 112 个 sitemap URL；
- SEO 与四语种路由验证通过。
- 反应测试的超长等待不会再生成异常成绩，超过 2 秒会重开当前轮；
- 渲染器的 MP4、封面 PNG、方形 PNG 已通过真实浏览器导出测试；
- `pnpm audit --prod` 无已知漏洞。
- AdSense 准备分支新增的 `pnpm validate:adsense` 通过；构建生成 308 个本地化 HTML 路由和 112 个 sitemap URL。
- 新增四语种关于/审核方法、隐私、条款和联系页；首页与目录页新增原创选型说明；未来广告使用页面白名单并排除反应测试、错误页、政策页和薄内容页。
- 1440px 桌面与 390px 手机真实浏览器验收无横向溢出，四语种信任页语言、robots、页脚入口和广告禁用标记正确，浏览器控制台无错误或警告。
- SEO Knowledge Base Phase 1 构建生成 404 个本地化 HTML 路由和 208 个 sitemap URL；12,699 条站内链接无断链。
- 新增生成器、代码解析器、预览器和对比器均为真实可操作工具；无效准星代码不会渲染伪造结果。
- 图片生成与 SEO 验证脚本通过：62 张 1080 × 1080 WebP、77 张 1200 × 630 JPG、124 个图片 Sitemap 页面和 188 个图片引用；桌面与手机代表页面保持原有布局。
- 准星规模化候选版本验证通过：302 条代码、300 种样式、1,364 个本地化路由、544 个规范 URL、400 个准星 Sitemap URL、54,723 条无断链内部链接、100 张索引准星图、115 张必需 OG 图、460 个图片 Sitemap 页面与 860 个图片引用。

## 最近产品代码生产发布

- 发布时间：2026-08-12；
- 对应功能提交：`06eebb6`；
- 对应 PR：<https://github.com/The-AlexLiu/aimcodes/pull/25>；
- 发布方式：GitHub `main` 合并后由 Netlify 自动构建发布；
- 正式域名：<https://aimcodes.com>；
- 发布后已确认英、中代表新详情与既有 TenZ 详情、独立图片、OG 图、robots 和 canonical 正常；主 Sitemap 744 条、准星 Sitemap 600 条、图片 Sitemap 660 个页面与 1,260 个图片引用均可访问。

## 已发布的分享增长功能

- 准星详情新增一个明确的“发给队友”动作；
- 深层链接保留当前语言、准星、地图、颜色和分享归因；
- 接收方进入后还原预览，同时记录 `share_landing`；
- 浏览器支持系统分享时直接调用，不支持时复制准星名称、可用代码和链接；
- 反应结果页分享文案改为三轮队友挑战语境；
- 语言切换会保留准星分享和反应挑战上下文；
- 已通过 390px 手机端、桌面端及英、西、葡、中四语种真实浏览器验收，并于 2026-08-10 发布生产。

## 下一任务推荐

代码层与生产发布完成后，继续账号侧提交与数据观察：

1. 在 AdSense 中添加 `aimcodes.com`，取得真实站点验证码后单独安装并提交审核；
2. 审核通过后配置真实 `ads.txt`、Google CMP 和手动广告位；
3. 继续观察 7–14 天的 GSC 与 GA4 数据，再按 `docs/CONTENT_ROADMAP.md` 的触发条件实现 P1。

## 交接原则

聊天只用于讨论；长期事实必须回写仓库文档。任务只在可验证的 Git 提交点交接，不在两个工具同时编辑同一工作树时交接。
