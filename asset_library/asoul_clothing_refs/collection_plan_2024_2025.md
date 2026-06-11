# 2024-2025 服装收集计划 / Clothing Collection Plan

本文档用于跟踪萌娘百科 2023 年素材之后需要补充的服装参考。
This file tracks clothing references to collect after the Moegirl-covered 2023 assets.

## 范围 / Scope

- 成员 / Members: Bella, Diana, Eileen.
- 年份 / Years: 2024 and 2025.
- 排除 / Excluded: Ava and Carol, unless a separate inactive-member archive is created.
- 来源优先级 / Source priority: official posts, livestream replays, official videos, official merchandise images, then other verifiable secondary sources.

## 命名规则 / Naming Rule

每个新增文件名都必须包含服装第一次公开出现的年份。
Use the outfit's first public appearance year in every new filename:

```text
{member_key}_{first_appearance_year}_{sequence}_{outfit_slug}.{ext}
```

示例 / Examples:

- `bella_2024_01_fourth_anniversary_stage.png`
- `diana_2025_01_birthday_live_outfit.png`
- `eileen_2025_01_summer_event_outfit.png`

## 新增 Manifest 字段 / Manifest Fields For New Assets

新 manifest 条目应尽量补充以下字段。
New manifest entries should add these fields when possible:

- `first_appearance_year`: required.
- `first_appearance_date`: use `YYYY-MM-DD` when confirmed, otherwise `null`.
- `first_appearance_source_url`: URL proving or strongly supporting first appearance.
- `source_confidence`: `official`, `verified_secondary`, or `needs_review`.

## 收集队列 / Collection Queue

| 成员 / Member | 年份 / Year | 状态 / Status | 待核验内容 / What to verify | 备注 / Notes |
|---|---:|---|---|---|
| Bella | 2024 | pending | Birthday, anniversary, event, collab, seasonal, and merch outfit references | Do not import until image source and first appearance year are verified. |
| Bella | 2025 | pending | Birthday, anniversary, event, collab, seasonal, and merch outfit references | Do not import until image source and first appearance year are verified. |
| Diana | 2024 | pending | Birthday, anniversary, event, collab, seasonal, and merch outfit references | Do not import until image source and first appearance year are verified. |
| Diana | 2025 | pending | Birthday, anniversary, event, collab, seasonal, and merch outfit references | Do not import until image source and first appearance year are verified. |
| Eileen | 2024 | pending | Birthday, anniversary, event, collab, seasonal, and merch outfit references | Do not import until image source and first appearance year are verified. |
| Eileen | 2025 | pending | Birthday, anniversary, event, collab, seasonal, and merch outfit references | Do not import until image source and first appearance year are verified. |

## 入库检查清单 / Intake Checklist

1. 确认成员在范围内 / Confirm the member is in scope.
2. 确认服装第一次出现于 2024 或 2025 年 / Confirm the outfit first appeared in 2024 or 2025.
3. 保存可用的最高质量参考图 / Save the highest-quality usable reference image.
4. 使用 `{member_key}_{first_appearance_year}_{sequence}_{outfit_slug}.{ext}` 命名 / Name the file with `{member_key}_{first_appearance_year}_{sequence}_{outfit_slug}.{ext}`.
5. 补充 manifest 元数据，包括 source URL、dimensions、bytes、SHA-256 和首次出现字段 / Add manifest metadata, including source URL, dimensions, bytes, SHA-256, and first appearance fields.
6. 更新详细 README 目录和计数 / Update the detailed README catalog and counts.
