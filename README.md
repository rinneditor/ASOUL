# ASOUL 素材收集

这个仓库用于整理 A-SOUL 现役一代成员的服装参考素材，主要服务于像素风游戏或同人资产制作前期参考。

## 范围

- 当前只收集现役一代成员：贝拉、嘉然、乃琳。
- 不在本库范围内：向晚、珈乐。
- 素材只作为造型、配色、轮廓和服装元素参考；正式制作时应绘制原创简化资产，不直接描摹或复用原图。

## 素材目录

- `asset_library/asoul_clothing_refs/`: 服装参考图素材库。
- `asset_library/asoul_clothing_refs/manifest.json`: 机器可读素材索引，包含来源 URL、尺寸、文件大小、hash 和设计备注。
- `asset_library/asoul_clothing_refs/README.md`: 详细素材目录和单图清单。

## 当前数量

- 总素材：98 张
- 贝拉：34 张
- 嘉然：32 张
- 乃琳：32 张

## 使用建议

优先从 `manifest.json` 读取素材元数据；人工浏览时从子目录 README 的 catalog 开始。生成游戏用素材时，建议另建目录保存原创 sprite，例如 `asset_library/asoul_pixel_sprites/`。
