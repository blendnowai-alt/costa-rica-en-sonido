"use client";

import { Pause, Play, SpeakerHigh, SpeakerSlash } from "@phosphor-icons/react";
import type { Soundscape } from "./data";

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

type AudioPlayerProps = {
  soundscape: Soundscape;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  muted: boolean;
  onTogglePlay: () => void;
  onSeek: (fraction: number) => void;
  onToggleMute: () => void;
};

export function AudioPlayer({
  soundscape,
  isPlaying,
  currentTime,
  duration,
  muted,
  onTogglePlay,
  onSeek,
  onToggleMute,
}: AudioPlayerProps) {
  const progress = duration > 0 ? currentTime / duration : 0;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-black/50 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-4 px-4 py-3 sm:px-6 sm:py-4">
          <button
            onClick={onTogglePlay}
            aria-label={isPlaying ? "Pausar" : "Reproducir"}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#e8b34d] text-black transition-transform hover:scale-105 active:scale-95"
          >
            {isPlaying ? (
              <Pause weight="fill" size={18} />
            ) : (
              <Play weight="fill" size={18} className="ml-0.5" />
            )}
          </button>

          <div className="min-w-0 flex-1">
            <div className="flex items-baseline justify-between gap-2">
              <p className="truncate text-sm font-medium text-white">
                {soundscape.name}
              </p>
              <span className="hidden shrink-0 font-mono text-[11px] tabular-nums text-white/50 sm:inline">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
            <p className="truncate text-xs text-white/50">
              {soundscape.subtitle}
            </p>
            <div
              role="slider"
              aria-label="Progreso de la pista"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress * 100)}
              tabIndex={0}
              className="group relative mt-2 h-3 w-full cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                onSeek(Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)));
              }}
            >
              <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-white/15" />
              <div
                className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#e8b34d]"
                style={{ width: `${progress * 100}%` }}
              />
              <div
                className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white opacity-0 shadow transition-opacity group-hover:opacity-100"
                style={{ left: `${progress * 100}%` }}
              />
            </div>
          </div>

          <button
            onClick={onToggleMute}
            aria-label={muted ? "Activar sonido" : "Silenciar"}
            className="hidden shrink-0 items-center justify-center rounded-full p-2 text-white/60 transition-colors hover:text-white sm:flex"
          >
            {muted ? <SpeakerSlash size={18} /> : <SpeakerHigh size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}
