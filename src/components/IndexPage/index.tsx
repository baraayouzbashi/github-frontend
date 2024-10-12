import { useEffect, useState } from "react";
import styled from "styled-components";
import { GetRepositoryIssuesQuery } from "@/gql-client/__generated__/graphql";
import IssueListItem from "@/components/List/IssueListItem";
import List from "@/components/List";
import Switch from "@/components/ui/Switch";
import { useRouter } from "next/router";

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

const SearchBar = styled.input`
  flex-grow: 1;
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

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  > * {
    flex-shrink: 0;
  }
  margin-bottom: 2rem;
  @media (min-width: 786px) {
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    margin-bottom: 0;
  }
`;
const StyledLabel = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
const StyledMessage = styled.p`
  margin-top: 2rem;
  text-align: center;
`;

interface Props {
  data: GetRepositoryIssuesQuery["repository"]["issues"]["nodes"];
}
export default function IndexPage({ data }: Props) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(
    (router.query?.search as string) || ""
  );
  const [showOpenIssues, setShowOpenIssues] = useState<boolean>(
    Boolean(router.query?.isOpen)
  );
  useEffect(() => {
    const q = { ...router.query };
    if (showOpenIssues) {
      q["isOpen"] = "1";
    } else {
      delete q["isOpen"];
    }
    router.push({
      pathname: "/",
      query: q,
    });
  }, [showOpenIssues]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const q = { ...router.query };
    const cleanedSearch = searchTerm.trim();
    if (cleanedSearch.length) {
      q["search"] = cleanedSearch;
    } else {
      delete q["search"];
    }
    const timerId = setTimeout(() => {
      router.push({
        pathname: "/",
        query: q,
      });
    }, 300);
    return () => clearTimeout(timerId);
  }, [searchTerm]); // eslint-disable-line react-hooks/exhaustive-deps

  const items = data || [];

  return (
    <Container>
      <Title>facebook / react</Title>
      <SearchBarContainer>
        <SearchBar
          type="text"
          placeholder="Search issues..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          aria-label="Search issues"
        />
        <StyledLabel>
          Show open issues
          <Switch
            checked={showOpenIssues}
            onCheckedChange={() => setShowOpenIssues((prevState) => !prevState)}
          />
        </StyledLabel>
      </SearchBarContainer>
      {items.length ? (
        <List>
          {items.map((item) => (
            <IssueListItem item={item} key={item.id} />
          ))}
        </List>
      ) : (
        <StyledMessage>No results ..</StyledMessage>
      )}
    </Container>
  );
}
