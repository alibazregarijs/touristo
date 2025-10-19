// src/app/[locale]/(dashboard)/components/LatestUserSignups.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LatestUserSignups from '@/app/[locale]/(dashboard)/components/LatestUserSignups';

jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'LatestUserSignups.title': 'Latest Users',
      'LatestTripBookings.title': 'Latest Trips',
      'LatestUserSignups.name': 'Name',
      'LatestTripBookings.name': 'Trip Name',
      'LatestUserSignups.Itinerary': 'Itineraries',
      'LatestUserSignups.duration': 'Duration',
      'LatestUserSignups.Days': 'Days',
    };
    return translations[key] || key;
  },
  useLocale: () => 'en',
}));

jest.mock('/lib', () => ({
  extractTripSummary: (trip: any) => ({
    id: trip.id,
    name: trip.name || 'Default Trip',
    travelDates: trip.travelDates,
  }),
}));

// Add data-testid="initials-avatar" to Avatar in your component!
describe('LatestUserSignups Component', () => {
  const mockUsers = [
    { id: 1, username: 'alice', countOfItineraryCreated: 3 },
    { id: 2, username: 'bob', countOfItineraryCreated: 7 },
  ];

  const mockTrips = [
    { id: '1', name: 'Paris Adventure', travelDates: '7 days' },
    { id: '2', name: 'Tokyo Escape', travelDates: '10 days' },
  ];

  describe('when lastUser=true (user signups)', () => {
    it('renders user signups with correct title and headers', () => {
      render(<LatestUserSignups lastUser item={mockUsers} />);

      expect(screen.getByText('Latest Users')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Itineraries')).toBeInTheDocument();
      expect(screen.getByText('alice')).toBeInTheDocument();
      expect(screen.getByText('bob')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('7')).toBeInTheDocument();

      const avatars = screen.getAllByTestId('initials-avatar');
      expect(avatars).toHaveLength(2);
      expect(avatars[0]).toHaveTextContent('A');
      expect(avatars[1]).toHaveTextContent('B');
    });
  });

  describe('when lastUser=false (trip bookings)', () => {
    it('renders trip bookings with correct title and headers', () => {
      render(<LatestUserSignups item={mockTrips} />);

      expect(screen.getByText('Latest Trips')).toBeInTheDocument();
      expect(screen.getByText('Trip Name')).toBeInTheDocument();
      expect(screen.getByText('Duration')).toBeInTheDocument();
      expect(screen.getByText('Paris Adventure')).toBeInTheDocument();
      expect(screen.getByText('Tokyo Escape')).toBeInTheDocument();
      expect(screen.getByText('7 Days')).toBeInTheDocument();
      expect(screen.getByText('10 Days')).toBeInTheDocument();

      const avatars = screen.getAllByTestId('initials-avatar');
      expect(avatars).toHaveLength(2);
      expect(avatars[0]).toHaveTextContent('P');
      expect(avatars[1]).toHaveTextContent('T');
    });

    it('handles missing or invalid travelDates gracefully', () => {
      const trips = [
        { id: '3', name: 'Mystery Trip', travelDates: '' },
        { id: '4', name: 'Another Trip' },
      ];
      render(<LatestUserSignups item={trips} />);
      expect(screen.getAllByText('N/A Days')).toHaveLength(2);
    });

    it('extracts number from travelDates with digits', () => {
      const trips = [
        { id: '6', name: 'Quick Trip', travelDates: '3' },
        { id: '7', name: 'Long Trip', travelDates: '14-night stay' },
      ];
      render(<LatestUserSignups item={trips} />);
      expect(screen.getByText('3 Days')).toBeInTheDocument();
      expect(screen.getByText('14 Days')).toBeInTheDocument();
    });
  });

  it('renders correct number of items', () => {
    render(<LatestUserSignups lastUser item={mockUsers} />);
    expect(screen.getAllByText(/alice|bob/)).toHaveLength(2);
  });
});
