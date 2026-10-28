"use client";

import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/lib/data";
import NeuralScene3D from "@/components/three/NeuralScene3D";
import Tilt3DCard from "@/components/ui/Tilt3DCard";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [audioBlocked, setAudioBlocked] = useState(true);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      setMouseOffset({ x: nx, y: ny });
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsMuted(false);
          setAudioBlocked(false);
        })
        .catch(() => {
          video.muted = true;
          setIsMuted(true);
          setAudioBlocked(true);
          video.play().catch(() => {});
        });
    }

    const unlockAudio = () => {
      if (video) {
        video.muted = false;
        setIsMuted(false);
        setAudioBlocked(false);
      }
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };

    window.addEventListener("pointerdown", unlockAudio);
    window.addEventListener("keydown", unlockAudio);
    window.addEventListener("touchstart", unlockAudio);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio < 0.35) {
            video.pause();
          } else {
            video.play().catch(() => {});
          }
        });
      },
      { threshold: [0, 0.35, 1.0] }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => {
      observer.disconnect();
      window.removeEventListener("pointerdown", unlockAudio);
      window.removeEventListener("keydown", unlockAudio);
      window.removeEventListener("touchstart", unlockAudio);
    };
  }, []);

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    if (isMuted) {
      video.muted = false;
      setIsMuted(false);
      setAudioBlocked(false);
      video.play().catch(() => {});
    } else {
      video.muted = true;
      setIsMuted(true);
    }
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-between pt-24 pb-14 overflow-hidden bg-[#070b19] spatial-grid-bg [perspective:1400px]"
    >
      {/* Ambient 3D Radial Cyan & Violet Nebula Lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(6, 182, 212, 0.16) 0%, rgba(139, 92, 246, 0.12) 38%, transparent 72%)",
        }}
      />

      {/* Interactive 3D Neural Polyhedron & Orbital Canvas */}
      <div className="absolute inset-0 z-0 opacity-90 pointer-events-none">
        <NeuralScene3D interactive={true} />
      </div>

      {/* Background Giant 3D Parallax Extruded Ghost Word */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 [transform-style:preserve-3d]">
        <span
          className="text-[17vw] font-black uppercase tracking-tighter text-transparent transition-transform duration-200 ease-out"
          style={{
            WebkitTextStroke: "2px rgba(56, 189, 248, 0.10)",
            textShadow: "0 20px 50px rgba(6, 182, 212, 0.08)",
            transform: `translate3d(${mouseOffset.x * -28}px, ${
              mouseOffset.y * -18 - 20
            }px, -80px) rotateX(${mouseOffset.y * 8}deg) rotateY(${
              mouseOffset.x * -10
            }deg)`,
          }}
        >
          {PROFILE.ghostWord}
        </span>
      </div>

      {/* Main Hero 3D Stage Content */}
      <div className="relative z-10 max-w-[1320px] mx-auto w-full px-4 sm:px-8 flex-1 flex flex-col items-center justify-center text-center">
        {/* Floating 3D Status Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full card-3d-surface border border-cyan-400/25 mb-6 shadow-lg hover:-translate-y-0.5 transition-transform">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400" />
          </span>
          <span className="font-mono text-[11px] font-semibold tracking-wide text-cyan-100 uppercase">
            Available for Data Analyst / Data Scientist / AI Engineer
          </span>
        </div>

        {/* 3D Interactive Holographic Video Stage */}
        <div className="relative w-full max-w-[820px] mx-auto my-2">
          <Tilt3DCard
            maxTilt={9}
            scaleOnHover={1.02}
            glare={true}
            glareOpacity={0.25}
            perspective={1400}
            className="rounded-[32px] p-3 sm:p-4 card-3d-surface border border-cyan-400/30 shadow-[0_30px_80px_-15px_rgba(0,0,0,0.85),0_0_40px_-8px_rgba(6,182,212,0.28),0_7px_0_0_#030612]"
          >
            {/* Top 3D Window Bezel Bar */}
            <div
              style={{ transform: "translateZ(20px)" }}
              className="flex items-center justify-between px-3 pb-2.5 mb-1.5 border-b border-cyan-400/15"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400/90" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90" />
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400/90" />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-300 font-semibold">
                SPATIAL HOLOGRAM STAGE &middot; INTERACTIVE 3D
              </span>
              <span className="font-mono text-[10px] text-cyan-400 font-bold">
                60 FPS
              </span>
            </div>

            {/* Inner Studio-Lit Viewport so the video blends seamlessly */}
            <div className="relative w-full aspect-[16/9] max-h-[62vh] rounded-2xl bg-[#fefefe] flex items-center justify-center overflow-hidden border-2 border-cyan-400/30 shadow-[0_0_30px_rgba(6,182,212,0.2)_inset]">
              <video
                ref={videoRef}
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-contain mix-blend-multiply"
                style={{ filter: "brightness(1.35) contrast(1.05)" }}
                poster="/hero/portrait-bust.webp"
              >
                <source src="/hero/hero.mp4" type="video/mp4" />
                <source src="/hero/hero.webm" type="video/webm" />
                Your browser does not support HTML5 video.
              </video>

              {/* Sound Control 3D Tactile Orb */}
              <div
                style={{ transform: "translateZ(45px)" }}
                className="absolute bottom-4 right-4 z-30"
              >
                <div className="relative flex items-center justify-center">
                  {audioBlocked && (
                    <span className="absolute w-12 h-12 rounded-full bg-cyan-400/40 animate-ping-pulse pointer-events-none" />
                  )}
                  <button
                    type="button"
                    onClick={toggleSound}
                    aria-label={
                      isMuted
                        ? "Unmute video introduction"
                        : "Mute video introduction"
                    }
                    className="w-[46px] h-[46px] rounded-full btn-3d-dark flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
                  >
                    {isMuted ? (
                      <svg
                        className="w-4 h-4 translate-x-0.5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Floating 3D Satellite Telemetry Badges around Stage */}
            <div
              style={{ transform: "translateZ(55px)" }}
              className="hidden md:flex items-center gap-2.5 absolute -left-8 top-12 px-3.5 py-2 rounded-2xl card-3d-surface border border-cyan-400/30 shadow-2xl animate-float-3d pointer-events-none"
            >
              <span className="w-7 h-7 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 text-slate-950 font-mono text-[10px] font-black flex items-center justify-center shadow-sm">
                1M+
              </span>
              <div className="text-left">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-cyan-300">
                  SQL &amp; Python
                </span>
                <span className="block text-xs font-bold text-white">
                  Records Analyzed
                </span>
              </div>
            </div>

            <div
              style={{ transform: "translateZ(65px)" }}
              className="hidden md:flex items-center gap-2.5 absolute -right-8 top-16 px-3.5 py-2 rounded-2xl card-3d-surface border border-violet-400/35 shadow-2xl animate-float-3d-delayed pointer-events-none"
            >
              <span className="w-7 h-7 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white font-mono text-[10px] font-black flex items-center justify-center shadow-sm">
                AI
              </span>
              <div className="text-left">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-violet-300">
                  Microsoft Certified
                </span>
                <span className="block text-xs font-bold text-white">
                  Azure Data Scientist
                </span>
              </div>
            </div>

            <div
              style={{ transform: "translateZ(50px)" }}
              className="hidden md:flex items-center gap-2.5 absolute -left-6 bottom-8 px-3.5 py-2 rounded-2xl card-3d-surface border border-cyan-400/30 shadow-2xl animate-float-3d-delayed pointer-events-none"
            >
              <span className="w-7 h-7 rounded-xl bg-cyan-400/20 border border-cyan-400/50 text-cyan-300 font-mono text-[10px] font-black flex items-center justify-center shadow-sm">
                3+
              </span>
              <div className="text-left">
                <span className="block font-mono text-[9px] uppercase tracking-wider text-slate-400">
                  Experience
                </span>
                <span className="block text-xs font-bold text-white">
                  Data &amp; AI Impact
                </span>
              </div>
            </div>
          </Tilt3DCard>
        </div>

        {/* 3D Extruded Headline from Résumé */}
        <div className="max-w-3xl mx-auto mt-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tighter text-white leading-[1.1] text-3d-extrude">
            {PROFILE.name}
          </h1>
          <p className="mt-3 text-base sm:text-xl text-cyan-300 font-semibold tracking-tight">
            Data Analyst &middot; Data Scientist &middot; AI Engineer
          </p>
          <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed font-medium">
            Northeastern MSc Analytics Graduate &middot; Microsoft Certified
            Azure Data Scientist &middot; Based in {PROFILE.location}
          </p>
        </div>

        {/* 3D Tactile Keycap CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <a
            href="#work"
            className="px-7 py-3.5 text-xs font-bold uppercase tracking-wider rounded-full btn-3d-dark"
          >
            Explore work
          </a>
          <a
            href="#contact"
            className="px-7 py-3.5 text-xs font-bold uppercase tracking-wider rounded-full btn-3d-light"
          >
            Connect
          </a>
          <a
            href={PROFILE.resumePath}
            download="Murtaza_Vora_Resume.pdf"
            className="px-7 py-3.5 text-xs font-bold uppercase tracking-wider rounded-full btn-3d-light"
          >
            Résumé ↓
          </a>
        </div>
      </div>
    </section>
  );
}
