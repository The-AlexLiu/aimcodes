# 斯凯技能与主题准星页

2026-10-20；独立分支 `codex/skye-agent-page`，基线 `6f9c3aa`，目录 `/Users/alex/.codex/worktrees/skye-agent-page/aimcodes-main`。用户明确授权制作完成后直接发布本页。原始混合工作树所有修改跳过，复用锁定依赖，不升级依赖。

## 意图与内容

核心任务：看懂斯凯的治疗、控虎与控隼操作，再试用主题准星。

| 查询候选 | 意图 | 模块 |
| --- | --- | --- |
| skye abilities / 斯凯技能 / スカイ アビリティ | 作用、操作及限制 | C/Q/E/X技能卡、官方图标和实机视频 |
| skye flash / skye heal / 斯凯闪光 | 操控与治疗限制 | E/C技能卡、简短角色资料 |
| skye crosshair / 斯凯准星 | 预览与复制可用成品 | 三地图、1×/5×、复制和完整编辑器 |

Title：无畏契约斯凯技能与主题准星代码 | AimCodes；H1：斯凯。描述：看斯凯愈生之息、辟林之虎、引路之隼和追猎之灵的实机演示，了解操作与限制，预览、复制并调整绿色主题准星代码。

独立教程候选：具体地图的控隼转弯与配合闪光点位。本次没有地图实测，不新建教程、不加无依据FAQ。本站此前没有斯凯承接页；最近为其他英雄技能页、生成器与地图战术板。复用最新AgentAbilityPage/AgentCrosshair完整功能及布局，并对照已发布铁臂桌面/手机：导航、语言、面包屑、四技能、合辑、角色预告、图集灯箱、资料、准星地图/缩放/复制和编辑器均保留。仅增加本页内容、局部主题与接入。

## 证据与索引

GA4属性548356819、America/Los_Angeles，2026-09-21—2026-10-18共28完整日，限定hostName精确aimcodes.com、pagePath包含skye，screenPageViews返回0行，无抽样。新页原本不存在，不能据此判断市场需求。

历史GSC导出为原工作树data_raw/traffic-audit-2026-10-15/gsc.zip，2026-09-29—2026-10-12，查询1000行/页面665行未匹配skye/斯凯/スカイ；有截断和时效边界，本次未获取完整实时GSC查询。2026-10-20搜索观察可见官方英雄页、技能预告与补丁信息，仅作查询候选与事实核对，无第三方搜索量或流量增长预测。

| 语言 | 路径 | 查询候选 |
| --- | --- | --- |
| en | /en/valorant-skye/ | skye abilities / themed crosshair |
| ja | /ja/valorant-skye/ | スカイ アビリティ / クロスヘア |
| zh-CN | /zh-cn/valorant-skye/ | 斯凯技能 / 主题准星 |
| es | /es/valorant-skye/ | habilidades de Skye |
| pt-BR | /pt-br/valorant-skye/ | habilidades da Skye / mira |

五语均noindex,follow、自canonical、无hreflang/x-default，排除主/图片/准星Sitemap。保留首页同语言入口，不增加中文索引例外。今后索引需另行证据与决定，28完整日观察GA4自然落地/复制及GSC查询/点击/展示；样本不足延到56天，不自动创建监控。

## 官方来源与素材

- https://playvalorant.com/en-us/agents/skye/ 及ja-jp/es-es/pt-br官方英雄页公开__NEXT_DATA__，四技能名称、图标及MP4。原网页和JSON、原图视频均留data_raw/skye-2026-10-20。
- https://api.val.qq.com/go/agame/graphql/graphiQL ：先查agents确定id13，再查agent的skill{keypad name}，确认C愈生之息/Q辟林之虎/E引路之隼/X追猎之灵。
- https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-8-01/ 核对旧演示边界；未照旧HUD写充能或费用，不声称当前版本录制。
- https://www.youtube.com/watch?v=C3QTyMXi-WE ，认证VALORANT频道《Skye Agent Reveal trailer》，2020-10-08。通过正常观看页确认标题、官方频道及1920×1080视频。Ego Lite截图1200×828，影像矩形x16/y68/822×462。
- 首图与图集近景：29秒，先裁掉播放器外部，再在影像内x230/y0/400×330截取人物脸部和上身；首图1920×1080、OG1200×630、图集960×640，均顶部对齐。图集动作：32秒，影像内x180/y0/610×462，人物持枪与发光猛兽同框，派生960×640。逐一视觉查看后采用。未采用被树叶遮挡、纯手部、远景小人、片尾推荐卡等候选。

