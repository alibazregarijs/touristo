'use client';
import React from 'react';
import { Box, Stack, Typography, Divider, Avatar } from '@mui/material';
import Image from 'next/image';
import SidebarItems from '@/components/SidebarItems';
import MobileNavbar from '@/components/MobileNavbar';
import { useLocale } from 'next-intl';
import LocaleSwitcher from './LocaleSwitcher';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';

const Sidebar = () => {
  const locale = useLocale();
  const isRTL = locale === 'fa';
  const { data: session } = useSession();
  const username = session?.user?.name;
  const email = session?.user?.email;

  const handleLogout = () => {
    signOut({ callbackUrl: '/sign-in' });
  };
  return (
    <>
      {/* Mobile Navbar */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' }, // visible only on mobile
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
          <Typography className="text-black-1" fontWeight={600}>
            Touristo
          </Typography>
        </Stack>
        <MobileNavbar />
      </Box>

      {/* Desktop Sidebar */}
      <Box
        sx={{
          display: { xs: 'none', md: 'grid' }, // visible only on desktop
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

          <Box>
            <SidebarItems />
          </Box>
          <Box margin={locale === 'fa' ? 1.5 : 2}>
            <LocaleSwitcher />
          </Box>
        </Box>

        <Box
          sx={{
            p: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            flexDirection: isRTL ? 'row-reverse' : 'row',
          }}
        >
          <Avatar
            sx={{
              width: 40,
              height: 40,
              bgcolor: '#70243c', // or theme.palette.primary.main
              fontWeight: 'bold',
            }}
          >
            {username?.charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ display: 'grid' }}>
            <Typography
              fontSize={'14px'}
              lineHeight={'20px'}
              fontWeight={600}
              className="text-black-1 truncate overflow-hidden font-semibold text-ellipsis"
            >
              {username}
            </Typography>
            <Typography
              fontWeight={400}
              fontSize={'12px'}
              className="truncate overflow-hidden text-ellipsis text-[##7F7E83]"
            >
              {email}
            </Typography>
          </Box>
          <Box>
            <Image
              onClick={handleLogout}
              className="cursor-pointer"
              src="/icons/logout.png"
              alt="logout"
              width={24}
              height={24}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Sidebar;
