import React from "react";

interface TechLogoProps {
  name: string;
  size?: number;
  className?: string;
}

export function TechLogo({ name, size = 64, className = "" }: TechLogoProps) {
  const n = name.toLowerCase();

  if (n.includes("python")) {
    return (
      <svg width={size} height={size} viewBox="0 0 110 110" className={`drop-shadow-[0_10px_16px_rgba(55,118,171,0.3)] ${className}`}>
        <path d="M54.5 5C29.4 5 30.6 15.9 30.6 15.9L30.7 27.2H55v3.4H21.2S5 28.7 5 54.3s14.2 24.8 14.2 24.8l8.5-.1v-12s-.5-14.3 14-14.3h24.2s13.5.2 13.5-13.1V18.2S82.4 5 54.5 5zm-14 8.2c2.6 0 4.7 2.1 4.7 4.7s-2.1 4.7-4.7 4.7-4.7-2.1-4.7-4.7 2.1-4.7 4.7-4.7z" fill="#3776AB"/>
        <path d="M55.5 105c25.1 0 23.9-10.9 23.9-10.9l-.1-11.3H55v-3.4h33.8S105 81.3 105 55.7s-14.2-24.8-14.2-24.8l-8.5.1v12s.5 14.3-14 14.3H44.1s-13.5-.2-13.5 13.1v21.5S27.6 105 55.5 105zm14-8.2c-2.6 0-4.7-2.1-4.7-4.7s2.1-4.7 4.7-4.7 4.7 2.1 4.7 4.7-2.1 4.7-4.7 4.7z" fill="#FFD43B"/>
      </svg>
    );
  }

  if (n.includes("sql")) {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={`drop-shadow-[0_10px_16px_rgba(14,165,233,0.3)] ${className}`}>
        <ellipse cx="50" cy="24" rx="34" ry="14" fill="#0284c7" />
        <path d="M16 24v26c0 7.7 15.2 14 34 14s34-6.3 34-14V24c0 7.7-15.2 14-34 14S16 31.7 16 24z" fill="#0ea5e9" />
        <path d="M16 50v26c0 7.7 15.2 14 34 14s34-6.3 34-14V50c0 7.7-15.2 14-34 14S16 57.7 16 50z" fill="#38bdf8" />
        <ellipse cx="50" cy="24" rx="28" ry="9" fill="#bae6fd" opacity="0.45" />
      </svg>
    );
  }

  if (n.includes("power bi") || n.includes("dax") || n.includes("power query")) {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={`drop-shadow-[0_10px_16px_rgba(245,158,11,0.32)] ${className}`}>
        <rect x="18" y="48" width="16" height="38" rx="5" fill="#f59e0b" />
        <rect x="42" y="30" width="16" height="56" rx="5" fill="#fbbf24" />
        <rect x="66" y="14" width="16" height="72" rx="5" fill="#fde68a" stroke="#f59e0b" strokeWidth="2" />
      </svg>
    );
  }

  if (n.includes("tableau")) {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={`drop-shadow-[0_10px_16px_rgba(232,118,45,0.28)] ${className}`}>
        <g strokeWidth="6" strokeLinecap="round">
          <path d="M50 12v24M38 24h24" stroke="#E97627" />
          <path d="M50 64v24M38 76h24" stroke="#E97627" />
          <path d="M12 50h24M24 38v24" stroke="#1F447E" />
          <path d="M64 50h24M76 38v24" stroke="#C72037" />
          <path d="M50 38v24M38 50h24" stroke="#0a0a0f" strokeWidth="7" />
        </g>
      </svg>
    );
  }

  if (n.includes("aws")) {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={`drop-shadow-[0_10px_16px_rgba(255,153,0,0.3)] ${className}`}>
        <rect x="10" y="16" width="80" height="68" rx="18" fill="#1e293b" />
        <text x="50" y="54" textAnchor="middle" fill="#ffffff" fontSize="24" fontWeight="900" fontFamily="monospace">AWS</text>
        <path d="M26 66 Q50 78 74 66" stroke="#FF9900" strokeWidth="4" fill="none" strokeLinecap="round" />
        <path d="M69 62 L76 66 L70 71" stroke="#FF9900" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    );
  }

  if (n.includes("azure")) {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={`drop-shadow-[0_10px_16px_rgba(0,120,212,0.3)] ${className}`}>
        <path d="M36 16L14 78h22l15-42 12 28-18 14h42L56 16H36z" fill="#0078D4" />
        <path d="M36 16l20 44-18 18H14L36 16z" fill="#38bdf8" opacity="0.7" />
      </svg>
    );
  }

  if (n.includes("machine learning") || n.includes("generative ai") || n.includes("prompt") || n.includes("predictive") || n.includes("scikit")) {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={`drop-shadow-[0_10px_16px_rgba(99,102,241,0.32)] ${className}`}>
        <polygon points="50,10 86,30 86,70 50,90 14,70 14,30" fill="#4f46e5" opacity="0.14" stroke="#4f46e5" strokeWidth="2.5" />
        <line x1="50" y1="10" x2="50" y2="50" stroke="#6366f1" strokeWidth="2" />
        <line x1="86" y1="30" x2="50" y2="50" stroke="#6366f1" strokeWidth="2" />
        <line x1="14" y1="30" x2="50" y2="50" stroke="#6366f1" strokeWidth="2" />
        <line x1="50" y1="90" x2="50" y2="50" stroke="#6366f1" strokeWidth="2" />
        <circle cx="50" cy="50" r="11" fill="#4f46e5" />
        <circle cx="50" cy="10" r="5" fill="#10b981" />
        <circle cx="86" cy="30" r="5" fill="#0ea5e9" />
        <circle cx="86" cy="70" r="5" fill="#6366f1" />
        <circle cx="50" cy="90" r="5" fill="#10b981" />
        <circle cx="14" cy="70" r="5" fill="#0ea5e9" />
        <circle cx="14" cy="30" r="5" fill="#6366f1" />
      </svg>
    );
  }

  if (n.includes("snowflake")) {
    return (
      <svg width={size} height={size} viewBox="0 0 100 100" className={`drop-shadow-[0_10px_16px_rgba(41,181,232,0.3)] ${className}`}>
        <g stroke="#29B5E8" strokeWidth="5" strokeLinecap="round">
          <line x1="50" y1="14" x2="50" y2="86" />
          <line x1="19" y1="32" x2="81" y2="68" />
          <line x1="19" y1="68" x2="81" y2="32" />
        </g>
        <circle cx="50" cy="50" r="10" fill="#ffffff" stroke="#29B5E8" strokeWidth="5" />
      </svg>
    );
  }

  // Default 3D Extruded Isometric Monogram Cube for R, Excel, Matplotlib, Statistics, ETL, Data Warehousing, Databricks, Jupyter
  return (
    <div
      style={{ width: size, height: size }}
      className={`rounded-3xl card-3d-surface-dark border border-white/15 flex flex-col items-center justify-center font-mono font-bold text-white shadow-[0_16px_32px_rgba(10,12,28,0.28),0_5px_0_0_#000] ${className}`}
    >
      <span className="text-2xl tracking-tight text-white font-black">
        {name.slice(0, 2).toUpperCase()}
      </span>
      <span className="text-[8px] uppercase tracking-widest text-emerald-400 mt-0.5">
        3D NODE
      </span>
    </div>
  );
}
