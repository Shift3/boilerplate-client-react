import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import Form from 'react-bootstrap/Form';
import * as yup from 'yup';
import { Constants } from 'utils/constants';
import { ButtonWrapper } from 'common/styles/button';
import Button, { ButtonProps } from 'react-bootstrap/Button';
import styled from 'styled-components';

const BootstrapButton: FC<ButtonProps> = ({ children, ...rest }) => <Button {...rest}>{children}</Button>;

const StyledSubmitButton = styled(BootstrapButton)`
  color: ${props => props.theme.buttons.submitTextColor};
  background-color: ${props => props.theme.buttons.submitBackgroundColor};
  border-color: ${props => props.theme.buttons.submitBorderColor};
  min-width: 146px;
  min-height: 24px;
  padding: 10px;
  margin: 0;
`;

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

export const LogInForm: FC<Props> = ({ onSubmit }) => {
  const {
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    register,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  return (
    <Form data-testid='loginForm' onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label htmlFor='email'>Email</Form.Label>
        <Form.Control
          id='email'
          type='email'
          {...register('email')}
          placeholder='Enter email'
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.email?.message}
        </Form.Control.Feedback>
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
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.password?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <ButtonWrapper>
        <StyledSubmitButton type='submit' disabled={!isValid || isSubmitting} className='btn btn-primary mr-1'>
          {isSubmitting && <span className='spinner-border spinner-border-sm mr-1'/>}
          LOG IN
        </StyledSubmitButton>
      </ButtonWrapper>
    </Form>
  );
};
