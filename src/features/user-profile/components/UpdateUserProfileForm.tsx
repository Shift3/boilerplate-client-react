import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from 'common/components/LoadingButton';
import WithUnsavedChangesPrompt from 'common/components/WithUnsavedChangesPrompt';
import { FC, useEffect } from 'react';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Constants } from 'utils/constants';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

export type ProfileFormData = {
  firstName: string;
  lastName: string;
};

type Props = {
  onSubmit: (data: ProfileFormData) => void;
  defaultValues?: Partial<ProfileFormData>;
};

export const UpdateUserProfileForm: FC<Props> = ({ onSubmit, defaultValues }) => {
  const { t } = useTranslation(['translation', 'common']);

  const schema: yup.SchemaOf<ProfileFormData> = yup.object().shape({
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
    formState: { errors, isDirty, isValid, isSubmitting, isSubmitted, isSubmitSuccessful },
    handleSubmit,
    register,
    reset,
    getValues,
  } = useForm<ProfileFormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues,
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(getValues());
    }
  }, [reset, isSubmitSuccessful, getValues]);

  return (
    <WithUnsavedChangesPrompt when={isDirty && !(isSubmitting || isSubmitted)}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className='mb-2'>
          <Form.Label htmlFor='firstName'>{t('firstName', { ns: 'common' })}</Form.Label>
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
        <Form.Group>
          <Form.Label htmlFor='lastName'>{t('lastName', { ns: 'common' })}</Form.Label>
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
        <div className='mt-3'>
          <LoadingButton type='submit' disabled={!isValid} loading={isSubmitting}>
            {t('save', { ns: 'common' })}
          </LoadingButton>
        </div>
      </Form>
    </WithUnsavedChangesPrompt>
  );
};
