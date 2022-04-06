import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from 'common/components/LoadingButton';
import WithUnsavedChangesPrompt from 'common/components/WithUnsavedChangesPrompt';
import { addServerErrors } from 'common/error/utilities';
import { ServerValidationErrors } from 'common/models';
import { FC, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { Constants } from 'utils/constants';
import * as yup from 'yup';

export type ProfileFormData = {
  firstName: string;
  lastName: string;
};

type Props = {
  onSubmit: (data: ProfileFormData) => void;
  defaultValues?: Partial<ProfileFormData>;
  serverValidationErrors: ServerValidationErrors<ProfileFormData> | null;
};

const schema: yup.SchemaOf<ProfileFormData> = yup.object().shape({
  firstName: yup.string().trim().required(Constants.errorMessages.FIRST_NAME_REQUIRED),
  lastName: yup.string().trim().required(Constants.errorMessages.LAST_NAME_REQUIRED),
});

export const UpdateUserProfileForm: FC<Props> = ({ onSubmit, defaultValues, serverValidationErrors }) => {
  const {
    formState: { errors, isDirty, isValid, isSubmitting, isSubmitted, isSubmitSuccessful },
    handleSubmit,
    register,
    reset,
    getValues,
    setError,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues,
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset(getValues());
    }
    if (serverValidationErrors) {
      addServerErrors(serverValidationErrors, setError);
    }
  }, [reset, isSubmitSuccessful, getValues, serverValidationErrors, setError]);

  return (
    <WithUnsavedChangesPrompt when={isDirty && !(isSubmitting || isSubmitted)}>
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
        <div className='mt-3'>
          <LoadingButton type='submit' as={Button} disabled={!isValid} loading={isSubmitting}>
            Update
          </LoadingButton>
        </div>
      </Form>
    </WithUnsavedChangesPrompt>
  );
};
