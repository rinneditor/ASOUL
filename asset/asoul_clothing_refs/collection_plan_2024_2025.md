# 2024-2025 服装收集计划 / Clothing Collection Plan

本文档用于跟踪萌娘百科 2023 年素材之后需要补充的服装参考。
This file tracks clothing references to collect after the Moegirl-covered 2023 assets.

## 范围 / Scope

- 成员 / Members: Bella, Diana, Eileen.
- 年份 / Years: 2024 and 2025.
- 排除 / Excluded: ~~Ava~~ and ~~Carol~~, unless a separate inactive-member archive is created.
- 来源要求 / Source requirement: traceable high-resolution image sources are enough; official posts, livestream replays, official videos, and official merchandise images are preferred.
- 非官方高清图源 / Non-official high-resolution sources: acceptable as candidates when the image is clear, traceable, and useful for outfit reference.

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
- `source_confidence`: `official`, `hd_traceable`, `verified_secondary`, or `needs_review`.

## 收集队列 / Collection Queue

| 成员 / Member | 年份 / Year | 状态 / Status | 待核验内容 / What to verify | 备注 / Notes |
|---|---:|---|---|---|
| Bella | 2024 | pending | Birthday, anniversary, event, collab, seasonal, and merch outfit references | Do not import until image source and first appearance year are verified. |
| Bella | 2025 | pending | Birthday, anniversary, event, collab, seasonal, and merch outfit references | Do not import until image source and first appearance year are verified. |
| Diana | 2024 | pending | Birthday, anniversary, event, collab, seasonal, and merch outfit references | Do not import until image source and first appearance year are verified. |
| Diana | 2025 | pending | Birthday, anniversary, event, collab, seasonal, and merch outfit references | Do not import until image source and first appearance year are verified. |
| Eileen | 2024 | pending | Birthday, anniversary, event, collab, seasonal, and merch outfit references | Do not import until image source and first appearance year are verified. |
| Eileen | 2025 | pending | Birthday, anniversary, event, collab, seasonal, and merch outfit references | Do not import until image source and first appearance year are verified. |

## Bilibili 高清线索 / Bilibili HD Leads

账号空间投稿接口在无登录态下会触发风控或权限限制，因此先用 B 站搜索结果交叉核验作者、标题、BV 号、发布日期和封面图。
The unauthenticated Bilibili space video API is blocked by risk-control or permission checks, so these leads are cross-checked from Bilibili search results by author, title, BV ID, publish date, and cover image.

| 成员 / Member | 年份 / Year | 服装/节目线索 / Outfit or program lead | 来源账号 / Source account | 视频 / Video | 封面 / Cover | 置信度 / Confidence | 状态 / Status | 备注 / Notes |
|---|---:|---|---|---|---|---|---|---|
| Bella | 2024 | `我以灵魂注视你的心` PV | 贝拉kira | https://www.bilibili.com/video/BV1CtkbYvERW | https://i1.hdslb.com/bfs/archive/0a4924cb55a072349c8667db9d495c24228bc8f5.jpg | official | candidate | 2024-12-28 official PV; verify whether the PV has usable full-body outfit frames. |
| Bella | 2024 | `我以灵魂注视你的心` 四周年编舞/舞台 | 贝极星周报 | https://www.bilibili.com/video/BV1n3ktYtEzt | https://i2.hdslb.com/bfs/archive/4fc7b85fe833bcec44d8f52d89fa6530ee18e3e4.jpg | hd_traceable | candidate | 2024-12-21 livestream clip; useful for first-appearance support if the outfit differs from the PV. |
| Diana | 2024 | `帝江` PV | 嘉然今天吃什么 | https://www.bilibili.com/video/BV1RU411U7wr | https://i0.hdslb.com/bfs/archive/ff62c42fddac2b0aebfb69dba88f7ca558f24cf7.jpg | official | candidate | 2024-08-01 official PV; check full-body usability before importing. |
| Diana | 2024 | `帝江` 四周年片段 | 嘉然今天吃什么 | https://www.bilibili.com/video/BV1UqkqYhET2 | https://i2.hdslb.com/bfs/archive/25f7ac4e79a8de31bbe7b4acb16b4ef49c362d00.jpg | official | candidate | 2024-12-22 official clip using 2024-12-21 anniversary livestream material. |
| Eileen | 2025 | `掌中之吻` | 乃琳Queen | https://www.bilibili.com/video/BV1GEPWeXErC | https://i2.hdslb.com/bfs/archive/a37033b61917a397cdb9e90acf99d292c6efea15.jpg | official | candidate | 2025-03-01 official original single; not a 2024 source. |
| Active group | 2024 | `Snow Dancing` 四周年新团曲 | 贝极星周报 | https://www.bilibili.com/video/BV1cfk8YPESi | https://i0.hdslb.com/bfs/archive/58dc7e41dc832088b8880ad999ead96d200a9b99.jpg | hd_traceable | candidate | 2024-12-21 anniversary livestream; no matching 2024 A-SOUL_Official upload confirmed yet. |
| Diana / Eileen | 2024 | `周末出逃计划` | Asoul二创计画 | https://www.bilibili.com/video/BV1fPkhYfEcg | https://i2.hdslb.com/bfs/archive/a06960cf938d9e9ee039293a54f29dda71657e4a.png | hd_traceable | candidate | 2024-12-21 anniversary livestream clip for Diana and Eileen. |

补查状态 / Additional check status:

- `A-SOUL_Official` direct space API: blocked by Bilibili risk control in the current unauthenticated environment.
- Relevant 2024 search results did not confirm a new-outfit or fourth-anniversary upload from `A-SOUL_Official`; keep it open for manual logged-in review.
- Bella, Diana, and Eileen personal accounts each have at least one official PV/single lead useful for high-resolution reference screening.

## 入库检查清单 / Intake Checklist

1. 确认成员在范围内 / Confirm the member is in scope.
2. 确认服装第一次出现于 2024 或 2025 年 / Confirm the outfit first appeared in 2024 or 2025.
3. 保存可用的最高质量参考图 / Save the highest-quality usable reference image.
4. 使用 `{member_key}_{first_appearance_year}_{sequence}_{outfit_slug}.{ext}` 命名 / Name the file with `{member_key}_{first_appearance_year}_{sequence}_{outfit_slug}.{ext}`.
5. 补充 manifest 元数据，包括 source URL、dimensions、bytes、SHA-256 和首次出现字段 / Add manifest metadata, including source URL, dimensions, bytes, SHA-256, and first appearance fields.
6. 更新详细 README 目录和计数 / Update the detailed README catalog and counts.
