import { Footer } from 'common/components/Footer';
import { BitwiseNavbar } from 'features/navbar';
import { FC, ReactNode, useState } from 'react';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import styled from 'styled-components';

export const Body = styled.div`
  display: flex;
  flex: 1;
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
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <Body>
        <Nav>
          <BitwiseNavbar className='d-none d-md-flex'>
            <Nav className='flex-column'>
              <Nav.Link href='#features'>Features</Nav.Link>
              <Nav.Link href='#pricing'>Pricing</Nav.Link>
              <Nav.Link href='#action'>Action</Nav.Link>
            </Nav>
          </BitwiseNavbar>
          <Navbar bg='light' expand={false} className='d-flex d-md-none'>
            <Navbar.Toggle aria-controls='offcanvasNavbar' className='ms-auto' onClick={handleShow} />
            <Navbar.Offcanvas id='offcanvasNavbar' aria-labelledby='offcanvasNavbarLabel' placement='start'>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id='offcanvasNavbarLabel'>Offcanvas</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className='justify-content-end flex-grow-1 pe-3'>
                  <Nav.Link href='#features'>Features</Nav.Link>
                  <Nav.Link href='#pricing'>Pricing</Nav.Link>
                  <Nav.Link href='#action'>Action</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Navbar>
          {leftAside}
        </Nav>
        <Content>{children}</Content>
        {rightAside && <Aside>{rightAside}</Aside>}
      </Body>
      <Footer>{footer ?? <Footer />}</Footer>
    </Container>
  );
};
