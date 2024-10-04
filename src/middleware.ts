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

  if (!isAuthenticated && !isPublicRoute) return Response.redirect(new URL(SIGNIN, nextUrl));
  if (isAuthenticated && isAuthRoute) return Response.redirect(new URL(ROOT, nextUrl));

  NextResponse.next();
};

export default middleware;

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
