import apolloClient from "@/gql-client/apollo-client";
import { GetServerSidePropsContext } from "next";
import { GetIssueWithCommentsByID } from "@/gql-client/queries/getIssueComments";
import IssuePage from "@/components/Pages/Issue";
import { GetIssueWithCommentsByIdQuery } from "@/gql-client/__generated__/graphql";
import { ApolloQueryResult } from "@apollo/client";

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  const { data } = (await apolloClient
    .query({
      query: GetIssueWithCommentsByID,
      variables: {
        issueId: params?.id as string,
        numComments: 20,
      },
    })
    .catch((err) => {
      console.error("error fetching issue:", err);
    })) as ApolloQueryResult<GetIssueWithCommentsByIdQuery>;

  return {
    props: {
      node: data.node,
    },
  };
}

export default IssuePage;
