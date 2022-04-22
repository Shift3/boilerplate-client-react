import { Footer } from 'common/components/Footer';
import { useNavLinks } from 'features/navbar';
import { FC, ReactNode, useState } from 'react';
import { Container, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import styled from 'styled-components';
import { CustomNavAction, CustomNavLink } from '../../../features/navbar/components/CustomNavLink';
import { Logo } from '../../../features/navbar/components/Logo';
import { useLogoutModal } from '../../../features/navbar/hooks/useLogoutModal';

const SideNav = styled(Navbar)`
  background: ${props => props.theme.nav.backgroundColor};
  align-items: flex-start;
  padding: 2rem;
  overflow-y: auto;
  width: 280px;
  height: 100vh;
  z-index: 1;
  box-shadow: 1px 0 0 0 #dadada;

  .navbar-brand > img {
    width: 64px;
    margin-left: 4rem;
    margin-bottom: 2rem;
    margin-top: 2rem;
    opacity: 0.9;
    border-radius: 10px;
  }

  .nav-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;

    .navbar-nav:first-of-type {
      flex: 1;
    }

    .navbar-nav:nth-of-type(2) {
      margin-bottom: 1rem;
    }
  }
`;

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [show, setShow] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navLinks = useNavLinks();
  const { openLogoutModal } = useLogoutModal();

  return (
    <>
      <Body>
        <Nav>
          <SideNav className='d-none d-md-flex flex-column'>
            <Logo />
            <div className='nav-wrap w-100'>
              <Nav className='flex-column'>
                {navLinks.map(link => (
                  <CustomNavLink key={link.id} link={link} />
                ))}
              </Nav>
              <Nav className='flex-column'>
                {/* <NavUserDetails user={user} /> */}
                <CustomNavAction onClick={openLogoutModal} label='Sign Out' icon='sign-out-alt' />
              </Nav>
            </div>
          </SideNav>
          <Navbar bg='light' expand={false} className='d-flex d-md-none'>
            <Container fluid className='flex-column'>
              <Logo />
              <Navbar.Toggle aria-controls='offcanvasNavbar' className='ms-auto' onClick={handleShow} />
              <Navbar.Offcanvas id='offcanvasNavbar' aria-labelledby='offcanvasNavbarLabel' placement='start'>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id='offcanvasNavbarLabel'>
                    <Logo />
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className='justify-content-end flex-grow-1 pe-3'>
                    {navLinks.map(link => (
                      <CustomNavLink key={link.id} link={link} />
                    ))}
                  </Nav>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
          {leftAside}
        </Nav>
        <Content>{children}</Content>
        {rightAside && <Aside>{rightAside}</Aside>}
      </Body>
      <Footer>{footer ?? <Footer />}</Footer>
    </>
  );
};
