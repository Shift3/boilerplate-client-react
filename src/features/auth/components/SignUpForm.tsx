import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import { Constants } from 'utils/constants';
import { ButtonWrapper, CancelButton, SubmitButton } from 'common/styles/button';

export type FormData = {
  email: string;
  confirmEmail: string;
  firstName: string;
  lastName: string;
};
type Props = {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
};

const schema: yup.SchemaOf<FormData> = yup.object().shape({
  email: yup.string().required(Constants.errorMessages.EMAIL_REQUIRED).email(Constants.errorMessages.INVALID_EMAIL),
  confirmEmail: yup
    .string()
    .trim()
    .required(Constants.errorMessages.EMAIL_REQUIRED)
    .oneOf([yup.ref('email'), null], Constants.errorMessages.EMAIL_MATCH),
  firstName: yup.string().trim().required(Constants.errorMessages.FIRST_NAME_REQUIRED),
  lastName: yup.string().trim().required(Constants.errorMessages.LAST_NAME_REQUIRED),
});

export const SignUpForm: FC<Props> = ({ onSubmit, onCancel }) => {
  const {
    formState: { errors, isSubmitting},
    handleSubmit,
    register,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  // Trigger validation on first render.
  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label htmlFor='email'>Email</Form.Label>
        <Form.Control
          id='email'
          type='email'
          {...register('email')}
          placeholder='Enter your email'
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='confirmEmail' placeholder='Confirm email'>
          Confirm Email
        </Form.Label>
        <Form.Control
          id='confirmEmail'
          type='email'
          {...register('confirmEmail')}
          placeholder='Confirm your email'
          isInvalid={!!errors.confirmEmail}
        />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.confirmEmail?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='firstName' placeholder='Enter your first name'>
          First Name
        </Form.Label>
        <Form.Control
          id='firstName'
          type='text'
          {...register('firstName')}
          placeholder='Enter your first name'
          isInvalid={!!errors.firstName}
        />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.firstName?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='lastName' placeholder='Enter your last name'>
          Last Name
        </Form.Label>
        <Form.Control
          id='lastName'
          type='text'
          {...register('lastName')}
          placeholder='Enter your last name'
          isInvalid={!!errors.lastName}
        />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.lastName?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <ButtonWrapper>
        <CancelButton onClick={onCancel}>CANCEL</CancelButton>
        <SubmitButton type='submit' disabled={isSubmitting} className="btn btn-primary mr-1">
        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
          SIGN UP
        </SubmitButton>
      </ButtonWrapper>
    </Form>
  );
};
