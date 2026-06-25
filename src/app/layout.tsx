import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "CycleTrack — Women's Menstrual Wellness",
  description:
    "Digital Women's Menstrual Wellness Ecosystem with Cassia–Turmeric Infusion Innovation.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "CycleTrack",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#e11d48",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-rose-50 text-slate-800 antialiased max-w-[430px] mx-auto min-h-screen relative">
        {children}
      </body>
    </html>
  );
}
