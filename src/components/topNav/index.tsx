import { FC, useState } from 'react';
import { faUser, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { DropDownItemType } from './types';
import { CustomButton } from '../button/styled';
import { useHistory } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import placeholder_portrait from '../../assets/img/portrait_placeholder.png';
import {
  Navbar,
  DropDownContainerLeft,
  DropDownContainerRight,
  VerticalLine,
  NavContainerLeft,
  NavContainerRight,
  Dropdown,
  ProfilePhoto,
  NavIcon,
  TopNavLogo,
  DropDownButton,
  DirectoryLink,
  NavDropdownItem
} from './styled';

export const TopNav: FC = () => {
  // eslint-disable-next-line
  const [ { firstName, lastName, isLoggedIn }, setUserData ] = useState({
    firstName: "Testy",
    lastName: "Testerson",
    isLoggedIn: true,
  });

  // @TODO - utilize redux to get user data and logged in state in order to display variations of the navbar
  // @TODO - utilize redux to get users signed in status
  // @TODO - useEffect hook to setUserData

  const history = useHistory();

  const DropdownItem: DropDownItemType = ({ linkText, testid }) => (
    <NavDropdownItem data-testid={ `${testid}DropDownItem` } eventKey={testid}>
      { linkText }
    </NavDropdownItem>
  );

  const onDropdownItemSelect = (eventKey: string) => {
    switch (eventKey) {
      case "profile":
        history.push('/users/profile');
        break;

      case "changePassword":
        history.push("/");
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
    <Navbar data-testid="navWrapper" onSelect={onDropdownItemSelect} >
      <NavContainerLeft>
        <TopNavLogo src={ logo } alt="Bitwise Technology Consulting" />
        <DirectoryLink to="/content/agent-list">
          <NavIcon icon={ faStethoscope } />
          <span>Directory</span>
        </DirectoryLink>
      </NavContainerLeft>
      <NavContainerRight>
        {
          isLoggedIn ?
            (
              <DropDownButton>
                <NavIcon icon={ faUser }/>
                <Dropdown
                  title={ `Hi ${ firstName }` }
                  id="topNavDropdown"
                  data-testid="navDropdown"
                >
                  <DropDownContainerLeft>
                    <ProfilePhoto src={ placeholder_portrait } alt="Placeholder Portrait" />
                    { `${firstName} ${lastName}` }
                  </DropDownContainerLeft>
                  <VerticalLine />
                  <DropDownContainerRight>
                    <DropdownItem linkText="Profile" testid="profile" />
                    <DropdownItem linkText="Change Password" testid="changePassword" />
                    <DropdownItem linkText="Sign Out" testid="signOut" />
                  </DropDownContainerRight>
                </Dropdown>
              </DropDownButton>
            )
            : (
              <CustomButton data-testid="loginOrCreateAccountLink">
                LOGIN/CREATE ACCOUNT
              </CustomButton>
            )
        }
      </NavContainerRight>
    </Navbar>
  );
};