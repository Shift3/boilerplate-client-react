import { FC } from 'react';
import { UserTable } from '../userListTable/index';
import { Wrapper } from './styled';

export const UserListPage: FC = () => {
  return (
    <div>
      <Wrapper>
        <UserTable/>
      </Wrapper>
    </div>
  );
};