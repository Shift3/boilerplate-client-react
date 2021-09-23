import { yupResolver } from '@hookform/resolvers/yup';
import { Agency } from 'common/models';
import { FC, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { StyledCancelButton, StyledFormButtonWrapper, StyledSubmitButton } from './styled';

export type FormData = Pick<Agency, 'agencyName'>;

export type Props = {
  defaultValues?: FormData;
  submitButtonLabel?: string;
  cancelButtonLabel?: string;
  onCancel: () => void;
  onSubmit: (data: FormData) => void;
};

const schema = yup.object().shape({
  agencyName: yup.string().required('Agency Name is required.'),
});

export const AgencyDetailForm: FC<Props> = ({
  defaultValues = {},
  submitButtonLabel = 'SUBMIT',
  cancelButtonLabel = 'CANCEL',
  onCancel,
  onSubmit,
}) => {
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    trigger,
  } = useForm<FormData>({ resolver: yupResolver(schema), mode: 'all', defaultValues });

  // Trigger validation on first render.
  useEffect(() => {
    trigger();
  }, [trigger]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group controlId='create-agency-form-agency-name'>
        <Form.Label>Agency Name</Form.Label>
        <Form.Control type='text' isInvalid={!!errors.agencyName} {...register('agencyName')} />
        <Form.Control.Feedback type='invalid'>{errors.agencyName?.message}</Form.Control.Feedback>
      </Form.Group>
      <StyledFormButtonWrapper>
        <StyledCancelButton onClick={onCancel}>{cancelButtonLabel}</StyledCancelButton>
        <StyledSubmitButton type='submit' disabled={!isValid}>
          {submitButtonLabel}
        </StyledSubmitButton>
      </StyledFormButtonWrapper>
    </Form>
  );
};