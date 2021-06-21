import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import styleValues from 'utils/styleValues';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const { clear } = styleValues;

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

export const NavIcon = styled(FontAwesomeIcon)`
  color: #175f6e;
  font-size: 16px;
`;