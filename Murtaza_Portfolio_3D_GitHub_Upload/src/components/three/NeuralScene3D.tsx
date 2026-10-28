"use client";

import React, { useEffect, useRef } from "react";

interface Point3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  size: number;
  label?: string;
  color: string;
}

export default function NeuralScene3D({
  className = "",
  interactive = true,
}: {
  className?: string;
  interactive?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.offsetWidth * window.devicePixelRatio);
    let height = (canvas.height = canvas.offsetHeight * window.devicePixelRatio);
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    window.addEventListener("resize", handleResize);

    // Build 3D Icosahedron + Orbital Data Nodes
    const phi = (1 + Math.sqrt(5)) / 2;
    const rawVertices = [
      [-1, phi, 0],
      [1, phi, 0],
      [-1, -phi, 0],
      [1, -phi, 0],
      [0, -1, phi],
      [0, 1, phi],
      [0, -1, -phi],
      [0, 1, -phi],
      [phi, 0, -1],
      [phi, 0, 1],
      [-phi, 0, -1],
      [-phi, 0, 1],
    ];

    const labels = [
      "Py",
      "SQL",
      "ML",
      "AI",
      "AWS",
      "Azure",
      "BI",
      "D3QN",
      "YOLO",
      "ETL",
      "DAX",
      "LLM",
    ];

    const colors = [
      "#22d3ee",
      "#a855f7",
      "#38bdf8",
      "#818cf8",
      "#c084fc",
      "#2dd4bf",
    ];

    const radius = 185;
    const points: Point3D[] = rawVertices.map((v, i) => {
      const mag = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
      const x = (v[0] / mag) * radius;
      const y = (v[1] / mag) * radius;
      const z = (v[2] / mag) * radius;
      return {
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        size: 5.5,
        label: labels[i % labels.length],
        color: colors[i % colors.length],
      };
    });

    // Add outer orbital ring particles in 3D space
    for (let i = 0; i < 40; i++) {
      const angle = (i / 40) * Math.PI * 2;
      const ringRadius = 270 + (i % 3) * 40;
      const x = Math.cos(angle) * ringRadius;
      const z = Math.sin(angle) * ringRadius;
      const y = Math.sin(angle * 3) * 70;
      points.push({
        x,
        y,
        z,
        baseX: x,
        baseY: y,
        baseZ: z,
        size: i % 4 === 0 ? 3.5 : 2,
        color: colors[i % colors.length],
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0.25;
    let targetRotY = 0.4;
    let rotX = 0.25;
    let rotY = 0.4;
    let time = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      mouseX = nx;
      mouseY = ny;
      targetRotY = nx * 0.85;
      targetRotX = ny * 0.55;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const focalLength = 520;

    const render = () => {
      time += 0.006;
      const cssW = canvas.offsetWidth;
      const cssH = canvas.offsetHeight;
      ctx.clearRect(0, 0, cssW, cssH);

      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY + time - rotY) * 0.05;

      const autoY = time + rotY * 0.8;
      const autoX = rotX + Math.sin(time * 0.7) * 0.15;

      const cosY = Math.cos(autoY);
      const sinY = Math.sin(autoY);
      const cosX = Math.cos(autoX);
      const sinX = Math.sin(autoX);

      const cx = cssW / 2 + mouseX * 20;
      const cy = cssH / 2 + mouseY * 14;

      const projected = points.map((p, idx) => {
        const x1 = p.baseX * cosY - p.baseZ * sinY;
        const z1 = p.baseZ * cosY + p.baseX * sinY;
        const y2 = p.baseY * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.baseY * sinX;

        const scale = focalLength / (focalLength + z2 + 120);
        return {
          idx,
          x: cx + x1 * scale,
          y: cy + y2 * scale,
          z: z2,
          scale,
          size: p.size * scale,
          label: p.label,
          color: p.color,
          isCore: idx < 12,
        };
      });

      // Draw glowing cyan/violet 3D wireframe connections between core icosahedron vertices
      for (let i = 0; i < 12; i++) {
        for (let j = i + 1; j < 12; j++) {
          const p1 = points[i];
          const p2 = points[j];
          const dx = p1.baseX - p2.baseX;
          const dy = p1.baseY - p2.baseY;
          const dz = p1.baseZ - p2.baseZ;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist < radius * 1.15) {
            const proj1 = projected[i];
            const proj2 = projected[j];
            const avgZ = (proj1.z + proj2.z) / 2;
            const alpha = Math.max(0.06, Math.min(0.42, (230 - avgZ) / 420));

            ctx.beginPath();
            ctx.moveTo(proj1.x, proj1.y);
            ctx.lineTo(proj2.x, proj2.y);
            ctx.strokeStyle =
              (i + j) % 2 === 0
                ? `rgba(34, 211, 238, ${alpha})`
                : `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = 1.3 * ((proj1.scale + proj2.scale) / 2);
            ctx.stroke();
          }
        }
      }

      projected.sort((a, b) => b.z - a.z);

      for (const pt of projected) {
        const depthAlpha = Math.max(0.2, Math.min(0.98, (260 - pt.z) / 440));

        // Soft 3D neon halo for core vertices
        if (pt.isCore) {
          const grad = ctx.createRadialGradient(
            pt.x,
            pt.y,
            0,
            pt.x,
            pt.y,
            pt.size * 4.2
          );
          grad.addColorStop(0, `rgba(34, 211, 238, ${depthAlpha * 0.45})`);
          grad.addColorStop(0.5, `rgba(168, 85, 247, ${depthAlpha * 0.2})`);
          grad.addColorStop(1, "rgba(34, 211, 238, 0)");
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, pt.size * 4.2, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw 3D Sphere Node
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, Math.max(1.3, pt.size), 0, Math.PI * 2);
        ctx.fillStyle = pt.color;
        ctx.globalAlpha = depthAlpha;
        ctx.fill();

        // Specular highlight dot on sphere
        if (pt.isCore) {
          ctx.beginPath();
          ctx.arc(
            pt.x - pt.size * 0.3,
            pt.y - pt.size * 0.3,
            Math.max(0.7, pt.size * 0.35),
            0,
            Math.PI * 2
          );
          ctx.fillStyle = "#ffffff";
          ctx.fill();
        }

        // Draw floating 3D luminous monospace badge on foreground vertices
        if (pt.label && pt.z < 75) {
          ctx.font = `700 ${Math.round(10 * pt.scale)}px ui-monospace, SFMono-Regular, monospace`;
          ctx.fillStyle = `rgba(103, 232, 249, ${depthAlpha * 0.92})`;
          ctx.fillText(pt.label, pt.x + pt.size + 6, pt.y + 3);
        }

        ctx.globalAlpha = 1;
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [interactive]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`w-full h-full pointer-events-none ${className}`}
    />
  );
}
