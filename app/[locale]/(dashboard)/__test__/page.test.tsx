// __tests__/page.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import Page from '@/app/[locale]/(dashboard)/page';
import { api } from '@/convex/_generated/api';
import { auth } from '@/auth';
import { fetchQuery } from 'convex/nextjs';

// Mock next-auth (with your original path)
jest.mock('/auth.ts', () => ({
  auth: jest.fn(),
}));

// Mock convex/nextjs
jest.mock('convex/nextjs', () => ({
  fetchQuery: jest.fn(),
}));

// Mock the Convex API structure
jest.mock('/convex/_generated/api', () => ({
  api: {
    user: {
      getUsersPerMonth: 'user.getUsersPerMonth',
      getOnlineUsersCount: 'user.getOnlineUsersCount',
      getLatestUsers: 'user.getLatestUsers',
      getUserGrowth: 'user.getUserGrowth',
    },
    trips: {
      getTripsPerMonth: 'trips.getTripsPerMonth',
      getNewestTripDetails: 'trips.getNewestTripDetails',
      getTripStats: 'trips.getTripStats',
    },
  },
}));

// Mock child components
jest.mock('/app/[locale]/(dashboard)/components/Header', () => ({
  __esModule: true,
  default: ({ title }: { title: string }) => (
    <div data-testid="header">{title}</div>
  ),
}));

jest.mock('/skeletons/HeaderSkeleton', () => ({
  __esModule: true,
  default: () => <div data-testid="header-skeleton">Loading Header...</div>,
}));

jest.mock('/app/[locale]/(dashboard)/components/StatsCards', () => ({
  __esModule: true,
  default: () => <div data-testid="stats">Stats Cards</div>,
}));

jest.mock('/skeletons/StatsCardsSkeleton', () => ({
  __esModule: true,
  default: () => <div data-testid="stats-skeleton">Loading Stats...</div>,
}));

jest.mock('/app/[locale]/(dashboard)/components/Trips', () => ({
  __esModule: true,
  default: ({ items }: { items: any[] }) => (
    <div data-testid="trips">
      {items.map((item) => (
        <div key={item.id}>{item.title}</div>
      ))}
    </div>
  ),
}));

jest.mock('/skeletons/TripsCardSkeleton', () => ({
  __esModule: true,
  default: () => <div data-testid="trips-skeleton">Loading Trips...</div>,
}));

jest.mock('/app/[locale]/(dashboard)/components/UserGrowthChart', () => ({
  __esModule: true,
  default: () => <div data-testid="user-growth">User Growth Chart</div>,
}));

jest.mock('/skeletons/UserGrowthChartSkeleton', () => ({
  __esModule: true,
  default: () => (
    <div data-testid="user-growth-skeleton">Loading User Growth...</div>
  ),
}));

jest.mock('/app/[locale]/(dashboard)/components/TripTrendsChart', () => ({
  __esModule: true,
  default: () => <div data-testid="trip-trends">Trip Trends Chart</div>,
}));

jest.mock('/skeletons/TripTrendsChartSkeleton', () => ({
  __esModule: true,
  default: () => (
    <div data-testid="trip-trends-skeleton">Loading Trip Trends...</div>
  ),
}));

jest.mock('/app/[locale]/(dashboard)/components/LatestUserSignups', () => ({
  __esModule: true,
  default: ({ item, lastUser }: { item: any[]; lastUser?: boolean }) => (
    <div data-testid={lastUser ? 'latest-users' : 'latest-trips'}>
      {item.map((i: any) => (
        <div key={i.id}>{i.name || i.title}</div>
      ))}
    </div>
  ),
}));

jest.mock('/skeletons/LatestUserSignupsSkeleton', () => ({
  __esModule: true,
  default: () => (
    <div data-testid="latest-signups-skeleton">Loading Latest Signups...</div>
  ),
}));

// Mock the parsing utility
jest.mock('/lib/index.ts', () => ({
  parseTripToTripDetails: jest.fn((data) => data),
}));

// Mock MUI components to avoid issues

// Mock Suspense
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  Suspense: ({ children }: any) => children,
}));

