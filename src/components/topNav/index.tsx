import { FC, useState, useEffect } from 'react';
import { faUser, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { DropDownItemType } from './types';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
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
  LoginCreateAccountButton
} from './styled';

export const TopNav: FC = () => {
  const isLoggedInUser = true;
  // eslint-disable-next-line
  const [ userData, setUserData ] = useState({
    firstName: "",
    lastName: "",
    profile_picture: ""
  });

  // @TODO - utilize redux to get user data and logged in state in order to display variations of the navbar
  // @TODO - utilize redux to get users signed in status
  // @TODO - useEffect hook to setUserData

  useEffect(() => {
    setUserData({
      firstName: "Testy",
      lastName: "Testerson",
      profile_picture: "../../assets/img/profile.png"
    });
  }, []);

  const history = useHistory();

  const DropdownItem: DropDownItemType = ({ linkText, testid }) => (
    <NavDropdownItem data-testid={ `${testid}DropdownItem` } eventKey={testid}>
      { linkText }
    </NavDropdownItem>
  );

  const onDropdownItemSelect = (eventKey: string) => {
    switch (eventKey) {
      case "profile":
        history.push('/users/profile');
        break;

      case "changePassword":
        history.push("/auth/change-password");
        break;

      case "signOut":
        // @TODO call signout method via redux
        // eslint-disable-next-line
        console.log("SIGNOUT CLICKED");
        break;

      default:
        break;
    }
  };

  return (
    <TopNavbar data-testid="topNavbar" onSelect={onDropdownItemSelect} >
      <NavContainerLeft data-testid="navContainerLeft">
        <TopNavLogo data-testid="navLogo" src={ logo } alt="Bitwise Technology Consulting" />
        <DirectoryLink data-testid="directoryLink" to="/content/agent-list">
          <NavIcon icon={ faStethoscope } />
          <span data-testid="directoryLinkText">Directory</span>
        </DirectoryLink>
      </NavContainerLeft>
      <NavContainerRight data-testid="navContainerRight">
        {
          isLoggedInUser && (
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
                    alt="Placeholder Portrait"
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
          !isLoggedInUser && (
            <LoginCreateAccountButton
              to="/auth/login"
              data-testid="loginCreateAccountLink"
            >
              LOGIN/CREATE ACCOUNT
            </LoginCreateAccountButton>
          )
        }
      </NavContainerRight>
    </TopNavbar>
  );
};