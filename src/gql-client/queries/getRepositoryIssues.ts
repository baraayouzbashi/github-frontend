import { gql } from "../__generated__/gql";

export const GetRepositoryIssues = gql(/*GraphQL*/ `
query GetRepositoryIssues($owner: String!, $name: String!, $states: [IssueState!], $IssuePagination: Int!) {
  repository(owner: $owner, name: $name) {
    name
    description
    owner {
      login
    }
    issues(
      states: $states
      first: $IssuePagination
      orderBy: {direction: DESC, field: CREATED_AT}
    ) {
      totalCount
      nodes {
        state
        title
        labels(first: 3) {
          nodes {
            color
            name
          }
        }
        comments {
          totalCount
        }
        id
      }
    }
  }
}
`);
