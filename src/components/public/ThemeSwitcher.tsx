"use client";

import React from "react";
import { ThemeId, PRESET_THEMES } from "@/types/theme";
import { Palette, Check } from "lucide-react";

interface ThemeSwitcherProps {
  currentTheme: ThemeId;
  onSelectTheme: (themeId: ThemeId) => void;
}

const THEME_PREVIEWS: { id: ThemeId; name: string; color: string; ringColor: string }[] = [
  { id: "snow", name: "Snow", color: "#FFFFFF", ringColor: "ring-slate-900" },
  { id: "midnight", name: "Midnight", color: "#1A1A2E", ringColor: "ring-indigo-400" },
  { id: "sunset", name: "Sunset", color: "linear-gradient(135deg, #FF6B6B 0%, #FFC154 100%)", ringColor: "ring-amber-400" },
  { id: "ocean", name: "Ocean", color: "#0F3460", ringColor: "ring-cyan-400" },
  { id: "blossom", name: "Blossom", color: "#FFF0F5", ringColor: "ring-pink-400" },
];

export function ThemeSwitcher({ currentTheme, onSelectTheme }: ThemeSwitcherProps) {
  return (
    <div className="w-full max-w-md mx-auto mb-6 px-2">
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 border border-slate-200/60 dark:border-slate-800 shadow-sm flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 pl-1 text-[12px] sm:text-[13px] font-semibold text-slate-700 dark:text-slate-300">
          <Palette className="w-4 h-4 text-slate-500" />
          <span className="hidden xs:inline">PRD 테마:</span>
          <span className="font-bold text-slate-900 dark:text-white">
            {PRESET_THEMES[currentTheme].name}
          </span>
        </div>

        {/* 5 Theme Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {THEME_PREVIEWS.map((theme) => {
            const isSelected = currentTheme === theme.id;
            const isGradient = theme.color.startsWith("linear-gradient");

            return (
              <button
                key={theme.id}
                onClick={() => onSelectTheme(theme.id)}
                title={`${theme.name} (${PRESET_THEMES[theme.id].badge})`}
                aria-label={`Select ${theme.name} theme`}
                className={`group relative w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 border border-black/10 active:scale-90 ${
                  isSelected
                    ? `ring-2 ${theme.ringColor} ring-offset-2 scale-110 shadow-sm`
                    : "opacity-80 hover:opacity-100 hover:scale-105"
                }`}
                style={{
                  background: isGradient ? theme.color : undefined,
                  backgroundColor: isGradient ? undefined : theme.color,
                }}
              >
                {isSelected && (
                  <Check
                    className={`w-3.5 h-3.5 stroke-[3] ${
                      theme.id === "snow" || theme.id === "blossom"
                        ? "text-slate-900"
                        : "text-white"
                    }`}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
