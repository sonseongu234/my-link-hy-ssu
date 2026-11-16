import { PublicProfileView } from "@/components/public/PublicProfileView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "마이링크 (MyLink) — 인플루언서·크리에이터 링크 페이지",
  description: "인플루언서·크리에이터가 자신의 모든 링크를 하나의 심플한 페이지에 모아 공유할 수 있는 링크-인-바이오 서비스",
};

export default function HomePage() {
  return <PublicProfileView />;
}
