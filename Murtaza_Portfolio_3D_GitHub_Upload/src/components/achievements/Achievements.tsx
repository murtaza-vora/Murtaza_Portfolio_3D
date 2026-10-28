"use client";

import { useRef, useEffect, useState } from "react";
import { ACHIEVEMENTS, AchievementItem } from "@/lib/data";
import Tilt3DCard from "@/components/ui/Tilt3DCard";

export default function Achievements() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const totalScrollable = container.offsetHeight - window.innerHeight;
      if (totalScrollable > 0) {
        const current = -rect.top;
        const progress = Math.min(1, Math.max(0, current / totalScrollable));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      id="achievements"
      className="relative h-[280vh] bg-[#070b19] spatial-grid-bg border-t border-cyan-400/15 [perspective:1600px]"
    >
      {/* Sticky 3D Viewport Frame */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between py-12 overflow-hidden">
        {/* Header with 3D Extruded Title & Progress Bar */}
        <div className="max-w-[1320px] mx-auto w-full px-4 sm:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-slate-300 uppercase tracking-widest mb-2 px-3 py-1 rounded-full card-3d-surface border border-cyan-400/20">
                <span className="font-bold text-cyan-400">06</span>
                <span>&mdash;</span>
                <span>Metrics &amp; Honors</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-white text-3d-extrude mt-1">
                Proven track{" "}
                <span className="font-serif italic font-normal text-cyan-300">
                  record.
                </span>
              </h2>
            </div>

            {/* 3D Scroll Progress Pill */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-full card-3d-surface border border-cyan-400/25">
              <span className="font-mono text-xs font-bold text-cyan-400">
                {Math.round(scrollProgress * 100)}%
              </span>
              <div className="w-32 h-[4px] bg-cyan-400/15 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 transition-all duration-75"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sliding 3D Spatial Cards Track */}
        <div className="w-full my-auto overflow-visible py-8">
          <div
            ref={trackRef}
            className="flex gap-7 sm:gap-9 px-4 sm:px-8 transition-transform duration-100 ease-out will-change-transform [perspective:1400px]"
            style={{
              transform: `translateX(-${scrollProgress * 65}%)`,
            }}
          >
            {ACHIEVEMENTS.map((item: AchievementItem, idx: number) => {
              return (
                <div
                  key={idx}
                  className="shrink-0 w-[clamp(340px,40vw,520px)] h-[clamp(275px,34vh,340px)]"
                >
                  <Tilt3DCard
                    maxTilt={11}
                    scaleOnHover={1.03}
                    extrudeBottom={true}
                    className="w-full h-full card-3d-surface rounded-[30px] p-8 border border-cyan-400/25 flex flex-col justify-between preserve-3d"
                  >
                    {/* Top Bar: 3D Extruded Platform Tile & Index at Z=28px */}
                    <div
                      style={{ transform: "translateZ(28px)" }}
                      className="flex items-center justify-between"
                    >
                      <div className="px-4 h-14 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-600/25 border border-cyan-400/35 flex items-center justify-center font-mono font-black text-xs text-cyan-300 shadow-lg">
                        {item.logo}
                      </div>
                      <span className="font-mono text-xs text-violet-300 font-bold bg-violet-500/15 px-3 py-1 rounded-full border border-violet-400/30">
                        {item.index}
                      </span>
                    </div>

                    {/* Bottom: Left Info at Z=24px & Right Giant 3D Extruded Number at Z=48px */}
                    <div className="flex items-end justify-between gap-4 preserve-3d">
                      <div
                        style={{ transform: "translateZ(24px)" }}
                        className="max-w-[60%]"
                      >
                        <span className="font-mono text-[10px] text-cyan-400 font-bold uppercase tracking-widest block mb-1">
                          {item.caption}
                        </span>
                        <h3 className="text-lg sm:text-xl font-black text-white tracking-tight leading-tight">
                          {item.label}
                        </h3>
                        <p className="text-xs text-slate-300 mt-1.5 line-clamp-2 leading-relaxed">
                          {item.detail}
                        </p>
                      </div>

                      <div
                        style={{ transform: "translateZ(48px)" }}
                        className="text-right shrink-0"
                      >
                        <span className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white text-3d-extrude">
                          {item.number}
                        </span>
                        {item.suffix && (
                          <span className="text-base sm:text-lg font-serif italic text-cyan-300 ml-1 font-medium">
                            {item.suffix}
                          </span>
                        )}
                      </div>
                    </div>
                  </Tilt3DCard>
                </div>
              );
            })}

            {/* Ending 3D Card: and counting... */}
            <div className="shrink-0 w-[clamp(280px,30vw,360px)] h-[clamp(275px,34vh,340px)]">
              <Tilt3DCard
                maxTilt={10}
                extrudeBottom={true}
                className="w-full h-full rounded-[30px] border-2 border-dashed border-cyan-400/35 card-3d-surface flex flex-col items-center justify-center text-center p-8"
              >
                <span
                  style={{ transform: "translateZ(35px)" }}
                  className="font-serif italic text-3xl sm:text-4xl text-cyan-300"
                >
                  and counting...
                </span>
                <p
                  style={{ transform: "translateZ(20px)" }}
                  className="font-mono text-xs text-slate-400 mt-3"
                >
                  Committed to compounding growth through software and community
                  impact.
                </p>
              </Tilt3DCard>
            </div>
          </div>
        </div>

        {/* Footer Hint */}
        <div className="max-w-[1320px] mx-auto w-full px-4 sm:px-8">
          <p className="font-mono text-[11px] text-slate-400 font-medium">
            Scroll down to advance 3D gallery &middot; Keep scrolling for contact
          </p>
        </div>
      </div>
    </section>
  );
}
