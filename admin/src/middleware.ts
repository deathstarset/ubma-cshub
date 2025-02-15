import { NextRequest, NextResponse } from "next/server";
import { verifyJWT } from "@/utils/jwt";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  const payload = await verifyJWT(token);
  if (!payload) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
