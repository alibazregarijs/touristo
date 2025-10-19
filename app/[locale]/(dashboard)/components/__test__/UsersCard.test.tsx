'use client';

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UsersCard from '../UsersCard';
import { UsersCardProps } from '@/types';

// Mock next-intl's useTranslations
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'UserCard.active': 'Active Users',
      'UserCard.inactive': 'Inactive Users',
      'UserCard.trending_up': 'Trending up',
      'UserCard.trending_down': 'Trending down',
      'UserCard.last_month': 'last month',
    };
    return translations[key] || key;
  },
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // Render a simple img tag for testing
    return <img {...props} />;
  },
}));

// Mock @mui/x-charts/SparkLineChart
jest.mock('@mui/x-charts/SparkLineChart', () => ({
  SparkLineChart: ({ data, color }: { data: number[]; color: string }) => (
    <div data-testid="spark-line" style={{ color }}>
      SparkLineChart: {data.join(', ')}
    </div>
  ),
}));

describe('UsersCard', () => {
  const defaultProps: UsersCardProps = {
    state: 'active',
    data: [10, 20, 30, 40],
    activeUserToday: undefined,
  };

  it('renders the card with correct title and total', () => {
    render(<UsersCard {...defaultProps} />);

    expect(screen.getByText('Active Users')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument(); // sum of [10,20,30,40]
  });

  it('uses activeUserToday when provided', () => {
    render(<UsersCard {...defaultProps} activeUserToday={99} />);

    expect(screen.getByText('99')).toBeInTheDocument();
  });

  it('shows trending up when last data point > first', () => {
    render(<UsersCard {...defaultProps} />);

    expect(screen.getByText('Trending up')).toBeInTheDocument();
    expect(screen.getByAltText('trending')).toHaveAttribute(
      'src',
      '/icons/up.png'
    );
  });

  it('shows trending down when last data point < first', () => {
    render(<UsersCard {...defaultProps} data={[40, 30, 20, 10]} />);

    expect(screen.getByText('Trending down')).toBeInTheDocument();
    expect(screen.getByAltText('trending')).toHaveAttribute(
      'src',
      '/icons/down.png'
    );
  });

  it('displays SparkLineChart with correct color for up trend', () => {
    render(<UsersCard {...defaultProps} />);

    const sparkLine = screen.getByTestId('spark-line');
    expect(sparkLine).toHaveStyle({ color: '#12B76A' });
  });

  it('displays SparkLineChart with correct color for down trend', () => {
    render(<UsersCard {...defaultProps} data={[50, 40, 30, 20]} />);

    const sparkLine = screen.getByTestId('spark-line');
    expect(sparkLine).toHaveStyle({ color: '#F04438' });
  });

  it('shows "last month" label', () => {
    render(<UsersCard {...defaultProps} />);

    expect(screen.getByText('last month')).toBeInTheDocument();
  });
});
