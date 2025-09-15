import createIntlMiddleware from 'next-intl/middleware';
import { auth } from '@/auth';
import { routing } from '@/i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export default auth((req) => {
  // First run auth middleware
  // Then run intl middleware
  return intlMiddleware(req);
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(en|fa)/:path*'],
};
