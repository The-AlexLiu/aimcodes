# 2026-10-20 首页与英雄图鉴发布

分支 `codex/home-hero-directory`，基线 `1d8ae44b365d`。用户已验收并明确授权发布首页和 `/valorant-agents/` 聚合页。首页双排自动循环、悬停暂停、透明立绘；移除按钮/提示/序号和两处红框小字。复用用户图鉴并修复舞台准星居中，五语目录 noindex/follow，既有详情索引不变。原混合工作树及用户图鉴源工作树保留。

完整文件、素材来源、验证和回滚边界见 `docs/HOME_AGENT_DIRECTORY_2026-10-20.md`。发布以本 PR 合并提交、CI 和线上 `build-meta.json` 对齐为准；正式核验前不得视为已上线。

# AimCodes 工具间交接

## 2026-10-19：贤者正式接入（已授权发布）

最新精修：贤者与遐思的准星模块抽为共享 `AgentCrosshair`，保持相同地图/倍率/复制/调整/导入/目录入口；生成器新增 theme=sage 并带入完全相同的晶球参数。中文技能标题下的小备注已删除，图集换成原片 90/105/160 秒清晰贤者近景，移除可见图注并用 cover 填满缩略图容器，放大保留完整原图。全部贤者文字、链接、播放按钮和视频边框用独立青绿配色。Hush 仅改为共享准星组件包装，界面与参数保持一致；未改其文案/颜色。原始帧全部留在本地 data_raw。

模板补齐（最新，已完成本地验收）：用户追加要求按遐思最佳模板补全内容。贤者直接复用 `hushAgent.css` 的布局与交互样式，保留独立青绿主题。新增折叠四技能连续视频、角色短故事＋官方动画、三张官方剧照图集/放大弹层、折叠角色资料；底部准星维持固定代码、地图/倍率/复制/导入，增加免费目录入口。五语种和静态 HTML 同步。图库取官方原片 90/110/180 秒，连续演示为四段已有 Riot 技能片段串联，来源见媒体清单。PR #93 在补齐期间保持未合并，新版 check:release 25/25（36.381 秒）通过；40.43 秒连续视频实际播放、收起后卸载、动画入口、图集放大/Escape 关闭、复制成功、390/320px 无溢出已验证，继续已授权发布。

语言适配最终修订：按用户更正，中文主标题/面包屑只显示“贤者”，首屏为“无畏契约 / 哨卫”；技能卡仅使用中文官方名和玩家常用称呼，删除英文编号行。其他语言使用各自名称（日语为セージ），右上角保留官方图标。遐思页面未修改，留给用户另行优化。

用户追加视觉校正：主标题改为“贤者 Sage”（英文 Sage），字号/行高/间距/首屏高度对齐遐思英雄页，技能操作意图由 Title、简介和正文承接。面包屑使用短英雄名。本地旧预览入口转到正式中文 QA 路由，避免临时页头与正式布局不一致。发布前重新构建验证。

用户已授权发布并要求至少英文/中文。五语言正式路由已接入，英语唯一 index，中文及其他语言 noindex,follow，自引用 canonical；主 Sitemap 1893，仅新增 `/en/valorant-sage/`。复用主站布局，右上角使用 Riot 官方技能图标、删除字母键帽；四视频与固定原创准星均保留。已运行 check:release 25/25（39.423 秒），英文/中文桌面与 390/320px 无溢出，四视频播放、复制成功和地图/倍率通过。未改变 GA4/GSC 后台或其他中文索引政策。

分支 `codex/sage-seo-preview`，沿用同一工作目录。原始账户数据、候选图、本地预览不随正式提交；旧原工作树全部跳过。以下记录为样稿迭代历史，最终发布与线上验证待追加。

## 2026-10-19：贤者 SEO 研究与中文本地样稿（历史）

C 端文案清理：删除技能区“PC 默认键位 · 官方实机演示”、两处章节步骤标签和重复的英文原创标记。保留技能卡按键、操作、视频和准星导入说明；默认按键及来源说明继续收在页尾折叠区。仅改本地样稿。

