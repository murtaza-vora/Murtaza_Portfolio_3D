"use client";

import { useState } from "react";
import { PROJECTS, ProjectItem } from "@/lib/data";
import { IllustrativeUI } from "./IllustrativeUI";
import Tilt3DCard from "@/components/ui/Tilt3DCard";

export default function Work() {
  const [activeProject, setActiveProject] = useState<string>(PROJECTS[0].id);
  const [viewMode, setViewMode] = useState<"accordion" | "grid">("accordion");

  return (
    <section
      id="work"
      className="py-24 border-t border-cyan-400/15 bg-[#070b19] spatial-grid-bg [perspective:1500px]"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
        {/* Section Heading Tag + 3D View Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 font-mono text-xs text-slate-300 uppercase tracking-widest mb-2 px-3 py-1 rounded-full card-3d-surface border border-cyan-400/20">
              <span className="font-bold text-cyan-400">03</span>
              <span>&mdash;</span>
              <span>Selected work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-white text-3d-extrude mt-2">
              Things I&apos;ve{" "}
              <span className="font-serif italic font-normal text-cyan-300">
                built.
              </span>
            </h2>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              Selected data analytics projects, business intelligence solutions,
              and data-driven applications built to turn complex data into
              actionable insights.
            </p>
          </div>

          {/* Desktop 3D Layout Switcher */}
          <div className="hidden lg:inline-flex items-center gap-1.5 p-1.5 rounded-full card-3d-surface border border-cyan-400/25 self-start sm:self-end">
            <button
              type="button"
              onClick={() => setViewMode("accordion")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                viewMode === "accordion"
                  ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              3D Accordion
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              3D Spatial Grid
            </button>
          </div>
        </div>

        {/* Desktop Mode 1: 3D Expanding Horizontal Accordion */}
        {viewMode === "accordion" && (
          <div className="hidden lg:flex gap-4 h-[640px] w-full [perspective:1400px]">
            {PROJECTS.map((project: ProjectItem) => {
              const isOpen = activeProject === project.id;

              return (
                <div
                  key={project.id}
                  onClick={() => setActiveProject(project.id)}
                  onMouseEnter={() => setActiveProject(project.id)}
                  onFocus={() => setActiveProject(project.id)}
                  tabIndex={0}
                  role="button"
                  aria-expanded={isOpen}
                  aria-label={`Project: ${project.title}`}
                  className={`relative rounded-3xl border overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                    isOpen
                      ? "flex-[3.6] card-3d-surface border-cyan-400/35 shadow-[0_8px_0_0_#030612,0_28px_65px_rgba(0,0,0,0.8),0_0_40px_-8px_rgba(6,182,212,0.25)] p-8"
                      : "flex-[0.6] card-3d-surface border-cyan-400/15 shadow-[0_6px_0_0_#030612,0_12px_28px_rgba(0,0,0,0.6)] hover:-translate-y-1.5 hover:border-cyan-400/40 p-6 flex flex-col justify-between items-center"
                  }`}
                >
                  {!isOpen ? (
                    /* Collapsed 3D Extruded Spine */
                    <div className="w-full h-full flex flex-col justify-between items-center select-none">
                      <span className="font-mono text-xs font-black text-cyan-300 bg-cyan-400/15 px-2.5 py-1 rounded-full border border-cyan-400/30">
                        {project.index}
                      </span>

                      {/* Vertical Title */}
                      <div className="my-auto [writing-mode:vertical-rl] rotate-180">
                        <span className="text-sm font-bold tracking-tight text-slate-200 whitespace-nowrap">
                          {project.title}
                        </span>
                      </div>

                      {/* 3D Keycap Plus Icon */}
                      <div className="w-10 h-10 rounded-full btn-3d-light flex items-center justify-center text-cyan-300 font-bold">
                        +
                      </div>
                    </div>
                  ) : (
                    /* Expanded Full 3D Spatial Panel */
                    <div className="w-full h-full flex gap-8 items-stretch animate-fadeIn">
                      {/* Left Side: Project Details */}
                      <div className="w-7/12 flex flex-col justify-between pr-4 overflow-y-auto">
                        <div>
                          {/* Kicker & Index */}
                          <div className="flex items-center gap-3 font-mono text-xs mb-2">
                            <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/20 border border-cyan-400/40 text-cyan-300 font-bold">
                              {project.index}
                            </span>
                            <span className="text-slate-500">&middot;</span>
                            <span className="uppercase tracking-wider font-bold text-violet-300">
                              {project.kicker}
                            </span>
                          </div>

                          <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-3">
                            {project.title}
                          </h3>

                          <p className="text-sm text-slate-300 leading-relaxed mb-6">
                            {project.description}
                          </p>

                          {/* 2-Column 3D Features List */}
                          <div className="space-y-2.5 mb-6">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-cyan-400 font-bold block">
                              Key Capabilities
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-200">
                              {project.features.map((feat, i) => (
                                <div
                                  key={i}
                                  className="flex items-start gap-2.5 bg-[#070b19]/85 p-3 rounded-2xl border border-cyan-400/15 shadow-[0_3px_0_0_#030612]"
                                >
                                  <span className="text-cyan-400 font-black text-xs">
                                    &bull;
                                  </span>
                                  <span className="leading-snug font-medium">
                                    {feat}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Tech Chips & CTA Links */}
                        <div className="pt-4 border-t border-cyan-400/15 flex flex-col gap-4">
                          <div className="flex flex-wrap gap-1.5">
                            {project.tech.map((t) => (
                              <span
                                key={t}
                                className="px-3 py-1 rounded-full btn-3d-light text-[11px] font-mono font-bold text-cyan-200"
                              >
                                {t}
                              </span>
                            ))}
                          </div>

                          {project.link && project.link !== "#" && (
                            <div>
                              <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-full btn-3d-dark"
                              >
                                <span>Visit Platform</span>
                                <span>&nearr;</span>
                              </a>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Right Side: Interactive 3D Illustrative Mini-UI */}
                      <div className="w-5/12 flex items-center justify-center">
                        <IllustrativeUI type={project.uiType} />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Desktop Mode 2: 3D Spatial Grid */}
        {viewMode === "grid" && (
          <div className="hidden lg:grid grid-cols-2 gap-8">
            {PROJECTS.map((project) => (
              <Tilt3DCard
                key={project.id}
                maxTilt={8}
                extrudeBottom={true}
                className="card-3d-surface rounded-3xl border border-cyan-400/25 p-7 flex flex-col justify-between gap-6 h-full"
              >
                <div style={{ transform: "translateZ(24px)" }}>
                  <div className="flex items-center justify-between font-mono text-xs mb-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/20 border border-cyan-400/40 text-cyan-300 font-bold">
                      {project.index}
                    </span>
                    <span className="uppercase tracking-wider font-bold text-violet-300">
                      {project.kicker}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black tracking-tight text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                <div style={{ transform: "translateZ(36px)" }} className="h-64">
                  <IllustrativeUI type={project.uiType} />
                </div>

                <div
                  style={{ transform: "translateZ(20px)" }}
                  className="pt-4 border-t border-cyan-400/15 flex items-center justify-between gap-4 flex-wrap"
                >
                  <div className="flex flex-wrap gap-1.5">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-full btn-3d-light text-[10px] font-mono font-bold text-cyan-200"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {project.link && project.link !== "#" && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full btn-3d-dark"
                    >
                      <span>Visit Platform</span>
                      <span>&nearr;</span>
                    </a>
                  )}
                </div>
              </Tilt3DCard>
            ))}
          </div>
        )}

        {/* Mobile 3D Accordion (Vertical) */}
        <div className="flex flex-col gap-4 lg:hidden">
          {PROJECTS.map((project) => {
            const isOpen = activeProject === project.id;
            return (
              <div
                key={project.id}
                className="rounded-2xl border border-cyan-400/25 card-3d-surface overflow-hidden shadow-[0_5px_0_0_#030612]"
              >
                <button
                  type="button"
                  onClick={() => setActiveProject(isOpen ? "" : project.id)}
                  className="w-full p-5 flex items-center justify-between text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-cyan-400">
                      {project.index}
                    </span>
                    <span className="font-black text-white text-base">
                      {project.title}
                    </span>
                  </div>
                  <span className="font-mono text-lg text-cyan-300">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="p-5 pt-0 border-t border-cyan-400/15 space-y-4">
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="h-72">
                      <IllustrativeUI type={project.uiType} />
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 rounded-full btn-3d-light text-[10px] font-mono font-bold text-cyan-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
