// middleware.ts
import createIntlMiddleware from 'next-intl/middleware';
import { auth } from '@/auth';
import { routing } from '@/i18n/routing';
import { NextResponse } from 'next/server';

const intlMiddleware = createIntlMiddleware(routing);

const publicRoutes = ['/sign-in', '/sign-up'];

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  // Normalize path (remove trailing slash)
  const path = nextUrl.pathname.replace(/\/$/, '');

  // Check if the path is public (with or without locale prefix)
  const isPublicRoute = publicRoutes.some(
    (route) =>
      path === route ||
      routing.locales.some((locale) => path === `/${locale}${route}`)
  );

  if (isPublicRoute) {
    // Public route → only apply intl
    return intlMiddleware(req);
  }

  if (!isLoggedIn) {
    // Detect locale from path or fallback
    const locale =
      routing.locales.find(
        (loc) => path.startsWith(`/${loc}/`) || path === `/${loc}`
      ) || routing.defaultLocale;

    // Redirect to localized sign-in with callback
    const signInUrl = new URL(`/${locale}/sign-in`, nextUrl.origin);
    signInUrl.searchParams.set('callbackUrl', nextUrl.href);
    return NextResponse.redirect(signInUrl);
  }

  // Authenticated → apply intl
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - static files (_next/static, _next/image, etc.)
     * - favicon.ico
     * - public assets (robots.txt, sitemap.xml, etc.)
     * - API routes (optional, remove if you want auth on APIs)
     */
    '/((?!_next|api|.*\\.(?:jpg|jpeg|png|gif|webp|svg|ico|woff|woff2|ttf|otf|css|js)$).*)',
  ],
};