品牌修订：预览页头与页尾改为复用主站 `BrandMark` / `BrandWordmark`，恢复正式红色准星图形与 AimCodes 大小写字标；主要按钮、焦点色、基础字体和页面背景对齐主站。薄荷绿仅保留为贤者内容点缀，补齐站点 favicon。修改 `preview/sage/main.jsx`、`sage.css`、`index.html`，未新增品牌素材；1440px/390px/320px 无溢出且 Logo 正常加载，check:auto 7/7 通过。无生产、GA4 或 GSC 变更。

最新首图：换成 VALORANT 官方《REVELATION》动画 160 秒的贤者持枪近景，新增 `hero-revelation.webp`（1280×540，仅 WebP 编码）与来源记录。桌面文字左、人物右，手机上图下文；1440px/390px/320px 浏览器验收无溢出，check:auto 7/7 通过。此前两版首图保留。仍仅本地预览，未注册索引或发布。

首屏修订：去掉背景内“03.”及其上方短横，新增 `hero-no-number.webp` 并切换图片引用；原素材保留。仅替换原图 65×68 区域，区域外像素比较为 0 差异。浏览器首屏验收及 check:auto 7/7 通过，未发布。

当前版本：按用户要求完全删除技能费用，主题准星改成固定“小环＋中心点”晶球造型；几何与遐思开放十字已比较确认不同。删除所有参数调节和重置，只保留地图/倍率预览、复制与只读代码。复制回读、320px/390px 布局及 check:auto 7/7 通过，未发布。下方较早的费用和可调整说明均已被此版本替代。

最新精简：技能卡只留作用、费用/点数、操作和视频；删除重复建议、技能跳转条与额外冰墙练习段，版本来源折叠。四个操作问题标题保留。精简后 check:auto 7/7 通过，1440px/390px/320px 无溢出，视频与准星功能保留。

追加修订：按遐思技能卡片呈现视频与讲解，增加有版本来源的购买费用/终极技能点数。视频进入视野静音循环、离开暂停，尊重减少动态效果/节流设置；桌面两列、手机单列。修订后 check:auto 7/7 通过，浏览器播放/暂停及 390px/320px 验收通过。仍为本地中文样稿。

分支 `codex/sage-seo-preview`，工作目录 `/Users/alex/.codex/worktrees/sage-seo-preview/aimcodes-main`，基线/最后已有提交 `5f35633`，本次尚未提交。入口 `http://127.0.0.1:5186/preview/sage/?qa=1`，启动命令见 `preview/sage/README.md`。只新增独立中文预览，不注册正式路由、Sitemap 或分析脚本。

已先查 GSC/GA4、当前中英搜索结果、Google 联想与中英官方资料，再选“技能基础操作”意图。宽匹配 sage 命中 usage 的 1 次无关展示已排除；精确词界查询 28 天为 0 展示/点击。没有搜索量估算。四段 Riot 视频、官方名称/默认按键、原创可调主题准星已完成，桌面/390px/320px、播放、复制和失败回退已验证。最终完整检查 25/25 通过，Sitemap 保持 1,892 条。研究、元数据、查询映射、证据边界、全部验证和 28/56 天观察方案见 `docs/SEO_SAGE_PLAN_2026-10-19.md`。

下一步需用户确认正式语言：建议英语首发索引；若中文承接流量，需批准仅贤者 URL 的中文索引例外。之后再做五语种正式接入、初始 HTML、canonical/hreflang、Sitemap 和获授权发布。不能把当前本地预览当作 SEO 已上线。未推送、未建 PR、未部署；旧埋点工作树未动。

## 2026-10-19：遐思主题准星与移除浮窗（已授权发布）

Hush 页面底部新增 AimCodes 原创主题准星，支持三地图、1×/5×预览、一键复制与带入生成器；五语种和静态内容同步。移除全站 FinderNudge 挂载与触发信号，保留常规反应测试入口及复制提示。主题代码经解析验证，浏览器复制结果与生成器代码完全一致；桌面、390px/320px 无溢出。完整检查 25/25 通过（54.7 秒），Sitemap 仍为 1892 条。用户已授权上线；发布前基线 `91feeac`，最终 Cloudflare 构建与线上提交见本次 PR。详情见 `docs/HUSH_THEME_CROSSHAIR_2026-10-19.md`。

## 2026-10-19：共享授权恢复与 Cloudflare 自动发布

