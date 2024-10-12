import { ReactElement } from "react";
import styled from "styled-components";

const ItemList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
`;
interface Props {
  children: ReactElement | ReactElement[];
}
export default function List({ children }: Props) {
  return <ItemList>{children}</ItemList>;
}
