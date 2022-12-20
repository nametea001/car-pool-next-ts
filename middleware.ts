import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // const url = req.nextUrl.clone();
  const session = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  if (!session) {
    req.nextUrl.pathname = "/login";
    return NextResponse.redirect(req.nextUrl);
  }
}

export const config = {
  matcher: [],
};
