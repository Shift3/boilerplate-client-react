import { handleApiError, isFetchBaseQueryError } from 'common/api/handleApiError';
import { useActivateAccountMutation } from 'common/api/userApi';
import { FrontPageLayout, Title } from 'common/components/FrontPageLayout';
import * as notificationService from 'common/services/notification';
import { FC } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ActivateAccountForm, FormData } from '../components/ActivateAccountForm';

export const ActivateAccountPage: FC = () => {
  const navigate = useNavigate();
  const { token = '', uid = '' } = useParams<{ token: string; uid: string }>();
  const [activateAccount] = useActivateAccountMutation();

  const onSubmit = async (formData: FormData) => {
    const data = { ...formData, token, uid };

    try {
      await activateAccount(data);
      notificationService.showSuccessMessage('This account has been activated. Please log in.');
      navigate('/auth/login');
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        handleApiError(error);
      } else {
        notificationService.showErrorMessage('Unable to activate account.');
        throw error;
      }
    }
  };

  return (
    <FrontPageLayout>
      <Title>Activate Account</Title>
      <p className='text-muted'>Just one more step! Choose a password to active your account.</p>
      <ActivateAccountForm onSubmit={onSubmit} />
      <div className='mt-2 mb-2'>
        <small>
          Ended up here by mistake? <Link to='/auth/login'>Log In</Link>
        </small>
      </div>
    </FrontPageLayout>
  );
};
