import React from "react";
import { LinkItem, UserProfile } from "@/types/link";
import { NikeCardItem } from "@/components/ProductCard";
import {
  Code2,
  BookOpen,
  Mail,
  Briefcase,
  Globe,
  Sparkles,
  Github,
  Linkedin,
  Layers,
  Terminal,
  Cpu,
  Bookmark,
} from "lucide-react";

// ============================================================================
// 1. 표준 Link-in-Bio 더미 데이터 (LinkItem & UserProfile 규격)
// ============================================================================

export const DUMMY_PROFILE: UserProfile = {
  name: "손성우 (Son Seongu)",
  handle: "@sonseongu234",
  bio: "풀스택 웹 엔지니어 & UI/UX 아키텍처 연구자. Nike Commerce 디자인 감성과 모던 프론트엔드 기술을 결합합니다.",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80",
  links: [
    {
      id: "link-github",
      title: "GitHub Profile",
      url: "https://github.com/sonseongu234",
      description: "오픈소스 기여 및 최신 웹 아키텍처 토이 프로젝트 저장소",
      icon: "github",
      badge: "Main",
      tag: "Development",
      bgColor: "#111111",
    },
    {
      id: "link-portfolio",
      title: "Interactive Portfolio",
      url: "https://portfolio.example.com",
      description: "인터랙티브 웹 인터페이스와 대표 프로젝트 쇼케이스",
      icon: "globe",
      badge: "Featured",
      tag: "Showcase",
      bgColor: "#1151ff",
    },
    {
      id: "link-velog",
      title: "Velog Tech Log",
      url: "https://velog.io",
      description: "프론트엔드 성능 최적화, Next.js 15, 클린 코드 연재",
      icon: "book",
      badge: "Weekly",
      tag: "Writing",
      bgColor: "#20c997",
    },
    {
      id: "link-resume",
      title: "Career Resume (Notion)",
      url: "https://notion.so/resume-sample",
      description: "학력, 경력 사항, 기술 스택 및 프로젝트 성과 상세 이력서",
      icon: "briefcase",
      badge: "PDF / Notion",
      tag: "Career",
      bgColor: "#39393b",
    },
    {
      id: "link-linkedin",
      title: "LinkedIn Profile",
      url: "https://linkedin.com/in/example",
      description: "비즈니스 네트워크 및 채용/커리어 연결",
      icon: "linkedin",
      tag: "Social",
      bgColor: "#0a66c2",
    },
    {
      id: "link-contact",
      title: "Direct Inquiries",
      url: "mailto:contact@example.com",
      description: "프로젝트 협업, 외주, 기술 멘토링 관련 이메일 문의",
      icon: "mail",
      badge: "Open to Work",
      tag: "Contact",
      bgColor: "#d30005",
    },
  ],
};

// ============================================================================
// 2. 나이키 커머스 테마 전용 더미 데이터 (NikeCardItem & Category 규격)
// ============================================================================

export interface CategorizedNikeItem extends NikeCardItem {
  category: "repo" | "blog" | "career" | "contact";
}

export const DUMMY_FILTER_OPTIONS = [
  { id: "all", label: "All Items (6)" },
  { id: "repo", label: "Repositories (2)" },
  { id: "blog", label: "Dev Log (1)" },
  { id: "career", label: "Career & Projects (2)" },
  { id: "contact", label: "Contact (1)" },
];

