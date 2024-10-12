import React from "react";
import {
  IssueTitle,
  IssueBody,
  IssueContainer,
  CommentItem,
  CommentDate,
  CommentAuthor,
  IssueMetadata,
} from "./styled";
import { GetIssueWithCommentsByIdQuery } from "@/gql-client/__generated__/graphql";

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
    </IssueContainer>
  );
}
