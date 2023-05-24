import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from 'common/components/LoadingButton';
import WithUnsavedChangesPrompt from 'common/components/WithUnsavedChangesPrompt';
import { addServerErrors } from 'common/error/utilities';
import { ServerValidationErrors } from 'common/models';
import { FC, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Constants } from 'utils/constants';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export type FormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

type Props = {
  onSubmit: (data: FormData) => void;
  serverValidationErrors: ServerValidationErrors<FormData> | null;
};

export const ChangePasswordForm: FC<Props> = ({ onSubmit, serverValidationErrors }) => {
  const { t } = useTranslation(['translation', 'common']);

  const schema: yup.SchemaOf<FormData> = yup.object().shape({
    currentPassword: yup.string().required(t(Constants.validationMessages.currentPasswordRequired, { ns: 'common' })!),

    newPassword: yup
      .string()
      .required(t(Constants.validationMessages.newPasswordRequired, { ns: 'common' })!)
      .min(Constants.passwordMinLength, t(Constants.validationMessages.passwordLength, { ns: 'common' })!)
      .matches(Constants.patterns.LOWERCASE_REGEX, t(Constants.validationMessages.passwordLowercase, { ns: 'common' })!)
      .matches(Constants.patterns.UPPERCASE_REGEX, t(Constants.validationMessages.passwordUppercase, { ns: 'common' })!)
      .matches(
        Constants.patterns.SYMBOL_REGEX,
        t(Constants.validationMessages.passwordSpecialCharacter, { ns: 'common' })!,
      )
      .matches(Constants.patterns.DIGIT_REGEX, t(Constants.validationMessages.passwordNumber, { ns: 'common' })!)
      .notOneOf([yup.ref('currentPassword')], t(Constants.validationMessages.passwordMustMismatch, { ns: 'common' })!),

    confirmPassword: yup
      .string()
      .required(t(Constants.validationMessages.confirmPasswordRequired, { ns: 'common' })!)
      .oneOf([yup.ref('newPassword')], t(Constants.validationMessages.passwordMustMatch, { ns: 'common' })!),
  });

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
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='currentPassword'>{t('changePasswordPage.currentPassword')}</Form.Label>
          <Form.Control
            id='currentPassword'
            type='password'
            placeholder={t('changePasswordPage.currentPasswordPlaceholder')!}
            isInvalid={!!errors.currentPassword}
            {...register('currentPassword')}
          />
          {!!errors.currentPassword && (
            <Form.Control.Feedback type='invalid' role='alert'>
              {errors.currentPassword?.message}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className='mb-2'>
          <Form.Label htmlFor='newPassword'>{t('changePasswordPage.newPassword')}</Form.Label>
          <Form.Control
            id='newPassword'
            type='password'
            placeholder={t('changePasswordPage.newPasswordPlaceholder')!}
            isInvalid={!!errors.newPassword}
            {...register('newPassword')}
          />
          {!!errors.newPassword && (
            <Form.Control.Feedback type='invalid' role='alert'>
              {errors.newPassword?.message}
            </Form.Control.Feedback>
          )}
          <Form.Text className='text-muted'>{t('changePasswordPage.passwordRequirements')}</Form.Text>
        </Form.Group>

        <Form.Group className='mb-2'>
          <Form.Label htmlFor='confirmPassword'>{t('changePasswordPage.confirmPassword')}</Form.Label>
          <Form.Control
            id='confirmPassword'
            type='password'
            placeholder={t('changePasswordPage.confirmPasswordPlaceholder')!}
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
          <LoadingButton type='submit' disabled={!isValid} loading={isSubmitting}>
            {t('changePasswordPage.changeMyPassword')}
          </LoadingButton>
        </div>
      </Form>
    </WithUnsavedChangesPrompt>
  );
};
