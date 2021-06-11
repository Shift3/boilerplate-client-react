import styled from 'styled-components';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'react-bootstrap/Button';
import { NavLink } from 'react-router-dom';

export const NavWrapper = styled(Nav)`
    padding: 8px 16px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: ${(props) => props.theme.topNavHeight}
`;

export const TopNavLogo = styled.img`
    height: ${(props) => `calc(${props.theme.topNavHeight} - 20px)`};
`;

export const DirectoryLink = styled(NavLink)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const DropDownButton = styled(Button)`
    background-color: rgba(0, 0, 0, 0);
    border-color: rgba(0, 0, 0, 0);

    &:active {
        background-color: rgba(0, 0, 0, 0) !important;
        border-color: #175f6e !important;
    }

    &:focus {
        background-color: rgba(0, 0, 0, 0);
        border-color: rgba(0, 0, 0, 0);
    }

    &:hover {
        background-color: rgba(0, 0, 0, 0);
        border-color: rgba(0, 0, 0, 0);
    }
    

`;

export const CustomNavDropdown = styled(NavDropdown)`
    & a {
        color: #175f6e
    }

    & .dropdown-menu {
        display: flex;
        align-items: center;

        & a {
            color: #000;
        }

        & .dropdown-item > a:hover {
            background-color: rgba(0, 0, 0, 0);
            text-decoration: none;
        }
    }
`;

export const DropDownContainerLeft = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 10px;
    text-align: center;
`;

export const ProfilePhoto = styled.img`
    border-radius: 50%;
    max-height: 50px;
    max-width: 50px;
    width: auto;
    height: auto;
`;

export const DropDownContainerRight = styled.div`
    display: flex; 
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

export const VerticalLine = styled.span`
    display: inline-block;
    border-left: 1px solid #d3d3d3;
    margin: 0 20px;
    height: 125px;
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

export const UserIcon = styled(FontAwesomeIcon)`
    color: #175f6e
`;

export const StethoscopeIcon = styled(FontAwesomeIcon)`
    color: #175f6e
`;