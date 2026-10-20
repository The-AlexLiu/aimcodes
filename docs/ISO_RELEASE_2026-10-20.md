# 壹决技能与主题准星页

2026-10-20；独立分支 `codex/iso-agent-page`，基线 `df820d6`。用户明确授权本页制作完成后直接发布。原混合工作树及所有其他任务均保留；只复用现有依赖，不升级依赖或修改锁文件。

## 意图与范围

核心意图：看懂壹决技能，并预览、复制、调整主题准星。

| 查询候选 | 用户任务 | 模块 |
| --- | --- | --- |
| iso valorant abilities / 壹决技能 / アイソ アビリティ | 了解技能与按键 | C/Q/E/X官方图标、视频、操作 |
| iso shield / 战斗心流 | 理解护盾与能量球 | E技能及简短资料 |
| iso crosshair / 壹决准星 | 试用成品 | 三地图、1×/5×、复制与完整编辑器 |

中文Title：无畏契约壹决技能与主题准星代码 | AimCodes；H1：壹决。描述：看壹决四个技能的实机演示，了解战斗心流护盾与屏障操作，预览、复制并调整紫色双层方环主题准星。

独立教程候选：逐地图屏障路线、决斗通牒配合。不具备地图实测，本次不新增攻略或FAQ。站内最接近的是既有英雄页与准星生成器，未发现壹决独立承接页。使用最新主线AgentAbilityPage/AgentCrosshair完整组件；对照已验收不死鸟正式桌面和手机，保持64px/40px H1、导航、语言、面包屑、模块顺序、视频连播、动画、图集灯箱、折叠资料和准星交互。

| 语言 | 路径 | 查询候选 |
| --- | --- | --- |
| en | /en/valorant-iso/ | iso valorant abilities / themed crosshair |
| ja | /ja/valorant-iso/ | アイソ アビリティ / クロスヘア |
| zh-CN | /zh-cn/valorant-iso/ | 壹决技能 / 主题准星 |
| es | /es/valorant-iso/ | habilidades de Iso |
| pt-BR | /pt-br/valorant-iso/ | habilidades do Iso / mira |

全部noindex,follow、自canonical、无hreflang/x-default、不入任何Sitemap；首页同语种入口可达。遵守SEO_OPERATING_POLICY，不将发布授权扩大为索引授权。未来如单独批准索引，28个完整日检查GSC查询簇点击、展示、收录和GA4自然落地/复制，样本不足延至56天，不自动创建监控。

## 证据与限制

- GA4属性548356819，America/Los_Angeles，2026-09-21—2026-10-18，28个完整日，hostName=aimcodes.com、pagePath包含iso。4行均为comparison工具路径（包含iso字母），没有壹决英雄页数据，不能当作英雄需求。没有抽样；sessions不跨路径加总。
- 优先检查可用GSC账户导出，2026-09-29—2026-10-12查询导出1000行，存在截断边界，未命中iso单词、壹决或アイソ；没有取得当前完整壹决查询需求，不声称搜索量或预计流量。
- 2026-10-20搜索观察出现官方英雄页和技能说明承接，未取第三方搜索量，不以结果数代替需求。Google公开联想iso valorant返回iso valorant abilities与iso valorant ult；仅用于候选，不作为流量承诺。
- Riot四语官方页： https://playvalorant.com/en-us/agents/iso/ ，语言替换为ja-jp/es-es/pt-br。公开__NEXT_DATA__中的iconTab提供官方名称、图标和技能视频；原网页与结构化数据留本地data_raw。
- 国服官方接口 https://api.val.qq.com/go/agame/graphql/graphiQL 先查agents，确认Iso id23，再查agent及skill{name keypad icon desc video{vid}}：绝对屏障C、稳态剥离Q、战斗心流E、决斗通牒X。
- https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-10-04/ 确认Q施加压制与易伤、C右键半速屏障。 https://playvalorant.com/en-gb/news/game-updates/valorant-patch-notes-13-01/ 确认E收手后立刻切枪；交叉查看13.06/13.08。国服E描述确认开启即获得护盾。官网演示为历史视频，不能用旧HUD推导当前数值；正文不写不必要的价格、持续时间或射程。

## 媒体与造型

