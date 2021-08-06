import { ChangePasswordFormData } from 'components/changePassword/types';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { PageWrapper } from 'styles/pages/PageWrapper';
import { ChangePasswordForm } from '../components/changePassword/ChangePasswordForm';

export const ChangePasswordPage: FC = () => {
  const history = useHistory();

  //  eslint-disable-next-line
  const onSubmit = (formData: ChangePasswordFormData) => {
    // TODO: make API call to handle success and error cases.
    history.push('/');
  };

  return (
    <PageWrapper>
      <ChangePasswordForm onSubmit={onSubmit} />
    </PageWrapper>
  );
};
