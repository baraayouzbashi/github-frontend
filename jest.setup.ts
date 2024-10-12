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

export const MockedValue = { success: true };
