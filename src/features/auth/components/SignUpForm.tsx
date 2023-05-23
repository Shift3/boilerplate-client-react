import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from 'common/components/LoadingButton';
import WithUnsavedChangesPrompt from 'common/components/WithUnsavedChangesPrompt';
import { addServerErrors } from 'common/error/utilities';
import { ServerValidationErrors } from 'common/models';
import { FC, useEffect } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Constants } from 'utils/constants';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export type FormData = {
  email: string;
  confirmEmail: string;
  firstName: string;
  lastName: string;
};
type Props = {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  serverValidationErrors: ServerValidationErrors<FormData> | null;
};

export const SignUpForm: FC<Props> = ({ onSubmit, serverValidationErrors }) => {
  const { t } = useTranslation(['translation', 'common']);

  const schema: yup.SchemaOf<FormData> = yup.object().shape({
    email: yup
      .string()
      .required(t(Constants.validationMessages.emailRequired, { ns: 'common' })!)
      .email(t(Constants.validationMessages.invalidEmail, { ns: 'common' })!),
    confirmEmail: yup
      .string()
      .trim()
      .required(t(Constants.validationMessages.emailRequired, { ns: 'common' })!)
      .oneOf([yup.ref('email'), null], t(Constants.validationMessages.emailMatch, { ns: 'common' })!),
    firstName: yup
      .string()
      .trim()
      .required(t(Constants.validationMessages.firstNameRequired, { ns: 'common' })!),
    lastName: yup
      .string()
      .trim()
      .required(t(Constants.validationMessages.lastNameRequired, { ns: 'common' })!),
  });

  const {
    formState: { errors, isDirty, isSubmitting, isSubmitted, isValid },
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
    <WithUnsavedChangesPrompt when={isDirty && !(isSubmitting || isSubmitted)}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Form.Group as={Col}>
            <Form.Label htmlFor='firstName' placeholder='Enter your first name'>
              {t('firstName', { ns: 'common' })}
            </Form.Label>
            <Form.Control
              id='firstName'
              type='text'
              {...register('firstName')}
              placeholder={t('firstNamePlaceholder', { ns: 'common' })!}
              isInvalid={!!errors.firstName}
            />
            <Form.Control.Feedback type='invalid' role='alert'>
              {errors.firstName?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label htmlFor='lastName' placeholder='Enter your last name'>
              {t('lastName', { ns: 'common' })}
            </Form.Label>
            <Form.Control
              id='lastName'
              type='text'
              {...register('lastName')}
              placeholder={t('lastNamePlaceholder', { ns: 'common' })!}
              isInvalid={!!errors.lastName}
            />
            <Form.Control.Feedback type='invalid' role='alert'>
              {errors.lastName?.message}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Form.Group>
          <Form.Label htmlFor='email'>{t('email', { ns: 'common' })}</Form.Label>
          <Form.Control
            id='email'
            type='email'
            {...register('email')}
            placeholder={t('emailPlaceholder', { ns: 'common' })!}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type='invalid' role='alert'>
            {errors.email?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor='confirmEmail' placeholder='Confirm email'>
            {t('confirmEmail', { ns: 'common' })}
          </Form.Label>
          <Form.Control
            id='confirmEmail'
            type='email'
            {...register('confirmEmail')}
            placeholder={t('confirmEmailPlaceholder', { ns: 'common' })!}
            isInvalid={!!errors.confirmEmail}
          />
          <Form.Control.Feedback type='invalid' role='alert'>
            {errors.confirmEmail?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <div className='d-grid gap-2 mt-4'>
          <LoadingButton type='submit' disabled={!isValid} loading={isSubmitting}>
            {t('register', { ns: 'common' })}
          </LoadingButton>
        </div>
      </Form>
    </WithUnsavedChangesPrompt>
  );
};
