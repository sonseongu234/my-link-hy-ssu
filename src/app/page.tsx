import Image from "next/image";

export default function Home() {
  const links = [
    {
      title: "GitHub 저장소",
      description: "배우고 만든 프로젝트 코드 모음",
      url: "https://github.com",
      icon: "💻",
    },
    {
      title: "공부 기록 블로그",
      description: "코딩 공부와 일상 기록",
      url: "https://velog.io",
      icon: "📝",
    },
    {
      title: "이메일 보내기",
      description: "궁금한 점이나 연락은 여기로",
      url: "mailto:contact@example.com",
      icon: "✉️",
    },
  ];

  return (
    <main className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-b from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 text-slate-800 dark:text-slate-100">
      <div className="w-full max-w-md mx-auto text-center flex flex-col items-center">
        {/* 프로필 이미지 */}
        <div className="relative mb-6 group">
          <div className="w-28 h-28 rounded-full overflow-hidden shadow-xl ring-4 ring-indigo-500/20 dark:ring-indigo-400/20 bg-slate-200 dark:bg-slate-800 flex items-center justify-center mx-auto transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/profile.jpg"
              alt="손성우 프로필 사진"
              width={112}
              height={112}
              className="w-full h-full object-cover"
              priority
            />
          </div>
          <span className="absolute bottom-1 right-1 text-xl bg-white dark:bg-slate-800 rounded-full p-1 shadow-md">
            🎖️
          </span>
        </div>

        {/* 뱃지 */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/50 mb-3">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
          국군장병 · 바이브 코더
        </div>

        {/* 이름 */}
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
          손성우
        </h1>

        {/* 소개글 */}
        <p className="text-base text-slate-600 dark:text-slate-300 font-medium mb-6 leading-relaxed max-w-sm">
          현재는 바이브 코딩을 배우는 군인입니다
        </p>

        {/* 태그 모음 */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {["#바이브코딩", "#군인개발자", "#Next.js", "#성장중"].map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 링크 목록 */}
        <div className="w-full space-y-3 mb-10">
          {links.map((link) => (
            <a
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-4 rounded-2xl bg-white/80 dark:bg-slate-850/80 backdrop-blur border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-center gap-3 text-left">
                <span className="text-2xl p-2 rounded-xl bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform">
                  {link.icon}
                </span>
                <div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {link.title}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {link.description}
                  </div>
                </div>
              </div>
              <svg
                className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          ))}
        </div>

        {/* 푸터 */}
        <footer className="text-xs text-slate-400 dark:text-slate-500 space-y-1">
          <p>© {new Date().getFullYear()} 손성우. All rights reserved.</p>
          <p className="text-[11px] opacity-75">열정과 끈기로 매일 한 걸음씩</p>
        </footer>
      </div>
    </main>
  );
}
