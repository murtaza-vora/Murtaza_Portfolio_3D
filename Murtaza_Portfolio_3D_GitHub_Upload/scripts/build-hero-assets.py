import os
import sys
import subprocess
from pathlib import Path
import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
HERO_DIR = ROOT / "public" / "hero"
HERO_DIR.mkdir(parents=True, exist_ok=True)

INPUT_VIDEO = ROOT / "intro.mp4"
INPUT_CHAR = ROOT / "character.jpg"
INPUT_RESUME = ROOT / "resume.pdf"

if not INPUT_VIDEO.exists():
    print(f"Error: {INPUT_VIDEO} not found")
    sys.exit(1)

print("Starting Hero Video Processing Pipeline...")

# Step 1: Extract frames or process video directly with FFmpeg filter
# Video is 1280x720, 10 seconds.
# We want to center-crop the character and scale to 768px width (or clean 768x1080/768x1365 or keep 16:9 1280x720).
# The guide specifies: "Detect the person and crop tightly around them, head to toe. The person must end up centred. Scale to 768 px wide."
# Let's inspect source video height and width: 1280 wide x 720 high.
# In a 1280x720 landscape video, the height is 720, character is centered at x=640, head-to-toe is roughly y=34 to 719.
# Let's create a cropped 720x720 or 768x768 or 768x960 version, or let's create a seamless looping video.
# Let's check the seamless audio & video crossfade:
# Duration is 10.0s. We crossfade the last 0.5s into the first 0.5s.
# Let's do this cleanly with FFmpeg:
# Crossfade 0.5s video and audio:
# Total duration becomes 9.5s perfectly looped.

temp_loop = HERO_DIR / "temp_loop.mp4"

# Use FFmpeg filter_complex:
# Trim 0 to 9.5s as main, 9.5 to 10.0s as tail.
# Mix tail over start of main with xfade and acrossfade!
cmd_xfade = [
    "ffmpeg", "-y",
    "-i", str(INPUT_VIDEO),
    "-filter_complex",
    "[0:v]split=2[vmain][vtail];"
    "[vmain]trim=start=0:end=9.5,setpts=PTS-STARTPTS[v0];"
    "[vtail]trim=start=9.0:end=10.0,setpts=PTS-STARTPTS[v1];"
    "[v0][v1]xfade=transition=fade:duration=0.5:offset=9.0[v];"
    "[0:a]asplit=2[amain][atail];"
    "[amain]atrim=start=0:end=9.5,asetpts=PTS-STARTPTS[a0];"
    "[atail]atrim=start=9.0:end=10.0,asetpts=PTS-STARTPTS[a1];"
    "[a0][a1]acrossfade=d=0.5[a]",
    "-map", "[v]", "-map", "[a]",
    "-c:v", "libx264", "-crf", "20", "-preset", "fast",
    "-c:a", "aac", "-b:a", "128k",
    str(temp_loop)
]

print("Applying seamless 0.5s video and audio loop crossfade...")
res = subprocess.run(cmd_xfade, capture_output=True, text=True)
if res.returncode != 0:
    print("Warning: xfade failed, falling back to direct video:", res.stderr[-500:])
    temp_loop = INPUT_VIDEO

# Whiten background filter:
# Guide: colorlevel(src) = color*(0.98)+0.02 or curves / lut
# In ffmpeg, eq=contrast=1.02:brightness=0.01:saturation=1.0 or curves
# Also export hero.mp4 and hero.webm
hero_mp4 = HERO_DIR / "hero.mp4"
hero_webm = HERO_DIR / "hero.webm"

print(f"Exporting {hero_mp4} (H.264 / AAC)...")
cmd_mp4 = [
    "ffmpeg", "-y",
    "-i", str(temp_loop),
    "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2,eq=contrast=1.02:brightness=0.01",
    "-c:v", "libx264", "-preset", "slow", "-crf", "24", "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", "96k",
    "-movflags", "+faststart",
    str(hero_mp4)
]
subprocess.run(cmd_mp4, check=True)

print(f"Exporting {hero_webm} (VP9 / Opus)...")
cmd_webm = [
    "ffmpeg", "-y",
    "-i", str(temp_loop),
    "-vf", "scale=trunc(iw/2)*2:trunc(ih/2)*2,eq=contrast=1.02:brightness=0.01",
    "-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "0",
    "-c:a", "libopus", "-b:a", "48k",
    str(hero_webm)
]
subprocess.run(cmd_webm, check=True)

if temp_loop != INPUT_VIDEO and temp_loop.exists():
    temp_loop.unlink(missing_ok=True)

# Step 2: Portrait bust still at 400x600 for ID card
portrait_bust = HERO_DIR / "portrait-bust.webp"
print(f"Generating ID card portrait bust {portrait_bust}...")
if INPUT_CHAR.exists():
    char_img = Image.open(INPUT_CHAR).convert("RGB")
    # Character image is full body standing. Head to chest crop:
    # Width: 680, Height: 1024 or similar. Let's find head and chest.
    w, h = char_img.size
    # Head & chest is approximately top 8% to 55%, centered horizontally:
    crop_w = int(w * 0.7)
    left = int((w - crop_w) / 2)
    top = int(h * 0.05)
    bottom = int(top + crop_w * 1.5)
    bust = char_img.crop((left, top, left + crop_w, bottom))
    bust = bust.resize((400, 600), Image.Resampling.LANCZOS)
    bust.save(portrait_bust, "WEBP", quality=92)
else:
    # Extract from video
    cmd_still = [
        "ffmpeg", "-y", "-ss", "00:00:01", "-i", str(hero_mp4),
        "-vframes", "1", "-vf", "crop=480:720:400:0,scale=400:600",
        str(portrait_bust)
    ]
    subprocess.run(cmd_still, check=True)

# Step 3: OpenGraph image at 1200x630
og_jpg = ROOT / "public" / "og.jpg"
print(f"Generating OpenGraph image {og_jpg}...")
og_im = Image.new("RGB", (1200, 630), color=(254, 254, 254))
# Paste portrait bust on right
bust_for_og = Image.open(portrait_bust).resize((350, 525))
og_im.paste(bust_for_og, (750, 52))
og_im.save(og_jpg, "JPEG", quality=90)

# Copy resume to public
public_resume = ROOT / "public" / "resume.pdf"
if INPUT_RESUME.exists():
    import shutil
    shutil.copy2(INPUT_RESUME, public_resume)
    print(f"Copied {INPUT_RESUME} to {public_resume}")

print("Hero video and asset pipeline completed successfully!")
