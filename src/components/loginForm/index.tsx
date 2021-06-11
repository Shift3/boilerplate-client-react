import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import { ButtonWrapper, CancelButton, Error, FieldTitle, LogInButton, StyledForm, Title } from './styled';
import { LogInFormSchema } from './schema';
import { LogInFormType } from './types';

export const LogInForm: LogInFormType = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(LogInFormSchema),
    mode: 'onChange',
  });

  return (
    <>
      <StyledForm data-testid="loginForm" onSubmit={handleSubmit(onSubmit)}>
        <Title>Member Log In</Title>
        <Form.Group>
          <FieldTitle>
            <Form.Label htmlFor="email">Email</Form.Label>
          </FieldTitle>
          <Form.Control id="email" type="email" {...register('email')} />
          <Error>{errors.email?.message && <span role="alert">{errors.email?.message}</span>}</Error>
        </Form.Group>
        <Form.Group>
          <FieldTitle>
            <Form.Label htmlFor="password">Password</Form.Label>
          </FieldTitle>
          <Form.Control id="password" type="password" {...register('password')} />
          <Error>{errors.password?.message && <span role="alert">{errors.password?.message}</span>}</Error>
        </Form.Group>
        <ButtonWrapper>
          <CancelButton data-testid="cancelButton" onClick={onCancel}>
            CANCEL
          </CancelButton>
          <LogInButton data-testid="submitButton" type="submit" disabled={!isValid}>
            LOG IN
          </LogInButton>
        </ButtonWrapper>
      </StyledForm>
    </>
  );
};
