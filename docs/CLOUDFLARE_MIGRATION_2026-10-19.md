## 2026-10-19：共享授权恢复与 Cloudflare 自动发布

用户明确授权重新安装共享 GitHub 应用；旧失效安装已移除，用户完成新的 Install & Authorize。`The-AlexLiu/aimcodes` 已重新连接到生产 Worker `aimcodes`，构建触发器 `86c09b4a-138a-4436-8702-45384a184165` 仅匹配 `main`，根目录 `/`，构建 `pnpm build:cloudflare`，部署 `pnpm deploy:cloudflare`。Netlify 自动构建继续停止。

首次云端验证构建 `2d0691ec-ed50-47c5-8017-e8dceb94ae86` 已成功，部署版本 `625e73ef-1cfc-4602-ba81-779e32356764`。分支预览使用固定版本 `npx --yes wrangler@4.151.1 preview` 与 `pnpm build:cloudflare`；`wrangler.jsonc` 显式声明预览变量 `CONTEXT=deploy-preview` 并启用预览 URL。生产 CLI 同样固定 4.151.1。未修改其他 Worker 的部署配置。此记录取代下方“共享授权未修复、只能手动发布”的历史限制。本轮完整发布检查 25/25 通过（81.2 秒），正式域名的默认网络访问已读回 Hush 发布提交，大招视频实际播放正常，页面无购买入口。

## 已上线核验：2026-10-19

PR #90 已合并，正式代码 `dae95d0eb2ba3fab730a3309d6de55aa92afa7f1`。先验证免费基线，再发布 Hush，Cloudflare 正式 Worker 版本 `dce53821-f3ef-44ae-87c6-9b273a57df9b`。通过 Cloudflare 公共 DNS 的 HTTPS 请求确认 build-meta 与合并提交一致；本机默认递归 DNS 仍缓存旧 Netlify 地址，不能把本地旧响应误判为部署失败。

五语种 Hush 均为 200；canonical 和既有语言索引政策正常（英语/日语 index，中文/西语/葡语 noindex）。主 Sitemap 1892、准星 Sitemap 1585、图片 Sitemap 1739，robots 正常。五段 MP4 均可下载，浏览器预览技能与大招播放成功；服务端目前对 Range 请求返回完整 200 文件，不能声称已验证 206。390px 手机及桌面布局无横向溢出，桌面大招卡占满整行。

购买/领取/找回/退款旧地址转免费库并清除查询参数，支付 API 410，www 正确跳转根域。除两条网站来源记录外，其余 11 条 DNS 记录逐项对比均未变化。Netlify 自动构建停止，旧站和历史数据保留；未读取或迁移支付凭据、未修改 GA4/GSC 设置。原用户工作树与未提交原始媒体均未处理。

自动发布尚未接通：Cloudflare 构建 API 返回 Git 账户 disconnected（8000008），尽管 GitHub 应用已安装。当前账户 9 个 Worker 均无构建触发器。共享 GitHub 应用重装可能影响其他账户/项目，未执行；已向用户询问保留手动发布还是修复共享授权。当前可用的发布方式为 `pnpm build:cloudflare` + `pnpm deploy:cloudflare`。


# Cloudflare migration — 2026-10-19

## Scope

Migrate the existing live site first, then publish Hush. Paid crosshair packs are permanently retired at the user's request. All purchase, delivery, recovery and refund interfaces are removed from navigation; old URLs redirect to the free catalog and discard query tokens. All retired API routes return 410. Five-language contact and privacy copy reflects this change.

No payment credentials were read or transferred. No customer records were copied. Historical Netlify data remains intact; the earlier D1/payment migration draft is superseded and has no production binding.

## Source and rollback

- Original production commit: `2b75ffeb67277c8b0e59a66b732b3f28c00a812c`.
- Baseline source is built separately from this commit with free-site retirement changes, without Hush. Its marker ends in `-free-migration` to distinguish it from the original commit.
- Original Netlify site: `b244d8b7-4cce-46de-b9b5-2b4f29e30392`, origin `aimcodes.netlify.app`, previous apex A `75.2.60.5`.
- Netlify automatic builds are stopped (`stop_builds=true`, verified). Do not delete the old site or historical data.
- DNS backup: ignored `output/cloudflare-migration/namesilo-dns-before.json` and `aimcodes-dns.zone`. Mail/verification records must remain unchanged. Restoring the old web origin would also restore the old purchase UI; use only as an emergency rollback with that consequence understood.

## Cloudflare

- Account: `09d1cc2373bb7e37b6b0a85826059f9f`.
- Active zone: `118f804f8fee11b40b71054c1f508805`.
- NameSilo delegation: `aaron.ns.cloudflare.com`, `ligia.ns.cloudflare.com`, confirmed in registrar and RDAP.
- All 13 original DNS records matched after import. Zoho, Resend and Google records are retained.
- Preview Worker: `aimcodes-migration-preview`, custom domain `preview.aimcodes.com`, noindex.
- Production Worker: `aimcodes`, custom domains `aimcodes.com` and `www.aimcodes.com`. The latter redirects to the apex.
- Runtime contains only static assets, redirects and retired API responses. No payment secrets, customer database or mail credentials are required.
- Source configuration: `wrangler.jsonc`; build `pnpm build:cloudflare`; deployment `pnpm deploy:cloudflare`.
- `prepare-headers.mjs` carries forward cache/security headers from the archived Netlify configuration. Production preparation must omit `--preview`.

## Verified before cutover

- Full release suite: 25/25 passed.
- Cloudflare adapter/retirement tests: 4/4 passed, including all 20 legacy localized route redirects with query removal.
- GitHub required checks `product-data` and `build-and-seo` passed for PR #90.
- Latest baseline preview version: `772ef8d3-6c01-4177-8799-0eedf83665a0`.
- Baseline five-language pages, robots, sitemaps, 404 and retired APIs passed remote checks. Hush is absent from baseline.
- Latest mobile contact-page readback: no purchase/recovery/refund links, no horizontal overflow; recovery URL resolves to the free catalog.

## Release gates still pending

1. Verify the production baseline after custom-domain cutover, including build marker, mail DNS preservation and removal of preview noindex headers.
2. Merge PR #90 only after baseline verification, then deploy the Hush version and verify public media and desktop/mobile behavior.
3. Connect and verify Cloudflare GitHub builds for main. Keep Netlify builds stopped.
4. Record final production version and commit in handoff documentation. A configured pipeline is not proof of a successful build.
