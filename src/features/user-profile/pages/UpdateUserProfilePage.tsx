import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from 'features/auth/hooks';
import { handleApiError, isFetchBaseQueryError } from 'common/api/handleApiError';
import {
  ChangePasswordRequest,
  useChangePasswordMutation,
  useResendChangeEmailVerificationEmailMutation,
} from 'common/api/userApi';
import { PageCrumb, PageHeader, SmallContainer } from 'common/styles/page';
import { ServerValidationErrors } from 'common/models';
import * as notificationService from 'common/services/notification';
import {
  ChangePasswordForm,
  FormData as ForgotPasswordFormData,
} from 'features/user-dashboard/components/ChangePasswordForm';
import {
  useChangeEmailRequest,
  useDeleteProfilePicture,
  useUpdateProfilePicture,
  useUpdateUserProfile,
} from 'features/user-profile/hooks';
import { FC, useState } from 'react';
import { Alert, Col, Nav, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ProfilePictureFormData, UpdateProfilePictureForm } from '../components/UpdateProfilePictureForm';
import { UpdateUserEmailForm, UserEmailFormData } from '../components/UpdateUserEmailForm';
import { UserProfilePicture } from 'features/navbar/components/UserProfilePicture';
import { isObject } from 'common/error/utilities';
import { ProfileFormData, UpdateUserProfileForm } from '../components/UpdateUserProfileForm';
import { Trans } from 'react-i18next';

type RouteParams = {
  id: string;
};

const ProfileNav = styled(Nav)`
  padding-right: 4rem;
  a {
    padding-left: 0;
    color: ${props => props.theme.textColor};

    &.active {
      font-weight: bold;
    }
  }
`;

