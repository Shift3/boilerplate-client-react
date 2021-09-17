// React imports
import { FC } from 'react';

// Third party library imports
import { Link } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

// App imports
import { CustomButton } from 'components/button/styled';
import { ProfileDropdown } from './profileDropdown';
import { useNavData } from '../application/useNavData';
import { useLogoutModalManager } from '../application/useLogoutModalManager';
import { LogoutModal } from './logoutModal';
import { NavLogo } from './navLogo';
import { NavLink } from './navLink';
import { NavProps } from './types';

export const TopNav: FC<NavProps> = ({ onNavToggle }) => {
  const { userProfile, navLinks } = useNavData();
  const { show, openModal, onCancel, onLogout } = useLogoutModalManager();

  return (
    <Navbar collapseOnSelect expand='lg' className='shadow'>
      <NavLogo />
      {userProfile ? (
        <>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav'>
            <Nav className='mr-auto'>
              {navLinks
                .filter((link) => link.canUserActivate)
                .map((link) => (
                  <NavLink link={link} />
                ))}
            </Nav>
            <Nav>
              <ProfileDropdown profile={userProfile} onNavBarToggle={onNavToggle} onSignOut={openModal} alignRight />
              <LogoutModal show={show} onCancel={onCancel} onLogout={onLogout} />
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
