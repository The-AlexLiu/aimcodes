# PayPal 正式切换待执行清单 · 2026-10-13

## 已完成与证据边界

用户确认开发者账户与已审核、已开通网站收单的 PayPal.cn 账户关联。开发者后台 Current account type: Business / Go live 可见；已创建 AimCodes Live，正式通知为 https://aimcodes.com/api/aim-pack/paypal-webhook，仅订阅 PAYMENT.CAPTURE.COMPLETED，通知 ID 9YP946676P350322U。

Sandbox 付款、五槽交付、两次重生成、邮件找回、真实通知和重发已通过。24 项回归与完整 release 25/25 通过，产品提交 4e06ca8 的 Netlify 预览 ready。后续 5c42e9f 仅交接文档，Netlify 按 ignore 规则取消构建，预览仍是经验证的 4e06ca8；不是产品构建失败。

Live 应用创建成功不代表真实支付、正式回调、结算或提现已通过。银行卡直付、Apple Pay、Google Pay 的额外能力未开通；本次不依赖这些能力。

## 最终确认后执行

| 序号 | 对象 / 当前状态 | 拟执行值或操作 | 执行条件 / 原因 | 回退 |
| --- | --- | --- | --- | --- |
| 1 | Netlify Production，未接入新 PayPal Live | PAYPAL_ENVIRONMENT=production；PAYPAL_CLIENT_ID、PAYPAL_CLIENT_SECRET 从 AimCodes Live 原生复制；PAYPAL_MERCHANT_ID 固定为关联账户；PAYPAL_WEBHOOK_ID=9YP946676P350322U | 用户确认正式切换；只改 Production，保留 Preview Sandbox。仅查看字段、复制按钮和保存状态，不读取输出密钥 | 记录非敏感字段原状态；取消或撤回新配置，恢复原部署 |
| 2 | Production 未配置可用的 Resend 新交付密钥 | 单独创建 Sending access 生产密钥，限定已验证 mail.aimcodes.com；RESEND_FROM_EMAIL=AimCodes <delivery@mail.aimcodes.com> | 自有域名已 Verified 且实际 Gmail 收件箱恢复验证通过；密钥原生复制到 Production，不写文件或聊天 | 撤销新生产发信密钥和配置，保留旧记录 |
| 3 | draft PR83 / 生产仍为 Whop | 完成最后差异与 CI 核对，转 ready 并合并 main，由 Netlify 发布 | 第 1、2 项保存状态核对完成；不执行手工 --prod | 回退 main 对应发布，保留新 PayPal 订单、权益、历史配置和访问签名密钥 |
| 4 | 正式部署尚无 PayPal 运行验证 | 核对 main 构建提交、页面、取消/错误路径、语言与手机布局；正式通知接口需正确签名 | 不用商户自购，不自动扣真实款；独立买家真实 USD1.99 付款需另行指定测试人及付款授权 | 发现交付异常先停止新付款，保留已付款权益，不以页面成功代替真实订单证据 |
| 5 | 旧 Whop 后台凭据 / 通知仍保留 | 发布确认后清理不再使用的 Whop 通知与专属配置 | 先核对无历史交付依赖；不删原始订单数据 | 发布回退窗口内保留恢复所需资料，不立即销毁 |

退款与争议由支持人员在 PayPal 后台手工处理；本次未实现自动退款撤权。其他邮箱及真实 iOS/微信浏览器尚未验收。

## 当前状态

用户已明确授权与 SEO be42d8d 一起发布。Production Live 凭据、固定关联商户、正式通知和仅限 mail.aimcodes.com 的 Sending access 邮件密钥已保存；PAYPAL_ENVIRONMENT 读回 Production=production / Deploy Preview=sandbox，发件地址为自有域名。当前合并预览 049ac16 新笔 Sandbox 付款交付五款成功，准备合并 main；未真实扣款。不会为了核验 Live 凭据而读取账号密码、Cookie、Token、Client Secret 或 .env。原 GA4 工作树和用户未提交修改保留。该清单由当前 PR 维护，最终授权后逐项记录结果。

## 执行结果

2026-10-13用户授权与SEO一起发布；PR83合并，生产d3a26de / 6acdcd76 ready并匹配build-meta。Live建单与取消恢复通过，未真实扣款；Sandbox完整付款交付邮件通过。详见docs/PAYPAL_SEO_RELEASE_2026-10-13.md。该清单保留执行前条件，独立买家Live实际扣款／邮件／通知仍待验收。
