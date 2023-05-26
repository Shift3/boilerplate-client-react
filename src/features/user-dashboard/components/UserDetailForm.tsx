import { yupResolver } from '@hookform/resolvers/yup';
import { CustomSelect } from 'common/components/CustomSelect';
import { LoadingButton } from 'common/components/LoadingButton';
import WithUnsavedChangesPrompt from 'common/components/WithUnsavedChangesPrompt';
import { addServerErrors } from 'common/error/utilities';
import { Role, User, RoleOption, ServerValidationErrors } from 'common/models';
import { FC, useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import styled from 'styled-components';
import { useModalWithData } from 'common/hooks/useModalWithData';
import { SimpleConfirmModal } from 'common/components/SimpleConfirmModal';
import * as notificationService from 'common/services/notification';
import { useDisableUserMutation, useEnableUserMutation } from 'common/api/userApi';
import { handleApiError, isFetchBaseQueryError } from 'common/api/handleApiError';
import { Trans, useTranslation } from 'react-i18next';
import { Constants } from 'utils/constants';

const DisableButton = styled(Button)`
  margin-left: 100px;
  .spinner-container {
    padding-right: 8px;
  }
`;

export type DisableUserRequest = {
  id: string;
};

export type FormData = Pick<User, 'email' | 'firstName' | 'lastName' | 'role' | 'id' | 'isActive'>;

export interface Props {
  availableRoles: Role[];
  defaultValues?: Partial<FormData>;
  submitButtonLabel?: string;
  isRoleSelectorDisabled?: boolean;
  onSubmit: (data: FormData) => void;
  serverValidationErrors: ServerValidationErrors<FormData> | null;
}

export const UserDetailForm: FC<Props> = ({
  availableRoles,
  defaultValues = {},
  onSubmit,
  submitButtonLabel = 'Submit',
  serverValidationErrors,
}) => {
  const { t } = useTranslation(['translation', 'common']);

  const options: RoleOption[] = [];
  availableRoles.forEach(role => {
    options.push({ label: t(role.toLocaleLowerCase(), { ns: 'common' }), value: role });
  });

  const schema = yup.object({
    firstName: yup.string().required(t(Constants.validationMessages.firstNameRequired, { ns: 'common' })!),
    lastName: yup.string().required(t(Constants.validationMessages.lastNameRequired, { ns: 'common' })!),
    email: yup
      .string()
      .email()
      .required(t(Constants.validationMessages.emailRequired, { ns: 'common' })!),
    role: yup.string().required(t(Constants.validationMessages.roleRequired, { ns: 'common' })!),
  });

  const {
    control,
    formState: { errors, isValid, isDirty, isSubmitting, isSubmitted },
    handleSubmit,
    register,
    setError,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues,
  });

  useEffect(() => {
    if (serverValidationErrors) {
      addServerErrors(serverValidationErrors, setError);
    }
  }, [serverValidationErrors, setError]);

  const [disableUser] = useDisableUserMutation();
  const [enableUser] = useEnableUserMutation();

  const [showDisableModal, hideDisableModal] = useModalWithData<User>(
    user =>
      // eslint-disable-next-line react/no-unstable-nested-components
      ({ in: open, onExited }) => {
        const onSubmit = async () => {
          try {
            if (user.isActive) {
              await disableUser({ id: user.id }).unwrap();
              notificationService.showSuccessMessage('User disabled.');
            } else {
              await enableUser({ id: user.id }).unwrap();
              notificationService.showSuccessMessage('User enabled.');
            }

            hideDisableModal();
          } catch (error) {
            if (isFetchBaseQueryError(error)) {
              handleApiError(error);
            } else {
              if (user.isActive) {
                notificationService.showErrorMessage('Could not disable user.');
              } else {
                notificationService.showErrorMessage('Could not enable user.');
              }
              throw error;
            }
          }
        };

        return (
          <SimpleConfirmModal
            title={user.isActive ? 'Disable User' : 'Enable User'}
            show={open}
            onCancel={hideDisableModal}
            onConfirm={onSubmit}
            confirmLabel={user.isActive ? 'Disable User' : 'Enable User'}
            confirmVariant='danger'
            onExited={onExited}
            body={
              <div>
                <p className='m-0'>
                  {user.isActive
                    ? 'Are you sure you want to disable this user?'
                    : 'Are you sure you want to enable this user?'}
                </p>
              </div>
            }
          />
        );
      },
    [],
  );

  return (
    <WithUnsavedChangesPrompt when={isDirty && !(isSubmitting || isSubmitted)}>
      <Form name='create-user-form' onSubmit={handleSubmit(onSubmit)}>
        <h5>
          <Trans i18nKey='userDetail.heading'>Profile</Trans>
        </h5>
        <Row className='mb-2'>
          <Col xs={12} md={6}>
            <Form.Group controlId='create-user-form-first-name'>
              <Form.Label>{t('firstName', { ns: 'common' })}</Form.Label>
              <Form.Control
                type='text'
                {...register('firstName')}
                placeholder={t('firstNamePlaceholder', { ns: 'common' })!}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type='invalid'>{errors.firstName?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId='create-user-form-last-name'>
              <Form.Label>{t('lastName', { ns: 'common' })}</Form.Label>
              <Form.Control
                type='text'
                {...register('lastName')}
                placeholder={t('lastNamePlaceholder', { ns: 'common' })!}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type='invalid'>{errors.lastName?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId='create-user-form-email'>
          <Form.Label>{t('email', { ns: 'common' })}</Form.Label>
          <Form.Control
            type='email'
            {...register('email')}
            placeholder={t('emailPlaceholder', { ns: 'common' })!}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type='invalid'>{errors.email?.message}</Form.Control.Feedback>
        </Form.Group>
        <h5 className='mt-3'>
          <Trans i18nKey='userDetail.accessHeading'>Access Information</Trans>
        </h5>
        <Form.Group className='mb-2' controlId='create-user-form-role'>
          <Form.Label>{t('role', { ns: 'common' })}</Form.Label>
          <Controller
            control={control}
            name='role'
            render={({ field: { onChange } }) => (
              <CustomSelect<RoleOption>
                placeholder={t('userDetail.selectRole')!}
                defaultValue={{ label: defaultValues?.role?.toString() || '', value: defaultValues?.role || Role.USER }}
                options={options}
                onChange={option => onChange(option.value)}
                isInvalid={!!errors.role}
              />
            )}
          />
          <Form.Control.Feedback type='invalid'>{errors.role?.message}</Form.Control.Feedback>
          <Form.Text className='text-muted'>
            <Trans i18nKey='userDetail.roleInfo'>For more info regarding roles...</Trans>
          </Form.Text>
        </Form.Group>

        <div className='mt-3 d-flex justify-content-between'>
          <div>
            <LoadingButton type='submit' disabled={!isValid} loading={isSubmitting}>
              {submitButtonLabel}
            </LoadingButton>
          </div>
          <div>
            {defaultValues.id ? (
              <DisableButton onClick={() => showDisableModal(defaultValues as User)} variant='btn btn-danger'>
                {defaultValues.isActive ? 'Disable' : 'Enable'}
              </DisableButton>
            ) : null}
          </div>
        </div>
      </Form>
    </WithUnsavedChangesPrompt>
  );
};
