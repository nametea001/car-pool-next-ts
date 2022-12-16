import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  // const url = req.nextUrl.clone();

  // index rediect
  if (req.nextUrl.pathname === "/") {
    req.nextUrl.pathname = "/login";
    return NextResponse.redirect(req.nextUrl);
  }
  // logout controll
  if (req.nextUrl.pathname === "/logout") {
    req.nextUrl.pathname = "/login";
    return NextResponse.redirect(req.nextUrl);
  }
}

export const config = {
  matcher: ["/", "/login", "/logout", "/home"],
};