用户明确授权重新安装共享 GitHub 应用；旧失效安装已移除，用户完成新的 Install & Authorize。`The-AlexLiu/aimcodes` 已重新连接到生产 Worker `aimcodes`，构建触发器 `86c09b4a-138a-4436-8702-45384a184165` 仅匹配 `main`，根目录 `/`，构建 `pnpm build:cloudflare`，部署 `pnpm deploy:cloudflare`。Netlify 自动构建继续停止。

首次云端验证构建 `2d0691ec-ed50-47c5-8017-e8dceb94ae86` 已成功，部署版本 `625e73ef-1cfc-4602-ba81-779e32356764`。分支预览使用固定版本 `npx --yes wrangler@4.151.1 preview` 与 `pnpm build:cloudflare`；`wrangler.jsonc` 显式声明预览变量 `CONTEXT=deploy-preview` 并启用预览 URL。生产 CLI 同样固定 4.151.1。未修改其他 Worker 的部署配置。此记录取代下方“共享授权未修复、只能手动发布”的历史限制。本轮完整发布检查 25/25 通过（81.2 秒），正式域名的默认网络访问已读回 Hush 发布提交，大招视频实际播放正常，页面无购买入口。

## 已上线核验：2026-10-19

PR #90 已合并，正式代码 `dae95d0eb2ba3fab730a3309d6de55aa92afa7f1`。先验证免费基线，再发布 Hush，Cloudflare 正式 Worker 版本 `dce53821-f3ef-44ae-87c6-9b273a57df9b`。通过 Cloudflare 公共 DNS 的 HTTPS 请求确认 build-meta 与合并提交一致；本机默认递归 DNS 仍缓存旧 Netlify 地址，不能把本地旧响应误判为部署失败。

五语种 Hush 均为 200；canonical 和既有语言索引政策正常（英语/日语 index，中文/西语/葡语 noindex）。主 Sitemap 1892、准星 Sitemap 1585、图片 Sitemap 1739，robots 正常。五段 MP4 均可下载，浏览器预览技能与大招播放成功；服务端目前对 Range 请求返回完整 200 文件，不能声称已验证 206。390px 手机及桌面布局无横向溢出，桌面大招卡占满整行。

购买/领取/找回/退款旧地址转免费库并清除查询参数，支付 API 410，www 正确跳转根域。除两条网站来源记录外，其余 11 条 DNS 记录逐项对比均未变化。Netlify 自动构建停止，旧站和历史数据保留；未读取或迁移支付凭据、未修改 GA4/GSC 设置。原用户工作树与未提交原始媒体均未处理。

自动发布尚未接通：Cloudflare 构建 API 返回 Git 账户 disconnected（8000008），尽管 GitHub 应用已安装。当前账户 9 个 Worker 均无构建触发器。共享 GitHub 应用重装可能影响其他账户/项目，未执行；已向用户询问保留手动发布还是修复共享授权。当前可用的发布方式为 `pnpm build:cloudflare` + `pnpm deploy:cloudflare`。

## 2026-10-19：Cloudflare 迁移与永久免费准星库

准星包售卖永久取消：五语种购买、领取、找回及退款入口已移除，旧链接 301 跳转免费准星库并清除查询参数，旧 API 返回 410。历史支付代码和 Netlify 数据仅保留存档，不迁移凭据或订单，不再接入支付。

免费基线已部署到 Cloudflare Worker `aimcodes`，版本 `6b9f7c82-a348-4f50-be0f-cca5b060858d`，标记 `2b75ffe…-free-migration`。权威 DNS 与 1.1.1.1 已指向 Cloudflare；定向访问新边缘验证五语言首页、1890 条主 Sitemap、robots、404 和旧购买跳转均正常。部分本地 DNS 缓存仍指向旧站，须待传播后再次普通访问验证。Netlify 自动构建已停止，原站保留；邮箱记录保持不变。

Hush 与取消售卖代码位于 `codex/hush-agent-page`、PR #90；完整发布检查 25/25、Cloudflare 测试 4/4、两项 GitHub CI 通过。Cloudflare Hush 预览版本 `12a5de54-4728-4e86-9d0d-0808d55368c8` 已验证五个视频、手机无溢出及无购买入口。正式 Hush 发布与 Cloudflare 自动发布连接仍需完成。部署方式为 `pnpm build:cloudflare` 后 `pnpm deploy:cloudflare`，不得恢复 Netlify 自动发布。以下较早的付费 MVP 与 Netlify 发布记录均为历史状态。

