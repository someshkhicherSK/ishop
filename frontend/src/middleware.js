import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  const adminToken = req.cookies.get("admin_token")?.value;

 
  if (pathname === "/admin-login") {
   
    if (adminToken) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }

    return NextResponse.next();
  }

 
  const isAdminRoute = pathname === "/admin" || pathname.startsWith("/admin/");

  if (isAdminRoute) {
    if (!adminToken) {
      return NextResponse.redirect(new URL("/admin-login", req.url));
    }
  }

 
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/admin-login"],
};
