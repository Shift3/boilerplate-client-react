import { faUser, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { DropDownItemType, TopNavType } from './types';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import { CustomButton } from '../button/styled';
import placeholder_portrait from '../../assets/img/portrait_placeholder.png';
import {
  TopNavbar,
  DropdownContainerLeft,
  DropdownContainerRight,
  VerticalLine,
  NavContainerLeft,
  NavContainerRight,
  Dropdown,
  ProfilePhoto,
  NavIcon,
  TopNavLogo,
  DropdownButton,
  DirectoryLink,
  NavDropdownItem,
} from './styled';

export const TopNav: TopNavType = ({ userData, signOut }) => {
  const history = useHistory();

  const DropdownItem: DropDownItemType = ({ linkText, testid }) => (
    <NavDropdownItem data-testid={ `${testid}DropdownItem` } eventKey={testid}>
      { linkText }
    </NavDropdownItem>
  );

  const onDropdownItemSelect = (eventKey: string) => {
    if (eventKey === "profile") history.push("/users/profile");
    if (eventKey === "changePassword") history.push("/auth/change-password");
    if (eventKey === "signOut") signOut();
  };

  return (
    <TopNavbar data-testid="topNavbar" onSelect={onDropdownItemSelect} >
      <NavContainerLeft data-testid="navContainerLeft">
        <TopNavLogo data-testid="navLogo" src={ logo } alt="Bitwise Technology Consulting" />
        {
          userData && (
            <DirectoryLink data-testid="directoryLink" to="/content/agent-list">
              <NavIcon icon={ faStethoscope } />
              <span data-testid="directoryLinkText">Directory</span>
            </DirectoryLink>
          )
        }
      </NavContainerLeft>
      <NavContainerRight data-testid="navContainerRight">
        {
          userData && (
            <DropdownButton data-testid="dropdownButton">
              <NavIcon icon={ faUser } />
              <Dropdown
                title={ `Hi ${ userData?.firstName }` }
                id="topNavDropdown"
                data-testid="navDropdown"
              >
                <DropdownContainerLeft data-testid="dropdownContainerLeft">
                  <ProfilePhoto
                    data-testid="profilePhoto"
                    src={ userData?.profile_picture ?? placeholder_portrait }
                    alt="Profile Photo"
                  />
                  { `${ userData?.firstName } ${ userData?.lastName }` }
                </DropdownContainerLeft>
                <VerticalLine data-testid="verticalLine"/>
                <DropdownContainerRight data-testid="dropdownContainerRight">
                  <DropdownItem linkText="Profile" testid="profile" />
                  <DropdownItem linkText="Change Password" testid="changePassword" />
                  <DropdownItem linkText="Sign Out" testid="signOut" />
                </DropdownContainerRight>
              </Dropdown>
            </DropdownButton>
          )
        }
        {
          !userData && (
            <CustomButton
              onClick={() => history.push('/auth/login')}
              data-testid="loginCreateAccountButton"
            >
              LOGIN/CREATE ACCOUNT
            </CustomButton>
          )
        }
      </NavContainerRight>
    </TopNavbar>
  );
};