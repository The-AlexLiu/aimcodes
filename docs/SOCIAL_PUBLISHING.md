# AimCodes 社媒自动化发布流程

## 目标

把 AimCodes 素材渲染器、AIHubMix 质量检查、Cloudflare R2 与 Buffer 接成可审计的自动发布工作流：

1. 每天为三个平台生成不同的种子、成绩、准星、视频与文案；
2. 素材渲染器生成 1080 × 1920 MP4、封面和抽检帧，并统一转码为 H.264 + AAC；
3. 脚本按渲染器画面时间轴为 MP4 写入 AimCodes 原创背景音乐与测试反馈音，并生成 1080 × 1920 PNG 封面；
4. 硬性检查音轨、视频轨、时长、封面尺寸和文案事实；
5. `gemini-2.5-flash-lite` 生成平台文案，`qwen3-vl-flash` 检查封面和五个关键帧；
6. 只有综合分达到 90 且没有硬性错误的素材才上传 R2 并创建 Buffer 定时帖；
7. 报告保存在 GitHub Actions Artifact，R2 Manifest 用于防止同一天重复排期。

自动任务采用 fail-closed：模型、媒体、R2、Buffer 任一环节失败都会停止，不会创建不完整帖子。旧的人工草稿命令仍保留，适合临时内容与多语种批次。

## 已支持平台

| 平台 | Buffer 发布形态 | 当前安全设置 |
| --- | --- | --- |
| Instagram | Reel | 每天北京时间 19:30，默认同步到 Feed |
| TikTok | Video | 每天北京时间 12:30 |
| YouTube | Short / Video | 每天北京时间 22:30，公开但不通知订阅者 |
| Facebook | Reel | 保留人工草稿，暂不进入每日任务 |

每日任务固定使用 Instagram、TikTok、YouTube 三个已授权频道。Facebook 在频道额度和运营节奏稳定后再加入。

## 首次配置

```bash
npm install -g @bufferapp/cli
pnpm social:setup
buffer init
pnpm social:doctor
```

`buffer init` 使用 Buffer 设置页生成的 API Key。密钥只保存在 Buffer CLI 的用户配置或环境变量中，不写入仓库。

认证成功后：

```bash
buffer account --output json
buffer channels list --organization-id <organization-id> --output json
```

把组织 ID 和三个首发平台的 Channel ID 写入本地文件：

`output/social-publishing/channel-map.json`

该目录已被 Git 忽略。

## 素材地址

Buffer API 读取的是公开 HTTPS 素材地址，不读取电脑本地文件。把渲染完成的 MP4 上传到可公开读取的素材存储后，将地址写入：

`output/social-publishing/media-map.json`

长期建议使用独立对象存储/CDN，不要把批量视频长期放进 Git 仓库。

首批四语种测试视频可以用下面的命令复制到站点公开素材目录，并生成本地 URL 映射：

```bash
pnpm social:seed-media
```

该方式只用于首批小规模验证；后续持续发布应迁移到独立对象存储/CDN，避免 Git 仓库持续变大。

## 日常操作

正式任务由 `.github/workflows/social-daily.yml` 在每天北京时间 01:30 自动运行，为当天三个时段提前生成并排期。也可以在 GitHub Actions 中手动运行；关闭 `dry_run` 会正式排期，开启则只验证。

本地生成与旧草稿流程仍可使用：

```bash
pnpm social:render-assets
pnpm social:creative-batch -- --count 4 --seed 2026-08-13
pnpm social:validate-assets
pnpm social:seed-media
pnpm social:validate-media
pnpm social:validate
pnpm social:prepare
pnpm social:drafts -- --bundle output/social-publishing/bundles/<时间>/bundle.json
```

`social:render-assets` 会先把当前素材备份到 Git 忽略的 `output/promo_assets/backups/`，再读取渲染器的真实画面事件时间轴，为四语种 MP4 写入同步的原创背景音乐与反馈音，并生成配套竖版封面。任一视频没有音轨、事件顺序异常、封面不是 1080 × 1920 PNG 或时长不合格，后续发布包都会被阻止。

`social:creative-batch` 使用可复现的 `seed` 生成一批素材方案。每个种子会确定一组开场钩子、玩家文案、成绩、准星、封面方向、CTA、发布文案与原创音乐配置；同一种子可重现，新种子会得到不同方案。输出只写到 Git 忽略的 `output/social-publishing/creative-batches/`。

每日正式任务使用：

```bash
pnpm social:schedule-daily
```

本地默认只执行 Buffer dry-run；只有同时注入 GitHub Secrets/Variables 且设置 `AIMCODES_SOCIAL_ALLOW_SCHEDULE=YES` 才会正式创建定时帖。

## 音乐与封面的平台限制

- 自动发布使用已经写进 MP4 的 AimCodes 原创合成背景音乐和反馈音，避免商业歌曲版权、地区曲库和企业账号音乐限制；
- 如需使用 Instagram / TikTok / YouTube 的趋势音乐，应改成通知发布并在平台 App 内人工添加；
- Buffer 目前不能上传一张独立图片作为视频缩略图；Instagram 与 TikTok 可在 Buffer 中从视频帧选择缩略图，YouTube Shorts 暂不支持通过 Buffer 自定义缩略图；
- 生成的竖版 PNG 封面仍是每条素材包的必备文件，用于人工原生发布、内容台账、设计复用与后续支持自定义封面的渠道。

人工草稿流程默认只做本地 dry-run。人工看完同目录的 `review.md` 后，可创建 Buffer 草稿：

```bash
AIMCODES_SOCIAL_ALLOW_DRAFT_WRITE=YES \
pnpm social:drafts -- --write --bundle output/social-publishing/bundles/<时间>/bundle.json
```

这条命令仍然只创建 Draft，不会排期或公开发布。

## 内容源与输出

- 原始内容计划：`data_raw/social-content-plan.json`
- 平台映射：`output/social-publishing/channel-map.json`
- 素材 URL 映射：`output/social-publishing/media-map.json`
- 草稿包与审核单：`output/social-publishing/bundles/`
- 执行台账：`output/social-publishing/ledgers/`

## 自动质量门

- 视频前 2 秒能看懂，不出现黑帧、错字或测试成绩提前出现；
- 视频能听到低音量环境底；每轮等待、开始、点击出分以及最终成绩的反馈音与画面同步；
- 文案与素材语言一致；
- 目标语言路径和 UTM 正确；
- 1080 × 1920 PNG 封面无裁切，音乐为 AimCodes 原创音轨；
- YouTube 标题、公开状态、非儿童内容设置和 Gaming 分类无误；
- TikTok、Instagram、Facebook 在移动端预览不裁掉 CTA；
- Instagram 与 TikTok 正文不得出现裸链接；YouTube 说明只允许一个干净的站内链接；
- 同一日期和平台已有 R2 Manifest 时必须跳过，防止重复排期；
- 模型输出必须通过事实校验，画面评分必须达到 90/100；
- GitHub Secret 只保存凭据，不得写入仓库、构建产物或 Artifact。
