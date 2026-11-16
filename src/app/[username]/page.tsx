import { PublicProfileView, PublicProfileData } from "@/components/public/PublicProfileView";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{
    username: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username).replace(/^@/, "");

  return {
    title: `@${decodedUsername} | 마이링크 (MyLink)`,
    description: `@${decodedUsername} 님의 모든 소셜 미디어 및 링크 모음 페이지입니다.`,
    openGraph: {
      title: `@${decodedUsername} | 마이링크`,
      description: `@${decodedUsername} 님의 공식 링크 페이지`,
    },
  };
}

export default async function UserProfilePage({ params }: PageProps) {
  const { username } = await params;
  const cleanUsername = decodeURIComponent(username).replace(/^@/, "");

  const userProfile: PublicProfileData = {
    username: cleanUsername,
    displayName: cleanUsername === "jimin_daily" ? "김지민 (지민 데일리)" : cleanUsername,
    bio:
      cleanUsername === "jimin_daily"
        ? "지민의 일상과 최애템 모음집✨ 매주 새로운 공구와 VLOG 업데이트!"
        : `${cleanUsername} 님의 공식 마이링크 페이지입니다. 모든 공식 링크를 한곳에서 확인하세요.`,
    photoURL:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    socials: [
      { platform: "instagram", url: `https://instagram.com/${cleanUsername}`, label: "Instagram" },
      { platform: "youtube", url: "https://youtube.com", label: "YouTube" },
      { platform: "tiktok", url: "https://tiktok.com", label: "TikTok" },
      { platform: "twitter", url: `https://x.com/${cleanUsername}`, label: "X" },
      { platform: "email", url: "mailto:contact@example.com", label: "Email" },
    ],
    links: [
      {
        id: "link-1",
        title: cleanUsername === "jimin_daily" ? "이번 주 블로그 공구 마켓 오픈!" : "공식 웹사이트 / 포트폴리오",
        description: cleanUsername === "jimin_daily" ? "인기 뷰티 & 라이프스타일 핫딜 최대 40% 할인" : "주요 프로젝트 및 상세 정보",
        url: "https://github.com/sonseongu234",
        icon: "globe",
        badge: "HOT",
        category: "blog",
      },
      {
        id: "link-2",
        title: cleanUsername === "jimin_daily" ? "최신 VLOG 영상 보러가기" : "GitHub 코드 저장소",
        description: cleanUsername === "jimin_daily" ? "주말 브이로그 & 겟레디위드미 업로드 완료" : "오픈소스 기여 및 최신 프로젝트",
        url: "https://youtube.com",
        icon: "sparkles",
        badge: "NEW",
        category: "repo",
      },
      {
        id: "link-3",
        title: "협업 및 비즈니스 1:1 문의",
        description: "브랜드 협업, 광고, 강연 및 제휴 문의 창구",
        url: "mailto:contact@example.com",
        icon: "mail",
        badge: "Contact",
        category: "contact",
      },
    ],
  };

  return <PublicProfileView initialProfile={userProfile} />;
}
