# 霓虹技能与主题准星页

2026-10-20；分支 `codex/neon-agent-page`，基线 `ebfa6f8`，独立目录 `/Users/alex/.codex/worktrees/neon-agent-page/aimcodes-main`。用户明确要求制作好后直接发布。仅授权此页及必要接入；保留原混合工作树。复用现有依赖，无安装升级、锁文件变化。生产平台实时核对为 Cloudflare Workers，正式域名 build-meta 与基线一致。

## 页面与索引决策

核心意图：看懂霓虹技能和疾跑滑行，直接预览、复制、调整主题准星。

| 查询候选 | 意图 | 模块 |
| --- | --- | --- |
| neon valorant abilities / 霓虹技能 / ネオン アビリティ | 技能作用与操作 | 四技能官方图标、视频、C/Q/E/X |
| neon slide / 充能疾驰 | 疾跑滑行与能量限制 | E卡、角色资料 |
| neon crosshair / 霓虹准星 | 成品试用 | 三地图、1×/5×、复制、完整编辑器 |

中文Title：无畏契约霓虹技能与主题准星代码 | AimCodes；H1：霓虹；描述：看霓虹四个技能的实机演示，了解充能疾驰与滑铲操作，预览、复制并调整青蓝色主题准星代码。

独立教程候选：地图滑行路线、弹球落点。缺少地图实测材料，本次不建教程或FAQ。复用最新主线 AgentAbilityPage、AgentCrosshair 和已验收不死鸟/芮娜模块，保留导航、语言、面包屑、技能展开连播、动画、灯箱、折叠资料与准星操作。主题样式提高选择器优先级，不改旧英雄。

| 语言 | 路径 | 目标查询候选 |
| --- | --- | --- |
| zh-CN | /zh-cn/valorant-neon/ | 霓虹技能 / 主题准星 |
| en | /en/valorant-neon/ | neon valorant abilities / themed crosshair |
| ja | /ja/valorant-neon/ | ネオン アビリティ / クロスヘア |
| es | /es/valorant-neon/ | habilidades de Neon |
| pt-BR | /pt-br/valorant-neon/ | habilidades da Neon / mira |

五语均 noindex,follow、自 canonical、无 hreflang/x-default、排除全部 Sitemap。首页同语种入口可访问；发布许可不放开中文索引。若未来单独批准索引，用28个完整日GSC查询簇点击/展示/收录与GA4自然落地/复制评估，样本不足延至56天；不自动建监控。

## 数据与事实

- GA4 548356819，America/Los_Angeles，2026-09-21—2026-10-18共28个完整日，hostName/pagePath包含neon：12行，全为aimcodes.com既有几何准星详情；没有霓虹英雄页流量。按路径的sessions不能加总为独立会话；不将已有几何款流量当英雄需求，无抽样。
- GSC可用历史账户导出：2026-09-29—2026-10-12，查询导出1000行存在截断边界。命中 `mira neon valorant` 0点击/2展示、`mira neon` 0点击/1展示；neon可能指荧光颜色，不能直接当英雄需求。未取得更新完整查询导出。
- 2026-10-20搜索观察有官方英雄页、技能和准星承接页；Google公开联想 `neon valorant` 返回settings等词，未直接给出abilities。未获取第三方搜索量，不用结果条数估算需求。
- 官方四语页面 `https://playvalorant.com/{en-us,ja-jp,es-es,pt-br}/agents/neon/` 的公开 __NEXT_DATA__ 提供图标、技能视频与本地化名，原网页/结构化数据留在本地data_raw。
- 国服官方公开资料接口 `https://api.val.qq.com/go/agame/graphql/graphiQL` 先查询agents后确认Neon id18，再读skill：高速通道(C)、闪电弹球(Q)、充能疾驰(E)、超限暴走(X)。
- 国际英雄页电墙伤害说明陈旧；采用国服说明和官方4.08移除电墙伤害规则。12.09官方补丁明确疾跑跳起不保留额外速度、普通击杀不回能量而大招中击杀会回；被动回能保留。交叉浏览最新13.06/13.08。页面不写无必要价格/持续秒数或旧HUD数值，不声称旧视频为当前补丁录制。
- 补丁：https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-12-09/ 。

