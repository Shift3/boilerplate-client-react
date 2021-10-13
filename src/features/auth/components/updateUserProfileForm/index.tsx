import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { UpdateUserProfileFormSchema } from './schema';
import { UpdateUserProfileFormProps } from './types';
import { ButtonWrapper, CancelButton, SubmitButton, StyledForm, Title } from '../../../styles/PageStyles';

export const UpdateUserProfileForm: FC<UpdateUserProfileFormProps> = ({ onSubmit, onCancel, defaultValues }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(UpdateUserProfileFormSchema),
    mode: 'onChange',
  });
  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Title>Update Profile</Title>
      <Form.Group>
        <Form.Label htmlFor='firstName'>First Name</Form.Label>
        <Form.Control id='firstName' type='text' defaultValue={defaultValues.firstName} {...register('firstName')} />
        <Form.Control.Feedback type='invalid'>{errors.firstName?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='lastName'>Last Name</Form.Label>
        <Form.Control id='lastName' type='text' defaultValue={defaultValues.lastName} {...register('lastName')} />
        <Form.Control.Feedback type='invalid'>{errors.lastName?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='email'>Email</Form.Label>
        <Form.Control id='email' type='email' defaultValue={defaultValues.email} {...register('email')} />
        <Form.Control.Feedback type='invalid'>{errors.email?.message}</Form.Control.Feedback>
      </Form.Group>
      <ButtonWrapper>
        <CancelButton data-testid='cancelButton' onClick={onCancel}>
          CANCEL
        </CancelButton>
        <SubmitButton data-testid='submitButton' type='submit' disabled={!isValid}>
          UPDATE
        </SubmitButton>
      </ButtonWrapper>
    </StyledForm>
  );
};
