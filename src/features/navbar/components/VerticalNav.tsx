import { useAuth } from 'features/auth/hooks';
import { FC } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import styled from 'styled-components';
import { useLogoutModal } from '../hooks/useLogoutModal';
import { useNavLinks } from '../hooks/useNavLinks';
import { CustomNavAction, CustomNavLink } from './CustomNavLink';
import { Logo } from './Logo';
import { NavUserDetails } from './NavUserDetails';
import Button from 'react-bootstrap/Button';
import i18n from '../../../i18n/config';

const changeLanguage = (ln: string) => {
  return () => {
    i18n.changeLanguage(ln);
  };
};

export const BitwiseNavbar = styled(Navbar)`
  background: ${props => props.theme.nav.backgroundColor};
  align-items: flex-start;
  padding: 2rem;
  overflow-y: auto;
  width: 280px;
  height: 100vh;
  z-index: 1;
  position: fixed;
  box-shadow: 1px 0 0 0 #dadada;

  .navbar-brand {
    padding-top: 0;
  }

  .navbar-brand > img {
    width: 64px;
    margin-left: 1rem;
    margin-bottom: 2rem;
    opacity: 0.9;
    margin-top: 1.5rem;
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

type Props = {
  closeVerticalNav?: () => void;
};

export const VerticalNav: FC<Props> = ({ closeVerticalNav }) => {
  const { user } = useAuth();
  const navLinks = useNavLinks();
  const { openLogoutModal } = useLogoutModal();

  return (
    <BitwiseNavbar className='flex-column py-0'>
      <Logo />

      {user ? (
        <div className='nav-wrap w-100'>
          <Nav className='flex-column'>
            {navLinks.map(link => (
              <CustomNavLink handleSamePathNavigate={closeVerticalNav} key={link.id} link={link} />
            ))}
          </Nav>
          <Nav className='flex-column'>
            <div className=''>
              <Button onClick={changeLanguage('en')}>En</Button>
              <Button onClick={changeLanguage('es')}>Es</Button>
            </div>
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
