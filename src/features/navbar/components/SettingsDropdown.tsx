// React imports
import { FC } from 'react';

// Third party library imports
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavDropdown, { NavDropdownProps } from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// App imports
import portraitPlaceholder from 'assets/img/portrait_placeholder.png';
import { User } from 'common/models';

// Based on the styled-components docs at https://styled-components.com/docs/api#caveat-with-function-components,
// in order for typechecking to work correctly with styled components that extend a function components, we need
// to define the component and it's type first as done here.
const BootstrapNavDropdown: FC<NavDropdownProps> = ({ children, ...rest }) => (
  <NavDropdown {...rest}>{children}</NavDropdown>
);

const StyledNavDropdown = styled(BootstrapNavDropdown)`
  .dropdown-toggle.nav-link {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .dropdown-toggle.nav-link::after {
    margin: 0;
  }
`;

const DropdownMenuContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProfileInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;

  img {
    border-radius: 50%;
    max-height: 50px;
    max-width: 50px;
    height: auto;
    width: auto;
  }
`;

const VerticalDivider = styled.span`
  margin: 0 20px;
  border-left: 1px solid #d3d3d3;
`;

const NavDropdownItemsWrapper = styled.div``;

type Props = {
  user: User;
  onNavbarToggle: () => void;
  onSignOut: () => void;
  // By default, the dropdown is positioned along the left side of its parent. Setting "alignRight" to true will align
  // the dropdown along the right side of its parent.
  alignRight?: boolean;
};

export const SettingsDropdown: FC<Props> = ({ user, onNavbarToggle, onSignOut, alignRight = false }) => {
  const dropdownTitle = (
    <>
      <FontAwesomeIcon icon='user' />
      <span>Hi {user.firstName}</span>
    </>
  );

  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <StyledNavDropdown id='profile-nav-dropdown' title={dropdownTitle} align={alignRight ? 'end' : 'start'}>
      <DropdownMenuContainer>
        <ProfileInfoWrapper>
          <img src={user.profilePicture || portraitPlaceholder} alt={fullName} />
          <div>{user.firstName}</div>
          <div>{user.lastName}</div>
        </ProfileInfoWrapper>
        <VerticalDivider />
        <NavDropdownItemsWrapper>
          <NavDropdown.Item as={Link} to={`/user/profile/${user.id}`}>
            Profile
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to={`/user/change-password/${user.id}`}>
            Change Password
          </NavDropdown.Item>
          <NavDropdown.Item onClick={onNavbarToggle}>Toggle Navigation Bar</NavDropdown.Item>
          <NavDropdown.Item onClick={onSignOut}>Sign Out</NavDropdown.Item>
        </NavDropdownItemsWrapper>
      </DropdownMenuContainer>
    </StyledNavDropdown>
  );
};
