# AimCodes Clarity 接入与漏洞修复

日期：2026-10-09（Asia/Shanghai）。本次用户已授权推送、合并与部署。

## 发布范围

- 基于最新主线 `10ba735`，发布分支 `codex/clarity-release`。原 GA4 审计工作树落后主线 40 个提交，其未提交修改和其他用户文件全部保留，没有加入本次发布。
- Clarity 项目：AimCodes；域名 https://aimcodes.com；项目 ID `yuxaq5sl26`。
- 后台：https://clarity.microsoft.com/projects/view/yuxaq5sl26/dashboard
- 新增 `src/utils/clarity.js`，在 `src/main.jsx` 的跳转检查之后初始化一次，异步加载官方 tag。
- 只在正式域名加载，排除本地、Deploy Preview、QA、永久 opt-out、付费交付/找回页面以及带敏感参数的链接。存储不可访问时停止录制。
- 不修改 GA4、支付、推荐算法、准星数据或路由。原有付费隐私说明完整保留；新增 Clarity 披露同步五种语言。
- 默认发送 `consentv2` 的 denied 存储信号；当前没有 CMP，不假设用户同意，不使用 Clarity 的广告与统计 Cookie。跨页面会话关联受限。
- `source-map-js` 从 1.2.1 精确固定到官方修复版本 1.2.2；未升级 Vite 或 React。
- `validate:clarity` 纳入 release 检查和 CI；10 项测试覆盖生产加载、去重、同意信号、QA、opt-out、预览禁用、存储失败、五语种披露及付费链接排除。

## 验证与交接

基于最新主线的 `pnpm check:auto` 自动选择完整 release 套件，25/25 通过；10 项 Clarity 测试通过，依赖审计无已知漏洞。五语种隐私页在 390px 下无横向溢出，中文桌面检查通过；既有 Whop 购买说明保留，本地不加载 Clarity。构建为 3,150 条本地化路由、1,887 条主 Sitemap URL。页面内容仅增加隐私披露，没有新增索引页、查询目标或路由。PR/预览及生产验证结果在后续发布记录中补充。

发布后需要确认：正式浏览器加载真实 tag，`/collect` 成功，Clarity 后台能看到此次验收访问；QA 与 opt-out 无 Clarity 请求。不会执行真实付款或发送恢复邮件。

官方依据：

- https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-setup
- https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-consent-api-v2
- https://github.com/advisories/GHSA-68fv-2mgg-jv7q
