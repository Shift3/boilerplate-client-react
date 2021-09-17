import { yupResolver } from '@hookform/resolvers/yup';
import { FC, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { StyledCancelButton, StyledFormButtonWrapper, StyledSubmitButton } from './styled';

export interface UpdateAgencyFormData {
  agencyName: string;
}

export interface UpdateAgencyFormProps {
  defaultValues: UpdateAgencyFormData;
  onCancel: () => void;
  onSubmit: (data: UpdateAgencyFormData) => void;
}

const schema = yup.object().shape({
  agencyName: yup.string().required('Agency Name is required.'),
});

export const UpdateAgencyForm: FC<UpdateAgencyFormProps> = ({ defaultValues, onCancel, onSubmit }) => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    trigger,
  } = useForm<UpdateAgencyFormData>({ resolver: yupResolver(schema), mode: 'all' });

  useEffect(() => {
    // Trigger form validation when the component renders for the first time
    // so validation errors show right away.
    trigger();
  }, [trigger]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId='create-agency-form-agency-name'>
        <Form.Label>Agency Name</Form.Label>
        <Form.Control
          type='text'
          defaultValue={defaultValues.agencyName}
          isInvalid={!!errors.agencyName}
          {...register('agencyName')}
        />
        <Form.Control.Feedback type='invalid'>{errors.agencyName?.message}</Form.Control.Feedback>
      </Form.Group>
      <StyledFormButtonWrapper>
        <StyledCancelButton onClick={onCancel}>CANCEL</StyledCancelButton>
        <StyledSubmitButton type='submit' disabled={!isValid}>
          UPDATE
        </StyledSubmitButton>
      </StyledFormButtonWrapper>
    </Form>
  );
};
