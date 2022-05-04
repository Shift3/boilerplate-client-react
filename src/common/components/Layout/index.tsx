import { FooterContent } from 'common/components/FooterContent';
import { HorizontalNav } from 'features/navbar/components/HorizontalSideNav';
import { VerticalNav } from 'features/navbar/components/VerticalNav';
import { FC, ReactNode } from 'react';
import styled from 'styled-components';

export const Container = styled.div`
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
      <Header className='d-block d-md-none px-4'>
        <HorizontalNav />
      </Header>
      <Content>
        <aside className='d-none d-md-flex'>
          <VerticalNav />
        </aside>
        <div className='d-flex flex-column w-100 px-4 pt-4'>
          <Main>{children}</Main>
          <Footer className='mt-auto'>
            <FooterContent />
          </Footer>
        </div>
      </Content>
    </Container>
  );
};
