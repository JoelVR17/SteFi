import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const walletAddress = request.cookies.get("walletAddress")?.value;
  const userRole = request.cookies.get("userRole")?.value;

  const pathname = request.nextUrl.pathname;

  const protectedRoutes = [
    "/client",
    "/dashboard",
    "/assets",
    "/asset-provider",
  ];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !walletAddress) {
    const url = request.nextUrl.clone();
    url.pathname = "/connect";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/client") && userRole !== "client") {
    const url = request.nextUrl.clone();
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  if (pathname.startsWith("/asset-provider") && userRole !== "provider") {
    const url = request.nextUrl.clone();
    url.pathname = "/unauthorized";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/client/:path*",
    "/dashboard/:path*",
    "/assets/:path*",
    "/asset-provider/:path*",
  ],
};
