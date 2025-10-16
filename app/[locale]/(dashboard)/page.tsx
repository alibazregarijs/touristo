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
import { auth } from '@/auth';
import { api } from '@/convex/_generated/api';
import { fetchQuery } from 'convex/nextjs';
import { parseTripToTripDetails } from '@/lib';
import LocaleSwitcher from '@/components/LocaleSwitcher';
import { getLocale, getTranslations } from 'next-intl/server';

export default async function Page() {
  const session = await auth();
  const language = await getLocale();
  const t = await getTranslations();
  // Run all queries in parallel
  const [
    usersPerMonth,
    tripsPerMonth,
    onlineUsersCount,
    latestUsers,
    latestTripsQuery,
    userGrowth,
    tripGrowth,
  ] = await Promise.all([
    fetchQuery(api.user.getUsersPerMonth),
    fetchQuery(api.trips.getTripsPerMonth),
    fetchQuery(api.user.getOnlineUsersCount),
    fetchQuery(api.user.getLatestUsers),
    fetchQuery(api.trips.getNewestTripDetails),
    fetchQuery(api.user.getUserGrowth),
    fetchQuery(api.trips.getTripStats, { language }),
  ]);

  // Post‑process the ones that need parsing

  const latestTrips = parseTripToTripDetails(latestTripsQuery, language);

  return (
    <Box
      sx={{
        maxHeight: { lg: '100%' },
        overflowY: 'auto',
      }}
      className="no-scrollbar"
    >
      {/* Header */}
      <LocaleSwitcher />
      <Suspense fallback={<HeaderSkeleton />}>
        <Header
          title={t('DashboardPage.title', {
            name: session?.user?.name ?? 'Guest',
          })}
          description={t('DashboardPage.description')}
          buttonTitle={t('DashboardPage.buttonTitle')}
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
        <TripsCard items={latestTrips} isPaginated={false} />
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
