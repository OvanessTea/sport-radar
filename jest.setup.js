import '@testing-library/jest-dom'

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
  usePathname: () => '/',
}));

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

const originalConsoleError = console.error;


beforeAll(() => {
    console.error = (...args) => {
        if (!args[0].includes('Duplicate atom key')) {
            originalConsoleError(...args);
        }
    };
});

afterAll(() => {
    console.error = originalConsoleError;
});

beforeEach(() => {
    jest.clearAllMocks();
})