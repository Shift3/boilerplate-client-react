import { yupResolver } from '@hookform/resolvers/yup';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { FormServerError } from 'common/components/FormServerError/FormServerError';
import { LoadingButton } from 'common/components/LoadingButton';
import WithUnsavedChangesPrompt from 'common/components/WithUnsavedChangesPrompt';
import { FC } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Constants } from 'utils/constants';
import * as yup from 'yup';

export type FormData = {
  email: string;
  confirmEmail: string;
  firstName: string;
  lastName: string;
};
type Props = {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  submissionError: FetchBaseQueryError | null;
};

const schema: yup.SchemaOf<FormData> = yup.object().shape({
  email: yup.string().required(Constants.errorMessages.EMAIL_REQUIRED).email(Constants.errorMessages.INVALID_EMAIL),
  confirmEmail: yup
    .string()
    .trim()
    .required(Constants.errorMessages.EMAIL_REQUIRED)
    .oneOf([yup.ref('email'), null], Constants.errorMessages.EMAIL_MATCH),
  firstName: yup.string().trim().required(Constants.errorMessages.FIRST_NAME_REQUIRED),
  lastName: yup.string().trim().required(Constants.errorMessages.LAST_NAME_REQUIRED),
});

export const SignUpForm: FC<Props> = ({ onSubmit, submissionError }) => {
  const {
    formState: { errors, isDirty, isSubmitting, isSubmitted, isValid },
    handleSubmit,
    register,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  return (
    <WithUnsavedChangesPrompt when={isDirty && !(isSubmitting || isSubmitted)}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Form.Group as={Col}>
            <Form.Label htmlFor='firstName' placeholder='Enter your first name'>
              First Name
            </Form.Label>
            <Form.Control
              id='firstName'
              type='text'
              {...register('firstName')}
              placeholder='First Name'
              isInvalid={!!errors.firstName}
            />
            <Form.Control.Feedback type='invalid' role='alert'>
              {errors.firstName?.message}
            </Form.Control.Feedback>
            <FormServerError fieldName='firstName' serverError={submissionError} />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label htmlFor='lastName' placeholder='Enter your last name'>
              Last Name
            </Form.Label>
            <Form.Control
              id='lastName'
              type='text'
              {...register('lastName')}
              placeholder='Last Name'
              isInvalid={!!errors.lastName}
            />
            <Form.Control.Feedback type='invalid' role='alert'>
              {errors.lastName?.message}
            </Form.Control.Feedback>
            <FormServerError fieldName='lastName' serverError={submissionError} />
          </Form.Group>
        </Row>

        <Form.Group>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            id='email'
            type='email'
            {...register('email')}
            placeholder='Enter your Email'
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type='invalid' role='alert'>
            {errors.email?.message}
          </Form.Control.Feedback>
          <FormServerError fieldName='email' serverError={submissionError} />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor='confirmEmail' placeholder='Confirm email'>
            Confirm Email
          </Form.Label>
          <Form.Control
            id='confirmEmail'
            type='email'
            {...register('confirmEmail')}
            placeholder='Confirm your Email'
            isInvalid={!!errors.confirmEmail}
          />
          <Form.Control.Feedback type='invalid' role='alert'>
            {errors.confirmEmail?.message}
          </Form.Control.Feedback>
          <FormServerError fieldName='confirmEmail' serverError={submissionError} />
        </Form.Group>

        <div className='d-grid gap-2 mt-4'>
          <LoadingButton type='submit' as={Button} disabled={!isValid} loading={isSubmitting}>
            Register
          </LoadingButton>
        </div>
      </Form>
    </WithUnsavedChangesPrompt>
  );
};
