import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from 'common/components/LoadingButton';
import WithUnsavedChangesPrompt from 'common/components/WithUnsavedChangesPrompt';
import { addServerErrors } from 'common/error/utilities';
import { ServerValidationErrors } from 'common/models';
import { FC, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Constants } from 'utils/constants';
import * as yup from 'yup';

export type FormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type Props = {
  onSubmit: (data: FormData) => void;
  serverValidationErrors: ServerValidationErrors<FormData> | null;
};

const schema: yup.SchemaOf<FormData> = yup.object().shape({
  currentPassword: yup.string().required(Constants.errorMessages.CURRENT_PASSWORD_REQUIRED),

  newPassword: yup
    .string()
    .required(Constants.errorMessages.NEW_PASSWORD_REQUIRED)
    .min(8, Constants.errorMessages.PASSWORD_LENGTH)
    .matches(Constants.patterns.LOWERCASE_REGEX, Constants.errorMessages.PASSWORD_LOWERCASE)
    .matches(Constants.patterns.UPPERCASE_REGEX, Constants.errorMessages.PASSWORD_UPPERCASE)
    .matches(Constants.patterns.SYMBOL_REGEX, Constants.errorMessages.PASSWORD_SPECIAL_CHARACTER)
    .matches(Constants.patterns.DIGIT_REGEX, Constants.errorMessages.PASSWORD_NUMBER)
    .notOneOf([yup.ref('currentPassword')], Constants.errorMessages.PASSWORD_MUST_MISMATCH),

  confirmPassword: yup
    .string()
    .required(Constants.errorMessages.CONFIRM_PASSWORD_REQUIRED)
    .oneOf([yup.ref('newPassword')], Constants.errorMessages.PASSWORD_MUST_MATCH),
});

export const ChangePasswordForm: FC<Props> = ({ onSubmit, serverValidationErrors }) => {
  const {
    formState: { errors, isDirty, isSubmitting, isSubmitted, isValid, isSubmitSuccessful },
    handleSubmit,
    register,
    reset,
    getValues,
    setError,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    if (serverValidationErrors) {
      addServerErrors(serverValidationErrors, setError);
    }
  }, [reset, isSubmitSuccessful, getValues, serverValidationErrors, setError]);

  return (
    <WithUnsavedChangesPrompt when={isDirty && !(isSubmitting || isSubmitted)}>
      <Form name='change-password-form' onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className='position-relative'>
          <Form.Label htmlFor='currentPassword'>Current Password</Form.Label>
          <Form.Control
            id='currentPassword'
            type='password'
            placeholder='Enter current password'
            isInvalid={!!errors.currentPassword}
            {...register('currentPassword')}
          />
          {!!errors.currentPassword && (
            <Form.Control.Feedback type='invalid' role='alert'>
              {errors.currentPassword?.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor='newPassword'>New Password</Form.Label>
          <Form.Control
            id='newPassword'
            type='password'
            placeholder='Enter new password'
            isInvalid={!!errors.newPassword}
            {...register('newPassword')}
          />
          {!!errors.newPassword && (
            <Form.Control.Feedback type='invalid' role='alert'>
              {errors.newPassword?.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor='confirmPassword'>Confirm Password</Form.Label>
          <Form.Control
            id='confirmPassword'
            type='password'
            placeholder='Confirm password'
            isInvalid={!!errors.confirmPassword}
            {...register('confirmPassword')}
          />
          {!!errors.confirmPassword && (
            <Form.Control.Feedback type='invalid' role='alert'>
              {errors.confirmPassword?.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>
        <div className='mt-3'>
          <LoadingButton type='submit' as={Button} disabled={!isValid} loading={isSubmitting}>
            Submit
          </LoadingButton>
        </div>
      </Form>
    </WithUnsavedChangesPrompt>
  );
};
