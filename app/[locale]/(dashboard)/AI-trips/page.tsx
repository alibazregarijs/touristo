import React from 'react';
import Header from '@/app/[locale]/(dashboard)/components/Header';
import { Box } from '@mui/material';
import CreateTrip from './components/CreateTrip';
const page = () => {
  return (
    <Box sx={{ maxHeight: '100%', overflowY: 'auto' }}>
      <Header
        title="Add new Trips"
        description="View and generate AI travel plans"
        buttonTitle="Create a trip"
        href="/en/create-trip"
      />
      <CreateTrip />
    </Box>
  );
};

export default page;
