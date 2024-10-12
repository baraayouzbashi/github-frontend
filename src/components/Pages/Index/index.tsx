import { useEffect, useState } from "react";
import {
  StyledLabel,
  StyledMessage,
  SearchBarContainer,
  Container,
  Title,
  SearchBar,
} from "./styled";
import { GetRepositoryIssuesQuery } from "@/gql-client/__generated__/graphql";
import IssueListItem from "@/components/IssueListItem";
import Switch from "@/components/common/Switch";
import { useRouter } from "next/router";

interface Props {
  data: NonNullable<
    NonNullable<
      NonNullable<GetRepositoryIssuesQuery["repository"]>["issues"]
    >["nodes"]
  >;
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
        items.map((item) => {
          if (item === null) return null;
          return <IssueListItem item={item} key={item.id} />;
        })
      ) : (
        <StyledMessage>No results ..</StyledMessage>
      )}
    </Container>
  );
}
