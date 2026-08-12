# AimCodes 社媒自动化发布流程

## 目标

把 AimCodes 已有的素材渲染器接到 Buffer，形成可审计的半自动工作流：

1. GPT 规划主题与多语种文案；
2. 素材渲染器生成 1080 × 1920 MP4 和封面；
3. 脚本检查语言、链接、UTM、平台字段和本地素材；
4. 脚本只创建 Buffer Draft；
5. 人工在 Buffer 中预览、修改并设置发布时间；
6. 发布后再由 GA4 / GSC / Buffer 数据决定下一轮选题。

该流程不提供“直接公开发布”命令。第一次接入和后续批量任务均保留人工审核门。

## 已支持平台

| 平台 | Buffer 发布形态 | 当前安全设置 |
| --- | --- | --- |
| Instagram | Reel | 只存草稿，默认同步到 Feed |
| TikTok | Video | 只存草稿 |
| YouTube | Short / Video | 只存草稿且隐私固定为 Private |
| Facebook | Reel | 只存草稿 |

建议第一阶段只连接 Instagram、TikTok、YouTube 三个优先平台；Facebook 文案已经准备好，可在频道额度和运营节奏稳定后加入。实际启用的平台由本地 `channel-map.json` 中的 `activePlatforms` 控制。

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

把组织 ID 和四个平台的 Channel ID 写入本地文件：

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

```bash
pnpm social:validate
pnpm social:prepare
pnpm social:drafts -- --bundle output/social-publishing/bundles/<时间>/bundle.json
```

最后一条默认只做本地 dry-run，不写入 Buffer。

人工看完同目录的 `review.md` 后，才允许创建 Buffer 草稿：

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

## 上线前人工检查

- 视频前 2 秒能看懂，不出现黑帧、错字或测试成绩提前出现；
- 文案与素材语言一致；
- 目标语言路径和 UTM 正确；
- 封面、音乐、游戏素材和字体具备发布权；
- YouTube 的 `Private`、受众设置和 Gaming 分类无误；
- TikTok、Instagram、Facebook 在移动端预览不裁掉 CTA；
- Buffer 中逐条确认后再手工排期。
