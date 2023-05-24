import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from 'common/components/LoadingButton';
import WithUnsavedChangesPrompt from 'common/components/WithUnsavedChangesPrompt';
import { addServerErrors } from 'common/error/utilities';
import { Farm, ServerValidationErrors } from 'common/models';
import { FC, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Controller, useForm } from 'react-hook-form';

import PhoneInput from 'react-phone-input-2';

import { Constants } from 'utils/constants';
import { stateList } from 'utils/states';
import * as yup from 'yup';

import 'react-phone-input-2/lib/plain.css';

import { useTranslation } from 'react-i18next';

// This funkery is needed due to a build issue with vite.
// TODO: Fix this issue with react-phone-input-2
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PhoneInputComponent = (PhoneInput as any).default ? (PhoneInput as any).default : PhoneInput;

export type FormData = Pick<
  Farm,
  | 'name'
  | 'email'
  | 'description'
  | 'phoneNumber'
  | 'address1'
  | 'address2'
  | 'city'
  | 'state'
  | 'zipCode'
  | 'thumbnail'
>;

export type Props = {
  defaultValues?: FormData;
  submitButtonLabel?: string;
  cancelButtonLabel?: string;
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  serverValidationErrors: ServerValidationErrors<FormData> | null;
};

const isBlank = (val: string) => !val || !val.trim();
const notBlank = (val: string) => !isBlank(val);

export const FarmDetailForm: FC<Props> = ({
  defaultValues = {} as FormData,
  onSubmit,
  submitButtonLabel = 'Submit',
  serverValidationErrors,
}) => {
  const { t } = useTranslation(['translation', 'common']);

  // We use the non-null assertion operator (!) to indicate that the value returned by t() will always be a non-null string.
  const schema = yup.object().shape({
    name: yup.string().required(t(Constants.validationMessages.nameRequired, { ns: 'common' })!),
    email: yup
      .string()
      .email()
      .required(t(Constants.validationMessages.emailRequired, { ns: 'common' })!),
    description: yup.string().required(t(Constants.validationMessages.descriptionRequired, { ns: 'common' })!),
    phoneNumber: yup
      .string()
      .matches(Constants.patterns.US_PHONE_REGEX, {
        message: t(Constants.validationMessages.phoneNumberInvalid, { ns: 'common' })!,
        excludeEmptyString: true,
      })
      .required(t(Constants.validationMessages.phoneNumberRequired, { ns: 'common' })!),
    thumbnail: yup.string(),
    address1: yup.string().optional(),
    address2: yup.string().optional(),
    city: yup.string().when('address1', {
      is: notBlank,
      then: yup.string().required(t(Constants.validationMessages.cityRequired, { ns: 'common' })!),
    }),
    state: yup.string().when('address1', {
      is: notBlank,
      then: yup.string().required(t(Constants.validationMessages.stateRequired, { ns: 'common' })!),
    }),
    zipCode: yup.string().when('address1', {
      is: notBlank,
      then: yup.string().required(t(Constants.validationMessages.zipCodeRequired, { ns: 'common' })!),
    }),
  });

  const {
    register,
    formState: { errors, isValid, isDirty, isSubmitting, isSubmitted },
    handleSubmit,
    control,
    setError,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      ...defaultValues,
      state: defaultValues?.state ?? '',
      phoneNumber:
        defaultValues.phoneNumber && defaultValues.phoneNumber !== '' ? defaultValues.phoneNumber.substring(2) : '',
    },
  });

  useEffect(() => {
    if (serverValidationErrors) {
      addServerErrors(serverValidationErrors, setError);
    }
  }, [serverValidationErrors, setError]);

  return (
    <WithUnsavedChangesPrompt when={isDirty && !(isSubmitting || isSubmitted)}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h5>{t('farmDetail.farmInfo')}</h5>
        <Row className='mb-2'>
          <Col md={4}>
            <Form.Group controlId='create-farm-form-farm-name'>
              <Form.Label>{t('name', { ns: 'common' })}</Form.Label>
              <Form.Control
                type='text'
                {...register('name')}
                placeholder={t('farmDetail.namePlaceholder')!}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type='invalid'>{errors.name?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>{t('email', { ns: 'common' })}</Form.Label>
              <Form.Control
                type='email'
                {...register('email')}
                placeholder={t('farmDetail.emailPlaceholder')!}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type='invalid'>{errors.email?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group className='mb-2'>
              <Form.Label>{t('phoneNumber', { ns: 'common' })}</Form.Label>
              <Controller
                name='phoneNumber'
                control={control}
                render={({ field }) => (
                  <PhoneInputComponent
                    value={field.value}
                    onlyCountries={['us']}
                    country='us'
                    onEnterKeyPress={handleSubmit(onSubmit)}
                    containerClass={`${errors.phoneNumber ? 'is-invalid' : ''}`}
                    inputClass={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                    placeholder='(702) 123-4567'
                    disableCountryCode
                    disableDropdown
                    specialLabel=''
                    onChange={field.onChange}
                  />
                )}
              />
              <Form.Control.Feedback type='invalid'>{errors.phoneNumber?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group>
          <Form.Label>{t('description', { ns: 'common' })}</Form.Label>
          <Form.Control as='textarea' {...register('description')} isInvalid={!!errors.description} />
          <Form.Control.Feedback type='invalid'>{errors.description?.message}</Form.Control.Feedback>
        </Form.Group>

        <h5 className='mt-3'>{t('address', { ns: 'common' })}</h5>

        <Row>
          <Col md={6}>
            <Form.Group className='mb-2'>
              <Form.Label>{t('address', { ns: 'common' })}</Form.Label>
              <Form.Control type='text' {...register('address1')} isInvalid={!!errors.address1} />
              <Form.Control.Feedback type='invalid'>{errors.address1?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className='mb-2'>
              <Form.Label>{t('address2', { ns: 'common' })}</Form.Label>
              <Form.Control
                type='text'
                {...register('address2')}
                isValid={!!errors.address2}
                disabled={isBlank('address1')}
              />
              <Form.Control.Feedback type='invalid'>{errors.address2?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <Form.Group>
              <Form.Label>{t('city', { ns: 'common' })}</Form.Label>
              <Form.Control type='text' {...register('city')} isInvalid={!!errors.city} />
              <Form.Control.Feedback type='invalid'>{errors.city?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>{t('state', { ns: 'common' })}</Form.Label>
              <Form.Select {...register('state')} isInvalid={!!errors.state}>
                {stateList.map(({ name, value }) => (
                  <option key={value} value={value}>
                    {name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.state?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={4}>
            <Form.Group>
              <Form.Label>{t('zipcode', { ns: 'common' })}</Form.Label>
              <Form.Control type='text' {...register('zipCode')} isInvalid={!!errors.zipCode} />
              <Form.Control.Feedback type='invalid'>{errors.zipCode?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <div className='mt-3'>
          <LoadingButton type='submit' disabled={!isValid} loading={isSubmitting}>
            {submitButtonLabel}
          </LoadingButton>
        </div>
      </Form>
    </WithUnsavedChangesPrompt>
  );
};
