'use client';
import React from 'react';
import {
  Box,
  Stack,
  Typography,
  Divider,
  Avatar,
  Skeleton,
} from '@mui/material';
import Image from 'next/image';
import { useLocale } from 'next-intl';

const SidebarSkeleton = () => {
  const locale = useLocale();
  const isRTL = locale === 'fa';

  return (
    <>
      {/* Mobile Navbar Skeleton */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 1,
          borderBottom: '1px solid #ECF2EF',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
      >
        <Stack
          direction={isRTL ? 'row-reverse' : 'row'}
          alignItems="center"
          gap={0.5}
        >
          <Image src="/images/logo.png" alt="logo" width={30} height={30} />
          <Typography fontWeight={600}>Touristo</Typography>
        </Stack>
        <Skeleton variant="circular" width={32} height={32} />
      </Box>

      {/* Desktop Sidebar Skeleton */}
      <Box
        sx={{
          display: { xs: 'none', md: 'grid' },
          minHeight: '100vh',
          width: '100%',
          paddingTop: '1rem',
          alignContent: 'space-between',
          borderRight: isRTL ? 'none' : '1px solid #f2efecff',
          borderLeft: isRTL ? '1px solid #ECF2EF' : 'none',
          borderBottom: '1px solid #ECF2EF',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
      >
        <Box>
          <Stack
            direction={isRTL ? 'row-reverse' : 'row'}
            justifyContent={isRTL ? 'end' : 'start'}
            alignItems="center"
            gap={0.5}
            sx={{ paddingX: '1rem' }}
          >
            <Image src="/images/logo.png" alt="logo" width={30} height={30} />
            <Typography>Touristo</Typography>
          </Stack>

          <Divider
            variant="fullWidth"
            sx={{
              my: 4,
              borderColor: '#ECF2EF',
              marginX: '1rem',
            }}
          />

          {/* Sidebar Items Skeleton */}
          <Box sx={{ px: '1rem' }}>
            {[...Array(5)].map((_, i) => (
              <Skeleton
                key={i}
                variant="rectangular"
                height={32}
                sx={{ my: 1, borderRadius: '6px' }}
              />
            ))}
          </Box>

          <Box margin={locale === 'fa' ? 1.5 : 2}>
            <Skeleton variant="rectangular" width={100} height={32} />
          </Box>
        </Box>

        {/* User Info Skeleton */}
        <Box
          sx={{
            p: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexDirection: isRTL ? 'row-reverse' : 'row',
          }}
        >
          <Skeleton variant="circular" width={40} height={40} />
          <Box sx={{ display: 'grid', flex: 1 }}>
            <Skeleton width="80%" height={20} />
            <Skeleton width="60%" height={16} />
          </Box>
          <Skeleton variant="circular" width={24} height={24} />
        </Box>
      </Box>
    </>
  );
};

export default SidebarSkeleton;
