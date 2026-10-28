# Murtaza Vora — Personal Portfolio

A production-ready, interactive personal portfolio website for **Murtaza Vora**, engineered with Next.js 15, React 19, TypeScript, Tailwind CSS v4, and Lenis smooth scrolling.

Features a 3D animated talking avatar hero with scroll-reactive audio, physics-driven hanging lanyard ID card, periodic table of technical stack, horizontal expanding work gallery, lock-flood credentials list, unified trajectory timeline, and pinned metric counters.

---

## 1. Quick Start

### Prerequisites
- Node.js 18+ (tested on Node.js v22.13.1)
- Python 3.10+ with Pillow and NumPy (for video pipeline rebuilds)
- FFmpeg (for video encoding)

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm run start
```

---

## 2. Sections Table

| # | Section | Key Component | Highlights |
|---|---|---|---|
| `00` | **Navigation** | `Navigation.tsx` | 2px scroll progress bar, spinning monogram logo, frosted glass pill (`backdrop-filter: blur`), mobile clip-path overlay. |
| `01` | **Hero** | `hero/Hero.tsx` | Seamlessly blended talking avatar video (`mix-blend-mode: multiply`), large outlined ghost typography, autoplay fallback, sound toggle button with ping wave, smart auto-pause when scrolled >35% out of view. |
| `02` | **About** | `about/About.tsx`, `LanyardCard.tsx` | 3-column layout. Verbatim résumé summary, quick facts, and interactive 3D hanging lanyard badge with mouse spring physics and 3D card flip. |
| `03` | **Skills** | `skills/Skills.tsx`, `TechLogo.tsx` | "The periodic table of my stack" with category filters, atomic numbers, element symbols, and sticky inspector panel showing brand SVGs. |
| `04` | **Work** | `work/Work.tsx`, `IllustrativeUI.tsx` | Expanding horizontal accordion gallery. Focused panel expands (`flex: 3.5`), others collapse into vertical spines. Right side renders pure CSS/JSX illustrative UI wireframes. |
| `05` | **Certifications** | `certifications/Certifications.tsx` | "Always learning" lock-flood list where hover floods ink left-to-right (`scaleX: 0 -> 1`) and text turns white. |
| `06` | **Experience** | `experience/Experience.tsx` | Chronological vertical timeline uniting Cardiff Met First Class degree, CEE U.S. State Dept fellowship, Maytech, Swivel, and rural ICT instruction. Dynamic drawing spine. Ends with "Next — Your team?". |
| `07` | **Achievements** | `achievements/Achievements.tsx` | Viewport-pinned horizontal gallery (`position: sticky; height: 280vh`). Cards slide horizontally as user scrolls down. |
| `08` | **Contact** | `contact/Contact.tsx` | Bouncing kinetic headline typography, one-click copy email pill with live feedback, direct phone link, spinning circular "say hello" badge, and clean footer. |

---

## 3. Rebuilding the Hero Video Loop

To rebuild or reprocess the hero video assets:
```bash
python scripts/build-hero-assets.py
```
This script performs:
1. Detects character bounding box and centers the subject.
2. Mathematically whitens backdrop to `#ffffff` for clean `mix-blend-mode: multiply` blending.
3. Applies a seamless 0.5s audio and video crossfade between head and tail of the clip.
4. Exports both `public/hero/hero.mp4` (H.264/AAC) and `public/hero/hero.webm` (VP9/Opus).
5. Generates the high-res 400x600 `portrait-bust.webp` and 1200x630 `og.jpg`.

---

## 4. Brand Credits & Licences
- Tech logos (React, Python, TypeScript, Next.js, Tailwind CSS, Figma, Git) belong to their respective copyright holders.
- Fonts: Inter Tight, Instrument Serif, and JetBrains Mono under SIL Open Font License.
- Design tokens & layout inspired by modern editorial minimalism and Awwwards standard craftsmanship.
