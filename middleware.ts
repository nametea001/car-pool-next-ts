import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  // const url = req.nextUrl.clone();
  // const session = await getToken({
  //   req: req,
  //   secret: process.env.NEXTAUTH_SECRET,
  // });
  // if (req.nextUrl.pathname === "/") {
  //   req.nextUrl.pathname = "/login";
  // }
  // if (!session) {
  //   // if(req.nextUrl.pathname = "/logout"){
  //   // }
  //   req.nextUrl.pathname = "/login";
  //   return NextResponse.redirect(req.nextUrl);
  // } else {
  //   if (req.nextUrl.pathname === "/login") {
  //     req.nextUrl.pathname = "/home";
  //     return NextResponse.redirect(req.nextUrl);
  //   }
  // }
}

// export const config = {
//   matcher: ["/", "/home"],
// };
