import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useAppDispatch } from 'app/redux';
import { ChangePasswordRequest, useChangePasswordMutation } from 'common/api/userApi';
import { ErrorResponse } from 'common/models';
import * as notificationService from 'common/services/notification';
import { authSlice } from 'features/auth/authSlice';
import { useAuth } from 'features/auth/hooks';
import { PageWrapper, StyledFormWrapper, Title } from 'features/styles/PageStyles';
import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { ChangePasswordForm, FormData } from '../components/ChangePasswordForm';

export const ChangePasswordPage: FC = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [changePassword] = useChangePasswordMutation();

  const onFormSubmit = async (data: FormData) => {
    const request: ChangePasswordRequest = { id: user!.id, ...data };

    try {
      const session = await changePassword(request).unwrap();
      dispatch(authSlice.actions.userLoggedIn({ token: session.jwtToken, user: session.user }));
      notificationService.showSuccessMessage('Password updated.');
    } catch (error) {
      notificationService.showErrorMessage(((error as FetchBaseQueryError).data as ErrorResponse).message);
    }

    history.push('/agents');
  };

  const onFormCancel = () => history.goBack();

  return (
    <PageWrapper>
      <StyledFormWrapper data-testid='wrapper'>
        <Title>Change Password</Title>
        <ChangePasswordForm onSubmit={onFormSubmit} onCancel={onFormCancel} />
      </StyledFormWrapper>
    </PageWrapper>
  );
};
