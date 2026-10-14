# 多语种修复与本地目录整理（2026-10-14）

状态：本地实现及机械验证完成；未提交、未推送、未创建 PR、未部署。生产网站尚未包含本轮修复。

分支：`codex/localization-audit-oct14`。基线/最后提交：`ae87bd957d36e4260e5ea20d10ed0e6477ebda02`。原 `codex/ga4-instrumentation-audit` 工作树和所有其他既有修改未动。

## 已完成

- 补齐五语种射击误差图表与准星反馈的区别，以及网站代码导入和观战复制命令说明；保留各语言自然表达。
- 五语种圆点页统一三款推荐和入口；小型、可爱、趣味集合统一同类导航范围。
- 中文地图选择及图片描述使用词典；付费私有页面标题和说明使用对应语言。
- 八类集合补充各自使用场景，去除通用 Best 内容回退；明确主准星与狙击镜预览的边界。
- 统计与页面共用去重口径：圆点集合 65 条来源记录，对应 64 张展示卡片。全部 548 条来源记录、540 种普通目录可见样式保留。
- 统一中文结论标签；准星包待恢复状态提供恢复说明与返回测试入口，不再让用户误以为仍在等待支付。
- 增加 16 项多语种内容与统计回归测试，接入现有语言检查；SEO 日期检查识别真实来源核对日期。

## 文件范围

新增：`src/data/catalogDisplay.js`、`src/seo/coreGuideUpdates.js`、`src/seo/dotSelectionContent.js`、`src/seo/collectionUseCases.js`、`scripts/test-localization-parity.mjs`、本报告及 `docs/WORKTREE_CLEANUP_REVIEW_2026-10-14.md`。

修改：`package.json`；两项 SEO 校验脚本；`AimPackPortal.jsx`、`CrosshairColorComparison.jsx`；目录 hook、统计模块；集合、统计、指南、搜索文章和 metadata 模块；交接文档。

## 验证

- `pnpm check:auto` 首次发现日期白名单缺少真实来源日期，修复后 `pnpm check:release` 25/25 全通过。
- 语言回归 16/16、支付回归 24/24；构建、数据、路由、链接、图片、埋点、性能预算和依赖审计通过。
- 本地真实浏览器：五语种圆点页面分别在 1200px 和 390px 检查，页面宽度没有横向溢出，均有三款推荐与 64 条展示数量。
- 中文颜色比较页在 390px 无横向溢出；地图选项已中文化；选择隐世修所后，三个颜色链接均更新为 `mapa=haven`。
- 浏览器截图接口多次超时，原生截图也未能定位任务窗口，因此未完成截图视觉验收。发布预览需补看字体、图片、折行和焦点效果，不能将 DOM 检查当成完整视觉验收。
- 本地证据：`output/localization-audit/browser-check.json`；结构化报告：`.aimcodes-reports/current/verification.md`。这些忽略目录中的证据需在归档前保留。
- 英文验收使用 `/en/` 正确语言路径；首次用无语言前缀的地址落到首页，已纠正检查地址。

## 上线与清理边界

未改变 GitHub、Netlify、GA4/GSC 配置或生产支付；没有发起付款。既有中文 noindex 策略未变。上线前需要用户明确授权推送/PR/发布，再检查 CI、Netlify 预览和生产页面。

旧目录约 6.9 GiB，许多功能已通过 PR 合并。清理建议见 `WORKTREE_CLEANUP_REVIEW_2026-10-14.md`；本轮没有删除或归档旧目录。优先处理已合并且无独立改动的目录，保留有未提交工作和本地研究产物的目录。清理降低磁盘占用与误用旧分支的风险，不会加快线上网站。
