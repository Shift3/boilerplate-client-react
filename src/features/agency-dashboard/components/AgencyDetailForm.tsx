import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import { Agency } from 'common/models';
import { FC, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { LoadingButton } from 'common/components/LoadingButton';
import { SubmitButton } from 'common/styles/button';
import FormPrompt from 'common/components/FormPrompt';

export type FormData = Pick<Agency, 'agencyName'>;

export type Props = {
  defaultValues?: FormData;
  submitButtonLabel?: string;
  onSubmit: (data: FormData) => void;
};

const schema = yup.object().shape({
  agencyName: yup.string().required('Agency Name is required.'),
});

export const AgencyDetailForm: FC<Props> = ({ defaultValues = {}, onSubmit }) => {
  const {
    formState: { errors, isDirty, isSubmitting, isValid },
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
      <div className='d-grid gap-2 mt-3'>
        <LoadingButton type='submit' as={SubmitButton} disabled={!isValid} loading={isSubmitting}>
          SUBMIT
        </LoadingButton>
      </div>
      <FormPrompt isDirty={isDirty} isSubmitting={isSubmitting} />
    </Form>
  );
};
