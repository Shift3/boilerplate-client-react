import { handleApiError, isFetchBaseQueryError } from 'common/api/handleApiError';
import { useConfirmChangeEmailMutation } from 'common/api/userApi';
import { FrontPageLayout, Title } from 'common/components/FrontPageLayout';
import { LoadingButton } from 'common/components/LoadingButton';
import * as notificationService from 'common/services/notification';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const ConfirmChangeEmailPage: FC = () => {
  const { t } = useTranslation(['translation', 'common']);
  const navigate = useNavigate();
  const { token = '', uid = '' } = useParams<{ token: string; uid: string }>();
  const [confirmChangeEmail, { isLoading }] = useConfirmChangeEmailMutation();

  const onSubmit = async () => {
    try {
      const requestPayload = { token, uid };
      await confirmChangeEmail(requestPayload).unwrap();
      notificationService.showSuccessMessage(t('confirmEmailChangePage.emailChangeSuccessful'));
      navigate('/auth/login');
    } catch (error) {
      notificationService.showErrorMessage(t('confirmEmailChangePage.unableToChangeEmail'));
      if (isFetchBaseQueryError(error)) {
        handleApiError(error);
      } else {
        throw error;
      }
    }
  };

  return (
    <FrontPageLayout>
      <Title>{t('confirmEmailChangePage.heading')}</Title>
      <p className='text-muted'>{t('confirmEmailChangePage.subheading')}</p>

      <div className='d-grid gap-2 mt-3'>
        <LoadingButton onClick={onSubmit} loading={isLoading}>
          {t('confirmEmailChangePage.changeMyEmail')}
        </LoadingButton>
      </div>
    </FrontPageLayout>
  );
};
