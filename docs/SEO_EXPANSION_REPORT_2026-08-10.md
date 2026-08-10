# AimCodes SEO 扩充审计与 Phase 1 交付报告

更新日期：2026-08-10
工作分支：`feat/seo-knowledge-base-phase1`

## 结论

- 基线：308 条本地化生成路由，112 个 Sitemap URL；每种语言 28 个可索引页面。
- Phase 1：新增 24 个独立英文搜索主题，并同步为英语、西语、巴西葡语、简体中文，共新增 96 个可索引 Canonical URL。
- 当前构建：404 条本地化生成路由，208 个 Sitemap URL；每种语言 52 个可索引页面。
- 新增主题组成：10 个 Collection、10 个 Guide、4 个可真实使用的 Tool。
- 未创建任何未经验证的职业选手页面；25 个指定玩家均保持 `Needs Verification`，不进入 Sitemap。
- `/tools/valorant-crosshair-finder/` 与现有 `/reaction-time-test/` 意图及功能重复，保留原 URL；后者继续作为站内准星推荐工具。
- `valorant-crosshair-code-generator` 与已上线的 Generator 搜索意图和功能重复，不建立第二个薄页面。

## Existing SEO Routes

原项目已包含：主页、准星数据库、5 个 Collection（Best、Pro、Dot、Cute、Small）、导入指南、2 个知识页（Settings、Colors）、16 个优先准星详情页、反应测试/准星推荐工具以及信任页面。原 URL 均保留。

## Duplicate / Conflict Decisions

| Requested route | Decision | Reason |
| --- | --- | --- |
| `/en/tools/valorant-crosshair-finder/` | Skipped | 与 `/en/reaction-time-test/` 同一搜索意图；避免重复页面，工具页反向链接现有 Finder。 |
| `/en/tools/valorant-crosshair-code-generator/` | Skipped | 与 `/en/tools/valorant-crosshair-generator/` 功能完全重叠。 |
| Funny / Meme | Draft | 搜索意图高度重叠；需先扩充真实趣味代码并确认是否合并。 |
| Pink / Magenta | Pink Created; Magenta Draft | 当前数据库足以支撑 Pink，但不足以支撑独立 Magenta 集合。 |
| Small / Tiny | Existing Small; Tiny Draft | Tiny 必须有不同的筛选规则和独立结果集，不能只换词。 |

## 100-URL Status

