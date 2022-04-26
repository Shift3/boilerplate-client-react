import { useAuth } from 'features/auth/hooks';
import { FC, useState } from 'react';
import { Container, Offcanvas } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';
import { useLogoutModal } from '../hooks/useLogoutModal';
import { useNavLinks } from '../hooks/useNavLinks';
import { CustomNavAction, CustomNavLink } from './CustomNavLink';
import { Logo } from './Logo';
import { NavUserDetails } from './NavUserDetails';

export const BitwiseNavbar = styled(Navbar)`
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

export const SideNavbar: FC = () => {
  const { user } = useAuth();
  const navLinks = useNavLinks();
  const { openLogoutModal } = useLogoutModal();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [show, setShow] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {user ? (
        <div>
          <Logo />
          <BitwiseNavbar className='d-none d-md-flex'>
            <Container fluid className='nav-wrap w-100'>
              <Nav className='flex-column'>
                {navLinks.map(link => (
                  <CustomNavLink key={link.id} link={link} />
                ))}
              </Nav>
              <Nav className='flex-column'>
                <NavUserDetails user={user} />
                <CustomNavAction onClick={openLogoutModal} label='Sign Out' icon='sign-out-alt' />
              </Nav>
            </Container>
          </BitwiseNavbar>
          <Navbar bg='light' expand={false} className='d-flex d-md-none'>
            <Container fluid className='flex-column'>
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
        </div>
      ) : (
        <></>
      )}
    </>
  );
};
