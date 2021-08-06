import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { CreateUserFormSchema } from './schema';
import { CreateUserFormProps } from './types';
import {
  StyledForm,
  Title,
  FormLabel,
  InputError,
  ButtonWrapper,
  CancelButton,
  SubmitButton,
} from '../../styles/components/Forms';

export const CreateUserForm: FC<CreateUserFormProps> = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(CreateUserFormSchema),
    mode: 'onChange',
  });

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Title>Create User</Title>
      <Form.Group>
        <FormLabel htmlFor='firstName'>First Name</FormLabel>
        <Form.Control id='firstName' type='text' {...register('firstName')} />
        {errors.firstName?.message && <InputError role='alert'>{errors.firstName?.message}</InputError>}
      </Form.Group>
      <Form.Group>
        <FormLabel htmlFor='lastName'>Last Name</FormLabel>
        <Form.Control id='lastName' type='text' {...register('lastName')} />
        {errors.lastName?.message && <InputError role='alert'>{errors.lastName?.message}</InputError>}
      </Form.Group>
      <Form.Group>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <Form.Control id='email' type='email' {...register('email')} />
        {errors.email?.message && <InputError role='alert'>{errors.email?.message}</InputError>}
      </Form.Group>
      <Form.Group>
        <FormLabel htmlFor='role'>Role</FormLabel>
        <Form.Control id='role' as='select' custom aria-label='Select User Role' {...register('role')}>
          <option>Admin</option>
          <option>Editor</option>
          <option>Users</option>
        </Form.Control>
        {errors.role?.message && <InputError role='alert'>{errors.role?.message}</InputError>}
      </Form.Group>
      <Form.Group>
        <FormLabel htmlFor='agency'>Agency</FormLabel>
        <Form.Control id='agency' as='select' custom aria-label='Select User Agency' {...register('agency')}>
          <option>Main</option>
          <option>Public</option>
        </Form.Control>
        {errors.agency?.message && <InputError role='alert'>{errors.agency?.message}</InputError>}
      </Form.Group>
      <ButtonWrapper>
        <CancelButton data-testid='cancelButton' onClick={onCancel}>
          CANCEL
        </CancelButton>
        <SubmitButton data-testid='submitButton' type='submit' disabled={!isValid}>
          SUBMIT
        </SubmitButton>
      </ButtonWrapper>
    </StyledForm>
  );
};
