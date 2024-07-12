import { ReactNode } from 'react';
import styled from 'styled-components';

interface IHeaderProps {
  title: string;
  icon?: ReactNode;
}
const Container = styled.header`
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Icon = styled.div`
  color: ${(props) => props.theme.accentColor};
  margin-right: 1rem;
  font-size: 48px;
`;
const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 48px;
  letter-spacing: 0.5rem;
`;
export default function Header({ title, icon }: IHeaderProps) {
  return (
    <Container>
      <Icon>{icon}</Icon>
      <Title>{title.toUpperCase()}</Title>
    </Container>
  );
}
