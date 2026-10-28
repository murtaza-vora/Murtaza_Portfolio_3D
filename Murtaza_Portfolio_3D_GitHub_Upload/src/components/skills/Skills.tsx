"use client";

import { useState } from "react";
import { SKILLS, SKILL_CATEGORIES, SkillItem } from "@/lib/data";
import { TechLogo } from "./TechLogo";
import Tilt3DCard from "@/components/ui/Tilt3DCard";

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeSkill, setActiveSkill] = useState<SkillItem>(SKILLS[0]);

  return (
    <section
      id="skills"
      className="py-24 border-t border-cyan-400/15 bg-[#070b19] spatial-grid-bg [perspective:1400px]"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
        {/* Section Tag & 3D Extruded Heading */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-slate-300 uppercase tracking-widest mb-2 px-3 py-1 rounded-full card-3d-surface border border-cyan-400/20">
            <span className="font-bold text-cyan-400">02</span>
            <span>&mdash;</span>
            <span>Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-white text-3d-extrude mt-2">
            The periodic table of my{" "}
            <span className="font-serif italic font-normal text-cyan-300">
              stack.
            </span>
          </h2>
          <p className="text-sm text-slate-400 mt-2 max-w-xl">
            Hover or tap any 3D element block to inspect production applications,
            framework details, and engineering context.
          </p>
        </div>

        {/* 3D Tactile Filter Categories Bar */}
        <div className="flex flex-wrap items-center gap-2.5 mb-10">
          {SKILL_CATEGORIES.map((cat) => {
            const count =
              cat === "All"
                ? SKILLS.length
                : SKILLS.filter((s) => s.category === cat).length;
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 ${
                  isSelected ? "btn-3d-dark" : "btn-3d-light"
                }`}
              >
                <span>{cat}</span>
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-white/25 text-white"
                      : "bg-cyan-400/15 text-cyan-300"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* 3D Keycap Elements Grid + Sticky 3D Inspector Panel Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* 3D Keycap Elements Grid (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 [perspective:1200px]">
            {SKILLS.map((skill, index) => {
              const matches =
                selectedCategory === "All" ||
                skill.category === selectedCategory;
              const isActive = activeSkill.name === skill.name;

              return (
                <div
                  key={skill.name}
                  onClick={() => setActiveSkill(skill)}
                  onMouseEnter={() => setActiveSkill(skill)}
                  onFocus={() => setActiveSkill(skill)}
                  tabIndex={0}
                  role="button"
                  aria-label={`${skill.name}, category: ${skill.category}`}
                  className={`group relative p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between h-32 preserve-3d focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                    isActive
                      ? "border-cyan-400 bg-gradient-to-br from-cyan-500/25 via-indigo-600/30 to-violet-600/30 text-white shadow-[0_6px_0_0_#06b6d4,0_20px_42px_rgba(6,182,212,0.35)] -translate-y-2 scale-[1.04] z-20"
                      : "border-cyan-400/20 card-3d-surface text-white shadow-[0_5px_0_0_#030612,0_12px_24px_rgba(0,0,0,0.5)] hover:-translate-y-1.5 hover:border-cyan-400/45 hover:shadow-[0_7px_0_0_#0891b2,0_16px_32px_rgba(6,182,212,0.22)]"
                  } ${matches ? "opacity-100" : "opacity-25 grayscale"}`}
                  style={{
                    animationDelay: `${
                      ((index % 4) + Math.floor(index / 4)) * 30
                    }ms`,
                  }}
                >
                  {/* Top Bar: Atomic number & Category badge */}
                  <div
                    style={{ transform: "translateZ(14px)" }}
                    className={`flex items-center justify-between text-[10px] font-mono ${
                      isActive ? "text-cyan-200" : "text-slate-400"
                    }`}
                  >
                    <span className="font-bold">
                      {skill.number < 10 ? `0${skill.number}` : skill.number}
                    </span>
                    <span
                      className={`text-[9px] uppercase tracking-wider truncate max-w-[85px] px-1.5 py-0.5 rounded ${
                        isActive
                          ? "bg-cyan-400/25 text-cyan-200 border border-cyan-300/30"
                          : "bg-white/5 text-slate-300"
                      }`}
                    >
                      {skill.category.split(" ")[0]}
                    </span>
                  </div>

                  {/* 3D Floating Element Symbol */}
                  <div
                    style={{ transform: "translateZ(26px)" }}
                    className="my-auto flex items-baseline justify-between"
                  >
                    <span
                      className={`text-3xl font-black font-mono tracking-tight ${
                        isActive ? "text-cyan-300" : "text-white"
                      }`}
                    >
                      {skill.symbol}
                    </span>
                    <span
                      className={`w-2 h-2 rounded-full transition-transform group-hover:scale-125 ${
                        isActive
                          ? "bg-cyan-300 shadow-[0_0_10px_#22d3ee]"
                          : "bg-violet-400/50"
                      }`}
                    />
                  </div>

                  {/* Element Name */}
                  <div
                    style={{ transform: "translateZ(18px)" }}
                    className={`text-xs font-bold truncate ${
                      isActive ? "text-white" : "text-slate-300"
                    }`}
                  >
                    {skill.name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sticky 3D Holographic Inspector Panel (4 cols) */}
          <div className="lg:col-span-4 sticky top-24">
            <Tilt3DCard
              maxTilt={11}
              extrudeBottom={true}
              className="card-3d-surface rounded-3xl border border-cyan-400/25 p-6 sm:p-8 flex flex-col gap-6"
            >
              <div
                style={{ transform: "translateZ(20px)" }}
                className="flex items-center justify-between border-b border-cyan-400/15 pb-4"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400 font-bold">
                  3D Element Inspector
                </span>
                <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-full bg-cyan-400/15 border border-cyan-400/35 text-cyan-300 shadow-xs">
                  #{activeSkill.number} &middot; {activeSkill.category}
                </span>
              </div>

              {/* 3D Orbital Hologram Stage with Spinning Rings */}
              <div
                style={{ transform: "translateZ(38px)" }}
                className="relative flex justify-center items-center py-7 bg-gradient-to-b from-[#070b19] to-indigo-950/60 rounded-2xl border border-cyan-400/25 overflow-hidden [perspective:800px] shadow-inner"
              >
                {/* Concentric 3D Gyroscope Rings */}
                <div className="pointer-events-none absolute w-40 h-40 rounded-full border border-cyan-400/40 animate-orbit-3d" />
                <div className="pointer-events-none absolute w-48 h-48 rounded-full border border-violet-400/40 animate-orbit-3d-reverse" />

                <div className="relative z-10 transition-transform duration-500 hover:scale-110">
                  <TechLogo name={activeSkill.name} size={108} />
                </div>
              </div>

              {/* Skill Title & Info floating at Z=28px */}
              <div style={{ transform: "translateZ(28px)" }}>
                <div className="flex items-baseline gap-2.5">
                  <span className="text-3xl font-black font-mono text-cyan-400">
                    {activeSkill.symbol}
                  </span>
                  <h3 className="text-xl font-black text-white tracking-tight">
                    {activeSkill.name}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 mt-2.5 leading-relaxed">
                  {activeSkill.description}
                </p>
              </div>

              {/* Related Projects in Résumé floating at Z=22px */}
              <div
                style={{ transform: "translateZ(22px)" }}
                className="border-t border-cyan-400/15 pt-4"
              >
                <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-bold block mb-2.5">
                  Applied In CV Projects
                </span>
                <div className="flex flex-wrap gap-2">
                  {activeSkill.projects.map((proj) => (
                    <span
                      key={proj}
                      className="px-3 py-1 rounded-full btn-3d-light text-[11px] font-bold text-cyan-200"
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              </div>
            </Tilt3DCard>
          </div>
        </div>
      </div>
    </section>
  );
}
