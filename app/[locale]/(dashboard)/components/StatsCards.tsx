import { Grid } from '@mui/material';
import React from 'react';
import UsersCard from '@/app/[locale]/(dashboard)/components/UsersCard';
const StatsCards = () => {
  return (
    <Grid container spacing={1} mt={2}>
      <Grid size={{ xs: 12, lg: 4 }}>
        <UsersCard
          state="total_user"
          data={[10, 15, 12, 18, 20, 17, 22, 25, 23, 28]}
        />
      </Grid>
      <Grid size={{ xs: 12, lg: 4 }}>
        <UsersCard
          state="total_trips"
          data={[30, 15, 12, 18, 20, 17, 22, 25, 23, 28]}
        />
      </Grid>
      <Grid size={{ xs: 12, lg: 4 }}>
        <UsersCard
          state="active_users_today"
          data={[5, 15, 12, 18, 20, 17, 22, 25, 23, 28]}
        />
      </Grid>
    </Grid>
  );
};

export default StatsCards;
