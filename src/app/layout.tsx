import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "손성우 프로필 | 바이브 코딩",
  description: "전역을 준비하는 코딩러 - 손성우의 프로필 페이지",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased selection:bg-indigo-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
