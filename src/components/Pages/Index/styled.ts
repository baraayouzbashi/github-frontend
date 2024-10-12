import styled from "styled-components";

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

export {
  Container,
  SearchBar,
  SearchBarContainer,
  StyledLabel,
  StyledMessage,
  Title,
};
