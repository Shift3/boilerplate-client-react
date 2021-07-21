// React imports
import { FC } from 'react';

// Third party library imports
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

// App imports
import logo from 'assets/img/logo.png';
import { CustomButton } from 'components/button/styled';
import { ProfileDropdown } from './profileDropdown';
import { useNavData } from '../application/useNavData';
import { useLogoutModalManager } from '../application/useLogoutModalManager';
import { LogoutModal } from './logoutModal';

export const TopNav: FC = () => {
  const { userProfile, navLinks } = useNavData();
  const { show, openModal, onCancel, onLogout } = useLogoutModalManager();

  return (
    <Navbar collapseOnSelect expand='lg' className='shadow'>
      <Navbar.Brand as={Link} to='/content/agent-list'>
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
                  <Nav.Link key={link.path} as={Link} to={link.path}>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                      <FontAwesomeIcon icon={link.icon} />
                      <span>{link.label}</span>
                    </div>
                  </Nav.Link>
                ))}
            </Nav>
            <Nav>
              <ProfileDropdown profile={userProfile} onSignOut={openModal} alignRight />
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
