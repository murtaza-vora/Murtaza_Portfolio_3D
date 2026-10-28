"use client";

import Tilt3DCard from "@/components/ui/Tilt3DCard";

export function IllustrativeUI({
  type,
}: {
  type: "dashboard" | "email-builder" | "sme-store" | "timeline";
}) {
  return (
    <Tilt3DCard
      maxTilt={12}
      scaleOnHover={1.03}
      glare={true}
      glareOpacity={0.22}
      perspective={1100}
      className="relative w-full h-full min-h-[320px] card-3d-surface-dark rounded-2xl p-5 sm:p-6 text-white font-mono text-xs flex flex-col justify-between preserve-3d border border-white/12"
    >
      {/* Top 3D Window Bar floating at Z=18px */}
      <div
        style={{ transform: "translateZ(18px)" }}
        className="flex items-center justify-between border-b border-white/10 pb-3"
      >
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <span className="text-[10px] text-indigo-300 uppercase tracking-widest bg-indigo-500/20 border border-indigo-400/30 px-2.5 py-0.5 rounded-md font-semibold">
          3D Spatial UI
        </span>
      </div>

      {/* Multi-Layer 3D Content Based on UI Type */}
      <div className="my-auto py-4 preserve-3d">
        {type === "dashboard" && (
          <div className="space-y-3.5 preserve-3d">
            <div
              style={{ transform: "translateZ(36px)" }}
              className="grid grid-cols-3 gap-2.5"
            >
              <div className="p-3 bg-neutral-800/90 rounded-xl border border-white/15 shadow-lg">
                <span className="text-[9px] text-neutral-400 block">
                  Vehicles Simulated
                </span>
                <span className="text-lg font-black text-white">100</span>
              </div>
              <div className="p-3 bg-neutral-800/90 rounded-xl border border-indigo-500/35 shadow-lg">
                <span className="text-[9px] text-indigo-300 block">
                  Detection Model
                </span>
                <span className="text-sm font-black text-white">
                  YOLO + CNN
                </span>
              </div>
              <div className="p-3 bg-neutral-800/90 rounded-xl border border-emerald-500/35 shadow-lg">
                <span className="text-[9px] text-emerald-300 block">
                  Signal Control
                </span>
                <span className="text-base font-black text-emerald-400">
                  D3QN
                </span>
              </div>
            </div>

            <div
              style={{ transform: "translateZ(24px)" }}
              className="p-3.5 bg-neutral-900/90 rounded-xl border border-white/12 space-y-2.5 shadow-xl"
            >
              <div className="flex justify-between text-[10px] text-neutral-400">
                <span>Traffic Simulation</span>
                <span className="text-indigo-400 font-bold">
                  SUMO Simulation
                </span>
              </div>
              <div className="w-full h-14 bg-neutral-950 rounded-xl border border-white/8 flex items-center justify-around px-4">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-ping" />
                <span className="text-[10px] text-neutral-200 font-semibold">
                  V2X Traffic Control Agent
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981]" />
              </div>
            </div>
          </div>
        )}

        {type === "email-builder" && (
          <div className="space-y-3 preserve-3d">
            <div
              style={{ transform: "translateZ(20px)" }}
              className="flex justify-between text-[11px] text-neutral-300 border-b border-white/10 pb-2"
            >
              <span>Financial Data &rarr; Stock Portfolio Model</span>
              <span className="text-emerald-400 font-bold">
                Analysis Complete
              </span>
            </div>
            <div className="space-y-2 font-mono text-[10px] preserve-3d">
              <div
                style={{ transform: "translateZ(28px)" }}
                className="p-2.5 bg-neutral-800/90 border border-white/10 rounded-xl flex items-center justify-between shadow-md"
              >
                <span className="text-indigo-300">
                  &lt;model&gt; Kmeans_Clusters
                </span>
                <span className="text-white font-bold">150+ S&amp;P stocks</span>
              </div>
              <div
                style={{ transform: "translateZ(36px)" }}
                className="p-2.5 bg-neutral-800/90 border border-white/10 rounded-xl flex items-center justify-between shadow-lg"
              >
                <span className="text-sky-300">
                  &lt;Model&gt; Efficient_Frontier
                </span>
                <span className="text-white font-bold">15% lower risk</span>
              </div>
              <div
                style={{ transform: "translateZ(46px)" }}
                className="p-2.5 bg-emerald-950/60 border border-emerald-500/35 rounded-xl flex items-center justify-between shadow-xl"
              >
                <span className="text-emerald-300">
                  &lt;results&gt; vs S&amp;P 500
                </span>
                <span className="text-emerald-400 font-bold">
                  3x return over 5yr period
                </span>
              </div>
            </div>
          </div>
        )}

        {type === "sme-store" && (
          <div className="space-y-3 preserve-3d">
            <div
              style={{ transform: "translateZ(30px)" }}
              className="p-4 bg-neutral-800/85 rounded-xl border border-white/15 shadow-xl preserve-3d"
            >
              <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] font-bold text-white">
                  Airport Terminal Monitor (YOLOv9)
                </span>
                <span className="text-[9px] bg-emerald-500/20 border border-emerald-400/40 px-2 py-0.5 rounded-full text-emerald-300 font-bold">
                  ● Live Feed
                </span>
              </div>
              <div
                style={{ transform: "translateZ(22px)" }}
                className="grid grid-cols-2 gap-2.5 mt-2"
              >
                <div className="p-3 bg-neutral-950 rounded-xl border border-rose-500/30 text-[10px] shadow-md">
                  <span className="text-neutral-400 block">
                    Unattended Objects
                  </span>
                  <span className="font-black text-rose-400 text-sm">
                    4 Flagged
                  </span>
                </div>
                <div className="p-3 bg-neutral-950 rounded-xl border border-indigo-500/30 text-[10px] shadow-md">
                  <span className="text-neutral-400 block">Total Footfall</span>
                  <span className="font-black text-indigo-300 text-sm">
                    150 in zone
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {type === "timeline" && (
          <div className="space-y-2.5 preserve-3d">
            <div
              style={{ transform: "translateZ(20px)" }}
              className="text-[11px] font-bold text-indigo-300 mb-2"
            >
              IFTA Audit Pipeline &middot; AWS Native ML
            </div>
            <div className="space-y-2 text-[10px] preserve-3d">
              <div
                style={{ transform: "translateZ(26px)" }}
                className="flex items-center gap-2.5 p-2.5 bg-neutral-800/85 border border-white/10 rounded-xl shadow-md"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span className="text-neutral-200">
                  Step 1: Fuel &amp; Distance Extraction (Textract)
                </span>
              </div>
              <div
                style={{ transform: "translateZ(36px)" }}
                className="flex items-center gap-2.5 p-2.5 bg-neutral-800/85 border border-white/10 rounded-xl shadow-lg"
              >
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span className="text-neutral-200">
                  Step 2: Audit Feature Engineering
                </span>
              </div>
              <div
                style={{ transform: "translateZ(46px)" }}
                className="flex items-center gap-2.5 p-2.5 bg-neutral-800/95 border border-emerald-500/30 rounded-xl shadow-xl"
              >
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-white font-semibold">
                  Step 3: Anomaly Detection &amp; SHAP Risk Ranking
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div
        style={{ transform: "translateZ(16px)" }}
        className="flex items-center justify-between text-[9px] text-neutral-400 pt-2 border-t border-white/10"
      >
        <span>Stack: Python / SQL / Power BI</span>
        <span className="text-emerald-400">Cloud &amp; AI Ready</span>
      </div>
    </Tilt3DCard>
  );
}
