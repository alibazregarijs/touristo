'use client';
import { useMemo } from 'react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { muiCreateTheme } from '@/lib/MuiTheme';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useDirection } from '@/lib/DirectionProvider'; // Adjust path as needed

const MuiThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { direction } = useDirection();

  // Create caches only once
  const { cacheLtr, cacheRtl } = useMemo(
    () => ({
      cacheLtr: createCache({
        key: 'muiltr',
        stylisPlugins: [prefixer],
      }),
      cacheRtl: createCache({
        key: 'muirtl',
        stylisPlugins: [prefixer, rtlPlugin],
      }),
    }),
    []
  );

  // Create theme based on current direction
  const theme = useMemo(() => muiCreateTheme({ direction }), [direction]);

  return (
    <div suppressHydrationWarning>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <CacheProvider value={direction === 'ltr' ? cacheLtr : cacheRtl}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </ThemeProvider>
        </CacheProvider>
      </AppRouterCacheProvider>
    </div>
  );
};

export default MuiThemeProvider;
