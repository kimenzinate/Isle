#!/usr/bin/env python3
"""One-off asset optimizer: resize photographic PNGs and export as WebP."""

from __future__ import annotations

import os
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1] / "public" / "assets"

# (source_png, output_webp, max_width, max_height, quality)
JOBS: list[tuple[str, str, int, int | None, int]] = [
    # Shared hero/scene (identical 2048² sources, rendered up to 327×200)
    ("island-blue-sky.png", "scene-hero.webp", 750, 460, 82),
    # Shared warm home (identical sources, rendered as 88×88 thumb)
    ("island-warm-home.png", "island-warm-home.webp", 176, 176, 82),
    # Background picker cards (~159×90 @2x)
    ("bg-moon.png", "bg-moon.webp", 360, 200, 82),
    ("bg-seaview.png", "bg-seaview.webp", 360, 200, 82),
    # Family photo (identical sources, rendered up to 64–176px)
    ("detail-family-photo.png", "detail-family-photo.webp", 176, 176, 82),
    # Home hero (pre-masked, rendered 327×254)
    ("home-hero.png", "home-hero.webp", 654, 508, 85),
    # Journal / recommend
    ("recommend-hero.png", "recommend-hero.webp", 750, 360, 82),
    ("journal-thumb.png", "journal-thumb.webp", 128, 128, 82),
    ("recommend-pair.png", "recommend-pair.webp", 660, 400, 82),
    # Island create type cards (140×100 @2x)
    ("island-create-home.png", "island-create-home.webp", 280, 200, 82),
    ("island-create-calm.png", "island-create-calm.webp", 280, 200, 82),
    ("island-create-memory.png", "island-create-memory.webp", 280, 200, 82),
    ("island-create-voice.png", "island-create-voice.webp", 280, 200, 82),
    # Upload / library
    ("upload-family-photo.png", "upload-family-photo.webp", 660, 509, 82),
    ("library-img-2.png", "library-img-2.webp", 330, 260, 82),
    ("library-img-3.png", "library-img-3.webp", 330, 330, 82),
    ("library-img-5.png", "library-img-5.webp", 330, 330, 82),
    # Home recent row (110×110 @2x)
    ("recent-img-1.png", "recent-img-1.webp", 220, 220, 82),
    ("recent-img-2.png", "recent-img-2.webp", 220, 220, 82),
    ("recent-img-3.png", "recent-img-3.webp", 220, 220, 82),
    # XR info steps
    ("xr-info-step-connect.png", "xr-info-step-connect.webp", 200, 120, 82),
    ("xr-info-step-headset.png", "xr-info-step-headset.webp", 200, 120, 82),
    ("xr-info-step-island.png", "xr-info-step-island.webp", 200, 120, 82),
]

PHOTO_GRID_QUALITY = 85


def export_webp(src: Path, dst: Path, max_w: int, max_h: int | None, quality: int) -> tuple[int, int, int]:
    with Image.open(src) as img:
        has_alpha = img.mode in ("RGBA", "LA") or (img.mode == "P" and "transparency" in img.info)
        if has_alpha:
            img = img.convert("RGBA")
        else:
            img = img.convert("RGB")

        img.thumbnail((max_w, max_h or 10_000), Image.Resampling.LANCZOS)
        save_kwargs = {"quality": quality, "method": 6}
        if has_alpha:
            save_kwargs["lossless"] = False
        img.save(dst, "WEBP", **save_kwargs)
        return os.path.getsize(src), os.path.getsize(dst), img.size


def main() -> None:
    os.chdir(ROOT)
    total_before = 0
    total_after = 0

    seen_outputs: dict[str, str] = {}
    for src_name, out_name, max_w, max_h, quality in JOBS:
        src = ROOT / src_name
        if not src.exists():
            print(f"SKIP missing {src_name}")
            continue
        if out_name in seen_outputs:
            continue
        seen_outputs[out_name] = src_name
        dst = ROOT / out_name
        before, after, size = export_webp(src, dst, max_w, max_h, quality)
        total_before += before
        total_after += after
        print(f"{src_name:35} -> {out_name:30} {before/1024:7.1f}KB -> {after/1024:6.1f}KB  {size[0]}x{size[1]}")

    for i in range(1, 22):
        src_name = f"photo-grid-{i}.png"
        out_name = f"photo-grid-{i}.webp"
        src = ROOT / src_name
        if not src.exists():
            continue
        dst = ROOT / out_name
        before, after, size = export_webp(src, dst, 248, 248, PHOTO_GRID_QUALITY)
        total_before += before
        total_after += after
        print(f"{src_name:35} -> {out_name:30} {before/1024:7.1f}KB -> {after/1024:6.1f}KB  {size[0]}x{size[1]}")

    print(f"\nConverted total: {total_before/1024/1024:.2f} MB -> {total_after/1024/1024:.2f} MB")


if __name__ == "__main__":
    main()
