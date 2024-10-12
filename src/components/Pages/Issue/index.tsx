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

type IssueNode = StrictExtract<
  NonNullable<GetIssueWithCommentsByIdQuery["node"]>,
  { __typename?: "Issue" }
>;

interface Props {
  node: IssueNode;
}
export default function IssuePage({ node: issue }: Props) {
  if (!issue) {
    return <div>Loading...</div>;
  }

  return (
    <IssueContainer>
      <IssueTitle>{issue.title}</IssueTitle>
      <IssueMetadata>
        {issue.author?.login ? `Created by ${issue.author.login} on ` : ``}
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
      {issue.comments.nodes?.map((comment) => {
        if (comment === null) return null;
        return (
          <CommentItem key={comment.createdAt}>
            {comment.author?.login ? (
              <CommentAuthor>{comment.author.login}</CommentAuthor>
            ) : null}
            <CommentDate>
              {new Date(comment.createdAt).toLocaleDateString()}
            </CommentDate>
            <p>{comment.body}</p>
          </CommentItem>
        );
      })}
    </IssueContainer>
  );
}
