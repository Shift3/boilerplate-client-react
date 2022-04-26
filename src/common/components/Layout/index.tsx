import { Footer } from 'common/components/Footer';
import { SideNavbar } from 'features/navbar';
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

export const Body = styled.div`
  display: flex;
  flex: 1;
`;

export const Nav = styled.nav`
  order: -1;
`;

export const Content = styled.main`
  flex: 1;
  margin: 2em;
`;

export const Aside = styled.aside`
  flex: 0 0 12em;
`;

type Props = {
  leftAside?: ReactNode;
  children?: ReactNode;
  rightAside?: ReactNode;
  footer?: ReactNode;
};

export const Layout: FC<Props> = ({ leftAside, children, rightAside, footer }) => {
  return (
    <Container>
      <Body>
        <Nav>
          <SideNavbar>{leftAside}</SideNavbar>
        </Nav>
        <Content>{children}</Content>
        {rightAside && <Aside>{rightAside}</Aside>}
      </Body>
      <Footer>{footer ?? <Footer />}</Footer>
    </Container>
  );
};