最后更新：2026-10-14

## 多语种巡检修复（2026-10-14，本地待发布）

分支 `codex/localization-audit-oct14`，最后提交/基线 `ae87bd957d36e4260e5ea20d10ed0e6477ebda02`，本轮修改尚未提交。五语种内容补齐、地图及付费页面本地化、集合场景和数量口径修复已完成；完整 release 25/25、语言回归 16/16、支付回归 24/24 通过。桌面/窄屏 DOM 检查通过，截图接口超时，发布预览需补视觉与键盘焦点验收。未推送、未创建 PR、未部署，未清理旧目录。旧工作树未提交修改全部保留。详情见 `docs/LOCALIZATION_FIXES_2026-10-14.md` 和 `docs/WORKTREE_CLEANUP_REVIEW_2026-10-14.md`。



## 基建保护修复（2026-10-13）

当前任务分支 codex/infrastructure-guardrails，基于 main 60e1ac9；旧 GA4 工作树及用户修改未动。支付 CI、函数高风险任务分类、社媒安全 preflight 和禁止写入的 dry-run 已实现。本地完整 release 25/25、支付回归24项与社媒诊断11项通过。

main 保护已由 GitHub API 保存并读回：两项 GitHub Actions 必需检查 product-data / build-and-seo，strict、PR、讨论解决、管理员约束，禁止强推/删除；不要求另一位审批者。原先 main 无保护。

社媒根因为 Buffer key 在9月12日过期，现已原生再生成并更新 GitHub BUFFER_API_KEY；新版个人密钥默认11项权限，当前界面没有收窄入口；旧密钥仅三项，不能声称权限未变化。界面到期日2027-10-13。非敏感变量 BUFFER_API_KEY_EXPIRES_AT 供每日检查提前14天提示。未读取、写文件或输出密钥。

PR #87 的产品提交 ae20dbb 已通过两项GitHub CI、Netlify预览和完整社媒dry-run 38499401850：13项服务检查通过，三平台各3/3、合计9/9，全部状态dry_run，writeEnabled=false；没有发帖或R2写入。改用可用的gemini-2.5-flash-lite视觉模型，并按真实封面及成绩时间轴校验。main保护和Secret更新已生效；代码合并与生产发布待用户明确授权。详见 docs/INFRASTRUCTURE_FIXES_2026-10-13.md。未补发帖子、未付款、未升级或迁移。

## 当前交接重点：付费 MVP

