// React imports
import { FC } from 'react';

// Third party library imports
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

export const ProfileDropdown: FC<{ user: IUserProfile }> = ({ user }) => {
  const dropdownTitle = (
    <>
      <FontAwesomeIcon icon='user' />
      <span>Hi {user.firstName}</span>
    </>
  );

  return (
    <ProfileDropDownContainer id='profile-nav-dropdown' title={dropdownTitle} alignRight>
      <ProfileDropdownMenuContainer>
        <ProfileInfoContainer>
          <img src={portraitPlaceholder} alt={`${user.firstName} ${user.lastName}`} />
          <div>{user.firstName}</div>
          <div>{user.lastName}</div>
        </ProfileInfoContainer>
        <VerticalDivider />
        <div>
          <NavDropdown.Item href='/user/profile'>Profile</NavDropdown.Item>
          <NavDropdown.Item href='/user/change-password'>Change Password</NavDropdown.Item>
          <NavDropdown.Item>Toggle Navigation Bar</NavDropdown.Item>
          <NavDropdown.Item>Sign Out</NavDropdown.Item>
        </div>
      </ProfileDropdownMenuContainer>
    </ProfileDropDownContainer>
  );
};
