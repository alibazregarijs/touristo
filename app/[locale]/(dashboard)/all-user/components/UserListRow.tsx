import React from 'react';
import Image from 'next/image';
import { Grid, Stack, Typography } from '@mui/material';

const UserListRow = ({ user, index }: { user: any; index: number }) => (
  <Grid
    container
    spacing={2}
    alignItems="center"
    p={2}
    sx={{
      py: 1,
      borderBottom: { lg: 'none', xs: '1px solid #1018280F' },
      backgroundColor: index % 2 === 0 ? '#EEF9FF' : 'transparent',
    }}
  >
    {/* NAME */}
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Image
          className="rounded-full"
          src={user.image}
          alt={user.name}
          width={32}
          height={32}
        />
        <Typography fontWeight={400} fontSize="14px" noWrap>
          {user.name}
        </Typography>
      </Stack>
    </Grid>

    {/* EMAIL */}
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
      <Typography
        fontWeight={400}
        fontSize="14px"
        noWrap
        sx={{
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          maxWidth: '100%',
        }}
      >
        {user.email_address}
      </Typography>
    </Grid>

    {/* DATE JOINED */}
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
      <Typography fontWeight={400} fontSize="14px">
        {user.data_joined}
      </Typography>
    </Grid>

    {/* ITINERARY CREATED */}
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
      <Typography fontWeight={400} fontSize="14px">
        {user.itinerary_created}
      </Typography>
    </Grid>

    {/* STATUS */}
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
      <Typography fontWeight={400} fontSize="14px">
        {user.status}
      </Typography>
    </Grid>

    {/* TRASH */}
    <Grid
      size={{ xs: 12, sm: 6, md: 4, lg: 2 }}
      sx={{
        display: 'flex',
        justifyContent: { xs: 'flex-start', lg: 'center' },
      }}
    >
      <Image src="/icons/trash.png" alt="trash" width={22} height={22} />
    </Grid>
  </Grid>
);

export default UserListRow;
