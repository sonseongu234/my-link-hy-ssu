"use client";

import React, { useState, useRef } from "react";
import { PublicLinkData } from "./PublicLinkCard";
import {
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
import { updateLinkInFirestore } from "@/services/linkService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, Edit3, X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface InlineEditLinkFormProps {
  link: PublicLinkData;
  onCancel: () => void;
  onSave: (updated: PublicLinkData) => void;
}

export function InlineEditLinkForm({
  link,
  onCancel,
  onSave,
}: InlineEditLinkFormProps) {
  const [form, setForm] = useState({
    title: link.title || "",
    url: link.url || "",
    description: link.description || "",
    icon: link.icon || "globe",
    badge: link.badge || "",
    category: link.category || "repo",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const titleRef = useRef<HTMLInputElement>(null);
  const urlRef = useRef<HTMLInputElement>(null);

  // 필드 변경
  const handleChange = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const validators: Record<string, (v: string) => string | undefined> = {
        title: validateTitle,
        url: validateUrl,
        description: validateDescription,
        badge: validateBadge,
      };
      if (validators[field]) {
        setErrors((prev) => ({ ...prev, [field]: validators[field](value) }));
      }
    }
  };

  // blur 시 검증
  const handleBlur = (field: string, value: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validators: Record<string, (v: string) => string | undefined> = {
      title: validateTitle,
      url: validateUrl,
      description: validateDescription,
      badge: validateBadge,
    };
    if (validators[field]) {
      setErrors((prev) => ({ ...prev, [field]: validators[field](value) }));
    }
  };

  // 폼 제출 (Firestore updateLinkInFirestore 호출)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setTouched({ title: true, url: true, description: true, badge: true });
    const newErrors = validateAll(form);
    setErrors(newErrors);

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
      // Firebase users/anonymous/links 경로에 업데이트
      const updated = await updateLinkInFirestore(link.id, {
        title: form.title.trim(),
        url: form.url.trim(),
        description: form.description.trim() || undefined,
        icon: form.icon,
        badge: form.badge.trim().toUpperCase() || undefined,
        category: form.category,
        isActive: link.isActive ?? true,
        createdAt: link.createdAt,
      });

      onSave(updated);
    } catch (err: unknown) {
      console.error("[InlineEditLinkForm] Firestore 수정 오류:", err);
      const message =
        err instanceof Error ? err.message : "수정 저장 중 오류가 발생했습니다.";
      setSubmitError(`수정에 실패했습니다: ${message}`);
      setIsSubmitting(false);
    }
  };

  const hasBlockingError =
    Boolean(errors.title && touched.title) ||
    Boolean(errors.url && touched.url);

  return (
    <Card className="w-full p-4 sm:p-5 bg-white border-2 border-[#111111] rounded-2xl shadow-md transition-all">
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        {/* 인라인 편집 모드 상단 인디케이터 */}
        <div className="flex items-center justify-between border-b border-[#e5e5e5] pb-2.5">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-[#111111] text-white flex items-center justify-center">
              <Edit3 className="w-3.5 h-3.5" />
            </div>
            <span className="text-[13px] font-bold text-[#111111]">
              인라인 링크 수정
            </span>
          </div>
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="text-xs text-[#707072] hover:text-[#111111] flex items-center gap-1 font-medium"
          >
            <X className="w-3.5 h-3.5" />
            닫기
          </button>
        </div>

        {/* 에러 알림 */}
        {submitError && (
          <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-3 py-2 text-xs">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600" />
            <span>{submitError}</span>
          </div>
        )}

        {/* 1. 링크 제목 (필수) */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <Label htmlFor={`edit-title-${link.id}`} className="text-[12px] font-semibold text-[#111111]">
              링크 제목 <span className="text-[#d30005]">*</span>
            </Label>
            <CharCount
              current={form.title.length}
              max={LIMITS.title}
              hasError={!!errors.title && touched.title}
            />
          </div>
          <Input
            ref={titleRef}
            id={`edit-title-${link.id}`}
            value={form.title}
            maxLength={LIMITS.title + 5}
            onChange={(e) => handleChange("title", e.target.value)}
            onBlur={(e) => handleBlur("title", e.target.value)}
            placeholder="링크 제목을 입력하세요"
            className={cn(
              "h-10 text-sm bg-[#f5f5f5] focus-visible:bg-white",
              errors.title && touched.title
                ? "border-[#d30005] focus-visible:ring-[#d30005]"
                : form.title && !errors.title
                ? "border-[#16a34a] focus-visible:ring-[#16a34a]"
                : ""
            )}
          />
          {errors.title && touched.title && <FieldError message={errors.title} />}
        </div>

        {/* 2. URL (필수) */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <Label htmlFor={`edit-url-${link.id}`} className="text-[12px] font-semibold text-[#111111]">
              URL <span className="text-[#d30005]">*</span>
            </Label>
          </div>
          <div className="relative">
            <Input
              ref={urlRef}
              id={`edit-url-${link.id}`}
              type="text"
              inputMode="url"
              value={form.url}
              onChange={(e) => handleChange("url", e.target.value)}
              onBlur={(e) => handleBlur("url", e.target.value)}
              placeholder="https://example.com"
              className={cn(
                "h-10 text-sm bg-[#f5f5f5] focus-visible:bg-white pr-9",
                errors.url && touched.url
                  ? "border-[#d30005] focus-visible:ring-[#d30005]"
                  : form.url && !errors.url
                  ? "border-[#16a34a] focus-visible:ring-[#16a34a]"
                  : ""
              )}
            />
            {form.url && !errors.url && (
              <CheckCircle2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#16a34a]" />
            )}
          </div>
          {errors.url && touched.url && <FieldError message={errors.url} />}
        </div>

        {/* 3. 설명 & 뱃지 (2열 배치) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* 설명 */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <Label htmlFor={`edit-desc-${link.id}`} className="text-[12px] font-semibold text-[#111111]">
                설명 <span className="text-[10px] text-[#9e9ea0] font-normal">(선택)</span>
              </Label>
              <CharCount
                current={form.description.length}
                max={LIMITS.description}
                hasError={!!errors.description && touched.description}
              />
            </div>
            <Input
              id={`edit-desc-${link.id}`}
              value={form.description}
              maxLength={LIMITS.description + 5}
              onChange={(e) => handleChange("description", e.target.value)}
              onBlur={(e) => handleBlur("description", e.target.value)}
              placeholder="간단한 설명 입력"
              className="h-9 text-xs bg-[#f5f5f5] focus-visible:bg-white"
            />
            {errors.description && touched.description && (
              <FieldError message={errors.description} />
            )}
          </div>

          {/* 뱃지 */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <Label htmlFor={`edit-badge-${link.id}`} className="text-[12px] font-semibold text-[#111111]">
                뱃지 <span className="text-[10px] text-[#9e9ea0] font-normal">(선택)</span>
              </Label>
              <CharCount
                current={form.badge.length}
                max={LIMITS.badge}
                hasError={!!errors.badge && touched.badge}
              />
            </div>
            <Input
              id={`edit-badge-${link.id}`}
              value={form.badge}
              maxLength={LIMITS.badge + 5}
              onChange={(e) => handleChange("badge", e.target.value)}
              onBlur={(e) => handleBlur("badge", e.target.value)}
              placeholder="예: NEW, FEATURED"
              className="h-9 text-xs uppercase bg-[#f5f5f5] focus-visible:bg-white"
            />
            {errors.badge && touched.badge && <FieldError message={errors.badge} />}
          </div>
        </div>

        {/* 4. 아이콘 선택 */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-[12px] font-semibold text-[#111111]">아이콘</Label>
          <div className="grid grid-cols-5 sm:grid-cols-9 gap-1.5" role="radiogroup">
            {ICON_OPTIONS.map(({ key, label, icon: IconComp }) => (
              <button
                key={key}
                type="button"
                title={label}
                onClick={() => setForm((f) => ({ ...f, icon: key }))}
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-xl border text-xs transition-all",
                  form.icon === key
                    ? "bg-[#111111] text-white border-[#111111] shadow-sm"
                    : "bg-[#f5f5f5] text-[#707072] border-[#e5e5e5] hover:border-[#111111]"
                )}
              >
                <IconComp className="w-4 h-4" />
                <span className="text-[9px] mt-0.5 truncate max-w-full">{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 5. 카테고리 선택 */}
        <div className="flex flex-col gap-1.5">
          <Label className="text-[12px] font-semibold text-[#111111]">카테고리</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5" role="radiogroup">
            {CATEGORY_OPTIONS.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setForm((f) => ({ ...f, category: key }))}
                className={cn(
                  "px-2.5 py-1.5 rounded-xl border text-[11px] font-medium transition-all text-center",
                  form.category === key
                    ? "bg-[#111111] text-white border-[#111111] shadow-sm"
                    : "bg-[#f5f5f5] text-[#39393b] border-[#e5e5e5] hover:border-[#111111]"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 6. 인라인 하단 버튼 영역 */}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#f0f0f0]">
          <Button
            type="button"
            variant="nikeSecondary"
            size="sm"
            onClick={onCancel}
            disabled={isSubmitting}
            className="h-9 px-4 text-xs"
          >
            취소
          </Button>
          <Button
            type="submit"
            variant="nikePrimary"
            size="sm"
            disabled={hasBlockingError || isSubmitting}
            className="h-9 px-4 text-xs gap-1.5"
          >
            {isSubmitting ? (
              <>
                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>저장 중...</span>
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>저장</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}
