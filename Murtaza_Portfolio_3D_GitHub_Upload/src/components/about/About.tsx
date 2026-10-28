"use client";

import { PROFILE } from "@/lib/data";
import LanyardCard from "./LanyardCard";
import Tilt3DCard from "@/components/ui/Tilt3DCard";

export default function About() {
  return (
    <section
      id="about"
      className="py-24 border-t border-cyan-400/15 bg-[#070b19] spatial-grid-bg relative overflow-hidden"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8 relative z-10">
        {/* Section Heading Tag */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 font-mono text-xs text-slate-300 uppercase tracking-widest mb-2 px-3 py-1 rounded-full card-3d-surface border border-cyan-400/20">
            <span className="font-bold text-cyan-400">01</span>
            <span>&mdash;</span>
            <span>About me</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-white text-3d-extrude mt-2">
            Turning data into{" "}
            <span className="font-serif italic font-normal text-cyan-300">
              decision.
            </span>
          </h2>
        </div>

        {/* Three-Column 3D Spatial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 items-center">
          {/* Left Column: 3D Tilted Summary Panel & CTAs */}
          <div className="order-2 lg:order-1">
            <Tilt3DCard
              maxTilt={8}
              extrudeBottom={true}
              className="card-3d-surface rounded-[28px] border border-cyan-400/20 p-7 sm:p-8 flex flex-col justify-center gap-5"
            >
              <div
                style={{ transform: "translateZ(24px)" }}
                className="inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 font-mono text-[10px] uppercase tracking-wider text-cyan-300 font-semibold"
              >
                Executive Summary
              </div>

              <h3
                style={{ transform: "translateZ(30px)" }}
                className="text-2xl sm:text-3xl font-black tracking-tight text-white"
              >
                Hi, I&apos;m {PROFILE.name.split(" ")[0]}.
              </h3>

              <p
                style={{ transform: "translateZ(18px)" }}
                className="text-sm sm:text-base text-slate-200 leading-relaxed font-normal"
              >
                {PROFILE.summaryVerbatim}
              </p>

              <p
                style={{ transform: "translateZ(14px)" }}
                className="text-xs sm:text-sm text-slate-400 leading-relaxed border-l-2 border-cyan-400/50 pl-3.5"
              >
                From uncovering operational efficiencies at UpMeals and scaling
                enterprise analytics at Deloitte to deploying predictive machine
                learning models, I bridge data-driven insights with strategic
                business impact.
              </p>

              {/* 3D Keycap Action Buttons */}
              <div
                style={{ transform: "translateZ(32px)" }}
                className="flex flex-wrap items-center gap-3 pt-3"
              >
                <a
                  href={PROFILE.resumePath}
                  download="Murtaza_Vora_Resume.pdf"
                  className="px-5 py-2.5 text-xs font-bold rounded-full btn-3d-dark"
                >
                  Résumé (PDF) ↓
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 text-xs font-bold rounded-full btn-3d-light"
                >
                  LinkedIn ↗
                </a>
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 text-xs font-bold rounded-full btn-3d-light"
                >
                  GitHub ↗
                </a>
              </div>
            </Tilt3DCard>
          </div>

          {/* Centre Column: 3D Hanging Lanyard ID Card */}
          <div className="order-1 lg:order-2 flex justify-center">
            <LanyardCard />
          </div>

          {/* Right Column: 3D Quick Facts & Quote Panel */}
          <div className="order-3">
            <Tilt3DCard
              maxTilt={8}
              extrudeBottom={true}
              className="card-3d-surface rounded-[28px] border border-cyan-400/20 p-7 sm:p-8 flex flex-col justify-between gap-6"
            >
              <div style={{ transform: "translateZ(22px)" }} className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 font-bold block">
                    Quick Facts
                  </span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                </div>

                <div className="space-y-2.5 font-mono text-xs">
                  <div className="flex justify-between items-baseline gap-4 p-2.5 rounded-xl bg-[#070b19]/80 border border-cyan-400/15">
                    <span className="text-slate-400 shrink-0">Location</span>
                    <span className="font-bold text-white text-right">
                      {PROFILE.location}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline gap-4 p-2.5 rounded-xl bg-[#070b19]/80 border border-cyan-400/15">
                    <span className="text-slate-400 shrink-0">Current Role</span>
                    <span className="font-bold text-white text-right">
                      Data Analyst, UpMeals
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline gap-4 p-2.5 rounded-xl bg-[#070b19]/80 border border-cyan-400/15">
                    <span className="text-slate-400 shrink-0">Degree</span>
                    <span className="font-bold text-white text-right">
                      Master in Analytics, Northeastern
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline gap-4 p-2.5 rounded-xl bg-[#070b19]/80 border border-cyan-400/15">
                    <span className="text-slate-400 shrink-0">Internship</span>
                    <span className="font-bold text-white text-right">
                      Business Analyst at Skill Safari
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline gap-4 p-2.5 rounded-xl bg-[#070b19]/80 border border-cyan-400/15">
                    <span className="text-slate-400 shrink-0">Direct Email</span>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="font-bold text-cyan-400 text-right hover:underline"
                    >
                      {PROFILE.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* 3D Floating Quote Block */}
              <div
                style={{ transform: "translateZ(35px)" }}
                className="card-3d-surface-dark text-white p-6 rounded-2xl border border-violet-400/30 mt-2 shadow-xl"
              >
                <p className="font-serif italic text-base sm:text-lg text-white/95 leading-snug">
                  &ldquo;{PROFILE.quote}&rdquo;
                </p>
                <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-widest mt-3 block font-semibold">
                  — Murtaza Vora
                </span>
              </div>
            </Tilt3DCard>
          </div>
        </div>
      </div>
    </section>
  );
}
