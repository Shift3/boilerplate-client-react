import { handleApiError, isFetchBaseQueryError } from 'common/api/handleApiError';
import { useConfirmChangeEmailMutation } from 'common/api/userApi';
import { FrontPageLayout, Title } from 'common/components/FrontPageLayout';
import { LoadingButton } from 'common/components/LoadingButton';
import * as notificationService from 'common/services/notification';
import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

export const ConfirmChangeEmailPage: FC = () => {
  const navigate = useNavigate();
  const { token = '', uid = '' } = useParams<{ token: string; uid: string }>();
  const [confirmChangeEmail, { isLoading }] = useConfirmChangeEmailMutation();

  const onSubmit = async () => {
    try {
      const requestPayload = { token, uid };
      await confirmChangeEmail(requestPayload).unwrap();
      notificationService.showSuccessMessage('Email change successful.');
      navigate('/auth/login');
    } catch (error) {
      notificationService.showErrorMessage('Unable to change email.');
      if (isFetchBaseQueryError(error)) {
        handleApiError(error);
      } else {
        throw error;
      }
    }
  };

  return (
    <FrontPageLayout>
      <Title>Verify Email Change</Title>
      <p className='text-muted'>
        You have requested an email change. Click the button below to complete the email change.
      </p>

      <div className='d-grid gap-2 mt-3'>
        <LoadingButton as={Button} onClick={onSubmit} loading={isLoading}>
          Change my Email
        </LoadingButton>
      </div>
    </FrontPageLayout>
  );
};
