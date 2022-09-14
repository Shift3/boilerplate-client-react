import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dropdown } from 'common/components/Dropdown';
import { User } from 'common/models';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserProfilePicture } from './UserProfilePicture';

const ProfileInfoWrapper = styled.div<{
  mobile: boolean;
}>`
  background: ${props =>
    `${props.mobile ? props.theme.nav.vertical.profileBackground : props.theme.nav.horizontal.profileBackground}`};
  width: 100%;
  border-radius: ${props => props.theme.borderRadius};
  display: flex;
  align-items: center;
  color: ${props => props.theme.nav.profileText};
  padding: 1rem;
  margin: ${props => `${props.mobile ? '1rem 0rem 1rem 0rem' : '0rem 0rem 0rem 1rem'}`};
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
  overflow: hidden;

  small {
    color: ${props => props.theme.nav.smallText};
  }

  span {
    transition: all 0.3s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -1rem;
  }

  & > div > div,
  & > div > small {
    transition: all 0.15s ease;
  }

  &:hover {
    background: ${props => props.theme.nav.profileHoverBackground};

    span {
      right: 1rem;
      opacity: 1;
    }
  }
`;

type Props = {
  user: User;
  isMobilePerspective: boolean;
  handleSignOutViaDialog: () => void;
};

export const NavUserDetails: FC<Props> = ({ user, isMobilePerspective, handleSignOutViaDialog }) => {
  const navigate = useNavigate();

  const [showDropdown, setShowDropdown] = useState(false);
  const handleDropdownToggle = () => {
    setShowDropdown(show => !show);
  };

  const handleDropdownClose = () => {
    setShowDropdown(false);
  };

  const handleOnClick = () => {
    if (!isMobilePerspective) {
      handleDropdownToggle();
    } else {
      navigate(`/user/profile/${user.id}`);
    }
  };

  return (
    <div>
      <ProfileInfoWrapper mobile={isMobilePerspective} onClick={handleOnClick}>
        <UserProfilePicture user={user} size='xs' radius={32} />
        <div>
          <div>
            {user.firstName} {user.lastName.charAt(0)}.
          </div>
          <small>{user.role.toString()}</small>
          <span>
            <FontAwesomeIcon icon={['fas', 'cog']} size='2x' />
          </span>
        </div>
      </ProfileInfoWrapper>
      <Dropdown
        show={showDropdown}
        onClose={handleDropdownClose}
        navLinks={[
          { id: 0, icon: 'user', label: 'Profile', path: `/user/profile/${user.id}` },
          { id: 1, icon: 'sign-out-alt', label: 'Sign Out', method: handleSignOutViaDialog },
        ]}
      />
    </div>
  );
};
