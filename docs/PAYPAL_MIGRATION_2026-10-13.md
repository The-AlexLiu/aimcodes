# AimCodes 支付检查与 PayPal 迁移草稿

检查日期：2026-10-13（北京时间）。本地分支：`codex/aimcodes-paypal-checkout`，基线 `origin/main` 的 `47528c5`。线上 build-meta 为 `ea03ba732507051ffa7e5b269f8ba0115ae942d9`。

## 结论与证据

建议替换 Whop。用户已确认 PayPal.cn 审核和网站收单开通，并明确表示 Whop 没有成功生产交付，授权直接清除。

线上非扣款浏览器检查发现：完成三轮测试 → 商品介绍 → 三组偏好与邮箱 → Whop iframe。USD 1.99 的数字商品仍展示姓名、账单地址、Card、Bank Wire、Crypto、ACH、WeChat Pay，当前未见 PayPal。站内“无需账号”不代表免去支付渠道验证。390px 外层页面没有横向溢出，但结账信息层次繁重。

为检查 iframe，使用网站公开联系邮箱创建一个未付款会话；没有输入银行卡、登录付款账户或进行实际扣款。QA 页面阻止本次站内行为进入 GA4。测试反应成绩来自自动操作，不代表真人表现。

对照生产提交确认的代码问题：

- iframe 无加载失败后的用户重试方案；`checkout_loaded` 在付款组件实际显示之前就记录。
- RecoveryView 原本不检查 HTTP 失败，异常分支仍显示“已发送”。
- 返回页只依赖通知到账，并轮询后转向找回；邮件服务未启用时需人工支持。
- Sandbox 历史成功记录不能证明正式生产交付成功；当前没有独立买家订单端到端证据。

## 本地改动

删除两个 Whop 依赖与锁文件条目，删除 Whop 配置模块及 Webhook，移除 iframe 组件和相关前端逻辑。原文件备份在 Git 忽略的 `output/paypal-audit-2026-10-13/backups/`，没有删除订单或权益数据。

新增 `paypal.mjs`、`fulfillment.mjs`、`aim-pack-paypal-capture.mjs`、`aim-pack-paypal-webhook.mjs`。现有 create-checkout 改用 PayPal Orders v2，固定 USD 1.99，`DIGITAL_GOODS` 和 `NO_SHIPPING`，服务端控制收款商户。安全跳转仅允许匹配环境的 PayPal HTTPS 域名。

买家在同标签页批准付款后返回，服务器查询订单、执行幂等 Capture，验证订单 ID、custom_id、商户 ID、精确金额、币种、订单和 Capture 的完成状态，再交付。不能仅凭返回 URL 或前端“成功”标识发货。Webhook 通过 PayPal 官方验签接口验证，再独立查询订单和 Capture。两个入口共享交付服务。

权益使用支付 ID 派生的固定 ID，Netlify Blobs Sandbox 与 Production 使用独立 store，强一致读取及 `onlyIfNew` 原子创建，重复调用不覆盖已经重新生成的版本/额度。存储中断可重试补齐 claims、订单和索引。邮件/GA4 为交付后 best-effort，通知原子抢占防重复，失败的邮件可通过找回接口重发。邮件自动发送仍需要配置 Resend；生产验收必须覆盖邮件和找回。

不新增第三方浏览器支付 SDK。支付页增加取消、服务器确认失败、重试和不要重复支付提示。五种语言同步支付、隐私、退款与支持文案。`checkout_redirect` 仅代表开始前往 PayPal，不能当作渠道页面已渲染或付款成功。

历史 Whop 文档和 specs 留作追溯；当前待发布方案以本文件和 CURRENT_STATE 顶部条目为准。

## 配置清单（仅变量名）

