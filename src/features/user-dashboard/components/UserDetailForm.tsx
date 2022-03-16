import { yupResolver } from '@hookform/resolvers/yup';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { CustomSelect } from 'common/components';
import { FormServerError } from 'common/components/FormServerError/FormServerError';
import { LoadingButton } from 'common/components/LoadingButton';
import WithUnsavedChangesPrompt from 'common/components/WithUnsavedChangesPrompt';
import { Role, User, RoleOption } from 'common/models';
import { FC } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

export type FormData = Pick<User, 'email' | 'firstName' | 'lastName' | 'profilePicture' | 'role'>;

export interface Props {
  availableRoles: Role[];
  defaultValues?: Partial<FormData>;
  submitButtonLabel?: string;
  onSubmit: (data: FormData) => void;
  submissionError: FetchBaseQueryError | null;
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
  submissionError
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
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues,
  });

  return (
    <WithUnsavedChangesPrompt when={isDirty && !(isSubmitting || isSubmitted)}>
      <Form name='create-user-form' onSubmit={handleSubmit(onSubmit)}>
        <h5>Profile</h5>
        <Row className='mb-2'>
          <Col>
            <Form.Group controlId='create-user-form-first-name'>
              <Form.Label>First Name</Form.Label>
              <Form.Control type='text' {...register('firstName')} isInvalid={!!errors.firstName} />
              <Form.Control.Feedback type='invalid'>{errors.firstName?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <h5>Profile</h5>
          <Row className='mb-2'>
            <Col>
              <Form.Group controlId='create-user-form-first-name'>
                <Form.Label>First Name</Form.Label>
                <Form.Control type='text' {...register('firstName')} isInvalid={!!errors.firstName} />
                <Form.Control.Feedback type='invalid'>{errors.firstName?.message}</Form.Control.Feedback>
                <FormServerError fieldName='firstName' serverError={submissionError} />
              </Form.Group>
            </Col>

            <Col>
              <Form.Group controlId='create-user-form-last-name'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type='text' {...register('lastName')} isInvalid={!!errors.lastName} />
                <Form.Control.Feedback type='invalid'>{errors.lastName?.message}</Form.Control.Feedback>
                <FormServerError fieldName='lastName' serverError={submissionError} />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group controlId='create-user-form-email'>
            <Form.Label>Email</Form.Label>
            <Form.Control type='email' {...register('email')} isInvalid={!!errors.email} />
            <Form.Control.Feedback type='invalid'>{errors.email?.message}</Form.Control.Feedback>
            <FormServerError fieldName='email' serverError={submissionError} />
          </Form.Group>

          <Form.Group className='mb-2' controlId='create-user-form-role'>
            <Form.Label>Role</Form.Label>
            <Controller
              control={control}
              name='role'
              render={({ field: { onChange } }) => (
                <CustomSelect<RoleOption>
                  placeholder='Select a role...'
                  defaultValue={{ label: defaultValues?.role?.toString() || "", value: defaultValues?.role || Role.USER }}
                  options={options}
                  onChange={option => onChange(option.value)}
                  isInvalid={!!errors.role}
                />
              )}
            />
            <Form.Control.Feedback type='invalid'>{errors.role?.message}</Form.Control.Feedback>
            <FormServerError fieldName='role' serverError={submissionError} />
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
