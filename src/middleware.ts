import { NextRequest, NextResponse } from "next/server";
import { SIGNIN, PUBLIC_ROUTES, ROOT } from "./constant/routes";
import { auth } from "./auth";

const middleware = async (request: NextRequest) => {
  const { nextUrl } = request;
  const session = await auth();
  const isAuthenticated = !!session?.user;

  const isPublicRoute =
    PUBLIC_ROUTES.find((route) => nextUrl.pathname.startsWith(route)) || nextUrl.pathname === ROOT;

  const isAuthRoute = nextUrl.pathname.startsWith("/auth");
  const isUserProfileRoute = nextUrl.pathname.startsWith("/u");

  /** ---> If user not logged in and try to access private pages. */
  if (!isAuthenticated && !isPublicRoute) {
    const redirectTo = encodeURIComponent(nextUrl.pathname + nextUrl.search);
    return Response.redirect(new URL(`${SIGNIN}?redirectTo=${redirectTo}`, nextUrl));
  }

  /** ---> If user logged in and try to access auth pages. */
  if (isAuthenticated && isAuthRoute) return Response.redirect(new URL(ROOT, nextUrl));

  /** ---> If username not starts with @ then redirecting to 404 not found page. */
  if (isUserProfileRoute && !nextUrl.pathname.split("/u/")[1].startsWith("@")) {
    return NextResponse.rewrite(new URL("/404", nextUrl));
  } else {
    const regexForCheckIsProfileUpdateRoute = /^\/u\/@[^/]+\/update(\?.*)?$/;
    if (regexForCheckIsProfileUpdateRoute.test(nextUrl.pathname)) {
      const username = nextUrl.pathname.match(/^\/u\/@([^/]+)\/update(\?.*)?$/)?.[1];
      if (username !== session?.user.username) {
        /** ---> If user accessing update profile page for another user's username. then redirecting to user's profile page. */
        return NextResponse.redirect(new URL(`/u/@${username}`, nextUrl));
      }
    }
  }

  NextResponse.next();
};

export default middleware;

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
