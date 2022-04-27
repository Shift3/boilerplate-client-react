import { FooterContent } from 'common/components/FooterContent';
import { OffCanvasSideNav } from 'features/navbar/components/OffCanvasSideNav';
import { VerticalSideNav } from 'features/navbar/components/VerticalSideNav';
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const Header = styled.header``;

export const Main = styled.div`
  display: flex;
  flex: row;
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

const Footer = styled.footer`
  padding-top: 5px;
  text-align: center;
  color: #999;
  height: ${props => props.theme.footer.height};
`;

type Props = {
  children?: ReactNode;
};

export const Layout: FC<Props> = ({ children }) => {
  return (
    <Container>
      <Header className='d-block d-md-none'>
        <OffCanvasSideNav />
      </Header>
      <Main>
        <Aside className='d-none d-md-flex'>
          <VerticalSideNav />
        </Aside>
        <Content>{children}</Content>
      </Main>
      <Footer className='mt-auto'>
        <FooterContent />
      </Footer>
    </Container>
  );
};
