import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import { ButtonWrapper, CancelButton, StyledForm, SubmitButton } from 'common/styles/PageStyles';
import * as yup from 'yup';
import { Constants } from 'utils/constants';

export type FormData = {
  email: string;
};

type Props = {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
};

const schema: yup.SchemaOf<FormData> = yup.object().shape({
  email: yup.string().required(Constants.errorMessages.EMAIL_REQUIRED).email(Constants.errorMessages.INVALID_EMAIL),
});

export const ForgotPasswordForm: FC<Props> = ({ onSubmit, onCancel }) => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  // Trigger validation on first render.
  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
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
            {errors.email?.message}
          </Form.Control.Feedback>
        )}
      </Form.Group>
      <ButtonWrapper>
        <CancelButton onClick={onCancel}>CANCEL</CancelButton>
        <SubmitButton type='submit' disabled={!isValid}>
          SUBMIT
        </SubmitButton>
      </ButtonWrapper>
    </StyledForm>
  );
};
