import { FC } from 'react';
import { NavBarWrapper, NavLinkStyled, NavLogo, NavLinkWrapper } from './styled';
import logo from '../../assets/img/logo.png';

export const NavBar: FC = () => (
  <NavBarWrapper data-testid="nbw">
    <NavLogo data-testid="nl" src={logo} alt="Bitwise Technology Consulting" />
    <NavLinkWrapper data-testid="nlw">
      <NavLinkStyled data-testid="nls-d" to="/directory">Directory</NavLinkStyled>
      <NavLinkStyled data-testid="nls-u" to="/users">Users</NavLinkStyled>
      <NavLinkStyled data-testid="nls-l" to="/logout">Log Out</NavLinkStyled>
    </NavLinkWrapper>
  </NavBarWrapper>
);
