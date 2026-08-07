# AimCodes 共享开发规则

本文件是 AimCodes 在 GPT/Codex、Antigravity 以及其他编程智能体之间共用的项目级规则。打开仓库后，先读取本文件，再读取 `docs/` 中的项目状态与架构说明。

## 开始任务前

1. 依次阅读：
   - `README.md`
   - `docs/PROJECT_CONTEXT.md`
   - `docs/ARCHITECTURE.md`
   - `docs/CURRENT_STATE.md`
   - `docs/DECISIONS.md`
   - `docs/HANDOFF.md`
2. 运行 `git status -sb`，确认当前分支和已有修改。
3. 现有未提交修改默认属于用户，不得覆盖、回滚、删除或顺手提交。
4. 一个任务只使用一个分支和一个工作目录；GPT/Codex 与 Antigravity 不得同时修改同一工作树。
5. 如果任务目标、线上状态或数据来源不明确，先进行只读检查，再说明“需确认”的内容。

## 项目事实

- 正式站点：`https://aimcodes.com`
- 主仓库：`https://github.com/The-AlexLiu/aimcodes`
- 社媒渲染器镜像：`https://github.com/The-AlexLiu/AimCodes-Social-Creative-Renderer`
- 技术栈：React、Vite、Canvas、原生 CSS、Netlify、GA4。
- 支持语言：英语 `en`、西班牙语 `es`、巴西葡萄牙语 `pt-BR`、简体中文 `zh-CN`。
- 当前产品基线包含 62 条准星源数据，经外观去重后展示约 60 种样式；数量变化必须以验证脚本结果为准。
- 反应测试固定三轮，使用 9 个无畏契约风格反应段位，只代表浏览器反应测试结果。

## 代码边界

- React 源码位于 `src/`；不要直接编辑构建产物 `dist/`。
- 多语种词条位于 `src/i18n/` 与 `src/seo/content.js`。任何用户可见文案改动必须同步四种语言。
- 多语种路径规则位于 `src/i18n/localeRoutes.js` 与 `src/seo/routes.js`。
- 准星源数据位于 `src/data/crosshairs.js` 与 `src/data/expandedCrosshairs.js`。
- 准星代码必须可以被 `src/utils/crosshairCode.js` 解析；不要编造未经验证的代码。
- GA4 事件统一通过 `src/utils/analytics.js` 发送。事件名使用小写下划线，不发送搜索原词、个人信息或敏感值。
- `?qa=1` 用于内部验收并阻止 GA4 上报；`?ga_debug=1` 用于本地 DebugView 调试。
- 公开素材、Logo、favicon 和地图放在 `public/` 或 `src/assets/`，不要使用本机绝对路径。

## 社媒渲染器边界

当前渲染器存在三份相同副本：

1. 主站产品副本：`public/tools/social-renderer/index.html`
2. 本地历史素材源：`output/promo_assets/source/promo-renderer.html`（被 Git 忽略）
3. 独立作品集仓库：`../AimCodes-Social-Creative-Renderer/renderer/index.html`

在完成单一源重构前：

- 将主站 `public/tools/social-renderer/index.html` 视为产品发布基准。
- 不得只修改被 Git 忽略的 `output/` 副本。
- 修改后必须同步独立仓库副本并比较三个文件的校验值。
- 不得在未说明同步范围的情况下分别编辑三个文件。

## 修改原则

- 保持用户操作路径简单：预览、调整、复制；反应测试完成后直接试用推荐准星。
- C 端文案应自然、简短、像玩家说话，避免后台术语和过度解释。
- 移动端不是次要版本；新增功能必须检查窄屏、键盘焦点和无横向溢出。
- 不添加无法工作的按钮、假数据、无效准星代码或只在本机可用的资源。
- 不直接删除、覆盖或重命名原始文件；大改前先备份或使用新文件。
- 不读取、输出或提交 `.env`、Cookie、Token、API Key、Google 凭据或账号密码。

## Git 与发布

- 禁止直接在 `main` 开发；使用 `antigravity/<task>`、`codex/<task>`、`fix/<task>` 或 `feat/<task>` 分支。
- 提交前只暂存本任务文件，禁止在混合工作树中使用 `git add -A`。
- 未经用户明确授权，不得推送 GitHub、合并 PR、修改线上配置或执行生产部署。
- 生产部署目标是：PR 预览通过后合并 `main`，由 Netlify 自动发布。
- 当前 Netlify 仍可能由本地 CLI 手动发布；执行 `netlify deploy --prod` 前必须获得明确授权。

## 必须运行的验证

基础修改至少运行：

```bash
pnpm lint
pnpm build
```

准星或推荐逻辑修改：

```bash
pnpm validate:crosshairs
pnpm validate:finder
```

语言、SEO 或路由修改：

```bash
pnpm validate:localization
pnpm build
pnpm validate:seo
pnpm validate:routing
```

埋点修改：

```bash
pnpm validate:analytics
```

提交或交接前优先运行完整检查：

```bash
pnpm lint
pnpm validate:crosshairs
pnpm validate:finder
pnpm validate:localization
pnpm validate:analytics
pnpm build
pnpm validate:seo
pnpm validate:routing
```

## 完成与交接

完成任务时必须说明：

- 修改了哪些文件；
- 新生成了哪些文件；
- 哪些既有修改被跳过；
- 运行了哪些验证以及结果；
- 是否影响 GitHub、Netlify、GA4、GSC 或生产站；
- 下一位开发者还需要人工确认什么。

如果任务跨工具继续，在 `docs/HANDOFF.md` 或对应 PR 中留下当前分支、最后提交、完成项、待办项和验证结果。
