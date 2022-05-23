import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import { Constants } from 'utils/constants';
import { LoadingButton } from 'common/components/LoadingButton';
import WithUnsavedChangesPrompt from 'common/components/WithUnsavedChangesPrompt';

export type FormData = {
  newPassword: string;
  confirmPassword: string;
};

type Props = {
  onSubmit: (data: FormData) => void;
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

export const ResetPasswordForm: FC<Props> = ({ onSubmit }) => {
  const {
    formState: { errors, isDirty, isSubmitting, isSubmitted, isValid },
    handleSubmit,
    register,
    trigger,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <WithUnsavedChangesPrompt when={isDirty && !(isSubmitting || isSubmitted)}>
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
