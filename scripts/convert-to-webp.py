"""Convert PNG assets to WebP for faster loading.
Keeps original PNG files; creates matching .webp alongside.
"""
import os
from pathlib import Path
from PIL import Image

PUBLIC = Path(r"C:\talu_kids_web\public\images")

# Folders where PNG -> WebP conversion makes sense
TARGETS = [
    "characters/taro",
    "characters/lumi",
    "creatures/feniksik",
    "creatures/gryfonek",
    "creatures/jednorozec",
    "creatures/krysztalek",
    "creatures/smoczek",
    "eggs",
]

total_before = 0
total_after = 0
converted = 0

for target in TARGETS:
    folder = PUBLIC / target
    if not folder.exists():
        print(f"SKIP (not found): {target}")
        continue
    for png in folder.glob("*.png"):
        webp = png.with_suffix(".webp")
        img = Image.open(png).convert("RGBA")
        # quality=85 gives great quality with big size reduction
        img.save(webp, "WEBP", quality=85, method=6)
        before = png.stat().st_size
        after = webp.stat().st_size
        total_before += before
        total_after += after
        converted += 1
        pct = (1 - after / before) * 100
        print(f"  {target}/{png.name}: {before//1024} KB -> {after//1024} KB ({pct:.0f}% smaller)")

print()
print(f"Converted {converted} files")
print(f"Total before: {total_before // 1024} KB ({total_before / 1024 / 1024:.2f} MB)")
print(f"Total after:  {total_after // 1024} KB ({total_after / 1024 / 1024:.2f} MB)")
print(f"Savings:      {(total_before - total_after) // 1024} KB ({(1 - total_after/total_before) * 100:.1f}% smaller)")
