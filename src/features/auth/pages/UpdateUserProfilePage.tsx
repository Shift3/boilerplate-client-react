import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { FC } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useAuth } from 'features/auth/hooks';
import {
  useRequestChangeEmailMutation,
  useResendChangeEmailVerificationEmailMutation,
  useUpdateProfileMutation
} from 'common/api/userApi';
import { handleApiError } from 'common/api/handleApiError';
import { useAppDispatch } from 'app/redux';
import { authSlice } from 'features/auth/authSlice';
import * as notificationService from 'common/services/notification';
import * as authLocalStorage from 'features/auth/authLocalStorage';
import { UserEmailFormData, UpdateUserEmailForm } from '../components/UpdateUserEmailForm';
import { ProfileFormData, UpdateUserProfileForm } from '../components/UpdateUserProfileForm';
import { ProfilePhotoFormData, UpdateProfilePhotoForm } from '../../user-profile/components/UpdateProfilePhotoForm';
import { PageWrapper } from 'common/styles/page';
import { StyledFormWrapper, Title } from 'common/styles/form';
import { useUpdateProfilePhoto, useDeleteProfilePhoto } from 'features/user-profile/hooks';

import { DeleteButton } from 'common/styles/button';

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
  const { updateUserProfilePhoto } = useUpdateProfilePhoto();
  const { deleteUserProfilePhoto } = useDeleteProfilePhoto();
  const dispatch = useAppDispatch();

  const onSubmit = async (formData: ProfileFormData) => {
    const data = { id: Number(id), ...formData };
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

  const onSubmitNewProfilePhoto = async (formData: ProfilePhotoFormData) => {
    
    if (formData.profilePicture) {
      const file = formData.profilePicture[0];

      const photoFormData = new FormData();
      if (file instanceof Blob) {
        photoFormData.append("file", file);
        photoFormData.append("type", file.type);
      }
      const data = { profilePicture: photoFormData, id: Number(id) };

      await updateUserProfilePhoto(data);
    }
  }

  const handleDeleteProfilePhoto = async () => {
    const data = { id: Number(id) };

    await deleteUserProfilePhoto(data);
  }

  const profilePictureIsDefined = () => {
    if (user) {
      return !!user.profilePicture;
    }
    return false;
  }

  return (
    <PageWrapper>
      <Container>
        <Row>
          <Col xs={12} xl={6}>
            <StyledFormWrapper style={{ margin: '20px auto' }}>
              <Title>Update Profile</Title>
              <UpdateUserProfileForm
                onSubmit={onSubmit}
                defaultValues={{
                  firstName: user?.firstName ?? '',
                  lastName: user?.lastName ?? '',
                }}
              />
            </StyledFormWrapper>
          </Col>

          <Col xs={12} xl={6}>
            <StyledFormWrapper style={{ margin: '20px auto' }}>
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
            <StyledFormWrapper style={{ margin: '20px auto' }}>
              <Title>Profile Photo</Title>
              <UpdateProfilePhotoForm
                onSubmit={onSubmitNewProfilePhoto}
              />
              <div className='d-grid grid-2 mt-3'>
                <DeleteButton disabled={!profilePictureIsDefined()} onClick={handleDeleteProfilePhoto}>
                  DELETE
                </DeleteButton>
            </div>
          </StyledFormWrapper>
          </Col>
        </Row>
      </Container>
    </PageWrapper>
  );
};
