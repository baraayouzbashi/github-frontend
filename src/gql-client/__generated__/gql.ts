/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
    "\n  query GetIssueWithCommentsByID($issueId: ID!, $numComments: Int!) {\n    node(id: $issueId) {\n      ... on Issue {\n        title\n        body\n        url\n        createdAt\n        state\n        author {\n          login\n        }\n        comments(first: $numComments) {\n          nodes {\n            body\n            createdAt\n            author {\n              login\n            }\n          }\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n        }\n      }\n    }\n  }\n": types.GetIssueWithCommentsByIdDocument,
    "\nquery GetRepositoryIssues($owner: String!, $name: String!, $states: [IssueState!], $IssuePagination: Int!) {\n  repository(owner: $owner, name: $name) {\n    issues(\n      states: $states\n      first: $IssuePagination\n      orderBy: {direction: DESC, field: CREATED_AT}\n    ) {\n      totalCount\n      nodes {\n        state\n        title\n        labels(first: 3) {\n          nodes {\n            color\n            name\n          }\n        }\n        comments {\n          totalCount\n        }\n        id\n      }\n    }\n  }\n}\n": types.GetRepositoryIssuesDocument,
    "\n  query SearchIssuesByTitleOrBody($query: String!, $numResults: Int!) {\n  search(query: $query, type: ISSUE, first: $numResults) {\n    edges {\n      node {\n        ... on Issue {\n          state\n          title\n          labels(first: 3) {\n            nodes {\n              color\n              name\n            }\n          }\n          comments {\n            totalCount\n          }\n          id\n          author {\n            login\n          }\n        }\n      }\n    }\n  }\n}\n": types.SearchIssuesByTitleOrBodyDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetIssueWithCommentsByID($issueId: ID!, $numComments: Int!) {\n    node(id: $issueId) {\n      ... on Issue {\n        title\n        body\n        url\n        createdAt\n        state\n        author {\n          login\n        }\n        comments(first: $numComments) {\n          nodes {\n            body\n            createdAt\n            author {\n              login\n            }\n          }\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetIssueWithCommentsByID($issueId: ID!, $numComments: Int!) {\n    node(id: $issueId) {\n      ... on Issue {\n        title\n        body\n        url\n        createdAt\n        state\n        author {\n          login\n        }\n        comments(first: $numComments) {\n          nodes {\n            body\n            createdAt\n            author {\n              login\n            }\n          }\n          pageInfo {\n            hasNextPage\n            endCursor\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\nquery GetRepositoryIssues($owner: String!, $name: String!, $states: [IssueState!], $IssuePagination: Int!) {\n  repository(owner: $owner, name: $name) {\n    issues(\n      states: $states\n      first: $IssuePagination\n      orderBy: {direction: DESC, field: CREATED_AT}\n    ) {\n      totalCount\n      nodes {\n        state\n        title\n        labels(first: 3) {\n          nodes {\n            color\n            name\n          }\n        }\n        comments {\n          totalCount\n        }\n        id\n      }\n    }\n  }\n}\n"): (typeof documents)["\nquery GetRepositoryIssues($owner: String!, $name: String!, $states: [IssueState!], $IssuePagination: Int!) {\n  repository(owner: $owner, name: $name) {\n    issues(\n      states: $states\n      first: $IssuePagination\n      orderBy: {direction: DESC, field: CREATED_AT}\n    ) {\n      totalCount\n      nodes {\n        state\n        title\n        labels(first: 3) {\n          nodes {\n            color\n            name\n          }\n        }\n        comments {\n          totalCount\n        }\n        id\n      }\n    }\n  }\n}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SearchIssuesByTitleOrBody($query: String!, $numResults: Int!) {\n  search(query: $query, type: ISSUE, first: $numResults) {\n    edges {\n      node {\n        ... on Issue {\n          state\n          title\n          labels(first: 3) {\n            nodes {\n              color\n              name\n            }\n          }\n          comments {\n            totalCount\n          }\n          id\n          author {\n            login\n          }\n        }\n      }\n    }\n  }\n}\n"): (typeof documents)["\n  query SearchIssuesByTitleOrBody($query: String!, $numResults: Int!) {\n  search(query: $query, type: ISSUE, first: $numResults) {\n    edges {\n      node {\n        ... on Issue {\n          state\n          title\n          labels(first: 3) {\n            nodes {\n              color\n              name\n            }\n          }\n          comments {\n            totalCount\n          }\n          id\n          author {\n            login\n          }\n        }\n      }\n    }\n  }\n}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;