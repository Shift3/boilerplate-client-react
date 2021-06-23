import { FC } from 'react';
import { ProfilePageContainer } from './styled';

export const ProfilePage: FC = () => {
  return (
    <ProfilePageContainer data-testid='profilePageContainer'>
      <h2>Profile Page</h2>
    </ProfilePageContainer>
  );
};