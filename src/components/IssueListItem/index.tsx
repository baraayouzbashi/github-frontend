import Link from "next/link";
import {
  GetRepositoryIssuesQuery,
  IssueState,
} from "@/gql-client/__generated__/graphql";
import CommentSVG from "@/components/common/Icons/Comment";
import OpenIssueSVG from "@/components/common/Icons/OpenIssue";
import ClosedIssueSVG from "@/components/common/Icons/ClosedIssue";
import {
  Item,
  ItemTitle,
  IconAndText,
  HorizontalContainer,
  StyledLink,
  StyledLabel,
} from "./styled";

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
              {item.state === IssueState.Open ? (
                <OpenIssueSVG />
              ) : (
                <ClosedIssueSVG />
              )}
              <ItemTitle>{item.title}</ItemTitle>
            </IconAndText>
            <CommentsCounter num={item.comments?.totalCount} />
          </HorizontalContainer>
          {item.labels?.nodes?.map((label) => (
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
