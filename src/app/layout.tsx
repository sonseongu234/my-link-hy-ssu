import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "손성우 | 전역을 준비하는 코딩러",
  description: "전역을 준비하는 코딩러 - 국군장병 & 바이브 코더 손성우의 Neobrutalism 프로필 링크트리",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased selection:bg-[#FFE600] selection:text-black font-sans">
        {children}
      </body>
    </html>
  );
}
