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
import { Trans } from 'react-i18next';
import styled from 'styled-components';
import { useModalWithData } from 'common/hooks/useModalWithData';
import { SimpleConfirmModal } from 'common/components/SimpleConfirmModal';
import * as notificationService from 'common/services/notification';
import { useDisableUserMutation, useEnableUserMutation } from 'common/api/userApi';
import { handleApiError, isFetchBaseQueryError } from 'common/api/handleApiError';

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
  onSubmit: (data: FormData) => void;
  serverValidationErrors: ServerValidationErrors<FormData> | null;
}

const schema = yup.object({
  firstName: yup.string().required('First Name is required.'),
  lastName: yup.string().required('Last Name is required.'),
  email: yup.string().email().required('Email is required.'),
  role: yup.string().required('Role is required.'),
});

export const UserDetailForm: FC<Props> = ({
  availableRoles,
  defaultValues = {},
  onSubmit,
  submitButtonLabel = 'Submit',
  serverValidationErrors,
}) => {
  const options: RoleOption[] = [];
  availableRoles.forEach(role => {
    options.push({ label: role, value: role });
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
              // add Error message for enabling user.
              notificationService.showErrorMessage('Could not disable user.');
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

  // what's left to do
  // the button should have 3 states:
  //   create user - don't show button
  //   user is disabled - enable user
  //   user is enabled - disable user

  return (
    <WithUnsavedChangesPrompt when={isDirty && !(isSubmitting || isSubmitted)}>
      <Form name='create-user-form' onSubmit={handleSubmit(onSubmit)}>
        <h5>
          <Trans i18nKey='userDetail.heading'>Profile</Trans>
        </h5>
        <Row className='mb-2'>
          <Col xs={12} md={6}>
            <Form.Group controlId='create-user-form-first-name'>
              <Form.Label>
                <Trans i18nKey='userDetail.firstName'>First Name</Trans>
              </Form.Label>
              <Form.Control type='text' {...register('firstName')} isInvalid={!!errors.firstName} />
              <Form.Control.Feedback type='invalid'>{errors.firstName?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId='create-user-form-last-name'>
              <Form.Label>
                <Trans i18nKey='userDetail.lastName'>Last Name</Trans>
              </Form.Label>
              <Form.Control type='text' {...register('lastName')} isInvalid={!!errors.lastName} />
              <Form.Control.Feedback type='invalid'>{errors.lastName?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId='create-user-form-email'>
          <Form.Label>
            <Trans i18nKey='userDetail.email'>Email</Trans>
          </Form.Label>
          <Form.Control type='email' {...register('email')} isInvalid={!!errors.email} />
          <Form.Control.Feedback type='invalid'>{errors.email?.message}</Form.Control.Feedback>
        </Form.Group>
        <h5 className='mt-3'>
          <Trans i18nKey='userDetail.accessHeading'>Access Information</Trans>
        </h5>
        <Form.Group className='mb-2' controlId='create-user-form-role'>
          <Form.Label>
            <Trans i18nKey='role'>Role</Trans>
          </Form.Label>
          <Controller
            control={control}
            name='role'
            render={({ field: { onChange } }) => (
              <CustomSelect<RoleOption>
                placeholder='Select a role...'
                defaultValue={{
                  label: defaultValues?.role?.toString() || '',
                  value: defaultValues?.role || Role.USER,
                }}
                options={options}
                onChange={option => onChange(option.value)}
                isInvalid={!!errors.role}
              />
            )}
          />
          <Form.Control.Feedback type='invalid'>{errors.role?.message}</Form.Control.Feedback>
          <Form.Text className='text-muted'>
            For more information about the different roles and what they can do, see our <a href='#'>FAQ</a>
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
