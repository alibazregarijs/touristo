import { Box, Stack, Typography, Divider } from '@mui/material';
import React from 'react';
import Image from 'next/image';
import SidebarItems from '@/components/SidebarItems';

const Page = () => {
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
      <Stack
        direction="row" // horizontal layout
        alignItems="center" // vertically centered
        justifyContent="center" // horizontally left aligned
        className="mt-48"
        sx={{
          height: '100%',
          width: '100%',
          padding: '0 4px',
        }}
        spacing={0.5} // gap between boxes
      >
        <Box>
          <Image
            src="/images/user-profile.png"
            quality={100}
            className="rounded-full"
            alt="user-profile"
            width={40}
            height={40}
          />
        </Box>
        <Box>
          <Stack direction="column" spacing={{ xs: 0, lg: 0.5 }}>
            <Typography
              className="text-black-1"
              fontWeight={600}
              noWrap
              sx={{
                maxWidth: 90,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: { xs: '10px', md: '12px', lg: '14px' }, // bigger on lg+
                lineHeight: { xs: '12px', md: '14px', lg: '18px' }, // adjust line height accordingly
              }}
            >
              Username
            </Typography>

            <Typography
              noWrap
              fontWeight={400}
              sx={{
                maxWidth: 90,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: { xs: '6px', md: '10px', lg: '12px' }, // smaller than Username
                lineHeight: { xs: '10px', md: '12px', lg: '16px' }, // adjust for readability
              }}
            >
              adrian@gmail.com
            </Typography>
          </Stack>
        </Box>
        <Box>
          <Typography>
            <Image
              src="/icons/logout.png"
              alt="user-profile"
              width={24}
              height={24}
            />
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default Page;
