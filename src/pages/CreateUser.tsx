import { CreateUserForm } from 'components/createUser/CreateUserForm';
import { CreateUserFormData } from 'components/createUser/types';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { PageWrapper } from '../styles/pages/PageWrapper';

export const CreateUserPage: FC = () => {
  const history = useHistory();

  const onSubmit = async (formData: CreateUserFormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const data = { ...formData };
    history.push('/admin/user-list');
  };

  const onCancel = () => history.push('/auth/user-list');

  return (
    <PageWrapper>
      <CreateUserForm onSubmit={onSubmit} onCancel={onCancel} />
    </PageWrapper>
  );
};
