import sys
from pathlib import Path
from PIL import Image
import rembg

DOWNLOADS = Path(r"C:\Users\My PC\Downloads")
OUT_DIR = Path(r"F:\protfoilo website\public\avatars")
OUT_DIR.mkdir(parents=True, exist_ok=True)

mapping = {
    "about-avatar-nobg.png": "Character_holding_tablet_in_studio_20261005190409.jpg",
    "skills-avatar-nobg.png": "Man_holding_laptop_in_studio_20261005190834.jpg",
    "work-avatar-nobg.png": "Man_posing_in_white_shirt_20261005190854.jpg",
    "contact-avatar-nobg.png": "Character_waving_in_studio_20261005190844.jpg"
}

for out_name, in_name in mapping.items():
    src_path = DOWNLOADS / in_name
    if not src_path.exists():
        print(f"Not found: {src_path}")
        continue
    
    print(f"Removing background from {in_name}...")
    inp = Image.open(src_path)
    # Use rembg
    out = rembg.remove(inp)
    
    # Auto-crop bounding box of non-transparent pixels
    bbox = out.getbbox()
    if bbox:
        # Add small 20px padding around character
        w, h = out.size
        pad = 20
        crop_box = (
            max(0, bbox[0] - pad),
            max(0, bbox[1] - pad),
            min(w, bbox[2] + pad),
            min(h, bbox[3] + pad)
        )
        out = out.crop(crop_box)
    
    dst_path = OUT_DIR / out_name
    out.save(dst_path, "PNG")
    print(f"Saved transparent cutout to {dst_path} (size: {out.size})")

print("All avatar cutouts generated successfully!")
