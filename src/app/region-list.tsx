"use client";

import { cn } from "@/lib/utils";
import type { Soundscape } from "./data";

type RegionListProps = {
  soundscapes: Soundscape[];
  activeId: string | null;
  isPlaying: boolean;
  onSelect: (id: string) => void;
};

export function RegionList({
  soundscapes,
  activeId,
  isPlaying,
  onSelect,
}: RegionListProps) {
  return (
    <div className="flex flex-col gap-2">
      {soundscapes.map((s) => {
        const active = s.id === activeId;
        return (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className={cn(
              "group flex items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-all duration-300",
              active
                ? "border-[#e8b34d]/30 bg-[#e8b34d]/10"
                : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
            )}
          >
            <span
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
                active ? "bg-[#e8b34d] text-black" : "bg-white/10 text-white/50"
              )}
            >
              {active && isPlaying ? (
                <span className="flex h-3 items-end gap-0.5">
                  <span className="h-3 w-0.5 origin-bottom animate-[eq_0.9s_ease-in-out_infinite] bg-black" />
                  <span className="h-3 w-0.5 origin-bottom animate-[eq_0.7s_ease-in-out_infinite_0.15s] bg-black" />
                  <span className="h-3 w-0.5 origin-bottom animate-[eq_1.1s_ease-in-out_infinite_0.3s] bg-black" />
                </span>
              ) : (
                <span className="text-xs font-medium">
                  {s.name.charAt(0)}
                </span>
              )}
            </span>
            <span className="min-w-0">
              <span
                className={cn(
                  "block truncate text-sm font-medium",
                  active ? "text-white" : "text-white/80"
                )}
              >
                {s.name}
              </span>
              <span className="block truncate text-xs text-white/40">
                {s.subtitle}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
