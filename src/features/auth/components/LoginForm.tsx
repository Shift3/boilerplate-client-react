import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from 'common/components/LoadingButton';
import { FC, useState } from 'react';
import { Button, InputGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Constants } from 'utils/constants';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export type FormData = {
  email: string;
  password: string;
};

type Props = {
  onSubmit: (data: FormData) => void;
};

const ForgotPassword = styled.div`
  text-align: right !important;
  margin-top: 0.5rem;
  a {
    text-decoration: none;
  }
`;

const TogglePasswordButton = styled(Button)`
  border-top-right-radius: ${props => props.theme.borderRadius} !important;
  border-bottom-right-radius: ${props => props.theme.borderRadius} !important;
  border: 1px solid #ced4da !important;
`;

export const LogInForm: FC<Props> = ({ onSubmit }) => {
  const { t } = useTranslation(['translation', 'common']);

  const schema: yup.SchemaOf<FormData> = yup.object().shape({
    email: yup
      .string()
      .required(t(Constants.validationMessages.emailRequired, { ns: 'common' })!)
      .email(t(Constants.validationMessages.invalidEmail, { ns: 'common' })!),
    password: yup.string().required(t(Constants.validationMessages.passwordRequired, { ns: 'common' })!),
  });

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
        <Form.Label htmlFor='email'>{t('email', { ns: 'common' })}</Form.Label>
        <Form.Control
          id='email'
          type='email'
          {...register('email')}
          placeholder={t('emailPlaceholder', { ns: 'common' })!}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='password'>{t('password', { ns: 'common' })}</Form.Label>
        <InputGroup>
          <Form.Control
            id='password'
            {...register('password')}
            type={showingPassword ? 'text' : 'password'}
            placeholder={t('passwordPlaceholder', { ns: 'common' })!}
            isInvalid={!!errors.password}
          />
          <TogglePasswordButton
            variant='default'
            onClick={() => setShowingPassword(!showingPassword)}
            aria-label={showingPassword ? 'Hide password' : 'Display password'}
          >
            <FontAwesomeIcon icon={showingPassword ? faEyeSlash : faEye} />
          </TogglePasswordButton>
          <Form.Control.Feedback type='invalid' role='alert'>
            {errors.password?.message}
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <ForgotPassword>
        <small>
          <Link to='/auth/forgot-password'>{t('userProfile.forgotPassword')}</Link>
        </small>
      </ForgotPassword>
      <div className='d-grid gap-2 mt-3'>
        <LoadingButton type='submit' disabled={!isValid} loading={isSubmitting}>
          {t('logIn', { ns: 'common' })}
        </LoadingButton>
      </div>
    </Form>
  );
};
