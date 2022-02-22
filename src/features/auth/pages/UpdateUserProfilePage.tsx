import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useAppDispatch } from 'app/redux';
import portraitPlaceholder from 'assets/img/portrait_placeholder.png';
import { handleApiError } from 'common/api/handleApiError';
import {
  ChangePasswordRequest,
  useChangePasswordMutation,
  useRequestChangeEmailMutation,
  useResendChangeEmailVerificationEmailMutation,
  useUpdateProfileMutation,
} from 'common/api/userApi';
import { CircularImg, PageCrumb, PageHeader, SmallContainer } from 'common/components/Common';
import { HolyGrailLayout } from 'common/components/HolyGrailLayout';
import { ErrorResponse } from 'common/models';
import * as notificationService from 'common/services/notification';
import * as authLocalStorage from 'features/auth/authLocalStorage';
import { authSlice } from 'features/auth/authSlice';
import { useAuth } from 'features/auth/hooks';
import {
  ChangePasswordForm,
  FormData as ForgotPasswordFormData,
} from 'features/user-dashboard/components/ChangePasswordForm';
import { FC, useState } from 'react';
import { Alert, Col, Nav, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link, useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { UpdateUserEmailForm, UserEmailFormData } from '../components/UpdateUserEmailForm';
import { FormData, UpdateUserProfileForm } from '../components/UpdateUserProfileForm';

type RouteParams = {
  id: string;
};

const ProfileNav = styled(Nav)`
  padding-right: 4rem;
  a {
    padding-left: 0;
    color: #333;

    &.active {
      font-weight: bold;
    }
  }
`;

export const UpdateUserProfilePage: FC = () => {
  const history = useHistory();
  const { id } = useParams<RouteParams>();
  const { token, user } = useAuth();
  const [updateProfile] = useUpdateProfileMutation();
  const [requestChangeEmail] = useRequestChangeEmailMutation();
  const [resendChangeEmailVerificationEmail] = useResendChangeEmailVerificationEmailMutation();
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState('profile');

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
      notificationService.showSuccessMessage(
        'Email Verification sent. Follow the instructions in the email to proceed.',
      );
      history.push('/agents');
    } catch (error) {
      handleApiError(error as FetchBaseQueryError);
    }
  };

  const handleResendChangeEmailVerificationEmail = () => {
    try {
      resendChangeEmailVerificationEmail({ id: Number(id) });
      notificationService.showSuccessMessage('Change Email verification email has been sent.');
    } catch (error) {
      handleApiError(error as FetchBaseQueryError);
    }
  };

  const onChangePasswordFormSubmit = async (data: ForgotPasswordFormData) => {
    const request: ChangePasswordRequest = { id: user!.id, ...data };

    try {
      const session = await changePassword(request).unwrap();
      dispatch(authSlice.actions.userLoggedIn({ token: session.token, user: session.user }));
      notificationService.showSuccessMessage('Password updated.');
    } catch (error) {
      notificationService.showErrorMessage(((error as FetchBaseQueryError).data as ErrorResponse).message);
    }

    history.push('/agents');
  };

  return (
    <HolyGrailLayout>
      <SmallContainer>
        <PageCrumb>
          <Link to='/agents'>
            <FontAwesomeIcon icon={['fas', 'chevron-left']} /> Back to Agent List
          </Link>
        </PageCrumb>

        <PageHeader className='mb-3'>
          <div className='d-flex'>
            <CircularImg radius={64} src={user?.profilePicture || portraitPlaceholder} alt='Profile' />
            <div>
              <h1>
                {user?.firstName} {user?.lastName[0]}.
              </h1>
              <p className='text-muted'>Your account settings.</p>
            </div>
          </div>
        </PageHeader>

        <ProfileNav defaultActiveKey='/home'>
          <ProfileNav.Link onClick={() => setTab('profile')} className={tab === 'profile' ? 'active' : ''}>
            Profile
          </ProfileNav.Link>
          <ProfileNav.Link onClick={() => setTab('security')} className={tab === 'security' ? 'active' : ''}>
            Security and Password
          </ProfileNav.Link>
        </ProfileNav>
        <hr className='mt-0' />

        {tab === 'profile' ? (
          <>
            <Row>
              <Col md='5'>
                <h5>General Information</h5>
                <p className='text-muted'>This information will be used to identify you in our system</p>
              </Col>
              <Col>
                <UpdateUserProfileForm
                  onSubmit={onSubmit}
                  defaultValues={{
                    firstName: user?.firstName ?? '',
                    lastName: user?.lastName ?? '',
                  }}
                />
              </Col>
            </Row>

            <hr />

            <Row>
              <Col md='5'>
                <h5>Email Address</h5>
                <p className='text-muted'>
                  Your email address on file will be used to communicate with you. Changing your email requires you to
                  confirm your new email address.
                </p>
              </Col>
              <Col>
                {user?.newEmail && (
                  <Alert variant='warning'>
                    <div>
                      <p data-testid='updateUserExistingEmailChangeInfoContent'>
                        You requested an email change. A verification email has been sent to <b>{user.newEmail}</b>. To
                        confirm your new email, please follow the directions in the verification email.
                      </p>
                      <Button
                        variant='warning'
                        data-testid='resendVerificationEmailButton'
                        onClick={handleResendChangeEmailVerificationEmail}
                      >
                        Resend Verification Email
                      </Button>
                    </div>
                  </Alert>
                )}

                <UpdateUserEmailForm
                  onSubmit={onSubmitRequestEmailChange}
                  defaultValues={{
                    email: user?.email ?? '',
                  }}
                />
              </Col>
            </Row>
          </>
        ) : (
          ''
        )}

        {tab === 'security' ? (
          <>
            <Row>
              <Col md='5'>
                <h5>Change Password</h5>
                <p className='text-muted'>
                  Password must be 8 characters or more. Password must contain a lowercase, uppercase, special
                  character, and a number.
                </p>
              </Col>
              <Col>
                <ChangePasswordForm onSubmit={onChangePasswordFormSubmit} />
              </Col>
            </Row>
          </>
        ) : (
          ''
        )}
      </SmallContainer>
    </HolyGrailLayout>
  );
};
