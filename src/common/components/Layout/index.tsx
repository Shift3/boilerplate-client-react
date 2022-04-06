import { Footer } from 'common/components/Footer';
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Main = styled.div``;
export const Left = styled.div``;
export const Content = styled.div``;
export const Right = styled.div``;

type Props = {
  leftAside?: ReactNode;
  children?: ReactNode;
  rightAside?: ReactNode;
  footer?: ReactNode;
};

export const Layout: FC<Props> = ({ leftAside, children, rightAside, footer }) => {
  return (
    <Container>
      <Main>
        <Left>Navbar</Left>
        <Content>Dashboard</Content>
        <Right>Empty</Right>
      </Main>
      <Footer />
    </Container>
  );
};
