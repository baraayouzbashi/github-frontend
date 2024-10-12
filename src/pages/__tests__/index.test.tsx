import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home, { getServerSideProps } from "../index";
import { GetRepositoryIssuesQuery } from "@/gql-client/__generated__/graphql";
import { MockedValue } from "../../../jest.setup";

const data = {
  repository: {
    name: "name of repo",
    description: "description of the repo",
    issues: {
      nodes: [],
      totalCount: 0,
    },
  },
} as GetRepositoryIssuesQuery;

describe("Home", () => {
  it("renders a heading", () => {
    render(<Home data={data} />);
    const heading = screen.queryByRole("heading", { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading.innerHTML).toEqual(data.repository?.name);
  });
  it("renders Loading screen", () => {
    render(<Home data={{ repository: null }} />);
    const loading = screen.getByText(/Loading/);
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
    const res = await getServerSideProps();
    expect(res).toEqual({ props: { data: MockedValue } });
  });
});