## 媒体与造型

官方认证VALORANT频道《Spark - Neon Agent Trailer》：https://www.youtube.com/watch?v=dtx8CgjRmqE 。Ego Lite正常观看页确认标题/频道，实际时间推进后定位截帧。观察到视频区域x16/y68/822×462；去除播放器信息图标和底栏后裁为x30/y85/780×390。原始截图只保存在data_raw，不提交。

首图34秒房间近景，1920×1080右上焦点；OG48秒扎发镜头1200×630。图集34秒房间近景、48秒扎发、40秒沙发休息，960×755右上裁切；40秒额外裁为left330/top65/400×290，人物更清楚。联系表与每张派生图均视觉检查，排除18秒背影、7秒半身、63秒纯第一人称、146秒背影镜头。下载的官方四段技能转为静音H.264 960×540，96px官方图标，连播按C/Q/E/X拼接。可复现脚本 `scripts/prepare-neon-media.mjs`；资源完整URL见本地 `data_raw/neon-2026-10-20/media-sources.json`。

主题准星：青蓝色，内线长2/粗1/间距0，外线长4/粗3/间距5，无中心点开关，黑色轮廓。中心为细小十字，四周为分离粗线，区别于贤者带点环、不死鸟细分段十字、芮娜方框等；同一完整设置生成Canvas、复制和编辑器代码。不冒充官方或选手配置，未在游戏客户端导入。

## 验收与发布

正式构建本地预览端口4225，所有内部访问带qa=1。结果与截图位于本地 `output/neon-preview/`。发布前完整检查、真实PR预览、正式域名版本核验后补充结果。

修改接入文件：HomeResourceDirectory、CrosshairToolsPage、SeoArticlePage、articles、metadata、resourceLabels、routes、styles、静态生成与语言校验。新增NeonAgentPage、neonAgent.css、neonCrosshair、neonContent、18项派生媒体、媒体脚本、本记录；CURRENT_STATE记录本次发布范围。原工作树所有既有修改均跳过；目录548条源数据、540外观及原英雄配置保持不变。无追踪/支付/DNS/Netlify或GSC后台配置变更。回滚为恢复本PR的专用PR。

### 本地通过

`pnpm check:auto` 25/25通过（78秒）；最终 `pnpm check:release` 25/25通过（37.2秒）。已审核verification、scope、seo-scope与语义diff。agent辅助检查确认五语各4技能/3图集、代码往返和与既有英雄几何区别。

桌面1440与手机390：首图人物/文字可读，H1分别64px/40px，五语无横向溢出。首页实际点击进入新页，语言菜单切换英语保持英雄路由。追加实际共享hushAgent.css到样式末尾后，技能标题rgb(110,228,255)、正文rgb(228,245,251)、主按钮rgb(110,228,255)保持，真实hover为rgb(180,242,255)，键盘focus-visible青蓝3px；没有保存临时测试样式。

四技能视频readyState4且每段实播推进超过0.65秒；合辑19.37秒实际播放。图集灯箱打开/Esc关闭/焦点返回通过。地图实际切至Haven，1×/5×工作；捕获实际成功写入代码和“已复制”反馈，与编辑器code逐字相同。截图及JSON证据在output/neon-preview。跨英雄同Ascent背景的实际Canvas 1×/5×对照见shape-comparison.png，不替换既有配置。

中文按dbs-ai-check的22项表达规则检查，体裁为玩家操作说明，没有需单列的AI表达问题；不声称通过AI检测器。官方角色预告正常观看页实际播放和定位通过；站内YouTube嵌入保留官方观看外链，不保证所有用户环境下外部播放器可播放。

构建3200路由；主Sitemap1894、准星1585、图片1739页/3324引用；全部不含霓虹。目录仍548条源记录/540造型/396索引详情。

合入并保留夜露PR #105（045ceaf）后，发现其也使用内框与外细线组合，霓虹重设计为中心细小十字配分离粗外线，避免仅参数大小不同。五语描述与往返验收同步更新；合并后重跑完整检查。
