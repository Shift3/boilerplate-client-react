// React imports
import { FC } from 'react';

// Third party library imports
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// App imports
import portraitPlaceholder from 'assets/img/portrait_placeholder.png';
import { IUserProfile } from '../application/useNavData';

const ProfileDropDownContainer = styled(NavDropdown)`
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

const ProfileDropdownMenuContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ProfileInfoContainer = styled.div`
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

export type ProfileDropdownProps = {
  profile: IUserProfile;
  onNavBarToggle: () => void;
  onSignOut: () => void;
  // By default, the dropdown is positioned along the left side of its parent. Setting "alignRight" to true will align
  // the dropdown along the right side of its parent.
  alignRight?: boolean;
};

export const ProfileDropdown: FC<ProfileDropdownProps> = ({
  profile,
  onNavBarToggle,
  onSignOut,
  alignRight = false,
}) => {
  const dropdownTitle = (
    <>
      <FontAwesomeIcon icon='user' />
      <span>Hi {profile.firstName}</span>
    </>
  );

  return (
    <ProfileDropDownContainer id='profile-nav-dropdown' title={dropdownTitle} align={alignRight ? 'end' : 'start'}>
      <ProfileDropdownMenuContainer>
        <ProfileInfoContainer>
          <img src={portraitPlaceholder} alt={`${profile.firstName} ${profile.lastName}`} />
          <div>{profile.firstName}</div>
          <div>{profile.lastName}</div>
        </ProfileInfoContainer>
        <VerticalDivider />
        <div>
          <NavDropdown.Item as={Link} to='/user/profile'>
            Profile
          </NavDropdown.Item>
          <NavDropdown.Item as={Link} to={`/users/change-password/${profile.id}`}>
            Change Password
          </NavDropdown.Item>
          <NavDropdown.Item onClick={onNavBarToggle}>Toggle Navigation Bar</NavDropdown.Item>
          <NavDropdown.Item onClick={onSignOut}>Sign Out</NavDropdown.Item>
        </div>
      </ProfileDropdownMenuContainer>
    </ProfileDropDownContainer>
  );
};
