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

export type FormData = Pick<User, 'email' | 'firstName' | 'lastName' | 'role'>;

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
                defaultValue={{ label: defaultValues?.role?.toString() || '', value: defaultValues?.role || Role.USER }}
                options={options}
                onChange={option => onChange(option.value)}
                isInvalid={!!errors.role}
              />
            )}
          />
          <Form.Control.Feedback type='invalid'>{errors.role?.message}</Form.Control.Feedback>
        </Form.Group>

        <div className='mt-3'>
          <LoadingButton type='submit' as={Button} disabled={!isValid} loading={isSubmitting}>
            {submitButtonLabel}
          </LoadingButton>
        </div>
      </Form>
    </WithUnsavedChangesPrompt>
  );
};
