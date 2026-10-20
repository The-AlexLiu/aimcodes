# 铁臂技能与主题准星页面

2026-10-20；分支 `codex/breach-agent-page`，基线 `181efd4`；独立工作目录 `/Users/alex/.codex/worktrees/breach-agent-page/aimcodes-main`。用户已明确授权制作后直接发布当前页面。原始混合工作树全部既有修改跳过，复用锁定依赖，没有升级依赖。

## 页面意图

核心任务：看懂铁臂穿墙闪光、蓄力震荡与爆破清点，再预览、复制、调整橙色主题准星。

| 查询候选 | 用户任务 | 模块 |
| --- | --- | --- |
| breach abilities / 铁臂技能 / ブリーチ アビリティ | 作用、操作和限制 | C/Q/E/X四技能官方图标与实机演示 |
| breach flash / fault line / 铁臂闪光 | 穿墙闪光、蓄力距离与队友配合 | Q/E技能卡、角色资料 |
| breach crosshair / 铁臂准星 | 看造型并复制调整 | 三地图、1×/5×、完整生成器 |

中文Title为“无畏契约铁臂技能与主题准星代码 | AimCodes”，H1“铁臂”。描述为“看铁臂四个技能的实机演示，了解剧震余波、闪点爆破、山崩地陷与惊雷卷地，预览、复制并调整橙色主题准星代码。”英文Title为“VALORANT Breach Abilities & Themed Crosshair Code | AimCodes”。独立教程候选是地图穿墙闪光点位；本次缺少实测教学素材，不扩页、不补无依据FAQ。

最近站内承接是战术板及其他英雄技能页，均不能替代铁臂的演示和成品。复用已上线幻棱的AgentAbilityPage/AgentCrosshair全部交互与布局：导航、Logo、语言、面包屑、首图、技能卡、合辑、动画、图集灯箱、角色资料、地图、缩放、复制、编辑器和同语种内链；仅增加铁臂局部主题。为长横臂/短竖臂保留生成器独立竖线长度，解析器和Canvas已支持该字段；其他英雄设置不变。

## 证据与索引

GA4属性548356819，America/Los_Angeles，2026-09-21—2026-10-18共28完整日，hostName精确aimcodes.com、pagePath包含breach、screenPageViews，返回0行，无抽样。历史GSC本地导出 `traffic-audit-2026-10-15/gsc.zip` 的2026-09-29—2026-10-12查询1000行/页面665行未匹配breach/铁臂/ブリーチ；存在导出截断和时效边界，没有新的GSC实时查询。2026-10-20搜索可观察到官方技能页及准星查询承接，没有第三方搜索量，不用结果数量估需求。

| 语言 | 路径 | 查询候选 |
| --- | --- | --- |
| zh-CN | /zh-cn/valorant-breach/ | 铁臂技能 / 铁臂准星 |
| en | /en/valorant-breach/ | breach abilities / themed crosshair |
| ja | /ja/valorant-breach/ | ブリーチ アビリティ / クロスヘア |
| es | /es/valorant-breach/ | habilidades de Breach |
| pt-BR | /pt-br/valorant-breach/ | habilidades do Breach / mira |

五语均noindex,follow、自canonical，无hreflang/x-default，排除三份Sitemap。首页同语种入口可访问。发布不扩大中文白名单或其他语言索引。未来索引需另行证据和决定，28完整日观察GSC查询/点击/展示及GA4自然落地/复制；样本不足延至56天，不自动创建监控。

## 来源

- https://playvalorant.com/en-us/agents/breach/ ，公开iconTab四技能图标与MP4；对应ja-jp/es-es/pt-br官方名称逐一核对。
- https://api.val.qq.com/go/agame/graphql/graphiQL ：先查agents后按id=1查询agent的skill，国服名称C剧震余波/Q闪点爆破/E山崩地陷/X惊雷卷地。只读公开资料，没有账号或凭据。
- https://playvalorant.com/en-us/console/ 指向 https://www.youtube.com/watch?v=6nKzziP2lxw ，VALORANT官方《INCURSIONS》，2024-08-02。截图直接来自正常观看页；仅裁切/缩放，不重绘人物。最终帧和裁切在媒体脚本记录。未采用的WARM UP候选仅留本地原始目录。

原图/视频留在data_raw，处理文件data_processed，公开派生文件public/images/agents/breach。技能演示为官网当前公开资源，可能含旧HUD，不声称当前补丁录制。未在游戏客户端导入准星。

## 验证与发布

本地截图与交互记录留 `output/breach-preview/`。发布前运行check:auto、check:release、agent专项；核验正式构建桌面1440px/手机390px、五语、播放、灯箱、地图、缩放、剪贴板/编辑器一致、同地图造型与共享样式末尾追加测试。中文按dbs-ai-check的22项检查，体裁为技能操作说明，无虚构经历、钩子、升华或明显翻译腔；不声称通过AI检测器。

只提交本页源码、必要接入、派生媒体、来源清单和本记录；不上传账户数据、私人资料、原始视频、依赖、构建产物。保持548条源记录/540种样式/396索引详情。当前Cloudflare Workers Builds，生产build-meta已核对181efd4。通过PR、实际预览与CI后合并；正式域名版本与交互通过后才认定发布。回滚为只恢复本PR的专用PR，不覆盖其他英雄。没有DNS、支付、GA4/GSC后台或Netlify变更。

媒体最终选择：首图为INCURSIONS 83.8秒，裁切x300/y147/900×506；图集为WHY WE FIGHT BACK（https://www.youtube.com/watch?v=AnGdzz-XWcE，VALORANT官方，2026-01-05）136秒面部近景与43秒工作台动作。原画面1200×828、实际影像y147—653；裁切分别x360/y147/840×506和x215/y147/680×506。已逐图查看，排除INCURSIONS 145秒纯机械手臂及WARM UP无角色候选。

### 本地验证记录

check:auto调度release 25/25通过（38.8秒），审核verification与seo-scope；目录548/540/396不变，主Sitemap1894、准星1585、图片1739/3324不变。浏览器桌面1440/手机390，H1 64/40px，无横向溢出。四视频readyState4，均推进超过0.6秒；技能合辑39.667秒且实播推进。灯箱打开、Esc关闭和返回原按钮焦点通过，两个图集均已加载。Haven切换、5×、真实clipboard.writeText完成及“已复制”反馈通过；同语种编辑器代码逐字一致，竖线长度2正确恢复。

实际首页入口进入成功；追加原始共享hushAgent.css至样式最后后，铁臂技能标题rgb(255,173,96)、正文rgb(249,234,217)、主按钮hover rgb(255,211,161)、键盘focus橙色仍正确。临时样式未保存。浏览器发现五语图集标题仍沿用模板，已全部更正，新增专项断言阻止模板名称残留；重新正式构建和完整release后复核。

最终完整 `pnpm check:release` 25/25通过（60.4秒）；五语辅助检查、独立横竖长度与模板残留专项通过。首页/文章/静态HTML/元数据/路由/生成器/语言校验/首页样式接入均审阅。准星未替换旧英雄设置。正式发布只改本页及必要接入，风险主要是新路由和生成器带入；通过分支/PR回滚隔离。