| 环境 | Netlify Functions 变量 |
| --- | --- |
| Deploy Preview / Sandbox | `PAYPAL_ENVIRONMENT=sandbox`、`PAYPAL_SANDBOX_CLIENT_ID`、`PAYPAL_SANDBOX_CLIENT_SECRET`、`PAYPAL_SANDBOX_MERCHANT_ID`（可选；默认从官方建单响应锁定）、`PAYPAL_SANDBOX_WEBHOOK_ID` |
| Production | `PAYPAL_ENVIRONMENT=production`、`PAYPAL_CLIENT_ID`、`PAYPAL_CLIENT_SECRET`、`PAYPAL_MERCHANT_ID`、`PAYPAL_WEBHOOK_ID` |
| 权益签名 | 沿用 `AIMCODES_ACCESS_SECRET`，不可随意轮换，否则旧 Cookie/链接失效 |
| 邮件交付/找回 | `RESEND_API_KEY`、`RESEND_FROM_EMAIL`，必须核验发信域名及实际收信 |
| 可选归因 | 沿用 `GA4_MEASUREMENT_ID`、`GA4_API_SECRET`；不配置不影响即时交付 |

凭据直接在受信任账户后台配置，不应粘贴到聊天或写进仓库。PayPal Developer → Apps & Credentials → 选择 Sandbox/Live 应用。确保应用对应已开通网站收单的商户，记录 Merchant ID。Webhook URL 为 `https://<preview-domain>/api/aim-pack/paypal-webhook` 或正式 `https://aimcodes.com/api/aim-pack/paypal-webhook`，订阅 `PAYMENT.CAPTURE.COMPLETED`，把对应 Webhook ID 配入同环境。

默认 Sandbox 且必须完整配置后才开放建单；Deploy Preview 拒绝 production 配置，避免预览误扣款。中国个人卖家审核不等于本应用 API 权限已核验。访客银行卡入口取决于商户、买家地区和 PayPal 风控，不能保证人人免登录或无需账单信息。

## 待批准的上线操作

1. 提交并推送本分支，建立 PR 和 Netlify Deploy Preview；当前线上保持 Whop。条件：本地完整检查通过。回退：关闭 PR。
2. 为 Preview 配置 Sandbox 凭据和 Webhook，完成一次 Sandbox 买家付款，核对 Capture、权益、五槽交付、两次重新生成、邮件、找回、刷新/重试与重复通知。条件：授权后台配置且安全输入凭据。回退：停用预览 Webhook/移除预览配置。
3. 生产配置 PayPal Live 凭据和 Webhook，PR 预览验收后合并 main；Whop 旧函数、浏览器 SDK 和专用配置从部署中移除。旧 `WHOP_*` 生产环境变量、旧 Whop 后台 Webhook 的停用/删除需单独在后台核验，当前未操作。回退：撤回此次部署，恢复基线，保留所有新 PayPal 订单记录。
4. 一次独立买家真实付款核对与必要退款，仅在用户明确批准该笔测试后执行。不能商户自购，也不能用真实扣款替代 Sandbox。

本次未推送、未创建 PR、未改 Netlify/PayPal 后台配置、未发布生产、未修改 GA4/GSC 设置；原 GA4 工作树及其全部已有修改保留。退款/争议由支持人员在 PayPal 后台处理，当前无自动退款撤权流程。

## 官方依据

