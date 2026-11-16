"use client";

import React from "react";
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
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export interface PublicLinkData {
  id: string;
  title: string;
  description?: string;
  url: string;
  icon?: string;
  badge?: string;
  category?: string;
  isActive?: boolean;
}

interface PublicLinkCardProps {
  link: PublicLinkData;
  index: number;
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

export function PublicLinkCard({ link, index }: PublicLinkCardProps) {
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

  return (
    <a
      href={link.url}
      target={isEmail ? undefined : "_blank"}
      rel={isEmail ? undefined : "noopener noreferrer"}
      className="block group select-none active:scale-[0.99] transition-transform duration-150"
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <Card className="relative w-full p-4 sm:p-5 flex items-center justify-between gap-4 bg-white hover:bg-[#fafafa] border border-[#e5e5e5] hover:border-[#111111] rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] group-hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-all">
        {/* LEFT: Leading Stage Circle + Text */}
        <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 flex-1">
          {/* 44px circular graphic container on soft-cloud (#f5f5f5) */}
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
            </div>

            {link.description && (
              <p className="text-[12px] sm:text-[13px] text-[#707072] mt-1 line-clamp-1 font-normal leading-snug">
                {link.description}
              </p>
            )}
          </div>
        </div>

        {/* RIGHT: Action Circular Button Indicator */}
        <div className="flex items-center flex-shrink-0 pl-1">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#f5f5f5] text-[#111111] border border-[#e5e5e5] group-hover:bg-[#111111] group-hover:text-white group-hover:border-[#111111] flex items-center justify-center transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2]" />
          </div>
        </div>
      </Card>
    </a>
  );
}
