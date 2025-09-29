'use client';
import React from 'react';
import { Box, Grid } from '@mui/material';
import Header from '@/app/[locale]/(dashboard)/components/Header';
import StatsCards from '@/app/[locale]/(dashboard)/components/StatsCards';
import TripsCard from '@/app/[locale]/(dashboard)/components/Trips';
import UserGrowthChart from './components/UserGrowthChart';
import TripTrendsChart from './components/TripTrendsChart';
import LatestUserSignups from './components/LatestUserSignups';
import { tripData, userData } from '@/constants';
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

const Page = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        maxHeight: { lg: '100%' },
        overflowY: 'auto', // 👈 enables vertical scrolling
      }}
      className="no-scrollbar" // 👈 prevents scrollbar
    >
      <Header
        title="Welcome Adrian 👋"
        description="Track activity, trends, and popular destinations in real time"
        buttonTitle="Create a trip"
      />
      <StatsCards />
      <TripsCard />
      <Grid container spacing={2} mt={4}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <UserGrowthChart />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <TripTrendsChart />
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={4}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <LatestUserSignups item={userData} lastUser={true} />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <LatestUserSignups item={tripData} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Page;
