# 芮娜英雄准星页本地样稿

日期：2026-10-20。分支 `codex/reyna-agent-preview`，基线 `177a6b4`，工作目录 `/Users/alex/.codex/worktrees/reyna-agent-preview/aimcodes-main`。原用户 `aimcodes-main` 混合工作树与其他英雄工作树未修改。复用已有依赖，没有安装、升级或修改锁文件。没有提交、推送、PR、部署或后台配置修改。

## 页面任务与模板

核心意图：看懂芮娜的睥睨、魂珠治疗与脱身选择，再试用能复制和调整的主题准星。

| 查询候选 | 意图 | 承接模块 |
| --- | --- | --- |
| reyna valorant abilities / 芮娜技能 / レイナ アビリティ | 技能操作 | 四个官方图标和实机演示 |
| reyna leer / 芮娜睥睨 | 眼球致盲及可被摧毁 | C 卡 |
| reyna heal / dismiss | 回血和撤离选择 | Q/E卡、角色资料中的魂珠说明 |
| reyna crosshair | 主题造型预览、复制、调整 | 紫色细线框、三地图、1×/5×、编辑器 |

中文 Title：无畏契约芮娜技能与主题准星代码 | AimCodes；H1：芮娜。描述：看芮娜四个技能的实机演示，了解魂珠、噬尽与逐散的选择，预览、复制并调整紫色主题准星代码。

独立教程候选：地图睥睨投放、逐散撤退路线。缺少可验证的地图教学素材，本次不扩教程页、不加FAQ。最近现有英雄页不承接芮娜内容，战术板只提供标记。页面复用当前主线 `AgentAbilityPage`（炼狱等使用）和不死鸟已验收布局，保留品牌导航、语言、面包屑、技能卡、展开连播、动画入口、灯箱、折叠资料与准星操作，不另造功能简化的外壳。新增主题选择器高于共享样式，不改旧英雄。

## 证据与事实核验

- GA4 548356819，America/Los_Angeles，2026-09-21—2026-10-18，28个完整日；pagePath 包含 reyna，维度含 hostName，返回0行、无抽样。没有路径流量不能解释为没有搜索需求。
- GSC 最近可用本地账户导出 `data_raw/traffic-audit-2026-10-15/gsc.zip`，2026-09-29—2026-10-12：1000条查询、665条网页，未匹配 reyna/芮娜/レイナ。查询导出有截断边界，未取得更新的完整查询报告。
- 2026-10-20搜索观察有官方英雄技能页和其他准星承接页。Google公开联想接口对 `reyna valorant` 返回 `reyna valorant abilities`。没有获取第三方量级，不用结果数量算需求。
- 官方 EN/JA/ES/PT 英雄页 `https://playvalorant.com/{locale}/agents/reyna/` 的公开 __NEXT_DATA__：四技能图标与演示、被动信息和官方本地化名。源文件本地保存于 `data_raw/reyna-2026-10-20/`，URL见 `media-sources.json`。
- 国服官方公开只读资料接口 `https://api.val.qq.com/go/agame/graphql/graphiQL`，先查询 agents 确认Reyna id=11，再读 agent 的 skill{name keypad desc}；国服名为睥睨(C)、噬尽(Q)、逐散(E)、女皇旨令(X)。没有把国际服中文译名用于国服。
- 当前英雄页部分描述陈旧。交叉核对官方8.11补丁（大招持续至阵亡/回合结束）、11.08（作战强化规范）、12.02（魂珠3秒、普通过量治疗10秒）；不沿用英雄页旧版“击杀延长大招时限”或西语“眼球不可摧毁”。不展示技能价格或无必要的精确数值。旧演示HUD不声称当前补丁录制。
- 官方补丁来源：https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-811/ 、https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-11-08/ 、https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-12-02/ 。

## 媒体

官方认证VALORANT频道《SHATTERED // Episode 5: DIMENSION Cinematic》：https://www.youtube.com/watch?v=PlpqhZiumDM 。通过 Ego Lite 正常观看页实际播放、暂停、定位后截取视频区域。原始帧901×380；保留原文件，派生脚本 `scripts/prepare-reyna-media.mjs` 负责裁切和转码。没有读取Cookie、登录凭据或使用非官方副本。

图集：190秒举枪架住通道（left110/top0/570×380）、270秒紫眼近景（left380/top0/510×380）、280秒侧身观察（left20/top0/520×380）。均人工查看后选择，非模型/转台/纯手部。图集统一960×755；首图采用280秒单独裁切（left20/top0/550×380，顶部优先），按桌面手机验收；OG1200×630。角色视频点击加载官方嵌入并保留官方观看外链。技能视频转为本地静音H.264，960×540，完整连播为四段拼接；官方图标96px。

## 造型与索引

紫色细线方框：内线长度1、粗6、间距3，无中心点、无外线，黑色轮廓；同一完整设置生成Canvas、复制及编辑器代码。不冒充官方/选手配置，不替换其他英雄造型。最终形状由实际Canvas对照验收；没有游戏客户端导入，不能声称实机导入已验证。

