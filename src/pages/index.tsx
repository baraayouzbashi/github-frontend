import apolloClient from "@/gql-client/apollo-client";
import { GetRepositoryIssues } from "@/gql-client/queries/getRepositoryIssues";
import {
  GetRepositoryIssuesQuery,
  IssueState,
} from "@/gql-client/__generated__/graphql";
import IndexPage from "@/components/IndexPage";

export async function getServerSideProps() {
  const { data } = await apolloClient
    .query({
      query: GetRepositoryIssues,
      variables: {
        owner: "facebook",
        name: "react",
        states: IssueState.Open,
        IssuePagination: 20,
      },
    })
    .catch((err) => {
      console.error("error fetching repository issues:", err);
    });

  return {
    props: {
      data,
    },
  };
}

export default function Home({ data }: { data: GetRepositoryIssuesQuery }) {
  return <IndexPage data={data} />;
}
