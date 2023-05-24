import { faCamera, faContactCard, faGear, faLanguage, faUnlockKeyhole } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { handleApiError, isFetchBaseQueryError } from 'common/api/handleApiError';
import {
  ChangePasswordRequest,
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useResendChangeEmailVerificationEmailMutation,
} from 'common/api/userApi';
import { LoadingButton } from 'common/components/LoadingButton';
import { LoadingSpinner } from 'common/components/LoadingSpinner';
import { isObject } from 'common/error/utilities';
import { ServerValidationErrors } from 'common/models';
import * as notificationService from 'common/services/notification';
import { PageHeader } from 'common/styles/page';
import { useAuth } from 'features/auth/hooks';
import { UserProfileImg } from 'features/navbar/components/UserProfilePicture';
import { useTheme } from 'features/themes/useTheme';
import {
  ChangePasswordForm,
  FormData as ForgotPasswordFormData,
} from 'features/user-dashboard/components/ChangePasswordForm';
import {
  useCancelChangeEmailRequest,
  useChangeEmailRequest,
  useDeleteProfilePicture,
  useUpdateProfilePicture,
  useUpdateUserProfile,
} from 'features/user-profile/hooks';
import { languages } from 'i18n/config';
import { FC, useRef, useState } from 'react';
import {
  Alert,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Form,
  Modal,
  Nav,
  OverlayTrigger,
  Row,
  Tooltip,
} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Trans, useTranslation } from 'react-i18next';
import { useModal } from 'react-modal-hook';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Constants } from 'utils/constants';
import { UpdateUserEmailForm, UserEmailFormData } from '../components/UpdateUserEmailForm';
import { ProfileFormData, UpdateUserProfileForm } from '../components/UpdateUserProfileForm';

type RouteParams = {
  id: string;
};

const UserProfilePictureContainer = styled.div`
  position: relative;
  display: inline-block;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;

  #loading-spinner {
    position: absolute;
    padding-top: 0.15rem;
    text-align: center;
    height: 100%;
    width: 100%;
  }

  svg {
    visibility: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    z-index: 1;
    opacity: 0;
    transition: 0.3s all ease-in-out;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: black;
    opacity: 0;
    overflow: hidden;
    transition: 0.3s all ease-in-out;
  }

  &:hover {
    cursor: pointer;

    &:after {
      opacity: 0.4;
    }

    svg {
      visibility: visible;
      opacity: 1;
    }
  }
`;

export const ProfileNav = styled(Nav).attrs({ className: 'flex-column' })`
  margin-bottom: 1rem;
  margin-right: 1rem;

  a {
    margin-bottom: 0.5rem;
    color: ${props => props.theme.textColor};
    padding: 0.5rem 1rem;
    border-radius: ${props => props.theme.borderRadius};

    &.active {
      font-weight: 600;
      background: ${props => props.theme.nav.link.activeBackground};
      color: ${props => props.theme.nav.link.activeText};
    }
  }
`;

