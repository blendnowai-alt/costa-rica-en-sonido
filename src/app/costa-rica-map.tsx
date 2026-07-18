"use client";

import { cn } from "@/lib/utils";
import type { Soundscape } from "./data";
import { COSTA_RICA_PATH, MAP_HEIGHT, MAP_WIDTH, project } from "./projection";

// Recorte del viewBox alrededor del contorno real (bbox aprox. x:288-821,
// y:41-522 en el espacio de 900x575 de projection.ts) para que el país
// quede centrado en el recuadro en vez de pegado a la derecha.
const VIEW_PAD = 45;
const VIEW_X = 288.33 - VIEW_PAD;
const VIEW_Y = 41.35 - VIEW_PAD;
const VIEW_W = 820.83 - 288.33 + VIEW_PAD * 2;
const VIEW_H = 522.43 - 41.35 + VIEW_PAD * 2;

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
      viewBox={`${VIEW_X} ${VIEW_Y} ${VIEW_W} ${VIEW_H}`}
      className="w-full h-auto overflow-visible"
      role="img"
      aria-label="Mapa interactivo de Costa Rica con puntos sonoros"
    >
      <defs>
        <filter id="reliefShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="4" dy="10" stdDeviation="14" floodColor="#000000" floodOpacity="0.45" />
        </filter>
        <clipPath id="landClip">
          <path d={COSTA_RICA_PATH} />
        </clipPath>
      </defs>

      <g filter="url(#reliefShadow)">
        <image
          href="/relief-costa-rica.jpg"
          x={0}
          y={0}
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
          preserveAspectRatio="none"
          clipPath="url(#landClip)"
        />
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
            <circle r={40} fill="transparent" style={{ pointerEvents: "all" }} />
            {active && isPlaying && (
              <circle
                r={18}
                className="fill-[#3aa0ff]/40 animate-ping"
                style={{ transformOrigin: "center", transformBox: "fill-box" }}
              />
            )}
            <circle
              r={active ? 15 : 11}
              className={cn(
                "transition-all duration-300",
                active
                  ? "fill-[#3aa0ff] drop-shadow-[0_0_10px_rgba(58,160,255,0.9)]"
                  : "fill-[#3aa0ff]/75 group-hover:fill-[#3aa0ff] group-focus-visible:fill-[#3aa0ff]"
              )}
              stroke="#0a1830"
              strokeWidth={2}
            />
            <circle
              r={active ? 22 : 17}
              className={cn(
                "fill-none stroke-[#3aa0ff]/50 transition-all duration-300",
                active
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-70 group-focus-visible:opacity-70"
              )}
              strokeWidth={1.25}
            />
            <text
              x={0}
              y={active ? -32 : -26}
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
