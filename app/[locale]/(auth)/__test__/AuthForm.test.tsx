import { render, screen } from '@testing-library/react';
import AuthForm from '@/app/[locale]/(auth)/components/AuthForm';
import { useSchemas } from '@/types/zod';
import userEvent from '@testing-library/user-event';

// sign-up tests
test('renders inputs with labels: Username, Email, Password', () => {
  const { signUpSchema } = useSchemas();
  const mockSubmit = async () => ({ success: true });

  render(
    <AuthForm page="sign-up" onSubmit={mockSubmit} schema={signUpSchema} />
  );

  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  const passwordInput = screen.getByLabelText(/password/i, {
    selector: 'input',
  });
  expect(passwordInput).toBeInTheDocument();
});

test('disables submit button when form is submitting', async () => {
  const { signUpSchema } = useSchemas();

  // Mock submit that never resolves so isSubmitting stays true
  const mockSubmit = async () => ({ success: true });

  render(
    <AuthForm page="sign-up" onSubmit={mockSubmit} schema={signUpSchema} />
  );

  // Fill in required fields
  await userEvent.type(
    screen.getByLabelText(/username/i, { selector: 'input' }),
    'testuser'
  );
  await userEvent.type(
    screen.getByLabelText(/email/i, { selector: 'input' }),
    'test@example.com'
  );
  await userEvent.type(
    screen.getByLabelText(/password/i, { selector: 'input' }),
    'password123'
  );

  const submitButton = screen.getByRole('button', { name: /Sign Up/ });

  // Click submit
  await userEvent.click(submitButton);

  // Now it should be disabled while submitting
  expect(submitButton).toBeDisabled();
});

test('The submit handler is called for valid data.', async () => {
  const { signUpSchema } = useSchemas();
  const mockSubmit = jest.fn(async () => ({ success: true }));

  render(
    <AuthForm page="sign-up" onSubmit={mockSubmit} schema={signUpSchema} />
  );

  // Fill in required fields
  await userEvent.type(
    screen.getByLabelText(/username/i, { selector: 'input' }),
    'testuser'
  );
  await userEvent.type(
    screen.getByLabelText(/email/i, { selector: 'input' }),
    'test@example.com'
  );
  await userEvent.type(
    screen.getByLabelText(/password/i, { selector: 'input' }),
    'password123'
  );

  const submitButton = screen.getByRole('button', { name: /Sign Up/ });

  // Click submit
  await userEvent.click(submitButton);

  // Now it should be disabled while submitting
  expect(submitButton).toBeDisabled();
  expect(mockSubmit).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123',
    username: 'testuser',
  });
});

test('renders error message when submit fails', async () => {
  const { signUpSchema } = useSchemas();
  const mockSubmit = jest.fn(async () => ({
    success: false,
    error: 'signUpUserExistError',
  }));

  render(
    <AuthForm page="sign-up" onSubmit={mockSubmit} schema={signUpSchema} />
  );

  // Fill in required fields
  await userEvent.type(
    screen.getByLabelText(/username/i, { selector: 'input' }),
    'testuser'
  );
  await userEvent.type(
    screen.getByLabelText(/email/i, { selector: 'input' }),
    'test@example.com'
  );
  await userEvent.type(
    screen.getByLabelText(/password/i, { selector: 'input' }),
    'password123'
  );

  const submitButton = screen.getByRole('button', { name: /Sign Up/ });

  // Click submit
  await userEvent.click(submitButton);

  // Now it should be disabled while submitting
  expect(await screen.findByText(/signUpUserExistError/i)).toBeInTheDocument();
});

// sign-in tests
test('renders sign-in inputs with labels: Email, Password', () => {
  const { signInSchema } = useSchemas();
  const mockSubmit = async () => ({ success: true });
  render(
    <AuthForm page="sign-in" onSubmit={mockSubmit} schema={signInSchema} />
  );

  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  const passwordInput = screen.getByLabelText(/password/i, {
    selector: 'input',
  });
  expect(passwordInput).toBeInTheDocument();
});

test('disables sign-in submit button when form is submitting', async () => {
  const { signInSchema } = useSchemas();
  const mockSubmit = async () => ({ success: true });

  render(
    <AuthForm page="sign-in" onSubmit={mockSubmit} schema={signInSchema} />
  );

  // Fill in required fields
  await userEvent.type(
    screen.getByLabelText(/email/i, { selector: 'input' }),
    'test@example.com'
  );
  await userEvent.type(
    screen.getByLabelText(/password/i, { selector: 'input' }),
    'password123'
  );

  const submitButton = screen.getByRole('button', { name: /Sign In/ });

  // Click submit
  await userEvent.click(submitButton);

  // Now it should be disabled while submitting
  expect(submitButton).toBeDisabled();
});

test('The sign-in submit handler is called for valid data.', async () => {
  const { signInSchema } = useSchemas();
  const mockSubmit = jest.fn(async () => ({ success: true }));
  render(
    <AuthForm page="sign-in" onSubmit={mockSubmit} schema={signInSchema} />
  );

  // Fill in required fields
  await userEvent.type(
    screen.getByLabelText(/email/i, { selector: 'input' }),
    'test@example.com'
  );
  await userEvent.type(
    screen.getByLabelText(/password/i, { selector: 'input' }),
    'password123'
  );

  const submitButton = screen.getByRole('button', { name: /Sign In/ });

  // Click submit
  await userEvent.click(submitButton);

  // Now it should be disabled while submitting
  expect(submitButton).toBeDisabled();
  expect(mockSubmit).toHaveBeenCalledWith({
    email: 'test@example.com',
    password: 'password123',
  });
});

test('renders error message when sign-in submit fails', async () => {
  const { signInSchema } = useSchemas();
  const mockSubmit = jest.fn(async () => ({
    success: false,
    error: 'signInUserExistError',
  }));
  render(
    <AuthForm page="sign-in" onSubmit={mockSubmit} schema={signInSchema} />
  );

  // Fill in required fields
  await userEvent.type(
    screen.getByLabelText(/email/i, { selector: 'input' }),
    'test@example.com'
  );
  await userEvent.type(
    screen.getByLabelText(/password/i, { selector: 'input' }),
    'password123'
  );

  const submitButton = screen.getByRole('button', { name: /Sign In/ });

  // Click submit
  await userEvent.click(submitButton);

  // Now it should be disabled while submitting
  expect(await screen.findByText(/signInUserExistError/i)).toBeInTheDocument();
});
