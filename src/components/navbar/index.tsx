import { FC } from 'react';
import { NavBarWrapper, NavLinkStyled, NavLogo, NavLinkWrapper } from './styled';

export const NavBar: FC = () => (
  <NavBarWrapper>
    <NavLogo />
    <NavLinkWrapper>
      <NavLinkStyled to="/directory">Directory</NavLinkStyled>
      <NavLinkStyled to="/users">Users</NavLinkStyled>
      <NavLinkStyled to="/logout">Log Out</NavLinkStyled>
    </NavLinkWrapper>
  </NavBarWrapper>
);
