"use client";

import { cn } from "@/lib/utils";
import type { Soundscape } from "./data";
import {
  COSTA_RICA_CONTOURS,
  COSTA_RICA_PATH,
  MAP_HEIGHT,
  MAP_WIDTH,
  project,
} from "./projection";

type CostaRicaMapProps = {
  soundscapes: Soundscape[];
  activeId: string | null;
  isPlaying: boolean;
  onSelect: (id: string) => void;
};

export function CostaRicaMap({
  soundscapes,
  activeId,
  isPlaying,
  onSelect,
}: CostaRicaMapProps) {
  return (
    <svg
      viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
      className="w-full h-auto overflow-visible"
      role="img"
      aria-label="Mapa interactivo de Costa Rica con puntos sonoros"
    >
      <defs>
        <linearGradient id="terrainBase" x1="10%" y1="0%" x2="85%" y2="100%">
          <stop offset="0%" stopColor="#dfe3a3" />
          <stop offset="22%" stopColor="#aac36c" />
          <stop offset="46%" stopColor="#6f9a4c" />
          <stop offset="72%" stopColor="#3f6b38" />
          <stop offset="100%" stopColor="#20391f" />
        </linearGradient>
        <radialGradient id="mountainSpine" cx="52%" cy="46%" r="62%">
          <stop offset="0%" stopColor="#16260f" stopOpacity="0.85" />
          <stop offset="55%" stopColor="#16260f" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#16260f" stopOpacity="0" />
        </radialGradient>
        <filter id="terrainTexture" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.018"
            numOctaves={5}
            seed={11}
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.35 0"
            result="noiseAlpha"
          />
          <feBlend in="SourceGraphic" in2="noiseAlpha" mode="overlay" result="blended" />
          <feComposite in="blended" in2="SourceAlpha" operator="in" />
        </filter>
        <filter id="reliefShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="4" dy="10" stdDeviation="14" floodColor="#000000" floodOpacity="0.45" />
        </filter>
        <clipPath id="landClip">
          <path d={COSTA_RICA_PATH} />
        </clipPath>
      </defs>

      <g filter="url(#reliefShadow)">
        <path d={COSTA_RICA_PATH} fill="url(#terrainBase)" filter="url(#terrainTexture)" />
        <path
          d={COSTA_RICA_PATH}
          fill="url(#mountainSpine)"
          style={{ mixBlendMode: "multiply" }}
        />
        <g clipPath="url(#landClip)" style={{ mixBlendMode: "multiply" }}>
          {COSTA_RICA_CONTOURS.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="#16260f"
              strokeWidth={1.1}
              strokeOpacity={0.32 + i * 0.05}
            />
          ))}
        </g>
        <path
          d={COSTA_RICA_PATH}
          fill="none"
          stroke="#f4e4b8"
          strokeOpacity={0.3}
          strokeWidth={1.25}
        />
      </g>

      {soundscapes.map((s) => {
        const [x, y] = project(s.coords);
        const active = s.id === activeId;
        return (
          <g
            key={s.id}
            transform={`translate(${x} ${y})`}
            className="cursor-pointer group outline-none"
            onClick={() => onSelect(s.id)}
            role="button"
            tabIndex={0}
            aria-label={`Escuchar paisaje sonoro de ${s.name}`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(s.id);
              }
            }}
          >
            <circle r={34} fill="transparent" style={{ pointerEvents: "all" }} />
            {active && isPlaying && (
              <circle
                r={13}
                className="fill-[#3aa0ff]/40 animate-ping"
                style={{ transformOrigin: "center" }}
              />
            )}
            <circle
              r={active ? 11 : 8}
              className={cn(
                "transition-all duration-300",
                active
                  ? "fill-[#3aa0ff] drop-shadow-[0_0_10px_rgba(58,160,255,0.9)]"
                  : "fill-[#3aa0ff]/75 group-hover:fill-[#3aa0ff] group-focus-visible:fill-[#3aa0ff]"
              )}
              stroke="#0a1830"
              strokeWidth={1.5}
            />
            <circle
              r={active ? 17 : 13}
              className={cn(
                "fill-none stroke-[#3aa0ff]/50 transition-all duration-300",
                active
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-70 group-focus-visible:opacity-70"
              )}
              strokeWidth={1}
            />
            <text
              x={0}
              y={active ? -25 : -20}
              textAnchor="middle"
              className={cn(
                "font-sans transition-all duration-300 select-none",
                active
                  ? "fill-white text-[15px] font-medium opacity-100"
                  : "fill-white/80 text-[12px] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100"
              )}
              style={{ paintOrder: "stroke", stroke: "#16260f", strokeWidth: 3 }}
            >
              {s.name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
