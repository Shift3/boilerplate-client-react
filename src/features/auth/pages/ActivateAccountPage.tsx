import { handleApiError, isFetchBaseQueryError } from 'common/api/handleApiError';
import { useActivateAccountMutation } from 'common/api/userApi';
import { FrontPageLayout, Title } from 'common/components/FrontPageLayout';
import * as notificationService from 'common/services/notification';
import { FC } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ActivateAccountForm, FormData } from '../components/ActivateAccountForm';
import { useTranslation } from 'react-i18next';

export const ActivateAccountPage: FC = () => {
  const { t } = useTranslation(['translation', 'common']);
  const navigate = useNavigate();
  const { token = '', uid = '' } = useParams<{ token: string; uid: string }>();
  const [activateAccount] = useActivateAccountMutation();

  const onSubmit = async (formData: FormData) => {
    const data = { ...formData, token, uid };

    try {
      await activateAccount(data);
      notificationService.showSuccessMessage(t('activateAccountPage.accountHasBeenActivated'));
      navigate('/auth/login');
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        handleApiError(error);
      } else {
        notificationService.showErrorMessage(t('activateAccountPage.unableToActivateAccount'));
        throw error;
      }
    }
  };

  return (
    <FrontPageLayout>
      <Title>{t('activateAccountPage.activateAccount')}</Title>
      <p className='text-muted'>{t('activateAccountPage.activateAccountDescription')}</p>
      <ActivateAccountForm onSubmit={onSubmit} />
      <div className='mt-2 mb-2'>
        <small>
          {t('activateAccountPage.hereByMistake')} <Link to='/auth/login'>{t('logIn', { ns: 'common' })}</Link>
        </small>
      </div>
    </FrontPageLayout>
  );
};
