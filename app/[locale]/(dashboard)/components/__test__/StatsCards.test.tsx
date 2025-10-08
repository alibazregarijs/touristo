// __tests__/components/StatsCards.test.tsx
import { render, screen } from '@testing-library/react';
import StatsCards from '@/app/[locale]/(dashboard)/components/StatsCards';
import '@testing-library/jest-dom';

// Mock the child component to isolate StatsCards
jest.mock('/app/[locale]/(dashboard)/components/UsersCard', () => {
  return {
    __esModule: true,
    default: ({ state, data, activeUserToday }: any) => (
      <div data-testid="users-card">
        <span data-testid={`card-state-${state}`}>{state}</span>
        <span data-testid="card-data">{JSON.stringify(data)}</span>
        {activeUserToday !== undefined && (
          <span data-testid="active-user-today">{activeUserToday}</span>
        )}
      </div>
    ),
  };
});

describe('StatsCards', () => {
  const mockUsersPerMonth = [10, 15, 20];
  const mockTripsPerMonth = [5, 8, 12];
  const mockOnlineUsersCount = 42;

  it('renders three UsersCard instances with correct props', () => {
    render(
      <StatsCards
        usersPerMonth={mockUsersPerMonth}
        tripsPerMonth={mockTripsPerMonth}
        onlineUsersCount={mockOnlineUsersCount}
      />
    );

    // Verify 3 cards are rendered
    const cards = screen.getAllByTestId('users-card');
    expect(cards).toHaveLength(3);

    // Get all card-data elements (one per card)
    const dataSpans = screen.getAllByTestId('card-data');
    expect(dataSpans).toHaveLength(3);

    // First card: total_user → usersPerMonth
    expect(screen.getByTestId('card-state-total_user')).toBeInTheDocument();
    expect(dataSpans[0]).toHaveTextContent(JSON.stringify(mockUsersPerMonth));

    // Second card: total_trips → tripsPerMonth
    expect(screen.getByTestId('card-state-total_trips')).toBeInTheDocument();
    expect(dataSpans[1]).toHaveTextContent(JSON.stringify(mockTripsPerMonth));

    // Third card: active_users_today → hardcoded data + onlineUsersCount
    expect(
      screen.getByTestId('card-state-active_users_today')
    ).toBeInTheDocument();
    expect(dataSpans[2]).toHaveTextContent(
      JSON.stringify([5, 15, 12, 18, 20, 17, 22, 25, 23, 28])
    );
    expect(screen.getByTestId('active-user-today')).toHaveTextContent(
      mockOnlineUsersCount.toString()
    );
  });

  it('passes onlineUsersCount to the third UsersCard as activeUserToday', () => {
    const customOnlineCount = 99;
    render(
      <StatsCards
        usersPerMonth={[]}
        tripsPerMonth={[]}
        onlineUsersCount={customOnlineCount}
      />
    );

    expect(screen.getByTestId('active-user-today')).toHaveTextContent('99');
  });
});
