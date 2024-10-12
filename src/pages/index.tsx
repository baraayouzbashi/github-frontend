import apolloClient from "@/gql-client/apollo-client";
import { GetRepositoryIssues } from "@/gql-client/queries/getRepositoryIssues";
import {
  GetRepositoryIssuesQuery,
  IssueState,
} from "@/gql-client/__generated__/graphql";
import IndexPage from "@/components/IndexPage";
import { GetServerSideProps } from "next";

export async function getServerSideProps({ query }: GetServerSideProps) {
  let issuesState = IssueState.Closed;
  if (query.isOpen) {
    issuesState = IssueState.Open;
  }
  const { data } = await apolloClient
    .query({
      query: GetRepositoryIssues,
      variables: {
        owner: "facebook",
        name: "react",
        states: issuesState,
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
