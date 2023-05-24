import { yupResolver } from '@hookform/resolvers/yup';
import { CustomSelect } from 'common/components/CustomSelect';
import { LoadingButton } from 'common/components/LoadingButton';
import WithUnsavedChangesPrompt from 'common/components/WithUnsavedChangesPrompt';
import { addServerErrors } from 'common/error/utilities';
import { Role, User, RoleOption, ServerValidationErrors } from 'common/models';
import { FC, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Trans, useTranslation } from 'react-i18next';
import { Constants } from 'utils/constants';

export type FormData = Pick<User, 'email' | 'firstName' | 'lastName' | 'role'>;

export interface Props {
  availableRoles: Role[];
  defaultValues?: Partial<FormData>;
  submitButtonLabel?: string;
  onSubmit: (data: FormData) => void;
  serverValidationErrors: ServerValidationErrors<FormData> | null;
}

export const UserDetailForm: FC<Props> = ({
  availableRoles,
  defaultValues = {},
  onSubmit,
  submitButtonLabel = 'Submit',
  serverValidationErrors,
}) => {
  const { t } = useTranslation(['translation', 'common']);

  const options: RoleOption[] = [];
  availableRoles.forEach(role => {
    options.push({ label: t(role.toLocaleLowerCase(), { ns: 'common' }), value: role });
  });

  const schema = yup.object({
    firstName: yup.string().required(t(Constants.validationMessages.firstNameRequired, { ns: 'common' })!),
    lastName: yup.string().required(t(Constants.validationMessages.lastNameRequired, { ns: 'common' })!),
    email: yup
      .string()
      .email()
      .required(t(Constants.validationMessages.emailRequired, { ns: 'common' })!),
    role: yup.string().required(t(Constants.validationMessages.roleRequired, { ns: 'common' })!),
  });

  const {
    control,
    formState: { errors, isValid, isDirty, isSubmitting, isSubmitted },
    handleSubmit,
    register,
    setError,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues,
  });

  useEffect(() => {
    if (serverValidationErrors) {
      addServerErrors(serverValidationErrors, setError);
    }
  }, [serverValidationErrors, setError]);

  return (
    <WithUnsavedChangesPrompt when={isDirty && !(isSubmitting || isSubmitted)}>
      <Form name='create-user-form' onSubmit={handleSubmit(onSubmit)}>
        <h5>
          <Trans i18nKey='userDetail.heading'>Profile</Trans>
        </h5>
        <Row className='mb-2'>
          <Col xs={12} md={6}>
            <Form.Group controlId='create-user-form-first-name'>
              <Form.Label>{t('firstName', { ns: 'common' })}</Form.Label>
              <Form.Control
                type='text'
                {...register('firstName')}
                placeholder={t('firstNamePlaceholder', { ns: 'common' })!}
                isInvalid={!!errors.firstName}
              />
              <Form.Control.Feedback type='invalid'>{errors.firstName?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId='create-user-form-last-name'>
              <Form.Label>{t('lastName', { ns: 'common' })}</Form.Label>
              <Form.Control
                type='text'
                {...register('lastName')}
                placeholder={t('lastNamePlaceholder', { ns: 'common' })!}
                isInvalid={!!errors.lastName}
              />
              <Form.Control.Feedback type='invalid'>{errors.lastName?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId='create-user-form-email'>
          <Form.Label>{t('email', { ns: 'common' })}</Form.Label>
          <Form.Control
            type='email'
            {...register('email')}
            placeholder={t('emailPlaceholder', { ns: 'common' })!}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type='invalid'>{errors.email?.message}</Form.Control.Feedback>
        </Form.Group>
        <h5 className='mt-3'>
          <Trans i18nKey='userDetail.accessHeading'>Access Information</Trans>
        </h5>
        <Form.Group className='mb-2' controlId='create-user-form-role'>
          <Form.Label>{t('role', { ns: 'common' })}</Form.Label>
          <Controller
            control={control}
            name='role'
            render={({ field: { onChange } }) => (
              <CustomSelect<RoleOption>
                placeholder={t('userDetail.selectRole')!}
                defaultValue={{ label: defaultValues?.role?.toString() || '', value: defaultValues?.role || Role.USER }}
                options={options}
                onChange={option => onChange(option.value)}
                isInvalid={!!errors.role}
              />
            )}
          />
          <Form.Control.Feedback type='invalid'>{errors.role?.message}</Form.Control.Feedback>
          <Form.Text className='text-muted'>
            <Trans i18nKey="userDetail.roleInfo">For more info regarding roles...</Trans>
          </Form.Text>
        </Form.Group>

        <div className='mt-3'>
          <LoadingButton type='submit' disabled={!isValid} loading={isSubmitting}>
            {submitButtonLabel}
          </LoadingButton>
        </div>
      </Form>
    </WithUnsavedChangesPrompt>
  );
};
