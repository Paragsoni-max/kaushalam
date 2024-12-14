import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token");

  if (token) {
    if (req.nextUrl.pathname === "/sign-in" || req.nextUrl.pathname === "/sign-up") {
      return NextResponse.redirect(new URL("/todos", req.url));
    }
    return NextResponse.next(); 
  }

  if (req.nextUrl.pathname === "/sign-in" || req.nextUrl.pathname === "/sign-up") {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/sign-in", req.url));
}

export const config = {
  matcher: ["/todos", "/sign-in", "/sign-up"],
};