官方VALORANT认证频道《MYTHS // Iso Agent Trailer》 https://www.youtube.com/watch?v=8OgcHAv6Jvk ，正常观看页核对频道标题与实际播放后定位。观察视频矩形x16/y68/892×380，隐藏播放器控制后截图，裁去网页。原始截图与官方原视频只留data_raw，脚本只产生派生资源。

133秒手机半身用于首图与OG；图集120秒紫色能量举枪、145秒战后手机；首图不重复填入图集。候选联系表先视觉检查，排除守卫镜头、剪影、Logo、远处小人与宣传字卡。图集分别在视频画面内裁x220宽450、x345宽520，高380，再输出960×640；首图1920×1080、OG1200×630。桌面/手机再检查人物裁切。四段技能视频与图标URL见本地media-sources.json，公开派生为静音H.264 960×540、96px WebP图标、对应poster与连播。

准星：紫色双层方环，中心留空；内线长1/粗4/间距2形成细方环，外线长1/粗10/间距6形成宽分段外环，有黑色轮廓。使用同一完整配置生成代码、Canvas和编辑器；与现有英雄同地图1×/5×并排验收。不替换既有配置，不冒充官方或选手准星，未在游戏客户端导入。

## 验收与发布记录

待补充最终机械检查、正式构建桌面/手机交互、PR预览与正式域名版本。新增壹决组件/主题样式/五语内容/完整准星配置、媒体派生与脚本、本记录；接入文章/元数据/路由/首页/生成器/静态HTML和针对英雄页的语言验证。没有修改目录准星、其他英雄、分析事件、支付、DNS、Netlify或GSC后台配置。正式平台实时核对为Cloudflare Workers Builds；回滚为仅恢复本PR改动的专用PR。

### 官方技能资源清单

| 文件 | 图标 | 实机视频 |
| --- | --- | --- |
| wall | https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data/2439fd36c37debf4bd082c0609b356733577de04-1024x1024.png?accountingTag=VAL | https://cmsassets.rgpub.io/sanity/files/dsfx7636/game_data/5e331c774ffde4e8e0c45a8844b0237b7d75ba3b.mp4?accountingTag=VAL |
| bolt | https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data/5b981e9b6c35a518177ff1c7170a213e36f393c7-1024x1024.png?accountingTag=VAL | https://cmsassets.rgpub.io/sanity/files/dsfx7636/game_data/17503f71b58f654d583a66e29dab75460677576f.mp4?accountingTag=VAL |
| shield | https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data/ac58844d85858401edcefdb8e38ec23bfb672481-1024x1024.png?accountingTag=VAL | https://cmsassets.rgpub.io/sanity/files/dsfx7636/game_data/11ad2731215ec978c89fdb675aaf3b591c3c3c55.mp4?accountingTag=VAL |
| ultimate | https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data/67aa0a3de742de9793d4b1fbfae38961c8d0076f-1024x1024.png?accountingTag=VAL | https://cmsassets.rgpub.io/sanity/files/dsfx7636/game_data/6fbd2b0e16ac3bda095094770ce6b1d403fc3832.mp4?accountingTag=VAL |

### 本地验证

`pnpm check:auto` 25/25通过；最后`pnpm check:release` 25/25通过（72.6秒）。辅助check-agent确认五语各4技能/2图集、noindex与代码往返；与12个既有英雄几何均不同。构建3210路由；主Sitemap1894，准星1585，图片1739页/3324引用，全部排除壹决。目录保持548条源记录、540外观、396可索引详情。

正式构建预览端口4231；桌面1440与手机390首图人物/文字清楚，H1为64px/40px，无横向溢出与损坏图片。四技能视频readyState4、每段实播推进超过0.6秒；58.4秒合辑实际播放。图集灯箱打开、Esc关闭、焦点返回通过。地图切换Haven、1×/5×、真实复制成功反馈通过；实际写入代码与编辑器code逐字一致。追加真实共享hushAgent.css到样式末尾后，技能标题rgb(198,175,255)、正文rgb(240,231,252)、主按钮rgb(198,175,255)保持；真实hover为rgb(225,210,255)，键盘focus-visible紫色3px。临时验收样式未写入产品。

中文按dbs-ai-check的22项规则按玩家操作说明体裁检查，未发现需要单列的套话、虚构经历或过度翻转句；不声称通过AI检测器。动画正常观看页已实际播放；外部YouTube嵌入可能因用户环境要求登录，保留官方观看入口，不保证所有环境播放。未在游戏客户端导入准星。
