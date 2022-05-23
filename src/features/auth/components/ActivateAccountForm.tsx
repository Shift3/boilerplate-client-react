import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from 'common/components/LoadingButton';
import { FC } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Constants } from 'utils/constants';
import * as yup from 'yup';

export type FormData = {
  password: string;
  passwordConfirmation: string;
};

type Props = {
  onSubmit: (data: FormData) => void;
};

const schema: yup.SchemaOf<FormData> = yup.object().shape({
  password: yup
    .string()
    .required(Constants.errorMessages.NEW_PASSWORD_REQUIRED)
    .min(8, Constants.errorMessages.PASSWORD_LENGTH)
    .matches(Constants.patterns.LOWERCASE_REGEX, Constants.errorMessages.PASSWORD_LOWERCASE)
    .matches(Constants.patterns.UPPERCASE_REGEX, Constants.errorMessages.PASSWORD_UPPERCASE)
    .matches(Constants.patterns.SYMBOL_REGEX, Constants.errorMessages.PASSWORD_SPECIAL_CHARACTER)
    .matches(Constants.patterns.DIGIT_REGEX, Constants.errorMessages.PASSWORD_NUMBER),

  passwordConfirmation: yup
    .string()
    .required(Constants.errorMessages.CONFIRM_PASSWORD_REQUIRED)
    .oneOf([yup.ref('password')], Constants.errorMessages.PASSWORD_MUST_MATCH),
});

export const ActivateAccountForm: FC<Props> = ({ onSubmit }) => {
  const {
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    register,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label htmlFor='password'>New Password</Form.Label>
        <Form.Control
          id='password'
          type='password'
          {...register('password')}
          placeholder='Enter new password'
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.password?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='passwordConfirmation'>Confirm Password</Form.Label>
        <Form.Control
          id='passwordConfirmation'
          type='password'
          {...register('passwordConfirmation')}
          placeholder='Confirm password'
          isInvalid={!!errors.passwordConfirmation}
        />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.passwordConfirmation?.message}
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
