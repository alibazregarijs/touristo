'use client';
import React from 'react';
import { Box } from '@mui/material';
import Header from '@/components/Header';
import StatsCards from '@/components/StatsCards';
import TripsCard from '@/app/[locale]/(dashboard)/components/Trips';
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
    </Box>
  );
};

export default Page;
