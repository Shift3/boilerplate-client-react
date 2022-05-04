import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from 'common/components/LoadingButton';
import { LoginButton } from 'common/styles/button';
import { FC, useState } from 'react';
import { Button, InputGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Constants } from 'utils/constants';
import * as yup from 'yup';

export type FormData = {
  email: string;
  password: string;
};

type Props = {
  onSubmit: (data: FormData) => void;
};

const schema: yup.SchemaOf<FormData> = yup.object().shape({
  email: yup.string().required(Constants.errorMessages.EMAIL_REQUIRED).email(Constants.errorMessages.INVALID_EMAIL),
  password: yup.string().required(Constants.errorMessages.PASSWORD_REQUIRED),
});

const ForgotPassword = styled.div`
  text-align: right !important;
  margin-top: 0.5rem;
  a {
    text-decoration: none;
  }
`;

const TogglePasswordButton = styled(Button)`
  border-top-right-radius: 3px !important;
  border-bottom-right-radius: 3px !important;
  border-color: #ced4da;
`;

export const LogInForm: FC<Props> = ({ onSubmit }) => {
  const {
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    register,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const [showingPassword, setShowingPassword] = useState(false);

  return (
    <Form data-testid='loginForm' onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label htmlFor='email'>Email</Form.Label>
        <Form.Control id='email' type='email' {...register('email')} placeholder='Email' isInvalid={!!errors.email} />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='password'>Password</Form.Label>
        <InputGroup>
          <Form.Control
            id='password'
            {...register('password')}
            type={showingPassword ? 'text' : 'password'}
            placeholder='Password'
            isInvalid={!!errors.password}
          />
          <TogglePasswordButton variant='outline-secondary' onClick={() => setShowingPassword(!showingPassword)}>
            <FontAwesomeIcon icon={showingPassword ? faEyeSlash : faEye} />
          </TogglePasswordButton>
          <Form.Control.Feedback type='invalid' role='alert'>
            {errors.password?.message}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <ForgotPassword>
        <small>
          <Link to='/auth/forgot-password'>Forgot Password?</Link>
        </small>
      </ForgotPassword>
      <div className='d-grid gap-2 mt-3'>
        <LoadingButton type='submit' as={LoginButton} disabled={!isValid} loading={isSubmitting}>
          Log In
        </LoadingButton>
      </div>
    </Form>
  );
};
