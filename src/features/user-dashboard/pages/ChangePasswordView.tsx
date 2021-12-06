import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useAppDispatch } from 'app/redux';
import { ChangePasswordRequest, useChangePasswordMutation } from 'common/api/userApi';
import { ErrorResponse } from 'common/models';
import * as notificationService from 'common/services/notification';
import { authSlice } from 'features/auth/authSlice';
import { useAuth } from 'features/auth/hooks';
import { FC, useState } from 'react';
import { useHistory, Prompt } from 'react-router-dom';
import { ChangePasswordForm, FormData } from '../components/ChangePasswordForm';
import { PageWrapper } from 'common/styles/page';
import { StyledFormWrapper, Title } from 'common/styles/form';

export const ChangePasswordPage: FC = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [changePassword] = useChangePasswordMutation();
  const [shouldNavigate, setShouldNavigate] = useState<boolean>(true);

  const onFormSubmit = async (data: FormData) => {
    setShouldNavigate((prev) => !prev);
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
        <Prompt when={shouldNavigate} message="You have unsaved changes, would you still like to leave?" />
      </StyledFormWrapper>
    </PageWrapper>
  );
};
