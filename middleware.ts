import jwtDecode from "jwt-decode";
import { NextResponse, type NextRequest } from "next/server";
import routes from "./helpers/routes";

export async function middleware(request: NextRequest) {
  const { url, nextUrl, cookies } = request;

  let user = null;
  const nextResponse = NextResponse.next();

  const userCookie = cookies.get("app-token");

  if (userCookie) {
    const decoded = jwtDecode(userCookie.value, { header: false });
    user = decoded;
  }

  const searchParams = new URLSearchParams(nextUrl.searchParams);
  searchParams.set("redirectUrl", nextUrl.pathname);

  if (nextUrl.pathname.startsWith(routes.LOGIN) && user) {
    return NextResponse.redirect(new URL(routes.HOME, url));
  }

  // if (
  //   nextUrl.pathname.startsWith('/profile') ||
  //   nextUrl.pathname.startsWith(routes.MY_SOLUTIONS)
  // ) {
  //   if (!user) {
  //     return NextResponse.redirect(
  //       new URL(`${routes.LOGIN}?${searchParams}`, url),
  //     );
  //   }
  // }

  // desabilita a /doc para os ambientes de produção e homologação
  if (nextUrl.hostname !== "localhost" && nextUrl.pathname.startsWith("/doc")) {
    return NextResponse.redirect(new URL(routes.HOME, url));
  }

  if (
    nextUrl.pathname.startsWith(routes.CREATE_ACCOUNT) &&
    !!nextUrl.searchParams.get("data")
  ) {
    if (!user) {
      return NextResponse.redirect(
        new URL(`${routes.LOGIN}?${searchParams}`, url),
      );
    }
  }

  return nextResponse;
}

export const config = {
  matcher: [
    routes.LOGIN,
    routes.PROFILE + "/*",
    routes.MY_SOLUTIONS,
    "/doc",
    routes.CREATE_ACCOUNT,
    routes.HOME,
  ],
};
