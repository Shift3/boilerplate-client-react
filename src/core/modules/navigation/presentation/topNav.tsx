// React imports
import { FC } from 'react';

// Third party library imports
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

// App imports
import logo from 'assets/img/logo.png';
import { CustomButton } from 'components/button/styled';
import { ProfileDropdown } from './profileDropdown';
import { useNavData } from '../application/useNavData';

const centeredFlexColumnStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CustomNavLink = styled(Nav.Link)`
  ${centeredFlexColumnStyle}
`;

export const TopNav: FC = () => {
  const { userProfile, navLinks } = useNavData();

  return (
    <Navbar collapseOnSelect expand='lg' className='shadow'>
      <Navbar.Brand href='/content/agent-list'>
        <img src={logo} alt='Bitwise Technology Consulting' width='160px' />
      </Navbar.Brand>
      {userProfile ? (
        <>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto'>
              {navLinks
                .filter((link) => link.canUserActivate)
                .map((link) => (
                  <CustomNavLink key={link.path} href={link.path}>
                    <FontAwesomeIcon icon={link.icon} />
                    <span>{link.label}</span>
                  </CustomNavLink>
                ))}
            </Nav>
            <Nav>
              <ProfileDropdown profile={userProfile} />
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
