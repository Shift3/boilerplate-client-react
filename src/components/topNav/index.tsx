import { FC } from 'react';
import { ThemeProvider } from 'styled-components';
import NavDropdown from "react-bootstrap/NavDropdown";
import { DropDownItemType } from './types';
import { CustomButton, StandardButtonTheme } from '../button/styled';
import { NavLinkStyled, NavLogo } from '../navbar/styled';
import logo from '../../assets/img/logo.png';
import placeholder_portrait from '../../assets/img/portrait_placeholder.png';
import {
  NavWrapper,
  DropDownContentLeft,
  DropDownContentRight,
  VerticalLine,
  NavContainerLeft,
  NavContainerRight
} from './styled';

// @TODO - utilize redux to get user data and logged in state in order to display variations of the navbar

const mockUser = {
  firstName: "Testy",
  lastName: "Testerson"
};

const isLoggedIn = true;

const fullUserName = () => `${mockUser.firstName}  ${mockUser.lastName}`;

const NavDropDownItem: DropDownItemType = ({ linkText, pathname, testid }) => (
  <NavDropdown.Item data-testid={ `${testid}DropDownItem` }>
    <NavLinkStyled data-testid={ `${testid}Link` } to={ pathname }>
      { linkText }
    </NavLinkStyled>
  </NavDropdown.Item>
);

export const TopNav: FC = () => (
  <NavWrapper data-testid="navWrapper">
    <NavContainerLeft>
      <NavLogo src={ logo } alt="Bitwise Technology Consulting" />
      <button type="button" className="navLink">
        <span className="fa fa-stethoscope" />
      </button>
    </NavContainerLeft>
    <NavContainerRight>
      {
        isLoggedIn && (
          <CustomButton>
            <span className="fa fa-user"/>
            Hi { mockUser.firstName }
            <NavDropdown title="" id="test" data-testid="navDropdown" >
              <DropDownContentLeft>
                <img src={ placeholder_portrait } alt="Placeholder Portrait" />
                { fullUserName() }
              </DropDownContentLeft>
              <VerticalLine />
              <DropDownContentRight>
                <NavDropDownItem linkText="Profile" pathname="/user/profile" testid="profile" />
                <NavDropDownItem linkText="Change Password" pathname="/user/change-password" testid="changePassword" />
              </DropDownContentRight>
            </NavDropdown>
          </CustomButton>
        )
      }
      {
        !isLoggedIn && (
          <ThemeProvider theme={StandardButtonTheme}>
            <CustomButton data-testid="loginOrCreateAccountLink">
              LOGIN/CREATE ACCOUNT
            </CustomButton>
          </ThemeProvider>
        )
      }
    </NavContainerRight>
  </NavWrapper>
);