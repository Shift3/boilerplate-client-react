// React imports
import { FC } from 'react';

// Third party library imports
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

// App imports
import logo from 'assets/img/logo.png';
import { CustomButton } from 'components/button/styled';
import { useNavData } from '../application/useNavData';
import { ProfileDropdown } from './profileDropdown';
import { useLogoutModalManager } from '../application/useLogoutModalManager';
import { LogoutModal } from './logoutModal';

interface IFlexGrowProps {
  proportion: number;
}

const FlexGrow = styled.div<IFlexGrowProps>`
  flex-grow: ${(props) => props.proportion};
`;

export const SideNav: FC = () => {
  const { userProfile, navLinks } = useNavData();
  const { show, openModal, onCancel, onLogout } = useLogoutModalManager();

  return (
    <Navbar className='d-flex flex-column h-100 shadow'>
      <FlexGrow proportion={1}>
        <Navbar.Brand as={Link} to='/content/agent-list'>
          <img src={logo} alt='Bitwise Technology Consulting' width='160px' />
        </Navbar.Brand>
      </FlexGrow>
      <FlexGrow proportion={2}>
        {userProfile ? (
          <>
            <Nav className='d-flex flex-column'>
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
      </FlexGrow>
    </Navbar>
  );
};
