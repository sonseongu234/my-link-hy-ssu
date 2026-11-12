"use client";

import React, { useState } from "react";
import { ProductCard, NikeCardItem } from "@/components/ProductCard";
import {
  Search,
  Heart,
  ShoppingBag,
  ChevronRight,
  ChevronDown,
  ChevronLeft,
  Check,
  Copy,
  Code2,
  BookOpen,
  Mail,
  Flame,
  Shield,
  Layers,
  ArrowRight,
  Menu,
  X,
  Terminal,
} from "lucide-react";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [cheerCount, setCheerCount] = useState(128);
  const [hasCheered, setHasCheered] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>("status");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const filterOptions = [
    { id: "all", label: "All Items (3)" },
    { id: "repo", label: "Repositories" },
    { id: "blog", label: "Dev Log" },
    { id: "contact", label: "Contact & Collab" },
  ];

  const productItems: (NikeCardItem & { category: string })[] = [
    {
      id: "github",
      category: "repo",
      title: "GitHub / my-link-hy-ssu",
      subtitle: "Men's Vibe Coding & Web Architecture",
      url: "https://github.com/sonseongu234/my-link-hy-ssu",
      badge: "JUST IN",
      price: "Free Repository",
      salePrice: "Active Daily",
      originalPrice: "MIT License",
      discountRate: "100%",
      actionText: "Explore Code",
      swatches: [
        { name: "Nike Black", color: "#111111" },
        { name: "TypeScript Blue", color: "#3178C6" },
        { name: "Tailwind Cyan", color: "#38BDF8" },
      ],
      graphic: (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center border border-[#cacacb] mb-3 group-hover:scale-110 transition-transform">
            <Code2 className="w-8 h-8 sm:w-10 sm:h-10 text-[#111111] stroke-[1.75]" />
          </div>
          <span className="font-campaign text-xl sm:text-2xl tracking-tight text-[#111111] uppercase">
            SOURCE CODE 01
          </span>
          <span className="text-[11px] sm:text-[12px] font-medium text-[#707072] mt-1">
            Next.js 15 · TypeScript · Tailwind
          </span>
        </div>
      ),
    },
    {
      id: "blog",
      category: "blog",
      title: "Velog / 코딩 & 일상 기록",
      subtitle: "Engineering Notes & Military Life",
      url: "https://velog.io",
      badge: "MEMBER EXCLUSIVE",
      price: "Public Dev Log",
      salePrice: "Updated Weekly",
      originalPrice: "Open Read",
      discountRate: "Free",
      actionText: "Read Articles",
      swatches: [
        { name: "Velog Green", color: "#20C997" },
        { name: "Charcoal", color: "#39393b" },
        { name: "Soft Cloud", color: "#ffffff" },
      ],
      graphic: (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center border border-[#cacacb] mb-3 group-hover:scale-110 transition-transform">
            <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-[#111111] stroke-[1.75]" />
          </div>
          <span className="font-campaign text-xl sm:text-2xl tracking-tight text-[#111111] uppercase">
            DEV ARCHIVE 02
          </span>
          <span className="text-[11px] sm:text-[12px] font-medium text-[#707072] mt-1">
            Learning Logs · Problem Solving
          </span>
        </div>
      ),
    },
    {
      id: "email",
      category: "contact",
      title: "Direct Inquiries / 협업 및 채용 문의",
      subtitle: "Collaboration & Developer Opportunities",
      url: "mailto:contact@example.com",
      badge: "AVAILABLE NOW",
      price: "24h Direct Reply",
      salePrice: "Open to Work",
      actionText: "Send Inquiries",
      swatches: [
        { name: "Nike Black", color: "#111111" },
        { name: "Signal Red", color: "#d30005" },
        { name: "Pure White", color: "#ffffff" },
      ],
      graphic: (
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center border border-[#cacacb] mb-3 group-hover:scale-110 transition-transform">
            <Mail className="w-8 h-8 sm:w-10 sm:h-10 text-[#111111] stroke-[1.75]" />
          </div>
          <span className="font-campaign text-xl sm:text-2xl tracking-tight text-[#111111] uppercase">
            CONNECT 03
          </span>
          <span className="text-[11px] sm:text-[12px] font-medium text-[#707072] mt-1">
            contact@example.com
          </span>
        </div>
      ),
    },
  ];

  const filteredProducts =
    activeFilter === "all"
      ? productItems
      : productItems.filter((p) => p.category === activeFilter);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("contact@example.com");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleCheer = () => {
    setCheerCount((c) => c + 1);
    setHasCheered(true);
    setTimeout(() => setHasCheered(false), 300);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordion((cur) => (cur === id ? null : id));
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col justify-between selection:bg-[#111111] selection:text-white">
      {/* =========================================================================
          1. UTILITY BAR (utility-bar: #f5f5f5, 36px height, caption-sm 12px)
      ========================================================================= */}
      <div className="w-full bg-[#f5f5f5] h-[36px] px-4 sm:px-8 lg:px-12 flex items-center justify-between text-[11px] sm:text-[12px] font-medium text-[#111111] border-b border-[#e5e5e5]">
        <div className="flex items-center gap-2 truncate">
          <span className="font-semibold tracking-wider text-[#39393b] truncate">
            ROK ARMY · DEV BATTALION
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 text-[#707072] flex-shrink-0">
          <a
            href="https://github.com/sonseongu234"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#111111] transition-colors hidden xs:inline-block"
          >
            GitHub
          </a>
          <span className="hidden xs:inline-block">·</span>
          <a
            href="https://velog.io"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#111111] transition-colors hidden sm:inline-block"
          >
            Velog
          </a>
          <span className="hidden sm:inline-block">·</span>
          <button
            onClick={handleCopy}
            className="hover:text-[#111111] transition-colors"
          >
            {copiedEmail ? "Copied!" : "Contact"}
          </button>
          <span>·</span>
          <span className="text-[#111111] font-semibold">2026 D-DAY</span>
        </div>
      </div>

      {/* =========================================================================
          2. PRIMARY NAVIGATION (primary-nav: #ffffff, 60px height)
      ========================================================================= */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#e5e5e5]">
        <div className="max-w-[1440px] mx-auto h-[60px] px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* LEFT: NIKE SWOOSH LOGO + MONOGRAM */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#f5f5f5] transition-colors -ml-2"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-[#111111]" />
              ) : (
                <Menu className="w-5 h-5 text-[#111111]" />
              )}
            </button>

            <a href="#" className="flex items-center gap-2 sm:gap-3">
              <svg
                className="w-12 sm:w-14 h-6 sm:h-7 text-[#111111]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21.707 5.293c-.27-.27-.69-.33-1.02-.15L3.92 14.18c-1.57.84-2.22 2.68-1.53 4.29.61 1.43 2.05 2.29 3.59 2.29.56 0 1.13-.11 1.68-.35l14.07-6.03c.59-.25.87-.94.62-1.53s-.94-.87-1.53-.62l-14.07 6.03c-.63.27-1.37-.02-1.65-.67-.28-.66.02-1.42.66-1.76L18.47 7.02c.86-.46 1.89-.3 2.58.39.2.2.47.3.74.3.18 0 .37-.05.53-.15.48-.31.62-.95.31-1.43-.24-.37-.58-.65-.92-.84z" />
              </svg>
              <span className="font-campaign text-xl sm:text-2xl tracking-tight uppercase text-[#111111]">
                SON SEONG WOO
              </span>
            </a>
          </div>

          {/* CENTER: DESKTOP NAV ITEMS */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-[15px] lg:text-[16px] font-medium text-[#111111]">
            <a
              href="#"
              className="relative py-4 border-b-2 border-[#111111] cursor-pointer"
            >
              New & Featured
            </a>
            <a
              href="#featured-projects"
              className="py-4 hover:text-[#707072] transition-colors"
            >
              Projects
            </a>
            <a
              href="#capabilities"
              className="py-4 hover:text-[#707072] transition-colors"
            >
              Capabilities
            </a>
            <a
              href="#specifications"
              className="py-4 hover:text-[#707072] transition-colors"
            >
              Specifications
            </a>
            <a
              href="#membership"
              className="py-4 hover:text-[#707072] transition-colors"
            >
              Membership
            </a>
          </nav>

          {/* RIGHT: SEARCH PILL & CIRCULAR CONTROLS */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Desktop Search Pill */}
            <div className="hidden lg:flex items-center gap-2 bg-[#f5f5f5] h-[40px] px-4 rounded-full text-[14px] text-[#707072] w-[180px] xl:w-[220px] focus-within:ring-2 focus-within:ring-[#111111]">
              <Search className="w-4 h-4 text-[#111111]" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-0 outline-none w-full text-[#111111] placeholder-[#707072] text-[14px]"
              />
            </div>

            {/* Mobile Search Toggle Icon */}
            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center bg-[#f5f5f5] hover:bg-[#e5e5e5] transition-colors"
              aria-label="Toggle Search"
            >
              <Search className="w-4 h-4 text-[#111111]" />
            </button>

            {/* Wishlist Heart Icon (40px circle) */}
            <button
              onClick={handleCheer}
              className={`w-10 h-10 rounded-full flex items-center justify-center bg-[#f5f5f5] hover:bg-[#e5e5e5] transition-all active:scale-95 ${
                hasCheered ? "scale-90 opacity-70" : ""
              }`}
              title="Cheer developer"
              aria-label="Cheer developer"
            >
              <Heart
                className={`w-4 h-4 ${
                  hasCheered ? "fill-[#d30005] text-[#d30005]" : "text-[#111111]"
                }`}
              />
            </button>

            {/* Contact Bag Icon (40px circle) */}
            <a
              href="mailto:contact@example.com"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#f5f5f5] hover:bg-[#e5e5e5] transition-colors"
              title="Direct contact"
              aria-label="Direct contact"
            >
              <ShoppingBag className="w-4 h-4 text-[#111111]" />
            </a>
          </div>
        </div>

        {/* MOBILE SEARCH OVERLAY (when toggled on mobile) */}
        {mobileSearchOpen && (
          <div className="lg:hidden px-4 py-3 bg-[#f5f5f5] border-t border-[#e5e5e5] flex items-center gap-2">
            <Search className="w-4 h-4 text-[#111111]" />
            <input
              type="text"
              autoFocus
              placeholder="Search projects, skills, documentation..."
              className="bg-transparent border-0 outline-none w-full text-[#111111] text-[14px]"
            />
            <button
              onClick={() => setMobileSearchOpen(false)}
              className="text-xs font-semibold text-[#707072] px-2 py-1"
            >
              Cancel
            </button>
          </div>
        )}

        {/* MOBILE NAVIGATION DRAWER */}
        {mobileMenuOpen && (
          <div className="md:hidden w-full bg-white border-t border-[#e5e5e5] px-6 py-6 space-y-4 shadow-sm animate-in fade-in slide-in-from-top-2 duration-150">
            <div className="flex flex-col space-y-3 text-[16px] font-medium text-[#111111]">
              <a
                href="#featured-projects"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 flex items-center justify-between"
              >
                <span>Projects</span>
                <ChevronRight className="w-4 h-4 text-[#707072]" />
              </a>
              <a
                href="#capabilities"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 flex items-center justify-between"
              >
                <span>Capabilities</span>
                <ChevronRight className="w-4 h-4 text-[#707072]" />
              </a>
              <a
                href="#specifications"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 flex items-center justify-between"
              >
                <span>Specifications</span>
                <ChevronRight className="w-4 h-4 text-[#707072]" />
              </a>
              <a
                href="#membership"
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 flex items-center justify-between"
              >
                <span>Membership</span>
                <ChevronRight className="w-4 h-4 text-[#707072]" />
              </a>
            </div>

            <div className="pt-4 border-t border-[#e5e5e5] flex flex-col gap-2.5">
              <a
                href="https://github.com/sonseongu234"
                target="_blank"
                rel="noopener noreferrer"
                className="h-[44px] rounded-full bg-[#111111] text-white text-[14px] font-medium flex items-center justify-center gap-2"
              >
                GitHub Repositories
              </a>
              <button
                onClick={() => {
                  handleCopy();
                  setMobileMenuOpen(false);
                }}
                className="h-[44px] rounded-full bg-[#f5f5f5] text-[#111111] text-[14px] font-medium flex items-center justify-center gap-2"
              >
                {copiedEmail ? "Copied!" : "Copy Contact Email"}
              </button>
            </div>
          </div>
        )}
      </header>

      {/* SUB-NAV STRIP (Responsive Ticker) */}
      <div className="w-full bg-white border-b border-[#e5e5e5] py-2 px-4 sm:px-8 lg:px-12 text-center text-[12px] sm:text-[13px] font-medium text-[#111111]">
        <span className="font-semibold">✦ 전역을 준비하는 코딩러</span>
        <span className="mx-2 text-[#cacacb] hidden xs:inline-block">|</span>
        <span className="text-[#707072] block xs:inline mt-0.5 xs:mt-0">
          DAILY CODING PIPELINE · VIBE CODING FOR 2026 DISCHARGE
        </span>
      </div>

      <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 flex-1">
        {/* =========================================================================
            3. EDITORIAL CAMPAIGN HERO (사진 제거 & 순수 타이포그래피 + 그래픽 스테이지)
        ========================================================================= */}
        <section className="relative w-full mt-4 sm:mt-6 mb-8 sm:mb-12">
          <div className="relative w-full min-h-[460px] sm:min-h-[540px] md:min-h-[620px] bg-[#111111] overflow-hidden flex flex-col justify-between p-6 sm:p-10 md:p-14 text-white">
            {/* ATHLETIC GRAPHIC WATERMARK BACKGROUND (No personal photo) */}
            <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
              {/* Massive subtle Nike swoosh watermark in background */}
              <svg
                className="absolute -right-20 -top-20 md:-right-32 md:-top-32 w-[420px] sm:w-[600px] md:w-[840px] h-auto text-white/[0.04]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M21.707 5.293c-.27-.27-.69-.33-1.02-.15L3.92 14.18c-1.57.84-2.22 2.68-1.53 4.29.61 1.43 2.05 2.29 3.59 2.29.56 0 1.13-.11 1.68-.35l14.07-6.03c.59-.25.87-.94.62-1.53s-.94-.87-1.53-.62l-14.07 6.03c-.63.27-1.37-.02-1.65-.67-.28-.66.02-1.42.66-1.76L18.47 7.02c.86-.46 1.89-.3 2.58.39.2.2.47.3.74.3.18 0 .37-.05.53-.15.48-.31.62-.95.31-1.43-.24-.37-.58-.65-.92-.84z" />
              </svg>

              {/* Technical athletic gridlines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
            </div>

            {/* TOP METADATA ROW */}
            <div className="relative z-10 flex items-center justify-between gap-4">
              <div className="inline-flex items-center gap-2">
                <span className="bg-white text-[#111111] text-[11px] sm:text-[12px] font-bold tracking-widest uppercase px-3 py-1 rounded-full">
                  ROK ARMY · MILITARY DEV
                </span>
                <span className="text-white/80 text-[11px] sm:text-[12px] font-medium tracking-wide hidden xs:inline-block">
                  D-DAY PIPELINE
                </span>
              </div>

              <div className="text-[10px] sm:text-[11px] font-mono text-white/50 tracking-wider hidden sm:block">
                SPEC: NIKE COMMERCE v2.0
              </div>
            </div>

            {/* BURNED-IN CAMPAIGN LOCKUP (중앙-하단 타이포그래피) */}
            <div className="relative z-10 max-w-4xl pt-10 sm:pt-16 pb-2">
              {/* TOWERING UPPERCASE DISPLAY HEADLINE */}
              <h1 className="font-campaign text-5xl xs:text-6xl sm:text-8xl md:text-9xl tracking-tight uppercase leading-[0.88] text-white">
                PREPARING FOR
                <br />
                DISCHARGE.
              </h1>

              {/* EDITORIAL SUBTITLE & BIO */}
              <div className="mt-3 sm:mt-4 mb-6 sm:mb-8 max-w-2xl">
                <p className="text-lg xs:text-xl sm:text-2xl font-medium text-white/95 leading-tight">
                  &ldquo;전역을 준비하는 코딩러&rdquo;
                </p>
                <p className="text-xs xs:text-sm sm:text-base font-normal text-white/75 mt-2 leading-relaxed">
                  국방의 의무와 코딩을 병행하며 매일 한 걸음씩 완성해 나가는
                  손성우의 바이브 코딩 & 풀스택 포트폴리오입니다.
                </p>
              </div>

              {/* ON-IMAGE PILL CTAS (모바일 최적화: 유연한 반응형 버튼) */}
              <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3">
                <a
                  href="#featured-projects"
                  className="h-[48px] px-8 rounded-full bg-white text-[#111111] text-[15px] font-medium flex items-center justify-center transition-all active:scale-95 hover:bg-[#f5f5f5]"
                >
                  Explore Code
                </a>

                <a
                  href="mailto:contact@example.com"
                  className="h-[48px] px-8 rounded-full bg-[#f5f5f5]/90 backdrop-blur-sm text-[#111111] text-[15px] font-medium flex items-center justify-center transition-all active:scale-95 hover:bg-white"
                >
                  Contact Seongwoo
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            4. FEATURED PROJECTS SECTION (PLP Listing / Product Cards)
        ========================================================================= */}
        <section id="featured-projects" className="py-4 sm:py-6 mb-8 sm:mb-12">
          {/* SECTION HEADER & CAROUSEL CONTROLS */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-4 sm:mb-6">
            <div>
              <span className="text-[12px] sm:text-[14px] font-medium text-[#707072] uppercase tracking-wider block mb-1">
                Official Directory
              </span>
              <h2 className="text-[24px] xs:text-[28px] sm:text-[32px] font-medium text-[#111111] leading-tight">
                FEATURED FOOTWEAR & PROJECTS
              </h2>
            </div>

            {/* Circular Carousel Controls (40px circle) */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[#111111] hover:bg-[#e5e5e5] transition-colors"
                title="Previous"
                aria-label="Previous items"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                className="w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center text-[#111111] hover:bg-[#e5e5e5] transition-colors"
                title="Next"
                aria-label="Next items"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* FILTER CHIPS ROW (모바일 수평 터치 스크롤 최적화) */}
          <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex items-center gap-2 overflow-x-auto pb-3 mb-4 sm:mb-6 no-scrollbar snap-x">
            {filterOptions.map((f) => {
              const isActive = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`h-[40px] px-4 rounded-full text-[13px] sm:text-[14px] font-medium transition-all whitespace-nowrap active:scale-95 flex-shrink-0 snap-start ${
                    isActive
                      ? "bg-[#111111] text-white"
                      : "bg-white text-[#111111] border border-[#cacacb] hover:border-[#111111]"
                  }`}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* PRODUCT GRID (반응형: 모바일 1열 -> 태블릿 2열 -> 데스크톱 3열) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* =========================================================================
            5. SHOP BY DISCIPLINE / SPORT-CATEGORY RAIL (모바일 스와이프 레일)
        ========================================================================= */}
        <section id="capabilities" className="py-4 sm:py-6 mb-8 sm:mb-12">
          <div className="mb-4 sm:mb-6">
            <span className="text-[12px] sm:text-[14px] font-medium text-[#707072] uppercase tracking-wider block mb-1">
              Engineered For Speed
            </span>
            <h2 className="text-[24px] xs:text-[28px] sm:text-[32px] font-medium text-[#111111] leading-tight">
              CORE DISCIPLINES & CAPABILITIES
            </h2>
          </div>

          {/* CATEGORY TILES (모바일 가로 스와이프 peek-next-card -> 데스크톱 4열 그리드) */}
          <div className="-mx-4 px-4 sm:mx-0 sm:px-0 flex overflow-x-auto snap-x snap-mandatory pb-4 gap-3.5 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:overflow-visible no-scrollbar">
            {[
              {
                tag: "TECH STACK 01",
                title: "VIBE CODING",
                desc: "AI-Augmented fast prototyping & deployment pipeline",
                cta: "Explore",
                icon: <Flame className="w-7 h-7 sm:w-8 sm:h-8 text-[#111111]" />,
              },
              {
                tag: "TECH STACK 02",
                title: "NEXT.JS 15",
                desc: "React 19 App Router & Server Components",
                cta: "Inspect",
                icon: <Terminal className="w-7 h-7 sm:w-8 sm:h-8 text-[#111111]" />,
              },
              {
                tag: "DISCIPLINE 03",
                title: "MILITARY GRIT",
                desc: "Consistent daily commits during military service",
                cta: "Read Story",
                icon: <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-[#111111]" />,
              },
              {
                tag: "SYSTEMS 04",
                title: "COMMERCE DESIGN",
                desc: "Nike design system token fidelity & typography",
                cta: "Tokens",
                icon: <Layers className="w-7 h-7 sm:w-8 sm:h-8 text-[#111111]" />,
              },
            ].map((cat, idx) => (
              <div
                key={idx}
                className="group relative min-w-[240px] xs:min-w-[260px] sm:min-w-0 flex-shrink-0 snap-start aspect-[4/5] bg-[#f5f5f5] p-5 sm:p-6 flex flex-col justify-between overflow-hidden"
              >
                <div className="flex justify-between items-start">
                  <span className="text-[11px] font-bold text-[#707072] tracking-wider uppercase">
                    {cat.tag}
                  </span>
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center border border-[#cacacb] group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </div>
                </div>

                <div>
                  <h3 className="font-campaign text-2xl xs:text-3xl sm:text-4xl uppercase text-[#111111] leading-none mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-[12px] sm:text-[13px] text-[#707072] font-medium leading-snug mb-3 sm:mb-4">
                    {cat.desc}
                  </p>

                  <span className="inline-flex items-center gap-1.5 h-[36px] px-4 rounded-full bg-white text-[#111111] text-[13px] font-medium border border-[#cacacb] group-hover:bg-[#111111] group-hover:text-white transition-all">
                    {cat.cta}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            6. MEMBER BENEFIT / EDITORIAL BANNER (member-benefit-card)
        ========================================================================= */}
        <section id="membership" className="py-4 sm:py-6 mb-8 sm:mb-12">
          <div className="relative w-full bg-[#111111] text-white p-6 sm:p-10 md:p-12 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8">
            <div className="max-w-xl w-full">
              <span className="text-[11px] sm:text-[12px] font-bold text-[#cacacb] tracking-widest uppercase block mb-2">
                NIKE MEMBERSHIP / DEVELOPER PIPELINE
              </span>
              <h2 className="font-campaign text-4xl xs:text-5xl sm:text-6xl uppercase tracking-tight text-white leading-tight">
                DEDICATION OVER MOTIVATION.
              </h2>
              <p className="text-white/80 text-[14px] sm:text-[16px] font-normal leading-relaxed mt-2 sm:mt-3">
                낮에는 국방의 의무를, 밤에는 코딩을 합니다. 전역하는 그날까지
                매일 한 걸음씩 완성해 나가는 손성우의 개발자 성장 스토리.
              </p>

              {/* ACTION PILLS (반응형 버튼) */}
              <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-3 mt-5 sm:mt-6">
                <button
                  onClick={handleCheer}
                  className="h-[48px] px-6 sm:px-8 rounded-full bg-white text-[#111111] text-[14px] sm:text-[15px] font-medium flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-[#f5f5f5]"
                >
                  <Heart className="w-4 h-4 fill-[#111111]" />
                  <span>전역 응원하기 ({cheerCount})</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="h-[48px] px-6 sm:px-8 rounded-full bg-[#f5f5f5]/20 backdrop-blur text-white text-[14px] sm:text-[15px] font-medium flex items-center justify-center gap-2 active:scale-95 transition-all hover:bg-[#f5f5f5]/30"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-4 h-4 text-[#007d48]" />
                      <span>이메일 주소 복사됨!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>이메일 주소 복사</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* ATHLETE STATS / EMBLEM */}
            <div className="w-full md:w-auto flex-shrink-0 grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-white/10 p-4 sm:p-5 rounded-none border-l-2 border-white">
                <span className="text-[11px] sm:text-[12px] text-[#cacacb] block uppercase">
                  Current Status
                </span>
                <span className="font-campaign text-2xl sm:text-3xl text-white">
                  ROK ARMY
                </span>
                <span className="text-[10px] sm:text-[11px] text-white/60 block mt-0.5">
                  국군장병 복무 중
                </span>
              </div>

              <div className="bg-white/10 p-4 sm:p-5 rounded-none border-l-2 border-white">
                <span className="text-[11px] sm:text-[12px] text-[#cacacb] block uppercase">
                  Target Goal
                </span>
                <span className="font-campaign text-2xl sm:text-3xl text-white">
                  2026 DISCHARGE
                </span>
                <span className="text-[10px] sm:text-[11px] text-white/60 block mt-0.5">
                  풀스택 개발자 취업
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            7. PDP INFORMATION ACCORDION ROWS (pdp-disclosure-row)
        ========================================================================= */}
        <section id="specifications" className="py-4 sm:py-6 mb-12 sm:mb-16 max-w-4xl mx-auto">
          <div className="mb-4 sm:mb-6">
            <span className="text-[12px] sm:text-[14px] font-medium text-[#707072] uppercase tracking-wider block mb-1">
              Specifications
            </span>
            <h2 className="text-[24px] sm:text-[28px] font-medium text-[#111111]">
              PRODUCT DETAILS & DISCLOSURES
            </h2>
          </div>

          <div className="divide-y divide-[#cacacb] border-y border-[#cacacb]">
            {/* ROW 1: STATUS & BIO */}
            <div className="py-5 sm:py-6">
              <button
                onClick={() => toggleAccordion("status")}
                className="w-full flex items-center justify-between text-left group min-h-[44px]"
              >
                <span className="text-[16px] sm:text-[18px] font-medium text-[#111111] group-hover:text-[#707072] transition-colors">
                  Developer Identity & Mission
                </span>
                {openAccordion === "status" ? (
                  <ChevronDown className="w-5 h-5 text-[#111111] flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-[#111111] flex-shrink-0" />
                )}
              </button>

              {openAccordion === "status" && (
                <div className="pt-3 sm:pt-4 text-[14px] sm:text-[15px] text-[#39393b] leading-relaxed space-y-2">
                  <p>
                    <strong>소개:</strong> &ldquo;전역을 준비하는 코딩러&rdquo;
                  </p>
                  <p>
                    <strong>신분:</strong> 대한민국 육군 국군장병
                  </p>
                  <p>
                    <strong>목표:</strong> 군 복무 중 꾸준한 바이브 코딩 학습과
                    실전 웹 프로젝트 빌딩을 통해 2026년 전역과 동시에 뛰어난
                    개발자로 도약하는 것을 목표로 합니다.
                  </p>
                </div>
              )}
            </div>

            {/* ROW 2: TECH SPECIFICATIONS */}
            <div className="py-5 sm:py-6">
              <button
                onClick={() => toggleAccordion("tech")}
                className="w-full flex items-center justify-between text-left group min-h-[44px]"
              >
                <span className="text-[16px] sm:text-[18px] font-medium text-[#111111] group-hover:text-[#707072] transition-colors">
                  Technical Specifications & Frameworks
                </span>
                {openAccordion === "tech" ? (
                  <ChevronDown className="w-5 h-5 text-[#111111] flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-[#111111] flex-shrink-0" />
                )}
              </button>

              {openAccordion === "tech" && (
                <div className="pt-3 sm:pt-4 text-[14px] sm:text-[15px] text-[#39393b] leading-relaxed space-y-2">
                  <ul className="list-disc pl-5 space-y-1">
                    <li>
                      <strong>Frontend:</strong> Next.js 15 (App Router), React
                      19, TypeScript
                    </li>
                    <li>
                      <strong>Styling:</strong> Tailwind CSS, Nike Commerce
                      Design System tokens
                    </li>
                    <li>
                      <strong>Tools:</strong> Git, GitHub Actions, Vercel
                      Deployment
                    </li>
                    <li>
                      <strong>Methodology:</strong> Vibe Coding, AI-augmented
                      development
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* ROW 3: COLLABORATION & CONTACT */}
            <div className="py-5 sm:py-6">
              <button
                onClick={() => toggleAccordion("collab")}
                className="w-full flex items-center justify-between text-left group min-h-[44px]"
              >
                <span className="text-[16px] sm:text-[18px] font-medium text-[#111111] group-hover:text-[#707072] transition-colors">
                  Shipping, Collaboration & Inquiries
                </span>
                {openAccordion === "collab" ? (
                  <ChevronDown className="w-5 h-5 text-[#111111] flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-[#111111] flex-shrink-0" />
                )}
              </button>

              {openAccordion === "collab" && (
                <div className="pt-3 sm:pt-4 text-[14px] sm:text-[15px] text-[#39393b] leading-relaxed space-y-2">
                  <p>
                    언제든 프로젝트 협업이나 기술적인 질문, 커피챗 제안을 환영합니다.
                  </p>
                  <p>
                    <strong>이메일:</strong> contact@example.com (24시간 내 회신)
                  </p>
                  <p>
                    <strong>저장소:</strong>{" "}
                    <a
                      href="https://github.com/sonseongu234"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline font-medium text-[#111111]"
                    >
                      github.com/sonseongu234
                    </a>
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          8. NIKE GLOBAL FOOTER (footer: 1px hairline top divider, 4 columns, 9px utility)
      ========================================================================= */}
      <footer className="w-full border-t border-[#cacacb] bg-white pt-8 sm:pt-12 pb-8 px-4 sm:px-8 lg:px-12 text-[#111111]">
        <div className="max-w-[1440px] mx-auto">
          {/* FOUR COLUMNS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div>
              <h4 className="font-campaign text-base sm:text-lg uppercase tracking-wider text-[#111111] mb-2 sm:mb-3">
                RESOURCES
              </h4>
              <ul className="space-y-2 text-[13px] sm:text-[14px] font-medium text-[#707072]">
                <li>
                  <a href="#featured-projects" className="hover:text-[#111111]">
                    Featured Projects
                  </a>
                </li>
                <li>
                  <a href="https://velog.io" className="hover:text-[#111111]">
                    Study Dev Log
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/sonseongu234"
                    className="hover:text-[#111111]"
                  >
                    GitHub Repositories
                  </a>
                </li>
                <li>
                  <a href="#membership" className="hover:text-[#111111]">
                    Developer Membership
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-campaign text-base sm:text-lg uppercase tracking-wider text-[#111111] mb-2 sm:mb-3">
                HELP & SUPPORT
              </h4>
              <ul className="space-y-2 text-[13px] sm:text-[14px] font-medium text-[#707072]">
                <li>
                  <a
                    href="mailto:contact@example.com"
                    className="hover:text-[#111111]"
                  >
                    Contact Seongwoo
                  </a>
                </li>
                <li>
                  <a href="#specifications" className="hover:text-[#111111]">
                    Disclosures & Specs
                  </a>
                </li>
                <li>
                  <button onClick={handleCopy} className="hover:text-[#111111]">
                    Copy Direct Email
                  </button>
                </li>
                <li>
                  <a href="#capabilities" className="hover:text-[#111111]">
                    System Architecture
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-campaign text-base sm:text-lg uppercase tracking-wider text-[#111111] mb-2 sm:mb-3">
                ABOUT SEONGWOO
              </h4>
              <ul className="space-y-2 text-[13px] sm:text-[14px] font-medium text-[#707072]">
                <li>
                  <span className="text-[#39393b]">전역을 준비하는 코딩러</span>
                </li>
                <li>
                  <span>대한민국 육군 복무</span>
                </li>
                <li>
                  <span>바이브 코딩 & 풀스택</span>
                </li>
                <li>
                  <span>2026 Discharge Target</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-campaign text-base sm:text-lg uppercase tracking-wider text-[#111111] mb-2 sm:mb-3">
                COMMERCE SYSTEM
              </h4>
              <ul className="space-y-2 text-[13px] sm:text-[14px] font-medium text-[#707072]">
                <li>
                  <span>Nike Design System Specs</span>
                </li>
                <li>
                  <span>Next.js 15 App Router</span>
                </li>
                <li>
                  <span>Tailwind CSS Token Fidelity</span>
                </li>
                <li>
                  <span>MIT License Open Source</span>
                </li>
              </ul>
            </div>
          </div>

          {/* DIVIDER LINE */}
          <div className="h-[1px] bg-[#e5e5e5] mb-5 sm:mb-6"></div>

          {/* BOTTOM UTILITY / FINE PRINT ROW */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 text-[10px] sm:text-[9px] font-medium text-[#707072] uppercase tracking-wider">
            <div className="flex items-center gap-2">
              <span className="text-[#111111] font-semibold">
                대한민국 (KOREA)
              </span>
              <span>·</span>
              <span>
                © {new Date().getFullYear()} SON SEONG WOO. ALL RIGHTS RESERVED.
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              <span>NIKE EDITORIAL COMMERCE SYSTEM</span>
              <span>GUIDES</span>
              <span>TERMS OF SALE</span>
              <span>PRIVACY POLICY</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
