"use client";

import React, { useState } from "react";
import Image from "next/image";
import { LinkCard } from "@/components/LinkCard";
import { LinkItem } from "@/types/link";
import {
  Github,
  BookOpen,
  Mail,
  Sparkles,
  Copy,
  Check,
  Heart,
  Share2,
  Terminal,
  Award,
  Flame,
} from "lucide-react";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [cheerCount, setCheerCount] = useState(77);
  const [hasCheered, setHasCheered] = useState(false);

  const links: (LinkItem & { iconNode: React.ReactNode })[] = [
    {
      id: "github",
      title: "GitHub 저장소",
      description: "배우고 만든 프로젝트 코드 모음",
      url: "https://github.com/sonseongu234",
      badge: "CODE REPO",
      tag: "Open Source",
      bgColor: "bg-[#FEF08A]", // Neo bright yellow
      iconNode: <Github className="w-6 h-6 stroke-[2.5]" />,
    },
    {
      id: "blog",
      title: "공부 기록 블로그",
      description: "코딩 공부와 일상 기록",
      url: "https://velog.io",
      badge: "DEV BLOG",
      tag: "Writing",
      bgColor: "bg-[#A7F3D0]", // Neo mint
      iconNode: <BookOpen className="w-6 h-6 stroke-[2.5]" />,
    },
    {
      id: "email",
      title: "이메일 보내기",
      description: "궁금한 점이나 협업 연락은 여기로",
      url: "mailto:contact@example.com",
      badge: "CONTACT",
      tag: "Direct",
      bgColor: "bg-[#FBCFE8]", // Neo pink
      iconNode: <Mail className="w-6 h-6 stroke-[2.5]" />,
    },
  ];

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("contact@example.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleCheer = () => {
    setCheerCount((prev) => prev + 1);
    setHasCheered(true);
    setTimeout(() => setHasCheered(false), 600);
  };

  const handleShare = async () => {
    if (typeof window !== "undefined") {
      try {
        if (navigator.share) {
          await navigator.share({
            title: "손성우 프로필 | 전역을 준비하는 코딩러",
            url: window.location.href,
          });
        } else {
          await navigator.clipboard.writeText(window.location.href);
          alert("링크가 클립보드에 복사되었습니다! 📋");
        }
      } catch {
        // Ignored
      }
    }
  };

  return (
    <div className="min-h-screen neo-grid-bg text-black flex flex-col justify-between selection:bg-[#FFE600] selection:text-black">
      {/* 1. TOP RETRO TICKER MARQUEE */}
      <div className="w-full bg-[#FFE600] border-b-[3px] border-black overflow-hidden py-2 shadow-neo-sm font-black text-xs sm:text-sm tracking-widest uppercase">
        <div className="animate-marquee whitespace-nowrap flex gap-8 items-center">
          <span>✦ MILITARY TO DEVELOPER PIPELINE</span>
          <span>★ 전역을 준비하는 코딩러</span>
          <span>✦ VIBE CODING IN PROGRESS</span>
          <span>★ NEXT.JS 15 & TAILWIND CSS</span>
          <span>✦ SON SEONG WOO</span>
          <span>★ DAILY COMMIT & GROWTH</span>
          {/* Duplicate for infinite loop */}
          <span>✦ MILITARY TO DEVELOPER PIPELINE</span>
          <span>★ 전역을 준비하는 코딩러</span>
          <span>✦ VIBE CODING IN PROGRESS</span>
          <span>★ NEXT.JS 15 & TAILWIND CSS</span>
          <span>✦ SON SEONG WOO</span>
          <span>★ DAILY COMMIT & GROWTH</span>
        </div>
      </div>

      {/* 2. MAIN CONTAINER */}
      <main className="w-full max-w-xl mx-auto px-4 py-8 sm:py-12 flex-1 flex flex-col items-center">
        {/* RETRO WINDOW CARD */}
        <div className="w-full bg-white border-[3.5px] border-black rounded-2xl shadow-neo-xl overflow-hidden transition-all duration-200">
          {/* WINDOW HEADER BAR */}
          <div className="bg-[#FFE600] border-b-[3.5px] border-black px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full bg-[#EF4444] border-2 border-black inline-block shadow-neo-sm"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#F59E0B] border-2 border-black inline-block shadow-neo-sm"></span>
              <span className="w-3.5 h-3.5 rounded-full bg-[#10B981] border-2 border-black inline-block shadow-neo-sm"></span>
              <span className="ml-2 font-black text-xs tracking-wider uppercase hidden sm:inline-block">
                PROFILE_WINDOW_v2.0.EXE
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 bg-black text-[#FFE600] text-[11px] font-black px-2.5 py-0.5 rounded border border-black shadow-neo-sm">
              <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-ping"></span>
              STATUS: CODING NOW
            </div>
          </div>

          {/* WINDOW BODY */}
          <div className="p-6 sm:p-8 flex flex-col items-center">
            {/* AVATAR SECTION */}
            <div className="relative mb-6">
              {/* Outer brutalist avatar box */}
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 rounded-2xl border-[3.5px] border-black shadow-neo-lg overflow-hidden bg-[#FAF7EE] rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
                <Image
                  src="/profile.jpg"
                  alt="손성우 프로필 사진"
                  width={144}
                  height={144}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {/* Floating Neobrutalist sticker 1: 전역 대기 */}
              <div className="absolute -top-3 -right-6 rotate-[8deg] bg-[#FFE600] border-[2.5px] border-black px-2.5 py-1 rounded-md shadow-neo-sm font-black text-xs flex items-center gap-1 hover:scale-105 transition-transform">
                <span>🎖️</span>
                <span>전역 대기 중</span>
              </div>

              {/* Floating Neobrutalist sticker 2: 바이브 코더 */}
              <div className="absolute -bottom-3 -left-5 rotate-[-6deg] bg-[#A3E635] border-[2.5px] border-black px-2.5 py-1 rounded-md shadow-neo-sm font-black text-xs flex items-center gap-1 hover:scale-105 transition-transform">
                <Sparkles className="w-3.5 h-3.5 stroke-[3]" />
                <span>바이브 코더</span>
              </div>
            </div>

            {/* NAME & HANDLE */}
            <div className="text-center mb-4">
              <div className="inline-block relative">
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-black flex items-center justify-center gap-2">
                  손성우
                  <span className="text-xl sm:text-2xl text-[#FB923C] animate-bounce">
                    ✦
                  </span>
                </h1>
              </div>
              <p className="text-xs sm:text-sm font-extrabold text-black/70 mt-1 uppercase tracking-wide">
                대한민국 국군장병 · 성장형 주니어 개발자
              </p>
            </div>

            {/* NEOBRUTALISM BIO BOX (핵심 소개글) */}
            <div className="w-full bg-[#FFE600] border-[3px] border-black rounded-xl p-4 sm:p-5 shadow-neo mb-6 text-center relative overflow-hidden group">
              <div className="absolute -right-3 -bottom-3 text-5xl opacity-10 select-none font-black">
                DEV
              </div>
              <div className="text-xs font-black uppercase tracking-wider text-black/70 mb-1 flex items-center justify-center gap-1">
                <Terminal className="w-3.5 h-3.5 stroke-[3]" />
                BIO / INTRODUCTION
              </div>
              <p className="text-lg sm:text-xl font-black text-black leading-snug">
                &ldquo;전역을 준비하는 코딩러&rdquo;
              </p>
              <p className="text-xs sm:text-sm font-bold text-black/80 mt-2">
                매일 밤 전역 후 멋진 개발자로 도약하기 위해 바이브 코딩 중입니다! 💻🔥
              </p>
            </div>

            {/* MINI STAT / INFO GRID */}
            <div className="w-full grid grid-cols-2 gap-2.5 sm:gap-3 mb-6">
              <div className="bg-[#FEF08A] border-2 border-black rounded-lg p-2.5 shadow-neo-sm text-left">
                <div className="text-[10px] font-black text-black/70 uppercase flex items-center gap-1">
                  <Award className="w-3 h-3 stroke-[3]" />
                  현재 신분
                </div>
                <div className="text-xs sm:text-sm font-black text-black mt-0.5">
                  대한민국 육군
                </div>
              </div>

              <div className="bg-[#BBF7D0] border-2 border-black rounded-lg p-2.5 shadow-neo-sm text-left">
                <div className="text-[10px] font-black text-black/70 uppercase flex items-center gap-1">
                  <Flame className="w-3 h-3 stroke-[3]" />
                  최종 목표
                </div>
                <div className="text-xs sm:text-sm font-black text-black mt-0.5">
                  전역 후 개발자 취업
                </div>
              </div>

              <div className="bg-[#BAE6FD] border-2 border-black rounded-lg p-2.5 shadow-neo-sm text-left">
                <div className="text-[10px] font-black text-black/70 uppercase">
                  ⚡ 주력 분야
                </div>
                <div className="text-xs sm:text-sm font-black text-black mt-0.5 truncate">
                  바이브코딩 & 웹 풀스택
                </div>
              </div>

              <div className="bg-[#FBCFE8] border-2 border-black rounded-lg p-2.5 shadow-neo-sm text-left">
                <div className="text-[10px] font-black text-black/70 uppercase">
                  🛠️ 테크 스택
                </div>
                <div className="text-xs sm:text-sm font-black text-black mt-0.5 truncate">
                  Next.js 15 · React 19
                </div>
              </div>
            </div>

            {/* HASHTAG BADGES */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {[
                "#바이브코딩",
                "#군인개발자",
                "#Next.js15",
                "#전역준비",
                "#열정코딩",
                "#성장기록",
              ].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-black px-2.5 py-1 bg-white border-2 border-black rounded-md shadow-neo-sm hover:bg-black hover:text-[#FFE600] transition-colors cursor-default"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* SECTION DIVIDER */}
            <div className="w-full flex items-center gap-3 mb-6">
              <div className="h-[2px] bg-black flex-1"></div>
              <span className="font-black text-xs tracking-wider uppercase bg-black text-white px-3 py-1 border border-black shadow-neo-sm">
                CONNECT & LINKS
              </span>
              <div className="h-[2px] bg-black flex-1"></div>
            </div>

            {/* LINKS LIST */}
            <div className="w-full space-y-3.5 mb-6">
              {links.map((link) => (
                <LinkCard
                  key={link.id}
                  link={link}
                  iconNode={link.iconNode}
                />
              ))}
            </div>

            {/* INTERACTIVE ACTIONS (EMAIL COPY & CHEER BUTTON) */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {/* Copy Email Button */}
              <button
                onClick={handleCopyEmail}
                className="w-full flex items-center justify-center gap-2 p-3 bg-white border-[2.5px] border-black rounded-xl font-black text-xs sm:text-sm shadow-neo hover:shadow-neo-lg hover:-translate-y-0.5 active:translate-y-1 active:shadow-neo-sm transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-[#16A34A] stroke-[3]" />
                    <span className="text-[#16A34A]">이메일 주소 복사됨!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 stroke-[2.5]" />
                    <span>이메일 주소 복사</span>
                  </>
                )}
              </button>

              {/* Cheer Button */}
              <button
                onClick={handleCheer}
                className={`w-full flex items-center justify-center gap-2 p-3 bg-[#FF6EA7] text-black border-[2.5px] border-black rounded-xl font-black text-xs sm:text-sm shadow-neo hover:shadow-neo-lg hover:-translate-y-0.5 active:translate-y-1 active:shadow-neo-sm transition-all ${
                  hasCheered ? "scale-105 bg-[#F43F5E] text-white" : ""
                }`}
              >
                <Heart
                  className={`w-4 h-4 stroke-[2.5] ${
                    hasCheered ? "fill-white animate-ping" : "fill-black"
                  }`}
                />
                <span>전역 응원하기 ({cheerCount})</span>
              </button>
            </div>

            {/* Share profile button */}
            <div className="w-full mt-3">
              <button
                onClick={handleShare}
                className="w-full py-2.5 bg-[#FAF7EE] border-2 border-black rounded-lg text-xs font-black text-black flex items-center justify-center gap-1.5 hover:bg-black hover:text-[#FFE600] transition-colors shadow-neo-sm"
              >
                <Share2 className="w-3.5 h-3.5 stroke-[2.5]" />
                프로필 링크 공유하기
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* 3. NEOBRUTALISM FOOTER */}
      <footer className="w-full border-t-[3px] border-black bg-white py-6 px-4 mt-8">
        <div className="max-w-xl mx-auto flex flex-col items-center text-center gap-2">
          <div className="inline-flex items-center gap-2 bg-black text-[#FFE600] font-black text-xs px-3 py-1 border border-black shadow-neo-sm">
            <span>✦</span>
            <span>DESIGNED IN NEOBRUTALISM STYLE</span>
            <span>✦</span>
          </div>

          <p className="font-black text-xs text-black mt-2">
            © {new Date().getFullYear()} 손성우 (Son Seong Woo). All rights reserved.
          </p>

          <p className="text-[11px] font-bold text-black/70">
            열정과 끈기로 매일 한 걸음씩 · 군 생활과 코딩을 병행하며 전역을 향해 달립니다 🚀
          </p>
        </div>
      </footer>
    </div>
  );
}