export const DUMMY_NIKE_ITEMS: CategorizedNikeItem[] = [
  {
    id: "github-mylink",
    category: "repo",
    title: "GitHub / my-link-hy-ssu",
    subtitle: "Nike Editorial Commerce Style Link-in-Bio",
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
    id: "blog-velog",
    category: "blog",
    title: "Velog / 개발 & 학습 아카이브",
    subtitle: "Frontend Architecture & Problem Solving",
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
          Learning Logs · Deep Dive
        </span>
      </div>
    ),
  },
  {
    id: "portfolio-interactive",
    category: "career",
    title: "Interactive Web Portfolio",
    subtitle: "Selected Works & UI Component Systems",
    url: "https://github.com/sonseongu234",
    badge: "BEST SELLER",
    price: "Live Showcase",
    salePrice: "2026 Edition",
    originalPrice: "Full Spec",
    discountRate: "Online",
    actionText: "Launch Demo",
    swatches: [
      { name: "Electric Blue", color: "#1151ff" },
      { name: "Pure White", color: "#ffffff" },
      { name: "Ash Gray", color: "#4b4b4d" },
    ],
    graphic: (
      <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center border border-[#cacacb] mb-3 group-hover:scale-110 transition-transform">
          <Globe className="w-8 h-8 sm:w-10 sm:h-10 text-[#111111] stroke-[1.75]" />
        </div>
        <span className="font-campaign text-xl sm:text-2xl tracking-tight text-[#111111] uppercase">
          SHOWCASE 03
        </span>
        <span className="text-[11px] sm:text-[12px] font-medium text-[#707072] mt-1">
          3D Canvas · Micro Interactions
        </span>
      </div>
    ),
  },
  {
    id: "project-ai-review",
    category: "repo",
    title: "AI Code Review Assistant",
    subtitle: "Automated PR Feedback with LLM Integration",
    url: "https://github.com/sonseongu234",
    badge: "LIMITED RELEASE",
    price: "Developer Tool",
    salePrice: "v1.2.0 Stable",
    originalPrice: "Open Core",
    discountRate: "Pro",
    actionText: "View Documentation",
    swatches: [
      { name: "Gemini Purple", color: "#7c3aed" },
      { name: "Dark Slate", color: "#1e293b" },
      { name: "Emerald Green", color: "#10b981" },
    ],
    graphic: (
      <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center border border-[#cacacb] mb-3 group-hover:scale-110 transition-transform">
          <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-[#111111] stroke-[1.75]" />
        </div>
        <span className="font-campaign text-xl sm:text-2xl tracking-tight text-[#111111] uppercase">
          AI ENGINE 04
        </span>
        <span className="text-[11px] sm:text-[12px] font-medium text-[#707072] mt-1">
          LLM Workflow · GitHub Actions
        </span>
      </div>
    ),
  },
  {
    id: "resume-career",
    category: "career",
    title: "Curriculum Vitae / Resume",
    subtitle: "Engineering Experience & Technical Skills",
    url: "https://notion.so",
    badge: "VERIFIED",
    price: "Full Profile",
    salePrice: "Updated 2026",
    originalPrice: "Confidential",
    discountRate: "PDF Available",
    actionText: "View Resume",
    swatches: [
      { name: "Minimal Ink", color: "#111111" },
      { name: "Subtle Gray", color: "#9e9ea0" },
      { name: "Bright Clean", color: "#ffffff" },
    ],
    graphic: (
      <div className="w-full h-full flex flex-col items-center justify-center text-center p-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white flex items-center justify-center border border-[#cacacb] mb-3 group-hover:scale-110 transition-transform">
          <Briefcase className="w-8 h-8 sm:w-10 sm:h-10 text-[#111111] stroke-[1.75]" />
        </div>
        <span className="font-campaign text-xl sm:text-2xl tracking-tight text-[#111111] uppercase">
          CREDENTIALS 05
        </span>
        <span className="text-[11px] sm:text-[12px] font-medium text-[#707072] mt-1">
          Career Milestone · Tech Stack
        </span>
      </div>
    ),
  },
  {
    id: "email-contact",
    category: "contact",
    title: "Direct Inquiries / 협업 및 채용 문의",
    subtitle: "Collaboration & Developer Opportunities",
    url: "mailto:contact@example.com",
    badge: "AVAILABLE NOW",
    price: "24h Direct Reply",
    salePrice: "Open to Work",
    originalPrice: "Full-time / Part",
    discountRate: "Ready",
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
          CONNECT 06
        </span>
        <span className="text-[11px] sm:text-[12px] font-medium text-[#707072] mt-1">
          contact@example.com
        </span>
      </div>
    ),
  },
];
