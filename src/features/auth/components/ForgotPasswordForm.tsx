import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from 'common/components/LoadingButton';
import { addServerErrors } from 'common/error/utilities';
import { ServerValidationErrors } from 'common/models';
import { FC, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Constants } from 'utils/constants';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export type FormData = {
  email: string;
};

type Props = {
  onSubmit: (data: FormData) => void;
  serverValidationErrors: ServerValidationErrors<FormData> | null;
};

export const ForgotPasswordForm: FC<Props> = ({ onSubmit, serverValidationErrors }) => {
  const { t } = useTranslation(['translation', 'common']);

  const schema: yup.SchemaOf<FormData> = yup.object().shape({
    email: yup
      .string()
      .required(t(Constants.validationMessages.emailRequired, { ns: 'common' })!)
      .email(t(Constants.validationMessages.invalidEmail, { ns: 'common' })!),
  });

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
        <Form.Label htmlFor='email'>{t('email', { ns: 'common' })}</Form.Label>
        <Form.Control
          id='email'
          type='email'
          {...register('email')}
          placeholder={t('email', { ns: 'common' })!}
          isInvalid={!!errors.email}
        />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.email?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <div className='d-grid gap-2 mt-3'>
        <LoadingButton type='submit' disabled={!isValid} loading={isSubmitting}>
          {t('submit', { ns: 'common' })}
        </LoadingButton>
      </div>
    </Form>
  );
};
