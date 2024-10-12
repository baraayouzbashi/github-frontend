import { gql } from "../__generated__/gql";

export const GetRepositoryIssues = gql(/*GraphQL*/ `
query GetRepositoryIssues($owner: String!, $name: String!, $states: [IssueState!], $IssuePagination: Int!) {
  repository(owner: $owner, name: $name) {
    name
    description
    issues(states: $states, first: $IssuePagination) {
      totalCount
      nodes {
        title
        body
        id
      }
    }
  }
}
`);