- 产品：`AimCodes Crosshair Pack`，一次性 USD 1.99；
- 入口：反应测试结果页；交付：5 款准星、2 次重新生成、3 个保留版本；
- 支付：Whop Checkout；正式站只使用生产 Whop，Deploy Preview 只使用 Sandbox；
- 权益：签名 Webhook 确认付款后写入 Netlify Blobs，付款 ID 幂等；浏览器 Claim 只在完成付款后签发；
- 隐私与 SEO：私有页面和 API 均为 `noindex`、`no-store`，邮箱不进入公开 URL 或前端持久存储；
- 2026-09-13 沙盒端到端验证通过：付款、Webhook、自动交付、5 款准星、两次重新生成与额度归零均正常；
- Resend 与 GA4 服务端购买事件属于可选增强，只有配置对应密钥后启用；密钥只保存在托管平台 Secret 中，不进入 Git、文档或 Skill。

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
- 最近产品代码生产提交：`c6307d5`
- 最近产品代码发布 PR：<https://github.com/The-AlexLiu/aimcodes/pull/42>
- 当前生产内容已包含 SEO Knowledge Base Phase 1、四个真实工具、图片 SEO、独立准星图片和 `sitemap-images.xml`。
- PR <https://github.com/The-AlexLiu/aimcodes/pull/16> 已将目录扩展为 302 条源代码、300 种可见造型；构建生成 1,364 条四语种路由、544 条主 Sitemap URL 和 400 条独立准星 Sitemap URL。
- PR <https://github.com/The-AlexLiu/aimcodes/pull/17> 加入变更范围识别、分级验证、结构化报告、图片增量生成和 `aimcodes-maintainer` Skill。
- PR <https://github.com/The-AlexLiu/aimcodes/pull/18> 新增 `src/data/catalogManifest.js` 与 `pnpm validate:manifest`，图片、Sitemap、集合和索引详情从同一清单派生；`App.jsx` 只保留全局编排，目录视图模型和主要展示区域已拆分。
- PR <https://github.com/The-AlexLiu/aimcodes/pull/22> 移除四语种准星详情的检查标签与日期，生成器改用玩家试枪提示，并让静态 SEO 兜底只在脚本禁用或加载长时间失败时显示，消除语言首页加载闪屏。
- 2026-08-12 第二批目录索引把可索引详情由 100 个提升到 150 个；主 Sitemap 为 744 条、准星 Sitemap 为 600 条、图片 Sitemap 为 660 个页面和 1,260 个图片引用。
- 2026-08-12 首批一手来源职业配置新增 Sacy、Saadhak、mwzera、Cortezia、Sato、Tteuw，并更新 Aspas；构建基线为 308 条源代码、300 种普通目录可见样式、156 个索引详情、768 条主 Sitemap URL、624 条准星 Sitemap URL、684 个图片 Sitemap 页面和 1,308 个图片引用。
- 2026-08-17 Catalog Scale Phase 3 在保持旧记录稳定的前提下新增 100 个原创不同形态；当前开发基线为 408 条源代码、400 种普通目录可见样式、256 个索引详情、1,248 条主 Sitemap URL、1,024 条准星 Sitemap URL、1,124 个图片 Sitemap 页面和 2,148 个图片引用。
- 2026-08-17 日语本地化已通过 PR #40 发布到生产提交 `4a3a2b3`；新增 `/ja/`、日语设备跳转、五语种 UI 与 408 条准星本地化。线上基线为 2,335 个本地化路由、1,560 条主 Sitemap URL、1,280 条准星 Sitemap URL、1,405 个图片 Sitemap 页面和 2,685 个图片引用。
- 2026-08-17 每日社媒工作流新增视觉误判复核、每时段 3 次质量重试、跨频道故障隔离和 Instagram / TikTok / YouTube 各 3 条的最终配额门；质量分仍必须达到 90，重跑继续使用 R2 Manifest 防重复。PR #42 已发布到 `c6307d5`，正式工作流 #32008397022 已确认三平台各 3/3、合计 9 条进入 Buffer。
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
- GA4 已创建事件范围自定义维度 `interaction_source`、`shared_entry`、`content_type` 和 `method`；其余维度和自定义指标按实际报表需求逐步添加，避免占满配额。
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
- 25 个 GA4 漏斗事件验证通过，成功分享统一使用 `share`，未采集原始搜索词；
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


## 已发布：2026-10-09 Microsoft Clarity 与依赖漏洞修复

Clarity 项目 `yuxaq5sl26` 已通过 PR #81 发布到生产提交 `ea03ba732507051ffa7e5b269f8ba0115ae942d9`，Netlify 部署 `6ac8a114cdb8b80008389f88` ready，正式站 build-meta.json 与提交一致。Clarity 仅在正式域名异步加载，排除 QA、opt-out、预览环境、付费交付/找回页面及敏感链接；默认 consentv2 denied，无 Cookie 模式。五语种隐私说明已同步，付费隐私说明保留。

完整 release 检查 25/25、10 项 Clarity 测试、GitHub 两项 CI 和 Netlify Deploy Preview 均通过；`source-map-js` 已固定到 1.2.2，依赖审计无已知漏洞。正式浏览器 tag 请求为 200，两个 collect 请求返回 204；QA 持续排除、opt-out 与交付/找回页均为零 Clarity 请求。英语首页、中日隐私页、准星图片、robots 与 Sitemap 均返回 200；Sitemap 保持 1,887 个 URL。Clarity 后台随后识别到 1 位在线验收用户；历史回放与热力图仍待汇总处理，尚未验证历史回放可查看。

本次发布从最新主线建立独立分支 `codex/clarity-release`；旧 GA4 审计工作树及全部未提交用户修改均保留。未修改 GA4 后台、GSC、支付逻辑或执行真实付款。详见 `docs/CLARITY_SETUP_2026-10-09.md`。
