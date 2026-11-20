"use client";

import React, { useState, useMemo, useEffect } from "react";
import { SocialIconBar, SocialLink } from "./SocialIconBar";
import { PublicLinkCard, PublicLinkData } from "./PublicLinkCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { AddLinkDialog } from "@/components/dashboard/AddLinkDialog";
import { subscribeToLinks } from "@/services/linkService";
import {
  Share2,
  Check,
  Search,
  Heart,
  X,
  Link as LinkIcon,
  Copy,
  Plus,
  ArrowUpDown,
} from "lucide-react";

export interface PublicProfileData {
  username: string;
  displayName: string;
  bio: string;
  photoURL: string;
  socials: SocialLink[];
  links: PublicLinkData[];
}

interface PublicProfileViewProps {
  initialProfile?: PublicProfileData;
}

const DEFAULT_PROFILE: PublicProfileData = {
  username: "sonseongu234",
  displayName: "손성우 (Son Seongu)",
  bio: "국방의 의무와 코딩을 병행하며 매일 한 걸음씩 완성해 나가는 손성우의 바이브 코딩 & 풀스택 포트폴리오입니다 ✨",
  photoURL:
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
  socials: [
    { platform: "github", url: "https://github.com/sonseongu234", label: "GitHub" },
    { platform: "instagram", url: "https://instagram.com", label: "Instagram" },
    { platform: "youtube", url: "https://youtube.com", label: "YouTube" },
    { platform: "twitter", url: "https://x.com", label: "X (Twitter)" },
    { platform: "email", url: "mailto:contact@example.com", label: "Email" },
  ],
  links: [
    {
      id: "github",
      title: "GitHub / my-link-hy-ssu",
      description: "오픈소스 기여 및 최신 웹 아키텍처 토이 프로젝트 저장소",
      url: "https://github.com/sonseongu234",
      icon: "github",
      badge: "JUST IN",
      category: "repo",
    },
    {
      id: "my-link-repo",
      title: "My Link Project",
      description: "Nike Commerce 스타일의 Link-in-Bio 웹 애플리케이션",
      url: "https://github.com/sonseongu234/my-link-hy-ssu",
      icon: "code",
      badge: "ACTIVE",
      category: "repo",
    },
    {
      id: "velog",
      title: "Velog 기술 블로그",
      description: "프론트엔드 아키텍처, Next.js 15, 성능 최적화 학습 기록",
      url: "https://velog.io",
      icon: "book-open",
      badge: "WEEKLY",
      category: "blog",
    },
    {
      id: "portfolio",
      title: "인터랙티브 포트폴리오",
      description: "3D Canvas와 인터랙티브 인터페이스를 담은 작업물 쇼케이스",
      url: "https://portfolio.example.com",
      icon: "globe",
      badge: "FEATURED",
      category: "career",
    },
    {
      id: "resume",
      title: "경력 기술서 / 이력서",
      description: "학력, 업무 경험, 기술 스택 및 프로젝트 성과 상세 정리",
      url: "https://notion.so/resume-sample",
      icon: "briefcase",
      badge: "NOTION",
      category: "career",
    },
    {
      id: "ai-code-reviewer",
      title: "AI 코드 리뷰 도구",
      description: "LLM 기반 자동 PR 피드백 및 코드 품질 분석 자동화 봇",
      url: "https://github.com/sonseongu234",
      icon: "sparkles",
      badge: "v1.2",
      category: "repo",
    },
    {
      id: "linkedin",
      title: "LinkedIn 커리어 프로필",
      description: "비즈니스 네트워킹 및 채용·커리어 연결",
      url: "https://linkedin.com/in/example",
      icon: "linkedin",
      badge: "CONNECT",
      category: "contact",
    },
    {
      id: "contact-email",
      title: "이메일 1:1 다이렉트 문의",
      description: "프로젝트 협업, 외주 개발 및 채용 관련 1:1 문의",
      url: "mailto:contact@example.com",
      icon: "mail",
      badge: "OPEN TO WORK",
      category: "contact",
    },
  ],
};

