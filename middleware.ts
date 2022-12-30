import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const session = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (url.pathname === "/") {
    url.pathname = "/login";
  }
  if (!session) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  } else {
    if (url.pathname === "/login") {
      url.pathname = "/home";
      return NextResponse.redirect(url);
    }
  }
}

export const config = {
  matcher: ["/", "/home"],
};
