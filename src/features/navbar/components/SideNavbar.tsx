import { useAuth } from 'features/auth/hooks';
import { FC } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';
import { useLogoutModal } from '../hooks/useLogoutModal';
import { useNavLinks } from '../hooks/useNavLinks';
import { CustomNavAction, CustomNavLink } from './CustomNavLink';
import { Logo } from './Logo';
import { NavUserDetails } from './SettingsDropdown';

type Props = {
};

const BitwiseNavbar = styled(Navbar)`
  background: ${props => props.theme.nav.backgroundColor};
  align-items: flex-start;
  padding: 2rem;
  position: fixed;
  overflow-y: auto;
  width: 280px;
  height: 100vh;
  z-index: 1;
  box-shadow: 1px 0 0 0 #dadada;

  .navbar-brand > img {
    width: 64px;
    margin-left: 1rem;
    margin-bottom: 2rem;
    margin-top: 2rem;
    opacity: 0.9;
    border-radius: 12px;
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

export const SideNavbar: FC<Props> = () => {
  const { user } = useAuth();
  const navLinks = useNavLinks();
  const { openLogoutModal } = useLogoutModal();

  return (
    <BitwiseNavbar className='flex-column h-100 py-0'>
      <Logo />
      {user ? (
        <div className='nav-wrap w-100'>
          <Nav className='flex-column'>
            {navLinks.map(link => (
              <CustomNavLink key={link.id} link={link} />
            ))}
          </Nav>
          <Nav className='flex-column'>
            <NavUserDetails user={user} />  
            <CustomNavAction onClick={openLogoutModal} label='Sign Out' icon='sign-out-alt' />
          </Nav>
        </div>
      ) : (
        <></>
      )}
    </BitwiseNavbar>
  );
};
