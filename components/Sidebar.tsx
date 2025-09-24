import React from 'react';
import { Box, Divider, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import SidebarItems from '@/components/SidebarItems';

const Sidebar = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        minHeight: '100vh',
        width: '100%',
        paddingTop: '1rem',
        alignContent: 'space-between', // distributes rows
      }}
    >
      {/* top section */}
      <Box>
        <Stack
          direction="row"
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
            paddingX: '1rem',
          }}
        />

        <Box justifyContent="center">
          <SidebarItems />
        </Box>
      </Box>

      {/* bottom section */}
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
          <Image
            src="/icons/logout.png"
            alt="language"
            width={24}
            height={24}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
