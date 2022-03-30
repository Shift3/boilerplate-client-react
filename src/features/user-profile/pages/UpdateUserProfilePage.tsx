import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { useAuth } from 'features/auth/hooks';
import { handleApiError } from 'common/api/handleApiError';
import { useAppDispatch } from 'app/redux';
import {
  ChangePasswordRequest,
  useChangePasswordMutation,
  useResendChangeEmailVerificationEmailMutation,
} from 'common/api/userApi';
import { PageCrumb, PageHeader, SmallContainer } from 'common/components/Common';
import { ErrorIndexType, ErrorResponse } from 'common/models';
import * as notificationService from 'common/services/notification';
import { ProfileFormData, UpdateUserProfileForm } from '../components/UpdateUserProfileForm';
import { ProfilePictureFormData, UpdateProfilePictureForm } from '../components/UpdateProfilePictureForm';
import {
  useUpdateProfilePicture,
  useDeleteProfilePicture,
  useUpdateUserProfile,
  useChangeEmailRequest,
} from 'features/user-profile/hooks';
import { authSlice } from 'features/auth/authSlice';
import {
  ChangePasswordForm,
  FormData as ForgotPasswordFormData,
} from 'features/user-dashboard/components/ChangePasswordForm';
import { FC, useState } from 'react';
import { Alert, Col, Nav, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { UpdateUserEmailForm, UserEmailFormData } from '../components/UpdateUserEmailForm';
import { UserProfilePicture } from 'features/navbar/components/UserProfilePicture';
import { identifyAndRetrieveServerError, isFetchBaseQueryError } from 'common/error/utilities';

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
  const navigate = useNavigate();
  const { id } = useParams<RouteParams>();
  const { user } = useAuth();
  const [resendChangeEmailVerificationEmail] = useResendChangeEmailVerificationEmailMutation();
  const { updateUserProfile } = useUpdateUserProfile();
  const { changeEmailRequest } = useChangeEmailRequest();
  const { updateUserProfilePicture } = useUpdateProfilePicture();
  const { deleteUserProfilePicture } = useDeleteProfilePicture();
  const [changePassword] = useChangePasswordMutation();
  const dispatch = useAppDispatch();
  const [tab, setTab] = useState('profile');
  const [submissionError, setSubmissionError] = useState<ErrorIndexType | string | null>(null);

  const onSubmit = async (formData: ProfileFormData) => {
    const data = { id: Number(id), ...formData };
    try {
      await updateUserProfile(data);
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        setSubmissionError(identifyAndRetrieveServerError(error));
      }
    }
  };

  const onSubmitRequestEmailChange = async (formData: UserEmailFormData) => {
    const data = { id: Number(id), ...formData };
    try {
      await changeEmailRequest(data);
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        setSubmissionError(identifyAndRetrieveServerError(error));
      }
    }
  };

  const handleResendChangeEmailVerificationEmail = () => {
    try {
      resendChangeEmailVerificationEmail({ id: Number(id) });
      notificationService.showSuccessMessage('Change Email verification email has been sent.');
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        setSubmissionError(identifyAndRetrieveServerError(error));
      }
      handleApiError(error as FetchBaseQueryError);
    }
  };

  const onSubmitNewProfilePicture = async (formData: ProfilePictureFormData) => {
    if (formData.profilePicture) {
      const file = formData.profilePicture[0];

      const profilePictureFormData = new FormData();
      if (file instanceof Blob) {
        profilePictureFormData.append('file', file);
        profilePictureFormData.append('type', file.type);
      }
      const data = { profilePicture: profilePictureFormData, id: Number(id) };

      try {
        await updateUserProfilePicture(data);
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          setSubmissionError(identifyAndRetrieveServerError(error));
        }
      }
    }
  };

  const handleDeleteProfilePicture = async () => {
    const data = { id: Number(id) };

    try {
      await deleteUserProfilePicture(data);
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        setSubmissionError(identifyAndRetrieveServerError(error));
      }
    }
  };

  const profilePictureIsDefined = () => {
    if (user) {
      return !!user.profilePicture;
    }
    return false;
  };
  const onChangePasswordFormSubmit = async (data: ForgotPasswordFormData) => {
    const request: ChangePasswordRequest = { id: user!.id, ...data };

    try {
      const session = await changePassword(request).unwrap();
      dispatch(authSlice.actions.userLoggedIn({ token: session.token, user: session.user }));
      notificationService.showSuccessMessage('Password updated.');
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        setSubmissionError(identifyAndRetrieveServerError(error));
      }
      notificationService.showErrorMessage(((error as FetchBaseQueryError).data as ErrorResponse).message);
    }

    navigate('/agents');
  };

  return (
    <SmallContainer>
      <PageCrumb>
        <Link to='/agents'>
          <FontAwesomeIcon icon={['fas', 'chevron-left']} /> Back to Agent List
        </Link>
      </PageCrumb>

      <PageHeader className='mb-3'>
        <div className='d-flex'>
          <UserProfilePicture user={user} size='xs' radius={64} />
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
                submissionError={submissionError}
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
                submissionError={submissionError}
              />
            </Col>
          </Row>

          <hr />

          <Row>
            <Col md='5'>
              <h5>Photo</h5>
              <p className='text-muted'>This is the photo of you that other users in the system will be able to see.</p>
            </Col>
            <Col>
              <UpdateProfilePictureForm onSubmit={onSubmitNewProfilePicture} submissionError={submissionError} />
              <Button
                className='mt-3'
                variant='danger'
                disabled={!profilePictureIsDefined()}
                onClick={handleDeleteProfilePicture}
              >
                Delete
              </Button>
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
                Password must be 8 characters or more. Password must contain a lowercase, uppercase, special character,
                and a number.
              </p>
            </Col>
            <Col>
              <ChangePasswordForm onSubmit={onChangePasswordFormSubmit} submissionError={submissionError} />
            </Col>
          </Row>
        </>
      ) : (
        ''
      )}
    </SmallContainer>
  );
};
