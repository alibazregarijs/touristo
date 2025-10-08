// components/TripTrendsChart.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TripTrendsChart from '@/app/[locale]/(dashboard)/components/TripTrendsChart';
import { TripGrowth } from '@/types';

// Mock Recharts
jest.mock('recharts', () => {
  const Original = jest.requireActual('recharts');
  return {
    ...Original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div
        data-testid="responsive-container"
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </div>
    ),
    BarChart: ({
      data,
      children,
    }: {
      data: any[];
      children: React.ReactNode;
    }) => (
      <div data-testid="bar-chart" data-length={data?.length}>
        {children}
      </div>
    ),
    Bar: ({
      children,
      onMouseLeave,
    }: {
      children: React.ReactNode;
      onMouseLeave?: () => void;
    }) => (
      <div data-testid="bar" onMouseLeave={onMouseLeave}>
        {children}
      </div>
    ),
    Cell: ({
      fill,
      stroke,
      strokeWidth,
      onMouseEnter,
    }: {
      fill: string;
      stroke?: string;
      strokeWidth?: number;
      onMouseEnter?: () => void;
    }) => (
      <div
        data-testid="cell"
        style={{ fill, stroke, strokeWidth: strokeWidth || 0 }}
        onMouseEnter={onMouseEnter}
      />
    ),
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: ({ tickFormatter }: { tickFormatter?: (val: number) => string }) => (
      <div data-testid="y-axis" data-formatter={!!tickFormatter} />
    ),
    Tooltip: () => <div data-testid="tooltip" />,
    LabelList: () => null,
  };
});

describe('TripTrendsChart', () => {
  const mockTripGrowth: TripGrowth[] = [
    { name: 'Jan', value: 30, highlight: false },
    { name: 'Feb', value: 45, highlight: true },
    { name: 'Mar', value: 20, highlight: false },
  ];

  it('renders chart with correct title and data', () => {
    render(<TripTrendsChart tripGrowth={mockTripGrowth} />);

    // ✅ Title
    expect(screen.getByText('User Growth')).toBeInTheDocument();

    // ✅ Chart structure
    expect(screen.getByTestId('bar-chart')).toHaveAttribute('data-length', '3');
    expect(screen.getByTestId('x-axis')).toBeInTheDocument();
    expect(screen.getByTestId('y-axis')).toBeInTheDocument();
    expect(screen.getByTestId('tooltip')).toBeInTheDocument();

    // ✅ Cells rendered
    const cells = screen.getAllByTestId('cell');
    expect(cells).toHaveLength(3);
  });

  it('applies correct initial fill colors based on highlight', () => {
    render(<TripTrendsChart tripGrowth={mockTripGrowth} />);

    const cells = screen.getAllByTestId('cell');

    expect(cells[0]).toHaveStyle('fill: #E5EAFC'); // Jan
    expect(cells[1]).toHaveStyle('fill: #4A3AFF'); // Feb
    expect(cells[2]).toHaveStyle('fill: #E5EAFC'); // Mar
  });

  it('updates bar color on hover and reverts on mouse leave', () => {
    render(<TripTrendsChart tripGrowth={mockTripGrowth} />);

    const cells = screen.getAllByTestId('cell');
    const bar = screen.getByTestId('bar');

    fireEvent.mouseEnter(cells[0]);

    expect(cells[0]).toHaveStyle('fill: #7C6CFF');
    expect(cells[0]).toHaveStyle('stroke: #4A3AFF');
    expect(cells[0]).toHaveStyle('stroke-width: 2');

    expect(cells[1]).toHaveStyle('fill: #4A3AFF');
    expect(cells[2]).toHaveStyle('fill: #E5EAFC');

    fireEvent.mouseLeave(bar);
  });

  it('handles empty data gracefully', () => {
    render(<TripTrendsChart tripGrowth={[]} />);

    expect(screen.getByText('User Growth')).toBeInTheDocument();
    expect(screen.getByTestId('bar-chart')).toHaveAttribute('data-length', '0');
    expect(screen.queryAllByTestId('cell')).toHaveLength(0);
  });

  it('uses inline tickFormatter for Y-axis percentage', () => {
    render(<TripTrendsChart tripGrowth={mockTripGrowth} />);

    expect(screen.getByTestId('y-axis')).toHaveAttribute(
      'data-formatter',
      'true'
    );
  });
});
