import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import portraitPlaceholder from 'assets/img/portrait_placeholder.png';
import { CircularImg } from 'common/components/Common';
import { User } from 'common/models';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { UserProfileImage } from './UserProfileImage';

const ProfileInfoWrapper = styled.div`
  background: #efefef;
  width: 100%;
  border-radius: 6px;
  display: flex;
  align-items: center;
  color: #666;
  padding: 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.15s ease;
  position: relative;
  overflow: hidden;

  small {
    color: #999;
  }

  span {
    transition: all 0.3s ease;
    opacity: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: -1rem;
  }
  
  &:hover {
    background: #dadada;
    
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
  const history = useHistory();
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <ProfileInfoWrapper onClick={() => history.push(`/user/profile/${user.id}`) }>
      <UserProfileImage user={user} size="xs" />

      <div>
        <div>{user.firstName} {user.lastName.charAt(0)}.</div>
        <small>{user.role.roleName}</small>
        <span>
          <FontAwesomeIcon icon={['fas', 'cog']} size='2x' />
        </span>
      </div>
    </ProfileInfoWrapper>
  );
};
