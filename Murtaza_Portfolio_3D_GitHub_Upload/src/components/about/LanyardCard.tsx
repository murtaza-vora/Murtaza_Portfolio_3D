"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { PROFILE } from "@/lib/data";

export default function LanyardCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [rotate, setRotate] = useState({ x: 0, y: 0, gx: 50, gy: 50 });
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let gx = 50;
    let gy = 50;
    let animFrame: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = (e.clientX - centerX) / (rect.width / 2);
      const dy = (e.clientY - centerY) / (rect.height / 2);
      targetX = -dy * 15;
      targetY = dx * 18;
      gx = ((e.clientX - rect.left) / rect.width) * 100;
      gy = ((e.clientY - rect.top) / rect.height) * 100;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
      gx = 50;
      gy = 50;
    };

    const updatePhysics = () => {
      currentX += (targetX - currentX) * 0.09;
      currentY += (targetY - currentY) * 0.09;
      setRotate({ x: currentX, y: currentY, gx, gy });
      animFrame = requestAnimationFrame(updatePhysics);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    animFrame = requestAnimationFrame(updatePhysics);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animFrame);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-start w-full max-w-[380px] mx-auto py-4 select-none [perspective:1400px]"
    >
      {/* 3D Lanyard Top Attachment & Woven Strap */}
      <div
        className="flex flex-col items-center z-20 transition-transform duration-200"
        style={{
          transform: `rotateZ(${rotate.y * -0.18}deg)`,
          transformOrigin: "top center",
        }}
      >
        <div className="w-12 h-3 bg-slate-800 border-t border-cyan-400/30 rounded-t-sm shadow-md" />
        <div className="relative w-7 h-20 bg-slate-950 border-x border-cyan-400/30 overflow-hidden flex flex-col items-center justify-center shadow-lg">
          <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,#070b19,#070b19_2px,#1e293b_2px,#1e293b_4px)]" />
          <span className="relative text-[7px] font-mono uppercase tracking-widest text-cyan-300 rotate-90 whitespace-nowrap">
            {PROFILE.preferredName}
          </span>
        </div>
        <div className="w-5 h-7 border-2 border-cyan-300/60 rounded-full -mt-2 bg-gradient-to-b from-slate-200 via-slate-400 to-slate-700 shadow-md" />
        <div className="w-8 h-2.5 bg-slate-800 rounded-sm -mt-1 shadow-md" />
      </div>

      {/* Interactive 3D Flippable Card with Multi-Depth Layers */}
      <div
        ref={cardRef}
        onClick={() => setIsFlipped(!isFlipped)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsFlipped(!isFlipped);
          }
        }}
        tabIndex={0}
        role="button"
        aria-label="Developer ID card. Click or press Enter to flip."
        className="relative w-full aspect-[1/1.32] min-h-[465px] cursor-pointer mt-1 rounded-[28px] preserve-3d transition-transform duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] focus:outline-none focus:ring-2 focus:ring-cyan-400"
        style={{
          transform: `rotateX(${rotate.x}deg) rotateY(${
            rotate.y + (isFlipped ? 180 : 0)
          }deg)`,
        }}
      >
        {/* FRONT OF ID CARD */}
        <div className="absolute inset-0 w-full h-full card-3d-surface rounded-[28px] border border-cyan-400/30 shadow-[0_30px_65px_-12px_rgba(0,0,0,0.85),0_0_35px_-8px_rgba(6,182,212,0.28),0_6px_0_0_#030612] p-6 flex flex-col justify-between backface-hidden preserve-3d">
          {/* Dynamic Holographic Glare Overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[28px] overflow-hidden z-10"
            style={{
              background: `radial-gradient(circle at ${rotate.gx}% ${rotate.gy}%, rgba(34,211,238,0.22) 0%, rgba(168,85,247,0.14) 38%, transparent 70%)`,
            }}
          />

          {/* Top Hanging Slot Punch */}
          <div className="w-12 h-2.5 mx-auto bg-[#070b19] rounded-full border border-cyan-400/25 -mt-2 mb-2 shadow-inner" />

          {/* Top Header Band floating at Z=22px */}
          <div
            style={{ transform: "translateZ(22px)" }}
            className="bg-gradient-to-r from-cyan-500/20 via-indigo-500/25 to-violet-500/25 border border-cyan-400/35 text-white px-4 py-2.5 rounded-xl flex items-center justify-between shadow-lg"
          >
            <span className="font-mono text-[10px] tracking-widest uppercase font-bold text-cyan-300">
              DEVELOPER ID &middot; 3D
            </span>
            <span className="font-mono text-[9px] text-violet-300 font-semibold">
              CEE &middot; 2026
            </span>
          </div>

          {/* Portrait & Details Row floating at Z=32px */}
          <div
            style={{ transform: "translateZ(32px)" }}
            className="flex gap-4 items-center mt-3"
          >
            {/* 3D Extruded Portrait Frame */}
            <div className="relative w-[116px] h-[142px] rounded-xl overflow-hidden border-2 border-cyan-400/40 bg-slate-900 shadow-[0_14px_28px_rgba(0,0,0,0.6)] shrink-0 group">
              <Image
                src="/hero/MKVavtar.jpg"
                alt={PROFILE.name}
                fill
                sizes="128px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
            </div>

            <div className="flex flex-col gap-1 min-w-0">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                Full Name
              </span>
              <p className="text-sm font-black text-white tracking-tight leading-tight truncate">
                {PROFILE.name}
              </p>
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-1">
                Position
              </span>
              <p className="text-xs font-semibold text-cyan-200 leading-tight">
                Data Scientist &amp; AI Engineer
              </p>
              <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-md bg-cyan-400/15 border border-cyan-400/35 font-mono text-[9px] text-cyan-300 font-semibold w-fit">
                Azure DP-100
              </span>
            </div>
          </div>

          {/* Metadata Rows at Z=18px */}
          <div
            style={{ transform: "translateZ(18px)" }}
            className="grid grid-cols-2 gap-2 py-2.5 px-3 rounded-xl bg-[#070b19]/85 border border-cyan-400/20 text-[10px] font-mono mt-2 shadow-inner"
          >
            <div>
              <span className="text-slate-400 uppercase text-[9px] block">
                ID Number
              </span>
              <span className="font-bold text-white">
                {PROFILE.idDetails.idNumber}
              </span>
            </div>
            <div>
              <span className="text-slate-400 uppercase text-[9px] block">
                Valid Thru
              </span>
              <span className="font-bold text-cyan-300">
                {PROFILE.idDetails.validTill}
              </span>
            </div>
          </div>

          {/* Barcode & Hologram Bottom Bar at Z=26px */}
          <div
            style={{ transform: "translateZ(26px)" }}
            className="flex items-center justify-between pt-2"
          >
            {/* 3D Iridescent Holographic Sticker */}
            <div className="w-14 h-11 rounded-lg holo-foil border border-cyan-300/40 p-1 flex items-center justify-center shadow-md">
              <span className="text-[7px] font-mono text-white font-bold uppercase tracking-tighter text-center leading-tight">
                OFFICIAL
                <br />
                3D VERIFIED
              </span>
            </div>

            {/* CSS Simulated Barcode */}
            <div className="flex flex-col items-end">
              <div className="flex gap-[2px] h-7 items-end">
                <div className="w-[2px] h-full bg-cyan-300" />
                <div className="w-[1px] h-full bg-cyan-300" />
                <div className="w-[3px] h-full bg-cyan-300" />
                <div className="w-[1px] h-full bg-cyan-300" />
                <div className="w-[2px] h-full bg-cyan-300" />
                <div className="w-[4px] h-full bg-cyan-300" />
                <div className="w-[1px] h-full bg-cyan-300" />
                <div className="w-[2px] h-full bg-cyan-300" />
                <div className="w-[3px] h-full bg-cyan-300" />
                <div className="w-[1px] h-full bg-cyan-300" />
                <div className="w-[2px] h-full bg-cyan-300" />
                <div className="w-[4px] h-full bg-cyan-300" />
              </div>
              <span className="font-mono text-[8px] text-slate-400 tracking-widest mt-0.5">
                9477-1015-137
              </span>
            </div>
          </div>

          <p
            style={{ transform: "translateZ(15px)" }}
            className="text-[9px] font-mono text-center text-cyan-400 font-semibold mt-1"
          >
            Tap or press Enter to flip 3D badge &rarr;
          </p>
        </div>

        {/* BACK OF ID CARD */}
        <div className="absolute inset-0 w-full h-full card-3d-surface rounded-[28px] border border-violet-400/30 shadow-[0_30px_65px_-12px_rgba(0,0,0,0.85),0_0_35px_-8px_rgba(168,85,247,0.28),0_6px_0_0_#030612] p-6 flex flex-col justify-between backface-hidden rotate-y-180 preserve-3d">
          {/* Top Punch Slot */}
          <div className="w-12 h-2.5 mx-auto bg-[#070b19] rounded-full border border-violet-400/25 -mt-2 mb-2 shadow-inner" />

          {/* Top Magnetic Stripe */}
          <div
            style={{ transform: "translateZ(16px)" }}
            className="w-full h-9 bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 border border-cyan-400/20 rounded-lg shadow-md -mt-1"
          />

          {/* "What I am" section at Z=28px */}
          <div
            style={{ transform: "translateZ(28px)" }}
            className="flex flex-col gap-2.5 my-auto bg-[#070b19]/85 p-4 rounded-2xl border border-cyan-400/20 shadow-xs"
          >
            <span className="font-mono text-[10px] uppercase font-bold text-cyan-400 tracking-widest">
              What I Am &middot; Profile Credentials
            </span>
            <ul className="text-xs text-slate-200 space-y-2 list-disc pl-4 font-normal leading-relaxed">
              <li>
                <strong className="text-white">Data Scientist</strong> &amp; AI
                Developer
              </li>
              <li>
                <strong className="text-white">Master&apos;s</strong> in
                Analytics (Northeastern University)
              </li>
              <li>
                <strong className="text-white">Bachelor of Technology</strong>{" "}
                — in Information &amp; Technology (Parul University)
              </li>
            </ul>
          </div>

          {/* Signature & Contact Notice at Z=22px */}
          <div
            style={{ transform: "translateZ(22px)" }}
            className="border-t border-cyan-400/15 pt-3"
          >
            <div className="flex justify-between items-baseline mb-2">
              <span className="text-[9px] font-mono text-slate-400 uppercase">
                Authorized Signature
              </span>
              <span className="font-serif italic text-sm text-cyan-300 font-medium">
                {PROFILE.idDetails.signature}
              </span>
            </div>
            <div className="bg-[#050814] border border-cyan-400/25 text-white rounded-xl p-3 shadow-md">
              <p className="text-[10px] text-slate-300 font-mono leading-tight">
                If found, say hello:{" "}
                <a
                  href={`mailto:${PROFILE.email}`}
                  className="font-bold underline text-cyan-400 hover:text-cyan-300"
                >
                  {PROFILE.email}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
