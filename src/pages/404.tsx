import Link from "next/link";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0 1rem;
`;
const RelativeContainer = styled.div`
  position: relative;
`;

const Title = styled.h1`
  font-size: 9rem;
  font-weight: 800;
  color: var(--color-accent);
  letter-spacing: 0.1em;
  margin: 0;
`;

const Label = styled.div`
  background-color: var(--color-secondary);
  color: var(--color-primary);
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  border-radius: 0.25rem;
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translate(-50%) rotate(-12deg);
`;

const Message = styled.div`
  margin-top: 2rem;
  text-align: center;
`;

const Heading = styled.p`
  font-size: 1.5rem;
  font-weight: 300;
  margin: 0;
`;

const Subheading = styled.p`
  margin-top: 0.5rem;
`;

const StyledLink = styled(Link)`
  margin-top: 3rem;
  background-color: var(--color-secondary);
  color: var(--color-primary);
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--color-accent);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px var(--color-accent);
  }
`;

export default function NotFound() {
  return (
    <Container>
      <RelativeContainer>
        <Label>Page Not Found</Label>
        <Title>404</Title>
      </RelativeContainer>
      <Message>
        <Heading>
          Oops! The page you&apos;re looking for doesn&apos;t exist.
        </Heading>
        <Subheading>It might have been moved or deleted.</Subheading>
      </Message>
      <StyledLink href="/">Return Home</StyledLink>
    </Container>
  );
}
