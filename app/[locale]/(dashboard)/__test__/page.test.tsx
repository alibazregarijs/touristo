// __tests__/page.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import Page from '@/app/[locale]/(dashboard)/page';
import { api } from '@/convex/_generated/api';
import { auth } from '@/auth';
import { fetchQuery } from 'convex/nextjs';

// ✅ Mock next-intl/server (critical for getLocale & getTranslations)
jest.mock('next-intl/server', () => ({
  getTranslations: () => {
    return (key: string, params?: Record<string, string | number>) => {
      const baseTranslations: Record<string, string> = {
        'DashboardPage.title': 'Welcome {name}',
        'DashboardPage.description': 'Your dashboard overview',
        'DashboardPage.buttonTitle': 'Create New Trip',
      };

      let str = baseTranslations[key] || key;

      // Simple interpolation for {name}, etc.
      if (params) {
        Object.entries(params).forEach(([param, value]) => {
          str = str.replace(new RegExp(`{${param}}`, 'g'), String(value));
        });
      }

      return str;
    };
  },
  getLocale: () => Promise.resolve('en'),
}));

// ✅ Mock auth
jest.mock('/auth.ts', () => ({
  auth: jest.fn(),
}));

// ✅ Mock Convex
jest.mock('convex/nextjs', () => ({
  fetchQuery: jest.fn(),
}));

// ✅ Mock Convex API structure
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

// ✅ Mock parsing utility
jest.mock('/lib', () => ({
  parseTripToTripDetails: jest.fn((data) => data),
}));

// ✅ Mock child components
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

// ✅ Mock LocaleSwitcher (used in Page)
jest.mock('/components/LocaleSwitcher', () => ({
  __esModule: true,
  default: () => <div data-testid="locale-switcher">Locale Switcher</div>,
}));

// ✅ Mock React Suspense to render children directly
jest.mock('react', () => {
  const actual = jest.requireActual('react');
  return {
    ...actual,
    Suspense: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

describe('Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock session
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
    });
  });

  it('renders with mocked session and Convex data', async () => {
    const PageResolved = await Page();
    render(PageResolved);

    await waitFor(() => {
      expect(screen.getByText('Welcome ali')).toBeInTheDocument();
    });

    // Check trips appear in both places
    expect(screen.getByTestId('trips')).toHaveTextContent('Trip to Tehran');
    expect(screen.getByTestId('latest-trips')).toHaveTextContent(
      'Trip to Tehran'
    );

    // Check latest users
    expect(screen.getByTestId('latest-users')).toHaveTextContent('ali');

    // Check all components rendered
    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('stats')).toBeInTheDocument();
    expect(screen.getByTestId('user-growth')).toBeInTheDocument();
    expect(screen.getByTestId('trip-trends')).toBeInTheDocument();
    expect(screen.getByTestId('locale-switcher')).toBeInTheDocument();
  });

  it('calls all Convex queries in parallel', async () => {
    await Page();
    expect(fetchQuery).toHaveBeenCalledTimes(7);
    expect(fetchQuery).toHaveBeenCalledWith('user.getUsersPerMonth');
    expect(fetchQuery).toHaveBeenCalledWith('trips.getTripsPerMonth');
    expect(fetchQuery).toHaveBeenCalledWith('user.getOnlineUsersCount');
    expect(fetchQuery).toHaveBeenCalledWith('user.getLatestUsers');
    expect(fetchQuery).toHaveBeenCalledWith('trips.getNewestTripDetails');
    expect(fetchQuery).toHaveBeenCalledWith('user.getUserGrowth');
    expect(fetchQuery).toHaveBeenCalledWith('trips.getTripStats', {
      language: 'en',
    });
  });

  it('handles guest user when no session', async () => {
    (auth as jest.Mock).mockResolvedValue(null);
    const PageResolved = await Page();
    render(PageResolved);

    await waitFor(() => {
      expect(screen.getByText('Welcome Guest')).toBeInTheDocument();
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

    expect(screen.getByTestId('latest-users')).toBeInTheDocument();
    expect(screen.getByTestId('latest-trips')).toBeInTheDocument();
  });
});
