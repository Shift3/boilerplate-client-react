import { FC, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Constants } from 'utils/constants';
import { LoadingButton } from 'common/components/LoadingButton';
import { addServerErrors } from 'common/error/utilities';
import { ServerValidationErrors } from 'common/models';

export type UserEmailFormData = {
  email: string;
};

type Props = {
  onSubmit: (data: UserEmailFormData) => void;
  defaultValues?: Partial<UserEmailFormData>;
  serverValidationErrors: ServerValidationErrors<UserEmailFormData> | null;
};

export const UpdateUserEmailForm: FC<Props> = ({ onSubmit, defaultValues, serverValidationErrors }) => {
  const schema: yup.SchemaOf<UserEmailFormData> = yup.object().shape({
    email: yup
      .string()
      .required(Constants.errorMessages.EMAIL_REQUIRED)
      .email(Constants.errorMessages.INVALID_EMAIL)
      .notOneOf([defaultValues?.email], Constants.errorMessages.SAME_EMAIL),
  });

  const {
    formState: { errors, isValid, isSubmitting, isSubmitSuccessful },
    handleSubmit,
    register,
    reset,
    getValues,
    setError,
  } = useForm<UserEmailFormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues,
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(getValues());
    }
    if (serverValidationErrors) {
      addServerErrors(serverValidationErrors, setError);
    }
  }, [reset, isSubmitSuccessful, getValues, serverValidationErrors, setError]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Control id='email' type='email' {...register('email')} isInvalid={!!errors.email} />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <div className='mt-3'>
        <LoadingButton type='submit' as={Button} disabled={!isValid} loading={isSubmitting}>
          Change my Email
        </LoadingButton>
      </div>
    </Form>
  );
};