const CATEGORIES = [
  { id: "all", label: "All Items" },
  { id: "repo", label: "Repositories" },
  { id: "blog", label: "Dev Log" },
  { id: "career", label: "Career & Projects" },
  { id: "contact", label: "Contact" },
];

export function PublicProfileView({
  initialProfile = DEFAULT_PROFILE,
}: PublicProfileViewProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
  const [cheerCount, setCheerCount] = useState<number>(128);
  const [hasCheered, setHasCheered] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<"latest" | "default">("latest");

  // ── 링크 상태 관리 (Firestore users/anonymous/links 실시간 동기화) ──
  const [localLinks, setLocalLinks] = useState<PublicLinkData[]>(initialProfile.links);
  const [addLinkOpen, setAddLinkOpen] = useState<boolean>(false);

  useEffect(() => {
    // Firestore users/anonymous/links 실시간 구독
    const unsubscribe = subscribeToLinks(
      (firestoreLinks) => {
        if (firestoreLinks.length > 0) {
          setLocalLinks(() => {
            // Firestore에 저장된 링크를 우선 배치하고, 중복되지 않는 기본 링크를 뒤에 유지
            const remainingInitial = initialProfile.links.filter(
              (init) => !firestoreLinks.some((f) => f.id === init.id)
            );
            return [...firestoreLinks, ...remainingInitial];
          });
        }
      },
      (error) => {
        console.error("Firestore links 실시간 동기화 실패:", error);
      }
    );

    return () => unsubscribe();
  }, [initialProfile.links]);

  const handleAddLink = (newLink: PublicLinkData) => {
    setLocalLinks((prev) => {
      if (prev.some((l) => l.id === newLink.id)) return prev;
      return [newLink, ...prev];
    });
  };

  // Filter & Sort links based on category, search query & createdAt
  const filteredLinks = useMemo(() => {
    const list = localLinks.filter((link) => {
      const matchesCategory =
        activeCategory === "all" || link.category === activeCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        link.title.toLowerCase().includes(query) ||
        (link.description && link.description.toLowerCase().includes(query)) ||
        (link.badge && link.badge.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });

    if (sortBy === "latest") {
      // createdAt 기준 최신순 정렬
      return [...list].sort((a, b) => {
        const timeA = typeof a.createdAt === "number"
          ? a.createdAt
          : a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const timeB = typeof b.createdAt === "number"
          ? b.createdAt
          : b.createdAt ? new Date(b.createdAt).getTime() : 0;

        return timeB - timeA;
      });
    }

    return list;
  }, [localLinks, activeCategory, searchQuery, sortBy]);

  const handleCopyUrl = async () => {
    try {
      if (typeof window !== "undefined") {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedUrl(true);
        setTimeout(() => setCopiedUrl(false), 2000);
      }
    } catch {
      // Fallback
    }
  };

  const handleCheer = () => {
    setCheerCount((c) => c + 1);
    setHasCheered(true);
    setTimeout(() => setHasCheered(false), 300);
  };

  return (
    <div className="min-h-screen bg-white text-[#111111] flex flex-col justify-between selection:bg-[#111111] selection:text-white">
      {/* =========================================================================
          1. UTILITY BAR (DESIGN.md: #f5f5f5, 36px height, caption-sm 12px)
      ========================================================================= */}
      <div className="w-full bg-[#f5f5f5] h-[36px] px-4 sm:px-8 lg:px-12 flex items-center justify-between text-[11px] sm:text-[12px] font-medium text-[#111111] border-b border-[#e5e5e5]">
        <div className="flex items-center gap-2">
          <span className="font-semibold tracking-wider text-[#39393b]">
            ROK ARMY · DEV BATTALION
          </span>
          <span className="text-[#cacacb] hidden xs:inline">|</span>
          <span className="text-[#707072] hidden xs:inline">
            DAILY COMMITS PIPELINE
          </span>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 text-[#707072] flex-shrink-0">
          <button
            onClick={handleCopyUrl}
            className="hover:text-[#111111] transition-colors flex items-center gap-1"
          >
            {copiedUrl ? (
              <span className="text-[#007d48] font-semibold">URL Copied!</span>
            ) : (
              <span>Share Link</span>
            )}
          </button>
          <span>·</span>
          <span className="text-[#111111] font-semibold">2026 D-DAY</span>
        </div>
      </div>

      {/* =========================================================================
          2. NIKE EDITORIAL BRAND HEADER (primary-nav: #ffffff, 60px height)
      ========================================================================= */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#e5e5e5]">
        <div className="max-w-[720px] mx-auto h-[60px] px-4 flex items-center justify-between">
          {/* NIKE SWOOSH + MONOGRAM */}
          <div className="flex items-center gap-2.5">
            <svg
              className="w-11 h-6 text-[#111111] flex-shrink-0"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21.707 5.293c-.27-.27-.69-.33-1.02-.15L3.92 14.18c-1.57.84-2.22 2.68-1.53 4.29.61 1.43 2.05 2.29 3.59 2.29.56 0 1.13-.11 1.68-.35l14.07-6.03c.59-.25.87-.94.62-1.53s-.94-.87-1.53-.62l-14.07 6.03c-.63.27-1.37-.02-1.65-.67-.28-.66.02-1.42.66-1.76L18.47 7.02c.86-.46 1.89-.3 2.58.39.2.2.47.3.74.3.18 0 .37-.05.53-.15.48-.31.62-.95.31-1.43-.24-.37-.58-.65-.92-.84z" />
            </svg>
            <span className="font-campaign text-xl sm:text-2xl tracking-tight uppercase text-[#111111] select-none">
              SON SEONG WOO
            </span>
          </div>

          {/* RIGHT ACTION BUTTONS */}
          <div className="flex items-center gap-2">
            <Button
              variant="nikeSecondary"
              size="sm"
              onClick={handleCheer}
              className={`gap-1.5 active:scale-95 transition-transform ${
                hasCheered ? "scale-90" : ""
              }`}
              title="전역 응원하기"
            >
              <Heart
                className={`w-3.5 h-3.5 ${
                  hasCheered
                    ? "fill-[#d30005] text-[#d30005]"
                    : "text-[#111111]"
                }`}
              />
              <span className="font-semibold text-xs">{cheerCount}</span>
            </Button>

            <Button
              variant="nikePrimary"
              size="sm"
              onClick={handleCopyUrl}
              className="gap-1.5"
            >
              {copiedUrl ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                  <span>복사됨</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5" />
                  <span>공유</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* =========================================================================
          3. MAIN CONTENT: NIKE LINK-IN-BIO STREAM
      ========================================================================= */}
      <main className="w-full max-w-[640px] mx-auto px-4 py-6 flex-1 flex flex-col items-center">
        {/* =========================================================================
            3.1 EDITORIAL CAMPAIGN HERO LOCKUP (DESIGN.md: Futura display in dark stage)
        ========================================================================= */}
        <section className="relative w-full rounded-3xl bg-[#111111] overflow-hidden text-white p-6 sm:p-8 mb-6 shadow-xl">
          {/* Subtle Nike Swoosh Watermark in Background */}
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-10">
            <svg
              className="absolute -right-16 -top-16 w-[360px] h-auto text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M21.707 5.293c-.27-.27-.69-.33-1.02-.15L3.92 14.18c-1.57.84-2.22 2.68-1.53 4.29.61 1.43 2.05 2.29 3.59 2.29.56 0 1.13-.11 1.68-.35l14.07-6.03c.59-.25.87-.94.62-1.53s-.94-.87-1.53-.62l-14.07 6.03c-.63.27-1.37-.02-1.65-.67-.28-.66.02-1.42.66-1.76L18.47 7.02c.86-.46 1.89-.3 2.58.39.2.2.47.3.74.3.18 0 .37-.05.53-.15.48-.31.62-.95.31-1.43-.24-.37-.58-.65-.92-.84z" />
            </svg>
          </div>

          {/* Profile Avatar & Metadata */}
          <div className="relative z-10 flex items-start justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <Avatar className="w-16 h-16 sm:w-20 sm:h-20 border-2 border-white/80 shadow-md">
                <AvatarImage
                  src={initialProfile.photoURL}
                  alt={initialProfile.displayName}
                />
                <AvatarFallback>SW</AvatarFallback>
              </Avatar>

              <div>
                <Badge variant="member" className="mb-1">
                  NIKE LINK MEMBER
                </Badge>
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
                  {initialProfile.displayName}
                </h1>
                <p className="text-xs sm:text-sm text-white/70 font-mono mt-0.5">
                  @{initialProfile.username}
                </p>
              </div>
            </div>

            <span className="hidden sm:inline-block text-[10px] font-mono uppercase tracking-widest text-white/50 border border-white/20 px-2.5 py-1 rounded-full">
              SPEC: NIKE 2.0
            </span>
          </div>

          {/* Big Editorial Display Headline */}
          <div className="relative z-10 mt-6 pt-4 border-t border-white/10">
            <h2 className="font-campaign text-4xl xs:text-5xl sm:text-6xl uppercase tracking-tight text-white leading-[0.92]">
              PREPARING FOR
              <br />
              DISCHARGE.
            </h2>

            <p className="text-xs sm:text-sm text-white/80 mt-3 leading-relaxed max-w-lg">
              {initialProfile.bio}
            </p>

            {/* Quick CTAs */}
            <div className="flex items-center gap-2.5 mt-5">
              <Button
                variant="default"
                size="sm"
                asChild
                className="bg-white text-[#111111] hover:bg-[#f5f5f5]"
              >
                <a
                  href="https://github.com/sonseongu234"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub Explore
                </a>
              </Button>
              <Button
                variant="nikeSecondary"
                size="sm"
                asChild
                className="bg-white/15 text-white border-white/25 hover:bg-white/25"
              >
                <a href="mailto:contact@example.com">Contact Developer</a>
              </Button>
            </div>
          </div>
        </section>

        {/* =========================================================================
            3.2 SOCIAL CHANNELS BAR (PRD 4.2.2)
        ========================================================================= */}
        <div className="w-full flex flex-col items-center mb-6">
          <span className="text-[11px] font-bold tracking-wider text-[#707072] uppercase mb-1">
            Official Channels
          </span>
          <SocialIconBar socials={initialProfile.socials} />
        </div>

        {/* =========================================================================
            3.3 SEARCH & CATEGORY PILL FILTER (DESIGN.md: Pill geometry)
        ========================================================================= */}
        <section className="w-full space-y-3 mb-5">
          <div className="flex items-center justify-between">
            <span className="text-[12px] sm:text-[13px] font-semibold tracking-wider text-[#111111] uppercase">
              Official Directory
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-[#707072] font-mono hidden xs:inline">
                {filteredLinks.length} Items
              </span>
              {/* ── 최신순 정렬 토글 버튼 ── */}
              <Button
                variant={sortBy === "latest" ? "nikePrimary" : "nikeOutline"}
                size="sm"
                onClick={() => setSortBy((prev) => (prev === "latest" ? "default" : "latest"))}
                className="gap-1.5 h-8 px-2.5 text-[11px]"
                title={
                  sortBy === "latest"
                    ? "현재: createdAt 최신순 정렬 중 (클릭 시 기본순)"
                    : "현재: 기본순 정렬 중 (클릭 시 최신순)"
                }
              >
                <ArrowUpDown className="w-3 h-3" />
                <span>{sortBy === "latest" ? "최신순" : "기본순"}</span>
              </Button>
              {/* ── 링크 추가 버튼 ── */}
              <Button
                variant="nikePrimary"
                size="sm"
                onClick={() => setAddLinkOpen(true)}
                className="gap-1.5 h-8 px-3 text-[11px]"
              >
                <Plus className="w-3.5 h-3.5" />
                링크 추가
              </Button>
            </div>
          </div>

          {/* Search Pill Input */}
          <div className="relative w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#707072]" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search repositories, blogs, resume..."
              className="pl-11 pr-10 h-11 text-sm bg-[#f5f5f5] hover:bg-[#ebebeb] focus-visible:bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#707072] hover:text-[#111111]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Horizontal Category Pill Filter Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              const count = cat.id === "all"
                ? localLinks.length
                : localLinks.filter((l) => l.category === cat.id).length;
              return (
                <Button
                  key={cat.id}
                  variant={isSelected ? "nikePrimary" : "nikeOutline"}
                  size="sm"
                  onClick={() => setActiveCategory(cat.id)}
                  className="rounded-full text-xs font-medium whitespace-nowrap h-9 px-4 flex-shrink-0"
                >
                  {cat.label} ({count})
                </Button>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            3.4 PRODUCT/LINK CARD STREAM (shadcn/ui Card + Badge)
        ========================================================================= */}
        <section className="w-full flex flex-col gap-3">
          {filteredLinks.length > 0 ? (
            filteredLinks.map((link, index) => (
              <PublicLinkCard key={link.id} link={link} index={index} />
            ))
          ) : (
            <div className="w-full py-12 px-4 rounded-2xl text-center bg-[#f5f5f5] border border-dashed border-[#cacacb] flex flex-col items-center justify-center gap-2">
              <LinkIcon className="w-8 h-8 text-[#707072] mb-1" />
              <p className="font-semibold text-sm text-[#111111]">
                검색 결과가 없습니다.
              </p>
              <p className="text-xs text-[#707072]">
                다른 키워드로 검색하거나 카테고리 필터를 변경해 보세요.
              </p>
              {searchQuery && (
                <Button
                  variant="nikeOutline"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="mt-2 text-xs"
                >
                  검색 초기화
                </Button>
              )}
            </div>
          )}
        </section>
      </main>

      {/* =========================================================================
          4. FOOTER (DESIGN.md: Minimal Athletic Monochrome Footer)
      ========================================================================= */}
      <footer className="w-full py-8 px-4 bg-white border-t border-[#e5e5e5] text-center text-xs text-[#707072] flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-2">
          <svg
            className="w-8 h-4 text-[#111111]"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M21.707 5.293c-.27-.27-.69-.33-1.02-.15L3.92 14.18c-1.57.84-2.22 2.68-1.53 4.29.61 1.43 2.05 2.29 3.59 2.29.56 0 1.13-.11 1.68-.35l14.07-6.03c.59-.25.87-.94.62-1.53s-.94-.87-1.53-.62l-14.07 6.03c-.63.27-1.37-.02-1.65-.67-.28-.66.02-1.42.66-1.76L18.47 7.02c.86-.46 1.89-.3 2.58.39.2.2.47.3.74.3.18 0 .37-.05.53-.15.48-.31.62-.95.31-1.43-.24-.37-.58-.65-.92-.84z" />
          </svg>
          <span className="font-campaign text-lg tracking-tight uppercase text-[#111111]">
            JUST DO IT. DAILY COMMITS.
          </span>
        </div>
        <p className="text-[11px] text-[#707072]">
          © 2026 MYLINK x SON SEONG WOO. ATHLETIC COMMERCE EDITORIAL SYSTEM.
        </p>
      </footer>

      {/* =========================================================================
          5. 링크 추가 다이얼로그
      ========================================================================= */}
      <AddLinkDialog
        open={addLinkOpen}
        onOpenChange={setAddLinkOpen}
        onAddLink={handleAddLink}
        currentLinkCount={localLinks.length}
      />
    </div>
  );
}
