# 钛狐技能与主题准星页面

2026-10-20；分支 `codex/tejo-agent-page`，基线 `eda3dc9`。用户明确授权制作后直接发布本页。原混合 GA4 工作树全部跳过；复用已有锁定依赖，不升级依赖，不改追踪、支付或平台配置。

## 页面任务与语言

核心任务：看懂钛狐如何用侦察和定点爆破开路，再预览、复制、调整金色横向瞄具准星。沿用最新正式K/O页的AgentAbilityPage、AgentCrosshair：品牌、导航、语言、面包屑、首图、四技能官方图标/视频、展开合辑、角色预告、游戏人物图集灯箱、角色资料、三地图、1×/5×、复制反馈、完整编辑器和同语种内链。只增加本页局部金色主题。

| 查询候选 | 意图 | 模块 |
| --- | --- | --- |
| tejo abilities / 钛狐技能 / テホ アビリティ | 作用、操作和限制 | C/Q/E/X 四技能 |
| tejo drone / guided salvo / 钛狐导弹 | 操控与选点 | C/E 卡片、官方视频 |
| tejo crosshair / 钛狐准星 | 预览、复制和调整 | 金色横向瞄具、生成器 |

中文Title：无畏契约钛狐技能与主题准星代码 | AimCodes；H1：钛狐；描述：看钛狐潜袭爬虫、特快专递、精准投放与末日审判的官方实机演示，了解操作方式，预览、复制并调整金色横向瞄具准星。英文Title：VALORANT Tejo Abilities & Themed Crosshair Code | AimCodes。

独立教程候选：具体地图的反弹榴弹与导弹协同；当前缺少实际点位验证，不扩页、不加FAQ。

当前没有取得可用的实时钛狐GSC/GA4数据；GA4查询在工具会话中断后未返回，不把空缺写成0。2026-10-20搜索观察显示官方英雄页、角色设计文章、10.09补丁和实机揭晓视频承接相关查询，不以结果数估搜索量。未证明独立搜索需求，不新增索引。

| 语言 | 路径 | 查询候选 |
| --- | --- | --- |
| zh-CN | /zh-cn/valorant-tejo/ | 钛狐技能 / 钛狐准星 |
| en | /en/valorant-tejo/ | tejo abilities / crosshair |
| ja | /ja/valorant-tejo/ | テホ アビリティ / クロスヘア |
| es | /es/valorant-tejo/ | habilidades de Tejo |
| pt-BR | /pt-br/valorant-tejo/ | habilidades do Tejo / mira |

五语均noindex,follow、自canonical、无hreflang/x-default，排除主站/准星/图片三份Sitemap。首页同语种入口可发现。发布授权不扩大索引范围；未来需要新证据和单独决定。若重新评估索引，以28完整日GSC查询/点击/展示和GA4自然落地/复制为首轮窗口，样本不足延至56天，不自动创建监控。

## 官方来源与素材

- 英/日/西/巴葡：https://playvalorant.com/en-us/agents/tejo/ 及对应ja-jp/es-es/pt-br页面，公开`__NEXT_DATA__`的iconTab提供名称、图标、四段MP4。原始JSON/视频在本地data_raw/tejo-2026-10-20，原件未覆盖。
- 国服：https://api.val.qq.com/go/agame/graphql/graphiQL ，先查agents再查agent(id:26)的name/desc/skill{name desc icon keypad}，确认钛狐、C潜袭爬虫/Q特快专递/E精准投放/X末日审判。
- 角色设定与首图：https://playvalorant.com/en-us/news/game-updates/tejo-man-of-action/ ，官方首图 `39e592e2baec6235bbf0be647bc547e082d86aad-1920x1080.png`；派生hero.webp、og.jpg。不是角色模型正背面对照。
- 机制交叉核对：https://playvalorant.com/en-us/news/game-updates/valorant-patch-notes-10-09/ ，导弹已移除冷却回充，故正文不写自动回充。官方演示可能保留早期HUD，不声称当前补丁录制，不写价格、伤害和时长数值。
- 角色实机预告：https://www.youtube.com/watch?v=dRuRID5JoQY ，正常观看页确认VALORANT认证频道、标题Tejo Official Gameplay Reveal，并确认时间推进。下载遇到反机器人限制，未提取Cookie、未绕过登录；通过正常浏览器截图。
- 图集：预告88秒钛狐从烟尘中走出的近景，原始视频区域x14/y56/1172×659；裁切x320/y64/640×640，输出960×960。已逐图查看，排除2秒标题卡、5秒遮挡镜头、82秒奇乐镜头、86秒背面镜头和94秒Logo。图集不填充低质量素材。
- 技能：官方MP4转960×540 H.264、无音轨、faststart；图标转WebP，3秒帧作poster；四段无剪辑合并为abilities-overview.mp4。完整来源URL列表见docs/TEJO_MEDIA_SOURCES_2026-10-20.json；可复现处理入口为`node scripts/prepare-tejo-media.mjs`（需要保留本地原始素材）。

## 准星与文案

金色细长水平双臂、中心小点、外围四枚独立方形刻线。内线竖长为1，形成短刻线，与铁臂的粗四臂、猎枭的双层四向刻线、K/O的纵轨以及其他既有主题不同。生成、Canvas、复制、编辑器共用TEJO_GENERATOR_SETTINGS。只证明浏览器往返，不声称游戏客户端导入。

中文文案按dbs-ai-check 22项检查，体裁为玩家功能说明：未发现需要修改的明显套话、虚构经历、反复翻转或空泛升华；没有为了检测报告补充修辞。

## 验收与发布

待完成正式构建、完整release检查、桌面/手机交互与颜色、PR预览、CI、生产版本核验后记录。回滚通过只恢复当前页面变更的PR，不覆盖其他任务。

本地验收：`pnpm check:auto`自动选择release并25/25通过；显式`pnpm check:release`25/25通过。辅助check-agent确认五语noindex、自canonical、无hreflang、不入三份Sitemap，代码往返和与18个旧主题的几何比较通过。正式构建1440×900/390×844无横向溢出，首图人物/文字清晰；四视频readyState=4且时间推进，合辑可播放；灯箱Esc关闭、焦点返回；Haven/Bind地图和5×、实际剪贴板写入反馈、编辑器代码逐字一致。并排检查19个主题在同地图1×/5×造型；复用实际Canvas绘制函数，不写入产品。共享hushAgent.css追加到样式末尾后，钛狐hover背景rgb(255,225,163)、正文rgb(221,208,183)、焦点轮廓rgb(255,199,107)，主题保持；K/O按钮仍为rgb(167,161,255)。截图留本地data_processed，原始视频和账号资料不提交。

发布整合：预览提交4fc7ee7已确认由Cloudflare部署（部署4831a563）；本机系统DNS对workers.dev返回错误地址，经Cloudflare/Google DoH独立交叉核对为104.21.26.198/172.67.168.130，使用正确解析并保留TLS证书校验取回build-meta匹配4fc7ee7。临时127.0.0.1转发仅代理远端GET/HEAD，实际远端构建的首图、地图/5×、复制反馈与编辑器代码一致均通过；没有改系统DNS或跳过证书检查。正式域名仍需直接验证。随后主线合入星礈feb3430，已解决入口/元数据/静态HTML/生成器/语言白名单的并行新增冲突，保留两页；最终基线和PR以发布记录为准。
