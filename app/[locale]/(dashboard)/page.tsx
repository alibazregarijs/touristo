'use client';
import React from 'react';
import { Box, Grid } from '@mui/material';
import Header from '@/app/[locale]/(dashboard)/components/Header';
import StatsCards from '@/app/[locale]/(dashboard)/components/StatsCards';
import TripsCard from '@/app/[locale]/(dashboard)/components/Trips';
import UserGrowthChart from './components/UserGrowthChart';
const Page = () => {
  return (
    <Box
      sx={{
        maxHeight: '100vh',
        overflowY: 'auto', // 👈 enables vertical scrolling
      }}
      className="no-scrollbar" // 👈 prevents scrollbar
    >
      <Header />
      <StatsCards />
      <TripsCard />
      <Grid container spacing={2} mt={4}>
        <Grid size={{ lg: 6 }}>
          <UserGrowthChart />
        </Grid>
        <Grid size={{ lg: 6 }}>
          <UserGrowthChart />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Page;
