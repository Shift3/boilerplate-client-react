import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from 'common/components/LoadingButton';
import { FC } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Constants } from 'utils/constants';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export type FormData = {
  password: string;
  passwordConfirmation: string;
};

type Props = {
  onSubmit: (data: FormData) => void;
};

export const ActivateAccountForm: FC<Props> = ({ onSubmit }) => {
  const { t } = useTranslation(['translation', 'common']);

  const schema: yup.SchemaOf<FormData> = yup.object().shape({
    password: yup
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

    passwordConfirmation: yup
      .string()
      .required(t(Constants.validationMessages.confirmPasswordRequired, { ns: 'common' })!)
      .oneOf([yup.ref('password')], t(Constants.validationMessages.passwordMustMatch, { ns: 'common' })!),
  });

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
        <Form.Label htmlFor='password'>{t('changePasswordPage.newPassword')}</Form.Label>
        <Form.Control
          id='password'
          type='password'
          {...register('password')}
          placeholder={t('changePasswordPage.newPasswordPlaceholder')!}
          isInvalid={!!errors.password}
        />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.password?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='passwordConfirmation'>{t('changePasswordPage.confirmPassword')}</Form.Label>
        <Form.Control
          id='passwordConfirmation'
          type='password'
          {...register('passwordConfirmation')}
          placeholder={t('changePasswordPage.confirmPasswordPlaceholder')!}
          isInvalid={!!errors.passwordConfirmation}
        />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.passwordConfirmation?.message}
        </Form.Control.Feedback>
        <Form.Text>{t('changePasswordPage.passwordRequirements')}</Form.Text>
      </Form.Group>
      <div className='d-grid gap-2 mt-3'>
        <LoadingButton type='submit' disabled={!isValid} loading={isSubmitting}>
          {t('submit', { ns: 'common' })}
        </LoadingButton>
      </div>
    </Form>
  );
};
