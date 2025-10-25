// src/app/[locale]/(dashboard)/components/TripsCard.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TripsCard from '../Trips';

// Mock the child component with a named function to satisfy react/display-name
jest.mock('/app/[locale]/(dashboard)/components/TripsStateCard', () => {
  const MockTripsStateCard = ({
    trip,
    isPaginated,
  }: {
    trip: any;
    isPaginated: boolean;
  }) => (
    <div
      data-testid="trips-state-card"
      data-trip-id={trip.id}
      data-is-paginated={isPaginated}
    >
      Trip: {trip.name}
    </div>
  );
  MockTripsStateCard.displayName = 'MockTripsStateCard';
  return MockTripsStateCard;
});

describe('TripsCard Component', () => {
  const mockTrips = [
    { id: '1', name: 'Paris Trip' },
    { id: '2', name: 'Tokyo Trip' },
    { id: '3', name: 'New York Trip' },
  ];

  it('renders one TripsStateCard per item', () => {
    render(<TripsCard items={mockTrips as any} isPaginated={false} />);

    const cards = screen.getAllByTestId('trips-state-card');
    expect(cards).toHaveLength(3);
  });

  it('passes correct trip data and isPaginated prop to each TripsStateCard', () => {
    render(<TripsCard items={mockTrips as any} isPaginated={true} />);

    const cards = screen.getAllByTestId('trips-state-card');
    cards.forEach((card, index) => {
      expect(card).toHaveAttribute('data-trip-id', mockTrips[index].id);
      expect(card).toHaveAttribute('data-is-paginated', 'true');
      expect(card).toHaveTextContent(`Trip: ${mockTrips[index].name}`);
    });
  });

  it('renders correct number of items when list is empty', () => {
    render(<TripsCard items={[]} isPaginated={false} />);
    expect(screen.queryAllByTestId('trips-state-card')).toHaveLength(0);
  });

  it('passes isPaginated=false correctly', () => {
    render(<TripsCard items={[mockTrips[0]] as any} isPaginated={false} />);
    const card = screen.getByTestId('trips-state-card');
    expect(card).toHaveAttribute('data-is-paginated', 'false');
  });
});
