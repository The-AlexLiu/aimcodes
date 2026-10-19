> 发布阶段：用户已明确批准当前幽影页面发布。五语继续 noindex,follow，不进入 Sitemap。下文本地阶段记录保留；发布结果见文末及对应 PR。

# 幽影英雄页本地样稿

日期：2026-10-19。分支 `codex/omen-agent-preview`，基于 `origin/main` 的 `4ff4e41bc477d4732fde250745d9a2b43dfaa8d7`。工作目录 `/Users/alex/.codex/worktrees/omen-agent-preview/aimcodes-main`。

本次只制作本地样稿，未提交、推送、建 PR 或部署。原 `aimcodes-main` 中的埋点、文档和未跟踪资料均跳过。新工作树使用已有 node_modules 的软链接，没有安装或升级依赖。

## 意图与内容

核心任务：快速看懂幽影的烟雾、视野收缩与传送操作，并试用主题准星。

| 查询候选 | 用户意图 | 页面模块 |
| --- | --- | --- |
| 无畏契约幽影技能 / valorant omen abilities | 看技能与基本操作 | 四张技能卡、官方实机视频 |
| 幽影黑瘴怎么放 / omen smoke controls | 调整远近与释放 | 黑瘴卡 |
| 幽影暗魇 / omen paranoia | 穿墙、视野收缩、队友影响 | 暗魇卡 |
| 幽影传送 / omen teleport | 短传送和全图传送区别 | 践影、离魂 |
| 幽影主题准星 / omen themed crosshair | 预览、复制、调整 | 真实 Canvas、地图切换、编辑器 |

中文 Title：无畏契约幽影技能与主题准星代码 | AimCodes。H1：幽影。
描述：看幽影四个技能的实机演示，了解黑瘴落点、暗魇和传送操作，预览并复制幽影主题准星代码。

英文 Title：VALORANT Omen Abilities & Themed Crosshair Code | AimCodes。
独立教程候选：各地图封烟位置、单向烟、暗魇配合进点、传送落点风险。本次不新增这些教程，也不添加无证据 FAQ。
最接近的站内页面：不死鸟、贤者、遐思英雄页；它们不介绍幽影技能。战术板只提供标记用途。

## 证据边界

- GA4 属性 `548356819`，America/Los_Angeles，2026-09-19 至 2026-10-16，hostName 精确限定 aimcodes.com，落地路径匹配 omen / 幽影 / オーメン，返回 0 行；无抽样。只说明该窗口无此类落地记录，不代表关键词无需求。
- GSC 使用本地已有 `data_raw/traffic-audit-2026-10-15/gsc.zip`，2026-09-29 至 2026-10-12。查询／页面导出未命中 omen、幽影、オーメン；导出有截断边界，本次未取得更新账户报告。
- 2026-10-19 Google 联想：valorant omen 有 abilities、lore、wallpaper、voice lines 等；valorant omen abilities 有 skills 等。无畏契约 幽影返回紧凑写法。联想原文存本地 data_raw，不把联想或结果条数当搜索量。
- 搜索观察可见 Riot 英雄资料与技能介绍／攻略结果。未取得第三方搜索量，不编造预计流量。

## 模板与媒体

以最新正式源码的不死鸟页为模板，复用品牌导航、面包屑、语言切换、980px 内容宽度、技能视频、展开连播、点击加载动画、图集灯箱、角色资料和 AgentCrosshair 全功能。四技能按 C/Q/E/X 排列；不死鸟、贤者、遐思的源码和准星配置均不修改。紫蓝色主题用 `.hush-page.omen-page` 保持优先级，不依赖样式加载顺序。

事实及媒体来源：

