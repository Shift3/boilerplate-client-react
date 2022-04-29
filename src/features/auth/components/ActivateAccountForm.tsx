import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from 'common/components/LoadingButton';
import { addServerErrors } from 'common/error/utilities';
import { ServerValidationErrors } from 'common/models';
import { FC, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Constants } from 'utils/constants';
import * as yup from 'yup';

export type FormData = {
  newPassword: string;
  confirmPassword: string;
};

type Props = {
  onSubmit: (data: FormData) => void;
  serverValidationErrors: ServerValidationErrors<FormData> | null;
};

const schema: yup.SchemaOf<FormData> = yup.object().shape({
  newPassword: yup
    .string()
    .required(Constants.errorMessages.NEW_PASSWORD_REQUIRED)
    .min(8, Constants.errorMessages.PASSWORD_LENGTH)
    .matches(Constants.patterns.LOWERCASE_REGEX, Constants.errorMessages.PASSWORD_LOWERCASE)
    .matches(Constants.patterns.UPPERCASE_REGEX, Constants.errorMessages.PASSWORD_UPPERCASE)
    .matches(Constants.patterns.SYMBOL_REGEX, Constants.errorMessages.PASSWORD_SPECIAL_CHARACTER)
    .matches(Constants.patterns.DIGIT_REGEX, Constants.errorMessages.PASSWORD_NUMBER),

  confirmPassword: yup
    .string()
    .required(Constants.errorMessages.CONFIRM_PASSWORD_REQUIRED)
    .oneOf([yup.ref('newPassword')], Constants.errorMessages.PASSWORD_MUST_MATCH),
});

export const ActivateAccountForm: FC<Props> = ({ onSubmit, serverValidationErrors }) => {
  const {
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    register,
    setError,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  useEffect(() => {
    if (serverValidationErrors) {
      addServerErrors(serverValidationErrors, setError);
    }
  }, [serverValidationErrors, setError]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label htmlFor='newPassword'>New Password</Form.Label>
        <Form.Control
          id='newPassword'
          type='password'
          {...register('newPassword')}
          placeholder='Enter new password'
          isInvalid={!!errors.newPassword}
        />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.newPassword?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='confirmPassword'>Confirm Password</Form.Label>
        <Form.Control
          id='confirmPassword'
          type='password'
          {...register('confirmPassword')}
          placeholder='Confirm password'
          isInvalid={!!errors.confirmPassword}
        />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.confirmPassword?.message}
        </Form.Control.Feedback>
        <Form.Text>
          Password must be 8 characters or more. Password must contain a lowercase, uppercase, special character, and a
          number.
        </Form.Text>
      </Form.Group>
      <div className='d-grid gap-2 mt-3'>
        <LoadingButton type='submit' as={Button} disabled={!isValid} loading={isSubmitting}>
          Submit
        </LoadingButton>
      </div>
    </Form>
  );
};