export const UserProfilePage: FC = () => {
  const { id = '' } = useParams<RouteParams>();
  const { user } = useAuth();
  const inputFile = useRef<HTMLInputElement>(null!);
  const [resendChangeEmailVerificationEmail, { isLoading: isResendingChangeEmail }] =
    useResendChangeEmailVerificationEmailMutation();
  const { cancelChangeEmailRequest, isLoading: isCancelingChangeEmail } = useCancelChangeEmailRequest();
  const [forgotPassword, { isLoading: isLoadingForgotPassword }] = useForgotPasswordMutation();
  const { updateUserProfile } = useUpdateUserProfile();
  const { changeEmailRequest } = useChangeEmailRequest();
  const { updateUserProfilePicture, isLoading: isLoadingUpdateProfilePicture } = useUpdateProfilePicture();
  const { deleteUserProfilePicture, isLoading: isLoadingDeleteProfilePicture } = useDeleteProfilePicture();
  const [changePassword] = useChangePasswordMutation();
  const [tab, setTab] = useState('settings');
  const [passwordFormValidationErrors, setPasswordFormValidationErrors] =
    useState<ServerValidationErrors<ForgotPasswordFormData> | null>(null);
  const { t, i18n } = useTranslation(['translation', 'common']);
  const { toggleTheme, theme } = useTheme();

  const onSubmit = async (formData: ProfileFormData) => {
    const data = { id, ...formData };

    await updateUserProfile(data);
  };

  const handleResendChangeEmailVerificationEmail = async () => {
    try {
      await resendChangeEmailVerificationEmail({ id });
      notificationService.showSuccessMessage(t('userProfile.changeEmailVerificationSent'));
    } catch (error) {
      if (isFetchBaseQueryError(error)) {
        handleApiError(error);
      } else {
        notificationService.showErrorMessage(t('userProfile.unableToSendChangeEmailVerification'));
        throw error;
      }
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
      notificationService.showSuccessMessage(t('userProfile.passwordUpdated'));
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

  const resetPassword = async () => {
    await forgotPassword({ email: user!.email });
    notificationService.showSuccessMessage(t('userProfile.passwordInstructionsSent'));
  };

  const onProfileImageChange = async (e: React.BaseSyntheticEvent) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0]);
    await updateUserProfilePicture({ id: user!.id, profilePicture: formData });
    e.target.value = '';
  };

  const [emailFormValidationErrors, setEmailFormValidationErrors] =
    useState<ServerValidationErrors<UserEmailFormData> | null>(null);
  const [showModal, hideModal] = useModal(
    ({ in: open, onExited }) => {
      const onSubmitRequestEmailChange = async (formData: UserEmailFormData) => {
        const data = { id, ...formData };
        try {
          await changeEmailRequest(data);
          hideModal();
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

      return (
        <Modal
          show={open}
          onHide={() => {
            hideModal();
          }}
          onExited={onExited}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>{t('userProfile.changeMyEmail')}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{t('userProfile.changeMyEmailDescription')}</p>
            <UpdateUserEmailForm
              onSubmit={onSubmitRequestEmailChange}
              serverValidationErrors={emailFormValidationErrors}
            />
          </Modal.Body>
        </Modal>
      );
    },
    [emailFormValidationErrors, setEmailFormValidationErrors],
  );

  const changeLanguage = (ln: string) => {
    localStorage.setItem('language', ln);
    i18n.changeLanguage(ln);
  };

  const __languageOptions = languages.map(language => {
    return { label: language.label, value: language.shortcode };
  });

  const defaultLanguageOption = __languageOptions.find(language => language.value === i18n.languages[0]);

  return (
    <Container>
      <PageHeader className='mb-4'>
        <div className='d-flex'>
          <div>
            <h1>
              <Trans i18nKey='userProfile.heading'>Account Settings</Trans>
            </h1>
            <p className='text-muted'>
              <Trans i18nKey='userProfile.subheading'>Update your account and profile settings here.</Trans>
            </p>
          </div>
        </div>
      </PageHeader>

      <Row>
        <Col md={3}>
          <ProfileNav defaultActiveKey='/home'>
            <ProfileNav.Link onClick={() => setTab('settings')} className={tab === 'settings' ? 'active' : ''}>
              <FontAwesomeIcon className='me-2' icon={faGear} />
              <Trans i18nKey='userProfile.settings'>App Settings</Trans>
            </ProfileNav.Link>
            <ProfileNav.Link onClick={() => setTab('profile')} className={tab === 'profile' ? 'active' : ''}>
              <FontAwesomeIcon className='me-2' icon={faContactCard} />
              <Trans i18nKey='userProfile.profile'>Profile</Trans>
            </ProfileNav.Link>
            <ProfileNav.Link onClick={() => setTab('security')} className={tab === 'security' ? 'active' : ''}>
              <FontAwesomeIcon className='me-2' icon={faUnlockKeyhole} />
              <Trans i18nKey='userProfile.security'>Security and Password</Trans>
            </ProfileNav.Link>
          </ProfileNav>
        </Col>

        <Col>
          {tab === 'settings' ? (
            <>
              <Row>
                <Col md={6}>
                  <Card className='mb-4'>
                    <Card.Body>
                      <div>
                        <h5>
                          <Trans i18nKey='userProfile.themeHeading'>Theme Preference</Trans>
                        </h5>
                        <div className=''>
                          <p className='text-muted'>{t('userProfile.themeSubheading')}</p>
                          <Form>
                            <Form.Check
                              type='switch'
                              id='witch'
                              label={t('userProfile.darkMode')}
                              checked={theme === 'dark'}
                              onChange={() => toggleTheme()}
                            />
                          </Form>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={6}>
                  <Card className='mb-4'>
                    <Card.Body>
                      <div>
                        <h5>
                          <Trans i18nKey='userProfile.languagePreference'>Language Preference</Trans>
                        </h5>
                        <div className='language'>
                          <p className='text-muted'>{t('userProfile.languageSubheading')}</p>
                          <DropdownButton
                            title={
                              <>
                                <FontAwesomeIcon className='me-2' size='lg' icon={faLanguage} />
                                {defaultLanguageOption?.label}
                              </>
                            }
                            className='me-3'
                          >
                            {__languageOptions.map(option => (
                              <Dropdown.Item key={option.value} onClick={() => changeLanguage(option.value)}>
                                {option.label}
                              </Dropdown.Item>
                            ))}
                          </DropdownButton>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          ) : (
            ''
          )}
          {tab === 'profile' ? (
            <>
              <Row>
                <Col md={8}>
                  <Card className='mb-4'>
                    <Card.Body>
                      <h5>
                        <Trans i18nKey='userProfile.generalHeading'>General Information</Trans>
                      </h5>
                      <p className='text-muted'>{t('userProfile.generalSubheading')}</p>
                      <UpdateUserProfileForm
                        onSubmit={onSubmit}
                        defaultValues={{
                          firstName: user?.firstName ?? '',
                          lastName: user?.lastName ?? '',
                        }}
                      />
                    </Card.Body>
                  </Card>

                  <Card className='mb-4'>
                    <Card.Body>
                      <h5>
                        <Trans i18nKey='userProfile.changeEmail'>Change Email Address</Trans>
                      </h5>

                      {user!.newEmail ? (
                        <Alert variant='warning'>
                          <div>
                            <p data-testid='updateUserExistingEmailChangeInfoContent'>
                              <Trans i18nKey='userProfile.changeEmailDescription' values={{ email: user!.email }}>
                                You requested an email change. To confirm your new email, please follow the directions
                                in the verification email.
                              </Trans>
                            </p>
                            <LoadingButton
                              loading={isResendingChangeEmail}
                              variant='warning'
                              data-testid='resendVerificationEmailButton'
                              onClick={handleResendChangeEmailVerificationEmail}
                            >
                              <Trans i18nKey='userProfile.resendEmail'>Resend Verification Email</Trans>
                            </LoadingButton>
                            <LoadingButton
                              onClick={() => cancelChangeEmailRequest()}
                              loading={isCancelingChangeEmail}
                              className='ms-2'
                              variant='default'
                            >
                              {t('userProfile.cancelRequest')}
                            </LoadingButton>
                          </div>
                        </Alert>
                      ) : (
                        <>
                          <p className='text-muted'>
                            <Trans i18nKey='userProfile.emailDescription' values={{ email: user!.email }}>
                              Your email address on record will be used to communicate with you.
                            </Trans>
                          </p>

                          <Button onClick={() => showModal()} variant='default'>
                            {t('userProfile.changeMyEmail')}
                          </Button>
                        </>
                      )}
                    </Card.Body>
                  </Card>
                </Col>

                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <h5>
                        <Trans i18nKey='userProfile.photo'>Profile Photo</Trans>
                      </h5>
                      <p className='text-muted'>
                        <Trans i18nKey='userProfile.photoDescription'>
                          This is the photo of you that other users in the system will be able to see.
                        </Trans>
                      </p>

                      <div className='d-flex align-items-center justify-content-center flex-column'>
                        <div className='mt-3 mb-3'>
                          <OverlayTrigger overlay={<Tooltip>{t('userProfile.uploadPhoto')}</Tooltip>}>
                            <UserProfilePictureContainer
                              onClick={() => !isLoadingUpdateProfilePicture && inputFile.current.click()}
                            >
                              {isLoadingUpdateProfilePicture && <LoadingSpinner />}
                              {!isLoadingUpdateProfilePicture && (
                                <FontAwesomeIcon role='button' icon={faCamera} color='white' size='lg' />
                              )}
                              <UserProfileImg user={user!} size='md' />
                            </UserProfilePictureContainer>
                          </OverlayTrigger>
                        </div>

                        <div className='w-100 d-grid gap-2'>
                          <input
                            hidden
                            ref={inputFile}
                            type='file'
                            accept={Constants.SUPPORTED_PROFILE_PICTURE_FORMATS.join(',')}
                            onChange={e => onProfileImageChange(e)}
                          />

                          <LoadingButton
                            variant='danger'
                            loading={isLoadingDeleteProfilePicture}
                            disabled={!profilePictureIsDefined()}
                            onClick={handleDeleteProfilePicture}
                          >
                            {t('userProfile.deletePhoto')}
                          </LoadingButton>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </>
          ) : (
            ''
          )}

          {tab === 'security' ? (
            <Row>
              <Col md={8}>
                <Card>
                  <Card.Body>
                    <h5>
                      <Trans i18nKey='userProfile.changePassword'>Change my Password</Trans>
                    </h5>
                    <p className='text-muted'>
                      <Trans i18nKey='userProfile.changePasswordDescription'>
                        Change your password by entering your current password, as well as your new password.
                      </Trans>
                    </p>
                    <ChangePasswordForm
                      onSubmit={onChangePasswordFormSubmit}
                      serverValidationErrors={passwordFormValidationErrors}
                    />
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card>
                  <Card.Body>
                    <h5>{t('userProfile.forgotPassword')}</h5>
                    <p className='text-muted'>{t('userProfile.forgotPasswordInstructions')}</p>
                    <LoadingButton loading={isLoadingForgotPassword} onClick={() => resetPassword()} variant='default'>
                      {t('userProfile.resetMyPassword')}
                    </LoadingButton>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          ) : (
            ''
          )}
        </Col>
      </Row>
    </Container>
  );
};
