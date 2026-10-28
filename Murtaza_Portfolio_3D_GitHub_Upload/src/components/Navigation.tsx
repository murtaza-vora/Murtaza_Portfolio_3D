"use client";

import { useState, useEffect } from "react";
import { NAV, PROFILE } from "@/lib/data";
import { useScrollProgress } from "@/lib/hooks";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const scrollProgress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const initials = PROFILE.name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("");

  return (
    <>
      {/* 3px 3D Electric Cyan & Violet scroll progress beam along the very top */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-cyan-400 via-indigo-500 to-violet-500 z-50 transition-all duration-75 shadow-[0_2px_14px_rgba(34,211,238,0.75)]"
        style={{ width: `${scrollProgress * 100}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <header className="fixed top-0 left-0 right-0 z-40 px-4 md:px-8 py-4 transition-all duration-300 [perspective:1000px]">
        <div className="max-w-[1320px] mx-auto flex items-center justify-between">
          {/* Left: 3D Extruded Initials Badge & Name */}
          <a
            href="#"
            className="group flex items-center gap-3 no-underline focus:outline-none [transform-style:preserve-3d]"
            aria-label="Back to top"
          >
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center font-mono text-xs font-bold tracking-wider transition-all duration-500 group-hover:[transform:rotateY(180deg)_translateZ(10px)] ${
                scrolled ? "btn-3d-dark text-white" : "btn-3d-light text-cyan-300"
              }`}
            >
              {initials}
            </div>
            <div
              className={`flex flex-col transition-all duration-300 hidden sm:flex ${
                scrolled
                  ? "opacity-0 -translate-x-2 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              <span className="text-sm font-bold tracking-tight text-white leading-none">
                {PROFILE.name}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-400 font-semibold mt-0.5">
                3D Hologram Edition
              </span>
            </div>
          </a>

          {/* Centre: 3D Floating Midnight Spatial Dock */}
          <nav
            aria-label="Main Navigation"
            className={`hidden md:flex items-center gap-1 rounded-full px-3 py-1.5 transition-all duration-300 ${
              scrolled
                ? "bg-[#0c1328]/90 backdrop-blur-xl border border-cyan-400/25 shadow-[0_14px_36px_-4px_rgba(0,0,0,0.7),0_1px_0_0_rgba(56,189,248,0.3)_inset]"
                : "bg-[#0c1328]/65 backdrop-blur-md border border-cyan-400/15 shadow-[0_8px_24px_rgba(0,0,0,0.45),0_1px_0_0_rgba(56,189,248,0.2)_inset]"
            }`}
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-cyan-300 rounded-full hover:bg-cyan-400/10 hover:-translate-y-0.5 transition-all"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Right: 3D Tactile Resume button & Mobile Menu trigger */}
          <div className="flex items-center gap-2.5">
            <a
              href={PROFILE.resumePath}
              download="Murtaza_Vora_Resume.pdf"
              className="inline-flex items-center justify-center px-4 py-2 text-xs font-bold rounded-full btn-3d-dark"
            >
              Resume ↓
            </a>

            {/* Mobile Menu Pill */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              className="md:hidden px-3.5 py-2 text-xs font-semibold rounded-full btn-3d-light"
            >
              Menu
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen 3D Spatial Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-[#070b19] spatial-grid-bg flex flex-col justify-between p-8 md:hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto [clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]"
            : "opacity-0 pointer-events-none [clip-path:polygon(0_0,100%_0,100%_0,0_0)]"
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">
            Spatial Navigation
          </span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close Navigation Menu"
            className="w-10 h-10 rounded-full btn-3d-light flex items-center justify-center text-sm font-bold"
          >
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-4 my-auto">
          {NAV.map((item, idx) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-baseline gap-4 p-3.5 rounded-2xl card-3d-surface border border-cyan-400/20 text-2xl font-bold tracking-tight text-white hover:translate-x-2 transition-transform"
            >
              <span className="font-mono text-xs font-semibold text-cyan-400">
                0{idx + 1}
              </span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-2 pt-6 border-t border-cyan-400/15">
          <a
            href={PROFILE.resumePath}
            download="Murtaza_Vora_Resume.pdf"
            className="w-full text-center py-3.5 text-sm font-bold rounded-full btn-3d-dark"
          >
            Download Résumé (PDF)
          </a>
          <p className="font-mono text-[10px] text-center text-slate-400 mt-2">
            Press ESC or tap ✕ to close
          </p>
        </div>
      </div>
    </>
  );
}
