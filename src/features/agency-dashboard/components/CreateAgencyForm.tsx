import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { StyledCancelButton, StyledFormButtonWrapper, StyledSubmitButton } from './styled';

export interface FormInputs {
  agencyName: string;
}

export interface Props {
  onCancel: () => void;
  onSubmit: () => void;
}

const schema = yup.object().shape({
  agencyName: yup.string().required(),
});

export const CreateAgencyForm: FC<Props> = ({ onCancel, onSubmit }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>({ resolver: yupResolver(schema), mode: 'all' });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId='create-agency-form-agency-name'>
        <Form.Label>Agency Name</Form.Label>
        <Form.Control type='text' {...register('agencyName')} isInvalid={!!errors.agencyName} />
        <Form.Control.Feedback type='invalid'>Agency Name is required.</Form.Control.Feedback>
      </Form.Group>
      <StyledFormButtonWrapper>
        <StyledCancelButton onClick={onCancel}>CANCEL</StyledCancelButton>
        <StyledSubmitButton type='submit'>CREATE</StyledSubmitButton>
      </StyledFormButtonWrapper>
    </Form>
  );
};
