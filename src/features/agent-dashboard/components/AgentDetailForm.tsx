import { yupResolver } from '@hookform/resolvers/yup';
import { Agent } from 'common/models';
import { ButtonWrapper, CancelButton, SubmitButton } from 'common/styles/button';
import { FC, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
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
    address1: yup.string().required('Address is required.'),
    address2: yup.string(),
    city: yup.string().required('City is required.'),
    state: yup.string().required('State is required.'),
    zipCode: yup.string().required('Zip Code is required'),
  }),
});

const formatPhoneNumber = (value: string): string => {
  value = value.replace(/\D+/g, '');

  if (value.length < 4 && value.length >= 1) {
    return `${value.substring(0, 3)}`.trim();
  }

  if (value.length < 7 && value.length >= 4){
    return `(${value.substring(0, 3)}) ${value.substring(3, 6)}`.trim();
  }

  if (value.length >= 7) {
    return `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6,value.length)}`.trim();
  }

  return '';
}

const cleanFormData = (data: FormData): FormData => {
  data.phoneNumber = data.phoneNumber.replace(/\s/g, '');
  return data;
}

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
    watch,
    setValue
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: {
      ...defaultValues,
      // Make state dropdown default to empty instead of first option.
      address: { ...defaultValues.address, state: defaultValues?.address?.state ?? '' },
    },
  });

  const phoneNumber = watch('phoneNumber');

  // Trigger validation on first render.
  useEffect(() => {
    trigger();
  }, [trigger]);
  
  useEffect(() => {
    if (phoneNumber) {
      setValue("phoneNumber", formatPhoneNumber(phoneNumber), 
      {shouldValidate: true});
    }
  }, [setValue, phoneNumber]);

  return (
    <Form onSubmit={handleSubmit((data: FormData) => onSubmit(cleanFormData(data)))}>
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
        <Form.Control type='tel' {...register('phoneNumber')} isInvalid={!!errors.phoneNumber} />
        <Form.Control.Feedback type='invalid'>{errors.phoneNumber?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Address</Form.Label>
        <Form.Control type='text' {...register('address.address1')} isInvalid={!!errors.address?.address1} />
        <Form.Control.Feedback type='invalid'>{errors.address?.address1?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Address2</Form.Label>
        <Form.Control type='text' {...register('address.address2')} isValid={!!errors.address?.address2} />
        <Form.Control.Feedback type='invalid'>{errors.address?.address2?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Control type='text' {...register('address.city')} isInvalid={!!errors.address?.city} />
        <Form.Control.Feedback type='invalid'>{errors.address?.city?.message}</Form.Control.Feedback>
      </Form.Group>
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
      <Form.Group>
        <Form.Label>Zip Code</Form.Label>
        <Form.Control type='text' {...register('address.zipCode')} isInvalid={!!errors.address?.zipCode} />
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
