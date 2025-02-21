import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Add the paths that need to be protected
const protectedPaths = ["/add-products"];

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Check if the path should be protected
  if (protectedPaths.some(prefix => path.startsWith(prefix))) {
    // Check for the auth token in cookies
    const authToken = request.cookies.get("admin-token");

    // If there's no token, redirect to admin login
    if (!authToken) {
      const url = new URL("/admin", request.url);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * 1. /api (API routes)
     * 2. /_next (Next.js internals)
     * 3. /static (static files)
     * 4. /_vercel (Vercel internals)
     * 5. /favicon.ico, /robots.txt (static files)
     */
    "/((?!api|_next|_vercel|static|favicon.ico|robots.txt).*)",
  ],
}; 