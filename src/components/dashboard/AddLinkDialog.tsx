"use client";

import React, { useState, useRef, useCallback } from "react";
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
import { addLinkToFirestore } from "@/services/linkService";
import {
  MAX_LINKS,
  LIMITS,
  ICON_OPTIONS,
  CATEGORY_OPTIONS,
  validateTitle,
  validateUrl,
  validateDescription,
  validateBadge,
  validateAll,
  CharCount,
  FieldError,
  FormErrors,
} from "@/lib/linkValidation";
import {
  Link as LinkIcon,
  Globe,
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
// 메인 컴포넌트
// ============================================================
export function AddLinkDialog({
  open,
  onOpenChange,
  onAddLink,
  currentLinkCount,
}: AddLinkDialogProps) {
  const isAtLimit = currentLinkCount >= MAX_LINKS;

  const [form, setForm] = useState({
    title: "",
    url: "",
    description: "",
    icon: "globe",
    badge: "",
    category: "repo",
  });

  // 각 필드별 touched 상태 (blur 시 검증 활성화)
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // 에러 필드로 포커스 이동을 위한 ref
  const titleRef = useRef<HTMLInputElement>(null);
  const urlRef   = useRef<HTMLInputElement>(null);

  // ── 폼 초기화 ──
  const resetForm = useCallback(() => {
    setForm({ title: "", url: "", description: "", icon: "globe", badge: "", category: "repo" });
    setTouched({});
    setErrors({});
    setSubmitted(false);
    setIsSubmitting(false);
    setSubmitError(null);
  }, []);

  const handleClose = useCallback(() => {
    resetForm();
    onOpenChange(false);
  }, [resetForm, onOpenChange]);

  // ── 필드 변경 ──
  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    // 이미 touched된 필드는 실시간으로 재검증
    if (touched[field]) {
      const validators: Record<string, (v: string) => string | undefined> = {
        title:       validateTitle,
        url:         validateUrl,
        description: validateDescription,
        badge:       validateBadge,
      };
      if (validators[field]) {
        setErrors((e) => ({ ...e, [field]: validators[field](value) }));
      }
    }
  };

  // ── blur 시 검증 ──
  const handleBlur = (field: string, value: string) => {
    setTouched((t) => ({ ...t, [field]: true }));
    const validators: Record<string, (v: string) => string | undefined> = {
      title:       validateTitle,
      url:         validateUrl,
      description: validateDescription,
      badge:       validateBadge,
    };
    if (validators[field]) {
      setErrors((e) => ({ ...e, [field]: validators[field](value) }));
    }
  };

  // ── 제출 (Firestore users/anonymous/links에 저장) ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // 모든 필드 touched 처리
    setTouched({ title: true, url: true, description: true, badge: true });

    const newErrors = validateAll(form);
    setErrors(newErrors);

    // 첫 번째 에러 필드로 포커스
    if (newErrors.title) {
      titleRef.current?.focus();
      return;
    }
    if (newErrors.url) {
      urlRef.current?.focus();
      return;
    }
    if (newErrors.description || newErrors.badge) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Firestore (users/anonymous/links)에 저장
      const savedLink = await addLinkToFirestore({
        title: form.title.trim(),
        url: form.url.trim(),
        description: form.description.trim() || undefined,
        icon: form.icon,
        badge: form.badge.trim().toUpperCase() || undefined,
        category: form.category,
        isActive: true,
      });

      setSubmitted(true);
      setTimeout(() => {
        onAddLink(savedLink);
        handleClose();
      }, 700);
    } catch (err: unknown) {
      console.error("[AddLinkDialog] Firestore 저장 오류:", err);
      const errorMessage =
        err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.";
      setSubmitError(`Firestore에 저장하지 못했습니다: ${errorMessage}`);
      setIsSubmitting(false);
    }
  };

  const SelectedIcon = ICON_OPTIONS.find((o) => o.key === form.icon)?.icon ?? Globe;

  // 제출 버튼 비활성화 조건: 한도 초과 or 필수 필드 미입력(touched 된 경우만)
  const hasBlockingError =
    isAtLimit ||
    Boolean(errors.title && touched.title) ||
    Boolean(errors.url && touched.url);

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white shadow-xl max-h-[90vh] flex flex-col">

        {/* ── 헤더 블랙 배너 ── */}
        <div className="relative bg-[#111111] px-6 pt-6 pb-5 flex items-center gap-3 flex-shrink-0">
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

        {/* ── 에러 알림 ── */}
        {submitError && (
          <div className="mx-6 mt-4 flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-xs flex-shrink-0">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600" />
            <div className="flex-1">
              <p className="font-semibold text-red-800">저장 실패</p>
              <p className="mt-0.5">{submitError}</p>
            </div>
          </div>
        )}

        {/* ── 한도 초과 경고 ── */}
        {isAtLimit && (
          <div className="mx-6 mt-4 flex items-start gap-2.5 bg-[#fff3cd] border border-[#ffc107]/40 text-[#856404] rounded-xl px-4 py-3 text-sm flex-shrink-0">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <p>링크 최대 개수({MAX_LINKS}개)에 도달했습니다. 기존 링크를 삭제 후 추가해 주세요.</p>
          </div>
        )}

        {/* ── 성공 상태 ── */}
        {submitted ? (
          <div className="flex flex-col items-center justify-center py-14 px-6 gap-3">
            <div className="w-14 h-14 rounded-full bg-[#f0fdf4] border border-[#86efac] flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-[#16a34a]" />
            </div>
            <p className="font-semibold text-[#111111] text-base">링크가 추가되었습니다!</p>
            <p className="text-xs text-[#707072]">{form.title}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="flex flex-col min-h-0">

            {/* ── 스크롤 가능한 폼 본문 ── */}
            <div className="px-6 pt-5 pb-3 flex flex-col gap-5 overflow-y-auto flex-1">

              {/* ── 링크 제목 ── */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="link-title" className="text-[13px] font-semibold text-[#111111]">
                  링크 제목 <span className="text-[#d30005]">*</span>
                </Label>
                <Input
                  ref={titleRef}
                  id="link-title"
                  placeholder="예: GitHub Profile, Velog 블로그"
                  value={form.title}
                  maxLength={LIMITS.title + 5} // 약간 여유 주고 JS로 차단
                  onChange={(e) => handleChange("title", e.target.value)}
                  onBlur={(e) => handleBlur("title", e.target.value)}
                  aria-invalid={!!errors.title && touched.title}
                  aria-describedby="title-error"
                  className={cn(
                    "h-11 text-sm bg-[#f5f5f5] hover:bg-[#ebebeb] focus-visible:bg-white transition-colors",
                    errors.title && touched.title
                      ? "border-[#d30005] focus-visible:ring-[#d30005]"
                      : form.title && !errors.title
                      ? "border-[#16a34a] focus-visible:ring-[#16a34a]"
                      : ""
                  )}
                />
                <div className="flex justify-between items-start min-h-[16px]">
                  <div id="title-error">
                    {errors.title && touched.title && <FieldError message={errors.title} />}
                  </div>
                  <CharCount
                    current={form.title.length}
                    max={LIMITS.title}
                    hasError={!!errors.title && touched.title}
                  />
                </div>
              </div>

              {/* ── URL ── */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="link-url" className="text-[13px] font-semibold text-[#111111]">
                  URL <span className="text-[#d30005]">*</span>
                </Label>
                <div className="relative">
                  <Input
                    ref={urlRef}
                    id="link-url"
                    type="text"
                    inputMode="url"
                    placeholder="https://example.com 또는 mailto:your@email.com"
                    value={form.url}
                    onChange={(e) => handleChange("url", e.target.value)}
                    onBlur={(e) => handleBlur("url", e.target.value)}
                    aria-invalid={!!errors.url && touched.url}
                    aria-describedby="url-error url-hint"
                    className={cn(
                      "h-11 text-sm bg-[#f5f5f5] hover:bg-[#ebebeb] focus-visible:bg-white transition-colors",
                      errors.url && touched.url
                        ? "border-[#d30005] focus-visible:ring-[#d30005]"
                        : form.url && !errors.url
                        ? "border-[#16a34a] focus-visible:ring-[#16a34a]"
                        : ""
                    )}
                  />
                  {/* 유효한 URL 입력 시 녹색 체크 */}
                  {form.url && !errors.url && (
                    <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#16a34a]" />
                  )}
                </div>
                <div id="url-error">
                  {errors.url && touched.url && <FieldError message={errors.url} />}
                </div>
                {!errors.url && !form.url && (
                  <p id="url-hint" className="text-[11px] text-[#9e9ea0]">
                    웹 링크는 https://, 이메일은 mailto:로 시작하세요.
                  </p>
                )}
              </div>

              {/* ── 설명 (선택) ── */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="link-desc" className="text-[13px] font-semibold text-[#111111]">
                  설명{" "}
                  <span className="text-[11px] font-normal text-[#9e9ea0]">(선택)</span>
                </Label>
                <Input
                  id="link-desc"
                  placeholder="링크에 대한 간단한 설명"
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  onBlur={(e) => handleBlur("description", e.target.value)}
                  aria-invalid={!!errors.description && touched.description}
                  className={cn(
                    "h-11 text-sm bg-[#f5f5f5] hover:bg-[#ebebeb] focus-visible:bg-white transition-colors",
                    errors.description && touched.description
                      ? "border-[#d30005] focus-visible:ring-[#d30005]"
                      : ""
                  )}
                />
                <div className="flex justify-between items-start min-h-[16px]">
                  <div>
                    {errors.description && touched.description && (
                      <FieldError message={errors.description} />
                    )}
                  </div>
                  <CharCount
                    current={form.description.length}
                    max={LIMITS.description}
                    hasError={!!errors.description && touched.description}
                  />
                </div>
              </div>

              {/* ── 뱃지 (선택) ── */}
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="link-badge" className="text-[13px] font-semibold text-[#111111]">
                  뱃지 텍스트{" "}
                  <span className="text-[11px] font-normal text-[#9e9ea0]">(선택)</span>
                </Label>
                <Input
                  id="link-badge"
                  placeholder="예: JUST IN, FEATURED, NEW"
                  value={form.badge}
                  onChange={(e) => handleChange("badge", e.target.value)}
                  onBlur={(e) => handleBlur("badge", e.target.value)}
                  aria-invalid={!!errors.badge && touched.badge}
                  className={cn(
                    "h-11 text-sm bg-[#f5f5f5] hover:bg-[#ebebeb] focus-visible:bg-white transition-colors uppercase tracking-wider",
                    errors.badge && touched.badge
                      ? "border-[#d30005] focus-visible:ring-[#d30005]"
                      : ""
                  )}
                />
                <div className="flex justify-between items-start min-h-[16px]">
                  <div>
                    {errors.badge && touched.badge && <FieldError message={errors.badge} />}
                  </div>
                  <CharCount
                    current={form.badge.length}
                    max={LIMITS.badge}
                    hasError={!!errors.badge && touched.badge}
                  />
                </div>
              </div>

              {/* ── 아이콘 선택 ── */}
              <div className="flex flex-col gap-2">
                <Label className="text-[13px] font-semibold text-[#111111]">아이콘</Label>
                <div className="grid grid-cols-5 gap-2" role="radiogroup" aria-label="아이콘 선택">
                  {ICON_OPTIONS.map(({ key, label, icon: IconComp }) => (
                    <button
                      key={key}
                      type="button"
                      role="radio"
                      aria-checked={form.icon === key}
                      title={label}
                      onClick={() => setForm((f) => ({ ...f, icon: key }))}
                      className={cn(
                        "flex flex-col items-center gap-1 p-2.5 rounded-xl border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]",
                        form.icon === key
                          ? "bg-[#111111] border-[#111111] text-white shadow-sm"
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
                <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label="카테고리 선택">
                  {CATEGORY_OPTIONS.map(({ key, label }) => (
                    <button
                      key={key}
                      type="button"
                      role="radio"
                      aria-checked={form.category === key}
                      onClick={() => setForm((f) => ({ ...f, category: key }))}
                      className={cn(
                        "px-3 py-2.5 rounded-xl border text-sm font-medium transition-all text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#111111]",
                        form.category === key
                          ? "bg-[#111111] border-[#111111] text-white shadow-sm"
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
                    <SelectedIcon className="w-5 h-5 text-[#111111]" />
                  </div>
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="font-semibold text-[14px] text-[#111111] truncate">
                      {form.title.trim() || (
                        <span className="text-[#9e9ea0] font-normal">링크 제목</span>
                      )}
                    </span>
                    {form.description.trim() && (
                      <span className="text-[11px] text-[#707072] truncate">
                        {form.description}
                      </span>
                    )}
                    <span className="text-[10px] text-[#9e9ea0] truncate font-mono mt-0.5">
                      {form.url.trim() || "https://..."}
                    </span>
                  </div>
                  {form.badge.trim() && (
                    <span className="text-[9px] font-bold tracking-wider bg-[#111111] text-white px-2 py-0.5 rounded-full uppercase flex-shrink-0">
                      {form.badge}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* ── 버튼 영역 ── */}
            <DialogFooter className="px-6 py-4 border-t border-[#f5f5f5] flex-row gap-2 sm:flex-row flex-shrink-0">
              <Button
                type="button"
                variant="nikeSecondary"
                className="flex-1"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                취소
              </Button>
              <Button
                type="submit"
                variant="nikePrimary"
                className={cn(
                  "flex-1 transition-all gap-2",
                  (hasBlockingError || isSubmitting) && "opacity-60 cursor-not-allowed"
                )}
                disabled={isAtLimit || isSubmitting}
                aria-disabled={hasBlockingError || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>저장 중...</span>
                  </>
                ) : (
                  "링크 추가"
                )}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
