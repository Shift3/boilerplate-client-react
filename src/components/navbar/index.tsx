import { FC } from 'react';
import { NavBarWrapper, NavLinkStyled, NavLogoWrapper, NavLinkWrapper } from './styled';
// import logo from '../../assets/img/BTC.logo';

export const NavBar: FC = () => (
  <NavBarWrapper>
    <NavLogoWrapper>logo</NavLogoWrapper>
    <NavLinkWrapper>
      <NavLinkStyled to="/directory">Directory</NavLinkStyled>
      <NavLinkStyled to="/users">Users</NavLinkStyled>
      <NavLinkStyled to="/logout">Log Out</NavLinkStyled>
    </NavLinkWrapper>
  </NavBarWrapper>
);
