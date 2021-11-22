import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import { Constants } from 'utils/constants';
import { ButtonWrapper, CancelButton, StyledForm, SubmitButton } from 'features/styles/PageStyles';

export type FormData = {
  email: string;
  password: string;
};

type Props = {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
};

const schema: yup.SchemaOf<FormData> = yup.object().shape({
  email: yup.string().required(Constants.errorMessages.EMAIL_REQUIRED).email(Constants.errorMessages.INVALID_EMAIL),
  password: yup.string().required(Constants.errorMessages.PASSWORD_REQUIRED),
});

export const LoginForm: FC<Props> = ({ onSubmit, onCancel }) => {
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className='mb-4'>
        <Form.Label htmlFor='email'>Email</Form.Label>
        <Form.Control
          id='email'
          type='email'
          {...register('email')}
          placeholder='Enter email'
          isInvalid={!!errors.email}
        />
        {errors.email && (
          <Form.Control.Feedback type='invalid' role='alert'>
            {errors.email.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='password'>Password</Form.Label>
        <Form.Control
          id='password'
          type='password'
          {...register('password')}
          placeholder='Enter password'
          isInvalid={!!errors.password}
        />
        {errors.password && (
          <Form.Control.Feedback type='invalid' role='alert'>
            {errors.password.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <ButtonWrapper>
        <CancelButton onClick={onCancel}>CANCEL</CancelButton>
        <SubmitButton type='submit' disabled={!isValid}>
          LOG IN
        </SubmitButton>
      </ButtonWrapper>
    </StyledForm>
  );
};
