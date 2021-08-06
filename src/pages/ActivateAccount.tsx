import { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IResetPasswordFormData } from '../components/resetPasswordForm/types';
import { useAccountCreation } from 'core/modules/user/application/useAccountCreation';
import { ActivateAccountForm } from 'components/activateAccount/AcctivateAccountForm';
import { PageWrapper } from 'styles/pages/PageWrapper';

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
      <ActivateAccountForm onSubmit={onSubmit} onCancel={onCancel} />
    </PageWrapper>
  );
};
