import styled from "styled-components";
import Link from "next/link";

const Item = styled.li`
  border-radius: 8px;
  padding: 2.5rem;
  background: var(--color-accent-light);
`;
const StyledLink = styled.a`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ItemTitle = styled.h2`
  font-size: 1.5rem;
  color: var(--color-accent);
`;

const ItemBody = styled.p`
  font-size: 1rem;
  line-height: 1.4;
  white-space: pre-line;
  max-height: 300px;
  overflow-y: auto;
  color: var(--color-secondary);
  padding: 1rem;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: var(--color-primary);
  }

  &::-webkit-scrollbar-thumb {
    background: var(--color-accent);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--color-accent);
  }
`;
interface Props {
  item: { title: string; body: string; id: string };
}

export default function IssueListItem({ item }: Props) {
  return (
    <Item>
      <Link href={`/issue/${item.id}`} passHref={true} legacyBehavior>
        <StyledLink>
          <ItemTitle>{item.title}</ItemTitle>
          <ItemBody>{item.body}</ItemBody>
        </StyledLink>
      </Link>
    </Item>
  );
}
