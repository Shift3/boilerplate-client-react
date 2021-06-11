import { FC } from 'react';
import { faUser, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { DropDownItemType } from './types';
import { CustomButton } from '../button/styled';
import { NavLinkStyled } from '../navbar/styled';
import logo from '../../assets/img/logo.png';
import placeholder_portrait from '../../assets/img/portrait_placeholder.png';
import {
  NavWrapper,
  DropDownContainerLeft,
  DropDownContainerRight,
  VerticalLine,
  NavContainerLeft,
  NavContainerRight,
  CustomNavDropdown,
  ProfilePhoto,
  UserIcon,
  StethoscopeIcon,
  TopNavLogo,
  DropDownButton,
  DirectoryLink
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
      <TopNavLogo src={ logo } alt="Bitwise Technology Consulting" />
      <DirectoryLink to="/content/agent-list">
        <StethoscopeIcon icon={ faStethoscope } />
        <span>Directory</span>
      </DirectoryLink>
    </NavContainerLeft>
    <NavContainerRight>
      {
        isLoggedIn && (
          <DropDownButton>
            <UserIcon icon={ faUser }/>
            <CustomNavDropdown
              title={ `Hi ${ mockUser.firstName }` }
              id="topNavDropdown"
              data-testid="navDropdown"
            >
              <DropDownContainerLeft>
                <ProfilePhoto src={ placeholder_portrait } alt="Placeholder Portrait" />
                { fullUserName() }
              </DropDownContainerLeft>
              <VerticalLine />
              <DropDownContainerRight>
                <NavDropDownItem linkText="Profile" pathname="/user/profile" testid="profile" />
                <NavDropDownItem linkText="Change Password" pathname="/user/change-password" testid="changePassword" />
              </DropDownContainerRight>
            </CustomNavDropdown>
          </DropDownButton>
        )
      }
      {
        !isLoggedIn && (
          <CustomButton data-testid="loginOrCreateAccountLink">
            LOGIN/CREATE ACCOUNT
          </CustomButton>
        )
      }
    </NavContainerRight>
  </NavWrapper>
);