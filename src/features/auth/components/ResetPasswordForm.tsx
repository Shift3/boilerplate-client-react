import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import * as yup from 'yup';
import { Constants } from 'utils/constants';
import { LoadingButton } from 'common/components/LoadingButton';
import WithUnsavedChangesPrompt from 'common/components/WithUnsavedChangesPrompt';
import { useTranslation } from 'react-i18next';

export type FormData = {
  newPassword: string;
  confirmPassword: string;
};

type Props = {
  onSubmit: (data: FormData) => void;
};

export const ResetPasswordForm: FC<Props> = ({ onSubmit }) => {
  const { t } = useTranslation(['translation', 'common']);

  const schema: yup.SchemaOf<FormData> = yup.object().shape({
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
      .matches(Constants.patterns.DIGIT_REGEX, t(Constants.validationMessages.passwordNumber, { ns: 'common' })!),

    confirmPassword: yup
      .string()
      .required(t(Constants.validationMessages.confirmPasswordRequired, { ns: 'common' })!)
      .oneOf([yup.ref('newPassword')], t(Constants.validationMessages.passwordMustMatch, { ns: 'common' })!),
  });

  const {
    formState: { errors, isDirty, isSubmitting, isSubmitted, isValid },
    handleSubmit,
    register,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  return (
    <WithUnsavedChangesPrompt when={isDirty && !(isSubmitting || isSubmitted)}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group>
          <Form.Label htmlFor='newPassword'>{t('changePasswordPage.newPassword')}</Form.Label>
          <Form.Control
            id='newPassword'
            type='password'
            {...register('newPassword')}
            placeholder={t('changePasswordPage.newPasswordPlaceholder')!}
            isInvalid={!!errors.newPassword}
          />
          <Form.Control.Feedback type='invalid' role='alert'>
            {errors.newPassword?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor='confirmPassword'>{t('changePasswordPage.confirmPassword')}</Form.Label>
          <Form.Control
            id='confirmPassword'
            type='password'
            {...register('confirmPassword')}
            placeholder={t('changePasswordPage.confirmPasswordPlaceholder')!}
            isInvalid={!!errors.confirmPassword}
          />
          <Form.Control.Feedback type='invalid' role='alert'>
            {errors.confirmPassword?.message}
          </Form.Control.Feedback>
        </Form.Group>
        <div className='mt-3'>
          <LoadingButton type='submit' disabled={!isValid} loading={isSubmitting}>
            {t('submit', { ns: 'common' })}
          </LoadingButton>
        </div>
      </Form>
    </WithUnsavedChangesPrompt>
  );
};
