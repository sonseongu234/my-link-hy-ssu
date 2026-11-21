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
import { PublicLinkData } from "@/components/public/PublicLinkCard";
import { deleteLinkFromFirestore } from "@/services/linkService";
import { AlertTriangle, Trash2, AlertCircle } from "lucide-react";

interface DeleteLinkDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  link: PublicLinkData | null;
  onDeleted: (linkId: string) => void;
}

export function DeleteLinkDialog({
  open,
  onOpenChange,
  link,
  onDeleted,
}: DeleteLinkDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!link) return null;

  const handleDelete = async () => {
    if (isDeleting) return;
    setIsDeleting(true);
    setError(null);

    try {
      // Firebase (users/anonymous/links)에서 해당 문서 삭제
      await deleteLinkFromFirestore(link.id);
      onDeleted(link.id);
      onOpenChange(false);
    } catch (err: unknown) {
      console.error("[DeleteLinkDialog] Firebase 삭제 오류:", err);
      const message =
        err instanceof Error ? err.message : "삭제 중 오류가 발생했습니다.";
      setError(`삭제에 실패했습니다: ${message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    if (isDeleting) return;
    setError(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[420px] p-0 overflow-hidden rounded-2xl border border-[#e5e5e5] bg-white shadow-xl">
        {/* 상단 헤더 배너 (위험 경고 레드/다크 테마) */}
        <div className="bg-[#111111] px-6 pt-6 pb-5 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0">
            <Trash2 className="w-5 h-5 text-red-400" />
          </div>
          <DialogHeader className="text-left">
            <DialogTitle className="text-white text-[17px] font-bold tracking-tight">
              정말 삭제하시겠습니까?
            </DialogTitle>
            <DialogDescription className="text-white/60 text-[12px] font-normal mt-0.5">
              선택한 링크가 마이링크 목록에서 영구적으로 제거됩니다.
            </DialogDescription>
          </DialogHeader>
        </div>

        {/* 본문 영역 */}
        <div className="px-6 py-5 flex flex-col gap-4">
          {/* 에러 알림 */}
          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-3.5 py-2.5 text-xs">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          {/* 삭제 대상 링크 이름 표시 */}
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px] font-semibold text-[#707072] uppercase tracking-wider">
              삭제할 링크
            </span>
            <div className="p-3 bg-[#f5f5f5] rounded-xl border border-[#e5e5e5]">
              <p className="font-bold text-[14px] text-[#111111] truncate">
                {link.title}
              </p>
              <p className="text-[11px] text-[#707072] font-mono truncate mt-0.5">
                {link.url}
              </p>
            </div>
          </div>

          {/* 경고 메시지 (빨간색) */}
          <div className="flex items-center gap-2 p-3 bg-red-50/80 border border-red-200 rounded-xl">
            <AlertTriangle className="w-4 h-4 text-[#d30005] flex-shrink-0" />
            <p className="text-[12px] font-semibold text-[#d30005]">
              이 작업은 되돌릴 수 없습니다
            </p>
          </div>
        </div>

        {/* 하단 버튼 영역 */}
        <DialogFooter className="px-6 py-4 bg-[#fafafa] border-t border-[#f0f0f0] flex-row gap-2 sm:flex-row">
          <Button
            type="button"
            variant="nikeSecondary"
            className="flex-1"
            onClick={handleClose}
            disabled={isDeleting}
          >
            취소
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="flex-1 gap-2"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>삭제 중...</span>
              </>
            ) : (
              "삭제하기"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
