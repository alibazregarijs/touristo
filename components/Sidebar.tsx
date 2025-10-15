'use client';
import React from 'react';
import { Box, Stack, Typography, Divider, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import SidebarItems from '@/components/SidebarItems';
import MobileNavbar from '@/components/MobileNavbar';
import { useLocale } from 'next-intl';

const Sidebar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const locale = useLocale();
  const isRTL = locale === 'fa';

  if (isMobile) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 1,
          borderBottom: '1px solid #ECF2EF',
          direction: isRTL ? 'rtl' : 'ltr', // 👈 set text direction
        }}
      >
        <Stack
          direction={isRTL ? 'row-reverse' : 'row'} // 👈 flip logo/text order
          alignItems="center"
          gap={0.5}
        >
          <Image src="/images/logo.png" alt="logo" width={30} height={30} />
          <Typography className="text-black-1" fontWeight={600}>
            Touristo
          </Typography>
        </Stack>
        <MobileNavbar />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        minHeight: '100vh',
        width: '100%',
        paddingTop: '1rem',
        alignContent: 'space-between',
        borderRight: isRTL ? 'none' : '1px solid #ECF2EF', // 👈 border side
        borderLeft: isRTL ? '1px solid #ECF2EF' : 'none',
        borderBottom: '1px solid #ECF2EF',
        direction: isRTL ? 'rtl' : 'ltr', // 👈 set text direction
      }}
    >
      <Box>
        <Stack
          direction={isRTL ? 'row-reverse' : 'row'}
          justifyContent="start"
          alignItems="center"
          spacing={0.5}
          sx={{ paddingX: '1rem' }}
        >
          <Image src="/images/logo.png" alt="logo" width={30} height={30} />
          <Typography className="text-black-1">Touristo</Typography>
        </Stack>

        <Divider
          variant="fullWidth"
          sx={{
            my: 4,
            borderColor: '#ECF2EF',
            marginX: '1rem',
          }}
        />

        <Box justifyContent="center">
          <SidebarItems />
        </Box>
      </Box>

      <Box sx={{ p: '1rem', display: 'flex', alignItems: 'center', gap: 1 }}>
        <Image
          className="hidden rounded-full lg:flex"
          src="/images/user-profile.png"
          alt="user-profile"
          width={40}
          height={40}
        />
        <Box sx={{ display: 'grid' }}>
          <Typography
            fontSize={'14px'}
            lineHeight={'20px'}
            fontWeight={600}
            className="text-black-1 truncate overflow-hidden font-semibold text-ellipsis"
          >
            Adrian Hajdin
          </Typography>
          <Typography
            fontWeight={400}
            fontSize={'12px'}
            className="truncate overflow-hidden text-ellipsis text-[##7F7E83]"
          >
            adrian@jsmaster.com
          </Typography>
        </Box>
        <Box>
          <Image src="/icons/logout.png" alt="logout" width={24} height={24} />
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
