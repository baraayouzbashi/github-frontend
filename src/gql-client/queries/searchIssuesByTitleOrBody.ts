import { gql } from "../__generated__/gql";

export const SearchIssuesByTitleOrBody = gql(/*GraphQL*/ `
  query SearchIssuesByTitleOrBody($query: String!, $numResults: Int!) {
  search(query: $query, type: ISSUE, first: $numResults) {
    edges {
      node {
        ... on Issue {
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
          author {
            login
          }
        }
      }
    }
  }
}
`);
