import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from 'common/components/LoadingButton';
import { PhoneInput } from 'common/components/PhoneInput';
import WithUnsavedChangesPrompt from 'common/components/WithUnsavedChangesPrompt';
import { addServerErrors } from 'common/error/utilities';
import { Agent, ServerValidationErrors } from 'common/models';
import { FC, useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Controller, useForm } from 'react-hook-form';
import { Constants } from 'utils/constants';
import { stateList } from 'utils/states';
import * as yup from 'yup';

export type FormData = Pick<Agent, 'name' | 'email' | 'description' | 'phoneNumber' | 'address' | 'thumbnail'>;

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

const schema = yup.object().shape({
  name: yup.string().required('Name is required.'),
  email: yup.string().email().required('Email is required.'),
  description: yup.string().required('Description is required.'),
  phoneNumber: yup
    .string()
    .matches(Constants.patterns.US_PHONE_REGEX, {
      message: 'Please enter a valid 10 digit phone number.',
      excludeEmptyString: true,
    })
    .required('Phone number is required.'),
  thumbnail: yup.string(),
  address: yup.object().shape({
    address1: yup.string().optional(),
    address2: yup.string(),
    city: yup.string().when('address1', { is: notBlank, then: yup.string().required('City is required.') }),
    state: yup.string().when('address1', { is: notBlank, then: yup.string().required('State is required.') }),
    zipCode: yup.string().when('address1', { is: notBlank, then: yup.string().required('Zip code is required.') }),
  }),
});

export const AgentDetailForm: FC<Props> = ({
  defaultValues = {},
  onSubmit,
  submitButtonLabel = 'Submit',
  serverValidationErrors,
}) => {
  const {
    register,
    formState: { errors, isValid, isDirty, isSubmitting, isSubmitted },
    handleSubmit,
    trigger,
    control,
    watch,
    setError,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      ...defaultValues,
      // Make state dropdown default to empty instead of first option + Ensure that the address2 confirms to the string type requirement
      address: {
        ...defaultValues.address,
        state: defaultValues?.address?.state ?? '',
        address2: defaultValues?.address?.address2 ?? '',
      },
      // This is necessary to conform to the US_PHONE_REGEX pattern.
      phoneNumber:
        defaultValues.phoneNumber && defaultValues.phoneNumber !== '' ? defaultValues.phoneNumber.substring(2) : '',
    },
  });

  const firstAddressLine = watch('address.address1');

  /**
   * Submits agent data with either a complete address or nothing at all, to
   * prevent errors due to partial or empty address data.
   *
   * Note this relies on validation rules, which enforce filling in all address
   * fields if the first line is filled in.
   * */
  const withOptionalAddress = (data: FormData) => {
    onSubmit({
      ...data,
      address: isBlank(firstAddressLine) ? undefined : data.address,
    });
  };

  // Trigger address validation when the first line changes.
  useEffect(() => {
    trigger('address.city');
    trigger('address.state');
    trigger('address.zipCode');
  }, [trigger, firstAddressLine]);

  useEffect(() => {
    if (serverValidationErrors) {
      addServerErrors(serverValidationErrors, setError);
    }
  }, [serverValidationErrors, setError]);

  return (
    <WithUnsavedChangesPrompt when={isDirty && !(isSubmitting || isSubmitted)}>
      <Form onSubmit={handleSubmit(withOptionalAddress)}>
        <h5>Personal</h5>
        <Row className='mb-2'>
          <Col xs={12} md={6}>
            <Form.Group controlId='create-agent-form-agent-name'>
              <Form.Label>Name</Form.Label>
              <Form.Control type='text' {...register('name')} isInvalid={!!errors.name} />
              <Form.Control.Feedback type='invalid'>{errors.name?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' {...register('email')} isInvalid={!!errors.email} />
              <Form.Control.Feedback type='invalid'>{errors.email?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className='mb-2'>
          <Form.Label>Phone Number</Form.Label>
          <Controller
            name='phoneNumber'
            control={control}
            render={({ field }) => (
              <PhoneInput value={field.value ?? ''} onChange={field.onChange} invalid={!!errors.phoneNumber} />
            )}
          />
          <Form.Control.Feedback type='invalid'>{errors.phoneNumber?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control as='textarea' {...register('description')} isInvalid={!!errors.description} />
          <Form.Control.Feedback type='invalid'>{errors.description?.message}</Form.Control.Feedback>
        </Form.Group>

        <h5 className='mt-3'>Address</h5>

        <Form.Group className='mb-2'>
          <Form.Label>Address</Form.Label>
          <Form.Control type='text' {...register('address.address1')} isInvalid={!!errors.address?.address1} />
          <Form.Control.Feedback type='invalid'>{errors.address?.address1?.message}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className='mb-2'>
          <Form.Label>Address2</Form.Label>
          <Form.Control
            type='text'
            {...register('address.address2')}
            isValid={!!errors.address?.address2}
            disabled={isBlank(firstAddressLine)}
          />
          <Form.Control.Feedback type='invalid'>{errors.address?.address2?.message}</Form.Control.Feedback>
        </Form.Group>

        <Row>
          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control type='text' {...register('address.city')} isInvalid={!!errors.address?.city} />
              <Form.Control.Feedback type='invalid'>{errors.address?.city?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>State</Form.Label>
              <Form.Select {...register('address.state')} isInvalid={!!errors.address?.state}>
                {stateList.map(({ name, value }) => (
                  <option key={value} value={value}>
                    {name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type='invalid'>{errors.address?.state?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            <Form.Group>
              <Form.Label>Zip Code</Form.Label>
              <Form.Control type='text' {...register('address.zipCode')} isInvalid={!!errors.address?.zipCode} />
              <Form.Control.Feedback type='invalid'>{errors.address?.zipCode?.message}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <div className='mt-3'>
          <LoadingButton type='submit' as={Button} disabled={!isValid} loading={isSubmitting}>
            {submitButtonLabel}
          </LoadingButton>
        </div>
      </Form>
    </WithUnsavedChangesPrompt>
  );
};
