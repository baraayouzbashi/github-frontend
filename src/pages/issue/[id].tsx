import apolloClient from "@/gql-client/apollo-client";
import { GetIssueWithCommentsByIdQuery } from "@/gql-client/__generated__/graphql";
import { GetServerSidePropsContext } from "next";
import { GetIssueWithCommentsByID } from "@/gql-client/queries/getIssueComments";

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
  console.warn(JSON.stringify(params));
  const { data } = await apolloClient
    .query({
      query: GetIssueWithCommentsByID,
      variables: {
        issueId: params.id,
        numComments: 20,
      },
    })
    .catch((err) => {
      console.error("error fetching issue:", err);
    });

  return {
    props: {
      data,
    },
  };
}

export default function Home({
  data,
}: {
  data: GetIssueWithCommentsByIdQuery;
}) {
  console.warn(data);
  return <div>Hi</div>;
}
