// lib/emotionCache.ts
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';

export const createEmotionCache = (direction: 'ltr' | 'rtl') => {
  return createCache({
    key: direction === 'ltr' ? 'muiltr' : 'muirtl',
    stylisPlugins: direction === 'ltr' ? [prefixer] : [prefixer, rtlPlugin],
  });
};
