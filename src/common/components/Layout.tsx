import { FooterContent } from 'common/components/FooterContent';
import { HorizontalNav } from 'features/navbar/components/HorizontalSideNav';
import { VerticalNav } from 'features/navbar/components/VerticalNav';
import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${props => props.theme.backgroundColor};
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const Header = styled.header``;

export const Content = styled.div`
  display: flex;
  flex: row;
  flex-grow: 1;
`;

export const Main = styled.main`
  flex: 1;
  @media (min-width: 768px) {
    padding-left: 280px;
  }
`;

const Footer = styled.footer`
  padding-top: 5px;
  text-align: center;
  color: ${props => props.theme.footer.textColor};
  height: ${props => props.theme.footer.height};
  @media (min-width: 768px) {
    padding-left: 280px;
  }
`;

export const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <Container>
      <Header className='content-wrapper d-block d-md-none px-4'>
        <HorizontalNav />
      </Header>
      <Content>
        <aside className='d-none d-md-flex'>
          <VerticalNav />
        </aside>
        <div className='d-flex flex-column w-100 px-4 pt-4'>
          <Main className='content-wrapper'>{children}</Main>
          <Footer className='mt-auto'>
            <FooterContent />
          </Footer>
        </div>
      </Content>
    </Container>
  );
};
