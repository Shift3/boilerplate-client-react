import { PageWrapper, StyledFormWrapper, Title } from 'features/styles/PageStyles';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ChangePasswordForm } from '../changePasswordForm';
import { IChangePasswordFormData } from '../changePasswordForm/types';

export const ChangePasswordPage: FC = () => {
  const history = useHistory();

  //  eslint-disable-next-line
  const onSubmit = (formData: IChangePasswordFormData) => {
    // TODO: make API call to handle success and error cases.
    history.push('/');
  };

  return (
    <PageWrapper>
      <StyledFormWrapper data-testid='wrapper'>
        <Title>Change Password</Title>
        <ChangePasswordForm onSubmit={onSubmit} />
      </StyledFormWrapper>
    </PageWrapper>
  );
};
