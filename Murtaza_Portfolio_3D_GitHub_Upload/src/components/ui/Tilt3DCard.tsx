"use client";

import React, { useRef, useState, useEffect } from "react";

interface Tilt3DCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scaleOnHover?: number;
  glare?: boolean;
  glareOpacity?: number;
  perspective?: number;
  extrudeBottom?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

export default function Tilt3DCard({
  children,
  className = "",
  maxTilt = 10,
  scaleOnHover = 1.015,
  glare = true,
  glareOpacity = 0.24,
  perspective = 1200,
  extrudeBottom = false,
  onClick,
  style,
}: Tilt3DCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50, hovered: false });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let targetRx = 0;
    let targetRy = 0;
    let currRx = 0;
    let currRy = 0;
    let gx = 50;
    let gy = 50;
    let isHovered = false;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const nx = (x / rect.width) * 2 - 1;
      const ny = (y / rect.height) * 2 - 1;

      targetRx = -ny * maxTilt;
      targetRy = nx * maxTilt;
      gx = (x / rect.width) * 100;
      gy = (y / rect.height) * 100;
      isHovered = true;
    };

    const handleMouseLeave = () => {
      targetRx = 0;
      targetRy = 0;
      isHovered = false;
    };

    const animate = () => {
      currRx += (targetRx - currRx) * 0.1;
      currRy += (targetRy - currRy) * 0.1;

      if (
        Math.abs(currRx - targetRx) > 0.01 ||
        Math.abs(currRy - targetRy) > 0.01 ||
        isHovered
      ) {
        setTilt({
          rx: currRx,
          ry: currRy,
          gx,
          gy,
          hovered: isHovered,
        });
      }
      rafId = requestAnimationFrame(animate);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    rafId = requestAnimationFrame(animate);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [maxTilt]);

  return (
    <div
      ref={ref}
      onClick={onClick}
      style={{
        perspective: `${perspective}px`,
        ...style,
      }}
      className="relative"
    >
      <div
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale3d(${
            tilt.hovered ? scaleOnHover : 1
          }, ${tilt.hovered ? scaleOnHover : 1}, 1)`,
          transformStyle: "preserve-3d",
        }}
        className={`relative transition-shadow duration-300 ${
          extrudeBottom
            ? "shadow-[0_7px_0_0_#030612,0_24px_55px_-10px_rgba(0,0,0,0.75),0_0_32px_-8px_rgba(6,182,212,0.22)]"
            : ""
        } ${className}`}
      >
        {children}

        {/* Dynamic Electric Cyan & Violet 3D Holographic Glare Overlay */}
        {glare && (
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden transition-opacity duration-300 z-30"
            style={{
              opacity: tilt.hovered ? 1 : 0,
              background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, rgba(34,211,238,${glareOpacity}) 0%, rgba(168,85,247,0.14) 38%, transparent 72%)`,
            }}
          />
        )}
      </div>
    </div>
  );
}
