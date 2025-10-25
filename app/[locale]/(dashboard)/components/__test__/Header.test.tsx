// src/app/[locale]/(dashboard)/components/Header.test.tsx
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '@/app/[locale]/(dashboard)/components/Header';

// Mock next/link to avoid Next.js router errors and allow href assertions
jest.mock('next/link', () => {
  const MockLink = ({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) => {
    return (
      <a href={href} data-testid="next-link">
        {children}
      </a>
    );
  };
  MockLink.displayName = 'MockLink';
  return MockLink;
});

describe('Header Component', () => {
  const defaultProps = {
    title: 'Dashboard',
    description: 'Your personal overview',
    buttonTitle: 'Create New Trip',
    href: '/en/create-trip',
  };

  it('renders title and description correctly', () => {
    render(<Header {...defaultProps} />);

    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  it('renders the button with correct text', () => {
    render(<Header {...defaultProps} />);

    expect(
      screen.getByRole('button', { name: defaultProps.buttonTitle })
    ).toBeInTheDocument();
  });

  it('wraps the button in a link with the correct href', () => {
    render(<Header {...defaultProps} />);

    const link = screen.getByTestId('next-link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', defaultProps.href);

    const button = screen.getByRole('button', {
      name: defaultProps.buttonTitle,
    });
    expect(link).toContainElement(button);
  });

  it('uses "#" as href when href prop is not provided', () => {
    render(
      <Header
        title="No Link"
        description="Button without href"
        buttonTitle="Fallback Button"
      />
    );

    const link = screen.getByTestId('next-link');
    expect(link).toHaveAttribute('href', '#');
  });

  it('is accessible: button is visible and enabled', () => {
    render(<Header {...defaultProps} />);

    const button = screen.getByRole('button', {
      name: defaultProps.buttonTitle,
    });
    expect(button).toBeVisible();
    expect(button).toBeEnabled();
  });
});
