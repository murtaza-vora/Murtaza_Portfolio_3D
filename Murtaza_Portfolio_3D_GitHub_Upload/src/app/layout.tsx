import type { Metadata } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/scroll/SmoothScroll";
import { PROFILE } from "@/lib/data";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://murtaza3d.vercel.app"),
  title: "Murtaza Vora | Data Analyst, Data Scientist & AI Engineer",
  description: PROFILE.summaryVerbatim,
  openGraph: {
    title: "Murtaza Vora | Data Analyst, Data Scientist & AI Engineer",
    description: PROFILE.summaryVerbatim,
    url: "https://murtaza3d.vercel.app",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-[#070b19] text-slate-50 antialiased selection:bg-cyan-400 selection:text-[#070b19]">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
