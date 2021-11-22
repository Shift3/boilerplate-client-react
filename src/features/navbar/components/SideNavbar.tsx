import { CustomButton } from 'features/auth/components/button/styled';
import { useAuth } from 'features/auth/hooks';
import { FC } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useLogoutModal } from '../hooks/useLogoutModal';
import { useNavLinks } from '../hooks/useNavLinks';
import { CustomNavLink } from './CustomNavLink';
import { Logo } from './Logo';
import { SettingsDropdown } from './SettingsDropdown';

const FlexGrow = styled.div<{ proportion: number }>`
  flex-grow: ${(props) => props.proportion};
`;

type Props = {
  onNavbarToggle: () => void;
};

export const SideNavbar: FC<Props> = ({ onNavbarToggle }) => {
  const { user } = useAuth();
  const navLinks = useNavLinks();
  const { LogoutModal, openLogoutModal } = useLogoutModal();

  return (
    <Navbar className='d-flex flex-column h-100 py-0 shadow'>
      <FlexGrow proportion={1}>
        <Logo />
      </FlexGrow>
      <FlexGrow proportion={2}>
        {user ? (
          <>
            <Nav className='d-flex flex-column'>
              {navLinks.map((link) => (
                <CustomNavLink key={link.id} link={link} />
              ))}
            </Nav>
            <Nav>
              <SettingsDropdown user={user} onNavbarToggle={onNavbarToggle} onSignOut={openLogoutModal} />
              <LogoutModal />
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
