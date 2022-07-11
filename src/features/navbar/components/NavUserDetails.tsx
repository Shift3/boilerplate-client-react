import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { User } from 'common/models';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { UserProfilePicture } from './UserProfilePicture';

const ProfileInfoWrapper = styled.div`
  background: ${props => props.theme.nav.profileBackground};
  width: 100%;
  border-radius: ${props => props.theme.borderRadius};
  display: flex;
  align-items: center;
  color: ${props => props.theme.nav.profileText};
  padding: 1rem;
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
};

export const NavUserDetails: FC<Props> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <ProfileInfoWrapper onClick={() => navigate(`/user/profile/${user.id}`)}>
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
  );
};
