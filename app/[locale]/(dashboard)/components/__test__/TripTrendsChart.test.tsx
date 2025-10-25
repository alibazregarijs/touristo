// src/app/[locale]/(dashboard)/components/TripTrendsChart.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TripTrendsChart from '@/app/[locale]/(dashboard)/components/TripTrendsChart';

// Mock next-intl
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const translations: Record<string, string> = {
      'TripGrowthChart.title': 'Trip Growth Trends',
    };
    return translations[key] || key;
  },
  useLocale: () => 'en',
}));

// Mock recharts components
jest.mock('recharts', () => {
  const original = jest.requireActual('recharts');
  return {
    ...original,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div
        data-testid="responsive-container"
        style={{ width: '100%', height: '100%' }}
      >
        {children}
      </div>
    ),
    BarChart: ({ children, data }: any) => (
      <div data-testid="bar-chart" data-length={data?.length || 0}>
        {children}
      </div>
    ),
    Bar: ({ children, onMouseLeave }: any) => (
      // ✅ Pass through onMouseLeave!
      <div data-testid="bar" onMouseLeave={onMouseLeave}>
        {children}
      </div>
    ),
    Cell: ({ fill, stroke, strokeWidth, onMouseEnter }: any) => (
      <div
        data-testid="cell"
        style={{ fill, stroke, strokeWidth }}
        onMouseEnter={onMouseEnter}
      />
    ),
    XAxis: () => <div data-testid="x-axis" />,
    YAxis: () => <div data-testid="y-axis" />,
    Tooltip: () => <div data-testid="tooltip" />,
    LabelList: () => null,
  };
});

describe('TripTrendsChart', () => {
  const mockTripGrowth = [
    { name: 'Jan', count: 30, value: '30%', highlight: true },
    { name: 'Feb', count: 20, value: '20%', highlight: false },
    { name: 'Mar', count: 45, value: '45%', highlight: true },
  ];

  it('renders chart title correctly', () => {
    render(<TripTrendsChart tripGrowth={mockTripGrowth} />);
    expect(screen.getByText('Trip Growth Trends')).toBeInTheDocument();
  });

  it('renders the correct number of bars based on tripGrowth data', () => {
    render(<TripTrendsChart tripGrowth={mockTripGrowth} />);
    const cells = screen.getAllByTestId('cell');
    expect(cells).toHaveLength(mockTripGrowth.length);
  });

  it('applies correct base fill color based on highlight prop', () => {
    render(<TripTrendsChart tripGrowth={mockTripGrowth} />);
    const cells = screen.getAllByTestId('cell');
    expect(cells[0]).toHaveStyle({ fill: '#4A3AFF' });
    expect(cells[1]).toHaveStyle({ fill: '#E5EAFC' });
  });

  it('changes bar color and adds border on hover', () => {
    render(<TripTrendsChart tripGrowth={mockTripGrowth} />);
    const cells = screen.getAllByTestId('cell');
    fireEvent.mouseEnter(cells[0]);
    expect(cells[0]).toHaveStyle({
      fill: '#7C6CFF',
      stroke: '#4A3AFF',
      strokeWidth: '2',
    });
    expect(cells[1]).toHaveStyle({
      fill: '#E5EAFC',
      stroke: 'none',
      strokeWidth: '0',
    });
  });

  it('resets active state on mouse leave', () => {
    render(<TripTrendsChart tripGrowth={mockTripGrowth} />);
    const bar = screen.getByTestId('bar');
    const cells = screen.getAllByTestId('cell');

    fireEvent.mouseEnter(cells[0]);
    expect(cells[0]).toHaveStyle({ fill: '#7C6CFF' });

    fireEvent.mouseLeave(bar); // ✅ Now works because Bar mock passes onMouseLeave
    expect(cells[0]).toHaveStyle({ fill: '#4A3AFF' }); // back to base
  });

  it('renders responsive chart container', () => {
    render(<TripTrendsChart tripGrowth={mockTripGrowth} />);
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
  });

  it('handles empty tripGrowth array gracefully', () => {
    render(<TripTrendsChart tripGrowth={[]} />);
    expect(screen.getByText('Trip Growth Trends')).toBeInTheDocument();
    expect(screen.queryByTestId('cell')).not.toBeInTheDocument();
  });
});
