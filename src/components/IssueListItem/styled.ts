import styled from "styled-components";
const Item = styled.div`
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
  align-items: center;
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
  align-items: center;
`;

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

export {
  HorizontalContainer,
  IconAndText,
  Item,
  ItemTitle,
  StyledLink,
  StyledLabel,
};
