import "@testing-library/jest-dom";
import "jest-styled-components";

jest.mock("@apollo/client", () => ({
  ApolloClient: jest.fn(),
  InMemoryCache: jest.fn(),
}));
