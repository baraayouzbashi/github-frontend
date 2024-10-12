import { useState } from "react";
import styled from "styled-components";
import { GetRepositoryIssuesQuery } from "@/gql-client/__generated__/graphql";
import IssueListItem from "@/components/List/IssueListItem";
import List from "@/components/List";
import Switch from "@/components/ui/Switch";

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
`;

const Title = styled.h1`
  font-weight: bold;
  font-size: 3rem;
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
  border: 1px solid #d1d9e0;
  border-radius: 6px;
  background: #f6f8fa;
  box-shadow: inset 0 1px 0 0 #1f23280a;
  transition: box-shadow 0.3s ease-in-out;

  &:focus {
    outline: none;
    box-shadow: inset 0 0 0 1px #0969da;
  }
`;

interface Props {
  data: GetRepositoryIssuesQuery;
}
export default function IndexPage({ data }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [showOpenIssues, setShowOpenIssues] = useState<boolean>(false);
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
      <Title>
        {data.repository.owner.login} / {data.repository.name}
      </Title>
      <Switch
        checked={showOpenIssues}
        onCheckedChange={() => setShowOpenIssues((prevState) => !prevState)}
      />
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
