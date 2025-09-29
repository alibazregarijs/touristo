import type { Metadata } from 'next';
import './globals.css';
import { inter, fontVazir } from '@/lib/Fonts';
import MuiThemeProvider from '@/lib/MuiThemeProvider';
import TranslationProvider from '@/lib/TranslationProvider';
import { DirectionProvider } from '@/lib/DirectionProvider'; // Adjust path as needed
import { getLocale } from 'next-intl/server';
import { cookies } from 'next/headers';
import { ConvexClientProvider } from '@/lib/ConvexClientProvider';
import { SessionProvider } from 'next-auth/react';
import 'leaflet/dist/leaflet.css';

export const metadata: Metadata = {
  title: 'Touristo',
  description: 'Make travel easy',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;

  // Use cookie as the source of truth, fallback to getLocale
  let locale: string;
  let direction: 'ltr' | 'rtl';

  if (localeCookie) {
    locale = localeCookie;
    direction = localeCookie === 'en' ? 'ltr' : 'rtl';
  } else {
    locale = await getLocale();
    direction = locale === 'en' ? 'ltr' : 'rtl';
  }

  return (
    <html
      lang={locale}
      className="no-scrollbar"
      dir={direction}
      suppressHydrationWarning
    >
      <body
        className={`${inter.variable} ${fontVazir.variable} bg-[#F9FBFC]!`}
        suppressHydrationWarning
      >
        <SessionProvider>
          <ConvexClientProvider>
            <DirectionProvider initialDirection={direction}>
              <TranslationProvider>
                <MuiThemeProvider>{children}</MuiThemeProvider>
              </TranslationProvider>
            </DirectionProvider>
          </ConvexClientProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
