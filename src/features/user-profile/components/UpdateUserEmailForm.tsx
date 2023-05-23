import { FC, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Constants } from 'utils/constants';
import { LoadingButton } from 'common/components/LoadingButton';
import { addServerErrors } from 'common/error/utilities';
import { ServerValidationErrors } from 'common/models';
import { useTranslation } from 'react-i18next';

export type UserEmailFormData = {
  email: string;
};

type Props = {
  onSubmit: (data: UserEmailFormData) => void;
  defaultValues?: Partial<UserEmailFormData>;
  serverValidationErrors: ServerValidationErrors<UserEmailFormData> | null;
};

export const UpdateUserEmailForm: FC<Props> = ({ onSubmit, defaultValues, serverValidationErrors }) => {
  const { t } = useTranslation(['translation', 'common']);

  const schema: yup.SchemaOf<UserEmailFormData> = yup.object().shape({
    email: yup
      .string()
      .required(t(Constants.validationMessages.emailRequired, { ns: 'common' })!)
      .email(t(Constants.validationMessages.invalidEmail, { ns: 'common' })!)
      .notOneOf([defaultValues?.email], t(Constants.validationMessages.sameEmail, { ns: 'common' })!),
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
        <Form.Label>{t('userEmailForm.newEmail')}</Form.Label>
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
        <Form.Text>{t('userEmailForm.newEmailDescription')}</Form.Text>
      </Form.Group>
      <div className='mt-3'>
        <LoadingButton type='submit' disabled={!isValid} loading={isSubmitting}>
          {t('userEmailForm.changeMyEmail')}
        </LoadingButton>
      </div>
    </Form>
  );
};
