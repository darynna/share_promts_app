import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  const protectedRoutes = ['/profile', '/create-prompt', '/update-prompt'];

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    // If no token, redirect to the home page 
    if (!token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
  }

  // Allow access if authenticated
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/create-prompt', '/update-prompt'],
};
