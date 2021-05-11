import { FC } from 'react';
import { NavBarWrapper, NavLinkStyled, NavLogo, NavLinkWrapper } from './styled';
import logo from '../../assets/img/logo.png';

export const NavBar: FC = () => (
  <NavBarWrapper>
    <NavLogo src={logo} alt="Bitwise Technology Consulting" />
    <NavLinkWrapper>
      <NavLinkStyled to="/directory">Directory</NavLinkStyled>
      <NavLinkStyled to="/users">Users</NavLinkStyled>
      <NavLinkStyled to="/logout">Log Out</NavLinkStyled>
    </NavLinkWrapper>
  </NavBarWrapper>
);
