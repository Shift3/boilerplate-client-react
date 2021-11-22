import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { ButtonWrapper, CancelButton, StyledForm, SubmitButton } from 'common/styles/PageStyles';
import * as yup from 'yup';
import { Constants } from 'utils/constants';

export type FormData = {
  firstName: string;
  lastName: string;
  email: string;
};

type Props = {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  defaultValues?: Partial<FormData>;
};

const schema: yup.SchemaOf<FormData> = yup.object().shape({
  firstName: yup.string().trim().required(Constants.errorMessages.FIRST_NAME_REQUIRED),
  lastName: yup.string().trim().required(Constants.errorMessages.LAST_NAME_REQUIRED),
  email: yup.string().required(Constants.errorMessages.EMAIL_REQUIRED).email(Constants.errorMessages.INVALID_EMAIL),
});

export const UpdateUserProfileForm: FC<Props> = ({ onSubmit, onCancel, defaultValues }) => {
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues,
  });

  // Trigger validation on first render.
  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label htmlFor='firstName'>First Name</Form.Label>
        <Form.Control id='firstName' type='text' {...register('firstName')} isInvalid={!!errors.firstName} />
        {errors.firstName && (
          <Form.Control.Feedback type='invalid' role='alert'>
            {errors.firstName.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='lastName'>Last Name</Form.Label>
        <Form.Control id='lastName' type='text' {...register('lastName')} isInvalid={!!errors.lastName} />
        {errors.lastName && (
          <Form.Control.Feedback type='invalid' role='alert'>
            {errors.lastName.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='email'>Email</Form.Label>
        <Form.Control id='email' type='email' {...register('email')} isInvalid={!!errors.email} />
        {errors.email && (
          <Form.Control.Feedback type='invalid' role='alert'>
            {errors.email.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <ButtonWrapper>
        <CancelButton onClick={onCancel}>CANCEL</CancelButton>
        <SubmitButton type='submit' disabled={!isValid}>
          UPDATE
        </SubmitButton>
      </ButtonWrapper>
    </StyledForm>
  );
};
