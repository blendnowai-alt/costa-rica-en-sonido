"use client";

import Image from "next/image";
import { useState } from "react";
import { AudioPlayer } from "./audio-player";
import { CostaRicaMap } from "./costa-rica-map";
import { SOUNDSCAPES } from "./data";
import { RegionList } from "./region-list";
import { useAudioPlayer } from "./use-audio-player";

export function SoundMapExperience() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = SOUNDSCAPES.find((s) => s.id === activeId) ?? null;

  const player = useAudioPlayer(active?.audioSrc ?? null);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#05070a] text-white">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 0%, rgba(122,157,74,0.16) 0%, rgba(5,7,10,0) 70%), radial-gradient(50% 40% at 85% 20%, rgba(216,190,130,0.10) 0%, rgba(5,7,10,0) 70%)",
        }}
      />

      <header className="relative z-10 mx-auto flex max-w-6xl items-center gap-3 px-6 pt-8 sm:px-8">
        <Image
          src="/logo-blanco.png"
          alt="Rombos Sound Studio"
          width={28}
          height={28}
        />
        <div className="leading-tight">
          <p className="text-sm font-semibold">Rombos Sound Studio</p>
          <p className="text-xs text-white/40">
            para PROCOMER Film Commission
          </p>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-40 pt-10 sm:px-8 sm:pt-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#e8b34d]/90">
            Presentado en el Festival de Cannes 2026
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
            Costa Rica, en sonido.
          </h1>
          <p className="mt-4 text-balance text-base text-white/50 sm:text-lg">
            Cinco paisajes sonoros originales, uno por cada región del país.
            Tocá un punto en el mapa para escuchar.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 items-center gap-10 lg:mt-20 lg:grid-cols-[1.4fr_1fr] lg:gap-8">
          <div className="-mx-4 rounded-[1.5rem] border border-[#e8b34d]/10 bg-[#3f6b38]/[0.06] p-2 sm:mx-0 sm:rounded-[2rem] sm:p-8">
            <CostaRicaMap
              soundscapes={SOUNDSCAPES}
              activeId={activeId}
              isPlaying={player.isPlaying}
              onSelect={setActiveId}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-sm font-medium text-white/70">
                Explorar regiones
              </h2>
              <p className="mt-1 text-xs text-white/35">
                {active ? active.description : "Elegí una región para escuchar su paisaje sonoro."}
              </p>
            </div>
            <RegionList
              soundscapes={SOUNDSCAPES}
              activeId={activeId}
              isPlaying={player.isPlaying}
              onSelect={setActiveId}
            />
          </div>
        </div>

        <p className="mt-24 text-center text-xs text-white/30">
          ¿Querés un paisaje sonoro para tu marca o producción?{" "}
          <a
            href="mailto:hello@studiorombos.com"
            className="text-white/60 underline underline-offset-4 hover:text-white"
          >
            hello@studiorombos.com
          </a>
        </p>
      </main>

      {active && (
        <AudioPlayer
          soundscape={active}
          isPlaying={player.isPlaying}
          currentTime={player.currentTime}
          duration={player.duration}
          muted={player.muted}
          onTogglePlay={player.togglePlay}
          onSeek={player.seek}
          onToggleMute={player.toggleMute}
        />
      )}
    </div>
  );
}
