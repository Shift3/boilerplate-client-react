import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import { Constants } from 'utils/constants';
import { LoadingButton } from 'common/components/LoadingButton';
import { SubmitButton } from 'common/styles/button';

export type FormData = {
  email: string;
};

type Props = {
  onSubmit: (data: FormData) => void;
};

const schema: yup.SchemaOf<FormData> = yup.object().shape({
  email: yup.string().required(Constants.errorMessages.EMAIL_REQUIRED).email(Constants.errorMessages.INVALID_EMAIL),
});

export const ForgotPasswordForm: FC<Props> = ({ onSubmit }) => {
  const {
    formState: { errors, isValid, isSubmitting },
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
          placeholder='Enter email'
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <div className='d-grid gap-2 mt-3'>
        <LoadingButton as={SubmitButton} disabled={!isValid} loading={isSubmitting}>
          SUBMIT
        </LoadingButton>
      </div>
    </Form>
  );
};
