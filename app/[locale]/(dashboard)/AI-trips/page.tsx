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
import { getLocale, getTranslations } from 'next-intl/server';

const page = async () => {
  const locale = await getLocale();
  const session = await auth();
  const userId = session?.user?.id;
  const t = await getTranslations();

  const trips = await fetchQuery(api.trips.allTripsForUser, {
    userId: userId as string,
  });

  const randomTrips = parseTripToTripDetails(trips, locale);

  return (
    <Box sx={{ maxHeight: '100%', overflowY: 'auto' }}>
      <Header
        title={t('AItripHeader.title')}
        description={t('AItripHeader.description')}
        buttonTitle={t('AItripHeader.buttonTitle')}
        href="/en/create-trip"
      />
      <ListTrips trips={randomTrips} isPaginated={true} />
    </Box>
  );
};

export default page;
