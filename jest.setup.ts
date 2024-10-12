import "@testing-library/jest-dom";
import "jest-styled-components";

jest.mock("@apollo/client", () => ({
  ApolloClient: jest.fn().mockImplementation(() => ({
    query: () =>
      Promise.resolve({
        data: MockedValue,
      }),
  })),
  InMemoryCache: jest.fn(),
}));

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockImplementation(() => ({
    query: {},
    push: jest.fn().mockImplementation(() => Promise.resolve()),
  })),
}));

export const MockedValue = { repository: { issues: { nodes: [] } } };
