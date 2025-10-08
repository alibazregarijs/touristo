// __tests__/components/Header.test.tsx
import { render, screen } from '@testing-library/react';
import Header from '@/app/[locale]/(dashboard)/components/Header';
import '@testing-library/jest-dom';

describe('Header', () => {
  const defaultProps = {
    title: 'Welcome John 👋',
    description: 'Track activity and trends',
    buttonTitle: 'Create a trip',
    href: '/en/create-trip',
  };

  it('renders title and description correctly', () => {
    render(<Header {...defaultProps} />);

    expect(screen.getByText('Welcome John 👋')).toBeInTheDocument();
    expect(screen.getByText('Track activity and trends')).toBeInTheDocument();
  });

  it('renders button with correct text and link', () => {
    render(<Header {...defaultProps} />);

    const button = screen.getByRole('button', { name: 'Create a trip' });
    expect(button).toBeInTheDocument();

    const link = screen.getByRole('link', { name: 'Create a trip' });
    expect(link).toHaveAttribute('href', '/en/create-trip');
  });

  it('uses "#" as fallback href when href is not provided', () => {
    render(
      <Header
        title="Test"
        description="Test desc"
        buttonTitle="Test button"
        // href intentionally omitted
      />
    );

    const link = screen.getByRole('link', { name: 'Test button' });
    expect(link).toHaveAttribute('href', '#');
  });

  it('applies correct typography styles (via class assertions)', () => {
    render(<Header {...defaultProps} />);

    const title = screen.getByText('Welcome John 👋');
    const description = screen.getByText('Track activity and trends');

    // These assertions depend on your actual CSS classes
    // Adjust if your class names differ (e.g., from Tailwind or custom CSS)
    expect(title).toHaveClass('font-semibold');
    expect(description).toHaveClass('text-white-2');
  });
});
