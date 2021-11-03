import { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IResetPasswordFormData } from '../resetPasswordForm/types';
import { PageWrapper, StyledFormWrapper, Title } from 'features/styles/PageStyles';
import { useAccountCreation } from 'core/modules/user/application/useAccountCreation';
import { ActivateAccountForm } from 'features/auth/components/activateAccountForm';

export const ActivateAccountPage: FC = () => {
  const history = useHistory();
  const { token } = useParams<{ token: string }>();
  const { activateAccount } = useAccountCreation();

  const onSubmit = async (formData: IResetPasswordFormData) => {
    const data = { ...formData, token };
    const onSuccess = () => history.push('/auth/login');
    await activateAccount(data, onSuccess);
  };

  const onCancel = () => history.push('/auth/login');

  return (
    <PageWrapper>
      <StyledFormWrapper data-testid='wrapper'>
        <Title>Activate Account</Title>
        <ActivateAccountForm onSubmit={onSubmit} onCancel={onCancel} />
      </StyledFormWrapper>
    </PageWrapper>
  );
};
