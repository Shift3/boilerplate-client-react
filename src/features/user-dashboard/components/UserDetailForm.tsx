import { yupResolver } from '@hookform/resolvers/yup';
import { CustomSelect } from 'common/components';
import FormPrompt from 'common/components/FormPrompt';
import { LoadingButton } from 'common/components/LoadingButton';
import { Agency, Role, User } from 'common/models';
import { FC } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

export type FormData = Pick<User, 'email' | 'firstName' | 'lastName' | 'profilePicture' | 'role' | 'agency'>;

export interface Props {
  availableRoles: Role[];
  availableAgencies: Agency[];
  defaultValues?: Partial<FormData>;
  submitButtonLabel?: string;
  onSubmit: (data: FormData) => void;
  onAgencySelectScrollToBottom: () => void;
}

const schema = yup.object({
  firstName: yup.string().required('First Name is required.'),
  lastName: yup.string().required('Last Name is required.'),
  email: yup.string().email().required('Email is required.'),
  role: yup.object({
    roleName: yup.string().required('Role is required.'),
  }),
  agency: yup.object({
    agencyName: yup.string().required('Agency is required.'),
  }),
});

export const UserDetailForm: FC<Props> = ({
  availableRoles,
  availableAgencies,
  defaultValues = {},
  onSubmit,
  onAgencySelectScrollToBottom,
  submitButtonLabel = 'Submit',
}) => {
  const {
    control,
    formState: { errors, isValid, isDirty, isSubmitting },
    handleSubmit,
    register,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues,
  });

  return (
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

        <Col>
          <Form.Group controlId='create-user-form-last-name'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control type='text' {...register('lastName')} isInvalid={!!errors.lastName} />
            <Form.Control.Feedback type='invalid'>{errors.lastName?.message}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group controlId='create-user-form-email'>
        <Form.Label>Email</Form.Label>
        <Form.Control type='email' {...register('email')} isInvalid={!!errors.email} />
        <Form.Control.Feedback type='invalid'>{errors.email?.message}</Form.Control.Feedback>
      </Form.Group>

      <h5 className='mt-3'>Access Information</h5>

      <Form.Group className='mb-2' controlId='create-user-form-role'>
        <Form.Label>Role</Form.Label>
        <Controller
          control={control}
          name='role'
          render={({ field: { onChange } }) => (
            <CustomSelect<Role>
              placeholder='Select a role...'
              defaultValue={defaultValues.role}
              options={availableRoles}
              getOptionLabel={role => role.roleName}
              getOptionValue={role => role.roleName}
              onChange={onChange}
              isInvalid={!!errors.role}
            />
          )}
        />
        <Form.Control.Feedback type='invalid'>{errors.role?.roleName?.message}</Form.Control.Feedback>
      </Form.Group>

      {availableAgencies.length > 0 && (
        <Form.Group>
          <Form.Label>Agency</Form.Label>
          <Controller
            control={control}
            name='agency'
            render={({ field: { onChange } }) => (
              <CustomSelect<Agency>
                placeholder='Select an agency...'
                defaultValue={defaultValues.agency}
                options={availableAgencies}
                getOptionLabel={agency => agency.agencyName}
                getOptionValue={agency => agency.agencyName}
                onScrollToBottom={onAgencySelectScrollToBottom}
                onChange={onChange}
                isInvalid={!!errors.agency}
              />
            )}
          />
          <Form.Control.Feedback type='invalid'>{errors.agency?.agencyName?.message}</Form.Control.Feedback>
        </Form.Group>
      )}
      <div className='mt-3'>
        <LoadingButton type='submit' as={Button} disabled={!isValid} loading={isSubmitting}>
          {submitButtonLabel}
        </LoadingButton>
      </div>
      <FormPrompt isDirty={isDirty} isSubmitting={isSubmitting} />
    </Form>
  );
};
