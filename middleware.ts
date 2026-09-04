import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const acceptLanguage = request.headers.get("accept-language")?.toLowerCase() ?? "";
    const locale = acceptLanguage.includes("es") ? "es" : "en";
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}`;
    return NextResponse.redirect(url);
  }

  const locale = pathname.startsWith("/es") ? "es" : "en";
  const headers = new Headers(request.headers);
  headers.set("x-pixeldojo-locale", locale);

  return NextResponse.next({
    request: { headers },
  });
}

export const config = {
  matcher: ["/", "/en/:path*", "/es/:path*"],
};
