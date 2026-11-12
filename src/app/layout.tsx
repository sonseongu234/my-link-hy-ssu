import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="ko">
      <body className="antialiased text-[#111111] bg-white">
        {children}
      </body>
    </html>
  );
}
