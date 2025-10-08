// __tests__/components/UsersCard.test.tsx
import { render, screen } from '@testing-library/react';
import UsersCard from '@/app/[locale]/(dashboard)/components/UsersCard';

// Mock Next.js Image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

// Mock MUI SparkLineChart
jest.mock('@mui/x-charts/SparkLineChart', () => ({
  SparkLineChart: ({ data, color }: { data: number[]; color: string }) => (
    <div
      data-testid="spark-line-chart"
      data-color={color}
      data-values={data.join(',')}
    >
      SparkLineChart
    </div>
  ),
}));

// Mock constants
jest.mock('/constants/index.ts', () => ({
  STATE_LABELS: {
    totalUsers: 'Total Users',
    activeUsers: 'Active Users',
    newSignups: 'New Signups',
  },
}));

describe('UsersCard', () => {
  const mockDataTrendingUp = [10, 15, 20, 25, 30];
  const mockDataTrendingDown = [30, 25, 20, 15, 10];

  describe('Rendering', () => {
    it('renders the card with correct state label', () => {
      render(
        <UsersCard
          state="totalUsers"
          data={mockDataTrendingUp}
          activeUserToday={0}
        />
      );

      expect(screen.getByText('Total Users')).toBeInTheDocument();
    });

    it('renders SparkLineChart with correct data', () => {
      render(
        <UsersCard
          state="totalUsers"
          data={mockDataTrendingUp}
          activeUserToday={0}
        />
      );

      const chart = screen.getByTestId('spark-line-chart');
      expect(chart).toBeInTheDocument();
      expect(chart).toHaveAttribute('data-values', '10,15,20,25,30');
    });
  });

  describe('Total Items Calculation', () => {
    it('calculates total from data when activeUserToday is 0', () => {
      render(
        <UsersCard state="totalUsers" data={[10, 20, 30]} activeUserToday={0} />
      );

      // Sum: 10 + 20 + 30 = 60
      expect(screen.getByText('60')).toBeInTheDocument();
    });

    it('displays activeUserToday when provided', () => {
      render(
        <UsersCard
          state="activeUsers"
          data={[10, 20, 30]}
          activeUserToday={45}
        />
      );

      expect(screen.getByText('45')).toBeInTheDocument();
    });

    it('handles empty data array', () => {
      render(<UsersCard state="totalUsers" data={[]} activeUserToday={0} />);

      expect(screen.getByText('0')).toBeInTheDocument();
    });

    it('handles single value in data array', () => {
      render(<UsersCard state="totalUsers" data={[100]} activeUserToday={0} />);

      expect(screen.getByText('100')).toBeInTheDocument();
    });
  });

  describe('Trending Up State', () => {
    it('shows trending up when last value is greater than first', () => {
      render(
        <UsersCard
          state="totalUsers"
          data={mockDataTrendingUp}
          activeUserToday={0}
        />
      );

      expect(screen.getByText('Trending up')).toBeInTheDocument();
      expect(screen.getByAltText('trending')).toHaveAttribute(
        'src',
        '/icons/up.png'
      );
    });

    it('uses green color for trending up', () => {
      render(
        <UsersCard
          state="totalUsers"
          data={mockDataTrendingUp}
          activeUserToday={0}
        />
      );

      const chart = screen.getByTestId('spark-line-chart');
      expect(chart).toHaveAttribute('data-color', '#12B76A');
    });
  });

  describe('Trending Down State', () => {
    it('shows trending down when last value is less than first', () => {
      render(
        <UsersCard
          state="totalUsers"
          data={mockDataTrendingDown}
          activeUserToday={0}
        />
      );

      expect(screen.getByText('Trending down')).toBeInTheDocument();
      expect(screen.getByAltText('trending')).toHaveAttribute(
        'src',
        '/icons/down.png'
      );
    });

    it('uses red color for trending down', () => {
      render(
        <UsersCard
          state="totalUsers"
          data={mockDataTrendingDown}
          activeUserToday={0}
        />
      );

      const chart = screen.getByTestId('spark-line-chart');
      expect(chart).toHaveAttribute('data-color', '#F04438');
    });
  });

  describe('Edge Cases', () => {
    it('shows trending down when values are equal', () => {
      render(
        <UsersCard state="totalUsers" data={[20, 20, 20]} activeUserToday={0} />
      );

      // When equal, isUp is false (20 > 20 = false)
      expect(screen.getByText('Trending down')).toBeInTheDocument();
    });

    it('handles negative numbers', () => {
      render(
        <UsersCard
          state="totalUsers"
          data={[-5, -3, 0, 2, 5]}
          activeUserToday={0}
        />
      );

      // Sum: -5 + -3 + 0 + 2 + 5 = -1
      expect(screen.getByText('-1')).toBeInTheDocument();
      expect(screen.getByText('Trending up')).toBeInTheDocument();
    });

    it('handles large numbers', () => {
      render(
        <UsersCard
          state="totalUsers"
          data={[1000000, 2000000, 3000000]}
          activeUserToday={0}
        />
      );

      expect(screen.getByText('6000000')).toBeInTheDocument();
    });
  });

  describe('Different State Types', () => {
    it('renders correctly for activeUsers state', () => {
      render(
        <UsersCard
          state="activeUsers"
          data={mockDataTrendingUp}
          activeUserToday={50}
        />
      );

      expect(screen.getByText('Active Users')).toBeInTheDocument();
      expect(screen.getByText('50')).toBeInTheDocument();
    });

    it('renders correctly for newSignups state', () => {
      render(
        <UsersCard
          state="newSignups"
          data={mockDataTrendingUp}
          activeUserToday={0}
        />
      );

      expect(screen.getByText('New Signups')).toBeInTheDocument();
    });
  });

  describe('Text Content', () => {
    it("displays 'vs last month' text", () => {
      render(
        <UsersCard
          state="totalUsers"
          data={mockDataTrendingUp}
          activeUserToday={0}
        />
      );

      expect(screen.getByText('vs last month')).toBeInTheDocument();
    });

    it('renders all required text elements', () => {
      render(
        <UsersCard
          state="totalUsers"
          data={mockDataTrendingUp}
          activeUserToday={0}
        />
      );

      expect(screen.getByText('Total Users')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByText('Trending up')).toBeInTheDocument();
      expect(screen.getByText('vs last month')).toBeInTheDocument();
    });
  });

  describe('Image Rendering', () => {
    it('renders up arrow image with correct props', () => {
      render(
        <UsersCard
          state="totalUsers"
          data={mockDataTrendingUp}
          activeUserToday={0}
        />
      );

      const image = screen.getByAltText('trending');
      expect(image).toHaveAttribute('src', '/icons/up.png');
      expect(image).toHaveAttribute('width', '12');
      expect(image).toHaveAttribute('height', '12');
    });

    it('renders down arrow image with correct props', () => {
      render(
        <UsersCard
          state="totalUsers"
          data={mockDataTrendingDown}
          activeUserToday={0}
        />
      );

      const image = screen.getByAltText('trending');
      expect(image).toHaveAttribute('src', '/icons/down.png');
      expect(image).toHaveAttribute('width', '12');
      expect(image).toHaveAttribute('height', '12');
    });
  });

  describe('Component Structure', () => {
    it('renders Card component', () => {
      const { container } = render(
        <UsersCard
          state="totalUsers"
          data={mockDataTrendingUp}
          activeUserToday={0}
        />
      );

      expect(container.querySelector('.MuiCard-root')).toBeInTheDocument();
    });

    it('renders CardContent component', () => {
      const { container } = render(
        <UsersCard
          state="totalUsers"
          data={mockDataTrendingUp}
          activeUserToday={0}
        />
      );

      expect(
        container.querySelector('.MuiCardContent-root')
      ).toBeInTheDocument();
    });
  });
});