| 语言 | 路径 | 查询候选 |
| --- | --- | --- |
| zh-CN | /zh-cn/valorant-reyna/ | 芮娜技能、主题准星 |
| en | /en/valorant-reyna/ | valorant reyna abilities / themed crosshair |
| ja | /ja/valorant-reyna/ | レイナ アビリティ / クロスヘア |
| es | /es/valorant-reyna/ | habilidades de Reyna |
| pt-BR | /pt-br/valorant-reyna/ | habilidades da Reyna / mira |

五语全部noindex,follow；canonical为正式域名同路径；不声明hreflang/x-default，不入三份Sitemap。首页同语种入口可发现页面。发布、索引和增长分别决策，本次仅授权本地制作。未来若批准索引，以28天完整周期核查GSC查询簇点击/展示/收录及GA4自然落地和复制，样本不足延长至56天；不自动创建监控。

## 验收

正式构建预览：http://127.0.0.1:4223/zh-cn/valorant-reyna/?qa=1 。结果与截图见本地 `output/reyna-preview/`；完成后补充实测记录。

### 完成结果

- `pnpm check:auto` 调度完整release套件，25/25通过（113.7秒）；已审核scope/verification/seo-scope报告。随后更新首图、图集alt与手机裁切，再次lint、正式build、五语本地化、SEO和路由校验通过；辅助 `check-agent --agent reyna --index-locales none` 通过。
- 目录仍为548条源记录、540种外观、396条索引详情。主Sitemap1894、准星1585、图片1739页/3324引用；均不包含芮娜，五语静态HTML自canonical、noindex,follow、无hreflang。
- 正式构建在1440px桌面和390px手机检查；H1分别64px/40px，语言选择实际切换EN/JA/ES/PT-BR/ZH-CN均无横向溢出。首页同语种入口实际进入页面；准星完整操作和三地图菜单可用。
- 四段技能视频readyState=4，实测每段推进超过0.6秒；连播53.1秒，实际播放推进。三张图集真实加载，灯箱打开、Esc关闭和焦点返回原按钮通过。手机第二张原先继承了模板的bottom焦点，已移除该覆盖以保留眼睛，未修改旧英雄样式。
- 实际clipboard.writeText成功后收到“已复制”反馈；同语种编辑器输出与捕获的实际写入代码逐字一致。未读取剪贴板其他内容，未请求读权限。1×/5×切换、地图切换至源工重镇通过。
- 与遐思、贤者、不死鸟、幽影、炼狱、尚勃勒、蝰蛇、雷兹的实际Canvas做相同Ascent背景和相同倍率对照：芮娜为无点薄方框，与带点厚环、十字、点刻线和四方块有可见几何区别。`shape-comparison.png`来自浏览器真实Canvas图层，叠加同一项目地图；不宣称游戏客户端导入验证。
- 跨9英雄页面访问后，主题主按钮颜色分别保留。追加真实共享hushAgent.css到页面样式末尾后，芮娜技能标题rgb(221,154,255)、正文rgb(244,229,250)、主按钮rgb(221,154,255)保持；实际hover为rgb(240,200,255)，键盘focus-visible为紫色3px轮廓。临时验收样式未保存进产品。
- 中文按 `dbs-ai-check` 的22项表达规则检查，体裁为玩家操作说明；没有需要报告的虚构体验、钩子承诺、刻意升华或翻译腔。不为检测而强改官方名称，不保证AI检测器结果。
- 本地证据：`output/reyna-preview/{agent-check,interactions,languages,editor-roundtrip,theme-and-navigation,themes}.json`；截图 `desktop-final.png`、`mobile-final.png`、`gallery-mobile.png`、`crosshair-mobile.png`、`crosshair-5x.png`、`shape-comparison.png`。原始失败截图只作中间诊断，不作为最终通过证据。

新增：ReynaAgentPage.jsx、reynaAgent.css、reynaContent.js、reynaCrosshair.js、18项public派生媒体、prepare-reyna-media.mjs及本记录。接入修改：SeoArticlePage、HomeResourceDirectory、CrosshairToolsPage、articles/resourceLabels/metadata/routes、静态HTML生成、语言验证、首页入口样式及CURRENT_STATE。原始视频/网页/浏览器帧仅本地data_raw保存，data_processed保留中间帧；不应纳入未来产品提交。未更改旧英雄内容或准星、目录清单、追踪设置、支付、DNS、GitHub、Cloudflare或Netlify。

本地样稿可评审；后续发布需当前页面明确授权，并整合届时最新主线、完整检查和真实平台预览。开放索引另行决策，不把制作/发布授权当中文索引例外。

角色动画边界：官方正常观看页实播并定位已验证；本页点击后成功创建YouTube隐私增强播放器。未记录跨域嵌入视频的时间推进，因此不声称内嵌动画端到端播放通过；官方观看外链保留。最终手机复验三张图片均已加载，object-position均为50% 0%，第二张眼睛完整保留。

## 当前发布授权（2026-10-20）

用户明确要求“发布”。授权仅限当前芮娜页面与必要接入，五语继续noindex,follow、不入Sitemap，不放开中文索引。以PR预览通过后合并主线、由现有Cloudflare自动构建发布；不改DNS、支付和追踪配置。回滚为恢复本PR引入的代码与派生素材，不覆盖其他英雄。原始素材、账户导出、output和依赖不提交。正式PR与部署结果在交付时记录。
