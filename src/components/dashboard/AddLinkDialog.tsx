"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PublicLinkData } from "@/components/public/PublicLinkCard";
import {
  Link as LinkIcon,
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
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ============================================================
// 타입 정의
// ============================================================
interface AddLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddLink: (link: PublicLinkData) => void;
  currentLinkCount: number;
}

// ============================================================
// 아이콘 옵션 목록
// ============================================================
const ICON_OPTIONS = [
  { key: "globe", label: "Globe", icon: Globe },
  { key: "github", label: "GitHub", icon: Github },
  { key: "linkedin", label: "LinkedIn", icon: Linkedin },
  { key: "mail", label: "Email", icon: Mail },
  { key: "book-open", label: "Blog", icon: BookOpen },
  { key: "briefcase", label: "Briefcase", icon: Briefcase },
  { key: "sparkles", label: "AI/Magic", icon: Sparkles },
  { key: "code", label: "Code", icon: Code2 },
  { key: "layers", label: "Layers", icon: Layers },
];

// ============================================================
// 카테고리 옵션
// ============================================================
const CATEGORY_OPTIONS = [
  { key: "repo", label: "🗂 Repository" },
  { key: "blog", label: "📝 Dev Log" },
  { key: "career", label: "💼 Career" },
  { key: "contact", label: "📬 Contact" },
];

// ============================================================
// URL 유효성 검증
// ============================================================
function validateUrl(url: string): string | null {
  if (!url.trim()) return "URL을 입력해 주세요.";
  if (url.startsWith("mailto:")) {
    const emailPart = url.replace("mailto:", "").trim();
    if (!emailPart || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailPart)) {
      return "올바른 이메일 주소를 입력해 주세요. (예: mailto:your@email.com)";
    }
    return null;
  }
  try {
    const parsed = new URL(url);
    if (!["http:", "https:"].includes(parsed.protocol)) {
      return "URL은 http:// 또는 https://로 시작해야 합니다.";
    }
  } catch {
    return "올바른 URL 형식을 입력해 주세요. (예: https://example.com)";
  }
  return null;
}