- [PayPal.cn 个人卖家及审核后的网站收单](https://www.paypal.cn/portal/individual-seller)
- [PayPal.cn 标准版/高级版集成能力](https://www.paypal.cn/portal/developer/integration)
- [Orders v2 服务端创建、批准、Capture 流程](https://developer.paypal.com/api/rest/integration/orders-api/)
- [PayPal Webhook 签名校验接口](https://developer.paypal.com/api/webhooks/v1)

## 验证记录

- 支付自动测试 18/18：金额/币种/收款商户/订单匹配、恶意跳转、环境隔离、服务器 Capture、伪造会话、未付款拒绝、签名拒绝、重复通知与存储中断恢复、五语文案。
- `pnpm lint` 通过；`pnpm check:auto` 选择 SEO 套件，11/11 通过，包括 build、语言、SEO、路由、图片、内部链接与性能预算。
- 本地取消页实际浏览器显示中文取消提示。390px 交付预览显示 5 卡且文档宽度等于窗口宽度；这是本地预览，不能当作 PayPal Sandbox 真实付款结果。
- `pnpm check:release` 25/25 通过；无已知依赖漏洞，构建 JS 内没有 Whop。检查结果保存在 `.aimcodes-reports/current/verification.md`。
- 浏览器确认：邮箱为空会提示并聚焦输入；本地 API 不可用时找回显示失败并可重试；准星包重新生成 2 次后额度为 0、第三次按钮禁用。
- 全部付款逻辑测试使用模拟 API/内存存储，没有调用真实 PayPal API、发送邮件或扣款。

## 2026-10-13 预览授权与账户核验

用户已授权创建 PR、部署预览、配置 Sandbox 并测试付款/交付/邮件；生产切换必须在验证完成后继续确认。PayPal Developer 已由用户完成登录。仅将 Deploy Preview 的 PAYPAL_ENVIRONMENT 设为 sandbox，不修改 production。Sandbox 付款不会上报生产 GA4 purchase。PayPal.cn 个人卖家与当前开发者账号的全球服务关联仍需核验，不可将 Sandbox Business Account 当成真实企业主体。

PR #83 已创建为 draft，提交 94aae95；Netlify Deploy Preview 6acd960d64e6a7f668607706 ready，GitHub 两项 CI 通过。PayPal.cn 已实际登录，官方按钮入口成功跳至 paypal.com 的完整创建表单；无企业升级阻挡，但 Live 应用的收款账户关联仍需生产前核验。AimCodes Sandbox 应用已创建，Webhook 指向 PR83 Preview，仅订阅 PAYMENT.CAPTURE.COMPLETED。Client ID/Secret 已通过原生复制粘贴保存到预览环境，密钥未展开。当前没有 RESEND_API_KEY，邮件验收待配置。

## 配置后的预览验收进度

- 草稿 PR：https://github.com/The-AlexLiu/aimcodes/pull/83，17 项付款测试和 25 项 release 检查通过。
- PR 预览：https://deploy-preview-83--aimcodes.netlify.app/。代码版本 d6fbe3a。新代码从 PayPal 官方建单响应锁定 Sandbox 商户身份，Live 仍要求固定且已核验的 Merchant ID。
- 预览环境已保存 PAYPAL_ENVIRONMENT、PAYPAL_SANDBOX_CLIENT_ID、PAYPAL_SANDBOX_CLIENT_SECRET、PAYPAL_SANDBOX_WEBHOOK_ID、RESEND_API_KEY。Secrets 使用后台原生复制粘贴，未展开、未写入源码或聊天。
- RESEND_FROM_EMAIL 仅 Deploy Preview 使用 AimCodes Sandbox <onboarding@resend.dev>；production 值保留。Resend 当前没有任何已验证域名，新 Key 仅 Sending access。Sandbox 邮件仅验证到账号自己的 Gmail；生产前必须验证实际发信域名。
- 一个 US Personal Sandbox 买家账号已创建，用于跨境买家测试；商户仍使用 C2 测试账户。
- 手动 CLI 的 paypal-sandbox alias 部署虽然 ready，实际 context 是 branch-deploy，未加载仅 Deploy Preview 的凭据，因此不用于付款测试。正式验收只用 PR83 预览，并在配置完成后重新构建。
- 原网站生产提交仍是 ea03ba7，PR 未合并，未进行任何真实扣款。付款、交付与邮件找回完整结果待后续记录。

部署核验发现文档提交 6909510 的预览被 ignore 命令取消（GitHub Netlify 状态仍 SUCCESS），实际域名仍运行 d6fbe3a。原 ignore 路径遗漏 netlify/functions，现补入以确保函数改动触发部署。Sandbox 邮件发件地址在后端显式隔离为 onboarding@resend.dev，可选 RESEND_SANDBOX_FROM_EMAIL；生产仍沿用原 RESEND_FROM_EMAIL。新预览必须通过 build-meta 和运行中 recover 接口证明新邮件配置生效。
