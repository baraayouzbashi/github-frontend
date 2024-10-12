import { useState } from "react";
import styled from "styled-components";
import { GetRepositoryIssuesQuery } from "@/gql-client/__generated__/graphql";
import IssueListItem from "@/components/List/IssueListItem";
import List from "@/components/List";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 92px;
  color: var(--color-secondary);
  margin-bottom: 1rem;
`;

const Description = styled.p`
  font-size: 1.1rem;
  margin-bottom: 2rem;
  line-height: 1.5;
`;

const SearchBar = styled.input`
  width: 100%;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid var(--color-primary);
  border-radius: 4px;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out;

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px var(--color-accent);
  }
`;

interface Props {
  data: GetRepositoryIssuesQuery;
}
export default function IndexPage({ data }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  if (!data.repository) {
    return <div>Loading ... </div>;
  }
  const items = data.repository.issues.nodes || [];
  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Title>{data.repository.name}</Title>
      <Description>{data.repository.description}</Description>
      <SearchBar
        type="text"
        placeholder="Search issues..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Search issues"
      />
      <List>
        {filteredItems.map((item) => (
          <IssueListItem item={item} key={item.title} />
        ))}
      </List>
    </Container>
  );
}
