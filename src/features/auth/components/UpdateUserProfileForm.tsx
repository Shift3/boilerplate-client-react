import { FC, useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Constants } from 'utils/constants';
import { LoadingButton } from 'common/components/LoadingButton';
import FormPrompt from 'common/components/FormPrompt';
import { SubmitButton } from 'common/styles/button';

export type FormData = {
  firstName: string;
  lastName: string;
};

type Props = {
  onSubmit: (data: FormData) => void;
  defaultValues?: Partial<FormData>;
};

const schema: yup.SchemaOf<FormData> = yup.object().shape({
  firstName: yup.string().trim().required(Constants.errorMessages.FIRST_NAME_REQUIRED),
  lastName: yup.string().trim().required(Constants.errorMessages.LAST_NAME_REQUIRED),
});

export const UpdateUserProfileForm: FC<Props> = ({ onSubmit, defaultValues }) => {
  const {
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
    register,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues,
  });

  useEffect(() => {
    trigger();
  }, [trigger]);

  const [submitButtonLoading, setSubmitButtonloading] = useState(false);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group>
        <Form.Label htmlFor='firstName'>First Name</Form.Label>
        <Form.Control id='firstName' type='text' {...register('firstName')} isInvalid={!!errors.firstName} />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.firstName?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor='lastName'>Last Name</Form.Label>
        <Form.Control id='lastName' type='text' {...register('lastName')} isInvalid={!!errors.lastName} />
        <Form.Control.Feedback type='invalid' role='alert'>
          {errors.lastName?.message}
        </Form.Control.Feedback>
      </Form.Group>
      <div className='d-grid gap-2 mt-3'>
        <LoadingButton
          loading={submitButtonLoading}
          as={SubmitButton}
          onClick={() => {
            setSubmitButtonloading(true);
            setTimeout(() => setSubmitButtonloading(false), 3000);
          }}
        >
          UPDATE
        </LoadingButton>
      </div>
      <FormPrompt isDirty={isDirty} isSubmitting={isSubmitting} />
    </Form>
  );
};
