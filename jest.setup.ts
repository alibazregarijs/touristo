import '@testing-library/jest-dom';
// jest.setup.ts

// --- Mock next-intl ---
// Mock next-intl hooks
jest.mock('next-intl', () => ({
  useLocale: () => 'en', // always return a fake locale
  useTranslations: () => (key: string) => {
    if (key === 'signUp') return 'Sign Up';
    if (key === 'signIn') return 'Sign In';
    if (key === 'signingUp') return 'Signing Up...';
    if (key === 'signinigIn') return 'Signing In...';
    return key;
  },
}));

// Mock server-side translations
jest.mock('next-intl/server', () => ({
  getTranslations: async () => (key: string) => key,
}));

// Mock navigation helpers
jest.mock('next-intl/navigation', () => ({
  createNavigation: jest.fn(() => ({
    Link: () => null,
    redirect: jest.fn(),
    usePathname: jest.fn(),
    useRouter: jest.fn(),
  })),
}));

// Mock routing helpers
jest.mock('next-intl/routing', () => ({
  defineRouting: jest.fn(() => ({
    locales: ['en', 'fa'],
  })),
}));

// --- Mock next-auth/react ---
jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
  useSession: () => ({ data: null, status: 'unauthenticated' }),
}));

// --- Mock next-auth core (if imported directly) ---
jest.mock('next-auth', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    handlers: {},
    signIn: jest.fn(),
    signOut: jest.fn(),
    auth: jest.fn(),
  })),
}));

// --- Mock next-auth providers ---
jest.mock('next-auth/providers/credentials', () => ({
  __esModule: true,
  default: jest.fn(() => ({})),
}));
jest.mock('next-auth/providers/google', () => ({
  __esModule: true,
  default: jest.fn(() => ({})),
}));

// --- Mock Convex client ---
jest.mock('convex/browser', () => {
  return {
    ConvexHttpClient: jest.fn().mockImplementation(() => ({
      query: jest.fn(async (fn, { email }) => {
        if (email === 'test@example.com') {
          return {
            _id: 'mock-id-123',
            email: 'test@example.com',
            username: 'MockUser',
            password: '$2a$10$hashedpassword',
          };
        }
        return null;
      }),
    })),
  };
});

// --- Mock Convex API ---
jest.mock('/convex/_generated/api', () => ({
  api: {
    user: {
      getUserByEmail: jest.fn(),
    },
  },
}));
