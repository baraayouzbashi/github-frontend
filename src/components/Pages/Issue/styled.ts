import styled from "styled-components";
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

const CommentItem = styled.div`
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

export {
  CommentAuthor,
  CommentDate,
  CommentItem,
  IssueBody,
  IssueContainer,
  IssueTitle,
  IssueMetadata,
};
