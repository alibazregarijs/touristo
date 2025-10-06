import React from 'react';
import Header from '@/app/[locale]/(dashboard)/components/Header';
import { Box } from '@mui/material';
import CreateTrip from '@/app/[locale]/(dashboard)/create-trip/components/CreateTrip';

const page = () => {
  return (
    <Box sx={{ maxHeight: '100%', overflowY: 'auto' }}>
      <Header
        title="Add new Trips"
        description="View and generate AI travel plans"
        buttonTitle="Show Trips"
        href="/en/AI-trips"
      />
      <CreateTrip />
    </Box>
  );
};

export default page;
