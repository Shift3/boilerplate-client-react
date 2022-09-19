import { FooterContent } from 'common/components/FooterContent';
import { BitwiseNavbar } from 'features/navbar/components/BitwiseNavbar';
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
  margin-top: calc(40px + 1rem);
`;

const Footer = styled.footer`
  padding-top: 5px;
  text-align: center;
  color: ${props => props.theme.footer.textColor};
  height: ${props => props.theme.footer.height};
`;

export const Layout: FC<PropsWithChildren<unknown>> = ({ children }) => {
  return (
    <Container>
      <Header>
        <BitwiseNavbar />
      </Header>
      <Content>
        <div className='d-flex flex-column w-100 pt-4'>
          <Main className='content-wrapper'>{children}</Main>
          <Footer className='mt-auto'>
            <FooterContent />
          </Footer>
        </div>
      </Content>
    </Container>
  );
};
