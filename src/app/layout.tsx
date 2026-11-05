import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "손성우 | 전역을 준비하는 코딩러",
  description: "전역을 준비하는 코딩러 - 국군장병 & 바이브 코더 손성우의 공식 포트폴리오 (Nike Commerce Editorial)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body className="antialiased text-[#111111] bg-white">
        {children}
      </body>
    </html>
  );
}
