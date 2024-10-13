import Link from "next/link";
import { IssueState } from "@/gql-client/__generated__/graphql";
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
  item: any; // eslint-disable-line
}

export default function IssueListItem({ item }: Props) {
  if (item === null) {
    return;
  }
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
          {
            // eslint-disable-next-line
            item.labels?.nodes?.map((label: any) => {
              if (label === null) return null;
              return (
                <IssueLabel
                  name={label.name}
                  color={label.color}
                  key={label.name}
                />
              );
            })
          }
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
