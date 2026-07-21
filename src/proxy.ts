import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const locales = ["tr", "en", "ar"];
const defaultLocale = "tr";

// Country-to-locale mapping: covers Arabic-speaking countries and others
const countryLocaleMap: Record<string, string> = {
  // Turkish
  TR: "tr", CY: "tr",
  // Arabic-speaking countries
  SA: "ar", AE: "ar", EG: "ar", KW: "ar", QA: "ar", BH: "ar",
  OM: "ar", JO: "ar", LB: "ar", SY: "ar", IQ: "ar", YE: "ar",
  LY: "ar", TN: "ar", DZ: "ar", MA: "ar", SD: "ar",
};

function getLocale(request: NextRequest): string {
  // 1. Check Cloudflare / Vercel geo header (country code)
  const country =
    (request.headers.get("cf-ipcountry") ||
     request.headers.get("x-vercel-ip-country") ||
     "").toUpperCase();

  if (country && countryLocaleMap[country]) {
    return countryLocaleMap[country];
  }

  // 2. Fall back to Accept-Language header
  const acceptLanguage = request.headers.get("accept-language");
  if (acceptLanguage) {
    const preferred = acceptLanguage
      .split(",")
      .map((lang) => lang.split(";")[0].trim().toLowerCase().slice(0, 2));
    for (const lang of preferred) {
      if (locales.includes(lang)) return lang;
    }
  }

  return defaultLocale;
}


export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static files, _next internals, and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/apple-icon") ||
    pathname.startsWith("/icon") ||
    pathname.startsWith("/sitemap") ||
    pathname.includes(".") // static assets like .png, .ico, etc.
  ) {
    return NextResponse.next();
  }

  // Check if the pathname already has a locale prefix
  const pathnameHasLocale = locales.some(
    (locale) =>
      pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Redirect to the detected locale
  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico
     * - public folder assets
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|otf)$).*)",
  ],
};
