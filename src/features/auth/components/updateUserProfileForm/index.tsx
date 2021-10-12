import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { UpdateUserProfileFormSchema } from './schema';
import { UpdateUserProfileFormProps } from './types';
import {
  Title,
  FormLabel,
  ButtonWrapper,
  CancelButton,
  SubmitButton,
  StyledForm,
  InputError,
} from '../styles/StyledForm';

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
    <>
      <StyledForm onSubmit={handleSubmit(onSubmit)}>
        <Title>Update Profile</Title>
        <Form.Group>
          <FormLabel htmlFor='firstName'>First Name</FormLabel>
          <Form.Control id='firstName' type='text' defaultValue={defaultValues.firstName} {...register('firstName')} />
          {errors.firstName?.message && <InputError role='alert'>{errors.firstName?.message}</InputError>}
        </Form.Group>
        <Form.Group>
          <FormLabel htmlFor='lastName'>Last Name</FormLabel>
          <Form.Control id='lastName' type='text' defaultValue={defaultValues.lastName} {...register('lastName')} />
          {errors.lastName?.message && <InputError role='alert'>{errors.lastName?.message}</InputError>}
        </Form.Group>
        <Form.Group>
          <FormLabel htmlFor='email'>Email</FormLabel>
          <Form.Control id='email' type='email' defaultValue={defaultValues.email} {...register('email')} />
          {errors.email?.message && <InputError role='alert'>{errors.email?.message}</InputError>}
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
    </>
  );
};
