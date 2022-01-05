import { FC, useEffect } from 'react';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import { Constants } from 'utils/constants';
import { ButtonWrapper, SubmitButton } from 'common/styles/button';
import { Prompt } from 'react-router-dom';

export type FormData = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type Props = {
  onSubmit: (data: FormData) => void;
};

const schema: yup.SchemaOf<FormData> = yup.object().shape({
  oldPassword: yup.string().required(Constants.errorMessages.CURRENT_PASSWORD_REQUIRED),

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

export const ChangePasswordForm: FC<Props> = ({ onSubmit }) => {
  const {
    formState: { errors, isValid },
    handleSubmit,
    control,
    register,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const { isDirty } = useFormState({control});

  // Trigger validation on first render.
  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <Form name='change-password-form' onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className='position-relative'>
        <Form.Label htmlFor='currentPassword'>Current Password</Form.Label>
        <Form.Control
          id='currentPassword'
          type='password'
          placeholder='Enter current password'
          isInvalid={!!errors.oldPassword}
          {...register('oldPassword')}
        />
        {!!errors.oldPassword && (
          <Form.Control.Feedback type='invalid' role='alert'>
            {errors.oldPassword?.message}
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
      <ButtonWrapper>
        <SubmitButton type='submit' disabled={!isValid}>
          SUBMIT
        </SubmitButton>
      </ButtonWrapper>
      <Prompt when={isDirty} message="There are unsaved changes, would you still like to leave?" />
    </Form>
  );
};
