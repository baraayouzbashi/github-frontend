import apolloClient from "@/gql-client/apollo-client";
import { GetIssueWithCommentsByIdQuery } from "@/gql-client/__generated__/graphql";
import { GetServerSidePropsContext } from "next";
import { GetIssueWithCommentsByID } from "@/gql-client/queries/getIssueComments";

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

import React from "react";
import styled from "styled-components";
import List from "@/components/List";

const IssueContainer = styled.div`
  background-color: var(--color-primary);
  color: var(--color-secondary);
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
`;

const IssueTitle = styled.h1`
  color: var(--color-accent);
  margin-bottom: 10px;
`;

const IssueBody = styled.div`
  background-color: var(--color-accent-light);
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;
`;

const IssueMetadata = styled.div`
  font-size: 0.9em;
  margin-bottom: 20px;
`;

const CommentsList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CommentItem = styled.li`
  background-color: var(--color-accent-light);
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
`;

const CommentAuthor = styled.span`
  font-weight: bold;
  color: var(--color-accent);
`;

const CommentDate = styled.span`
  font-size: 0.8em;
  color: var(--color-secondary);
  margin-left: 10px;
`;

export default function IssuePage({
  data,
}: {
  data: GetIssueWithCommentsByIdQuery["node"];
}) {
  if (!data) {
    return <div>Loading...</div>;
  }
  const { node: issue } = data;

  return (
    <IssueContainer>
      <IssueTitle>{issue.title}</IssueTitle>
      <IssueMetadata>
        {issue.author.login ?? `Created by ${issue.author.login} on `}
        {new Date(issue.createdAt).toLocaleDateString()}
        <br />
        State: {issue.state}
        <br />
        <a href={issue.url} target="_blank" rel="noopener noreferrer">
          View on GitHub
        </a>
      </IssueMetadata>
      <IssueBody>{issue.body}</IssueBody>
      <h2>Comments</h2>
      <List>
        {issue.comments.nodes.map((comment) => (
          <CommentItem key={comment.createdAt}>
            {comment.author?.login ? (
              <CommentAuthor>{comment.author.login}</CommentAuthor>
            ) : null}
            <CommentDate>
              {new Date(comment.createdAt).toLocaleDateString()}
            </CommentDate>
            <p>{comment.body}</p>
          </CommentItem>
        ))}
      </List>
    </IssueContainer>
  );
}
