import { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { IResetPasswordFormData } from '../resetPasswordForm/types';
import Container from 'react-bootstrap/Container';
import { StyledFormWrapper } from 'features/styles/PageStyles';
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
    <Container className='d-flex justify-content-center'>
      <StyledFormWrapper data-testid='wrapper'>
        <ActivateAccountForm onSubmit={onSubmit} onCancel={onCancel} />
      </StyledFormWrapper>
    </Container>
  );
};
