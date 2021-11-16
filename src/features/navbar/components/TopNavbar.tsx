import { CustomButton } from 'features/auth/components/button/styled';
import { useAuth } from 'features/auth/hooks';
import { FC } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useLogoutModal } from '../hooks/useLogoutModal';
import { useNavLinks } from '../hooks/useNavLinks';
import { CustomNavLink } from './CustomNavLink';
import { Logo } from './Logo';
import { SettingsDropdown } from './SettingsDropdown';

type Props = {
  onNavbarToggle: () => void;
};

export const TopNavbar: FC<Props> = ({ onNavbarToggle }) => {
  const { user } = useAuth();
  const navLinks = useNavLinks();
  const { LogoutModal, openLogoutModal } = useLogoutModal();

  return (
    <Navbar collapseOnSelect expand='lg' className='shadow px-3'>
      <Logo />
      {user ? (
        <>
          <Navbar.Toggle aria-controls='responsive-navbar-nav' />
          <Navbar.Collapse id='responsive-navbar-nav' className='justify-content-between'>
            <Nav>
              {navLinks.map((link) => (
                <CustomNavLink key={link.id} link={link} />
              ))}
            </Nav>
            <Nav>
              <SettingsDropdown user={user} onNavbarToggle={onNavbarToggle} onSignOut={openLogoutModal} alignRight />
              <LogoutModal />
            </Nav>
          </Navbar.Collapse>
        </>
      ) : (
        <Nav className='ms-auto'>
          <Link to='/auth/login'>
            <CustomButton>LOGIN/CREATE ACCOUNT</CustomButton>
          </Link>
        </Nav>
      )}
    </Navbar>
  );
};
