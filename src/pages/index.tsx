import apolloClient from "@/gql-client/apollo-client";
import { GetRepositoryIssues } from "@/gql-client/queries/getRepositoryIssues";
import { SearchIssuesByTitleOrBody } from "@/gql-client/queries/searchIssuesByTitleOrBody";
import {
  GetRepositoryIssuesQuery,
  IssueState,
} from "@/gql-client/__generated__/graphql";
import IndexPage from "@/components/Pages/Index";
import { GetServerSideProps } from "next";

export async function getServerSideProps({ query }: GetServerSideProps) {
  let issuesState = IssueState.Closed;
  if (query?.isOpen) {
    issuesState = IssueState.Open;
  }
  if (query?.search) {
    const { data } = await apolloClient
      .query({
        query: SearchIssuesByTitleOrBody,
        variables: {
          query: `repo:facebook/react in:title in:body is:${issuesState} ${query.search}`,
          numResults: 20,
        },
      })
      .catch((err) => {
        console.error("error fetching search results:", err);
      });

    return {
      props: {
        data: data.search.edges
          .map((edge) => edge.node)
          .filter((e) => e.__typename == "Issue"),
      },
    };
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
      data: data.repository.issues.nodes,
    },
  };
}

export default function Home({
  data,
}: {
  data: GetRepositoryIssuesQuery["repository"]["issues"]["nodes"];
}) {
  return <IndexPage data={data} />;
}
