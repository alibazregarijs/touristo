// src/app/[locale]/(dashboard)/components/TripsStateCard.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TripsStateCard from '@/app/[locale]/(dashboard)/components/TripsStateCard';

// Mock next/image
jest.mock('next/image', () => {
  const MockImage = ({ src, alt, width, height }: any) => (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      data-testid="image"
    />
  );
  MockImage.displayName = 'MockImage';
  return MockImage;
});

// Mock next/link
jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} data-testid="trip-link">
      {children}
    </a>
  );
  MockLink.displayName = 'MockLink';
  return MockLink;
});

// Mock MButton
jest.mock('@/components/Button', () => {
  const MockMButton = ({
    title,
    type,
    cssClass,
  }: {
    title: string;
    type: string;
    cssClass?: string;
  }) => (
    <button
      data-testid="m-button"
      data-type={type}
      className={cssClass}
      title={title}
    >
      {title}
    </button>
  );
  MockMButton.displayName = 'MockMButton';
  return MockMButton;
});

describe('TripsStateCard Component', () => {
  const mockTrip = {
    id: 'trip-123',
    name: 'Paris Adventure',
    imageUrls: ['https://example.com/paris.jpg    '], // 2 trailing spaces
    itinerary: [{ location: 'Paris, France' }],
    travelStyle: 'Luxury',
    budget: 'High',
  };

  it('renders trip name, location, and image', () => {
    render(<TripsStateCard trip={mockTrip as any} isPaginated={false} />);

    expect(screen.getByText('Paris Adventure')).toBeInTheDocument();
    expect(screen.getByText('Paris, France')).toBeInTheDocument();

    const images = screen.getAllByTestId('image');
    expect(images).toHaveLength(2);

    const mainImage = images[0];
    expect(mainImage).toHaveAttribute('src', mockTrip.imageUrls[0].trim()); // ✅ consider trimming in component
    expect(mainImage).toHaveAttribute('alt', 'Paris Adventure');

    expect(images[1]).toHaveAttribute('src', '/icons/location.png');
  });

  it('links to correct trip detail page', () => {
    render(<TripsStateCard trip={mockTrip as any} isPaginated={false} />);

    const link = screen.getByTestId('trip-link');
    expect(link).toHaveAttribute('href', '/en/AI-trips/trip-123');
  });

  it('renders two MButtons with correct titles and types', () => {
    render(<TripsStateCard trip={mockTrip as any} isPaginated={false} />);

    const buttons = screen.getAllByTestId('m-button');
    expect(buttons).toHaveLength(2);

    expect(buttons[0]).toHaveTextContent('Luxury');
    expect(buttons[0]).toHaveAttribute('data-type', 'Luxury');

    expect(buttons[1]).toHaveTextContent('High');
    expect(buttons[1]).toHaveAttribute('data-type', 'High');
  });

  it('applies smaller button styles when isPaginated=true', () => {
    render(<TripsStateCard trip={mockTrip as any} isPaginated={true} />);

    const buttons = screen.getAllByTestId('m-button');
    buttons.forEach((btn) => {
      expect(btn).toHaveClass('text-[12px]!');
      expect(btn).toHaveClass('p-1!');
    });
  });

  it('handles missing itinerary gracefully', () => {
    const tripWithoutItinerary = {
      ...mockTrip,
      itinerary: [],
    };

    render(
      <TripsStateCard trip={tripWithoutItinerary as any} isPaginated={false} />
    );

    expect(screen.queryByText('Paris, France')).not.toBeInTheDocument();
  });

  it('uses first image URL from imageUrls', () => {
    const tripWithMultipleImages = {
      ...mockTrip,
      imageUrls: [
        'https://example.com/first.jpg          ',
        'https://example.com/second.jpg          ',
      ],
    };

    render(
      <TripsStateCard
        trip={tripWithMultipleImages as any}
        isPaginated={false}
      />
    );

    const images = screen.getAllByTestId('image');
    const mainImage = images[0];
    expect(mainImage).toHaveAttribute(
      'src',
      tripWithMultipleImages.imageUrls[0].trim()
    );
  });
});
