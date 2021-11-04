import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { UpdateUserProfileFormSchema } from './schema';
import { UpdateUserProfileFormProps } from './types';
import { ButtonWrapper, CancelButton, SubmitButton } from 'features/styles/PageStyles';

export const UpdateUserProfileForm: FC<UpdateUserProfileFormProps> = ({ onSubmit, onCancel, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(UpdateUserProfileFormSchema),
    mode: 'all',
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label htmlFor='firstName'>First Name</Form.Label>
        <Form.Control
          id='firstName'
          type='text'
          defaultValue={defaultValues.firstName}
          {...register('firstName')}
          isInvalid={!!errors.firstName}
        />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.firstName?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='lastName'>Last Name</Form.Label>
        <Form.Control
          id='lastName'
          type='text'
          defaultValue={defaultValues.lastName}
          {...register('lastName')}
          isInvalid={!!errors.lastName}
        />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.lastName?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='email'>Email</Form.Label>
        <Form.Control
          id='email'
          type='email'
          defaultValue={defaultValues.email}
          {...register('email')}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <ButtonWrapper>
        <CancelButton onClick={onCancel}>CANCEL</CancelButton>
        <SubmitButton type='submit' disabled={!isValid}>
          UPDATE
        </SubmitButton>
      </ButtonWrapper>
    </Form>
  );
};
