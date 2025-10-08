import React from 'react';
import Header from '@/app/[locale]/(dashboard)/components/Header';
import { Box } from '@mui/material';
import { tripsObj } from '@/constants';
import ListTrips from './components/ListTrips';
import { convex } from '@/lib/Convex';
import { api } from '@/convex/_generated/api';
import { auth } from '@/auth';
import { fetchQuery } from 'convex/nextjs';
import { parseTripToTripDetails } from '@/lib';

const page = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  const trips = await fetchQuery(api.trips.allTripsForUser, {
    userId: userId as string,
  });

  const randomTrips = parseTripToTripDetails(trips);

  return (
    <Box sx={{ maxHeight: '100%', overflowY: 'auto' }}>
      <Header
        title="Trips"
        description="View and generate AI travel plans"
        buttonTitle="Create a trip"
        href="/en/create-trip"
      />
      <ListTrips trips={randomTrips} isPaginated={true} />
    </Box>
  );
};

export default page;
