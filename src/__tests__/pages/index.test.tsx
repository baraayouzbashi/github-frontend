import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home, { getServerSideProps } from "../../pages";
import { GetRepositoryIssuesQuery } from "@/gql-client/__generated__/graphql";
import { MockedValue } from "../../../jest.setup";

const data = {
  issues: {
    nodes: [],
    totalCount: 0,
  },
} as GetRepositoryIssuesQuery;

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home data={data} />);
    const heading = screen.queryByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
  });
  it("renders Loading screen", () => {
    render(<Home data={[]} />);
    const loading = screen.getByText(/No results/);
    expect(loading).toBeTruthy();
  });
  it("renders homepage unchanged", () => {
    const { container } = render(<Home data={data} />);
    expect(container).toMatchSnapshot();
  });
});
describe("getServerSideProps", () => {
  it("returns data inside props", async () => {
    expect.assertions(1);
    const res = await getServerSideProps({});
    expect(res).toEqual({
      props: { data: MockedValue.repository.issues.nodes },
    });
  });
});
