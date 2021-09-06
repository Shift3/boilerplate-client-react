import { CreateUserForm } from 'features/agency-dashboard/components';
import { CreateUserFormData } from 'components/createUserForm/types';
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

  const onSubmit = async (formData: CreateUserFormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data = { ...formData };
    history.push('/admin/user-list');
  };

  const onCancel = () => history.push('/auth/user-list');

  return (
    <Wrapper>
      <CreateUserForm onSubmit={onSubmit} onCancel={onCancel} />
    </Wrapper>
  );
};