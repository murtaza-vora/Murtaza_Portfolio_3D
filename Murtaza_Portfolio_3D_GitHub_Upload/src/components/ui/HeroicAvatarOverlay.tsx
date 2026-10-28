"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface HeroicAvatarOverlayProps {
  src: string;
  alt: string;
  badge: string;
  speech: string;
  subtext?: string;
  stats?: { label: string; value: string }[];
  flipHorizontal?: boolean;
  align?: "left" | "right" | "center";
  height?: number;
}

export default function HeroicAvatarOverlay({
  src,
  alt,
  badge,
  speech,
  subtext,
  stats,
  flipHorizontal = false,
  align = "right",
  height = 520,
}: HeroicAvatarOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [dialogueOpen, setDialogueOpen] = useState(true);

  // Mouse physics: Subtle tilt, strictly clamped so it NEVER flips upside-down
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) / (window.innerWidth / 2);
      const dy = (e.clientY - centerY) / (window.innerHeight / 2);

      // Clamp tilt strictly between -6 and +6 degrees
      targetX = Math.max(-6, Math.min(6, -dy * 6));
      targetY = Math.max(-8, Math.min(8, dx * 8));
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const updatePhysics = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      setRotate({ x: currentX, y: currentY });
      animFrame = requestAnimationFrame(updatePhysics);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animFrame = requestAnimationFrame(updatePhysics);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex flex-col ${
        align === "left"
          ? "items-start"
          : align === "center"
          ? "items-center"
          : "items-end"
      } select-none [perspective:1000px] z-20 group`}
    >
      {/* Floating Dialogue Card */}
      <div
        onClick={() => setDialogueOpen(!dialogueOpen)}
        className={`mb-3 max-w-[280px] sm:max-w-[310px] bg-white/95 backdrop-blur-md rounded-2xl border border-black/10 p-4 shadow-[0_8px_24px_rgba(0,0,0,0.06)] cursor-pointer transition-all duration-300 ${
          dialogueOpen
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-45 translate-y-1 scale-95 hover:opacity-100"
        }`}
      >
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-black/60 font-semibold">
              {badge}
            </span>
          </div>
          <span className="font-mono text-[8px] text-black/40">
            {dialogueOpen ? "tap to minimize" : "tap to expand"}
          </span>
        </div>

        <p className="text-xs sm:text-sm font-semibold tracking-tight text-black leading-snug">
          &ldquo;{speech}&rdquo;
        </p>

        {subtext && dialogueOpen && (
          <p className="text-[11px] text-black/65 mt-1 leading-relaxed border-t border-black/5 pt-1">
            {subtext}
          </p>
        )}

        {stats && dialogueOpen && (
          <div className="grid grid-cols-2 gap-1.5 mt-2.5 pt-1.5 border-t border-black/5 font-mono text-[9px]">
            {stats.map((s, idx) => (
              <div key={idx} className="bg-neutral-50 p-1.5 rounded-lg border border-black/5">
                <span className="text-black/40 block text-[8px] uppercase">{s.label}</span>
                <span className="font-bold text-black text-xs">{s.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Upright Life-Size 3D Standing Character */}
      <div
        className="relative w-[240px] sm:w-[280px] md:w-[320px] transition-transform duration-300 ease-out cursor-pointer"
        style={{
          height: `${height}px`,
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(${
            isHovered ? 1.02 : 1
          }) ${flipHorizontal ? "scaleX(-1)" : ""}`,
        }}
        onClick={() => setDialogueOpen(!dialogueOpen)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 260px, 320px"
          className="object-contain object-bottom drop-shadow-[0_16px_20px_rgba(0,0,0,0.12)] pointer-events-auto"
          priority
        />

        {/* Soft Radial Contact Ground Shadow */}
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-44 h-5 bg-black/25 rounded-full blur-md transition-all duration-300 pointer-events-none"
          style={{
            transform: `translateX(-50%) scale(${isHovered ? 1.1 : 1})`,
            opacity: isHovered ? 0.35 : 0.22,
          }}
        />
      </div>
    </div>
  );
}
