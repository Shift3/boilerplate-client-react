// React imports
import { FC } from 'react';

// Third party library imports
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

// App imports
import logo from 'assets/img/logo.png';
import { useNavData } from '../application/useNavLinks';
import { CustomButton } from 'components/button/styled';

const centeredFlexColumnStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CustomNavLink = styled(Nav.Link)`
  ${centeredFlexColumnStyle}
`;

const CustomNavDropdown = styled(NavDropdown)`
  .dropdown-toggle.nav-link {
    ${centeredFlexColumnStyle}
  }

  .dropdown-toggle.nav-link::after {
    margin: 0;
  }
`;

const CustomNavDropdownTitle: FC<{ name: string }> = ({ name }) => {
  return (
    <>
      <FontAwesomeIcon icon='user' />
      <span>Hi {name}</span>
    </>
  );
};

export const TopNav: FC = () => {
  const { authUser, navLinks } = useNavData();

  return (
    <Navbar collapseOnSelect expand='lg' className='shadow'>
      <Navbar.Brand href='/content/agent-list'>
        <img src={logo} alt='Bitwise Technology Consulting' width='160px' />
      </Navbar.Brand>
      {authUser ? (
        <>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto'>
              {navLinks
                .filter((link) => link.isActive)
                .map((link) => (
                  <CustomNavLink key={link.path} href={link.path}>
                    <FontAwesomeIcon icon={link.icon} />
                    <span>{link.label}</span>
                  </CustomNavLink>
                ))}
            </Nav>
            <Nav>
              <CustomNavDropdown
                id='top-nav-dropdown'
                title={<CustomNavDropdownTitle name={authUser.firstName} />}
                alignRight
              >
                <NavDropdown.Item href='/user/profile'>Profile</NavDropdown.Item>
                <NavDropdown.Item href='/user/change-password'>Change Password</NavDropdown.Item>
                <NavDropdown.Item>Toggle Navigation Bar</NavDropdown.Item>
                <NavDropdown.Item>Sign Out</NavDropdown.Item>
              </CustomNavDropdown>
            </Nav>
          </Navbar.Collapse>
        </>
      ) : (
        <Nav className='ml-auto'>
          <Link to='/auth/login'>
            <CustomButton>LOGIN/CREATE ACCOUNT</CustomButton>
          </Link>
        </Nav>
      )}
    </Navbar>
  );
};
