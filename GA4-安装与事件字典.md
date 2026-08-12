# AimCodes GA4 安装与事件字典

## 安装信息

- 衡量 ID：`G-2VMCECN5S6`
- 正式域名：`aimcodes.com`、`www.aimcodes.com`
- 本地预览：默认不发送数据，避免污染正式报表
- 调试方式：在本地预览地址后加入 `?ga_debug=1`，事件会进入 GA4 DebugView
- 内部测试隔离：在正式站访问一次 `?analytics_optout=1`，该浏览器之后不再上报；需要恢复时访问 `?analytics_optin=1`
- 页面浏览：采用单页应用手动 `page_view`，区分 `explore` 与 `finder`

## 已安装事件

| 事件名 | 触发时机 | 主要参数 |
|---|---|---|
| `page_view` | 打开找准星或帮我选界面 | `app_view`、`app_language` |
| `finder_open` | 点击帮我选 | `interaction_source` |
| `finder_start` | 开始反应测试或再次测试 | `attempt_number`、`total_rounds` |
| `finder_false_start` | 绿灯前提前点击 | `round_number`、`false_start_count` |
| `finder_complete` | 完成测试并生成结果 | `reaction_ms`、`reaction_rank`、`recommended_crosshair_id` |
| `finder_exit` | 中途或结果页退出测试 | `phase`、`completed_rounds` |
| `select_content` | 选择一个准星 | `item_id`、`crosshair_category`、`interaction_source` |
| `crosshair_color_change` | 修改准星颜色 | `crosshair_id`、`color_key`、`interaction_source` |
| `map_change` | 修改预览地图 | `map_name`、`interaction_source` |
| `crosshair_code_copy` | 成功复制准星代码 | `crosshair_id`、`crosshair_category`、`interaction_source` |
| `import_guide_open` | 展开怎么导入 | `interaction_source` |
| `filter_select` | 切换准星分类 | `filter_name` |
| `search_used` | 搜索框停留 700ms 且至少输入 2 个字符 | `query_length`、`results_count`、`has_results` |
| `language_change` | 切换语言 | `from_language`、`to_language` |
| `share` | 成功发起准星分享、系统分享或下载成绩图 | `method`、`content_type`、`reaction_ms`、`crosshair_id`、`interaction_source` |
| `share_landing` | 打开队友分享的准星详情 | `crosshair_id`、`crosshair_category`、`color_key`、`map_name` |
| `share_card_open` | 开始生成反应成绩分享图 | `reaction_ms`、`reaction_rank`、`crosshair_id` |
| `share_download` | 分享图通过浏览器下载成功 | `reaction_ms`、`crosshair_id` |
| `share_native` | 移动端系统分享完成 | `reaction_ms`、`crosshair_id` |
| `share_link_copy` | 复制队友挑战链接 | `reaction_ms`、`reaction_rank` |
| `challenge_landing` | 打开带队友成绩的挑战页面 | `challenge_ms`、`challenge_rank` |
| `challenge_start` | 开始挑战队友成绩 | `attempt_number`、`challenge_ms`、`challenge_rank` |
| `challenge_complete` | 完成队友挑战 | `reaction_ms`、`challenge_ms`、`outcome`、`difference_ms` |
| `challenge_won` | 成绩快于挑战目标 | `reaction_ms`、`challenge_ms`、`difference_ms` |

验证脚本当前要求以上 24 个核心漏斗事件。代码还会发送 `catalog_sort_change`、`random_crosshair`、`finder_timeout`、`share_cancel` 和 `share_error` 等辅助诊断事件，但它们不作为核心漏斗完整性的硬性门槛。

搜索事件不发送用户输入的原始词，只发送长度和结果数量，避免把可能的个人信息写入 GA4。

## GA4 后台需要完成

1. 打开“管理 → 数据收集和修改 → 事件”。
2. 将 `crosshair_code_copy` 标记为主要关键事件。
3. 将 `finder_complete` 标记为辅助关键事件。
4. 流量稳定后，再决定是否把 `share` 标记为关键事件。
5. 打开“管理 → 数据显示 → 自定义定义”，创建事件范围的自定义维度：
   - `app_view`
   - `app_language`
   - `interaction_source`
   - `shared_entry`
   - `crosshair_id`
   - `crosshair_category`
   - `color_key`
   - `map_name`
   - `filter_name`
   - `reaction_rank`
   - `recommendation_profile`
6. 创建事件范围的自定义指标：
   - `reaction_ms`
   - `consistency_ms`
   - `early_clicks`
   - `results_count`
7. 打开“管理 → 数据收集和修改 → 数据保留”，将事件数据保留期设为 14 个月。
8. 在数据流的增强型衡量中保留滚动、出站点击等自动事件；关闭“根据浏览器历史记录变化统计网页浏览”，避免未来单页路由产生重复浏览。

团队成员在正式站验收前，应先用同一浏览器访问一次 `https://aimcodes.com/en/?analytics_optout=1`。这项设置只保存在当前浏览器，不影响真实访客，也不会写入 URL 的 canonical。

普通站内交互事件不得使用 `source`、`medium`、`campaign`、`term` 或 `content` 作为事件参数，以免污染渠道归因。只有用户分享出去的准星链接和挑战链接保留标准 UTM，用于识别新会话的传播来源。

## 上线验证

1. 部署到 `https://aimcodes.com` 后打开网站。
2. 依次执行：找准星 → 换颜色 → 复制代码 → 分享准星 → 打开分享链接 → 帮我选 → 完成测试 → 分享成绩。
3. 在 GA4“报告 → 实时”检查 `page_view`、`crosshair_code_copy`、`share`、`share_landing`、`finder_complete`。
4. 如需逐项看参数，使用带 `?ga_debug=1` 的地址，并在“管理 → 数据显示 → DebugView”检查。
