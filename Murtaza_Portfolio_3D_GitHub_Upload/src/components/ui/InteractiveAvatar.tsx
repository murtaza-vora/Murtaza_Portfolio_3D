"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

interface InteractiveAvatarProps {
  src: string;
  alt: string;
  tag: string;
  quote: string;
  position?: "left" | "right" | "center";
  maxWidth?: number;
}

export default function InteractiveAvatar({
  src,
  alt,
  tag,
  quote,
  position = "right",
  maxWidth = 340,
}: InteractiveAvatarProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [bubbleOpen, setBubbleOpen] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let targetX = 0;
    let targetY = 0;
    let currX = 0;
    let currY = 0;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      targetX = -dy * 8;
      targetY = dx * 10;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const loop = () => {
      currX += (targetX - currX) * 0.08;
      currY += (targetY - currY) * 0.08;
      setRotate({ x: currX, y: currY });
      rafId = requestAnimationFrame(loop);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    rafId = requestAnimationFrame(loop);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative flex flex-col ${
        position === "left"
          ? "items-start"
          : position === "center"
          ? "items-center"
          : "items-end"
      } select-none [perspective:1000px] group`}
      style={{ maxWidth: `${maxWidth}px` }}
    >
      {/* Interactive Floating Speech Bubble */}
      <div
        className={`mb-2 px-4 py-2 rounded-2xl border border-black/10 bg-white/95 backdrop-blur-sm shadow-[0_8px_20px_rgba(0,0,0,0.06)] transition-all duration-300 z-20 cursor-pointer ${
          bubbleOpen ? "scale-100 opacity-100" : "scale-95 opacity-90 group-hover:scale-100 group-hover:opacity-100"
        }`}
        onClick={() => setBubbleOpen(!bubbleOpen)}
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[9px] uppercase tracking-wider text-black/50">
            {tag}
          </span>
        </div>
        <p className="text-xs font-serif italic text-black/85 mt-0.5 leading-snug">
          &ldquo;{quote}&rdquo;
        </p>
      </div>

      {/* 3D Reactive Character Image Container */}
      <div
        className="relative w-full aspect-[16/10] overflow-hidden cursor-pointer transition-transform duration-500 ease-out"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        }}
        onClick={() => setBubbleOpen(!bubbleOpen)}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 360px"
          className="object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-[1.03]"
          priority={false}
        />
      </div>
    </div>
  );
}
