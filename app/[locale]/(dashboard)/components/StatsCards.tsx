import { Grid } from '@mui/material';
import React from 'react';
import UsersCard from '@/app/[locale]/(dashboard)/components/UsersCard';

const StatsCards = ({
  usersPerMonth,
  tripsPerMonth,
  onlineUsersCount,
}: {
  usersPerMonth: number[];
  tripsPerMonth: number[];
  onlineUsersCount: number;
}) => {
  return (
    <Grid container spacing={1} mt={2}>
      <Grid size={{ xs: 12, lg: 4 }}>
        <UsersCard state="total_user" data={usersPerMonth} />
      </Grid>
      <Grid size={{ xs: 12, lg: 4 }}>
        <UsersCard state="total_trips" data={tripsPerMonth} />
      </Grid>
      <Grid size={{ xs: 12, lg: 4 }}>
        <UsersCard
          state="active_users_today"
          data={[5, 15, 12, 18, 20, 17, 22, 25, 23, 28]}
          activeUserToday={onlineUsersCount}
        />
      </Grid>
    </Grid>
  );
};

export default StatsCards;
