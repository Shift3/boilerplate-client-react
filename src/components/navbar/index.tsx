import { FC } from 'react';
import { NavWrapper, NavLinkStyled, NavLogo, NavLinkWrapper } from './styled';
import logo from '../../assets/img/logo.png';

export const NavBar: FC = () => (
  <NavWrapper data-testid="navWrapper">
    <NavLogo data-testid="navLogo" src={logo} alt="Bitwise Technology Consulting" />
    <NavLinkWrapper data-testid="navLinkWrapper">
      <NavLinkStyled data-testid="directoryLink" to="/directory">Directory</NavLinkStyled>
      <NavLinkStyled data-testid="usersLink" to="/users">Users</NavLinkStyled>
      <NavLinkStyled data-testid="logoutLink" to="/logout">Log Out</NavLinkStyled>
    </NavLinkWrapper>
  </NavWrapper>
);
