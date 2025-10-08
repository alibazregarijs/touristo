// __tests__/components/LatestUserSignups.test.tsx
import { render, screen } from '@testing-library/react';
import LatestUserSignups from '@/app/[locale]/(dashboard)/components/LatestUserSignups';
import { extractTripSummary } from '@/lib';
import '@testing-library/jest-dom';

// Mock the utility that transforms trip data
jest.mock('/lib/index.ts', () => ({
  extractTripSummary: jest.fn(),
}));

describe('LatestUserSignups', () => {
  const mockUsers = [
    { id: '1', username: 'alice', countOfItineraryCreated: 5 },
    { id: '2', username: 'bob', countOfItineraryCreated: 3 },
  ];

  const mockTrips = [
    { id: 't1', name: 'Paris Adventure', travelDates: 'May 10–15' },
    { id: 't2', name: 'Tokyo Trip', travelDates: 'Jun 1–7' },
  ];

  const mockSummarizedTrips = [
    { id: 't1', name: 'Paris Adventure', travelDates: 'May 10–15' },
    { id: 't2', name: 'Tokyo Trip', travelDates: 'Jun 1–7' },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    (extractTripSummary as jest.Mock).mockImplementation((trip) => trip); // identity mock
  });

  describe('when lastUser = true (Latest user signups)', () => {
    it('renders correct title and headers', () => {
      render(<LatestUserSignups lastUser item={mockUsers} />);

      expect(screen.getByText('Latest user signups')).toBeInTheDocument();
      expect(screen.getByText('NAME')).toBeInTheDocument();
      expect(screen.getByText('ITINERARY CREATED')).toBeInTheDocument();
    });

    it('renders user avatars with first letter of username', () => {
      render(<LatestUserSignups lastUser item={mockUsers} />);

      expect(screen.getByText('A')).toBeInTheDocument(); // alice → 'A'
      expect(screen.getByText('B')).toBeInTheDocument(); // bob → 'B'
    });

    it('displays username and itinerary count', () => {
      render(<LatestUserSignups lastUser item={mockUsers} />);

      expect(screen.getByText('alice')).toBeInTheDocument();
      expect(screen.getByText('bob')).toBeInTheDocument();
      expect(screen.getByText('5')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });

  describe('when lastUser = false (Latest trip bookings)', () => {
    it('renders correct title and headers', () => {
      render(<LatestUserSignups item={mockTrips} />);

      expect(screen.getByText('Latest trip bookings')).toBeInTheDocument();
      expect(screen.getByText('BOOKING')).toBeInTheDocument();
      expect(screen.getByText('TRAVEL DURATION')).toBeInTheDocument();
    });

    it('calls extractTripSummary for each trip', () => {
      render(<LatestUserSignups item={mockTrips} />);

      expect(extractTripSummary).toHaveBeenCalledTimes(2);
      expect(extractTripSummary).toHaveBeenCalledWith(mockTrips[0]);
      expect(extractTripSummary).toHaveBeenCalledWith(mockTrips[1]);
    });

    it('renders user avatars with first letter of username', () => {
      render(<LatestUserSignups lastUser item={mockUsers} />);

      expect(screen.getByText('A')).toBeInTheDocument(); // alice → 'A'
      expect(screen.getByText('B')).toBeInTheDocument(); // bob → 'B'
    });

    it('displays trip name and travel dates', () => {
      render(<LatestUserSignups item={mockSummarizedTrips} />);

      expect(screen.getByText('Paris Adventure')).toBeInTheDocument();
      expect(screen.getByText('Tokyo Trip')).toBeInTheDocument();
      expect(screen.getByText('May 10–15')).toBeInTheDocument();
      expect(screen.getByText('Jun 1–7')).toBeInTheDocument();
    });

    it('shows "N/A" when travelDates is missing', () => {
      const tripsWithoutDates = [
        { id: 't3', name: 'Mystery Trip', travelDates: null },
      ];
      render(<LatestUserSignups item={tripsWithoutDates} />);

      expect(screen.getByText('N/A')).toBeInTheDocument();
    });
  });

  it('renders correct number of items', () => {
    render(<LatestUserSignups lastUser item={mockUsers} />);
    const userRows = screen.getAllByText(/alice|bob/);
    expect(userRows).toHaveLength(2);
  });
});
