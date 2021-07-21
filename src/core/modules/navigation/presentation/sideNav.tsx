// React imports
import { FC } from 'react';

// Third party library imports
import { Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';
import styled from 'styled-components';

// App imports
import { CustomButton } from 'components/button/styled';
import { useNavData } from '../application/useNavData';
import { ProfileDropdown } from './profileDropdown';
import { useLogoutModalManager } from '../application/useLogoutModalManager';
import { LogoutModal } from './logoutModal';
import { NavLogo } from './navLogo';
import { NavLink } from './navLink';

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
        <NavLogo />
      </FlexGrow>
      <FlexGrow proportion={2}>
        {userProfile ? (
          <>
            <Nav className='d-flex flex-column'>
              {navLinks
                .filter((link) => link.canUserActivate)
                .map((link) => (
                  <NavLink link={link} />
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
