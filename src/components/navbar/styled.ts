import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/img/logo.png';

export const NavBarWrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-area: (3, 1fr);
  justify-items: center;
  background-color: ${(props) => props.theme.navBackground};
`;

export const NavLogo = styled.img`
  background-image: url(${logo});
  margin-top: 10px;
  grid-row-start: 1;
`;
export const NavLinkWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
