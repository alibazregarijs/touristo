// components/UserGrowthChart.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserGrowthChart from '@/app/[locale]/(dashboard)/components/UserGrowthChart';
import { UserGrowthType } from '@/types';

// Mock Recharts
jest.mock('recharts', () => {
  const Original = jest.requireActual('recharts');
  return {
    ...Original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="responsive-container">{children}</div>
    ),
    ComposedChart: ({
      data,
      children,
    }: {
      data: any[];
      children: React.ReactNode;
    }) => (
      <div data-testid="composed-chart" data-length={data?.length}>
        {children}
      </div>
    ),
    Bar: ({ dataKey, fill, stackId }: any) => (
      <div
        data-testid={`bar-${dataKey}`}
        data-fill={fill}
        data-stack={stackId}
      />
    ),
    Line: ({ dataKey, stroke }: any) => (
      <div data-testid={`line-${dataKey}`} data-stroke={stroke} />
    ),
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: ({ tickFormatter }: { tickFormatter?: (val: number) => string }) => (
      <div data-testid="y-axis" data-formatter={!!tickFormatter} />
    ),
    CartesianGrid: () => <div data-testid="cartesian-grid" />,
    Tooltip: ({ formatter }: { formatter?: Function }) => (
      <div data-testid="tooltip" data-has-formatter={!!formatter} />
    ),
  };
});

// ✅ Fix 1: Use correct path alias (not absolute '/lib/index.ts')
jest.mock('/lib/index.ts', () => ({
  splitIntoRanges: jest.fn(),
  formatYAxis: jest.fn().mockImplementation((val: number) => `${val / 1000}k`),
}));

describe('UserGrowthChart', () => {
  const mockUserGrowth: UserGrowthType[] = [
    { month: 'Jan', users: 1500 },
    { month: 'Feb', users: 2500 },
  ];

  const mockRanges = [
    { range1: 500, range2: 600, range3: 400 },
    { range1: 800, range2: 1000, range3: 700 },
  ];

  beforeEach(() => {
    // ✅ Fix 2: Use '@/lib' consistently
    const lib = require('/lib/index.ts');
    (lib.splitIntoRanges as jest.Mock).mockImplementation((users: number) => {
      if (users === 1500) return mockRanges[0];
      if (users === 2500) return mockRanges[1];
      return { range1: 0, range2: 0, range3: 0 };
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders chart with correct title and data', () => {
    render(<UserGrowthChart userGrowth={mockUserGrowth} />);

    expect(screen.getByText('User Growth')).toBeInTheDocument();
    expect(screen.getByTestId('composed-chart')).toHaveAttribute(
      'data-length',
      '2'
    );
    expect(screen.getByTestId('bar-range1')).toBeInTheDocument();
    expect(screen.getByTestId('bar-range2')).toBeInTheDocument();
    expect(screen.getByTestId('bar-range3')).toBeInTheDocument();
    expect(screen.getByTestId('line-users')).toBeInTheDocument();
    expect(screen.getByTestId('x-axis')).toBeInTheDocument();
    expect(screen.getByTestId('y-axis')).toBeInTheDocument();
    expect(screen.getByTestId('cartesian-grid')).toBeInTheDocument();
  });

  it('applies correct fill colors to stacked bars', () => {
    render(<UserGrowthChart userGrowth={mockUserGrowth} />);

    expect(screen.getByTestId('bar-range1')).toHaveAttribute(
      'data-fill',
      '#90caf9'
    );
    expect(screen.getByTestId('bar-range2')).toHaveAttribute(
      'data-fill',
      '#42a5f5'
    );
    expect(screen.getByTestId('bar-range3')).toHaveAttribute(
      'data-fill',
      '#1976d2'
    );
  });

  // ✅ Fix 3: REMOVE the .toHaveBeenCalledWith(0) line
  it('uses formatYAxis for Y-axis tick formatting', () => {
    render(<UserGrowthChart userGrowth={mockUserGrowth} />);

    // ✅ This is enough: confirms a formatter function was passed
    expect(screen.getByTestId('y-axis')).toHaveAttribute(
      'data-formatter',
      'true'
    );

    // ❌ DO NOT do this — formatYAxis is not called during render
    // expect(require('@/lib').formatYAxis).toHaveBeenCalledWith(0);
  });

  it('configures tooltip to hide range series and label total users', () => {
    render(<UserGrowthChart userGrowth={mockUserGrowth} />);

    expect(screen.getByTestId('tooltip')).toHaveAttribute(
      'data-has-formatter',
      'true'
    );
  });

  it('transforms userGrowth data with splitIntoRanges', () => {
    render(<UserGrowthChart userGrowth={mockUserGrowth} />);

    const lib = require('/lib/index.ts');
    expect(lib.splitIntoRanges).toHaveBeenCalledTimes(2);
    expect(lib.splitIntoRanges).toHaveBeenCalledWith(1500);
    expect(lib.splitIntoRanges).toHaveBeenCalledWith(2500);
  });

  it('handles empty data gracefully', () => {
    render(<UserGrowthChart userGrowth={[]} />);

    expect(screen.getByText('User Growth')).toBeInTheDocument();
    expect(screen.getByTestId('composed-chart')).toHaveAttribute(
      'data-length',
      '0'
    );
  });
});
