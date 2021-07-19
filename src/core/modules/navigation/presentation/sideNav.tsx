// React imports
import { FC } from 'react';

// Third party library imports
import { Nav, Navbar } from 'react-bootstrap';

// App imports
import logo from 'assets/img/logo.png';
import { useNavData } from '../application/useNavData';
import { Link } from 'react-router-dom';
import { CustomButton } from 'components/button/styled';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProfileDropdown } from './profileDropdown';
import { useLogoutModalManager } from '../application/useLogoutModalManager';
import { LogoutModal } from './logoutModal';

export const SideNav: FC = () => {
  const { userProfile, navLinks } = useNavData();
  const { show, openModal, onCancel, onLogout } = useLogoutModalManager();

  return (
    <Navbar className='flex-column shadow'>
      <Navbar.Brand href='/content/agent-list'>
        <img src={logo} alt='Bitwise Technology Consulting' width='160px' />
      </Navbar.Brand>
      {userProfile ? (
        <>
          <Nav className='flex-column'>
            {navLinks
              .filter((link) => link.canUserActivate)
              .map((link) => (
                <Nav.Link key={link.path} href={link.path}>
                  <FontAwesomeIcon icon={link.icon} />
                  <span>{link.label}</span>
                </Nav.Link>
              ))}
          </Nav>
          <Nav>
            <ProfileDropdown profile={userProfile} onSignOut={openModal} />
            <LogoutModal show={show} onCancel={onCancel} onLogout={onLogout} />
          </Nav>
        </>
      ) : (
        <Nav>
          <Link to='/auth/login'>
            <CustomButton>LOGIN/CREATE ACCOUNT</CustomButton>
          </Link>
        </Nav>
      )}
    </Navbar>
  );
};
