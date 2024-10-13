import { useEffect, useState } from "react";
import {
  Container,
  SearchBar,
  SearchBarContainer,
  StyledLabel,
  StyledMessage,
  Title,
} from "./styled";
import { IssueState } from "@/gql-client/__generated__/graphql";
import IssueListItem from "@/components/IssueListItem";
import Switch from "@/components/common/Switch";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { SearchIssuesByTitleOrBody } from "@/gql-client/queries/searchIssuesByTitleOrBody";

export default function IndexPage() {
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

  const issueState =
    router.query.isOpen == "1" ? IssueState.Open : IssueState.Closed;

  const { loading, error, data } = useQuery(SearchIssuesByTitleOrBody, {
    variables: {
      query: `repo:facebook/react in:title in:body is:${issueState} ${router.query.search}`,
      numResults: 20,
    },
  });

  if (error) {
    return <p>Oops.. an error happened</p>;
  }

  const items =
    data?.search?.edges
      ?.map((e) => {
        if (e) {
          return e.node;
        }
        return null;
      })
      .filter((e) => e?.__typename === "Issue") || [];

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
      {!loading &&
        items.length > 0 &&
        //eslint-disable-next-line
        items.map((item: any) => {
          if (!item) return null;
          return <IssueListItem item={item} key={item.id} />;
        })}
      {!loading && items.length == 0 && (
        <StyledMessage>No results ..</StyledMessage>
      )}
      {loading && <StyledMessage>Loading ..</StyledMessage>}
    </Container>
  );
}
