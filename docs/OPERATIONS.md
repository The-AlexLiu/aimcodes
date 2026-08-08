# AimCodes 开发与发布手册

最后更新：2026-08-07

## 本地启动

```bash
pnpm install --frozen-lockfile
pnpm dev
```

生产构建与本地预览：

```bash
pnpm build
pnpm preview
```

不要直接打开生成 HTML 判断完整功能；优先通过本地 HTTP 服务访问语言路径。

## 完整验证

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

顺序要求：`validate:seo` 和 `validate:routing` 依赖最新 `dist`，因此必须在 `pnpm build` 之后运行。

## 手工浏览器验收

至少检查：

1. `/en/` 首页精选准星；
2. `/zh-cn/crosshairs/` 搜索、筛选和准星选择；
3. 单准星页面换地图、换颜色、复制代码；
4. `/zh-cn/reaction-time-test/` 完成三轮测试；
5. 结果页分享图和挑战链接；
6. 390px 左右移动端无横向溢出；
7. 键盘焦点、弹窗关闭和复制失败回退；
8. `/tools/social-renderer/` 封面和视频控件。

内部验收 URL 添加 `?qa=1`，避免污染 GA4。

## GA4 调试

- Measurement ID：`G-2VMCECN5S6`
- 本地调试：在 URL 加 `?ga_debug=1`
- 内部排除：在 URL 加 `?qa=1`
- 正式验证：GA4 实时报告和 DebugView

埋点修改后必须运行：

```bash
pnpm validate:analytics
```

事件或参数变化后同步更新 `GA4-安装与事件字典.md`。

## SEO 与 GSC

SEO/语言改动后检查：

- title 与 description；
- canonical；
- 四语种双向 hreflang；
- Open Graph；
- JSON-LD；
- robots.txt；
- sitemap.xml；
- 页面是否真正返回 200。

上线后在 GSC 中提交或重新检查 `https://aimcodes.com/sitemap.xml`。不因为页面刚发布就重复批量提交相同 URL。

## Netlify

当前项目：

- 名称：`aimcodes`
- Project ID：`b244d8b7-4cce-46de-b9b5-2b4f29e30392`
- Build command：`pnpm build`
- Publish directory：`dist`
- Production URL：`https://aimcodes.com`

目标发布方式：

```text
功能分支 → GitHub PR → Netlify Preview → 人工验收 → 合并 main → 自动生产发布
```

如果仍需手动发布，必须先获得用户明确授权，并在发布前确认：

- 当前分支；
- `git status -sb`；
- 即将发布的构建是否包含未提交修改；
- 完整验证是否通过；
- `npx netlify status` 指向正确项目。

生产命令只在明确授权后执行：

```bash
npx netlify deploy --prod --dir=dist
```

## 发布后检查

```text
https://aimcodes.com/en/
https://aimcodes.com/es/
https://aimcodes.com/pt-br/
https://aimcodes.com/zh-cn/
https://aimcodes.com/sitemap.xml
https://aimcodes.com/tools/social-renderer/
```

确认状态码、主要交互、社媒链接、GA4 和静态资源版本。

## 渲染器同步检查

在三份文件都存在的本机，可运行：

```bash
shasum \
  public/tools/social-renderer/index.html \
  output/promo_assets/source/promo-renderer.html \
  ../AimCodes-Social-Creative-Renderer/renderer/index.html
```

三个校验值必须一致。团队成员没有本地 `output/` 或独立仓库时，应在 PR 中明确说明只验证了哪些副本。

## 交接格式

每次跨 GPT/Codex、Cursor 或开发者交接，记录：

```text
任务：
分支：
最后提交：
完成内容：
修改文件：
验证结果：
已有未提交修改：
尚未完成：
需人工确认：
是否影响生产：
```
