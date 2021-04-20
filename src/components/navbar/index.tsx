import { FC } from 'react'
import { NavBarWrapper, NavLinkStyled, NavLogoWrapper, NavLinkWrapper } from './styled'

export const NavBar: FC = () => (
  <NavBarWrapper>
    <NavLogoWrapper>BTC Logo</NavLogoWrapper>
    <NavLinkWrapper>
      <NavLinkStyled to="/directory">Directory</NavLinkStyled>
      <NavLinkStyled to="/users">Users</NavLinkStyled>
      <NavLinkStyled to="/logout">Log Out</NavLinkStyled>
    </NavLinkWrapper>
  </NavBarWrapper>
)
