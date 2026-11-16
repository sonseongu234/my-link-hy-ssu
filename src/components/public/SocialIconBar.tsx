"use client";

import React from "react";
import {
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  Github,
  Mail,
  Music,
  Globe,
} from "lucide-react";

export interface SocialLink {
  platform: "instagram" | "youtube" | "tiktok" | "twitter" | "facebook" | "github" | "email" | "website";
  url: string;
  label?: string;
}

interface SocialIconBarProps {
  socials: SocialLink[];
}

const ICON_MAP: Record<string, React.ReactNode> = {
  instagram: <Instagram className="w-5 h-5 text-[#111111]" />,
  youtube: <Youtube className="w-5 h-5 text-[#111111]" />,
  tiktok: <Music className="w-5 h-5 text-[#111111]" />,
  twitter: <Twitter className="w-5 h-5 text-[#111111]" />,
  facebook: <Facebook className="w-5 h-5 text-[#111111]" />,
  github: <Github className="w-5 h-5 text-[#111111]" />,
  email: <Mail className="w-5 h-5 text-[#111111]" />,
  website: <Globe className="w-5 h-5 text-[#111111]" />,
};

export function SocialIconBar({ socials }: SocialIconBarProps) {
  if (!socials || socials.length === 0) return null;

  return (
    <div className="flex items-center justify-center gap-2.5 sm:gap-3 flex-wrap my-4">
      {socials.slice(0, 7).map((item, index) => {
        const icon = ICON_MAP[item.platform] || <Globe className="w-5 h-5 text-[#111111]" />;
        const isEmail = item.platform === "email" || item.url.startsWith("mailto:");

        return (
          <a
            key={index}
            href={isEmail && !item.url.startsWith("mailto:") ? `mailto:${item.url}` : item.url}
            target={isEmail ? undefined : "_blank"}
            rel={isEmail ? undefined : "noopener noreferrer"}
            aria-label={item.label || item.platform}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#f5f5f5] hover:bg-[#111111] hover:text-white border border-[#cacacb] hover:border-[#111111] flex items-center justify-center transition-all duration-200 active:scale-95 shadow-sm group [&_svg]:hover:text-white"
            title={item.label || item.platform}
          >
            {icon}
          </a>
        );
      })}
    </div>
  );
}
