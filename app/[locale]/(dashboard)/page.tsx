'use client';
import React from 'react';
import { Box } from '@mui/material';
import Header from '@/components/Header';
import StatsCards from '@/components/StatsCards';

const Page = () => {
  return (
    <Box>
      <Header />
      <StatsCards />
    </Box>
  );
};

export default Page;
