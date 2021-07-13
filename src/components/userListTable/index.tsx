import { FC } from 'react';
import { IUser } from '../../core/modules/user/domain/user';
import { DeleteButton, EditButton, ResetPasswordButton, TableContainer } from './styled';

export const UserTable: FC = ({ users }) => {

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
    <TableContainer>
      <table>
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
      </table>
    </TableContainer>
  );
};