// ============================================================
// 메인 컴포넌트
// ============================================================
export function AddLinkDialog({
  open,
  onOpenChange,
  onAddLink,
  currentLinkCount,
}: AddLinkDialogProps) {
  const MAX_LINKS = 20;
  const isAtLimit = currentLinkCount >= MAX_LINKS;

  const [form, setForm] = useState({
    title: "",
    url: "",
    description: "",
    icon: "globe",
    badge: "",
    category: "repo",
  });

  const [urlError, setUrlError] = useState<string | null>(null);
  const [titleError, setTitleError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleClose = () => {
    // 폼 초기화
    setForm({ title: "", url: "", description: "", icon: "globe", badge: "", category: "repo" });
    setUrlError(null);
    setTitleError(null);
    setSubmitted(false);
    onOpenChange(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const urlErr = validateUrl(form.url);
    const titleErr = !form.title.trim()
      ? "링크 제목을 입력해 주세요."
      : form.title.trim().length > 40
      ? "제목은 최대 40자까지 입력할 수 있습니다."
      : null;

    setUrlError(urlErr);
    setTitleError(titleErr);

    if (urlErr || titleErr) return;

    const newLink: PublicLinkData = {
      id: `link-${Date.now()}`,
      title: form.title.trim(),
      url: form.url.trim(),
      description: form.description.trim() || undefined,
      icon: form.icon,
      badge: form.badge.trim() || undefined,
      category: form.category,
      isActive: true,
    };

    setSubmitted(true);
    setTimeout(() => {
      onAddLink(newLink);
      handleClose();
    }, 600);
  };

  const SelectedIcon = ICON_OPTIONS.find((o) => o.key === form.icon)?.icon ?? Globe;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white shadow-xl">
        {/* ── 헤더 블랙 배너 ── */}
        <div className="relative bg-[#111111] px-6 pt-7 pb-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0">
            <LinkIcon className="w-5 h-5 text-white" />
          </div>
          <DialogHeader className="text-left">
            <DialogTitle className="text-white text-[17px] font-bold tracking-tight leading-tight">
              새 링크 추가
            </DialogTitle>
            <DialogDescription className="text-white/60 text-[12px] font-normal mt-0.5">
              {currentLinkCount}/{MAX_LINKS}개 등록됨 · 최대 {MAX_LINKS}개까지 추가할 수 있습니다.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* ── 한도 초과 경고 ── */}
        {isAtLimit && (
          <div className="mx-6 mt-4 flex items-start gap-2.5 bg-[#fff3cd] border border-[#ffc107]/40 text-[#856404] rounded-xl px-4 py-3 text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>링크 최대 개수({MAX_LINKS}개)에 도달했습니다. 기존 링크를 삭제 후 추가해 주세요.</p>
          </div>
        )}

        {/* ── 성공 상태 ── */}
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-12 px-6 gap-3">
            <div className="w-14 h-14 rounded-full bg-[#f0fdf4] border border-[#86efac] flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-[#16a34a]" />
            </div>
            <p className="font-semibold text-[#111111] text-base">링크가 추가되었습니다!</p>
            <p className="text-xs text-[#707072]">{form.title}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="px-6 pt-5 pb-2 flex flex-col gap-5">

              {/* ── 링크 제목 ── */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="link-title" className="text-[13px] font-semibold text-[#111111]">
                  링크 제목 <span className="text-[#d30005]">*</span>
                </Label>
                <Input
                  id="link-title"
                  placeholder="예: GitHub Profile, Velog 블로그"
                  value={form.title}
                  maxLength={40}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, title: e.target.value }));
                    if (titleError) setTitleError(null);
                  }}
                  className={cn(
                    "h-11 text-sm bg-[#f5f5f5] hover:bg-[#ebebeb] focus-visible:bg-white transition-colors",
                    titleError && "border-[#d30005] focus-visible:ring-[#d30005]"
                  )}
                />
                <div className="flex justify-between items-center">
                  {titleError ? (
                    <p className="text-[11px] text-[#d30005] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {titleError}
                    </p>
                  ) : (
                    <span />
                  )}
                  <span className="text-[11px] text-[#9e9ea0] ml-auto">{form.title.length}/40</span>
                </div>
              </div>

              {/* ── URL ── */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="link-url" className="text-[13px] font-semibold text-[#111111]">
                  URL <span className="text-[#d30005]">*</span>
                </Label>
                <Input
                  id="link-url"
                  type="url"
                  placeholder="https://example.com 또는 mailto:your@email.com"
                  value={form.url}
                  onChange={(e) => {
                    setForm((f) => ({ ...f, url: e.target.value }));
                    if (urlError) setUrlError(null);
                  }}
                  className={cn(
                    "h-11 text-sm bg-[#f5f5f5] hover:bg-[#ebebeb] focus-visible:bg-white transition-colors",
                    urlError && "border-[#d30005] focus-visible:ring-[#d30005]"
                  )}
                />
                {urlError && (
                  <p className="text-[11px] text-[#d30005] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {urlError}
                  </p>
                )}
              </div>

              {/* ── 설명 (선택) ── */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="link-desc" className="text-[13px] font-semibold text-[#111111]">
                  설명 <span className="text-[11px] font-normal text-[#9e9ea0]">(선택)</span>
                </Label>
                <Input
                  id="link-desc"
                  placeholder="링크에 대한 간단한 설명"
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="h-11 text-sm bg-[#f5f5f5] hover:bg-[#ebebeb] focus-visible:bg-white transition-colors"
                />
              </div>

              {/* ── 뱃지 (선택) ── */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="link-badge" className="text-[13px] font-semibold text-[#111111]">
                  뱃지 텍스트 <span className="text-[11px] font-normal text-[#9e9ea0]">(선택)</span>
                </Label>
                <Input
                  id="link-badge"
                  placeholder="예: JUST IN, FEATURED, NEW"
                  value={form.badge}
                  onChange={(e) => setForm((f) => ({ ...f, badge: e.target.value }))}
                  className="h-11 text-sm bg-[#f5f5f5] hover:bg-[#ebebeb] focus-visible:bg-white transition-colors uppercase"
                />
              </div>

              {/* ── 아이콘 선택 ── */}
              <div className="flex flex-col gap-2">
                <Label className="text-[13px] font-semibold text-[#111111]">아이콘</Label>
                <div className="grid grid-cols-5 gap-2">
                  {ICON_OPTIONS.map(({ key, label, icon: IconComp }) => (
                    <button
                      key={key}
                      type="button"
                      title={label}
                      onClick={() => setForm((f) => ({ ...f, icon: key }))}
                      className={cn(
                        "flex flex-col items-center gap-1 p-2.5 rounded-xl border transition-all",
                        form.icon === key
                          ? "bg-[#111111] border-[#111111] text-white"
                          : "bg-[#f5f5f5] border-[#e5e5e5] text-[#707072] hover:border-[#111111] hover:text-[#111111]"
                      )}
                    >
                      <IconComp className="w-4 h-4" />
                      <span className="text-[9px] font-medium leading-none">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── 카테고리 선택 ── */}
              <div className="flex flex-col gap-2">
                <Label className="text-[13px] font-semibold text-[#111111]">카테고리</Label>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORY_OPTIONS.map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setForm((f) => ({ ...f, category: key }))}
                      className={cn(
                        "px-3 py-2.5 rounded-xl border text-sm font-medium transition-all text-left",
                        form.category === key
                          ? "bg-[#111111] border-[#111111] text-white"
                          : "bg-[#f5f5f5] border-[#e5e5e5] text-[#39393b] hover:border-[#111111]"
                      )}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* ── 미리보기 ── */}
              <div className="flex flex-col gap-2">
                <Label className="text-[13px] font-semibold text-[#111111]">미리보기</Label>
                <div className="flex items-center gap-3 p-3.5 rounded-xl border border-[#e5e5e5] bg-[#fafafa]">
                  <div className="w-10 h-10 rounded-full bg-[#f5f5f5] border border-[#cacacb] flex items-center justify-center flex-shrink-0">
                    <SelectedIcon className="w-4.5 h-4.5 text-[#111111]" />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-semibold text-[14px] text-[#111111] truncate">
                      {form.title || "링크 제목"}
                    </span>
                    {form.description && (
                      <span className="text-[11px] text-[#707072] truncate">{form.description}</span>
                    )}
                    <span className="text-[10px] text-[#9e9ea0] truncate font-mono mt-0.5">
                      {form.url || "https://..."}
                    </span>
                  </div>
                  {form.badge && (
                    <span className="ml-auto text-[9px] font-bold tracking-wider bg-[#111111] text-white px-2 py-0.5 rounded-full uppercase flex-shrink-0">
                      {form.badge}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* ── 버튼 영역 ── */}
            <DialogFooter className="px-6 py-5 border-t border-[#f5f5f5] flex-row gap-2 sm:flex-row">
              <Button
                type="button"
                variant="nikeSecondary"
                className="flex-1"
                onClick={handleClose}
              >
                취소
              </Button>
              <Button
                type="submit"
                variant="nikePrimary"
                className="flex-1"
                disabled={isAtLimit}
              >
                링크 추가
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
