// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";

// export async function middleware(req) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

//   const protectedRoutes = ['/profile', '/create-prompt', '/update-prompt'];

//   if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
//     // If no token, redirect to the home page 
//     if (!token) {
//       return NextResponse.redirect(new URL('/', req.url));
//     }
//   }

//   // Allow access if authenticated
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ['/profile', '/create-prompt', '/update-prompt'],
// };

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Define protected routes
  const protectedRoutes = ['/profile', '/create-prompt', '/update-prompt'];

  // Check if the user is accessing the base /profile page (not /profile/[id])
  if (
    protectedRoutes.some((route) => req.nextUrl.pathname === route) &&
    !token
  ) {
    // If no token, redirect to the home page or sign-in page
    return NextResponse.redirect(new URL('/', req.url)); // You can replace '/' with '/login' if needed
  }

  // Allow access if authenticated or if not a protected route
  return NextResponse.next();
}

export const config = {
  matcher: ['/profile', '/create-prompt', '/update-prompt', '/profile/[id]'],
};
