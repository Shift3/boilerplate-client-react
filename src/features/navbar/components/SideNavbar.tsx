import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from 'features/auth/hooks';
import { FC, useEffect, useState } from 'react';
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

const SidebarToggle = styled.div`
  display: flex;
  flex-direction: column;
  border: 2px solid green;
  size: 4rem;

  .icon {
  }
`;

export const SideNavbar: FC = () => {
  const { user } = useAuth();
  const navLinks = useNavLinks();
  const { openLogoutModal } = useLogoutModal();
  const [mobile, setMobile] = useState(false);
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    // const handleResize = () => {
    //   window.innerWidth < 1065 ? setMobile(true) : setMobile(false);
    // };
    const handleResize = () => {
      if (window.innerWidth < 1065) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <BitwiseNavbar className='flex-column h-100 py-0'>
      <Logo />
      {user && !mobile ? (
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
      {mobile && (
        <SidebarToggle>
          {sidebar ? (
            <span>
              <FontAwesomeIcon
                className='icon'
                icon={['far', 'xmark']}
                size='lg'
                onClick={() => setSidebar(!sidebar)}
              />
            </span>
          ) : (
            <span>
              <FontAwesomeIcon className='icon' icon={['far', 'bars']} onClick={() => setSidebar(!sidebar)} />
            </span>
          )}
        </SidebarToggle>
      )}
    </BitwiseNavbar>
  );
};
