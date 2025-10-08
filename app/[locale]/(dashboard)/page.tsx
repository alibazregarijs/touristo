import { Box, Grid } from '@mui/material';
import { Suspense } from 'react';
import Header from '@/app/[locale]/(dashboard)/components/Header';
import HeaderSkeleton from '@/skeletons/HeaderSkeleton';
import StatsCards from '@/app/[locale]/(dashboard)/components/StatsCards';
import StatsCardsSkeleton from '@/skeletons/StatsCardsSkeleton';
import TripsCard from '@/app/[locale]/(dashboard)/components/Trips';
import TripsCardSkeleton from '@/skeletons/TripsCardSkeleton';
import UserGrowthChart from './components/UserGrowthChart';
import UserGrowthChartSkeleton from '@/skeletons/UserGrowthChartSkeleton';
import TripTrendsChart from './components/TripTrendsChart';
import TripTrendsChartSkeleton from '@/skeletons/TripTrendsChartSkeleton';
import LatestUserSignups from './components/LatestUserSignups';
import LatestUserSignupsSkeleton from '@/skeletons/LatestUserSignupsSkeleton';
import { tripData, userData } from '@/constants';
import { auth } from '@/auth';
import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';
import { parseTripToTripDetails } from '@/lib';

export default async function Page() {
  const session = await auth();

  const tripDetailsObj = await fetchQuery(api.trips.getNewestTripDetails);
  const randomTrips = parseTripToTripDetails(tripDetailsObj);

  const usersPerMonth = await fetchQuery(api.user.getUsersPerMonth);
  const tripsPerMonth = await fetchQuery(api.trips.getTripsPerMonth);
  const onlineUsersCount = await fetchQuery(api.user.getOnlineUsersCount);
  const latestUsers = await fetchQuery(api.user.getLatestUsers);
  const latestTripsQuery = await fetchQuery(api.trips.getNewestTripDetails);
  const latestTrips = parseTripToTripDetails(latestTripsQuery);
  const userGrowth = await fetchQuery(api.user.getUserGrowth);
  const tripGrowth = await fetchQuery(api.trips.getTripStats);

  console.log(tripGrowth);

  return (
    <Box
      sx={{
        maxHeight: { lg: '100%' },
        overflowY: 'auto',
      }}
      className="no-scrollbar"
    >
      {/* Header */}
      <Suspense fallback={<HeaderSkeleton />}>
        <Header
          title={`Welcome ${session?.user?.name ?? 'Guest'} 👋`}
          description="Track activity, trends, and popular destinations in real time"
          buttonTitle="Create a trip"
          href="/en/create-trip"
        />
      </Suspense>

      {/* Stats */}
      <Suspense fallback={<StatsCardsSkeleton />}>
        <StatsCards
          usersPerMonth={usersPerMonth}
          tripsPerMonth={tripsPerMonth}
          onlineUsersCount={onlineUsersCount}
        />
      </Suspense>

      {/* Trips */}
      <Suspense fallback={<TripsCardSkeleton isPaginated={false} />}>
        <TripsCard items={randomTrips} isPaginated={false} />
      </Suspense>

      {/* Charts */}
      <Grid container spacing={2} mt={4}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Suspense fallback={<UserGrowthChartSkeleton />}>
            <UserGrowthChart userGrowth={userGrowth} />
          </Suspense>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Suspense fallback={<TripTrendsChartSkeleton />}>
            <TripTrendsChart tripGrowth={tripGrowth} />
          </Suspense>
        </Grid>
      </Grid>

      {/* Latest Signups */}
      <Grid container spacing={2} mt={4}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Suspense fallback={<LatestUserSignupsSkeleton lastUser rows={4} />}>
            <LatestUserSignups item={latestUsers} lastUser />
          </Suspense>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Suspense fallback={<LatestUserSignupsSkeleton rows={4} />}>
            <LatestUserSignups item={latestTrips} />
          </Suspense>
        </Grid>
      </Grid>
    </Box>
  );
}
