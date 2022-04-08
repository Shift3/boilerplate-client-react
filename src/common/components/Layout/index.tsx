import { Footer } from 'common/components/Footer';
import { SideNavbar } from 'features/navbar';
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  border: 4px solid red;
`;
export const Body = styled.div`
  display: flex;
  flex: 1;
  border: 3px solid green;
`;
export const Content = styled.main`
  flex: 1;
  border: solid 5px solid black;
`;
export const Nav = styled.nav`
  flex: auto;
  order: -1;
  border: solid 3px blue;
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
        <Content>{children}</Content>
        <Nav>
          <SideNavbar />
          {leftAside}
        </Nav>
        {rightAside && <Aside>{rightAside}</Aside>}
      </Body>
      <Footer>{footer ?? <Footer />}</Footer>
    </Container>
  );
};
