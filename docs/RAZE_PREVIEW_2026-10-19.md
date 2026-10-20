# 雷兹英雄页本地样稿

2026-10-19。分支 `codex/raze-agent-preview`，基线 `eb82683e8b093d79fb4df4451a3cf6355e0909f0`；工作树 `/Users/alex/.codex/worktrees/raze-agent-preview/aimcodes-main`。只做本地样稿，没有提交、推送、PR、部署、索引或分析后台变更。原始 aimcodes-main 的所有既有修改均跳过。复用现成 node_modules，没有安装或升级依赖。

## 意图及模板

核心任务：看懂雷兹的探角、爆炸物与位移操作，然后预览、复制、调整主题准星。

| 查询候选 | 意图 | 模块 |
| --- | --- | --- |
| valorant raze abilities / 雷兹技能 / レイズ アビリティ | 四技能作用和操作 | C/Q/E/X 技能卡及实机视频 |
| raze satchel / 雷兹炸药包 | 投出与引爆、位移和坠落限制 | 惊喜翻腾卡 |
| raze boom bot / 雷兹机器人 | 地面探角、追踪与可被摧毁 | 花车巡游卡 |
| raze crosshair / 雷兹主题准星 | 预览、复制和调整 | Canvas、三地图、1×/5×、生成器 |

中文 Title：无畏契约雷兹技能与主题准星代码 | AimCodes。H1：雷兹。
描述：看雷兹四个技能的实机演示，了解花车巡游、惊喜翻腾、彩雷飞溅与晚安焰火，预览、复制并调整雷兹主题准星代码。
英文 Title：VALORANT Raze Abilities & Themed Crosshair Code | AimCodes。
独立教程候选：炸药包二连跳、地图进场路线、手雷落点；本次没有这些教程所需的独立实机教学，不扩页、不补无证据 FAQ。

站内最近承接：Phoenix、Omen 等英雄页不介绍雷兹；战术板提供技能标记，不承接教学和主题准星。
复用最新正式不死鸟/幽影页面的品牌导航、语言选择、面包屑、980px 宽度、首图字号、四技能卡、展开连播、点击加载官方动画、图集灯箱、折叠角色资料和 AgentCrosshair 全套功能。主题局限于 `.hush-page.raze-page`，保留品牌导航颜色；不死鸟、幽影、贤者、遐思配置不修改。

## 证据边界

- GA4 属性 548356819，America/Los_Angeles，2026-09-21—2026-10-18 的28个完整日，hostName 精确 aimcodes.com，landingPage 包含 raze，返回0行，无抽样。它不证明没有搜索需求。
- GSC 为本地已有 `data_raw/traffic-audit-2026-10-15/gsc.zip`：2026-09-29—2026-10-12。查询导出1000行、页面665行，未匹配 raze/雷兹/レイズ。查询存在导出截断边界，未取得更新账户查询报告。
- 2026-10-19 搜索观察发现 Riot 官方雷兹技能页及技能攻略。未取得第三方量级，不用搜索结果数量估量需求。
- 页面五语先 noindex，不用样稿验收代替搜索表现或增长结论。

## 来源与媒体

- https://playvalorant.com/en-us/agents/raze/ ：公开页面 __NEXT_DATA__ 的 iconTab 数据，四图标及四段MP4；日语/西语/巴葡分别核对 ja-jp、es-es、pt-br 对应官方页面。官方演示可能含旧HUD，不承诺是当前补丁录制。
- https://val.qq.com/game-data.html?pageType=1&heroId=3 ：官网 common.js 明示公开只读 GraphQL 接口，核对技能名、C/Q/E/X 和操作。国服名称为花车巡游、惊喜翻腾、彩雷飞溅、晚安焰火。
- https://www.youtube.com/watch?v=OyLHi34Qzv4 ：已认证 VALORANT 频道《WARM UP》，2022-01-10。正常观看页播放、定位时码后采集截图。下载工具遇到登录验证，未读取 Cookie 或尝试绕过。
- 角色帧：130秒雷兹与奇乐近景（裁左侧雷兹）、198秒贴近机器人时的侧脸、200秒持霰弹枪动作（裁左侧角色）。首图使用130秒另行裁切；没有用模型/转台/概念图填充图集。原始浏览器画面1200×503，隐藏网页周边界面后直接截图；没有重绘角色。
- 处理脚本 `scripts/prepare-raze-media.mjs` 写入 public 派生文件；原始文件在本地 data_raw，处理中间帧在 data_processed。图集960×755；首图1920×1080；OG1200×630；技能视频960×540、静音H.264，保留播放器操作。
- 中文产品文案按 dbs-ai-check 的22项检查：体裁为玩家操作说明，未发现虚构体验、套路钩子、空泛升华或需要为检测而修改的排比。不保证检测器结果。

## 准星与索引

