import styled from "styled-components";
import Link from "next/link";
import { GetRepositoryIssuesQuery } from "@/gql-client/__generated__/graphql";

const Item = styled.li`
  padding: 12px;
  background: var(--color-accent-light);
  border-top: 1px solid #d1d9e0b3;
  &:hover {
    background: #f6f8fa;
  }
  &:first-of-type {
    border-top: 0;
  }
`;
const StyledLink = styled.a`
  gap: 1rem;
`;
const IconAndText = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  gap: 5px;
  flex-wrap: nowrap;
`;
const ItemTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--color-secondary);
`;
const HorizontalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
`;
interface Props {
  item: GetRepositoryIssuesQuery["repository"]["issues"]["nodes"]["number"];
}

export default function IssueListItem({ item }: Props) {
  return (
    <Item>
      <Link href={`/issue/${item.id}`} passHref={true} legacyBehavior>
        <StyledLink>
          <HorizontalContainer>
            <IconAndText>
              {item.state === "Open" ? <OpenIssueSVG /> : <ClosedIssueSVG />}
              <ItemTitle>{item.title}</ItemTitle>
            </IconAndText>
            <CommentsCounter num={item.comments.totalCount} />
          </HorizontalContainer>
          {item.labels.nodes.map((label) => (
            <IssueLabel
              name={label.name}
              color={label.color}
              key={label.name}
            />
          ))}
        </StyledLink>
      </Link>
    </Item>
  );
}

const StyledLabel = styled.div<{ $bg: string }>`
  display: inline-block;
  padding: 0 7px;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  white-space: nowrap;
  border: 1px solid transparent;
  border-radius: 2em;
  background: #${(p) => p.$bg};
  margin-right: 5px;
  &:last-of-type {
    margin-right: 0;
  }
`;
function IssueLabel({ color, name }: { color: string; name: string }) {
  return <StyledLabel $bg={color}>{name}</StyledLabel>;
}

function CommentsCounter({ num }: { num: number }) {
  return (
    <IconAndText>
      <CommentSVG />
      <span>{num}</span>
    </IconAndText>
  );
}

function CommentSVG() {
  return (
    <svg
      aria-hidden="true"
      height="16"
      viewBox="0 0 16 16"
      version="1.1"
      width="16"
      data-view-component="true"
    >
      <path d="M1 2.75C1 1.784 1.784 1 2.75 1h10.5c.966 0 1.75.784 1.75 1.75v7.5A1.75 1.75 0 0 1 13.25 12H9.06l-2.573 2.573A1.458 1.458 0 0 1 4 13.543V12H2.75A1.75 1.75 0 0 1 1 10.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h2a.75.75 0 0 1 .75.75v2.19l2.72-2.72a.749.749 0 0 1 .53-.22h4.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
    </svg>
  );
}

function OpenIssueSVG() {
  return (
    <svg
      viewBox="0 0 16 16"
      version="1.1"
      width="16"
      height="16"
      aria-hidden="true"
      fill="#1a7f37"
    >
      <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
      <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path>
    </svg>
  );
}

function ClosedIssueSVG() {
  return (
    <svg
      viewBox="0 0 16 16"
      version="1.1"
      width="16"
      height="16"
      aria-hidden="true"
      fill="#8250df"
    >
      <path d="M11.28 6.78a.75.75 0 0 0-1.06-1.06L7.25 8.69 5.78 7.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l3.5-3.5Z"></path>
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0Zm-1.5 0a6.5 6.5 0 1 0-13 0 6.5 6.5 0 0 0 13 0Z"></path>
    </svg>
  );
}
