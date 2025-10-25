// CreateTrip.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateTrip from '../CreateTrip'; // Adjust path as needed
import { Box } from '@mui/material';

// Mock the CreateTripForm component to isolate the test
jest.mock(
  '/app/[locale]/(dashboard)/create-trip/components/CreateTripForm',
  () => {
    return function MockCreateTripForm() {
      return <div data-testid="mock-create-trip-form">Create Trip Form</div>;
    };
  }
);

describe('CreateTrip', () => {
  it('renders the CreateTripForm inside a styled container', () => {
    render(<CreateTrip />);

    // Check that the form is rendered
    expect(screen.getByTestId('mock-create-trip-form')).toBeInTheDocument();

    // Optionally, you can assert on structure or styles if needed,
    // but usually we avoid testing implementation details like inline styles.
    // Instead, we trust MUI's Box component and focus on presence of key elements.
  });

  it('applies correct layout styling via MUI Box', () => {
    const { container } = render(<CreateTrip />);

    // The outer Box should be a flex container centered vertically/horizontally
    const outerBox = container.firstChild as HTMLElement;
    expect(outerBox).toHaveStyle({
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    });

    // The inner Box (form container) should have expected visual properties
    const innerBox = outerBox.firstChild as HTMLElement;
    expect(innerBox).toHaveClass('MuiBox-root'); // Basic MUI class
    // We generally avoid testing exact styles like boxShadow or borderRadius
    // unless they are critical to functionality.
  });
});
