# ASOUL 素材/ ASOUL Asset 

## 中文

这个仓库用于整理 A-SOUL 现役一代成员的服装参考素材，主要服务于像素风游戏或同人资产制作前期参考。

### 范围

- 当前只收集现役一代成员：贝拉、嘉然、乃琳。
- 不在本库范围内：~~向晚~~、~~珈乐~~。
- 素材只作为造型、配色、轮廓和服装元素参考；正式制作时应绘制原创简化资产，不直接描摹或复用原图。

### 素材目录

- `asset/asoul_clothing_refs/`: 服装参考图素材库。
- `asset/asoul_clothing_refs/manifest.json`: 机器可读素材索引，包含来源 URL、尺寸、文件大小、hash 和设计备注。
- `asset/asoul_clothing_refs/README.md`: 详细素材目录和单图清单。

### 当前数量

- 总素材：101 张
- 贝拉：35 张
- 嘉然：33 张
- 乃琳：33 张

### 使用建议

优先从 `manifest.json` 读取素材元数据；人工浏览时从子目录 README 的 catalog 开始。生成游戏用素材时，建议另建目录保存原创 sprite，例如 `asset/asoul_pixel_sprites/`。

### 后续收集

萌娘百科来源目前主要覆盖到 2023 年。2024-2025 年服装需要从高清可追溯图源补充；官方动态、直播回放、官方视频和官方商品图优先，但非官方高清图源也可作为候选。

新增素材文件名必须包含服装第一次公开出现的年份：

```text
{member_key}_{first_appearance_year}_{sequence}_{outfit_slug}.{ext}
```

示例：`bella_2024_01_fourth_anniversary_stage.png`

其中 `first_appearance_year` 指服装第一次公开出现的年份，不是下载年份或二次转载年份。

## English

This repository collects clothing reference assets for current active first-generation A-SOUL members. It is mainly intended for early reference work in pixel-art games or fan-made asset production.

### Scope

- Current active first-generation members only: Bella, Diana, and Eileen.
- Out of scope for this library: ~~Ava~~ and ~~Carol~~.
- These files are visual references for silhouette, palette, shape language, and clothing motifs. Production assets should be original simplified drawings, not direct traces or reused source images.

### Asset Directories

- `asset/asoul_clothing_refs/`: clothing reference image library.
- `asset/asoul_clothing_refs/manifest.json`: machine-readable asset index with source URLs, dimensions, file sizes, hashes, and design notes.
- `asset/asoul_clothing_refs/README.md`: detailed catalog and per-image listing.

### Current Counts

- Total assets: 101 images
- Bella: 35 images
- Diana: 33 images
- Eileen: 33 images

### Usage Notes

Prefer `manifest.json` for metadata-driven workflows. For manual browsing, start from the catalog in the nested README. Game-ready original sprites should live in a separate directory, for example `asset/asoul_pixel_sprites/`.

### Next Collection

The Moegirl source pages currently cover mostly up to 2023. Clothing references from 2024-2025 should be collected from traceable high-resolution image sources. Official posts, livestream replays, official videos, and official merch images are preferred, but non-official high-resolution sources can also be tracked as candidates.

New asset filenames must include the outfit's first public appearance year:

```text
{member_key}_{first_appearance_year}_{sequence}_{outfit_slug}.{ext}
```

Example: `bella_2024_01_fourth_anniversary_stage.png`

Here, `first_appearance_year` means the year when the outfit first appeared publicly, not the download year or repost year.
