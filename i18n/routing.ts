import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'fa'],

  // Used when no locale matches
  defaultLocale: 'en',
  pathnames: {
    '/sign-in': {
      en: '/sign-in',
      fa: '/sign-in',
    },
    '/AllUser': {
      en: '/AllUser',
      fa: '/AllUser',
    },
    '/AItrips': {
      en: '/AItrips',
      fa: '/AItrips',
    },
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export type Locale = (typeof routing.locales)[number];
export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