派生素材由scripts/prepare-skye-media.mjs生成，原始文件保留，处理中间帧在data_processed/skye-media，公开文件public/images/agents/skye。只裁切/缩放/压缩，不生成或重绘人物。技能视频为官网当前提供的历史演示，未称当前补丁或游戏客户端验证。

## 准星与验证

浅绿长竖线/短横线内层，加四枚外侧宽刻线。内横长2、竖长7、厚1、间距2；外线长1、厚5、间距12，无中心点，有黑色轮廓。完整设置同源生成Canvas/复制/编辑器，使用既有独立竖线长度支持，旧英雄设置不变。需在同地图同缩放视觉对照，并核验真实复制和编辑器逐字相同。未进行游戏客户端导入。

中文按dbs-ai-check的22项检查，体裁为短技能操作说明；卡片结构重复有交互用途，不强行改成叙事。无虚构体验、钩子、空泛升华和明显翻译腔。不声称通过AI检测器。

只提交本页源码/必要接入、派生素材、处理脚本和来源记录。不提交私人档案、账户报表、原始媒体、依赖、构建产物或凭据。Cloudflare Workers Builds是当前生产平台，开始时生产build-meta与main均为6f9c3aa。没有DNS、支付、GA4/GSC后台、Netlify或托管配置变更。回滚为仅恢复本PR改动的独立PR。

发布前需完整机械检查、正式构建桌面1440/手机390和交互/色彩验收；通过PR、实际预览及CI后合并，正式域名build-meta与合并提交一致后再认定上线。最终验收结果追加下方，正式PR和部署版本在PR交付记录补充。

### 本地验收

`pnpm check:auto`自动选择release，25/25通过（138.5秒，首次生成图片）；已审核verification和seo-scope。专用agent辅助检查五语均通过，完整配置往返一致，几何不同于全部16个既有英雄。准星目录保持548条源数据、540种样式、396索引详情；主/准星/图片Sitemap保持1894/1585/1739 URL，3324个图片引用。

正式构建浏览器：1440px桌面、390px手机，H1 64/40px，无横向溢出；首图及两个图集均正常加载、裁切可辨。四视频readyState4并分别实际推进超过0.5秒，连续演示25.466秒且可播放。灯箱点击打开、Esc关闭并返回原按钮焦点通过；Haven切换、5×、实际clipboard.writeText成功及“已复制”反馈通过，编辑器实际生成代码与复制值逐字相同（独立竖长7保留）。首页实际进入斯凯及语言切换到英文通过。

追加原始hushAgent.css到样式最后后，技能标题rgb(135,238,130)、正文rgb(231,245,223)、主按钮hover rgb(188,255,179)、键盘focus绿色均保持。临时验收样式未写入产品。浏览器依次打开全部17位英雄，采集1×/5×真实Canvas，在同一Ascent背景并排查看；斯凯的纵长内层和外刻线与其他英雄形状可区分。图片及复制记录留本地output/skye-preview，不进入提交。

验收自动化曾等待不存在的编辑器选择器，改用源码实际`.tool-preview-panel code`后逐字比对成功；跨英雄取图时自动滚动遇到选择框挡住缩放按钮，重新观察后用页面内控件切换采集，不影响先前真实点击验证结果。均非产品错误。Ego Lite提示有更新，本次不升级环境。

最终显式`pnpm check:release`25/25通过（50.8秒），辅助agent检查再次通过。审核暂存范围仅本页与必要接入；没有改旧英雄配置或共享组件。正式PR预览/合并/部署结果在PR交付记录补充。
