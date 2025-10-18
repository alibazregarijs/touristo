import React from 'react';
import Image from 'next/image';
import { Grid, Stack, Typography, Avatar } from '@mui/material';
import { useLocale } from 'next-intl';
import type { UserInfoI } from '@/types';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

const UserListRow = ({
  user,
  index,
  setUsersToShow,
}: {
  user: any;
  index: number;
  setUsersToShow: React.Dispatch<React.SetStateAction<UserInfoI[]>>;
}) => {
  const locale = useLocale();
  const isRTL = locale === 'fa';
  const deleteUser = useMutation(api.user.deleteUser);

  const removeUser = (userId: string) => {
    setUsersToShow((prev) => prev.filter((u) => u.id !== userId));
    deleteUser({ id: userId as Id<'users'> });
  };

  return (
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
        <Stack
          direction={isRTL ? 'row-reverse' : 'row'}
          spacing={1}
          alignItems="center"
          justifyContent={isRTL ? 'flex-end' : 'flex-start'}
        >
          <Avatar
            sx={{
              bgcolor: '#fd366e',
              width: 32,
              height: 32,
              fontSize: '14px',
              fontWeight: 600,
            }}
          >
            {user.name?.charAt(0).toUpperCase()}
          </Avatar>

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
          {user.date_joined}
        </Typography>
      </Grid>

      {/* ITINERARY CREATED */}
      <Grid px={{ lg: 4.5, md: 1.5 }} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
        <Typography fontWeight={400} fontSize="14px">
          {user.itinerary_created}
        </Typography>
      </Grid>

      {/* STATUS */}
      <Grid px={{ lg: 1 }} size={{ xs: 12, sm: 6, md: 4, lg: 2 }}>
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
        <Image
          onClick={() => removeUser(user.id)}
          src="/icons/trash.png"
          alt="trash"
          width={22}
          height={22}
          className="cursor-pointer"
        />
      </Grid>
    </Grid>
  );
};

export default UserListRow;
