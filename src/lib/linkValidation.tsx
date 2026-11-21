import React from "react";
import {
  Globe,
  Github,
  Linkedin,
  Mail,
  BookOpen,
  Briefcase,
  Sparkles,
  Code2,
  Layers,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================
// 상수 & 제한값
// ============================================================
export const MAX_LINKS = 20;

export const LIMITS = {
  title: 40,
  description: 100,
  badge: 15,
} as const;

export interface IconOption {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const ICON_OPTIONS: IconOption[] = [
  { key: "globe",     label: "Globe",     icon: Globe },
  { key: "github",    label: "GitHub",    icon: Github },
  { key: "linkedin",  label: "LinkedIn",  icon: Linkedin },
  { key: "mail",      label: "Email",     icon: Mail },
  { key: "book-open", label: "Blog",      icon: BookOpen },
  { key: "briefcase", label: "Career",    icon: Briefcase },
  { key: "sparkles",  label: "AI/Magic",  icon: Sparkles },
  { key: "code",      label: "Code",      icon: Code2 },
  { key: "layers",    label: "Layers",    icon: Layers },
];

export const CATEGORY_OPTIONS = [
  { key: "repo",    label: "🗂 Repository" },
  { key: "blog",    label: "📝 Dev Log" },
  { key: "career",  label: "💼 Career" },
  { key: "contact", label: "📬 Contact" },
];

export interface FormErrors {
  title?: string;
  url?: string;
  description?: string;
  badge?: string;
}

// ============================================================
// 검증 함수 (추가 / 수정 공통)
// ============================================================
export function validateTitle(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "링크 제목을 입력해 주세요.";
  if (trimmed.length > LIMITS.title)
    return `제목은 최대 ${LIMITS.title}자까지 입력할 수 있습니다.`;
  return undefined;
}

export function validateUrl(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "URL을 입력해 주세요.";

  // mailto: 처리
  if (trimmed.startsWith("mailto:")) {
    const emailPart = trimmed.slice("mailto:".length).trim();
    if (!emailPart) return "이메일 주소를 입력해 주세요. (예: mailto:your@email.com)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailPart))
      return "올바른 이메일 형식이 아닙니다. (예: mailto:your@email.com)";
    return undefined;
  }

  // 프로토콜 검사
  if (!/^https?:\/\//i.test(trimmed) && !trimmed.startsWith("mailto:")) {
    return "URL은 https:// 또는 http://로 시작해야 합니다.";
  }

  try {
    const parsed = new URL(trimmed);
    if (!["http:", "https:"].includes(parsed.protocol))
      return "URL은 http:// 또는 https://로 시작해야 합니다.";
    if (!parsed.hostname || parsed.hostname.length < 2)
      return "올바른 도메인을 포함한 URL을 입력해 주세요.";
  } catch {
    return "올바른 URL 형식을 입력해 주세요. (예: https://example.com)";
  }

  return undefined;
}

export function validateDescription(value: string): string | undefined {
  if (value.trim().length > LIMITS.description)
    return `설명은 최대 ${LIMITS.description}자까지 입력할 수 있습니다.`;
  return undefined;
}

export function validateBadge(value: string): string | undefined {
  if (value.trim().length > LIMITS.badge)
    return `뱃지는 최대 ${LIMITS.badge}자까지 입력할 수 있습니다.`;
  return undefined;
}

export function validateAll(form: {
  title: string;
  url: string;
  description: string;
  badge: string;
}): FormErrors {
  return {
    title: validateTitle(form.title),
    url: validateUrl(form.url),
    description: validateDescription(form.description),
    badge: validateBadge(form.badge),
  };
}

// ============================================================
// UI 도우미 컴포넌트
// ============================================================
export function CharCount({
  current,
  max,
  hasError,
}: {
  current: number;
  max: number;
  hasError?: boolean;
}) {
  const isNearLimit = current >= max * 0.85;
  return (
    <span
      className={cn(
        "text-[11px] tabular-nums transition-colors",
        hasError
          ? "text-[#d30005] font-semibold"
          : isNearLimit
          ? "text-[#f97316] font-medium"
          : "text-[#9e9ea0]"
      )}
    >
      {current}/{max}
    </span>
  );
}

export function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-[11px] text-[#d30005] flex items-center gap-1 mt-0.5">
      <AlertCircle className="w-3 h-3 flex-shrink-0" />
      {message}
    </p>
  );
}
