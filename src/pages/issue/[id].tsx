import apolloClient from "@/gql-client/apollo-client";
import { GetServerSidePropsContext } from "next";
import { GetIssueWithCommentsByID } from "@/gql-client/queries/getIssueComments";
import IssuePage from "@/components/Pages/Issue";

export async function getServerSideProps({
  params,
}: GetServerSidePropsContext) {
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

export default IssuePage;
