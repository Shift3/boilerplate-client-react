import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';
import styleValues from '../../utils/styleValues';

const {
  topNavHeight,
  navLogoOffset,
  clear,
} = styleValues;

export const TopNavbar = styled(Nav)`
  padding: 8px 16px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: ${topNavHeight}
`;

export const TopNavLogo = styled.img`
  height: calc(${ topNavHeight } - ${ navLogoOffset });
`;

export const DirectoryLink = styled(NavLink)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & span {
    color: rgba(0, 0, 0, .5);
  }

  &:hover {
    text-decoration: none;

    & > span {
      color: rgba(0, 0, 0, .7);
    }
  }
`;

export const DropdownButton = styled(Button)`
  background-color: ${clear};
  border-color: ${clear};

  &:hover,
  &:focus,
  &:active {
      background-color: ${clear} !important;
  }

  &:active,
  &:focus {
    border-color: #175f6e;
  }

  &:focus,
  &:hover {
      border-color: ${clear};
  }
`;

export const Dropdown = styled(NavDropdown)`
  & a {
    color: rgba(0, 0, 0, .5);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    &:hover {
      color: rgba(0, 0, 0, .7);
    }
  }

  & .dropdown-menu {
    display: flex;
    align-items: center;

    & a {
      color: #000;
    }

    & .dropdown-item > a:hover {
      background-color: ${clear};
      text-decoration: none;
    }
  }
`;

export const NavDropdownItem = styled(NavDropdown.Item)`
 &:active, &:focus {
  background-color: rgba(233, 236, 239, 0);
 }

 &.dropdown-item.active, .dropdown-item:active {
    background-color: ${clear} !important;
  };
`;

export const DropdownContainerLeft = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

export const ProfilePhoto = styled.img`
  border-radius: 50%;
  max-height: 50px;
  max-width: 50px;
  width: auto;
  height: auto;
`;

export const DropdownContainerRight = styled.div`
  display: flex; 
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const VerticalLine = styled.span`
  margin: 0 20px;
  height: 125px;
  border-left: 1px solid #d3d3d3;
  display: inline-block;
`;

export const NavContainerLeft = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const NavContainerRight = styled.div`
  display: flex;
  align-items: center;
`;

export const NavIcon = styled(FontAwesomeIcon)`
  color: #175f6e;
  font-size: 16px;
export const LoginCreateAccountButton = styled(NavLink)`
`;