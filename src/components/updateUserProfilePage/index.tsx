import { UpdateUserFormData } from 'components/updateUserProfileForm/types';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { UpdateUserProfileForm } from '../updateUserProfileForm/index';

export const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  background-color: ${(props) => props.theme.adminBackground};
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const UpdateUserProfilePage: FC = () => {
  const history = useHistory();

  const onSubmit = async (formData: UpdateUserFormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data = { ...formData };
    history.push('/admin/user-list');
  };

  const onCancel = () => history.push('/auth/user-list');

  return (
    <Wrapper>
      <UpdateUserProfileForm onSubmit={onSubmit} onCancel={onCancel} />
    </Wrapper>
  );
};