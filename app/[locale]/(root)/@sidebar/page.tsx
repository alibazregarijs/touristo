'use client';
import { Box, Stack, Typography, Divider } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import SidebarItems from '@/app/[locale]/(root)/@sidebar/components/SidebarItems';
import { usePathname } from 'next/navigation';
const Page = () => {
  const pathname = usePathname();
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        borderTopLeftRadius: '16px',
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        backgroundColor: '#FFFFFF',
        height: '50vh',
      }}
    >
      <Box sx={{ height: '100%', width: '100%' }}>
        {/* Outer vertical stack */}
        <Stack>
          {/* Row with logo + text */}
          <Stack
            direction="row"
            spacing={0.5}
            alignItems="center"
            className="mt-[12px] ml-[10px] lg:ml-[20px]"
          >
            <Image src="/images/logo.png" alt="logo" width={30} height={30} />
            <Typography
              sx={{
                color: '#1F1F36',
                lineHeight: '24px',
                fontWeight: 700,
                fontSize: '18px',
              }}
            >
              Touristo
            </Typography>
          </Stack>

          {/* Divider below the row */}
        </Stack>
        <Divider
          sx={{
            mt: '12px',
            mx: '10px',
            lg: { mx: '20px' },
            borderColor: '#ECF2EF',
          }}
        />
        <SidebarItems />
      </Box>

      {/* <Box sx={{height:'100%',width:'100%'}}>

      </Box> */}
    </Box>
  );
};

export default Page;
