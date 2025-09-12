// app/fonts.ts
import localFont from 'next/font/local';
import { Inter } from 'next/font/google';

// External Google font
export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

// Local font (placed inside /app or /public/fonts)
export const fontVazir = localFont({
  src: [
    // Regular
    {
      path: '../public/fonts/Vazir-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/Vazir-Regular.woff',
      weight: '400',
      style: 'normal',
    },

    // Medium
    {
      path: '../public/fonts/Vazir-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/Vazir-Medium.woff',
      weight: '500',
      style: 'normal',
    },

    // Bold
    {
      path: '../public/fonts/Vazir-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    { path: '../public/fonts/Vazir-Bold.woff', weight: '700', style: 'normal' },
  ],
  variable: '--font-vazir',
  display: 'swap',
});
