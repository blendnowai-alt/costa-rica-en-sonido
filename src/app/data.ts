export type Soundscape = {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  coords: [lon: number, lat: number];
  audioSrc: string;
};

export const SOUNDSCAPES: Soundscape[] = [
  {
    id: "guanacaste",
    name: "Guanacaste",
    subtitle: "Liberia · Costa Pacífico Norte",
    description:
      "Bosque seco, brisa del Pacífico y ecos de tradición sabanera bajo un cielo que casi siempre está despejado.",
    coords: [-85.55, 10.55],
    audioSrc: "/audio/soundscapes/guanacaste.mp3",
  },
  {
    id: "zona-nubes",
    name: "Zona de Nubes",
    subtitle: "Monteverde · Bosque Nuboso",
    description:
      "Niebla suspendida entre montañas, el susurro del dosel nuboso y el canto esquivo del quetzal.",
    coords: [-84.82, 10.3],
    audioSrc: "/audio/soundscapes/zona-nubes.mp3",
  },
  {
    id: "gam",
    name: "Gran Área Metropolitana",
    subtitle: "San José · Valle Central",
    description:
      "El corazón urbano de Costa Rica: bullicio cotidiano, cafetales cercanos y el pulso de una capital en movimiento.",
    coords: [-84.09, 9.93],
    audioSrc: "/audio/soundscapes/gam.mp3",
  },
  {
    id: "caribe",
    name: "Caribe",
    subtitle: "Puerto Limón · Tortuguero",
    description:
      "Selva, marea y raíces afrocaribeñas se entrelazan en un pulso costero que respira historia y biodiversidad.",
    coords: [-83.2, 9.98],
    audioSrc: "/audio/soundscapes/caribe.mp3",
  },
  {
    id: "zona-sur",
    name: "Zona Sur",
    subtitle: "Península de Osa · Golfo Dulce",
    description:
      "La selva más biodiversa del país: lluvia constante, insectos nocturnos y un océano que golpea con calma salvaje.",
    coords: [-83.28, 8.62],
    audioSrc: "/audio/soundscapes/zona-sur.mp3",
  },
];
