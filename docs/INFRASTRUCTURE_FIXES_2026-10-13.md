# AimCodes 基建修复 · 2026-10-13

用户决定继续使用 Netlify，优先修支付 CI、main 保护和社媒失败，暂不升级套餐或迁移。

## 当前范围

- 分支：codex/infrastructure-guardrails；基于 main 60e1ac9。原 GA4 混合工作树与既有修改保留。
- 不修改支付业务逻辑、准星、UI、路由、索引、DNS、Netlify 套餐或真实订单。
- CI 对所有 PR 运行，构建后执行 validate:paid；函数单独变更进入完整 release。新增 Manifest、性能和社媒诊断验证。
- 社媒根因：2026-10-13运行38323592556在服务检查返回 Buffer 认证错误 code4；后台 AimCodes Social Publisher 显示9月12日过期。旧检查重定向输出到/dev/null，且失败发生在报告生成之前，导致无可用 Artifact。
- 新的只读 preflight 分别核对 Buffer 认证/组织/频道、AI 服务认证、R2 公开交付和存储访问；失败仍生成安全报告，不打印原始响应或凭据。
- 手工运行默认 dry-run；新增 preflight_only。dry-run 禁止 R2 上传和 Buffer 发帖，正式每日九时段及质量门保持原逻辑。
- Buffer 再生成选1年有效期；新版个人密钥默认11项权限，当前再生成与菜单没有权限收窄入口，旧密钥三项权限未被保留。通过原生复制粘贴更新 GitHub Secret，不读取或保存密钥值。到期元数据以 BUFFER_API_KEY_EXPIRES_AT 供每日检查提前14天提示。

## 验证边界

代码检查、GitHub 必需检查、Netlify 预览、main 配置读回和远端只读 preflight 必须分别记录。设置保存不是认证通过，preflight 通过不是当日九条已发布。

本次没有补发失败日期的帖子，没有执行真实支付或升级套餐。正式合并和恢复公开排期需遵循用户授权与发布关卡。

## main 保护回退

修改前 main 无保护；计划使用两项 GitHub Actions 必需检查、严格最新分支、PR及讨论解决、管理员约束、禁止强推/删除。只在必需检查与 CI 名称相符后执行，读回确认。

已执行并读回：main protected=true；required_status_checks 为上述两项，绑定 GitHub Actions app15368；strict=true、enforce_admins=true、required_conversation_resolution=true、allow_force_pushes/allow_deletions=false。PR审批数为0，允许单人仓库在检查通过后正常合并。

Buffer Secret 元数据已确认更新于2026-10-13T10:36:55Z（北京时间18:36）；界面新有效期至2027-10-13，仓库到期变量已保存。认证结果仍等待远端 preflight。

如规则错误阻塞发布，先修规则或 CI 名称，不使用管理员绕过。确需撤销保护时，由所有者单独授权恢复修改前无保护状态。规则快照与本地检查报告保留在 Git 忽略的 output/infrastructure-fixes-2026-10-13。

## 2026-10-14 运行发现与修复

完整dry-run 38385470461发现旧 Qwen视觉别名404，已停止无效重试；38497160207进一步确认固定快照也404，模型目录存在不代表推理可用。模型配置集中至model-config.mjs，改用支持图像的gemini-2.5-flash-lite。preflight增加实际小图推理；不发帖、不写R2，但消耗少量API推理额度。模型可通过SOCIAL_COPY_MODEL/SOCIAL_VISION_MODEL仓库变量覆盖，90分门保持不变。

本地release再次25/25通过，社媒诊断已扩展至9项；GitHub f8ffcdf产品检查与Netlify预览通过。完整新dry-run为38497618078，结果待完成后补录。旧工作树与原始素材保留，未补发历史帖子。

试运行进一步发现旧抽检跳过6.05–8.45秒的真实出分段，同时旧提示将challenge/result/crosshair三种封面都描述为成绩封面，误报缺少rank。已查看实际导出的准星封面及7.25秒出分图确认：准星封面不应含成绩，出分画面确实有average/rank/scores。抽检从5个增至6个视频时间点，出分点从渲染器音效时间轴动态派生；提示按实际封面用途校验，保留缺陷、90分、三次重试和配额门。未编辑渲染器及三份副本。

相关回归扩展至11项。新完整试运行待本轮代码提交后执行。
