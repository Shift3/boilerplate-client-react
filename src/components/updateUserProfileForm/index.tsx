import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { UpdateUserProfileFormSchema } from './schema';
import { UpdateUserProfileFormProps } from './types';

const StyledForm = styled(Form)`
  background-color: ${(props) => props.theme.primary};
  padding: 40px;
  border-radius: 5px;
  width: 450px;
`;

const Title = styled.div`
  color: ${(props) => props.theme.cardHeader};
  font-size: 2em;
  font-style: bold;
  padding-bottom: 10px;
`;

const FormLabel = styled(Form.Label)`
  color: white;
`;

const InputError = styled.span`
  color: lightgrey;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 10px;
`;

const CancelButton = styled(Button)`
  color: white;
  background-color: ${(props) => props.theme.primary};
  border: 1px solid #679daa;
  margin-right: 20px;
`;

const SubmitButton = styled(Button)`
  color: white;
  background-color: ${(props) => props.theme.accent};
`;

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
