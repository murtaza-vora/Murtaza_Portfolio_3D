"use client";

import { useState } from "react";
import { CERTIFICATIONS, CertificationItem } from "@/lib/data";
import Tilt3DCard from "@/components/ui/Tilt3DCard";

export default function Certifications() {
  const [activeCert, setActiveCert] = useState<CertificationItem>(
    CERTIFICATIONS[0]
  );

  return (
    <section
      id="certifications"
      className="py-24 border-t border-cyan-400/15 bg-[#070b19] spatial-grid-bg [perspective:1400px]"
    >
      <div className="max-w-[1320px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sticky Left Heading + 3D Holographic Certificate Preview Plaque */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs text-slate-300 uppercase tracking-widest mb-2 px-3 py-1 rounded-full card-3d-surface border border-cyan-400/20">
                <span className="font-bold text-cyan-400">04</span>
                <span>&mdash;</span>
                <span>Credentials</span>
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tighter text-white text-3d-extrude mt-2">
                Always{" "}
                <span className="font-serif italic font-normal text-cyan-300">
                  learning.
                </span>
              </h2>
              <p className="font-mono text-xs text-slate-400 mt-3">
                {CERTIFICATIONS.length} Certified Milestones &middot; Industry
                &amp; Academic Honors
              </p>
            </div>

            {/* Interactive 3D Credential Plaque */}
            <Tilt3DCard
              maxTilt={12}
              extrudeBottom={true}
              className="card-3d-surface-dark text-white rounded-3xl border border-cyan-400/35 p-7 flex flex-col justify-between min-h-[250px] relative overflow-hidden"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -top-10 w-44 h-44 rounded-full bg-cyan-500/20 blur-2xl"
              />

              <div
                style={{ transform: "translateZ(22px)" }}
                className="flex items-center justify-between border-b border-cyan-400/15 pb-3"
              >
                <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-300 font-bold">
                  3D Verified Credential #{activeCert.index}
                </span>
                {activeCert.badge && (
                  <span className="font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-violet-500/25 border border-violet-400/40 text-violet-200">
                    {activeCert.badge}
                  </span>
                )}
              </div>

              <div style={{ transform: "translateZ(36px)" }} className="my-5">
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-snug">
                  {activeCert.title}
                </h3>
                <p className="font-mono text-xs text-slate-300 mt-2">
                  Issued by{" "}
                  <strong className="text-cyan-300">{activeCert.issuer}</strong>
                </p>
              </div>

              <div
                style={{ transform: "translateZ(26px)" }}
                className="flex items-center justify-between pt-3 border-t border-cyan-400/15 font-mono text-[11px]"
              >
                <span className="text-slate-400">{activeCert.year}</span>
                <span className="inline-flex items-center gap-1.5 text-cyan-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
                  Authentic Record
                </span>
              </div>
            </Tilt3DCard>
          </div>

          {/* Right: 3D Numbered Lock-Flood Vault List */}
          <div className="lg:col-span-7 card-3d-surface rounded-3xl border border-cyan-400/25 shadow-[0_8px_0_0_#030612,0_24px_55px_rgba(0,0,0,0.75)] divide-y divide-cyan-400/15 overflow-hidden">
            {CERTIFICATIONS.map((cert) => {
              const isSelected = activeCert.id === cert.id;
              return (
                <div
                  key={cert.id}
                  tabIndex={0}
                  onMouseEnter={() => setActiveCert(cert)}
                  onFocus={() => setActiveCert(cert)}
                  onClick={() => setActiveCert(cert)}
                  className={`flood-row group p-6 sm:p-7 flex items-center justify-between cursor-pointer focus:outline-none ${
                    isSelected ? "bg-cyan-400/10" : ""
                  }`}
                >
                  {/* Left: Index & Title */}
                  <div className="relative z-10 flex items-start sm:items-center gap-5">
                    <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-cyan-400/15 border border-cyan-400/25 text-cyan-300 group-hover:bg-cyan-400 group-hover:text-slate-950 transition-colors">
                      {cert.index}
                    </span>
                    <div>
                      <h3 className="text-base sm:text-lg font-bold tracking-tight text-white group-hover:text-cyan-200 transition-colors">
                        {cert.title}
                      </h3>
                      <p className="flood-subtext text-xs text-slate-400 mt-1 transition-colors font-medium">
                        {cert.issuer} &middot; {cert.year}
                      </p>
                    </div>
                  </div>

                  {/* Right: 3D Badge & Sliding Arrow */}
                  <div className="relative z-10 flex items-center gap-4 shrink-0">
                    {cert.badge && (
                      <span className="hidden sm:inline-block font-mono text-[10px] font-bold px-3 py-1 rounded-full border border-cyan-400/30 bg-[#070b19] shadow-xs group-hover:border-cyan-300 group-hover:bg-cyan-400/20 group-hover:text-white text-cyan-200 transition-colors">
                        {cert.badge}
                      </span>
                    )}
                    <span className="flood-arrow font-mono text-base text-slate-400 group-hover:text-cyan-300 transition-transform duration-300">
                      &rarr;
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
