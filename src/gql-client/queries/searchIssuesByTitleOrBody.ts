import { gql } from "../__generated__/gql";

export const SearchIssuesByTitleOrBody = gql(/*GraphQL*/ `
  query SearchIssuesByTitleOrBody($query: String!, $numResults: Int!) {
    search(query: $query, type: ISSUE, first: $numResults) {
      edges {
        node {
          ... on Issue {
            title
            body
            id
            author {
              login
            }
          }
        }
      }
    }
  }
`);
