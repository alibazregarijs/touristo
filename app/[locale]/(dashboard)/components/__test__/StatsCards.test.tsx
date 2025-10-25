// src/app/[locale]/(dashboard)/components/StatsCards.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatsCards from '@/app/[locale]/(dashboard)/components/StatsCards';

// Mock the child component
jest.mock('/app/[locale]/(dashboard)/components/UsersCard', () => {
  const MockUsersCard = ({ state, data, activeUserToday }: any) => (
    <div data-testid={`users-card-${state}`}>
      <span data-testid="state">{state}</span>
      <span data-testid="data-length">{data.length}</span>
      {activeUserToday !== undefined && (
        <span data-testid="active-user">{activeUserToday}</span>
      )}
    </div>
  );
  MockUsersCard.displayName = 'MockUsersCard';
  return MockUsersCard;
});

describe('StatsCards Component', () => {
  const mockUsersPerMonth = [10, 15, 20];
  const mockTripsPerMonth = [5, 8, 12];
  const mockOnlineUsersCount = 42;

  it('renders three UsersCard components with correct props', () => {
    render(
      <StatsCards
        usersPerMonth={mockUsersPerMonth}
        tripsPerMonth={mockTripsPerMonth}
        onlineUsersCount={mockOnlineUsersCount}
      />
    );

    // Total users card
    const totalUserCard = screen.getByTestId('users-card-total_user');
    expect(totalUserCard).toBeInTheDocument();
    expect(totalUserCard).toHaveTextContent('total_user');
    expect(screen.getAllByTestId('data-length')[0]).toHaveTextContent(
      String(mockUsersPerMonth.length)
    );

    // Total trips card
    const totalTripsCard = screen.getByTestId('users-card-total_trips');
    expect(totalTripsCard).toBeInTheDocument();
    expect(totalTripsCard).toHaveTextContent('total_trips');
    expect(screen.getAllByTestId('data-length')[1]).toHaveTextContent(
      String(mockTripsPerMonth.length)
    );

    // Active users card
    const activeUsersCard = screen.getByTestId('users-card-active_users_today');
    expect(activeUsersCard).toBeInTheDocument();
    expect(activeUsersCard).toHaveTextContent('active_users_today');
    expect(screen.getByTestId('active-user')).toHaveTextContent(
      String(mockOnlineUsersCount)
    );
    // This card uses hardcoded data, so length should be 10
    expect(screen.getAllByTestId('data-length')[2]).toHaveTextContent('10');
  });

  it('passes correct data arrays to each UsersCard', () => {
    render(
      <StatsCards
        usersPerMonth={mockUsersPerMonth}
        tripsPerMonth={mockTripsPerMonth}
        onlineUsersCount={mockOnlineUsersCount}
      />
    );

    const dataLengths = screen.getAllByTestId('data-length');
    expect(dataLengths[0]).toHaveTextContent('3'); // usersPerMonth length
    expect(dataLengths[1]).toHaveTextContent('3'); // tripsPerMonth length
    expect(dataLengths[2]).toHaveTextContent('10'); // hardcoded array length
  });
});
