import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const jost = Jost({ subsets: ["latin"], variable: "--font-jost" });

export const metadata: Metadata = {
  title: "Así suena Costa Rica — Rombos Sound Studio",
  description:
    "Cinco paisajes sonoros creados por Rombos Sound Studio para el Film Commission de PROCOMER, presentados en el Festival de Cannes 2026. Explorá el mapa interactivo y escuchá el país.",
  openGraph: {
    title: "Así suena Costa Rica — Rombos Sound Studio",
    description:
      "Un mapa interactivo con cinco paisajes sonoros originales de Costa Rica, creados para el Film Commission de PROCOMER.",
    images: ["/logo-blanco.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn("dark", "h-full", "antialiased", jost.variable)}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
