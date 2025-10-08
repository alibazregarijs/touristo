// components/TripsStateCard.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TripsStateCard from '@/app/[locale]/(dashboard)/components/TripsStateCard';
import { Trip } from '@/types';

// ✅ Fixed next/image mock with proper alt handling and display name
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage(props: any) {
    const {
      fill,
      unoptimized,
      quality,
      placeholder,
      blurDataURL,
      ...imgProps
    } = props;
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...imgProps} />;
  },
}));

// ✅ Fixed next/link mock with display name
jest.mock('next/link', () => ({
  __esModule: true,
  default: function MockLink({ children, href, passHref, ...props }: any) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  },
}));

// ✅ Fixed Button mock with display name
jest.mock('/components/Button', () => ({
  __esModule: true,
  default: function MockButton({
    title,
    type,
    cssClass,
  }: {
    title: string;
    type: string;
    cssClass?: string;
  }) {
    return (
      <button data-testid={`mbutton-${type}`} className={cssClass}>
        {title}
      </button>
    );
  },
}));

interface DayPlan {
  location: string;
}

describe('TripsStateCard', () => {
  const mockTrip: Trip = {
    id: 'trip-789',
    name: 'Mountain Escape in Switzerland',
    description: 'A serene alpine adventure...',
    estimatedPrice: '$2,500',
    duration: 7,
    budget: 'Luxury',
    travelStyle: 'Relaxation',
    interests: 'Nature, Hiking',
    groupType: 'Couples',
    country: 'Switzerland',
    imageUrls: ['https://example.com/swiss-mountains.jpg'],
    itinerary: [{ location: 'Zermatt, Switzerland' } as DayPlan],
    bestTimeToVisit: ['June', 'July'],
    weatherInfo: ['Mild temperatures', 'Sunny days'],
    location: { city: 'Zermatt', coordinates: [46.0207, 7.7491] },
    payment_link: 'https://example.com/pay/trip-789',
    creationTime: Date.now(),
  };

  it('renders trip card with correct content and link', () => {
    render(<TripsStateCard trip={mockTrip} isPaginated={false} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/en/AI-trips/trip-789');
    expect(
      screen.getByText('Mountain Escape in Switzerland')
    ).toBeInTheDocument();
    expect(screen.getByText('Zermatt, Switzerland')).toBeInTheDocument();

    const mainImage = screen.getByAltText('Mountain Escape in Switzerland');
    expect(mainImage).toBeInTheDocument();
    expect(mainImage).toHaveAttribute(
      'src',
      'https://example.com/swiss-mountains.jpg'
    );

    expect(screen.getByTestId('mbutton-Relaxation')).toHaveTextContent(
      'Relaxation'
    );
    expect(screen.getByTestId('mbutton-Luxury')).toHaveTextContent('Luxury');
    expect(screen.getByTestId('mbutton-Relaxation')).not.toHaveClass(
      'text-[12px]!'
    );
  });

  it('applies compact button styles when isPaginated=true', () => {
    render(<TripsStateCard trip={mockTrip} isPaginated={true} />);

    const styleBtn = screen.getByTestId('mbutton-Relaxation');
    const budgetBtn = screen.getByTestId('mbutton-Luxury');

    expect(styleBtn).toHaveClass('text-[12px]!');
    expect(styleBtn).toHaveClass('p-1!');
    expect(budgetBtn).toHaveClass('text-[12px]!');
    expect(budgetBtn).toHaveClass('p-1!');
  });

  it('uses trip name as image alt text', () => {
    render(<TripsStateCard trip={mockTrip} isPaginated={false} />);
    expect(screen.getByAltText(mockTrip.name)).toBeInTheDocument();
  });

  it('uses first image URL when multiple are provided', () => {
    const tripWithMultipleImages: Trip = {
      ...mockTrip,
      imageUrls: [
        'https://example.com/image1.jpg',
        'https://example.com/image2.jpg',
      ],
    };

    render(
      <TripsStateCard trip={tripWithMultipleImages} isPaginated={false} />
    );

    const img = screen.getByAltText(tripWithMultipleImages.name);
    expect(img).toHaveAttribute('src', 'https://example.com/image1.jpg');
  });
});
