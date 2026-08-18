import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PROEFEX · Plataforma corporativa de aprendizaje",
  description:
    "PROEFEX unifica LMS, CMS y analítica de progreso en una sola experiencia fluida. Cursos online, contenido de marca y formación corporativa medible.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
