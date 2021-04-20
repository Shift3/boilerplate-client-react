import { FC } from 'react'
import { NavBarWrapper, NavLinkStyled } from './styled'

export const NavBar: FC = () => (
  <NavBarWrapper>
    <NavLinkStyled to="/directory">Directory</NavLinkStyled>
    <NavLinkStyled to="/users">Users</NavLinkStyled>
    <NavLinkStyled to="/logout">Log Out</NavLinkStyled>
  </NavBarWrapper>
)
