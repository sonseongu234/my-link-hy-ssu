export type ThemeId = "snow" | "midnight" | "sunset" | "ocean" | "blossom";

export interface ThemeConfig {
  id: ThemeId;
  name: string;
  badge: string;
  mood: string;
  containerBg: string;
  textColor: string;
  subtextColor: string;
  cardBase: string;
  cardHover: string;
  pillShape: "round" | "pill";
  socialIconStyle: string;
  accentColor: string;
  tagStyle: string;
}

export const PRESET_THEMES: Record<ThemeId, ThemeConfig> = {
  snow: {
    id: "snow",
    name: "Snow",
    badge: "깔끔·미니멀",
    mood: "Minimalist & Clean",
    containerBg: "bg-white",
    textColor: "text-[#111111]",
    subtextColor: "text-[#707072]",
    cardBase: "bg-white border-2 border-[#111111] text-[#111111] shadow-[3px_3px_0px_0px_#111111]",
    cardHover: "hover:shadow-[1px_1px_0px_0px_#111111] hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-[#fafafa]",
    pillShape: "round",
    socialIconStyle: "bg-[#f5f5f5] text-[#111111] border border-[#cacacb] hover:bg-[#111111] hover:text-white",
    accentColor: "bg-[#111111] text-white",
    tagStyle: "bg-[#f5f5f5] text-[#111111] border border-[#e5e5e5]",
  },
  midnight: {
    id: "midnight",
    name: "Midnight",
    badge: "다크·시크",
    mood: "Dark & Chic",
    containerBg: "bg-[#1A1A2E]",
    textColor: "text-white",
    subtextColor: "text-slate-400",
    cardBase: "bg-[#16213E]/80 backdrop-blur-md border border-white/10 text-white shadow-lg",
    cardHover: "hover:border-white/30 hover:bg-[#16213E] hover:-translate-y-0.5",
    pillShape: "round",
    socialIconStyle: "bg-white/10 text-white border border-white/10 hover:bg-white hover:text-[#1A1A2E]",
    accentColor: "bg-white text-[#1A1A2E]",
    tagStyle: "bg-white/10 text-slate-200 border border-white/10",
  },
  sunset: {
    id: "sunset",
    name: "Sunset",
    badge: "따뜻·에너지",
    mood: "Warm & Energetic",
    containerBg: "bg-gradient-to-br from-[#FF6B6B] to-[#FFC154]",
    textColor: "text-white",
    subtextColor: "text-white/80",
    cardBase: "bg-white/20 backdrop-blur-md border border-white/40 text-white shadow-md",
    cardHover: "hover:bg-white/30 hover:border-white/60 hover:scale-[1.01]",
    pillShape: "pill",
    socialIconStyle: "bg-white/20 text-white border border-white/30 hover:bg-white hover:text-[#FF6B6B]",
    accentColor: "bg-white text-[#FF6B6B]",
    tagStyle: "bg-white/20 text-white border border-white/30",
  },
  ocean: {
    id: "ocean",
    name: "Ocean",
    badge: "차분·신뢰",
    mood: "Calm & Trust",
    containerBg: "bg-[#0F3460]",
    textColor: "text-white",
    subtextColor: "text-cyan-200/70",
    cardBase: "bg-[#162447] border border-[#00ADB5]/40 text-white shadow-[0_0_15px_rgba(0,173,181,0.15)]",
    cardHover: "hover:border-[#00ADB5] hover:bg-[#1a2c56] hover:-translate-y-0.5",
    pillShape: "pill",
    socialIconStyle: "bg-[#162447] text-cyan-300 border border-[#00ADB5]/30 hover:bg-[#00ADB5] hover:text-[#0F3460]",
    accentColor: "bg-[#00ADB5] text-[#0F3460]",
    tagStyle: "bg-[#00ADB5]/15 text-[#00ADB5] border border-[#00ADB5]/30",
  },
  blossom: {
    id: "blossom",
    name: "Blossom",
    badge: "부드럽·귀여운",
    mood: "Soft & Lovely",
    containerBg: "bg-[#FFF0F5]",
    textColor: "text-[#4A2E35]",
    subtextColor: "text-[#8E6E75]",
    cardBase: "bg-white/90 border border-pink-200 text-[#4A2E35] shadow-sm",
    cardHover: "hover:border-pink-400 hover:bg-white hover:-translate-y-0.5 hover:shadow-md",
    pillShape: "round",
    socialIconStyle: "bg-pink-100/80 text-pink-700 border border-pink-200 hover:bg-pink-500 hover:text-white",
    accentColor: "bg-pink-500 text-white",
    tagStyle: "bg-pink-100 text-pink-700 border border-pink-200",
  },
};
