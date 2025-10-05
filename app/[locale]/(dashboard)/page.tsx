import { Box, Grid } from '@mui/material';
import Header from '@/app/[locale]/(dashboard)/components/Header';
import StatsCards from '@/app/[locale]/(dashboard)/components/StatsCards';
import TripsCard from '@/app/[locale]/(dashboard)/components/Trips';
import UserGrowthChart from './components/UserGrowthChart';
import TripTrendsChart from './components/TripTrendsChart';
import LatestUserSignups from './components/LatestUserSignups';
import { tripData, userData, tripsObj } from '@/constants';
import { auth } from '@/auth';
import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs'; // server-safe convex query
import { Trip } from '@/types';
import { parseTripToTripDetails } from '@/lib';

export default async function Page() {
  const session = await auth();

  const tripDetailsObj = await fetchQuery(api.trips.getRandomTripDetails);
  const randomTrips = parseTripToTripDetails(tripDetailsObj);

  return (
    <Box
      sx={{
        maxHeight: { lg: '100%' },
        overflowY: 'auto',
      }}
      className="no-scrollbar"
    >
      <Header
        title={`Welcome ${session?.user?.name ?? 'Guest'} 👋`}
        description="Track activity, trends, and popular destinations in real time"
        buttonTitle="Create a trip"
      />
      <StatsCards />
      <TripsCard items={randomTrips} isPaginated={false} />
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
          <LatestUserSignups item={userData} lastUser />
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <LatestUserSignups item={tripData} />
        </Grid>
      </Grid>
    </Box>
  );
}
