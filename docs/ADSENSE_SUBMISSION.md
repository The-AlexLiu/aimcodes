# AimCodes AdSense 提交与上线清单

最后更新：2026-08-10

## 当前结论

代码层已经按 AdSense 审核目标准备：站点提供原创工具与说明内容、四语种信任页面、隐私与 Cookie 说明、玩家内容与权利说明、有效联系入口，以及未来广告页面白名单。

AdSense 账号创建、身份/年龄确认、付款资料、发布商 ID、站点验证码和 Google 认证 CMP 必须在 Google 后台由账号所有者完成，不能在仓库中预填或猜测。

## 提交前自动检查

在项目根目录运行：

```bash
pnpm install --frozen-lockfile
pnpm lint
pnpm validate:crosshairs
pnpm validate:finder
pnpm validate:localization
pnpm validate:analytics
pnpm validate:sharing
pnpm build
pnpm validate:seo
pnpm validate:routing
pnpm validate:adsense
```

全部通过后再发布 `main` 分支。

## AdSense 后台需要人工完成

1. 用网站实际所有者的 Google 账号进入 AdSense，并确认申请人年满 18 岁。
2. 添加网站 `aimcodes.com`，不要填写 `/en/`、`/zh-cn/` 等语言路径。
3. 将 Google 提供的真实站点验证代码或发布商 ID 交给开发者安装；不要使用示例 `ca-pub-`。
4. 保持 Auto Ads 关闭，先完成站点所有权验证与审核。AimCodes 后续应使用手动广告位，避免广告靠近“复制代码”“导入”“分享”和反应测试点击区域。
5. 提交审核后保持页面、导航、HTTPS、站点地图和重要内容可公开访问，不要开启登录墙。

## 通过审核后再做

1. 使用真实发布商 ID 创建根目录 `ads.txt`：

   `google.com, pub-真实数字ID, DIRECT, f08c47fec0942fa0`

2. 在 AdSense 的“隐私权和消息”中启用 Google 认证的 CMP，至少覆盖欧洲经济区、英国和瑞士。
3. 先只增加 2–3 个手动广告位，并保留明显的内容间距：
   - 教程/文章正文第二个完整内容段之后；
   - 准星集合页的说明与 FAQ 之间；
   - 首页原创选择指南之后。
4. 永不放广告的位置：
   - 反应速度测试及成绩交互区；
   - 复制、导入、分享、随机选择等按钮附近；
   - 404、隐私、条款、联系页面；
   - 非重点准星薄内容详情页；
   - 推广素材渲染器。
5. 用 GA4 单独记录广告位曝光和内容互动，但不要把广告点击作为自定义事件发送，也不要诱导用户点击广告。

## 提交前人工抽查

- [ ] `https://aimcodes.com/` 能按设备语言跳转且 HTTPS 正常。
- [ ] 英语、西语、葡语、中文的首页、目录页、关于页、隐私页、条款页和联系页都可打开。
- [ ] 页脚中的关于、隐私、条款、联系链接有效。
- [ ] 站点没有占位文案、空白卡片、控制台报错或无法加载的主要图片。
- [ ] `https://aimcodes.com/sitemap.xml` 返回 200，GSC 可读取。
- [ ] 手机端没有文字重叠、横向溢出、按钮遮挡或误触风险。
- [ ] Google Analytics 不包含明显的内部测试流量后，再用其判断真实用户体验。
- [ ] 已准备一个长期可用的域名邮箱（建议 `hello@aimcodes.com` 或 `legal@aimcodes.com`），之后替换/补充当前 GitHub 与社媒联系入口。

## 官方依据

- AdSense 资格与原创内容：https://support.google.com/adsense/answer/9724?hl=en
- Google 发布商政策：https://support.google.com/publisherpolicies/answer/10502938?hl=en
- 低价值或无发布商内容页面：https://support.google.com/publisherpolicies/answer/11112688?hl=en
- 广告展示位置与误触：https://support.google.com/adsense/answer/1346295?hl=en
- Google 认证 CMP 要求：https://support.google.com/adsense/answer/13554116?hl=en
- `ads.txt` 指南：https://support.google.com/adsense/answer/9785052?hl=en
