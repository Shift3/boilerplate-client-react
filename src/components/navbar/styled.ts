import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const NavBarWrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-area: (3, 1fr);
  justify-items: center;
`
export const NavLogoWrapper = styled.div`
  padding: 20px 20px 20px 20px;
`
export const NavLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export const NavLinkStyled = styled(NavLink)`
  text-align: center;
  &:hover {
    background-color: #4eb1b8;
  }
`
