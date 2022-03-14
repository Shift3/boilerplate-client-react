import { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Constants } from 'utils/constants';
import { LoadingButton } from 'common/components/LoadingButton';

export type UserEmailFormData = {
  email: string;
};

type Props = {
  onSubmit: (data: UserEmailFormData) => void;
  defaultValues?: Partial<UserEmailFormData>;
};

export const UpdateUserEmailForm: FC<Props> = ({ onSubmit, defaultValues }) => {
  const schema: yup.SchemaOf<UserEmailFormData> = yup.object().shape({
    email: yup
      .string()
      .required(Constants.errorMessages.EMAIL_REQUIRED)
      .email(Constants.errorMessages.INVALID_EMAIL)
      .notOneOf([defaultValues?.email], Constants.errorMessages.SAME_EMAIL),
  });

  const {
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    register,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues,
  });

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