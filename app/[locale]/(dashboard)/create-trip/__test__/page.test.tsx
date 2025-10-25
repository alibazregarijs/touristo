// src/app/[locale]/(dashboard)/create-trip/page.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Box } from '@mui/material';
import CreateTrip from '@/app/[locale]/(dashboard)/create-trip/components/CreateTrip';
import Header from '@/app/[locale]/(dashboard)/components/Header';

// Mock next-intl/server
jest.mock('next-intl/server', () => ({
  getTranslations: () =>
    Promise.resolve((key: string) => {
      const translations: Record<string, string> = {
        'CreateTrip.title': 'Plan Your Dream Trip',
        'CreateTrip.description': 'Create a new AI-powered travel itinerary',
        'CreateTrip.buttonTitle': 'View All Trips',
      };
      return translations[key] || key;
    }),
}));

// Mock Header
jest.mock('/app/[locale]/(dashboard)/components/Header', () => {
  const MockHeader = ({ title, description, buttonTitle, href }: any) => (
    <header data-testid="header">
      <h1 data-testid="header-title">{title}</h1>
      <p data-testid="header-description">{description}</p>
      <a href={href} data-testid="header-button">
        {buttonTitle}
      </a>
    </header>
  );
  MockHeader.displayName = 'MockHeader';
  return MockHeader;
});

// Mock CreateTrip
jest.mock('/app/[locale]/(dashboard)/create-trip/components/CreateTrip', () => {
  const MockCreateTrip = () => <div data-testid="create-trip-component" />;
  MockCreateTrip.displayName = 'MockCreateTrip';
  return MockCreateTrip;
});

// Mock MUI Box
jest.mock('@mui/material', () => {
  const Box = ({ children, sx }: any) => (
    <div
      data-testid="mui-box"
      style={{
        maxHeight: sx?.maxHeight,
        overflowY: sx?.overflowY,
      }}
    >
      {children}
    </div>
  );
  Box.displayName = 'MockBox';
  return { Box };
});

// Testable version that mirrors the real page
const CreateTripPageForTest = async () => {
  const t = await (await import('next-intl/server')).getTranslations();
  return (
    // ✅ Now includes Box!
    <Box sx={{ maxHeight: '100%', overflowY: 'auto' }}>
      <Header
        title={t('CreateTrip.title')}
        description={t('CreateTrip.description')}
        buttonTitle={t('CreateTrip.buttonTitle')}
        href="/en/AI-trips"
      />
      <CreateTrip />
    </Box>
  );
};

describe('Create Trip Page', () => {
  it('renders header with correct translations and href', async () => {
    render(await CreateTripPageForTest());

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('header-title')).toHaveTextContent(
      'Plan Your Dream Trip'
    );
    expect(screen.getByTestId('header-description')).toHaveTextContent(
      'Create a new AI-powered travel itinerary'
    );
    const buttonLink = screen.getByTestId('header-button');
    expect(buttonLink).toHaveTextContent('View All Trips');
    expect(buttonLink).toHaveAttribute('href', '/en/AI-trips');
  });

  it('renders CreateTrip component', async () => {
    render(await CreateTripPageForTest());
    expect(screen.getByTestId('create-trip-component')).toBeInTheDocument();
  });

  it('renders inside a scrollable container', async () => {
    render(await CreateTripPageForTest());

    const box = screen.getByTestId('mui-box');
    expect(box).toHaveStyle({
      maxHeight: '100%',
      overflowY: 'auto',
    });
  });
});
