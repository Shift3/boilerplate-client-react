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

const ActivatedAt = styled.div`
/* FontAwesomeIcon icon="fa-solid fa-envelope" */
`;
const Actions = styled.div`

`;

const EditIcon = styled.div`
/* FontAwesomeIcon icon="fa-solid fa-pen-to-square" */
`;

const DeleteIcon = styled.div`
/* FontAwesomeIcon icon="fa-solid fa-trash-can" */
`;

const ResetPasswordIcon = styled.div`
/* FontAwesomeIcon icon="fa-solid fa-lock" */
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
                <ActivatedAt></ActivatedAt>
                <Actions>
                  <EditIcon onClick={navigateToUpdateProfile}>Edit Icon</EditIcon>
                  <DeleteIcon onClick={deleteUser}>Delete Icon</DeleteIcon>
                  <ResetPasswordIcon onClick={resetPassword}>Lock Icon</ResetPasswordIcon>
                </Actions>
              </td>
            </tr>
          );
        }
        )}
      </tbody>
    </StyledTable>
  );
};