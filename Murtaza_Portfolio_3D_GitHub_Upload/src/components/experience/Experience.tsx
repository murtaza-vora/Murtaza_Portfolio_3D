"use client";

import { useRef, useState, useEffect } from "react";
import { TIMELINE } from "@/lib/data";
import Tilt3DCard from "@/components/ui/Tilt3DCard";

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const elementTop = rect.top;
      const elementHeight = rect.height;
      const totalScrollable = elementHeight;
      const currentScroll = windowHeight * 0.65 - elementTop;

      const progress = Math.min(
        1,
        Math.max(0, currentScroll / totalScrollable)
      );

      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalItems = TIMELINE.length + 1;
  const activeIndex = Math.floor(scrollProgress * totalItems);

  return (
    <section
      id="experience"
      className="py-24 bg-[#070b19] spatial-grid-bg border-t border-cyan-400/15 relative overflow-hidden [perspective:1400px]"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
        {/* Section Heading Tag */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-slate-300 uppercase tracking-widest mb-2 px-3 py-1 rounded-full card-3d-surface border border-cyan-400/20">
            <span className="font-bold text-cyan-400">05</span>
            <span>&mdash;</span>
            <span>Trajectory</span>
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tighter text-white text-3d-extrude mt-2">
            Experience &amp;{" "}
            <span className="font-serif italic font-normal text-cyan-300">
              milestones.
            </span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-3">
            Numbers don&apos;t speak for themselves. I help them say something
            useful.
          </p>
        </div>

        {/* Central 3D Alternating Timeline Container */}
        <div ref={containerRef} className="relative max-w-5xl mx-auto pb-16">
          {/* Central 3D Conduit Spine */}
          <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-4 bottom-24 w-[4px] rounded-full bg-cyan-400/15 z-0 shadow-inner">
            <div
              className="w-full rounded-full bg-gradient-to-b from-cyan-400 via-indigo-500 to-violet-500 transition-all duration-300 ease-out origin-top shadow-[0_0_18px_rgba(34,211,238,0.75)]"
              style={{
                height: `${Math.min(100, scrollProgress * 105)}%`,
              }}
            />
          </div>

          <div className="space-y-12 md:space-y-16">
            {TIMELINE.map((item, index) => {
              const isEven = index % 2 === 0;
              const isReached = index <= activeIndex;

              return (
                <div
                  key={index}
                  className={`relative flex items-center md:justify-between ${
                    isEven ? "md:flex-row-reverse" : "md:flex-row"
                  } group`}
                >
                  {/* Empty Spacer Column for Desktop Alternating Balance */}
                  <div className="hidden md:block md:w-[calc(50%-48px)]" />

                  {/* Central 3D Sphere Node on the Spine */}
                  <div
                    className={`absolute left-4 md:left-1/2 -translate-x-1/2 top-8 md:top-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 transition-all duration-500 ${
                      isReached
                        ? "border-cyan-400 bg-[#070b19] scale-110 shadow-[0_0_20px_rgba(34,211,238,0.6)] ring-4 ring-cyan-400/20"
                        : "border-cyan-400/25 bg-[#070b19] scale-90"
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full transition-all duration-500 ${
                        isReached
                          ? "bg-gradient-to-tr from-cyan-400 to-violet-500 scale-100"
                          : "bg-transparent scale-0"
                      }`}
                    />
                  </div>

                  {/* 3D Tilted Milestone Card (Alternates Left and Right) */}
                  <div
                    className={`pl-12 md:pl-0 w-full md:w-[calc(50%-48px)] transition-all duration-700 ease-out ${
                      isReached
                        ? "opacity-100 translate-x-0 scale-100"
                        : isEven
                        ? "opacity-35 md:translate-x-8 scale-95"
                        : "opacity-35 md:-translate-x-8 scale-95"
                    }`}
                  >
                    <Tilt3DCard
                      maxTilt={9}
                      extrudeBottom={isReached}
                      className={`p-6 sm:p-7 rounded-3xl border transition-all duration-500 ${
                        isReached
                          ? "card-3d-surface border-cyan-400/30"
                          : "bg-[#0c1328]/60 border-cyan-400/10"
                      }`}
                    >
                      {/* Top Meta Line: Year & Location floating at Z=24px */}
                      <div
                        style={{ transform: "translateZ(24px)" }}
                        className="flex flex-wrap items-center justify-between gap-2 mb-3"
                      >
                        <span className="font-mono text-xs font-bold text-white uppercase tracking-wider bg-gradient-to-r from-cyan-500/30 to-violet-500/30 border border-cyan-400/35 px-3 py-1 rounded-full shadow-xs">
                          {item.year}
                        </span>
                        <span className="font-mono text-[11px] font-semibold text-cyan-300 bg-cyan-400/10 px-2.5 py-0.5 rounded-full border border-cyan-400/25">
                          {item.type} &middot; {item.location}
                        </span>
                      </div>

                      {/* Title & Organization floating at Z=30px */}
                      <div style={{ transform: "translateZ(30px)" }}>
                        <h3 className="text-lg sm:text-xl font-black tracking-tight text-white mt-1">
                          {item.title}
                        </h3>
                        <p className="text-xs font-bold text-violet-300 mb-3">
                          {item.organization}
                        </p>
                      </div>

                      {/* Description floating at Z=18px */}
                      <p
                        style={{ transform: "translateZ(18px)" }}
                        className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal"
                      >
                        {item.description}
                      </p>

                      {/* 3D Keycap Tags floating at Z=26px */}
                      {item.tags && (
                        <div
                          style={{ transform: "translateZ(26px)" }}
                          className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-cyan-400/15"
                        >
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-full btn-3d-light text-[10px] font-mono font-bold text-cyan-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </Tilt3DCard>
                  </div>
                </div>
              );
            })}

            {/* Ending Centered 3D Portal Card: Next - Your team? */}
            <div
              className={`relative flex flex-col items-center pt-8 transition-all duration-700 ${
                activeIndex >= TIMELINE.length
                  ? "opacity-100 translate-y-0"
                  : "opacity-40 translate-y-6"
              }`}
            >
              <div className="w-9 h-9 rounded-full border-2 border-dashed border-cyan-400 bg-[#070b19] flex items-center justify-center mb-6 z-10 shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
              </div>

              <Tilt3DCard
                maxTilt={10}
                extrudeBottom={true}
                className="max-w-md w-full p-8 rounded-3xl border border-cyan-400/30 card-3d-surface text-center"
              >
                <span
                  style={{ transform: "translateZ(20px)" }}
                  className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold block mb-1"
                >
                  Next Chapter
                </span>
                <h3
                  style={{ transform: "translateZ(32px)" }}
                  className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2"
                >
                  Your team?
                </h3>
                <p
                  style={{ transform: "translateZ(18px)" }}
                  className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6"
                >
                  Whether you&apos;re hiring for data analytics, data science, or
                  AI engineering, or exploring a project that needs answers from
                  messy data, let&apos;s build something exceptional together.
                </p>
                <div style={{ transform: "translateZ(36px)" }}>
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full btn-3d-dark text-xs font-bold"
                  >
                    <span>Start a conversation</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              </Tilt3DCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
