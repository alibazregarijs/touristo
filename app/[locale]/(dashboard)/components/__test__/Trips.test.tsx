// __tests__/components/TripsCard.test.tsx
import { render, screen } from '@testing-library/react';
import TripsCard from '@/app/[locale]/(dashboard)/components/Trips';
import { Trip } from '@/types';
import '@testing-library/jest-dom';

// Helper to create a valid Trip object with all required fields
const createMockTrip = (overrides: Partial<Trip>): Trip => ({
  id: 'default-id',
  name: 'Default Trip',
  description: 'Default description',
  estimatedPrice: '1000',
  duration: 5,
  budget: 'Medium',
  travelStyle: 'Adventure',
  interests: 'Nature, Culture',
  groupType: 'Solo',
  country: 'France',
  imageUrls: ['https://example.com/image.jpg'],
  itinerary: [
    {
      day: 1,
      activities: ['Visit Eiffel Tower'],
      location: 'Paris',
      notes: 'Wear comfortable shoes',
    } as {
      day: number;
      activities: string[];
      location: string;
      notes?: string;
    },
  ],
  bestTimeToVisit: ['Spring', 'Summer'],
  weatherInfo: ['Mild temperatures', 'Occasional rain'],
  location: {
    city: 'Paris',
    coordinates: [48.8566, 2.3522],
  },
  payment_link: 'https://example.com/pay',
  creationTime: Date.now(),
  ...overrides,
});

// Mock the child component
jest.mock('/app/[locale]/(dashboard)/components/TripsStateCard', () => {
  return {
    __esModule: true,
    default: ({ trip, isPaginated }: { trip: Trip; isPaginated: boolean }) => (
      <div data-testid="trips-state-card">
        <span data-testid="trip-id">{trip.id}</span>
        <span data-testid="is-paginated">{isPaginated.toString()}</span>
      </div>
    ),
  };
});

describe('TripsCard', () => {
  const mockTrips: Trip[] = [
    createMockTrip({
      id: 'trip-1',
      name: 'Paris Getaway',
      country: 'France',
      location: { city: 'Paris', coordinates: [48.8566, 2.3522] },
    }),
    createMockTrip({
      id: 'trip-2',
      name: 'Tokyo Adventure',
      country: 'Japan',
      location: { city: 'Tokyo', coordinates: [35.6895, 139.6917] },
    }),
    createMockTrip({
      id: 'trip-3',
      name: 'New York Explorer',
      country: 'USA',
      location: { city: 'New York', coordinates: [40.7128, -74.006] },
    }),
  ];

  it('renders a TripsStateCard for each trip item', () => {
    render(<TripsCard items={mockTrips} isPaginated={false} />);

    const cards = screen.getAllByTestId('trips-state-card');
    expect(cards).toHaveLength(3);

    const tripIds = screen.getAllByTestId('trip-id');
    expect(tripIds[0]).toHaveTextContent('trip-1');
    expect(tripIds[1]).toHaveTextContent('trip-2');
    expect(tripIds[2]).toHaveTextContent('trip-3');
  });

  it('passes isPaginated prop correctly to all child cards', () => {
    render(<TripsCard items={mockTrips} isPaginated={true} />);

    const paginatedFlags = screen.getAllByTestId('is-paginated');
    paginatedFlags.forEach((flag) => {
      expect(flag).toHaveTextContent('true');
    });
  });

  it('renders without crashing for a single trip', () => {
    render(<TripsCard items={[mockTrips[0]]} isPaginated={false} />);
    expect(screen.getByTestId('trips-state-card')).toBeInTheDocument();
  });

  it('handles empty items array gracefully', () => {
    render(<TripsCard items={[]} isPaginated={false} />);
    expect(screen.queryByTestId('trips-state-card')).not.toBeInTheDocument();
  });
});
