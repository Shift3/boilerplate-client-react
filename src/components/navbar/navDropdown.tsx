import { faUser } from '@fortawesome/free-solid-svg-icons';
import { NavDropdownType, DropDownItemType } from "./types/navDropdown.types";
import placeholder_portrait from '../../assets/img/portrait_placeholder.png';
import {
  DropdownButton,
  Dropdown,
  NavIcon,
  NavDropdownItem,
  DropdownContainerLeft,
  ProfilePhoto,
  DropdownContainerRight,
  VerticalLine,
} from './styled/navDropdown.styled';

export const NavDropdown: NavDropdownType = ({ firstName, lastName, profile_picture }) => {
  const DropdownItem: DropDownItemType = ({ linkText, testid }) => (
    <NavDropdownItem data-testid={ `${testid}DropdownItem` } eventKey={testid}>
      { linkText }
    </NavDropdownItem>
  );

  return (
    <DropdownButton data-testid="dropdownButton">
      <NavIcon icon={ faUser } />
      <Dropdown
        title={ `Hi ${ firstName }` }
        id="topNavDropdown"
        data-testid="navDropdown"
      >
        <DropdownContainerLeft data-testid="dropdownContainerLeft">
          <ProfilePhoto
            data-testid="profilePhoto"
            src={ profile_picture ?? placeholder_portrait }
            alt="Profile Photo"
          />
          { `${ firstName } ${ lastName }` }
        </DropdownContainerLeft>
        <VerticalLine data-testid="verticalLine"/>
        <DropdownContainerRight data-testid="dropdownContainerRight">
          <DropdownItem linkText="Profile" testid="profile" />
          <DropdownItem linkText="Change Password" testid="changePassword" />
          <DropdownItem linkText="Sign Out" testid="signOut" />
        </DropdownContainerRight>
      </Dropdown>
    </DropdownButton>
  );
};