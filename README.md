# 마이링크 (MyLink) 🔗

Next.js와 TypeScript 기반의 개인 맞춤 링크 모음 서비스 프로젝트입니다.

---

## 📁 프로젝트 구조 (Project Structure)

```text
my-link-hy-ssu/
├── public/                 # 정적 리소스 (아이콘, 이미지 등)
├── src/
│   ├── app/                # App Router 페이지 & 레이아웃
│   │   ├── globals.css     # 전역 CSS & Tailwind 스타일
│   │   ├── layout.tsx      # 루트 레이아웃
│   │   └── page.tsx        # 메인 링크 모음 페이지
│   ├── components/         # 재사용 가능한 UI 컴포넌트
│   │   └── LinkCard.tsx    # 개별 링크 카드 컴포넌트
│   └── types/              # TypeScript 타입 정의
│       └── link.ts         # 링크 및 프로필 데이터 인터페이스
├── .gitignore              # Git 무시 파일 목록
├── next.config.ts          # Next.js 환경 설정
├── package.json            # 프로젝트 메타데이터 및 의존성
├── postcss.config.mjs      # PostCSS 설정
├── tailwind.config.ts      # Tailwind CSS 설정
├── tsconfig.json           # TypeScript 설정
└── README.md               # 프로젝트 설명서
```

---

## 🚀 시작하기 (Getting Started)

### 1. 패키지 설치
Node.js가 설치된 환경의 터미널에서 다음 명령어를 실행하여 필요한 패키지를 설치합니다:

```bash
npm install
# 또는
pnpm install
# 또는
yarn install
```

### 2. 개발 서버 실행
설치가 완료되면 로컬 개발 서버를 실행합니다:

```bash
npm run dev
# 또는
pnpm dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 결과를 확인할 수 있습니다.

---

## 🛠 사용된 기술 스택
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