describe('Page', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();

    // Provide a fake session
    (auth as jest.Mock).mockResolvedValue({
      user: { name: 'ali', email: 'ali@example.com' },
      expires: '2099-01-01T00:00:00.000Z',
    });

    // Mock Convex queries
    (fetchQuery as jest.Mock).mockImplementation((queryFn) => {
      if (queryFn === 'user.getUsersPerMonth') {
        return Promise.resolve([{ month: 'Jan', count: 10 }]);
      }
      if (queryFn === 'trips.getTripsPerMonth') {
        return Promise.resolve([{ month: 'Jan', count: 5 }]);
      }
      if (queryFn === 'user.getOnlineUsersCount') {
        return Promise.resolve(3);
      }
      if (queryFn === 'user.getLatestUsers') {
        return Promise.resolve([{ id: 1, name: 'ali' }]);
      }
      if (queryFn === 'trips.getNewestTripDetails') {
        return Promise.resolve([{ id: 99, title: 'Trip to Tehran' }]);
      }
      if (queryFn === 'user.getUserGrowth') {
        return Promise.resolve([{ month: 'Jan', growth: 20 }]);
      }
      if (queryFn === 'trips.getTripStats') {
        return Promise.resolve({ total: 42 });
      }
      return Promise.resolve(null);

      // we can also do mock testing for fetchQuery like this :
      //import * as userQueries from "@/convex/user";
      // (userQueries.getUsersPerMonth as jest.Mock).mockResolvedValue([
      // { month: "Jan", count: 10 }]);

      // (userQueries.getOnlineUsersCount as jest.Mock).mockResolvedValue(3);
    });
  });

  it('renders with mocked session and Convex data', async () => {
    // Render the async Server Component
    const PageResolved = await Page();
    render(PageResolved);

    // Check that the welcome message appears
    await waitFor(() => {
      expect(screen.getByText(/Welcome ali/i)).toBeInTheDocument();
    });

    // Use getAllByText for duplicate content or query within specific containers
    const tripTexts = screen.getAllByText('Trip to Tehran');
    expect(tripTexts).toHaveLength(2); // One in trips card, one in latest trips

    // Or be more specific by querying within a container
    const tripsCard = screen.getByTestId('trips');
    expect(tripsCard).toHaveTextContent('Trip to Tehran');

    const latestTrips = screen.getByTestId('latest-trips');
    expect(latestTrips).toHaveTextContent('Trip to Tehran');

    // Check that user name appears in latest signups
    const latestUsers = screen.getByTestId('latest-users');
    expect(latestUsers).toHaveTextContent('ali');

    // Verify all components rendered
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('stats')).toBeInTheDocument();
    expect(screen.getByTestId('user-growth')).toBeInTheDocument();
    expect(screen.getByTestId('trip-trends')).toBeInTheDocument();
  });

  it('calls all Convex queries in parallel', async () => {
    await Page();

    // Verify fetchQuery was called 7 times (once for each query)
    expect(fetchQuery).toHaveBeenCalledTimes(7);

    // Verify specific queries were called
    expect(fetchQuery).toHaveBeenCalledWith('user.getUsersPerMonth');
    expect(fetchQuery).toHaveBeenCalledWith('trips.getTripsPerMonth');
    expect(fetchQuery).toHaveBeenCalledWith('user.getOnlineUsersCount');
    expect(fetchQuery).toHaveBeenCalledWith('user.getLatestUsers');
    expect(fetchQuery).toHaveBeenCalledWith('trips.getNewestTripDetails');
    expect(fetchQuery).toHaveBeenCalledWith('user.getUserGrowth');
    expect(fetchQuery).toHaveBeenCalledWith('trips.getTripStats');
  });

  it('handles guest user when no session', async () => {
    (auth as jest.Mock).mockResolvedValue(null);

    const PageResolved = await Page();
    render(PageResolved);

    await waitFor(() => {
      expect(screen.getByText(/Welcome Guest/i)).toBeInTheDocument();
    });
  });

  it('renders all chart components', async () => {
    const PageResolved = await Page();
    render(PageResolved);

    expect(screen.getByTestId('user-growth')).toHaveTextContent(
      'User Growth Chart'
    );
    expect(screen.getByTestId('trip-trends')).toHaveTextContent(
      'Trip Trends Chart'
    );
  });

  it('displays latest users and trips sections', async () => {
    const PageResolved = await Page();
    render(PageResolved);

    const latestUsers = screen.getByTestId('latest-users');
    const latestTrips = screen.getByTestId('latest-trips');

    expect(latestUsers).toBeInTheDocument();
    expect(latestTrips).toBeInTheDocument();
  });
});
