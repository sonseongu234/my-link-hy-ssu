"use client";

import React from "react";
import {
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  Github,
  Mail,
  Globe,
  Music,
} from "lucide-react";

const PLATFORM_META: Record<
  string,
  { label: string; icon: React.ReactNode }
> = {
  instagram: {
    label: "Instagram",
    icon: <Instagram className="w-5 h-5" />,
  },
  youtube: {
    label: "YouTube",
    icon: <Youtube className="w-5 h-5" />,
  },
  tiktok: {
    label: "TikTok",
    icon: <Music className="w-5 h-5" />,
  },
  twitter: {
    label: "X (Twitter)",
    icon: <Twitter className="w-5 h-5" />,
  },
  facebook: {
    label: "Facebook",
    icon: <Facebook className="w-5 h-5" />,
  },
  github: {
    label: "GitHub",
    icon: <Github className="w-5 h-5" />,
  },
  email: {
    label: "Email",
    icon: <Mail className="w-5 h-5" />,
  },
  website: {
    label: "Website",
    icon: <Globe className="w-5 h-5" />,
  },
};

export const PLATFORMS = Object.keys(PLATFORM_META);

export function getPlatformMeta(platform: string) {
  return PLATFORM_META[platform] || { label: platform, icon: <Globe className="w-5 h-5" /> };
}
