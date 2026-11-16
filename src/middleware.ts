import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle /@username requests -> rewrite to /[username]
  if (pathname.startsWith("/@")) {
    const username = pathname.slice(2);
    return NextResponse.rewrite(new URL(`/${username}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/@:path*"],
};
