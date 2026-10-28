"use client";

import { useState } from "react";
import { PROFILE } from "@/lib/data";
import Tilt3DCard from "@/components/ui/Tilt3DCard";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const line1 = "Let's build";
  const line2 = "something together.";

  return (
    <section
      id="contact"
      className="py-24 bg-[#070b19] spatial-grid-bg border-t border-cyan-400/15 [perspective:1400px]"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          {/* Main Headline with 3D Extruded Hopping Letters */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-slate-300 uppercase tracking-widest mb-4 px-3 py-1 rounded-full card-3d-surface border border-cyan-400/20">
              <span className="font-bold text-cyan-400">07</span>
              <span>&mdash;</span>
              <span>Get in touch</span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter text-white leading-[1.05] text-3d-extrude [perspective:800px]">
              {/* Line 1 */}
              <div className="flex flex-wrap">
                {line1.split("").map((char, i) => (
                  <span
                    key={i}
                    className="inline-block transition-transform duration-200 hover:-translate-y-3 hover:[transform:translateZ(35px)_rotateX(12deg)] hover:text-cyan-400 cursor-default"
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </div>
              {/* Line 2 */}
              <div className="flex flex-wrap">
                {line2.split("").map((char, i) => (
                  <span
                    key={i}
                    className={`inline-block transition-transform duration-200 hover:-translate-y-3 hover:[transform:translateZ(35px)_rotateX(12deg)] hover:text-cyan-400 cursor-default ${
                      i >= 10
                        ? "font-serif italic font-normal text-cyan-300"
                        : ""
                    }`}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </div>
            </h2>

            {/* 3D Interactive Contact Card */}
            <div className="mt-10">
              <Tilt3DCard
                maxTilt={8}
                extrudeBottom={true}
                className="card-3d-surface rounded-3xl border border-cyan-400/25 p-6 sm:p-8 flex flex-col gap-6"
              >
                <div
                  style={{ transform: "translateZ(26px)" }}
                  className="flex flex-wrap items-center justify-between gap-4"
                >
                  <div>
                    <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-400 font-bold block mb-1">
                      Direct Channel
                    </span>
                    <a
                      href={`mailto:${PROFILE.email}`}
                      className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white hover:text-cyan-300 transition-colors break-all"
                    >
                      {PROFILE.email}
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={copyEmail}
                    aria-live="polite"
                    className="px-5 py-2.5 rounded-full text-xs font-mono font-bold btn-3d-dark"
                  >
                    {copied ? "Copied ✓" : "Copy email"}
                  </button>
                </div>

                {/* 3D Social & Resume Keycaps */}
                <div
                  style={{ transform: "translateZ(20px)" }}
                  className="flex flex-wrap items-center gap-3 pt-4 border-t border-cyan-400/15 font-mono text-xs"
                >
                  <a
                    href={PROFILE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full btn-3d-light font-bold"
                  >
                    LinkedIn Profile ↗
                  </a>
                  <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full btn-3d-light font-bold"
                  >
                    GitHub ↗
                  </a>
                  <a
                    href={PROFILE.phoneUrl}
                    className="px-4 py-2 rounded-full btn-3d-light font-bold"
                  >
                    {PROFILE.phone}
                  </a>
                </div>
              </Tilt3DCard>
            </div>
          </div>

          {/* 3D Gyroscopic Orbital "Say Hello" Badge */}
          <div className="relative flex items-center justify-center shrink-0 self-center lg:mr-8 [perspective:900px]">
            <div className="relative w-44 h-44 rounded-full card-3d-surface border border-cyan-400/30 shadow-[0_24px_60px_rgba(0,0,0,0.8),0_0_35px_rgba(6,182,212,0.22),0_6px_0_0_#030612] flex items-center justify-center preserve-3d">
              {/* 3D Orbiting Gyro Rings */}
              <div className="pointer-events-none absolute w-36 h-36 rounded-full border border-cyan-400/40 animate-orbit-3d" />
              <div className="pointer-events-none absolute w-36 h-36 rounded-full border border-violet-400/40 animate-orbit-3d-reverse" />

              <div className="relative w-36 h-36 flex items-center justify-center animate-spin-slow">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <path
                    id="circlePath"
                    d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                    fill="none"
                  />
                  <text className="text-[9.5px] font-mono font-bold uppercase tracking-[0.22em] fill-cyan-300">
                    <textPath href="#circlePath" startOffset="0%">
                      • SAY HELLO • GET IN TOUCH •
                    </textPath>
                  </text>
                </svg>
              </div>
              {/* Center 3D Sphere */}
              <div className="absolute w-5 h-5 rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-violet-500 shadow-[0_0_16px_#22d3ee]" />
            </div>
          </div>
        </div>

        {/* Footer Row */}
        <div className="mt-24 pt-8 border-t border-cyan-400/15 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a
              href="#hero"
              className="px-3.5 py-1.5 rounded-full btn-3d-light font-bold text-cyan-300"
            >
              Back to top ↑
            </a>
            <span>·</span>
            <span>Built with Next.js 15 &amp; 3D Hologram CSS/Canvas</span>
          </div>
        </div>
      </div>
    </section>
  );
}
