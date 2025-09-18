'use client';

import * as React from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { useServerInsertedHTML } from 'next/navigation';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';

export default function EmotionRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  const cache = React.useMemo(
    () =>
      createCache({
        key: 'mui-rtl',
        stylisPlugins: [prefixer, rtlPlugin],
      }),
    []
  );

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(' '),
      }}
    />
  ));

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
