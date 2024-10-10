import apolloClient from "@/gql-client/apollo-client";
import { GetRepositoryIssues } from "@/gql-client/queries/getRepositoryIssues";
import { IssueState } from "@/gql-client/__generated__/graphql";

export async function getServerSideProps() {
  const { data } = await apolloClient.query({
    query: GetRepositoryIssues,
    variables: {
      owner: "facebook",
      name: "react",
      states: IssueState.Open,
      IssuePagination: 20,
    },
  });
  if (data) {
    console.warn(data);
  }

  return {
    props: {
      data: data,
    },
  };
}

export default function Home(data) {
  console.warn(data);
  return <div>Hi</div>;
}
