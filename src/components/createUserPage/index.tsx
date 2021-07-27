import { CreateUserForm } from 'components/createUserForm';
import { ICreateUserFormData } from 'components/createUserForm/types';
import { useAccountCreation } from 'core/modules/user/application/useAccountCreation';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.adminBackground};
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CreateUserPage: FC = () => {
  const history = useHistory();
  const { createAccount } = useAccountCreation();

  const onSubmit = async (formData: ICreateUserFormData) => {
    const data = { ...formData };
    const onSuccess = () => history.push('/admin/user-list');
    await createAccount(data, onSuccess);
  };

  const onCancel = () => history.push('/auth/user-list');

  return (
    <Wrapper>
      <CreateUserForm onSubmit={onSubmit} onCancel={onCancel} />
    </Wrapper>
  );
};