import { yupResolver } from '@hookform/resolvers/yup';
import { Agency, Role } from 'common/models';
import { FC, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { StyledCancelButton, StyledFormButtonWrapper, StyledSubmitButton } from './styled';

export interface CreateUserFormData {
  email: string;
  firstName: string;
  lastName: string;
  profilePicture: string;
  roleName: string;
  agencyName: string;
}

export interface CreateUserFormProps {
  roles: Role[];
  agencies: Agency[];
  onCancel: () => void;
  onSubmit: (data: CreateUserFormData) => void;
}

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required.'),
  lastName: yup.string().required('Last Name is required.'),
  email: yup.string().email().required('Email is required.'),
  roleName: yup.string().required('Role is required.'),
  agencyName: yup.string().required('Agency is required.'),
});

export const CreateUserForm: FC<CreateUserFormProps> = ({ roles, agencies, onSubmit, onCancel }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    trigger,
  } = useForm<CreateUserFormData>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId='create-user-form-first-name'>
        <Form.Label>First Name</Form.Label>
        <Form.Control type='text' {...register('firstName')} isInvalid={!!errors.firstName} />
        <Form.Control.Feedback type='invalid'>{errors.firstName?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Last Name</Form.Label>
        <Form.Control type='text' {...register('lastName')} isInvalid={!!errors.lastName} />
        <Form.Control.Feedback type='invalid'>{errors.lastName?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type='email' {...register('email')} isInvalid={!!errors.email} />
        <Form.Control.Feedback type='invalid'>{errors.email?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Role</Form.Label>
        <Form.Control
          id='role'
          as='select'
          custom
          aria-label='Select User Role'
          {...register('roleName')}
          isInvalid={!!errors.roleName}
        >
          {roles.map((role) => (
            <option key={role.id} value={role.roleName}>
              {role.roleName}
            </option>
          ))}
        </Form.Control>
        <Form.Control.Feedback type='invalid'>{errors.roleName?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Agency</Form.Label>
        <Form.Control
          id='agency'
          as='select'
          custom
          aria-label='Select User Agency'
          {...register('agencyName')}
          isInvalid={!!errors.agencyName}
        >
          {agencies.map((agency) => (
            <option key={agency.id} value={agency.agencyName}>
              {agency.agencyName}
            </option>
          ))}
        </Form.Control>
        <Form.Control.Feedback type='invalid'> {errors.agencyName?.message}</Form.Control.Feedback>
      </Form.Group>
      <StyledFormButtonWrapper>
        <StyledCancelButton onClick={onCancel}>CANCEL</StyledCancelButton>
        <StyledSubmitButton type='submit' disabled={!isValid}>
          SUBMIT
        </StyledSubmitButton>
      </StyledFormButtonWrapper>
    </Form>
  );
};
