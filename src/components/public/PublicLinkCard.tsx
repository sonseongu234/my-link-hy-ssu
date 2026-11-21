"use client";

import React, { useState } from "react";
import {
  ExternalLink,
  Code2,
  BookOpen,
  Mail,
  Briefcase,
  Globe,
  Sparkles,
  Github,
  Linkedin,
  Layers,
  ArrowUpRight,
  Pencil,
  Trash2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { InlineEditLinkForm } from "./InlineEditLinkForm";

export interface PublicLinkData {
  id: string;
  title: string;
  description?: string;
  url: string;
  icon?: string;
  badge?: string;
  category?: string;
  isActive?: boolean;
  createdAt?: number | string | Date;
}

interface PublicLinkCardProps {
  link: PublicLinkData;
  index: number;
  onUpdate?: (updated: PublicLinkData) => void;
  onDeleteClick?: (link: PublicLinkData) => void;
}

const ICON_COMPONENTS: Record<string, React.ReactNode> = {
  github: <Github className="w-5 h-5 text-[#111111]" />,
  code: <Code2 className="w-5 h-5 text-[#111111]" />,
  "book-open": <BookOpen className="w-5 h-5 text-[#111111]" />,
  book: <BookOpen className="w-5 h-5 text-[#111111]" />,
  globe: <Globe className="w-5 h-5 text-[#111111]" />,
  briefcase: <Briefcase className="w-5 h-5 text-[#111111]" />,
  sparkles: <Sparkles className="w-5 h-5 text-[#111111]" />,
  linkedin: <Linkedin className="w-5 h-5 text-[#111111]" />,
  mail: <Mail className="w-5 h-5 text-[#111111]" />,
  layers: <Layers className="w-5 h-5 text-[#111111]" />,
};

function formatCreatedAt(val?: number | string | Date): string | null {
  if (!val) return null;
  const time =
    typeof val === "number"
      ? val
      : typeof val === "string"
      ? new Date(val).getTime()
      : val.getTime();
  if (!time || isNaN(time)) return null;

  const now = Date.now();
  const diffSec = Math.floor((now - time) / 1000);
  if (diffSec < 60) return "방금 전";
  if (diffSec < 3600) return `${Math.floor(diffSec / 60)}분 전`;
  if (diffSec < 86400) return `${Math.floor(diffSec / 3600)}시간 전`;
  const d = new Date(time);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}

export function PublicLinkCard({
  link,
  index,
  onUpdate,
  onDeleteClick,
}: PublicLinkCardProps) {
  const [isEditing, setIsEditing] = useState(false);

  // 인라인 수정 모드일 때 인라인 편집 폼 렌더링
  if (isEditing) {
    return (
      <div style={{ animationDelay: `${index * 40}ms` }} className="w-full">
        <InlineEditLinkForm
          link={link}
          onCancel={() => setIsEditing(false)}
          onSave={(updated) => {
            setIsEditing(false);
            onUpdate?.(updated);
          }}
        />
      </div>
    );
  }

  const formattedDate = formatCreatedAt(link.createdAt);
  const icon = link.icon ? (
    ICON_COMPONENTS[link.icon] || <Globe className="w-5 h-5 text-[#111111]" />
  ) : (
    <ExternalLink className="w-5 h-5 text-[#111111]" />
  );

  const isEmail = link.url.startsWith("mailto:");

  // Map badge string to Nike Design System Badge variant
  const getBadgeVariant = (badgeText?: string) => {
    if (!badgeText) return "secondary";
    const upper = badgeText.toUpperCase();
    if (upper.includes("JUST IN") || upper.includes("HOT") || upper.includes("NEW")) {
      return "justIn";
    }
    if (upper.includes("MEMBER") || upper.includes("EXCLUSIVE") || upper.includes("ACTIVE")) {
      return "member";
    }
    if (upper.includes("WORK") || upper.includes("CAREER")) {
      return "success";
    }
    return "secondary";
  };

  const handleCardClick = () => {
    if (typeof window !== "undefined") {
      if (isEmail) {
        window.location.href = link.url;
      } else {
        window.open(link.url, "_blank", "noopener,noreferrer");
      }
    }
  };

  return (
    <div
      className="block group select-none transition-all duration-150 w-full"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <Card
        onClick={handleCardClick}
        className="relative w-full p-4 sm:p-5 flex items-center justify-between gap-3 sm:gap-4 bg-white hover:bg-[#fafafa] border border-[#e5e5e5] hover:border-[#111111] rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all cursor-pointer"
      >
        {/* LEFT: Leading Stage Circle + Text */}
        <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
          {/* 44px circular graphic container */}
          <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#f5f5f5] border border-[#cacacb] flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:border-[#111111] transition-all">
            {icon}
          </div>

          {/* Title & Description */}
          <div className="flex flex-col min-w-0 text-left">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-[15px] sm:text-[16px] text-[#111111] truncate tracking-tight group-hover:text-black">
                {link.title}
              </h3>

              {link.badge && (
                <Badge
                  variant={getBadgeVariant(link.badge)}
                  className="text-[10px] sm:text-[11px] font-bold"
                >
                  {link.badge}
                </Badge>
              )}

              {formattedDate && (
                <span className="text-[10px] sm:text-[11px] text-[#8e8e93] font-mono tracking-tight ml-auto sm:ml-0">
                  {formattedDate}
                </span>
              )}
            </div>

            {link.description && (
              <p className="text-[12px] sm:text-[13px] text-[#707072] mt-1 line-clamp-1 font-normal leading-snug">
                {link.description}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT: 수정/삭제 버튼 (항상 표시) + 바로가기 버튼 */}
        <div
          className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0 pl-1"
          onClick={(e) => e.stopPropagation()}
        >
          {/* ── 수정 버튼 (항상 표시됨) ── */}
          <button
            type="button"
            title="링크 수정"
            aria-label="링크 수정"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              setIsEditing(true);
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#f5f5f5] text-[#39393b] hover:bg-[#111111] hover:text-white border border-[#cacacb] hover:border-[#111111] flex items-center justify-center transition-colors active:scale-95"
          >
            <Pencil className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
          </button>

          {/* ── 삭제 버튼 (항상 표시됨) ── */}
          <button
            type="button"
            title="링크 삭제"
            aria-label="링크 삭제"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              onDeleteClick?.(link);
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-red-50 text-[#d30005] hover:bg-[#d30005] hover:text-white border border-red-200 hover:border-[#d30005] flex items-center justify-center transition-colors active:scale-95"
          >
            <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
          </button>

          {/* ── 바로가기 버튼 ── */}
          <button
            type="button"
            title="링크 방문"
            aria-label="링크 방문"
            onClick={(e) => {
              e.stopPropagation();
              handleCardClick();
            }}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#f5f5f5] text-[#111111] border border-[#e5e5e5] group-hover:bg-[#111111] group-hover:text-white group-hover:border-[#111111] flex items-center justify-center transition-all duration-200"
          >
            <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
          </button>
        </div>
      </Card>
    </div>
  );
}
