import { gql } from "../__generated__/gql";

export const GetIssueWithCommentsByID = gql(/*GraphQL*/ `
  query GetIssueWithCommentsByID($issueId: ID!, $numComments: Int!) {
    node(id: $issueId) {
      ... on Issue {
        title
        body
        url
        createdAt
        state
        author {
          login
        }
        comments(first: $numComments) {
          nodes {
            body
            createdAt
            author {
              login
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    }
  }
`);
