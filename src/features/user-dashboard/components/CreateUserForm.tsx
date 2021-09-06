import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { CreateUserFormProps } from '../../../components/createUserForm/types';
import { StyledCancelButton, StyledFormButtonWrapper, StyledSubmitButton } from '../user-dashboard/components/styled';

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required.'),
});

export const CreateUserForm: FC<CreateUserFormProps> = ({ onSubmit, onCancel }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm<CreateUserFormData>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId='create-user-form-name'>
        <Form.Label>First Name</Form.Label>
        <Form.Control type='text' {...register('firstName')} isInvaolid={!!errors.firstName} />
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
      <StyledFormButtonWrapper>
        <StyledCancelButton onClick={onCancel}>CANCEL</StyledCancelButton>
        <StyledSubmitButton type='submit' disabled={!isValid}>
          SUBMIT
        </StyledSubmitButton>
      </StyledFormButtonWrapper>
    </Form>
  );
};