| URL | Type | Keyword | Priority | Status | Indexable | Data Source |
| --- | --- | --- | --- | --- | --- | --- |
| `/en/funny-crosshairs/` | Collection | funny valorant crosshairs | P0 | Draft | No | 待扩充真实趣味代码 |
| `/en/circle-crosshairs/` | Collection | valorant circle crosshair | P0 | Created | Yes | AimCodes 已验证代码库 |
| `/en/heart-crosshairs/` | Collection | valorant heart crosshair | P0 | Draft | No | 当前仅 1 个真实爱心代码 |
| `/en/flower-crosshairs/` | Collection | valorant flower crosshair | P0 | Draft | No | 当前结果不足以形成独立集合 |
| `/en/cat-crosshairs/` | Collection | valorant cat crosshair | P0 | Draft | No | 当前仅 1 个真实猫猫代码 |
| `/en/pink-crosshairs/` | Collection | pink valorant crosshair | P0 | Created | Yes | AimCodes 已验证代码库 |
| `/en/cyan-crosshairs/` | Collection | cyan valorant crosshair | P0 | Created | Yes | AimCodes 已验证代码库 |
| `/en/green-crosshairs/` | Collection | green valorant crosshair | P0 | Created | Yes | AimCodes 已验证代码库 |
| `/en/white-crosshairs/` | Collection | white valorant crosshair | P0 | Draft | No | 待 Phase 2 内容与筛选 |
| `/en/thin-crosshairs/` | Collection | thin valorant crosshair | P0 | Draft | No | 待补 thickness 标签 |
| `/en/tiny-crosshairs/` | Collection | tiny valorant crosshair | P0 | Draft | No | 与 Small 的意图需区分 |
| `/en/minimalist-crosshairs/` | Collection | minimalist valorant crosshair | P0 | Created | Yes | AimCodes 已验证代码库 |
| `/en/static-crosshairs/` | Collection | static valorant crosshair | P0 | Draft | No | 待补 error/style 标签 |
| `/en/center-dot-crosshairs/` | Collection | valorant center dot crosshair | P0 | Draft | No | 待补 centerDot 标签 |
| `/en/headshot-crosshairs/` | Collection | best valorant crosshair for headshots | P0 | Created | Yes | AimCodes 已验证代码库 + 编辑选取 |
| `/en/beginner-crosshairs/` | Collection | best valorant crosshair for beginners | P0 | Created | Yes | AimCodes 已验证代码库 + 编辑选取 |
| `/en/one-tap-crosshairs/` | Collection | valorant one tap crosshair | P0 | Created | Yes | AimCodes 已验证代码库 + 编辑选取 |
| `/en/vandal-crosshairs/` | Collection | best crosshair for vandal | P0 | Created | Yes | AimCodes 已验证代码库 + 编辑选取 |
| `/en/phantom-crosshairs/` | Collection | best crosshair for phantom | P0 | Created | Yes | AimCodes 已验证代码库 + 编辑选取 |
| `/en/meme-crosshairs/` | Collection | valorant meme crosshairs | P1 | Draft | No | 与 Funny 重叠，待评估 |
| `/en/square-crosshairs/` | Collection | valorant square crosshair | P1 | Draft | No | 待扩充真实方形代码 |
| `/en/red-crosshairs/` | Collection | red valorant crosshair | P1 | Draft | No | 待 Phase 2 |
| `/en/yellow-crosshairs/` | Collection | yellow valorant crosshair | P1 | Draft | No | 待 Phase 2 |
| `/en/magenta-crosshairs/` | Collection | magenta valorant crosshair | P1 | Draft | No | 与 Pink 需形成独立结果集 |
| `/en/thick-crosshairs/` | Collection | thick valorant crosshair | P1 | Draft | No | 待补 thickness 标签 |
| `/en/dynamic-crosshairs/` | Collection | dynamic valorant crosshair | P1 | Draft | No | 待补 error/style 标签 |
| `/en/crosshairs-with-outlines/` | Collection | valorant crosshair with outline | P1 | Draft | No | 待补 outline 标签 |
| `/en/crosshairs-without-outlines/` | Collection | valorant crosshair no outline | P1 | Draft | No | 待补 outline 标签 |
| `/en/open-center-crosshairs/` | Collection | open center valorant crosshair | P1 | Draft | No | 待补 gap/shape 标签 |
| `/en/closed-crosshairs/` | Collection | closed valorant crosshair | P1 | Draft | No | 待补 gap/shape 标签 |
| `/en/how-to-copy-crosshair-in-valorant/` | Guide | how to copy crosshair in valorant | P0 | Created | Yes | Riot Patch 5.04 + 编辑验证 |
| `/en/how-to-export-valorant-crosshair/` | Guide | how to export valorant crosshair | P0 | Draft | No | Riot Patch 4.05，待 Phase 2 |
| `/en/how-to-share-valorant-crosshair/` | Guide | how to share valorant crosshair | P1 | Draft | No | 待 Phase 2 |
| `/en/valorant-crosshair-code-not-working/` | Guide | valorant crosshair code not working | P0 | Created | Yes | Riot Patch 4.05 + 本地解析器 |
| `/en/how-to-reset-valorant-crosshair/` | Guide | how to reset valorant crosshair | P1 | Draft | No | 待游戏 UI 复核 |
| `/en/how-to-delete-crosshair-profile-valorant/` | Guide | delete valorant crosshair profile | P2 | Draft | No | 待游戏 UI 复核 |
| `/en/how-to-save-multiple-crosshairs-valorant/` | Guide | save multiple valorant crosshairs | P1 | Draft | No | Riot 官方资料，待 Phase 2 |
| `/en/how-to-make-dot-crosshair-valorant/` | Guide | how to make dot crosshair valorant | P0 | Created | Yes | AimCodes 参数解析 + 编辑验证 |
| `/en/how-to-make-circle-crosshair-valorant/` | Guide | how to make circle crosshair valorant | P0 | Created | Yes | Riot Patch 5.04 + 真实圆形代码 |
| `/en/how-to-make-heart-crosshair-valorant/` | Guide | how to make heart crosshair valorant | P0 | Draft | No | 真实样本不足 |
| `/en/how-to-make-flower-crosshair-valorant/` | Guide | valorant flower crosshair settings | P1 | Draft | No | 真实样本不足 |
| `/en/how-to-make-cat-crosshair-valorant/` | Guide | valorant cat crosshair settings | P0 | Draft | No | 真实样本不足 |
| `/en/how-to-make-small-crosshair-valorant/` | Guide | how to make small crosshair valorant | P1 | Draft | No | 待 Phase 2 |
| `/en/how-to-make-plus-crosshair-valorant/` | Guide | valorant plus crosshair | P1 | Draft | No | 待 Phase 2 |
| `/en/how-to-use-custom-crosshair-color-valorant/` | Guide | valorant custom crosshair color | P0 | Draft | No | Riot Patch 5.04，待 Phase 2 |
| `/en/valorant-movement-error-crosshair/` | Guide | valorant movement error | P0 | Created | Yes | Riot 术语 + 编辑验证 |
| `/en/valorant-firing-error-crosshair/` | Guide | valorant firing error | P0 | Created | Yes | Riot Patch 3.03 + 编辑验证 |
| `/en/movement-error-vs-firing-error-valorant/` | Guide | movement error vs firing error valorant | P0 | Created | Yes | Riot 术语 + 实际设置逻辑 |
| `/en/valorant-crosshair-outlines-on-or-off/` | Guide | valorant crosshair outlines on or off | P1 | Draft | No | 待 Phase 2 |
| `/en/valorant-center-dot-on-or-off/` | Guide | valorant center dot on or off | P1 | Draft | No | 待 Phase 2 |
| `/en/valorant-inner-lines-vs-outer-lines/` | Guide | valorant inner lines vs outer lines | P1 | Draft | No | 待 Phase 2 |
| `/en/valorant-crosshair-opacity/` | Guide | valorant crosshair opacity | P2 | Draft | No | 待 Phase 2 |
| `/en/valorant-crosshair-thickness/` | Guide | valorant crosshair thickness | P1 | Draft | No | 待 Phase 2 |
| `/en/valorant-crosshair-gap-offset/` | Guide | valorant crosshair offset gap | P1 | Draft | No | 待 Phase 2 |
| `/en/static-vs-dynamic-crosshair-valorant/` | Guide | static vs dynamic crosshair valorant | P0 | Created | Yes | Riot 设置语义 + 编辑验证 |
| `/en/dot-vs-cross-crosshair-valorant/` | Guide | dot vs cross crosshair valorant | P0 | Created | Yes | 真实代码对比 + 编辑验证 |
| `/en/cyan-vs-green-crosshair-valorant/` | Guide | cyan vs green crosshair valorant | P1 | Draft | No | 待 Phase 2 |
| `/en/white-vs-cyan-crosshair-valorant/` | Guide | white vs cyan valorant crosshair | P2 | Draft | No | 待 Phase 2 |
| `/en/crosshair-color-vs-enemy-highlight-color-valorant/` | Guide | best crosshair enemy color combination | P0 | Draft | No | 需补可视化对比工具 |
| `/en/best-crosshair-color-yellow-enemy-outline/` | Guide | best crosshair color yellow enemy outline | P1 | Draft | No | 待 Phase 2 |
| `/en/best-crosshair-color-purple-enemy-outline/` | Guide | best crosshair color purple enemy outline | P1 | Draft | No | 待 Phase 2 |
| `/en/best-crosshair-color-red-enemy-outline/` | Guide | best crosshair color red enemy outline | P1 | Draft | No | 待 Phase 2 |
| `/en/valorant-crosshair-placement-guide/` | Guide | valorant crosshair placement | P0 | Created | Yes | 编辑指南 + 真实准星示例 |
| `/en/valorant-head-level-crosshair-placement/` | Guide | valorant head level crosshair placement | P0 | Draft | No | 待补地图视觉示例 |
| `/en/should-you-change-your-crosshair-valorant/` | Guide | should you change your crosshair valorant | P2 | Draft | No | 待 Phase 2 |
| `/en/crosshairs/zekken/` | Player | zekken crosshair | P0 | Needs Verification | No | 未找到已验证代码/来源/日期 |
| `/en/crosshairs/derke/` | Player | derke crosshair | P0 | Needs Verification | No | 未找到已验证代码/来源/日期 |
| `/en/crosshairs/nats/` | Player | nats crosshair | P0 | Needs Verification | No | 未找到已验证代码/来源/日期 |
| `/en/crosshairs/alfajer/` | Player | alfajer crosshair | P0 | Needs Verification | No | 未找到已验证代码/来源/日期 |
| `/en/crosshairs/chronicle/` | Player | chronicle crosshair | P0 | Needs Verification | No | 未找到已验证代码/来源/日期 |
| `/en/crosshairs/leo/` | Player | leo crosshair | P0 | Needs Verification | No | 未找到已验证代码/来源/日期 |
| `/en/crosshairs/cryocells/` | Player | cryocells crosshair | P0 | Needs Verification | No | 未找到已验证代码/来源/日期 |
| `/en/crosshairs/boostio/` | Player | boostio crosshair | P0 | Needs Verification | No | 未找到已验证代码/来源/日期 |
| `/en/crosshairs/jawgemo/` | Player | jawgemo crosshair | P0 | Needs Verification | No | 未找到已验证代码/来源/日期 |
| `/en/crosshairs/bang/` | Player | bang crosshair | P0 | Needs Verification | No | 未找到已验证代码/来源/日期 |
| `/en/crosshairs/valyn/` | Player | valyn crosshair | P0 | Needs Verification | No | 未找到已验证代码/来源/日期 |
| `/en/crosshairs/trent/` | Player | trent crosshair | P0 | Needs Verification | No | 未找到已验证代码/来源/日期 |
| `/en/crosshairs/leaf/` | Player | leaf crosshair | P0 | Needs Verification | No | 未找到已验证代码/来源/日期 |
| `/en/crosshairs/t3xture/` | Player | t3xture crosshair | P0 | Needs Verification | No | 未找到已验证代码/来源/日期 |
| `/en/crosshairs/karon/` | Player | karon crosshair | P0 | Needs Verification | No | 未找到已验证代码/来源/日期 |
| `/en/crosshairs/meteor/` | Player | meteor crosshair | P0 | Needs Verification | No | 未找到已验证代码/来源/日期 |
| `/en/crosshairs/mako/` | Player | mako crosshair | P0 | Needs Verification | No | 未找到已验证代码/来源/日期 |
| `/en/crosshairs/something/` | Player | something crosshair | P0 | Needs Verification | No | 未找到已验证代码/来源/日期 |
| `/en/crosshairs/mindfreak/` | Player | mindfreak crosshair | P0 | Needs Verification | No | 未找到已验证代码/来源/日期 |
| `/en/crosshairs/d4v41/` | Player | d4v41 crosshair | P0 | Needs Verification | No | 未找到已验证代码/来源/日期 |
| `/en/crosshairs/suygetsu/` | Player | suygetsu crosshair | P0 | Needs Verification | No | 未找到已验证代码/来源/日期 |
| `/en/crosshairs/shao/` | Player | shao crosshair | P0 | Needs Verification | No | 未找到已验证代码/来源/日期 |
| `/en/crosshairs/tarik/` | Player | tarik crosshair | P0 | Needs Verification | No | 未找到已验证代码/来源/日期 |
| `/en/crosshairs/shroud/` | Player | shroud crosshair | P0 | Needs Verification | No | 未找到已验证代码/来源/日期 |
| `/en/crosshairs/sinatraa/` | Player | sinatraa crosshair | P0 | Needs Verification | No | 未找到已验证代码/来源/日期 |
| `/en/tools/valorant-crosshair-generator/` | Tool | valorant crosshair generator | P0 | Created | Yes | AimCodes 生成器 + 解析器 |
| `/en/tools/valorant-crosshair-randomizer/` | Tool | random valorant crosshair generator | P1 | Draft | No | 待 Phase 5 |
| `/en/tools/valorant-crosshair-code-decoder/` | Tool | valorant crosshair code decoder | P0 | Created | Yes | AimCodes 解析器 |
| `/en/tools/valorant-crosshair-code-generator/` | Tool | valorant crosshair code generator | P0 | Skipped | No | 与 Generator 重复 |
| `/en/tools/valorant-crosshair-comparison/` | Tool | compare valorant crosshairs | P1 | Created | Yes | AimCodes 已验证代码库 |
| `/en/tools/valorant-crosshair-finder/` | Tool | find my valorant crosshair | P0 | Improved | Yes | 保留 `/en/reaction-time-test/` |
| `/en/tools/valorant-crosshair-preview/` | Tool | valorant crosshair preview | P0 | Created | Yes | AimCodes 解析器 + 地图预览 |
| `/en/tools/valorant-crosshair-color-picker/` | Tool | valorant crosshair color picker | P1 | Draft | No | 不上线不完整取色器 |
| `/en/tools/valorant-sensitivity-converter/` | Tool | valorant sensitivity converter | P1 | Draft | No | 待真实换算逻辑 |
| `/en/tools/valorant-edpi-calculator/` | Tool | valorant edpi calculator | P1 | Draft | No | 待真实计算逻辑 |

## 自动检查结果

- Build：通过。
- ESLint：通过。
- 404 个生成路由：通过。
- 208 个 Indexable Sitemap URL：Canonical、robots、hreflang、Title、Description 检查通过。
- Duplicate indexed Title：0。
- Duplicate indexed Description：0。
- 12,699 个生成 HTML 内部链接：无断链。
- Generator：3 组参数生成后重新解析通过。
- Decoder：62 个数据库代码解析通过；空值和损坏代码拒绝通过。
- 浏览器检查：英文 Collection、英文 Generator/Decoder、中文 Guide、中文移动端 Generator 无控制台错误和明显溢出。

## 下一阶段

1. Phase 2：优先补 Export、Custom Color、Head-level Placement，以及 White/Thin/Static/Center-dot Collections。
2. 职业选手数据研究单独进行：每条必须含 code、source、verifiedAt；无法验证则继续 noindex。
3. Phase 5 工具：先做 eDPI Calculator 和 Sensitivity Converter，再考虑 Color Picker；每个工具完成后才开放索引。
4. 发布前再次运行完整验证，并在获得明确授权后再提交 GitHub/Netlify。
