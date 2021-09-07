import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { StyledCancelButton, StyledFormButtonWrapper, StyledSubmitButton } from './styled';

export interface CreateUserFormData {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  agency: string;
}

export interface CreateUserFormProps {
  onCancel: () => void;
  onSubmit: (data: CreateUserFormData) => void;
}

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required.'),
  lastName: yup.string().required('Last Name is required.'),
  email: yup.string().required('Email is required.'),
  role: yup.string().required('Role is required.'),
  angency: yup.string().required('Agency is required.'),
});

export const CreateUserForm: FC<CreateUserFormProps> = ({ onSubmit, onCancel }) => {
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
          {...register('role')}
          isInvalid={!!errors.role}
        />
        <option>Admin</option>
        <option>Editor</option>
        <option>Users</option>
        <Form.Control.Feedback type='invalid'>{errors.role?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Agency</Form.Label>
        <Form.Control
          id='agency'
          as='select'
          custom
          aria-label='Select User Agency'
          {...register('agency')}
          isInvalid={!!errors.agency}
        />
        <option>Main</option>
        <option>Public</option>
        <Form.Control.Feedback type='invalid'> {errors.agency?.message}</Form.Control.Feedback>
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
