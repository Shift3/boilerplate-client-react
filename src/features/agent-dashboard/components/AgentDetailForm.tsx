import { yupResolver } from '@hookform/resolvers/yup';
import { PhoneInput } from 'common/components/PhoneInput';
import { Agent } from 'common/models';
import { ButtonWrapper, CancelButton, SubmitButton } from 'common/styles/button';
import { FC, useEffect } from 'react';
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
    city: yup.string().when(
      'address1',
      { is: notBlank, then: yup.string().required('City is required.') }),
    state: yup.string().when(
      'address1',
      { is: notBlank, then: yup.string().required('State is required.') }),
    zipCode: yup.string().when(
      'address1',
      { is: notBlank, then: yup.string().required('Zip code is required.') }),
  }),
});


export const AgentDetailForm: FC<Props> = ({
  defaultValues = {},
  submitButtonLabel = 'SUBMIT',
  cancelButtonLabel = 'CANCEL',
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    trigger,
    control,
    watch
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      ...defaultValues,
      // Make state dropdown default to empty instead of first option.
      address: { ...defaultValues.address, state: defaultValues?.address?.state ?? '' },
    },
  });

  const firstAddressLine = watch('address.address1');
  function isLineOneBlank() { return isBlank(firstAddressLine) };

  /**
   * Submits agent data with either a complete address or nothing at all, to
   * prevent errors due to partial or empty address data.
   * 
   * This works in tandem with validation rules, which enforce filling in all
   * address fields if the first line is filled in.
   * */
  function withOptionalAddress(data: FormData) {
    onSubmit({
      ...data,
      address: isLineOneBlank() ? undefined : data.address})
  };

  // Trigger validation on first render.
  useEffect(() => {
    trigger();
  }, [trigger, firstAddressLine]);
  
  return (
    <Form onSubmit={handleSubmit(withOptionalAddress)}>
      <Form.Group controlId='create-agent-form-agent-name'>
        <Form.Label>Name</Form.Label>
        <Form.Control type='text' {...register('name')} isInvalid={!!errors.name} />
        <Form.Control.Feedback type='invalid'>{errors.name?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Email</Form.Label>
        <Form.Control type='email' {...register('email')} isInvalid={!!errors.email} />
        <Form.Control.Feedback type='invalid'>{errors.email?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Description</Form.Label>
        <Form.Control type='text' {...register('description')} isInvalid={!!errors.description} />
        <Form.Control.Feedback type='invalid'>{errors.description?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
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
        <Form.Label>Address</Form.Label>
        <Form.Control type='text' {...register('address.address1')} isInvalid={!!errors.address?.address1} />
        <Form.Control.Feedback type='invalid'>{errors.address?.address1?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Address2</Form.Label>
        <Form.Control type='text' {...register('address.address2')} isValid={!!errors.address?.address2}
          disabled={ isLineOneBlank() } />
        <Form.Control.Feedback type='invalid'>{errors.address?.address2?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Control type='text' {...register('address.city')} isInvalid={!!errors.address?.city}
          disabled={ isLineOneBlank() } />
        <Form.Control.Feedback type='invalid'>{errors.address?.city?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>State</Form.Label>
        <Form.Select {...register('address.state')} isInvalid={!!errors.address?.state}
          disabled={ isLineOneBlank() } >
          {stateList.map(({ name, value }) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </Form.Select>
        <Form.Control.Feedback type='invalid'>{errors.address?.state?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Zip Code</Form.Label>
        <Form.Control type='text' {...register('address.zipCode')} isInvalid={!!errors.address?.zipCode}
          disabled={ isLineOneBlank() } />
        <Form.Control.Feedback type='invalid'>{errors.address?.zipCode?.message}</Form.Control.Feedback>
      </Form.Group>
      <ButtonWrapper>
        <CancelButton onClick={onCancel}>{cancelButtonLabel}</CancelButton>
        <SubmitButton type='submit' disabled={!isValid}>
          {submitButtonLabel}
        </SubmitButton>
      </ButtonWrapper>
    </Form>
  );
};
