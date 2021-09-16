import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { StyledCancelButton, StyledFormButtonWrapper, StyledSubmitButton } from './styled';
import { Constants } from 'utils/constants';
import { stateList } from 'utils/states';

export interface CreateAgentFormData {
  name: string;
  email: string;
  description: string;
  phoneNumber: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  thumbnail: string;
}

export interface CreateAgentFormProps {
  onCancel: () => void;
  onSubmit: (data: CreateAgentFormData) => void;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required.'),
  email: yup.string().email().required('Email is required.'),
  description: yup.string().required('Description is required.'),
  phoneNumber: yup
    .string()
    .matches(Constants.patterns.US_PHONE_REGEX, {
      message: 'Please enter a valid phone number.',
      excludeEmptyString: true,
    })
    .required('Phone number is required.'),
  address1: yup.string().required('Address is required.'),
  address2: yup.string(),
  city: yup.string().required('City is required.'),
  state: yup.string().required('State is required.'),
  zipCode: yup.string().required('Zip Code is required'),
  thumbnail: yup.string(),
});

export const CreateAgentForm: FC<CreateAgentFormProps> = ({ onSubmit, onCancel }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    trigger,
  } = useForm<CreateAgentFormData>({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues: { state: '' },
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
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
        <Form.Control type='text' {...register('phoneNumber')} isInvalid={!!errors.phoneNumber} />
        <Form.Control.Feedback type='invalid'>{errors.phoneNumber?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Address</Form.Label>
        <Form.Control type='text' {...register('address1')} isInvalid={!!errors.address1} />
        <Form.Control.Feedback type='invalid'>{errors.address1?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Address2</Form.Label>
        <Form.Control type='text' {...register('address2')} />
        <Form.Control.Feedback type='invalid'>{errors.address2?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Control type='text' {...register('city')} isInvalid={!!errors.city} />
        <Form.Control.Feedback type='invalid'>{errors.city?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>State</Form.Label>
        <Form.Control custom as='select' type='text' {...register('state')} isInvalid={!!errors.state}>
          {stateList.map(({ name, value }) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </Form.Control>
        <Form.Control.Feedback type='invalid'>{errors.state?.message}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label>Zip Code</Form.Label>
        <Form.Control type='text' {...register('zipCode')} isInvalid={!!errors.zipCode} />
        <Form.Control.Feedback type='invalid'>{errors.zipCode?.message}</Form.Control.Feedback>
      </Form.Group>
      <StyledFormButtonWrapper>
        <StyledCancelButton onClick={onCancel}>CANCEL</StyledCancelButton>
        <StyledSubmitButton type='submit' disabled={!isValid}>
          CREATE
        </StyledSubmitButton>
      </StyledFormButtonWrapper>
    </Form>
  );
};
