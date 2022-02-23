import { yupResolver } from '@hookform/resolvers/yup';
import FormPrompt from 'common/components/FormPrompt';
import { LoadingButton } from 'common/components/LoadingButton';
import { FC } from 'react';
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
};

const schema: yup.SchemaOf<ProfileFormData> = yup.object().shape({
  firstName: yup.string().trim().required(Constants.errorMessages.FIRST_NAME_REQUIRED),
  lastName: yup.string().trim().required(Constants.errorMessages.LAST_NAME_REQUIRED),
});

export const UpdateUserProfileForm: FC<Props> = ({ onSubmit, defaultValues }) => {
  const {
    formState: { errors, isDirty, isSubmitting, isValid },
    handleSubmit,
    register,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'all',
    defaultValues,
  });

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
      <div className='mt-3'>
        <LoadingButton type='submit' as={Button} disabled={!isValid} loading={isSubmitting}>
          Update
        </LoadingButton>
      </div>

      <FormPrompt isDirty={isDirty} isSubmitting={isSubmitting} />
    </Form>
  );
};
