import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavWrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-area: 1fr 2fr;
  justify-items: center;
  background-color: ${(props) => props.theme.navBackground};
`;

export const NavLogo = styled.img`
  object-fit: contain;
  height: 14vh;
  width: 12vw;
  margin-top: 10px;
  grid-row-start: 1;
`;
export const NavLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
`;

export const NavLinkStyled = styled(NavLink)`
  align-self: center;
  color: ${(props) => props.theme.navLink};
  font-family: BlinkMacSystemFont;
  font-size: 1rem;
  padding: 5px;
  &:hover {
    background-color: #4eb1b8;
  }
`;
