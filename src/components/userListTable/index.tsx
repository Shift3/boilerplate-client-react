import { FC } from 'react';
import { Table } from 'react-bootstrap';
import styled from 'styled-components';
import { IUser } from '../../core/modules/user/domain/user';

const StyledTable = styled(Table)`
background-color: ${(props) => props.theme.primary};
color: white;
border-top-left-radius: 10px;
border-top-right-radius: 10px
`;

const EditButton = styled.div`

`;

const DeleteButton = styled.div`

`;

const ResetPasswordButton = styled.div`

`;

interface IProps {
  users: IUser[]
}

export const UserTable: FC<IProps> = ({ users }) => {
  const navigateToUpdateProfile = () => {
    // naviage to update profile page
  };
  const deleteUser = () => {
    // delete user
  };
  const resetPassword = () => {
    // reset password
  };

  return (
    <StyledTable>
      <thead>
        <tr>
          <th>LAST NAME</th>
          <th>FIRST NAME</th>
          <th>EMAIL</th>
          <th>ROLE</th>
          <th>ACTIVATED</th>
          <th>ACTIONS</th>
        </tr>
      </thead>
      <tbody>
        { users.map((user: IUser) => {
          const { id, lastName, firstName, email, role, activatedAt } = user;
          return (
            <tr key={id}>
              <td>{lastName}</td>
              <td>{firstName}</td>
              <td>{email}</td>
              <td>{role}</td>
              <td>{activatedAt}</td>
              <td>
                <EditButton onClick={navigateToUpdateProfile}>Edit Icon</EditButton>
                <DeleteButton onClick={deleteUser}>Delete Icon</DeleteButton>
                <ResetPasswordButton onClick={resetPassword}>Lock Icon</ResetPasswordButton>
              </td>
            </tr>
          );
        }
        )}
      </tbody>
    </StyledTable>
  );
};