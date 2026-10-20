# 猎枭技能与主题准星页

2026-10-20；独立分支 `codex/sova-agent-page`，基线181efd4。用户明确授权完成后直接发布。原始混合工作树全部保留；只复用依赖，不升级依赖或改锁文件。

## 意图与索引

核心任务：看懂猎枭技能，预览、复制与调整成品主题准星。

| 查询候选 | 意图 | 模块 |
| --- | --- | --- |
| sova abilities / 猎枭技能 / ソーヴァ アビリティ | 技能用途与操作 | C/Q/E/X官方图标、视频、连播 |
| sova recon bolt / 寻敌箭 | 蓄力、弹射与视线限制 | E卡片、角色资料 |
| sova crosshair / 猎枭准星 | 试用成品 | 地图、1×/5×、复制、完整配置编辑器 |

Title：无畏契约猎枭技能与主题准星代码 | AimCodes；H1：猎枭。描述：看猎枭四个技能的实机演示，了解箭矢蓄力、弹射与侦察操作，预览、复制并调整蓝色双层刻线主题准星。

独立教程候选：逐地图定点寻敌箭、雷击箭落点。没有地图实测，本次不增加。站内无既有猎枭独立承接页；最近的是英雄页、生成器和地图战术板。复用最新AgentAbilityPage与AgentCrosshair，参考已验收不死鸟正式桌面/手机；不减少动画、图集灯箱、角色资料、视频、地图和复制编辑功能。

| 语言 | 路径 | 查询候选 |
| --- | --- | --- |
| en | /en/valorant-sova/ | sova abilities / themed crosshair |
| ja | /ja/valorant-sova/ | ソーヴァ アビリティ / クロスヘア |
| zh-CN | /zh-cn/valorant-sova/ | 猎枭技能 / 主题准星 |
| es | /es/valorant-sova/ | habilidades de Sova |
| pt-BR | /pt-br/valorant-sova/ | habilidades do Sova / mira |

五语noindex,follow，自canonical，无hreflang/x-default，不进任何Sitemap。界面访问和搜索索引分开；未将本页发布授权延伸到中文SEO或其他英雄。若以后批准索引，28个完整日观察GSC查询点击/展示/收录和GA4自然落地/复制，样本不足延至56天。

## 证据与媒体

- GA4属性548356819、America/Los_Angeles，2026-09-21—2026-10-18共28个完整日，限定hostName=aimcodes.com，pagePath含sova：0行，无抽样。新页本来不存在，不能据此判断市场需求。
- 已检查2026-10-13账户GSC查询导出1254行，未匹配sova完整词、猎枭、ソーヴァ；该文件为历史对比导出，不作为当前完整需求。当前未取得完整实时GSC猎枭查询数据，不声称搜索量、排名机会或预期流量。
- 2026-10-20实时搜索观察：官方英雄页承接技能查询。Google公开联想返回sova valorant abilities、lore等，仅作查询候选，不作为搜索量。没有采用第三方估算。
- Riot https://playvalorant.com/en-us/agents/sova/ 与ja-jp/es-es/pt-br官网，公开__NEXT_DATA__的iconTab提供技能名称、说明、图标和MP4。原网页及JSON留data_raw。
- 国服 https://api.val.qq.com/go/agame/graphql/graphiQL 先查agents确认Sova id8，再查agent技能：枭型无人机C、雷击箭Q、寻敌箭E、狂猎之怒X。操作描述不写未经版本核对的数值。
- 官方认证VALORANT频道 https://www.youtube.com/watch?v=q2eLOupmraQ 《RECKONING // Episode 8 Cinematic》。正常观看页确认标题、频道及视频播放。素材候选逐图查看，不采用纯手部、远景小人、Logo或其他英雄画面。

## 准星

蓝色中心点、四段短粗内线及四段细长外线。内线长2/粗3/间距3，外线长5/粗1/间距9，中心点2，黑色轮廓。使用一份完整配置生成Canvas、复制代码和编辑器，不替换既有英雄配置。角色主题配置不冒充官方或选手，未在游戏客户端导入。

## 验证与发布

待补充媒体最终时码、裁切、机械检查、桌面手机交互、PR、预览和正式构建版本。当前生产域名build-meta为e550b03，仓库当前主线181efd4；配置确认Cloudflare Workers Static Assets / Workers Builds，沿用当前平台。只改本页内容/样式/准星/派生素材和接入点；不修改分析事件、支付、DNS、GSC或其他线上配置。回滚通过专用恢复PR恢复本任务文件。

### 最终媒体选择

RECKONING首图305秒夜晚城市前的猎枭近景；图集355秒与幽影交谈、350秒运输机旁持枪。均逐图查看后采用。浏览器视频画面x16/y68/892×380；首图裁为1920×1080，OG1200×630；图集355秒在画面内取x160/y0/500×380，350秒取x490/y0/402×380，再输出960×640。原始截图不覆盖，派生脚本为scripts/prepare-sova-media.mjs。排除其他英雄、Logo、纯武器、远处小人、模型转台和不匹配的RETAKE候选。

中文按dbs-ai-check的22项按玩家操作说明体裁检查，未发现需单列的套话、虚构经历或过度反转句，不声称能通过AI检测器。

### 本地验收

pnpm check:auto（自动选择release）25/25通过；最终pnpm check:release 25/25通过，41.5秒。check-agent五语各4技能、2图集，代码往返一致；与14个已有英雄几何不同。构建3235路由；主Sitemap1894、准星1585、图片1739页/3324引用，均排除猎枭。目录548源记录、540外观、396可索引详情保持。

Ego Lite正式构建预览4233：1440桌面/390手机，无横向溢出或损坏图片，H1为64px/40px。四段技能视频readyState4且各推进0.5秒以上；56.83秒合辑播放推进15秒以上。图集灯箱打开、Esc关闭、焦点返回通过。切换Haven与5×成功；复制有“已复制”反馈，读取实际系统剪贴板与编辑器code逐字相等。将真实共享hushAgent.css临时追加到末尾后，技能标题rgb(140,213,255)、正文rgb(229,242,252)、真实hover按钮rgb(190,232,255)，键盘focus-visible为蓝色3px。临时样式未写入产品。

YouTube官方正常观看页可播放，站内使用隐私嵌入及官方观看链接；外部服务在部分环境可能要求登录，不保证所有用户环境播放。准星未做游戏客户端导入测试。未改变GA4/GSC/支付/生产配置。

15个英雄在同一默认Ascent地图以1×/5×实际Canvas并排检查完成。猎枭中心点与短粗内刻线、长细外线可与夜露空心方框、霓虹粗外线及不死鸟细内十字明显区分；未改动已有英雄。正式构建首页同语种入口和语言切换已检查。
