# 夜露英雄页制作与发布

2026-10-20。用户要求使用 aimcodes-agent-page 制作并直接发布当前夜露页面。本授权仅用于夜露。分支 codex/yoru-agent-page；独立工作树 /Users/alex/.codex/worktrees/yoro-agent/aimcodes-main。原 aimcodes-main 工作树的 GA4、分析、文档及其他已有改动全部跳过。复用既有 node_modules，没有安装或升级依赖。

## 页面任务与证据

核心任务：看懂分身、闪光、传送和位面移动的操作，随后预览、复制与调整主题准星。中文 Title：无畏契约夜露技能与主题准星代码 | AimCodes；H1：夜露。描述：看夜露四个技能的实机演示，了解出其不意、攻其不备、不请自来与神鬼不觉，预览、复制并调整夜露主题准星代码。

| 查询候选 | 意图 | 承接模块 |
| --- | --- | --- |
| valorant yoru abilities / 夜露技能 / ヨル アビリティ | 四技能作用、键位与限制 | 四技能卡、官方图标、实机演示 |
| yoru fakeout / 夜露分身 | 直接放出与预放、敌人摧毁后的闪光 | 出其不意 |
| yoru teleport / 夜露假传送 | 移动/固定锚索、真传送/假传送 | 不请自来 |
| yoru crosshair / 夜露主题准星 | 成品预览、复制、编辑 | 地图、1×/5×、复制、生成器 |

站内最接近的英雄页不承接夜露技能；战术板仅提供英雄/技能标记。独立教程候选为地图传送落点、反清闪和分身配合，缺少逐点实机教学，本次不扩页、不加填充 FAQ。

GA4 属性548356819、America/Los_Angeles，2026-09-22—2026-10-19，hostName=aimcodes.com、landingPage包含yoru，返回0行、无抽样。北京时间执行时账户10月19日尚未完整结束，因此此28日范围仅作初步检查，不作完整周期比较。GSC使用本地2026-10-15导出，2026-09-29—2026-10-12，1000查询/665页面未匹配yoru/夜露/ヨル；查询有截断边界，没有取得更新GSC账户查询。搜索观察发现官方技能页与技能补丁；未获得第三方搜索量，不用结果条数推算需求。

## 模板、媒体与机制

复用最新正式雷兹及已验收不死鸟的页面结构：Logo、导航、语言、面包屑、980px宽度、首图字号、四技能、展开连播、点击加载动画、三图灯箱、角色资料、AgentCrosshair完整交互。夜露局部蓝色主题以.hush-page.yoru-page覆盖共享样式，其他英雄和目录数据不修改。

- 官方技能来源：https://playvalorant.com/en-us/agents/yoru/ 的公开__NEXT_DATA__ iconTab。ja-jp、es-es、pt-br对应页面核对官方名称。国服官网公开GraphQL agent(id:14)核验出其不意/C、攻其不备/Q、不请自来/E、神鬼不觉/X。
- 技能图标、MP4原始URL保留在本地data_raw/yoru-2026-10-20/next.json。原片只读，scripts/prepare-yoru-media.mjs生成960px静音H.264视频、海报、连播及WebP图标。官方演示可能含旧HUD，不宣称当前补丁录制。
- 机制交叉核对Riot 11.08、12.05、13.01：位面内不可投闪光或放置新的分身；不写容易过期的价格、充能数量、持续秒数。https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-11-08/ 等。
- 官方动画：https://www.youtube.com/watch?v=hhlgphVf-1g ，已认证VALORANT频道《RETAKE》，2021-01-09。正常观看页真实播放后截图：48秒举枪近景、113秒穿越蓝色裂隙、145秒拿梳子肖像。所有候选先目视筛选，排除其他角色、纯手部/腿部和远景。
- 浏览器原图1200×828，纯视频内裁切left22/top74/810×330，图集960×755；首图与OG用145秒独立肖像裁切left45/top75/535×330，1920×1080及1200×630。未重绘角色，没有模型转台或网页UI。原图保留本地data_raw，中间材料data_processed，派生素材public/images/agents/yoru。
- 中文产品说明按dbs-ai-check的22项检查：体裁为短操作说明，无虚构体验、套路钩子、无用升华或硬造互动，无需为检测强改句式；不保证AI检测器结果。

## 准星与索引

蓝色四段方框：内线长度1、厚度5、间距4；外线长度4、厚度1、间距8，无中心点，带轮廓、静态。与现有短线十字、带点环、细长分段十字、四枚方块、实心加号、点加外刻度有结构区别。yoruCrosshair.js的一份完整设置生成Canvas/复制/编辑器代码。不冒充官方或选手配置，未在游戏客户端导入。

| 语言 | 路径 | 查询候选 |
| --- | --- | --- |
| en | /en/valorant-yoru/ | valorant yoru abilities / themed crosshair |
| ja | /ja/valorant-yoru/ | ヨル アビリティ / クロスヘア |
| es | /es/valorant-yoru/ | habilidades de Yoru |
| pt-BR | /pt-br/valorant-yoru/ | habilidades do Yoru / mira |
| zh-CN | /zh-cn/valorant-yoru/ | 夜露技能 / 主题准星 |

五语均自canonical、noindex,follow、无hreflang及x-default、不进入三份Sitemap；首页同语种入口可访问。不新增中文索引例外。若未来有独立索引批准，28天首评GSC查询/收录及GA4自然落地/复制，样本不足延至56天；本次不创建监控。

## 发布范围及回滚

仅提交夜露组件、局部样式、五语内容、完整准星、派生素材18项、接入、媒体处理脚本、专项验证和本记录。不上传账户报表、原始大视频、私人上下文、依赖、output或凭据。不改DNS、支付、GA4/GSC配置。实时核对生产平台为Cloudflare，通过PR与真实预览验收后合并，核对生产build-meta。回滚以恢复当前PR的专用PR为边界，保护其他英雄和用户工作树。

验证及发布结果在完成后补充。

## 本地验收

- 完整pnpm check:release 25/25通过（57.9秒）；夜露专项2/2、check-agent --index-locales none通过。第一次check:auto因最初复用的依赖缺少@netlify/blobs阻断，换用已有完整依赖后完整重跑通过，没有安装或改动依赖文件。
- 548源记录/540外观、396索引记录不变；主Sitemap1894、准星1585、图片1739均不含夜露。
- 1440px桌面与390px手机无横向溢出，H1分别64/40px，无坏图。四技能及31.42秒连播readyState4、实际播放时间推进。图集点击打开、Esc关闭、焦点返回原按钮通过。
- 地图切换到源工重镇、5×/1×通过；真实clipboard.writeText成功，界面已复制，进入同语种生成器后实际code与复制值逐字一致。
- 共享hushAgent.css临时追加末尾后，夜露技能标题rgb(145,185,255)、正文rgb(225,235,255)、按钮蓝色及hover rgb(189,215,255)保持；临时样式没有写入产品。
- 本地截图output/yoru-preview/desktop.png、mobile.png、crosshair.png、原始画面与派生图均已目视查看。

准星视觉复核后扩大框线间隔，最终加入四条独立细长外刻度，形成断框加细刻度的两层结构，避免与贤者及同期新合并的芮娜单框近似。键盘Tab实测focus-visible蓝色3px，其他英雄颜色隔离通过。

发布前主线新增芮娜(#104)，本分支完整保留芮娜接入和素材；夜露重做两层断框刻度，未改芮娜或其他英雄设置。