橙色实心十字：中心闭合，内线长度5/粗3/间距0，关闭中心点及外线，静态、带轮廓。初稿的中心点加刻度与同期尚勃勒/捷风接近，已重做连通结构，不靠换色区分。与遐思短线十字、贤者宽环加点、不死鸟分段长细十字、幽影四枚方块比较。由 razeCrosshair.js 单份完整设置生成 Canvas/复制/编辑器代码；不是官方或选手设置，未在游戏客户端导入。

| 语言 | 路径 | 查询候选 |
| --- | --- | --- |
| 中文 | /zh-cn/valorant-raze/ | 雷兹技能、主题准星 |
| 英语 | /en/valorant-raze/ | valorant raze abilities / themed crosshair |
| 日语 | /ja/valorant-raze/ | レイズ アビリティ / クロスヘア |
| 西语 | /es/valorant-raze/ | habilidades de Raze |
| 巴葡 | /pt-br/valorant-raze/ | habilidades da Raze / mira |

五语均自 canonical（正式域名 aimcodes.com）、noindex,follow，无 hreflang/x-default，排除三份 Sitemap。首页新增同语种入口。未来发布与索引分别决定；中文索引需明确政策例外。若批准索引，28天首评GSC查询簇点击/展示/收录及GA4自然落地与复制，样本不足延至56天；不自动创建监控。

## 验证与交接

预览：http://127.0.0.1:4199/zh-cn/valorant-raze/?qa=1 。验证结果及截图在本地 output/raze-preview，完成后补充。

### 完成结果

- `pnpm check:auto` 自动调度 release 套件，最终25/25通过（37.3秒），包括lint、构建、准星、manifest、finder、语言、SEO范围、路由、链接、埋点和图片。最后把首页橙色入口规则移到全局样式以支持首次访问，随后再次lint及正式build通过。
- 雷兹专项2/2通过；辅助check-agent的五语、媒体、代码往返与none索引检查通过。548源记录/540外观未变。主Sitemap1894、准星1585、图片1739均不含雷兹；五语静态canonical自身、noindex,follow、无hreflang。
- 正式构建：1440px桌面H1为64px，390px手机为40px；五语实际切换均无横向溢出。三张图全部加载、cover铺满；第二张使用下侧焦点保留脸部。
- 四技能视频readyState=4，实测时间推进；连播42.733秒且实播推进至1.81秒。图集灯箱点击、Esc关闭与焦点返回原按钮通过。
- 实际剪贴板写入成功，界面“已复制”；进入同语种生成器后的完整代码与复制结果逐字一致。地图切换至源工重镇和1×/5×通过，最终回到亚海悬城。
- 同地图同倍率对比遐思、贤者、不死鸟、幽影、雷兹，实际Canvas图像留在 `output/raze-preview/shape-comparison.png`。雷兹中心连通，与其他四页的开口/分段/环/方块结构有明显区别；同时只读核对了同期捷风、尚勃勒、炼狱、蝰蛇配置，未修改它们。
- 跨页面实际访问五英雄后，主按钮分别保持粉/青绿/橙金/紫蓝/橙色。临时把真实共享hushAgent.css追加至文档末尾，雷兹技能标题rgb(255,179,106)、正文rgb(242,228,204)、悬停rgb(255,213,163)、focus-visible橙色仍正确；临时CSS未写入产品。
- YouTube正常官方观看页能播放并定位；本站隐私增强内嵌在此浏览器要求“登录，以便确认不是聊天机器人”。已停止内嵌测试，保留官方观看外链；不能声称内嵌动画端到端通过。没有游戏客户端导入或搜索增长验证。
- 截图：`output/raze-preview/desktop-final.png`、`mobile-final.png`、`gallery-mobile.png`、`final-crosshair.png`、`shape-comparison.png`；机器记录：`agent-check.json`、`editor-roundtrip.json`、`languages.json`、`indexing.json`、`theme.json`、`final-verification.json`。

新增源码：RazeAgentPage.jsx、razeAgent.css、razeCrosshair.js、razeContent.js；新增public英雄派生素材18项、媒体处理脚本、专项测试及本记录。接入修改：文章分派、首页目录、生成器、articles、resourceLabels、metadata、routes、静态HTML生成、语言验证及首页入口全局样式。eslint仅增加本任务data_raw目录忽略，避免把保留的官方原始网页脚本当产品源码检查；其余产品规则保留。

GitHub、Cloudflare、Netlify、GA4/GSC后台与生产站零写入；未提交或发布。原工作树全部既有修改跳过。当前主线有其他英雄任务继续前进，本样稿基于文首固定提交；若后续批准发布，先在本分支整合届时主线，再重新跑完整检查及真实平台预览，不能覆盖其他英雄。

## 发布授权（2026-10-20）

用户明确批准发布当前雷兹页面。五语继续noindex,follow，不新增中文索引例外。仅发布雷兹源码、派生素材、必要入口及交接资料；不上传原始视频、账户数据、私人档案、node_modules或output。整合最新主线后重新完整检查、实际Cloudflare预览；通过后合并，核对正式域名的提交、五语页面、媒体、复制/编辑器、手机及索引状态。回滚为恢复本PR的变更，不覆盖其他英雄，也不调整DNS、支付或追踪设置。
