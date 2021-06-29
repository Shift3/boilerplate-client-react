import { FC } from 'react';
import { NavWrapper, NavLinkStyled, NavLogo, NavLinkWrapper } from './styled';
import logo from '../../assets/img/logo.png';
import { useLogout } from 'core/modules/auth/application/useLogout';

export const NavBar: FC = () => {
  const { logoutUser } = useLogout();

  return (
    <NavWrapper data-testid='navWrapper'>
      <NavLogo data-testid='navLogo' src={logo} alt='Bitwise Technology Consulting' />
      <NavLinkWrapper data-testid='navLinkWrapper'>
        <NavLinkStyled data-testid='directoryLink' to='/directory'>
          Directory
        </NavLinkStyled>
        <NavLinkStyled data-testid='usersLink' to='/users'>
          Users
        </NavLinkStyled>
        <NavLinkStyled data-testid='logoutLink' to='/auth/login' onClick={() => logoutUser()}>
          Log Out
        </NavLinkStyled>
      </NavLinkWrapper>
    </NavWrapper>
  );
};
