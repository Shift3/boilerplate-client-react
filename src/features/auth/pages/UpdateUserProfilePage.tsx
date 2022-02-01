import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { FC } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useAuth } from 'features/auth/hooks';
import {
  useRequestChangeEmailMutation,
  useResendChangeEmailVerificationEmailMutation,
  useUpdateProfileMutation,
} from 'common/api/userApi';
import { handleApiError } from 'common/api/handleApiError';
import { useAppDispatch } from 'app/redux';
import { authSlice } from 'features/auth/authSlice';
import * as notificationService from 'common/services/notification';
import * as authLocalStorage from 'features/auth/authLocalStorage';
import { FormData, UpdateUserProfileForm } from '../components/UpdateUserProfileForm';
import { UserEmailFormData, UpdateUserEmailForm } from '../components/UpdateUserEmailForm';
import { PageWrapper } from 'common/styles/page';
import { StyledFormWrapper, Title } from 'common/styles/form';

type RouteParams = {
  id: string;
};

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

const Text = styled.div`
  color: ${(props) => props.theme.forms.textColor};
  margin: 20px auto 0;
`;

const ResendVerificationEmailButton = styled(Button)`
  color: ${(props) => props.theme.buttons.submitTextColor};
  background-color: ${(props) => props.theme.buttons.submitBackgroundColor};
  border-color: ${(props) => props.theme.buttons.submitBorderColor};
  width: 100%;
`;

export const UpdateUserProfilePage: FC = () => {
  const history = useHistory();
  const { id } = useParams<RouteParams>();
  const { token, user } = useAuth();
  const [updateProfile] = useUpdateProfileMutation();
  const [requestChangeEmail] = useRequestChangeEmailMutation();
  const [resendChangeEmailVerificationEmail] = useResendChangeEmailVerificationEmailMutation();
  const dispatch = useAppDispatch();

  const onSubmit = async (formData: FormData) => {
    const data = { id: Number(id), ...formData, profilePicture: '' };

    try {
      const updatedUser = await updateProfile(data).unwrap();
      const newAuth = { token, user: updatedUser };
      dispatch(authSlice.actions.userLoggedIn(newAuth));
      authLocalStorage.saveAuthState(newAuth);
      notificationService.showSuccessMessage('Profile updated.');
      history.push('/agents');
    } catch (error) {
      handleApiError(error as FetchBaseQueryError);
    }
  };

  const onSubmitRequestEmailChange = async (formData: UserEmailFormData) => {
    const data = { id: Number(id), ...formData };

    try {
      const updatedUser = await requestChangeEmail(data).unwrap();
      const newAuth = { token, user: updatedUser };
      dispatch(authSlice.actions.userLoggedIn(newAuth));
      authLocalStorage.saveAuthState(newAuth);
      notificationService.showSuccessMessage('Email Verification sent. Follow the instructions in the email to proceed.');
      history.push('/agents');
    } catch (error) {
      handleApiError(error as FetchBaseQueryError);
    }
  }

  const handleResendChangeEmailVerificationEmail = () => {
    try {
      resendChangeEmailVerificationEmail({ id: Number(id) });
      notificationService.showSuccessMessage('Change Email verification email has been sent.');
    } catch (error) {
      handleApiError(error as FetchBaseQueryError);
    }
  }

  return (
    <PageWrapper>
      <StyledFormWrapper>
        <Title>Update Profile</Title>
        <UpdateUserProfileForm
          onSubmit={onSubmit}
          defaultValues={{
            firstName: user?.firstName ?? '',
            lastName: user?.lastName ?? '',
          }}
        />
      </StyledFormWrapper>

      <StyledFormWrapper>
        <Title>Update Email</Title>
          { user?.newEmail && (
            <Wrapper>
              <Text>
                <p data-testid='updateUserExistingEmailChangeInfoContent'>An email change has already been requested for your account.</p>
              </Text>
              <ResendVerificationEmailButton
                data-testid='resendVerificationEmailButton'
                onClick={ handleResendChangeEmailVerificationEmail }
              >
                RESEND VERIFICATION EMAIL
              </ResendVerificationEmailButton>
              <Text>
                <p data-testid='updateUserEmailChangeInfoContent'>If you would like to request email change to another email, enter the new email below.</p>
              </Text>
            </Wrapper>
          )}
          <UpdateUserEmailForm
            onSubmit={onSubmitRequestEmailChange}
            defaultValues={{
              email: user?.email ?? '',
            }}
          />
      </StyledFormWrapper>
    </PageWrapper>
  );
};
