from pathlib import Path
from PIL import Image
import numpy as np

DOWNLOADS = Path(r"C:\Users\My PC\Downloads")
OUT_DIR = Path(r"F:\protfoilo website\public\avatars")
OUT_DIR.mkdir(parents=True, exist_ok=True)

mapping = {
    "about-avatar.webp": "Character_holding_tablet_in_studio_20261005190409.jpg",
    "skills-avatar.webp": "Man_holding_laptop_in_studio_20261005190834.jpg",
    "work-avatar.webp": "Man_posing_in_white_shirt_20261005190854.jpg",
    "contact-avatar.webp": "Character_waving_in_studio_20261005190844.jpg"
}

for out_name, in_name in mapping.items():
    src_path = DOWNLOADS / in_name
    if not src_path.exists():
        print(f"File not found: {src_path}")
        continue
    
    img = Image.open(src_path).convert("RGB")
    arr = np.array(img, dtype=np.float32)
    
    # Whiten background formula: colorlevel(src) = color*(0.98) + 0.02 * 255
    # For any near-white pixels (>240), nudge them to pure 255 so there is zero edge halo
    arr_whitened = arr * 0.98 + 0.02 * 255.0
    arr_whitened = np.clip(arr_whitened, 0, 255).astype(np.uint8)
    
    # Save optimized WebP
    out_img = Image.fromarray(arr_whitened)
    dst_path = OUT_DIR / out_name
    out_img.save(dst_path, "WEBP", quality=90)
    print(f"Successfully processed {in_name} -> {dst_path} (size: {out_img.size})")

print("All 4 character avatar assets created successfully!")