- [Riot 幽影页](https://playvalorant.com/en-us/agents/omen/)：四技能图标和 MP4；英、日、西、巴葡官方名称分别核对对应语种页面。
- [国服官方资料](https://val.qq.com/game-data.html?pageType=1&heroId=4)：沿官网 common.js 指定公开只读接口查询，核实践影／暗魇／黑瘴／离魂、C/Q/E/X 和操作。
- [官方 13.00 更新](https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-13-00/)：短传送声音的可辨识性调整。页面只说明附近敌人能听到，不承诺无声传送。
- [RECKONING 官方动画](https://www.youtube.com/watch?v=q2eLOupmraQ)：VALORANT 已认证频道，实际播放确认。首图 275 秒；图集 145 秒（蹲姿）、185 秒（持枪对峙）、200 秒（面罩近景）。从正常浏览器播放截取纯画面，隐藏字幕与控件，未用模型正背面或设定 demo。
- 原始素材留在本地 `data_raw/omen-2026-10-19/`；逐项 URL、尺寸、时码和处理记入 `sources.json`。部署素材在 `public/images/agents/omen/`，不需要原始资料才能运行。
- 官方技能视频仍为旧版 HUD／演示。英文官网暗魇描述仍写立即发射，与当前国服“装备后射击”不同；文案以国服当前操作为准，不宣称视频代表当前补丁。未写技能价格、点数或易过期数值。

准星：四枚分离的紫蓝方块、中心留空；关闭内线与中心点，外线长度／粗细／间距 3/3/4。完整配置由 omenCrosshair.js 生成代码，同一代码用于 Canvas、复制、编辑器。不是官方或职业选手配置；没有在游戏客户端实际导入，不能称实机准星验证。

中文产品文案按 dbs-ai-check 的 22 条特征检查，未发现需要修改的虚构体验、套路开头、关键词堆砌或翻译腔；不保证 AI 检测器结果。

## 五语及索引

| 语言 | 本地路径 | 目标候选 |
| --- | --- | --- |
| 中文 | /zh-cn/valorant-omen/ | 幽影技能、主题准星 |
| 英语 | /en/valorant-omen/ | valorant omen abilities / themed crosshair |
| 日语 | /ja/valorant-omen/ | オーメン アビリティ / クロスヘア |
| 西语 | /es/valorant-omen/ | habilidades de Omen |
| 巴葡 | /pt-br/valorant-omen/ | habilidades do Omen / mira |

五语均 noindex,follow；canonical 均指向 aimcodes.com 同语种自身路径。无 hreflang/x-default；三份 Sitemap 全部排除。首页增加同语种入口。后续发布与索引分别取得授权，中文若要索引仍需政策例外。
索引若批准，28 天后首评 GSC 查询簇展示／点击、收录，以及 GA4 自然落地与复制／生成器使用；样本不足延至 56 天。不因本地验收推断搜索增长，不自动创建监控。

## 验证

预览：http://127.0.0.1:4196/zh-cn/valorant-omen/?qa=1
截图与交互记录：本地 `output/omen-preview/`。

`pnpm check:auto` 选择完整 release 套件，25 项通过，含 lint、build、准星、manifest、finder、语言、SEO、路由、链接、埋点及图片。`scripts/test-omen-agent.mjs` 两项通过；辅助 check-agent 的 none 索引检查五语通过。最终浏览器结果见后续补充。

无 GitHub、Cloudflare、Netlify、GA4、GSC 或生产站配置变更。正式发布、游戏内导入、搜索收录与增长均未验证。

### 正式构建浏览器补充

- 桌面 1440px、手机 390px：首图人物、正文、图集裁切已逐图查看；H1 实际分别为 64px / 40px，与已验收模板一致。
- 五语切换在实际页面完成，等待 React 绘制稳定后核对标题、lang、路由及手机宽度。切换瞬间读取出现过旧布局尺寸；稳定后无横向溢出，没有据此添加遮盖式 CSS。
- 四段技能视频 readyState=4、时间分别推进至 2.81 / 2.80 / 3.34 / 0.65 秒；展开连播推进至 0.31 秒。图集点击放大、Esc 关闭、焦点返回原按钮通过。
- 复制显示“已复制”；记录传入浏览器 clipboard.writeText 的代码，与编辑器实际 code 文本逐字一致。编辑器外线为 3/3/4，内线与中心点关闭。地图切换到源工重镇、1×/5× 切换通过。
- 相同亚海悬城、相同 1×/5× 比较四英雄：幽影为四枚分离方块，遐思为四条短线，贤者为环状加点，不死鸟为分段细十字。见 `output/omen-preview/shape-comparison.png`。
- 先后打开遐思、贤者、不死鸟、幽影，并从首页实际入口进入。把完整共享 hushAgent.css 临时追加至文档末尾后，幽影技能标题仍为 rgb(178,172,255)、正文 rgb(229,227,246)、卡片上边框 rgb(143,133,218)；按钮正常 rgb(178,172,255)，悬停 rgb(208,205,255)，键盘焦点紫蓝色。临时样式没有写入产品。
- YouTube 官方观看页已实播，但隐私增强 iframe 在本地验收时出现“登录，以便确认不是机器人”。已停止该嵌入操作，未绕过验证；保留正常官方外链。不能声称内嵌动画在此浏览器端到端通过。

新增：`OmenAgentPage.jsx`、`omenAgent.css`、`omenCrosshair.js`、`omenContent.js`、本记录、`test-omen-agent.mjs` 和 `public/images/agents/omen/` 媒体。修改九个现有接入文件：文章分派、首页入口、编辑器主题初始化、文章内容入口、资源名称、元数据、路由、静态 HTML 和语言验证。目录准星数量、其他英雄配置、支付和追踪均未修改。

## 发布授权与回滚边界

用户于 2026-10-19 批准当前页面上线。发布基线 `4ff4e41bc477d4732fde250745d9a2b43dfaa8d7`，当前生产平台 Cloudflare Workers Builds，主分支自动发布已接通。仅发布本页和必要入口；不恢复 Netlify 构建，不修改 DNS、追踪、支付或其他英雄。

五语 canonical 保持自身正式路径，robots 均 noindex,follow，无 hreflang，主 Sitemap 1,894、准星 Sitemap 1,585、图片 Sitemap 1,739（发布后再核验）。回滚可使用恢复至上述基线的 PR 或 Cloudflare 已知上一个生产版本，不操作其他工作树。