export const UpdateUserProfilePage: FC = () => {
  const { id = '' } = useParams<RouteParams>();
  const { user } = useAuth();
  const [resendChangeEmailVerificationEmail] = useResendChangeEmailVerificationEmailMutation();
  const { updateUserProfile } = useUpdateUserProfile();
  const { changeEmailRequest } = useChangeEmailRequest();
  const { updateUserProfilePicture } = useUpdateProfilePicture();
  const { deleteUserProfilePicture } = useDeleteProfilePicture();
  const [changePassword] = useChangePasswordMutation();
  const [tab, setTab] = useState('profile');
  const [emailFormValidationErrors, setEmailFormValidationErrors] =
    useState<ServerValidationErrors<UserEmailFormData> | null>(null);
  const [passwordFormValidationErrors, setPasswordFormValidationErrors] =
    useState<ServerValidationErrors<ForgotPasswordFormData> | null>(null);

  const onSubmit = async (formData: ProfileFormData) => {
    const data = { id, ...formData };

    await updateUserProfile(data);
  };

  const onSubmitRequestEmailChange = async (formData: UserEmailFormData) => {
    const data = { id, ...formData };
    try {
      await changeEmailRequest(data);
    } catch (error) {
      if (error && isFetchBaseQueryError(error)) {
        if (isObject(error.data)) {
          setEmailFormValidationErrors(error.data);
        }
      } else {
        throw error;
      }
    }
  };

  const handleResendChangeEmailVerificationEmail = () => {
    try {
      resendChangeEmailVerificationEmail({ id });
      notificationService.showSuccessMessage('Change Email verification email has been sent.');
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        handleApiError(error);
      } else {
        notificationService.showErrorMessage('Unable to Send Change Email verification email');
        throw error;
      }
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
      const data = { profilePicture: profilePictureFormData, id };

      await updateUserProfilePicture(data);
    }
  };

  const handleDeleteProfilePicture = async () => {
    const data = { id };
    await deleteUserProfilePicture(data);
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
      await changePassword(request).unwrap();
      notificationService.showSuccessMessage('Password updated.');
    } catch (error) {
      if (error && isFetchBaseQueryError(error)) {
        if (isObject(error.data)) {
          setPasswordFormValidationErrors(error.data);
        }
      } else {
        throw error;
      }
    }
  };

  return (
    <SmallContainer>
      <PageCrumb>
        <Link to='/agents'>
          <>
            <FontAwesomeIcon icon={['fas', 'chevron-left']} />
            <Trans i18nKey='userProfile.back'>Back to Agent List</Trans>
          </>
        </Link>
      </PageCrumb>
      <PageHeader className='mb-3'>
        <div className='d-flex'>
          <UserProfilePicture user={user} size='sm' radius={64} />
          <div>
            <h1>
              {user?.firstName} {user?.lastName[0]}.
            </h1>
            <p className='text-muted'>
              <Trans i18nKey='userProfile.subheading'>Your Account Settings</Trans>
            </p>
          </div>
        </div>
      </PageHeader>
      <ProfileNav defaultActiveKey='/home'>
        <ProfileNav.Link onClick={() => setTab('profile')} className={tab === 'profile' ? 'active' : ''}>
          <Trans i18nKey='userProfile.profile'>Profile</Trans>
        </ProfileNav.Link>
        <ProfileNav.Link onClick={() => setTab('security')} className={tab === 'security' ? 'active' : ''}>
          <Trans i18nKey='userProfile.security'>Security and Password</Trans>
        </ProfileNav.Link>
      </ProfileNav>
      <hr className='mt-0' />
      {tab === 'profile' ? (
        <>
          <Row>
            <Col md='5'>
              <h5>
                <Trans i18nKey='userProfile.generalHeading'>General Information</Trans>
              </h5>
              <p className='text-muted'>
                <Trans i18nKey='userProfile.generalSubheading'>
                  This information will be used to identify you in our system
                </Trans>
              </p>
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
              <h5>
                <Trans i18nKey='userProfile.email'>Email Address</Trans>
              </h5>
              <p className='text-muted'>
                <Trans i18nKey='userProfile.emailDescription'>
                  Your email address on file will be used to communicate with you. Changing your email requires you to
                  confirm your new email address.
                </Trans>
              </p>
            </Col>
            <Col>
              {user?.newEmail && (
                <Alert variant='warning'>
                  <div>
                    <p data-testid='updateUserExistingEmailChangeInfoContent'>
                      <Trans i18nKey='userProfile.changeEmailDescription'>
                        You requested an email change. A verification email has been sent to <b>{user.newEmail}</b>. To
                        confirm your new email, please follow the directions in the verification email.
                      </Trans>
                    </p>
                    <Button
                      variant='warning'
                      data-testid='resendVerificationEmailButton'
                      onClick={handleResendChangeEmailVerificationEmail}
                    >
                      <Trans i18nKey='userProfile.resendEmail'>Resend Verification Email</Trans>
                    </Button>
                  </div>
                </Alert>
              )}

              <UpdateUserEmailForm
                onSubmit={onSubmitRequestEmailChange}
                defaultValues={{
                  email: user?.email ?? '',
                }}
                serverValidationErrors={emailFormValidationErrors}
              />
            </Col>
          </Row>

          <hr />

          <Row>
            <Col md='5'>
              <h5>
                <Trans i18nKey='userProfile.photo'>Photo</Trans>
              </h5>
              <p className='text-muted'>
                <Trans i18nKey='userProfile.photoDescription'>
                  This is the photo of you that other users in the system will be able to see.
                </Trans>
              </p>
            </Col>
            <Col>
              <UpdateProfilePictureForm onSubmit={onSubmitNewProfilePicture} />
              <Button
                className='mt-3'
                variant='danger'
                disabled={!profilePictureIsDefined()}
                onClick={handleDeleteProfilePicture}
              >
                <Trans i18nKey='delete'>Delete</Trans>
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
              <h5>
                <Trans i18nKey='userProfile.changePassword'>Change Password</Trans>
              </h5>
              <p className='text-muted'>
                <Trans i18nKey='userProfile.changePasswordDescription'>
                  Password must be 8 characters or more. Password must contain a lowercase, uppercase, special
                  character, and a number.
                </Trans>
              </p>
            </Col>
            <Col>
              <ChangePasswordForm
                onSubmit={onChangePasswordFormSubmit}
                serverValidationErrors={passwordFormValidationErrors}
              />
            </Col>
          </Row>
        </>
      ) : (
        ''
      )}
    </SmallContainer>
  );
};
