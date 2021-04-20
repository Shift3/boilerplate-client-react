import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const NavBarWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`

export const NavLinkStyled = styled(NavLink)`
  text-align: center;
  &:hover {
    background-color: #4eb1b8;
  }
`
